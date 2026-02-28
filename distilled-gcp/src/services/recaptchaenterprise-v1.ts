// ==========================================================================
// reCAPTCHA Enterprise API (recaptchaenterprise v1)
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
  name: "recaptchaenterprise",
  version: "v1",
  rootUrl: "https://recaptchaenterprise.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudRecaptchaenterpriseV1TransactionDataAddress {
  /** Optional. The recipient name, potentially including information such as "care of". */
  recipient?: string;
  /** Optional. The first lines of the address. The first line generally contains the street name and number, and further lines may include information such as an apartment number. */
  address?: Array<string>;
  /** Optional. The town/city of the address. */
  locality?: string;
  /** Optional. The state, province, or otherwise administrative area of the address. */
  administrativeArea?: string;
  /** Optional. The CLDR country/region of the address. */
  regionCode?: string;
  /** Optional. The postal or ZIP code of the address. */
  postalCode?: string;
}

export const GoogleCloudRecaptchaenterpriseV1TransactionDataAddress: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataAddress> = Schema.suspend(() => Schema.Struct({
  recipient: Schema.optional(Schema.String),
  address: Schema.optional(Schema.Array(Schema.String)),
  locality: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TransactionDataAddress" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataAddress>;

export interface GoogleCloudRecaptchaenterpriseV1TransactionDataUser {
  /** Optional. Unique account identifier for this user. If using account defender, this should match the hashed_account_id field. Otherwise, a unique and persistent identifier for this account. */
  accountId?: string;
  /** Optional. The epoch milliseconds of the user's account creation. */
  creationMs?: string;
  /** Optional. The email address of the user. */
  email?: string;
  /** Optional. Whether the email has been verified to be accessible by the user (OTP or similar). */
  emailVerified?: boolean;
  /** Optional. The phone number of the user, with country code. */
  phoneNumber?: string;
  /** Optional. Whether the phone number has been verified to be accessible by the user (OTP or similar). */
  phoneVerified?: boolean;
}

export const GoogleCloudRecaptchaenterpriseV1TransactionDataUser: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataUser> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  creationMs: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
  phoneNumber: Schema.optional(Schema.String),
  phoneVerified: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TransactionDataUser" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataUser>;

export interface GoogleCloudRecaptchaenterpriseV1TransactionDataItem {
  /** Optional. The full name of the item. */
  name?: string;
  /** Optional. The value per item that the user is paying, in the transaction currency, after discounts. */
  value?: number;
  /** Optional. The quantity of this item that is being purchased. */
  quantity?: string;
  /** Optional. When a merchant is specified, its corresponding account_id. Necessary to populate marketplace-style transactions. */
  merchantAccountId?: string;
}

export const GoogleCloudRecaptchaenterpriseV1TransactionDataItem: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataItem> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
  quantity: Schema.optional(Schema.String),
  merchantAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TransactionDataItem" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataItem>;

export interface GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo {
  /** Optional. Name of the gateway service (for example, stripe, square, paypal). */
  name?: string;
  /** Optional. Gateway response code describing the state of the transaction. */
  gatewayResponseCode?: string;
  /** Optional. AVS response code from the gateway (available only when reCAPTCHA Enterprise is called after authorization). */
  avsResponseCode?: string;
  /** Optional. CVV response code from the gateway (available only when reCAPTCHA Enterprise is called after authorization). */
  cvvResponseCode?: string;
}

export const GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  gatewayResponseCode: Schema.optional(Schema.String),
  avsResponseCode: Schema.optional(Schema.String),
  cvvResponseCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo>;

export interface GoogleCloudRecaptchaenterpriseV1TransactionData {
  /** Unique identifier for the transaction. This custom identifier can be used to reference this transaction in the future, for example, labeling a refund or chargeback event. Two attempts at the same transaction should use the same transaction id. */
  transactionId?: string;
  /** Optional. The payment method for the transaction. The allowed values are: * credit-card * debit-card * gift-card * processor-{name} (If a third-party is used, for example, processor-paypal) * custom-{name} (If an alternative method is used, for example, custom-crypto) */
  paymentMethod?: string;
  /** Optional. The Bank Identification Number - generally the first 6 or 8 digits of the card. */
  cardBin?: string;
  /** Optional. The last four digits of the card. */
  cardLastFour?: string;
  /** Optional. The currency code in ISO-4217 format. */
  currencyCode?: string;
  /** Optional. The decimal value of the transaction in the specified currency. */
  value?: number;
  /** Optional. The value of shipping in the specified currency. 0 for free or no shipping. */
  shippingValue?: number;
  /** Optional. Destination address if this transaction involves shipping a physical item. */
  shippingAddress?: GoogleCloudRecaptchaenterpriseV1TransactionDataAddress;
  /** Optional. Address associated with the payment method when applicable. */
  billingAddress?: GoogleCloudRecaptchaenterpriseV1TransactionDataAddress;
  /** Optional. Information about the user paying/initiating the transaction. */
  user?: GoogleCloudRecaptchaenterpriseV1TransactionDataUser;
  /** Optional. Information about the user or users fulfilling the transaction. */
  merchants?: Array<GoogleCloudRecaptchaenterpriseV1TransactionDataUser>;
  /** Optional. Items purchased in this transaction. */
  items?: Array<GoogleCloudRecaptchaenterpriseV1TransactionDataItem>;
  /** Optional. Information about the payment gateway's response to the transaction. */
  gatewayInfo?: GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo;
}

export const GoogleCloudRecaptchaenterpriseV1TransactionData: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionData> = Schema.suspend(() => Schema.Struct({
  transactionId: Schema.optional(Schema.String),
  paymentMethod: Schema.optional(Schema.String),
  cardBin: Schema.optional(Schema.String),
  cardLastFour: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
  shippingValue: Schema.optional(Schema.Number),
  shippingAddress: Schema.optional(GoogleCloudRecaptchaenterpriseV1TransactionDataAddress),
  billingAddress: Schema.optional(GoogleCloudRecaptchaenterpriseV1TransactionDataAddress),
  user: Schema.optional(GoogleCloudRecaptchaenterpriseV1TransactionDataUser),
  merchants: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1TransactionDataUser)),
  items: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1TransactionDataItem)),
  gatewayInfo: Schema.optional(GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TransactionData" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionData>;

export interface GoogleCloudRecaptchaenterpriseV1UserId {
  /** Optional. An email address. */
  email?: string;
  /** Optional. A phone number. Should use the E.164 format. */
  phoneNumber?: string;
  /** Optional. A unique username, if different from all the other identifiers and `account_id` that are provided. Can be a unique login handle or display name for a user. */
  username?: string;
}

export const GoogleCloudRecaptchaenterpriseV1UserId: Schema.Schema<GoogleCloudRecaptchaenterpriseV1UserId> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1UserId" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1UserId>;

export interface GoogleCloudRecaptchaenterpriseV1UserInfo {
  /** Optional. Creation time for this account associated with this user. Leave blank for non logged-in actions, guest checkout, or when there is no account associated with the current user. */
  createAccountTime?: string;
  /** Optional. For logged-in requests or login/registration requests, the unique account identifier associated with this user. You can use the username if it is stable (meaning it is the same for every request associated with the same user), or any stable user ID of your choice. Leave blank for non logged-in actions or guest checkout. */
  accountId?: string;
  /** Optional. Identifiers associated with this user or request. */
  userIds?: Array<GoogleCloudRecaptchaenterpriseV1UserId>;
}

export const GoogleCloudRecaptchaenterpriseV1UserInfo: Schema.Schema<GoogleCloudRecaptchaenterpriseV1UserInfo> = Schema.suspend(() => Schema.Struct({
  createAccountTime: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  userIds: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1UserId)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1UserInfo" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1UserInfo>;

export interface GoogleCloudRecaptchaenterpriseV1Event {
  /** Optional. The user response token provided by the reCAPTCHA Enterprise client-side integration on your site. */
  token?: string;
  /** Optional. The site key that was used to invoke reCAPTCHA Enterprise on your site and generate the token. */
  siteKey?: string;
  /** Optional. The user agent present in the request from the user's device related to this event. */
  userAgent?: string;
  /** Optional. The IP address in the request from the user's device related to this event. */
  userIpAddress?: string;
  /** Optional. The expected action for this type of event. This should be the same action provided at token generation time on client-side platforms already integrated with recaptcha enterprise. */
  expectedAction?: string;
  /** Optional. Deprecated: use `user_info.account_id` instead. Unique stable hashed user identifier for the request. The identifier must be hashed using hmac-sha256 with stable secret. */
  hashedAccountId?: string;
  /** Optional. Flag for a reCAPTCHA express request for an assessment without a token. If enabled, `site_key` must reference an Express site key. */
  express?: boolean;
  /** Optional. The URI resource the user requested that triggered an assessment. */
  requestedUri?: string;
  /** Optional. Flag for running Web Application Firewall (WAF) token assessment. If enabled, the token must be specified, and have been created by a WAF-enabled key. */
  wafTokenAssessment?: boolean;
  /** Optional. JA3 fingerprint for SSL clients. To learn how to compute this fingerprint, please refer to https://github.com/salesforce/ja3. */
  ja3?: string;
  /** Optional. JA4 fingerprint for SSL clients. To learn how to compute this fingerprint, please refer to https://github.com/FoxIO-LLC/ja4. */
  ja4?: string;
  /** Optional. HTTP header information about the request. */
  headers?: Array<string>;
  /** Optional. Flag for enabling firewall policy config assessment. If this flag is enabled, the firewall policy is evaluated and a suggested firewall action is returned in the response. */
  firewallPolicyEvaluation?: boolean;
  /** Optional. Data describing a payment transaction to be assessed. Sending this data enables reCAPTCHA Enterprise Fraud Prevention and the FraudPreventionAssessment component in the response. */
  transactionData?: GoogleCloudRecaptchaenterpriseV1TransactionData;
  /** Optional. Information about the user that generates this event, when they can be identified. They are often identified through the use of an account for logged-in requests or login/registration requests, or by providing user identifiers for guest actions like checkout. */
  userInfo?: GoogleCloudRecaptchaenterpriseV1UserInfo;
  /** Optional. The Fraud Prevention setting for this assessment. */
  fraudPrevention?: "FRAUD_PREVENTION_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1Event: Schema.Schema<GoogleCloudRecaptchaenterpriseV1Event> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  siteKey: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  userIpAddress: Schema.optional(Schema.String),
  expectedAction: Schema.optional(Schema.String),
  hashedAccountId: Schema.optional(Schema.String),
  express: Schema.optional(Schema.Boolean),
  requestedUri: Schema.optional(Schema.String),
  wafTokenAssessment: Schema.optional(Schema.Boolean),
  ja3: Schema.optional(Schema.String),
  ja4: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Array(Schema.String)),
  firewallPolicyEvaluation: Schema.optional(Schema.Boolean),
  transactionData: Schema.optional(GoogleCloudRecaptchaenterpriseV1TransactionData),
  userInfo: Schema.optional(GoogleCloudRecaptchaenterpriseV1UserInfo),
  fraudPrevention: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1Event" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1Event>;

export interface GoogleCloudRecaptchaenterpriseV1Bot {
  /** Optional. Enumerated string value that indicates the identity of the bot, formatted in kebab-case. */
  name?: string;
  /** Optional. Enumerated field representing the type of bot. */
  botType?: "BOT_TYPE_UNSPECIFIED" | "AI_AGENT" | "CONTENT_SCRAPER" | "SEARCH_INDEXER" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1Bot: Schema.Schema<GoogleCloudRecaptchaenterpriseV1Bot> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  botType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1Bot" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1Bot>;

export interface GoogleCloudRecaptchaenterpriseV1RiskAnalysis {
  /** Output only. Legitimate event score from 0.0 to 1.0. (1.0 means very likely legitimate traffic while 0.0 means very likely non-legitimate traffic). */
  score?: number;
  /** Output only. Reasons contributing to the risk analysis verdict. */
  reasons?: Array<"CLASSIFICATION_REASON_UNSPECIFIED" | "AUTOMATION" | "UNEXPECTED_ENVIRONMENT" | "TOO_MUCH_TRAFFIC" | "UNEXPECTED_USAGE_PATTERNS" | "LOW_CONFIDENCE_SCORE" | "SUSPECTED_CARDING" | "SUSPECTED_CHARGEBACK" | (string & {})>;
  /** Output only. Advanced reasons contributing to the risk analysis verdict. These reasons are available to Enterprise tier projects only. Contact sales for more information. The set of possible reasons is subject to change. */
  extendedVerdictReasons?: Array<string>;
  /** Output only. Challenge information for POLICY_BASED_CHALLENGE and INVISIBLE keys. */
  challenge?: "CHALLENGE_UNSPECIFIED" | "NOCAPTCHA" | "PASSED" | "FAILED" | (string & {});
  /** Output only. Bots with identities that have been verified by reCAPTCHA and detected in the event. */
  verifiedBots?: Array<GoogleCloudRecaptchaenterpriseV1Bot>;
}

export const GoogleCloudRecaptchaenterpriseV1RiskAnalysis: Schema.Schema<GoogleCloudRecaptchaenterpriseV1RiskAnalysis> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  reasons: Schema.optional(Schema.Array(Schema.String)),
  extendedVerdictReasons: Schema.optional(Schema.Array(Schema.String)),
  challenge: Schema.optional(Schema.String),
  verifiedBots: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1Bot)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1RiskAnalysis" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1RiskAnalysis>;

export interface GoogleCloudRecaptchaenterpriseV1TokenProperties {
  /** Output only. Whether the provided user response token is valid. When valid = false, the reason could be specified in invalid_reason or it could also be due to a user failing to solve a challenge or a sitekey mismatch (i.e the sitekey used to generate the token was different than the one specified in the assessment). */
  valid?: boolean;
  /** Output only. Reason associated with the response when valid = false. */
  invalidReason?: "INVALID_REASON_UNSPECIFIED" | "UNKNOWN_INVALID_REASON" | "MALFORMED" | "EXPIRED" | "DUPE" | "MISSING" | "BROWSER_ERROR" | "UNEXPECTED_ACTION" | (string & {});
  /** Output only. The timestamp corresponding to the generation of the token. */
  createTime?: string;
  /** Output only. The hostname of the page on which the token was generated (Web keys only). */
  hostname?: string;
  /** Output only. The name of the Android package with which the token was generated (Android keys only). */
  androidPackageName?: string;
  /** Output only. The ID of the iOS bundle with which the token was generated (iOS keys only). */
  iosBundleId?: string;
  /** Output only. Action name provided at token generation. */
  action?: string;
}

export const GoogleCloudRecaptchaenterpriseV1TokenProperties: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TokenProperties> = Schema.suspend(() => Schema.Struct({
  valid: Schema.optional(Schema.Boolean),
  invalidReason: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  androidPackageName: Schema.optional(Schema.String),
  iosBundleId: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TokenProperties" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TokenProperties>;

export interface GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo {
  /** Email address for which to trigger a verification request. */
  emailAddress?: string;
  /** Phone number for which to trigger a verification request. Should be given in E.164 format. */
  phoneNumber?: string;
  /** Output only. Token to provide to the client to trigger endpoint verification. It must be used within 15 minutes. */
  requestToken?: string;
  /** Output only. Timestamp of the last successful verification for the endpoint, if any. */
  lastVerificationTime?: string;
}

export const GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo: Schema.Schema<GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  requestToken: Schema.optional(Schema.String),
  lastVerificationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo>;

export interface GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo {
  /** Optional. Endpoints that can be used for identity verification. */
  endpoints?: Array<GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo>;
  /** Optional. Language code preference for the verification message, set as a IETF BCP 47 language code. */
  languageCode?: string;
  /** Output only. Result of the latest account verification challenge. */
  latestVerificationResult?: "RESULT_UNSPECIFIED" | "SUCCESS_USER_VERIFIED" | "ERROR_USER_NOT_VERIFIED" | "ERROR_SITE_ONBOARDING_INCOMPLETE" | "ERROR_RECIPIENT_NOT_ALLOWED" | "ERROR_RECIPIENT_ABUSE_LIMIT_EXHAUSTED" | "ERROR_CRITICAL_INTERNAL" | "ERROR_CUSTOMER_QUOTA_EXHAUSTED" | "ERROR_VERIFICATION_BYPASSED" | "ERROR_VERDICT_MISMATCH" | (string & {});
  /** Username of the account that is being verified. Deprecated. Customers should now provide the `account_id` field in `event.user_info`. */
  username?: string;
}

export const GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo> = Schema.suspend(() => Schema.Struct({
  endpoints: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo)),
  languageCode: Schema.optional(Schema.String),
  latestVerificationResult: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo>;

export interface GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason {
  /** Output only. A risk reason associated with this request. */
  reason?: "RISK_REASON_UNSPECIFIED" | "CLIENT_HISTORICAL_BOT_ACTIVITY" | "ACCOUNT_IN_LARGE_RELATED_GROUP" | "CLIENT_ACCESSED_MANY_ACCOUNTS" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason>;

export interface GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason {
  /** Output only. A trust reason associated with this request. */
  reason?: "TRUST_REASON_UNSPECIFIED" | "PROFILE_MATCH" | "ACCOUNT_HISTORY_REPUTABLE" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason>;

export interface GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict {
  /** Output only. Account takeover attempt probability. Values are from 0.0 (lowest risk) to 1.0 (highest risk). */
  risk?: number;
  /** Output only. Unordered list. Reasons why the request appears risky. Risk reasons can be returned even if the risk is low, as trustworthy requests can still have some risk signals. */
  riskReasons?: Array<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason>;
  /** Output only. Unordered list. Reasons why the request appears trustworthy. Trust reasons can be returned even if the risk is high, as risky requests can still have some trust signals. */
  trustReasons?: Array<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason>;
}

export const GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict> = Schema.suspend(() => Schema.Struct({
  risk: Schema.optional(Schema.Number),
  riskReasons: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountRiskReason)),
  trustReasons: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTrustReason)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict>;

export interface GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment {
  /** Output only. Labels for this request. */
  labels?: Array<"ACCOUNT_DEFENDER_LABEL_UNSPECIFIED" | "PROFILE_MATCH" | "SUSPICIOUS_LOGIN_ACTIVITY" | "SUSPICIOUS_ACCOUNT_CREATION" | "RELATED_ACCOUNTS_NUMBER_HIGH" | (string & {})>;
  /** Output only. Account takeover risk assessment for this request. */
  accountTakeoverVerdict?: GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict;
}

export const GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Array(Schema.String)),
  accountTakeoverVerdict: Schema.optional(GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessmentAccountTakeoverVerdict),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment>;

export interface GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification {
  /** Required. Exactly 26-bit prefix of the SHA-256 hash of the canonicalized username. It is used to look up password leaks associated with that hash prefix. */
  lookupHashPrefix?: string;
  /** Optional. Encrypted Scrypt hash of the canonicalized username+password. It is re-encrypted by the server and returned through `reencrypted_user_credentials_hash`. */
  encryptedUserCredentialsHash?: string;
  /** Output only. List of prefixes of the encrypted potential password leaks that matched the given parameters. They must be compared with the client-side decryption prefix of `reencrypted_user_credentials_hash` */
  encryptedLeakMatchPrefixes?: Array<string>;
  /** Output only. Corresponds to the re-encryption of the `encrypted_user_credentials_hash` field. It is used to match potential password leaks within `encrypted_leak_match_prefixes`. */
  reencryptedUserCredentialsHash?: string;
}

export const GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification: Schema.Schema<GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification> = Schema.suspend(() => Schema.Struct({
  lookupHashPrefix: Schema.optional(Schema.String),
  encryptedUserCredentialsHash: Schema.optional(Schema.String),
  encryptedLeakMatchPrefixes: Schema.optional(Schema.Array(Schema.String)),
  reencryptedUserCredentialsHash: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification>;

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

export interface GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction {
}

export const GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction {
}

export const GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction {
}

export const GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction {
}

export const GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction {
  /** Optional. The address to redirect to. The target is a relative path in the current host. Example: "/blog/404.html". */
  path?: string;
}

export const GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction {
  /** Optional. The header key to set in the request to the backend server. */
  key?: string;
  /** Optional. The header value to set in the request to the backend server. */
  value?: string;
}

export const GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallAction {
  /** The user request did not match any policy and should be allowed access to the requested resource. */
  allow?: GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction;
  /** This action denies access to a given page. The user gets an HTTP error code. */
  block?: GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction;
  /** This action injects reCAPTCHA JavaScript code into the HTML page returned by the site backend. */
  includeRecaptchaScript?: GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction;
  /** This action redirects the request to a reCAPTCHA interstitial to attach a token. */
  redirect?: GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction;
  /** This action transparently serves a different page to an offending user. */
  substitute?: GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction;
  /** This action sets a custom header but allow the request to continue to the customer backend. */
  setHeader?: GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction;
}

export const GoogleCloudRecaptchaenterpriseV1FirewallAction: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallAction> = Schema.suspend(() => Schema.Struct({
  allow: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallActionAllowAction),
  block: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallActionBlockAction),
  includeRecaptchaScript: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallActionIncludeRecaptchaScriptAction),
  redirect: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallActionRedirectAction),
  substitute: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallActionSubstituteAction),
  setHeader: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallActionSetHeaderAction),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallAction" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallAction>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallPolicy {
  /** Identifier. The resource name for the FirewallPolicy in the format `projects/{project}/firewallpolicies/{firewallpolicy}`. */
  name?: string;
  /** Optional. A description of what this policy aims to achieve, for convenience purposes. The description can at most include 256 UTF-8 characters. */
  description?: string;
  /** Optional. The path for which this policy applies, specified as a glob pattern. For more information on glob, see the [manual page](https://man7.org/linux/man-pages/man7/glob.7.html). A path has a max length of 200 characters. */
  path?: string;
  /** Optional. A CEL (Common Expression Language) conditional expression that specifies if this policy applies to an incoming user request. If this condition evaluates to true and the requested path matched the path pattern, the associated actions should be executed by the caller. The condition string is checked for CEL syntax correctness on creation. For more information, see the [CEL spec](https://github.com/google/cel-spec) and its [language definition](https://github.com/google/cel-spec/blob/master/doc/langdef.md). A condition has a max length of 500 characters. */
  condition?: string;
  /** Optional. The actions that the caller should take regarding user access. There should be at most one terminal action. A terminal action is any action that forces a response, such as `AllowAction`, `BlockAction` or `SubstituteAction`. Zero or more non-terminal actions such as `SetHeader` might be specified. A single policy can contain up to 16 actions. */
  actions?: Array<GoogleCloudRecaptchaenterpriseV1FirewallAction>;
}

export const GoogleCloudRecaptchaenterpriseV1FirewallPolicy: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1FirewallAction)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallPolicy" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallPolicy>;

export interface GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment {
  /** Output only. If the processing of a policy config fails, an error is populated and the firewall_policy is left empty. */
  error?: GoogleRpcStatus;
  /** Output only. The policy that matched the request. If more than one policy may match, this is the first match. If no policy matches the incoming request, the policy field is left empty. */
  firewallPolicy?: GoogleCloudRecaptchaenterpriseV1FirewallPolicy;
}

export const GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(GoogleRpcStatus),
  firewallPolicy: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallPolicy),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment>;

export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason {
  /** Output only. Risk reasons applicable to the Fraud Prevention assessment. */
  reason?: "REASON_UNSPECIFIED" | "HIGH_TRANSACTION_VELOCITY" | "EXCESSIVE_ENUMERATION_PATTERN" | "SHORT_IDENTITY_HISTORY" | "GEOLOCATION_DISCREPANCY" | "ASSOCIATED_WITH_FRAUD_CLUSTER" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason>;

export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict {
  /** Output only. Probability of this transaction being executed with a stolen instrument. Values are from 0.0 (lowest) to 1.0 (highest). */
  risk?: number;
}

export const GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict> = Schema.suspend(() => Schema.Struct({
  risk: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict>;

export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict {
  /** Output only. Probability of this transaction attempt being part of a card testing attack. Values are from 0.0 (lowest) to 1.0 (highest). */
  risk?: number;
}

export const GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict> = Schema.suspend(() => Schema.Struct({
  risk: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict>;

export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict {
  /** Output only. Probability of this transaction attempt being executed in a behaviorally trustworthy way. Values are from 0.0 (lowest) to 1.0 (highest). */
  trust?: number;
}

export const GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict> = Schema.suspend(() => Schema.Struct({
  trust: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict>;

export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment {
  /** Output only. Probability of this transaction being fraudulent. Summarizes the combined risk of attack vectors below. Values are from 0.0 (lowest) to 1.0 (highest). */
  transactionRisk?: number;
  /** Output only. Reasons why the transaction is probably fraudulent and received a high transaction risk score. */
  riskReasons?: Array<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason>;
  /** Output only. Assessment of this transaction for risk of a stolen instrument. */
  stolenInstrumentVerdict?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict;
  /** Output only. Assessment of this transaction for risk of being part of a card testing attack. */
  cardTestingVerdict?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict;
  /** Output only. Assessment of this transaction for behavioral trust. */
  behavioralTrustVerdict?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict;
}

export const GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment> = Schema.suspend(() => Schema.Struct({
  transactionRisk: Schema.optional(Schema.Number),
  riskReasons: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentRiskReason)),
  stolenInstrumentVerdict: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict),
  cardTestingVerdict: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict),
  behavioralTrustVerdict: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentBehavioralTrustVerdict),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment>;

export interface GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals {
  /** Output only. This user (based on email, phone, and other identifiers) has been seen on the internet for at least this number of days. */
  activeDaysLowerBound?: number;
  /** Output only. Likelihood (from 0.0 to 1.0) this user includes synthetic components in their identity, such as a randomly generated email address, temporary phone number, or fake shipping address. */
  syntheticRisk?: number;
}

export const GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals> = Schema.suspend(() => Schema.Struct({
  activeDaysLowerBound: Schema.optional(Schema.Number),
  syntheticRisk: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals>;

export interface GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals {
  /** Output only. The labels for the payment card in this transaction. */
  cardLabels?: Array<"CARD_LABEL_UNSPECIFIED" | "PREPAID" | "VIRTUAL" | "UNEXPECTED_LOCATION" | (string & {})>;
}

export const GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals> = Schema.suspend(() => Schema.Struct({
  cardLabels: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals>;

export interface GoogleCloudRecaptchaenterpriseV1FraudSignals {
  /** Output only. Signals describing the end user in this transaction. */
  userSignals?: GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals;
  /** Output only. Signals describing the payment card or cards used in this transaction. */
  cardSignals?: GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals;
}

export const GoogleCloudRecaptchaenterpriseV1FraudSignals: Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudSignals> = Schema.suspend(() => Schema.Struct({
  userSignals: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudSignalsUserSignals),
  cardSignals: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudSignalsCardSignals),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1FraudSignals" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1FraudSignals>;

export interface GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict {
  /** Output only. Probability of an SMS event being fraudulent. Values are from 0.0 (lowest) to 1.0 (highest). */
  risk?: number;
  /** Output only. Reasons contributing to the SMS toll fraud verdict. */
  reasons?: Array<"SMS_TOLL_FRAUD_REASON_UNSPECIFIED" | "INVALID_PHONE_NUMBER" | (string & {})>;
}

export const GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict: Schema.Schema<GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict> = Schema.suspend(() => Schema.Struct({
  risk: Schema.optional(Schema.Number),
  reasons: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict>;

export interface GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment {
  /** Output only. Assessment of this phone event for risk of SMS toll fraud. */
  smsTollFraudVerdict?: GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict;
}

export const GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment: Schema.Schema<GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment> = Schema.suspend(() => Schema.Struct({
  smsTollFraudVerdict: Schema.optional(GoogleCloudRecaptchaenterpriseV1SmsTollFraudVerdict),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment>;

export interface GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment {
  /** Optional. Identifies the client module initiating the CreateAssessment request. This can be the link to the client module's project. Examples include: - "github.com/GoogleCloudPlatform/recaptcha-enterprise-google-tag-manager" - "wordpress.org/plugins/recaptcha-something" */
  client?: string;
  /** Optional. The version of the client module. For example, "1.0.0". */
  version?: string;
}

export const GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment>;

export interface GoogleCloudRecaptchaenterpriseV1Assessment {
  /** Output only. Identifier. The resource name for the Assessment in the format `projects/{project}/assessments/{assessment}`. */
  name?: string;
  /** Optional. The event being assessed. */
  event?: GoogleCloudRecaptchaenterpriseV1Event;
  /** Output only. The risk analysis result for the event being assessed. */
  riskAnalysis?: GoogleCloudRecaptchaenterpriseV1RiskAnalysis;
  /** Output only. Properties of the provided event token. */
  tokenProperties?: GoogleCloudRecaptchaenterpriseV1TokenProperties;
  /** Optional. Account verification information for identity verification. The assessment event must include a token and site key to use this feature. */
  accountVerification?: GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo;
  /** Output only. Assessment returned by account defender when an account identifier is provided. */
  accountDefenderAssessment?: GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment;
  /** Optional. The private password leak verification field contains the parameters that are used to to check for leaks privately without sharing user credentials. */
  privatePasswordLeakVerification?: GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification;
  /** Output only. Assessment returned when firewall policies belonging to the project are evaluated using the field firewall_policy_evaluation. */
  firewallPolicyAssessment?: GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment;
  /** Output only. Assessment returned by Fraud Prevention when TransactionData is provided. */
  fraudPreventionAssessment?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment;
  /** Output only. Fraud Signals specific to the users involved in a payment transaction. */
  fraudSignals?: GoogleCloudRecaptchaenterpriseV1FraudSignals;
  /** Output only. Assessment returned when a site key, a token, and a phone number as `user_id` are provided. Account defender and SMS toll fraud protection need to be enabled. */
  phoneFraudAssessment?: GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment;
  /** Optional. The environment creating the assessment. This describes your environment (the system invoking CreateAssessment), NOT the environment of your user. */
  assessmentEnvironment?: GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment;
}

export const GoogleCloudRecaptchaenterpriseV1Assessment: Schema.Schema<GoogleCloudRecaptchaenterpriseV1Assessment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  event: Schema.optional(GoogleCloudRecaptchaenterpriseV1Event),
  riskAnalysis: Schema.optional(GoogleCloudRecaptchaenterpriseV1RiskAnalysis),
  tokenProperties: Schema.optional(GoogleCloudRecaptchaenterpriseV1TokenProperties),
  accountVerification: Schema.optional(GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo),
  accountDefenderAssessment: Schema.optional(GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment),
  privatePasswordLeakVerification: Schema.optional(GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification),
  firewallPolicyAssessment: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallPolicyAssessment),
  fraudPreventionAssessment: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment),
  fraudSignals: Schema.optional(GoogleCloudRecaptchaenterpriseV1FraudSignals),
  phoneFraudAssessment: Schema.optional(GoogleCloudRecaptchaenterpriseV1PhoneFraudAssessment),
  assessmentEnvironment: Schema.optional(GoogleCloudRecaptchaenterpriseV1AssessmentEnvironment),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1Assessment" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1Assessment>;

export interface GoogleCloudRecaptchaenterpriseV1TransactionEvent {
  /** Optional. The type of this transaction event. */
  eventType?: "TRANSACTION_EVENT_TYPE_UNSPECIFIED" | "MERCHANT_APPROVE" | "MERCHANT_DENY" | "MANUAL_REVIEW" | "AUTHORIZATION" | "AUTHORIZATION_DECLINE" | "PAYMENT_CAPTURE" | "PAYMENT_CAPTURE_DECLINE" | "CANCEL" | "CHARGEBACK_INQUIRY" | "CHARGEBACK_ALERT" | "FRAUD_NOTIFICATION" | "CHARGEBACK" | "CHARGEBACK_REPRESENTMENT" | "CHARGEBACK_REVERSE" | "REFUND_REQUEST" | "REFUND_DECLINE" | "REFUND" | "REFUND_REVERSE" | (string & {});
  /** Optional. The reason or standardized code that corresponds with this transaction event, if one exists. For example, a CHARGEBACK event with code 6005. */
  reason?: string;
  /** Optional. The value that corresponds with this transaction event, if one exists. For example, a refund event where $5.00 was refunded. Currency is obtained from the original transaction data. */
  value?: number;
  /** Optional. Timestamp when this transaction event occurred; otherwise assumed to be the time of the API call. */
  eventTime?: string;
}

export const GoogleCloudRecaptchaenterpriseV1TransactionEvent: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TransactionEvent" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TransactionEvent>;

export interface GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent {
  /** Required. Phone number in E.164 format for which a multi-factor authentication challenge was initiated, succeeded, or failed. */
  phoneNumber?: string;
  /** Optional. The time at which the multi-factor authentication event (challenge or verification) occurred. */
  eventTime?: string;
}

export const GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent: Schema.Schema<GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent>;

export interface GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest {
  /** Optional. The annotation that is assigned to the Event. This field can be left empty to provide reasons that apply to an event without concluding whether the event is legitimate or fraudulent. */
  annotation?: "ANNOTATION_UNSPECIFIED" | "LEGITIMATE" | "FRAUDULENT" | "PASSWORD_CORRECT" | "PASSWORD_INCORRECT" | (string & {});
  /** Optional. Reasons for the annotation that are assigned to the event. */
  reasons?: Array<"REASON_UNSPECIFIED" | "CHARGEBACK" | "CHARGEBACK_FRAUD" | "CHARGEBACK_DISPUTE" | "REFUND" | "REFUND_FRAUD" | "TRANSACTION_ACCEPTED" | "TRANSACTION_DECLINED" | "PAYMENT_HEURISTICS" | "INITIATED_TWO_FACTOR" | "PASSED_TWO_FACTOR" | "FAILED_TWO_FACTOR" | "CORRECT_PASSWORD" | "INCORRECT_PASSWORD" | "SOCIAL_SPAM" | (string & {})>;
  /** Optional. A stable account identifier to apply to the assessment. This is an alternative to setting `account_id` in `CreateAssessment`, for example when a stable account identifier is not yet known in the initial request. */
  accountId?: string;
  /** Optional. A stable hashed account identifier to apply to the assessment. This is an alternative to setting `hashed_account_id` in `CreateAssessment`, for example when a stable account identifier is not yet known in the initial request. */
  hashedAccountId?: string;
  /** Optional. If the assessment is part of a payment transaction, provide details on payment lifecycle events that occur in the transaction. */
  transactionEvent?: GoogleCloudRecaptchaenterpriseV1TransactionEvent;
  /** Optional. If using an external multi-factor authentication provider, provide phone authentication details for fraud detection purposes. */
  phoneAuthenticationEvent?: GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent;
}

export const GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest> = Schema.suspend(() => Schema.Struct({
  annotation: Schema.optional(Schema.String),
  reasons: Schema.optional(Schema.Array(Schema.String)),
  accountId: Schema.optional(Schema.String),
  hashedAccountId: Schema.optional(Schema.String),
  transactionEvent: Schema.optional(GoogleCloudRecaptchaenterpriseV1TransactionEvent),
  phoneAuthenticationEvent: Schema.optional(GoogleCloudRecaptchaenterpriseV1PhoneAuthenticationEvent),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest>;

export interface GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse {
}

export const GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse>;

export interface GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings {
  /** Required. A challenge is triggered if the end-user score is below that threshold. Value must be between 0 and 1 (inclusive). */
  scoreThreshold?: number;
}

export const GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings> = Schema.suspend(() => Schema.Struct({
  scoreThreshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings>;

export interface GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings {
  /** Required. Defines when a challenge is triggered (unless the default threshold is overridden for the given action, see `action_settings`). */
  defaultSettings?: GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings;
  /** Optional. The action to score threshold map. The action name should be the same as the action name passed in the `data-action` attribute (see https://cloud.google.com/recaptcha/docs/actions-website). Action names are case-insensitive. There is a maximum of 100 action settings. An action name has a maximum length of 100. */
  actionSettings?: Record<string, GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings>;
}

export const GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings> = Schema.suspend(() => Schema.Struct({
  defaultSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings),
  actionSettings: Schema.optional(Schema.Record(Schema.String, GoogleCloudRecaptchaenterpriseV1WebKeySettingsActionSettings)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings>;

export interface GoogleCloudRecaptchaenterpriseV1WebKeySettings {
  /** Optional. If set to true, it means allowed_domains are not enforced. */
  allowAllDomains?: boolean;
  /** Optional. Domains or subdomains of websites allowed to use the key. All subdomains of an allowed domain are automatically allowed. A valid domain requires a host and must not include any path, port, query or fragment. Examples: 'example.com' or 'subdomain.example.com' Each key supports a maximum of 250 domains. To use a key on more domains, set `allow_all_domains` to true. When this is set, you are responsible for validating the hostname by checking the `token_properties.hostname` field in each assessment response against your list of allowed domains. */
  allowedDomains?: Array<string>;
  /** Optional. If set to true, the key can be used on AMP (Accelerated Mobile Pages) websites. This is supported only for the SCORE integration type. */
  allowAmpTraffic?: boolean;
  /** Required. Describes how this key is integrated with the website. */
  integrationType?: "INTEGRATION_TYPE_UNSPECIFIED" | "SCORE" | "CHECKBOX" | "INVISIBLE" | "POLICY_BASED_CHALLENGE" | (string & {});
  /** Optional. Settings for the frequency and difficulty at which this key triggers captcha challenges. This should only be specified for `IntegrationType` CHECKBOX, INVISIBLE or POLICY_BASED_CHALLENGE. */
  challengeSecurityPreference?: "CHALLENGE_SECURITY_PREFERENCE_UNSPECIFIED" | "USABILITY" | "BALANCE" | "SECURITY" | (string & {});
  /** Optional. Challenge settings. */
  challengeSettings?: GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings;
}

export const GoogleCloudRecaptchaenterpriseV1WebKeySettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1WebKeySettings> = Schema.suspend(() => Schema.Struct({
  allowAllDomains: Schema.optional(Schema.Boolean),
  allowedDomains: Schema.optional(Schema.Array(Schema.String)),
  allowAmpTraffic: Schema.optional(Schema.Boolean),
  integrationType: Schema.optional(Schema.String),
  challengeSecurityPreference: Schema.optional(Schema.String),
  challengeSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1WebKeySettingsChallengeSettings),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1WebKeySettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1WebKeySettings>;

export interface GoogleCloudRecaptchaenterpriseV1AndroidKeySettings {
  /** Optional. If set to true, allowed_package_names are not enforced. */
  allowAllPackageNames?: boolean;
  /** Optional. Android package names of apps allowed to use the key. Example: 'com.companyname.appname' Each key supports a maximum of 250 package names. To use a key on more apps, set `allow_all_package_names` to true. When this is set, you are responsible for validating the package name by checking the `token_properties.android_package_name` field in each assessment response against your list of allowed package names. */
  allowedPackageNames?: Array<string>;
  /** Optional. Set to true for keys that are used in an Android application that is available for download in app stores in addition to the Google Play Store. */
  supportNonGoogleAppStoreDistribution?: boolean;
}

export const GoogleCloudRecaptchaenterpriseV1AndroidKeySettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AndroidKeySettings> = Schema.suspend(() => Schema.Struct({
  allowAllPackageNames: Schema.optional(Schema.Boolean),
  allowedPackageNames: Schema.optional(Schema.Array(Schema.String)),
  supportNonGoogleAppStoreDistribution: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AndroidKeySettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AndroidKeySettings>;

export interface GoogleCloudRecaptchaenterpriseV1AppleDeveloperId {
  /** Required. Input only. A private key (downloaded as a text file with a .p8 file extension) generated for your Apple Developer account. Ensure that Apple DeviceCheck is enabled for the private key. */
  privateKey?: string;
  /** Required. The Apple developer key ID (10-character string). */
  keyId?: string;
  /** Required. The Apple team ID (10-character string) owning the provisioning profile used to build your application. */
  teamId?: string;
}

export const GoogleCloudRecaptchaenterpriseV1AppleDeveloperId: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AppleDeveloperId> = Schema.suspend(() => Schema.Struct({
  privateKey: Schema.optional(Schema.String),
  keyId: Schema.optional(Schema.String),
  teamId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AppleDeveloperId" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AppleDeveloperId>;

export interface GoogleCloudRecaptchaenterpriseV1IOSKeySettings {
  /** Optional. If set to true, allowed_bundle_ids are not enforced. */
  allowAllBundleIds?: boolean;
  /** Optional. iOS bundle IDs of apps allowed to use the key. Example: 'com.companyname.productname.appname' Each key supports a maximum of 250 bundle IDs. To use a key on more apps, set `allow_all_bundle_ids` to true. When this is set, you are responsible for validating the bundle id by checking the `token_properties.ios_bundle_id` field in each assessment response against your list of allowed bundle IDs. */
  allowedBundleIds?: Array<string>;
  /** Optional. Apple Developer account details for the app that is protected by the reCAPTCHA Key. reCAPTCHA leverages platform-specific checks like Apple App Attest and Apple DeviceCheck to protect your app from abuse. Providing these fields allows reCAPTCHA to get a better assessment of the integrity of your app. */
  appleDeveloperId?: GoogleCloudRecaptchaenterpriseV1AppleDeveloperId;
}

export const GoogleCloudRecaptchaenterpriseV1IOSKeySettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1IOSKeySettings> = Schema.suspend(() => Schema.Struct({
  allowAllBundleIds: Schema.optional(Schema.Boolean),
  allowedBundleIds: Schema.optional(Schema.Array(Schema.String)),
  appleDeveloperId: Schema.optional(GoogleCloudRecaptchaenterpriseV1AppleDeveloperId),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1IOSKeySettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1IOSKeySettings>;

export interface GoogleCloudRecaptchaenterpriseV1ExpressKeySettings {
}

export const GoogleCloudRecaptchaenterpriseV1ExpressKeySettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ExpressKeySettings> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ExpressKeySettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ExpressKeySettings>;

export interface GoogleCloudRecaptchaenterpriseV1TestingOptions {
  /** Optional. All assessments for this Key return this score. Must be between 0 (likely not legitimate) and 1 (likely legitimate) inclusive. */
  testingScore?: number;
  /** Optional. For challenge-based keys only (CHECKBOX, INVISIBLE), all challenge requests for this site return nocaptcha if NOCAPTCHA, or an unsolvable challenge if CHALLENGE. */
  testingChallenge?: "TESTING_CHALLENGE_UNSPECIFIED" | "NOCAPTCHA" | "UNSOLVABLE_CHALLENGE" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1TestingOptions: Schema.Schema<GoogleCloudRecaptchaenterpriseV1TestingOptions> = Schema.suspend(() => Schema.Struct({
  testingScore: Schema.optional(Schema.Number),
  testingChallenge: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1TestingOptions" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1TestingOptions>;

export interface GoogleCloudRecaptchaenterpriseV1WafSettings {
  /** Required. The Web Application Firewall (WAF) service that uses this key. */
  wafService?: "WAF_SERVICE_UNSPECIFIED" | "CA" | "FASTLY" | "CLOUDFLARE" | "AKAMAI" | (string & {});
  /** Required. The Web Application Firewall (WAF) feature for which this key is enabled. */
  wafFeature?: "WAF_FEATURE_UNSPECIFIED" | "CHALLENGE_PAGE" | "SESSION_TOKEN" | "ACTION_TOKEN" | "EXPRESS" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1WafSettings: Schema.Schema<GoogleCloudRecaptchaenterpriseV1WafSettings> = Schema.suspend(() => Schema.Struct({
  wafService: Schema.optional(Schema.String),
  wafFeature: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1WafSettings" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1WafSettings>;

export interface GoogleCloudRecaptchaenterpriseV1Key {
  /** Identifier. The resource name for the Key in the format `projects/{project}/keys/{key}`. */
  name?: string;
  /** Required. Human-readable display name of this key. Modifiable by user. */
  displayName?: string;
  /** Settings for keys that can be used by websites. */
  webSettings?: GoogleCloudRecaptchaenterpriseV1WebKeySettings;
  /** Settings for keys that can be used by Android apps. */
  androidSettings?: GoogleCloudRecaptchaenterpriseV1AndroidKeySettings;
  /** Settings for keys that can be used by iOS apps. */
  iosSettings?: GoogleCloudRecaptchaenterpriseV1IOSKeySettings;
  /** Settings for keys that can be used by reCAPTCHA Express. */
  expressSettings?: GoogleCloudRecaptchaenterpriseV1ExpressKeySettings;
  /** Optional. See [Creating and managing labels] (https://cloud.google.com/recaptcha/docs/labels). */
  labels?: Record<string, string>;
  /** Output only. The timestamp corresponding to the creation of this key. */
  createTime?: string;
  /** Optional. Options for user acceptance testing. */
  testingOptions?: GoogleCloudRecaptchaenterpriseV1TestingOptions;
  /** Optional. Settings for Web Application Firewall (WAF). */
  wafSettings?: GoogleCloudRecaptchaenterpriseV1WafSettings;
}

export const GoogleCloudRecaptchaenterpriseV1Key: Schema.Schema<GoogleCloudRecaptchaenterpriseV1Key> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  webSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1WebKeySettings),
  androidSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1AndroidKeySettings),
  iosSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1IOSKeySettings),
  expressSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1ExpressKeySettings),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  testingOptions: Schema.optional(GoogleCloudRecaptchaenterpriseV1TestingOptions),
  wafSettings: Schema.optional(GoogleCloudRecaptchaenterpriseV1WafSettings),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1Key" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1Key>;

export interface GoogleCloudRecaptchaenterpriseV1ListKeysResponse {
  /** Key details. */
  keys?: Array<GoogleCloudRecaptchaenterpriseV1Key>;
  /** Token to retrieve the next page of results. It is set to empty if no keys remain in results. */
  nextPageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1ListKeysResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListKeysResponse> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1Key)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ListKeysResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListKeysResponse>;

export interface GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse {
  /** The secret key (also known as shared secret) authorizes communication between your application backend and the reCAPTCHA Enterprise server to create an assessment. The secret key needs to be kept safe for security purposes. */
  legacySecretKey?: string;
}

export const GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse> = Schema.suspend(() => Schema.Struct({
  legacySecretKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest {
  /** Optional. If true, skips the billing check. A reCAPTCHA Enterprise key or migrated key behaves differently than a reCAPTCHA (non-Enterprise version) key when you reach a quota limit (see https://docs.cloud.google.com/recaptcha/quotas#quota_limit). To avoid any disruption of your usage, we check that a billing account is present. If your usage of reCAPTCHA is under the free quota, you can safely skip the billing check and proceed with the migration. See https://cloud.google.com/recaptcha/docs/billing-information. */
  skipBillingCheck?: boolean;
}

export const GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest: Schema.Schema<GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest> = Schema.suspend(() => Schema.Struct({
  skipBillingCheck: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest>;

export interface GoogleCloudRecaptchaenterpriseV1IpOverrideData {
  /** Required. The IP address to override (can be IPv4, IPv6 or CIDR). The IP override must be a valid IPv4 or IPv6 address, or a CIDR range. The IP override must be a public IP address. Example of IPv4: 168.192.5.6 Example of IPv6: 2001:0000:130F:0000:0000:09C0:876A:130B Example of IPv4 with CIDR: 168.192.5.0/24 Example of IPv6 with CIDR: 2001:0DB8:1234::/48 */
  ip?: string;
  /** Required. Describes the type of IP override. */
  overrideType?: "OVERRIDE_TYPE_UNSPECIFIED" | "ALLOW" | (string & {});
}

export const GoogleCloudRecaptchaenterpriseV1IpOverrideData: Schema.Schema<GoogleCloudRecaptchaenterpriseV1IpOverrideData> = Schema.suspend(() => Schema.Struct({
  ip: Schema.optional(Schema.String),
  overrideType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1IpOverrideData" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1IpOverrideData>;

export interface GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest {
  /** Required. IP override added to the key. */
  ipOverrideData?: GoogleCloudRecaptchaenterpriseV1IpOverrideData;
}

export const GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest> = Schema.suspend(() => Schema.Struct({
  ipOverrideData: Schema.optional(GoogleCloudRecaptchaenterpriseV1IpOverrideData),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest>;

export interface GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse {
}

export const GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse>;

export interface GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest {
  /** Required. IP override to be removed from the key. */
  ipOverrideData?: GoogleCloudRecaptchaenterpriseV1IpOverrideData;
}

export const GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest: Schema.Schema<GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest> = Schema.suspend(() => Schema.Struct({
  ipOverrideData: Schema.optional(GoogleCloudRecaptchaenterpriseV1IpOverrideData),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest>;

export interface GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse {
}

export const GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse>;

export interface GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse {
  /** IP Overrides details. */
  ipOverrides?: Array<GoogleCloudRecaptchaenterpriseV1IpOverrideData>;
  /** Token to retrieve the next page of results. If this field is empty, no keys remain in the results. */
  nextPageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse> = Schema.suspend(() => Schema.Struct({
  ipOverrides: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1IpOverrideData)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse>;

export interface GoogleCloudRecaptchaenterpriseV1ScoreDistribution {
  /** Map key is score value multiplied by 100. The scores are discrete values between [0, 1]. The maximum number of buckets is on order of a few dozen, but typically much lower (ie. 10). */
  scoreBuckets?: Record<string, string>;
}

export const GoogleCloudRecaptchaenterpriseV1ScoreDistribution: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ScoreDistribution> = Schema.suspend(() => Schema.Struct({
  scoreBuckets: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ScoreDistribution" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ScoreDistribution>;

export interface GoogleCloudRecaptchaenterpriseV1ScoreMetrics {
  /** Aggregated score metrics for all traffic. */
  overallMetrics?: GoogleCloudRecaptchaenterpriseV1ScoreDistribution;
  /** Action-based metrics. The map key is the action name which specified by the site owners at time of the "execute" client-side call. */
  actionMetrics?: Record<string, GoogleCloudRecaptchaenterpriseV1ScoreDistribution>;
}

export const GoogleCloudRecaptchaenterpriseV1ScoreMetrics: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ScoreMetrics> = Schema.suspend(() => Schema.Struct({
  overallMetrics: Schema.optional(GoogleCloudRecaptchaenterpriseV1ScoreDistribution),
  actionMetrics: Schema.optional(Schema.Record(Schema.String, GoogleCloudRecaptchaenterpriseV1ScoreDistribution)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ScoreMetrics" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ScoreMetrics>;

export interface GoogleCloudRecaptchaenterpriseV1ChallengeMetrics {
  /** Count of reCAPTCHA checkboxes or badges rendered. This is mostly equivalent to a count of pageloads for pages that include reCAPTCHA. */
  pageloadCount?: string;
  /** Count of nocaptchas (successful verification without a challenge) issued. */
  nocaptchaCount?: string;
  /** Count of submitted challenge solutions that were incorrect or otherwise deemed suspicious such that a subsequent challenge was triggered. */
  failedCount?: string;
  /** Count of nocaptchas (successful verification without a challenge) plus submitted challenge solutions that were correct and resulted in verification. */
  passedCount?: string;
}

export const GoogleCloudRecaptchaenterpriseV1ChallengeMetrics: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ChallengeMetrics> = Schema.suspend(() => Schema.Struct({
  pageloadCount: Schema.optional(Schema.String),
  nocaptchaCount: Schema.optional(Schema.String),
  failedCount: Schema.optional(Schema.String),
  passedCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ChallengeMetrics" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ChallengeMetrics>;

export interface GoogleCloudRecaptchaenterpriseV1Metrics {
  /** Output only. Identifier. The name of the metrics, in the format `projects/{project}/keys/{key}/metrics`. */
  name?: string;
  /** Inclusive start time aligned to a day in the America/Los_Angeles (Pacific) timezone. */
  startTime?: string;
  /** Metrics are continuous and in order by dates, and in the granularity of day. All Key types should have score-based data. */
  scoreMetrics?: Array<GoogleCloudRecaptchaenterpriseV1ScoreMetrics>;
  /** Metrics are continuous and in order by dates, and in the granularity of day. Only challenge-based keys (CHECKBOX, INVISIBLE) have challenge-based data. */
  challengeMetrics?: Array<GoogleCloudRecaptchaenterpriseV1ChallengeMetrics>;
}

export const GoogleCloudRecaptchaenterpriseV1Metrics: Schema.Schema<GoogleCloudRecaptchaenterpriseV1Metrics> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  scoreMetrics: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1ScoreMetrics)),
  challengeMetrics: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1ChallengeMetrics)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1Metrics" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1Metrics>;

export interface GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse {
  /** Policy details. */
  firewallPolicies?: Array<GoogleCloudRecaptchaenterpriseV1FirewallPolicy>;
  /** Token to retrieve the next page of results. It is set to empty if no policies remain in results. */
  nextPageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  firewallPolicies: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1FirewallPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse>;

export interface GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest {
  /** Required. A list containing all policy names, in the new order. Each name is in the format `projects/{project}/firewallpolicies/{firewallpolicy}`. */
  names?: Array<string>;
}

export const GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest>;

export interface GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse {
}

export const GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse>;

export interface GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup {
  /** Required. Identifier. The resource name for the related account group in the format `projects/{project}/relatedaccountgroups/{related_account_group}`. */
  name?: string;
}

export const GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup: Schema.Schema<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup>;

export interface GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse {
  /** The groups of related accounts listed by the query. */
  relatedAccountGroups?: Array<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse> = Schema.suspend(() => Schema.Struct({
  relatedAccountGroups: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse>;

export interface GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership {
  /** Required. Identifier. The resource name for this membership in the format `projects/{project}/relatedaccountgroups/{relatedaccountgroup}/memberships/{membership}`. */
  name?: string;
  /** The unique stable account identifier of the member. The identifier corresponds to an `account_id` provided in a previous `CreateAssessment` or `AnnotateAssessment` call. */
  accountId?: string;
  /** Deprecated: use `account_id` instead. The unique stable hashed account identifier of the member. The identifier corresponds to a `hashed_account_id` provided in a previous `CreateAssessment` or `AnnotateAssessment` call. */
  hashedAccountId?: string;
}

export const GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership: Schema.Schema<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  hashedAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership>;

export interface GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse {
  /** The memberships listed by the query. */
  relatedAccountGroupMemberships?: Array<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse> = Schema.suspend(() => Schema.Struct({
  relatedAccountGroupMemberships: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse>;

export interface GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest {
  /** Optional. The unique stable account identifier used to search connections. The identifier should correspond to an `account_id` provided in a previous `CreateAssessment` or `AnnotateAssessment` call. Either hashed_account_id or account_id must be set, but not both. */
  accountId?: string;
  /** Optional. Deprecated: use `account_id` instead. The unique stable hashed account identifier used to search connections. The identifier should correspond to a `hashed_account_id` provided in a previous `CreateAssessment` or `AnnotateAssessment` call. Either hashed_account_id or account_id must be set, but not both. */
  hashedAccountId?: string;
  /** Optional. The maximum number of groups to return. The service might return fewer than this value. If unspecified, at most 50 groups are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `SearchRelatedAccountGroupMemberships` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchRelatedAccountGroupMemberships` must match the call that provided the page token. */
  pageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest: Schema.Schema<GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  hashedAccountId: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest>;

export interface GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse {
  /** The queried memberships. */
  relatedAccountGroupMemberships?: Array<GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse: Schema.Schema<GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse> = Schema.suspend(() => Schema.Struct({
  relatedAccountGroupMemberships: Schema.optional(Schema.Array(GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse" }) as any as Schema.Schema<GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates an Assessment of the likelihood an event is legitimate. */
export interface CreateProjectsAssessmentsRequest {
  /** Required. The name of the project in which the assessment is created, in the format `projects/{project}`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1Assessment;
}

export const CreateProjectsAssessmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1Assessment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/assessments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAssessmentsRequest>;

export type CreateProjectsAssessmentsResponse = GoogleCloudRecaptchaenterpriseV1Assessment;
export const CreateProjectsAssessmentsResponse = GoogleCloudRecaptchaenterpriseV1Assessment;

export type CreateProjectsAssessmentsError = CommonErrors;

export const createProjectsAssessments: API.OperationMethod<CreateProjectsAssessmentsRequest, CreateProjectsAssessmentsResponse, CreateProjectsAssessmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAssessmentsRequest,
  output: CreateProjectsAssessmentsResponse,
  errors: [],
}));

/** Annotates a previously created Assessment to provide additional information on whether the event turned out to be authentic or fraudulent. */
export interface AnnotateProjectsAssessmentsRequest {
  /** Required. The resource name of the Assessment, in the format `projects/{project}/assessments/{assessment}`. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest;
}

export const AnnotateProjectsAssessmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/assessments/{assessmentsId}:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateProjectsAssessmentsRequest>;

export type AnnotateProjectsAssessmentsResponse = GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse;
export const AnnotateProjectsAssessmentsResponse = GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse;

export type AnnotateProjectsAssessmentsError = CommonErrors;

export const annotateProjectsAssessments: API.OperationMethod<AnnotateProjectsAssessmentsRequest, AnnotateProjectsAssessmentsResponse, AnnotateProjectsAssessmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateProjectsAssessmentsRequest,
  output: AnnotateProjectsAssessmentsResponse,
  errors: [],
}));

/** Creates a new reCAPTCHA Enterprise key. */
export interface CreateProjectsKeysRequest {
  /** Required. The name of the project in which the key is created, in the format `projects/{project}`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1Key;
}

export const CreateProjectsKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1Key).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/keys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsKeysRequest>;

export type CreateProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;
export const CreateProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;

export type CreateProjectsKeysError = CommonErrors;

export const createProjectsKeys: API.OperationMethod<CreateProjectsKeysRequest, CreateProjectsKeysResponse, CreateProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsKeysRequest,
  output: CreateProjectsKeysResponse,
  errors: [],
}));

/** Returns the list of all keys that belong to a project. */
export interface ListProjectsKeysRequest {
  /** Required. The name of the project that contains the keys that is listed, in the format `projects/{project}`. */
  parent: string;
  /** Optional. The maximum number of keys to return. Default is 10. Max limit is 1000. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous. ListKeysRequest, if any. */
  pageToken?: string;
}

export const ListProjectsKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/keys" }),
  svc,
) as unknown as Schema.Schema<ListProjectsKeysRequest>;

export type ListProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1ListKeysResponse;
export const ListProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1ListKeysResponse;

export type ListProjectsKeysError = CommonErrors;

export const listProjectsKeys = API.makePaginated(() => ({
  input: ListProjectsKeysRequest,
  output: ListProjectsKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the secret key related to the specified public key. You must use the legacy secret key only in a 3rd party integration with legacy reCAPTCHA. */
export interface RetrieveLegacySecretKeyProjectsKeysRequest {
}

export const RetrieveLegacySecretKeyProjectsKeysRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/keys/{keysId}:retrieveLegacySecretKey" }),
  svc,
) as unknown as Schema.Schema<RetrieveLegacySecretKeyProjectsKeysRequest>;

export type RetrieveLegacySecretKeyProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse;
export const RetrieveLegacySecretKeyProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse;

export type RetrieveLegacySecretKeyProjectsKeysError = CommonErrors;

export const retrieveLegacySecretKeyProjectsKeys: API.OperationMethod<RetrieveLegacySecretKeyProjectsKeysRequest, RetrieveLegacySecretKeyProjectsKeysResponse, RetrieveLegacySecretKeyProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveLegacySecretKeyProjectsKeysRequest,
  output: RetrieveLegacySecretKeyProjectsKeysResponse,
  errors: [],
}));

/** Returns the specified key. */
export interface GetProjectsKeysRequest {
  /** Required. The name of the requested key, in the format `projects/{project}/keys/{key}`. */
  name: string;
}

export const GetProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/keys/{keysId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsKeysRequest>;

export type GetProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;
export const GetProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;

export type GetProjectsKeysError = CommonErrors;

export const getProjectsKeys: API.OperationMethod<GetProjectsKeysRequest, GetProjectsKeysResponse, GetProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsKeysRequest,
  output: GetProjectsKeysResponse,
  errors: [],
}));

/** Updates the specified key. */
export interface PatchProjectsKeysRequest {
  /** Identifier. The resource name for the Key in the format `projects/{project}/keys/{key}`. */
  name: string;
  /** Optional. The mask to control which fields of the key get updated. If the mask is not present, all fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1Key;
}

export const PatchProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1Key).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/keys/{keysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsKeysRequest>;

export type PatchProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;
export const PatchProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;

export type PatchProjectsKeysError = CommonErrors;

export const patchProjectsKeys: API.OperationMethod<PatchProjectsKeysRequest, PatchProjectsKeysResponse, PatchProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsKeysRequest,
  output: PatchProjectsKeysResponse,
  errors: [],
}));

/** Deletes the specified key. */
export interface DeleteProjectsKeysRequest {
  /** Required. The name of the key to be deleted, in the format `projects/{project}/keys/{key}`. */
  name: string;
}

export const DeleteProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/keys/{keysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsKeysRequest>;

export type DeleteProjectsKeysResponse = GoogleProtobufEmpty;
export const DeleteProjectsKeysResponse = GoogleProtobufEmpty;

export type DeleteProjectsKeysError = CommonErrors;

export const deleteProjectsKeys: API.OperationMethod<DeleteProjectsKeysRequest, DeleteProjectsKeysResponse, DeleteProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsKeysRequest,
  output: DeleteProjectsKeysResponse,
  errors: [],
}));

/** Migrates an existing key from reCAPTCHA to reCAPTCHA Enterprise. Once a key is migrated, it can be used from either product. SiteVerify requests are billed as CreateAssessment calls. You must be authenticated as one of the current owners of the reCAPTCHA Key, and your user must have the reCAPTCHA Enterprise Admin IAM role in the destination project. */
export interface MigrateProjectsKeysRequest {
  /** Required. The name of the key to be migrated, in the format `projects/{project}/keys/{key}`. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest;
}

export const MigrateProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/keys/{keysId}:migrate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MigrateProjectsKeysRequest>;

export type MigrateProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;
export const MigrateProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Key;

export type MigrateProjectsKeysError = CommonErrors;

export const migrateProjectsKeys: API.OperationMethod<MigrateProjectsKeysRequest, MigrateProjectsKeysResponse, MigrateProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MigrateProjectsKeysRequest,
  output: MigrateProjectsKeysResponse,
  errors: [],
}));

/** Adds an IP override to a key. The following restrictions hold: * The maximum number of IP overrides per key is 1000. * For any conflict (such as IP already exists or IP part of an existing IP range), an error is returned. */
export interface AddIpOverrideProjectsKeysRequest {
  /** Required. The name of the key to which the IP override is added, in the format `projects/{project}/keys/{key}`. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest;
}

export const AddIpOverrideProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1AddIpOverrideRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/keys/{keysId}:addIpOverride", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddIpOverrideProjectsKeysRequest>;

export type AddIpOverrideProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse;
export const AddIpOverrideProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1AddIpOverrideResponse;

export type AddIpOverrideProjectsKeysError = CommonErrors;

export const addIpOverrideProjectsKeys: API.OperationMethod<AddIpOverrideProjectsKeysRequest, AddIpOverrideProjectsKeysResponse, AddIpOverrideProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddIpOverrideProjectsKeysRequest,
  output: AddIpOverrideProjectsKeysResponse,
  errors: [],
}));

/** Removes an IP override from a key. The following restrictions hold: * If the IP isn't found in an existing IP override, a `NOT_FOUND` error is returned. * If the IP is found in an existing IP override, but the override type does not match, a `NOT_FOUND` error is returned. */
export interface RemoveIpOverrideProjectsKeysRequest {
  /** Required. The name of the key from which the IP override is removed, in the format `projects/{project}/keys/{key}`. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest;
}

export const RemoveIpOverrideProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/keys/{keysId}:removeIpOverride", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveIpOverrideProjectsKeysRequest>;

export type RemoveIpOverrideProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse;
export const RemoveIpOverrideProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1RemoveIpOverrideResponse;

export type RemoveIpOverrideProjectsKeysError = CommonErrors;

export const removeIpOverrideProjectsKeys: API.OperationMethod<RemoveIpOverrideProjectsKeysRequest, RemoveIpOverrideProjectsKeysResponse, RemoveIpOverrideProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveIpOverrideProjectsKeysRequest,
  output: RemoveIpOverrideProjectsKeysResponse,
  errors: [],
}));

/** Lists all IP overrides for a key. */
export interface ListIpOverridesProjectsKeysRequest {
  /** Required. The parent key for which the IP overrides are listed, in the format `projects/{project}/keys/{key}`. */
  parent: string;
  /** Optional. The maximum number of overrides to return. Default is 10. Max limit is 100. If the number of overrides is less than the page_size, all overrides are returned. If the page size is more than 100, it is coerced to 100. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous ListIpOverridesRequest, if any. */
  pageToken?: string;
}

export const ListIpOverridesProjectsKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/keys/{keysId}:listIpOverrides" }),
  svc,
) as unknown as Schema.Schema<ListIpOverridesProjectsKeysRequest>;

export type ListIpOverridesProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse;
export const ListIpOverridesProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1ListIpOverridesResponse;

export type ListIpOverridesProjectsKeysError = CommonErrors;

export const listIpOverridesProjectsKeys = API.makePaginated(() => ({
  input: ListIpOverridesProjectsKeysRequest,
  output: ListIpOverridesProjectsKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get some aggregated metrics for a Key. This data can be used to build dashboards. */
export interface GetMetricsProjectsKeysRequest {
  /** Required. The name of the requested metrics, in the format `projects/{project}/keys/{key}/metrics`. */
  name: string;
}

export const GetMetricsProjectsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/keys/{keysId}/metrics" }),
  svc,
) as unknown as Schema.Schema<GetMetricsProjectsKeysRequest>;

export type GetMetricsProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Metrics;
export const GetMetricsProjectsKeysResponse = GoogleCloudRecaptchaenterpriseV1Metrics;

export type GetMetricsProjectsKeysError = CommonErrors;

export const getMetricsProjectsKeys: API.OperationMethod<GetMetricsProjectsKeysRequest, GetMetricsProjectsKeysResponse, GetMetricsProjectsKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetricsProjectsKeysRequest,
  output: GetMetricsProjectsKeysResponse,
  errors: [],
}));

/** Creates a new FirewallPolicy, specifying conditions at which reCAPTCHA Enterprise actions can be executed. A project may have a maximum of 1000 policies. */
export interface CreateProjectsFirewallpoliciesRequest {
  /** Required. The name of the project this policy applies to, in the format `projects/{project}`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1FirewallPolicy;
}

export const CreateProjectsFirewallpoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/firewallpolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsFirewallpoliciesRequest>;

export type CreateProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1FirewallPolicy;
export const CreateProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1FirewallPolicy;

export type CreateProjectsFirewallpoliciesError = CommonErrors;

export const createProjectsFirewallpolicies: API.OperationMethod<CreateProjectsFirewallpoliciesRequest, CreateProjectsFirewallpoliciesResponse, CreateProjectsFirewallpoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsFirewallpoliciesRequest,
  output: CreateProjectsFirewallpoliciesResponse,
  errors: [],
}));

/** Returns the list of all firewall policies that belong to a project. */
export interface ListProjectsFirewallpoliciesRequest {
  /** Required. The name of the project to list the policies for, in the format `projects/{project}`. */
  parent: string;
  /** Optional. The maximum number of policies to return. Default is 10. Max limit is 1000. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous. ListFirewallPoliciesRequest, if any. */
  pageToken?: string;
}

export const ListProjectsFirewallpoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/firewallpolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsFirewallpoliciesRequest>;

export type ListProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse;
export const ListProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1ListFirewallPoliciesResponse;

export type ListProjectsFirewallpoliciesError = CommonErrors;

export const listProjectsFirewallpolicies = API.makePaginated(() => ({
  input: ListProjectsFirewallpoliciesRequest,
  output: ListProjectsFirewallpoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the specified firewall policy. */
export interface GetProjectsFirewallpoliciesRequest {
  /** Required. The name of the requested policy, in the format `projects/{project}/firewallpolicies/{firewallpolicy}`. */
  name: string;
}

export const GetProjectsFirewallpoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/firewallpolicies/{firewallpoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsFirewallpoliciesRequest>;

export type GetProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1FirewallPolicy;
export const GetProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1FirewallPolicy;

export type GetProjectsFirewallpoliciesError = CommonErrors;

export const getProjectsFirewallpolicies: API.OperationMethod<GetProjectsFirewallpoliciesRequest, GetProjectsFirewallpoliciesResponse, GetProjectsFirewallpoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsFirewallpoliciesRequest,
  output: GetProjectsFirewallpoliciesResponse,
  errors: [],
}));

/** Updates the specified firewall policy. */
export interface PatchProjectsFirewallpoliciesRequest {
  /** Identifier. The resource name for the FirewallPolicy in the format `projects/{project}/firewallpolicies/{firewallpolicy}`. */
  name: string;
  /** Optional. The mask to control which fields of the policy get updated. If the mask is not present, all fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1FirewallPolicy;
}

export const PatchProjectsFirewallpoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1FirewallPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/firewallpolicies/{firewallpoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsFirewallpoliciesRequest>;

export type PatchProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1FirewallPolicy;
export const PatchProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1FirewallPolicy;

export type PatchProjectsFirewallpoliciesError = CommonErrors;

export const patchProjectsFirewallpolicies: API.OperationMethod<PatchProjectsFirewallpoliciesRequest, PatchProjectsFirewallpoliciesResponse, PatchProjectsFirewallpoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsFirewallpoliciesRequest,
  output: PatchProjectsFirewallpoliciesResponse,
  errors: [],
}));

/** Deletes the specified firewall policy. */
export interface DeleteProjectsFirewallpoliciesRequest {
  /** Required. The name of the policy to be deleted, in the format `projects/{project}/firewallpolicies/{firewallpolicy}`. */
  name: string;
}

export const DeleteProjectsFirewallpoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/firewallpolicies/{firewallpoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsFirewallpoliciesRequest>;

export type DeleteProjectsFirewallpoliciesResponse = GoogleProtobufEmpty;
export const DeleteProjectsFirewallpoliciesResponse = GoogleProtobufEmpty;

export type DeleteProjectsFirewallpoliciesError = CommonErrors;

export const deleteProjectsFirewallpolicies: API.OperationMethod<DeleteProjectsFirewallpoliciesRequest, DeleteProjectsFirewallpoliciesResponse, DeleteProjectsFirewallpoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsFirewallpoliciesRequest,
  output: DeleteProjectsFirewallpoliciesResponse,
  errors: [],
}));

/** Reorders all firewall policies. */
export interface ReorderProjectsFirewallpoliciesRequest {
  /** Required. The name of the project to list the policies for, in the format `projects/{project}`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest;
}

export const ReorderProjectsFirewallpoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/firewallpolicies:reorder", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReorderProjectsFirewallpoliciesRequest>;

export type ReorderProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse;
export const ReorderProjectsFirewallpoliciesResponse = GoogleCloudRecaptchaenterpriseV1ReorderFirewallPoliciesResponse;

export type ReorderProjectsFirewallpoliciesError = CommonErrors;

export const reorderProjectsFirewallpolicies: API.OperationMethod<ReorderProjectsFirewallpoliciesRequest, ReorderProjectsFirewallpoliciesResponse, ReorderProjectsFirewallpoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReorderProjectsFirewallpoliciesRequest,
  output: ReorderProjectsFirewallpoliciesResponse,
  errors: [],
}));

/** List groups of related accounts. */
export interface ListProjectsRelatedaccountgroupsRequest {
  /** Required. The name of the project to list related account groups from, in the format `projects/{project}`. */
  parent: string;
  /** Optional. The maximum number of groups to return. The service might return fewer than this value. If unspecified, at most 50 groups are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListRelatedAccountGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRelatedAccountGroups` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsRelatedaccountgroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/relatedaccountgroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRelatedaccountgroupsRequest>;

export type ListProjectsRelatedaccountgroupsResponse = GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse;
export const ListProjectsRelatedaccountgroupsResponse = GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse;

export type ListProjectsRelatedaccountgroupsError = CommonErrors;

export const listProjectsRelatedaccountgroups = API.makePaginated(() => ({
  input: ListProjectsRelatedaccountgroupsRequest,
  output: ListProjectsRelatedaccountgroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get memberships in a group of related accounts. */
export interface ListProjectsRelatedaccountgroupsMembershipsRequest {
  /** Required. The resource name for the related account group in the format `projects/{project}/relatedaccountgroups/{relatedaccountgroup}`. */
  parent: string;
  /** Optional. The maximum number of accounts to return. The service might return fewer than this value. If unspecified, at most 50 accounts are returned. The maximum value is 1000; values above 1000 are coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListRelatedAccountGroupMemberships` call. When paginating, all other parameters provided to `ListRelatedAccountGroupMemberships` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsRelatedaccountgroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/relatedaccountgroups/{relatedaccountgroupsId}/memberships" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRelatedaccountgroupsMembershipsRequest>;

export type ListProjectsRelatedaccountgroupsMembershipsResponse = GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse;
export const ListProjectsRelatedaccountgroupsMembershipsResponse = GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse;

export type ListProjectsRelatedaccountgroupsMembershipsError = CommonErrors;

export const listProjectsRelatedaccountgroupsMemberships = API.makePaginated(() => ({
  input: ListProjectsRelatedaccountgroupsMembershipsRequest,
  output: ListProjectsRelatedaccountgroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Search group memberships related to a given account. */
export interface SearchProjectsRelatedaccountgroupmembershipsRequest {
  /** Required. The name of the project to search related account group memberships from. Specify the project name in the following format: `projects/{project}`. */
  project: string;
  /** Request body */
  body?: GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest;
}

export const SearchProjectsRelatedaccountgroupmembershipsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/relatedaccountgroupmemberships:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchProjectsRelatedaccountgroupmembershipsRequest>;

export type SearchProjectsRelatedaccountgroupmembershipsResponse = GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse;
export const SearchProjectsRelatedaccountgroupmembershipsResponse = GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse;

export type SearchProjectsRelatedaccountgroupmembershipsError = CommonErrors;

export const searchProjectsRelatedaccountgroupmemberships: API.OperationMethod<SearchProjectsRelatedaccountgroupmembershipsRequest, SearchProjectsRelatedaccountgroupmembershipsResponse, SearchProjectsRelatedaccountgroupmembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchProjectsRelatedaccountgroupmembershipsRequest,
  output: SearchProjectsRelatedaccountgroupmembershipsResponse,
  errors: [],
}));

