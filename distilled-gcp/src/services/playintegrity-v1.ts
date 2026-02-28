// ==========================================================================
// Google Play Integrity API (playintegrity v1)
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
  name: "playintegrity",
  version: "v1",
  rootUrl: "https://playintegrity.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DecodeIntegrityTokenRequest {
  /** Encoded integrity token. */
  integrityToken?: string;
}

export const DecodeIntegrityTokenRequest: Schema.Schema<DecodeIntegrityTokenRequest> = Schema.suspend(() => Schema.Struct({
  integrityToken: Schema.optional(Schema.String),
})).annotate({ identifier: "DecodeIntegrityTokenRequest" }) as any as Schema.Schema<DecodeIntegrityTokenRequest>;

export interface RequestDetails {
  /** Required. Application package name this attestation was requested for. Note: This field makes no guarantees or promises on the caller integrity. For details on application integrity, check application_integrity. */
  requestPackageName?: string;
  /** Nonce that was provided in the request (which is base64 web-safe no-wrap). */
  nonce?: string;
  /** Required. Timestamp, in milliseconds, of the integrity application request. */
  timestampMillis?: string;
  /** Request hash that was provided in the request. */
  requestHash?: string;
}

export const RequestDetails: Schema.Schema<RequestDetails> = Schema.suspend(() => Schema.Struct({
  requestPackageName: Schema.optional(Schema.String),
  nonce: Schema.optional(Schema.String),
  timestampMillis: Schema.optional(Schema.String),
  requestHash: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestDetails" }) as any as Schema.Schema<RequestDetails>;

export interface AppIntegrity {
  /** Required. Details about the app recognition verdict */
  appRecognitionVerdict?: "UNKNOWN" | "PLAY_RECOGNIZED" | "UNRECOGNIZED_VERSION" | "UNEVALUATED" | (string & {});
  /** Package name of the application under attestation. Set iff app_recognition_verdict != UNEVALUATED. */
  packageName?: string;
  /** The SHA256 hash of the requesting app's signing certificates (base64 web-safe encoded). Set iff app_recognition_verdict != UNEVALUATED. */
  certificateSha256Digest?: Array<string>;
  /** Version code of the application. Set iff app_recognition_verdict != UNEVALUATED. */
  versionCode?: string;
}

export const AppIntegrity: Schema.Schema<AppIntegrity> = Schema.suspend(() => Schema.Struct({
  appRecognitionVerdict: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  certificateSha256Digest: Schema.optional(Schema.Array(Schema.String)),
  versionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "AppIntegrity" }) as any as Schema.Schema<AppIntegrity>;

export interface RecentDeviceActivity {
  /** Required. Indicates the activity level of the device. */
  deviceActivityLevel?: "DEVICE_ACTIVITY_LEVEL_UNSPECIFIED" | "UNEVALUATED" | "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "LEVEL_4" | (string & {});
}

export const RecentDeviceActivity: Schema.Schema<RecentDeviceActivity> = Schema.suspend(() => Schema.Struct({
  deviceActivityLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "RecentDeviceActivity" }) as any as Schema.Schema<RecentDeviceActivity>;

export interface Values {
  /** Required. First recall bit value. */
  bitFirst?: boolean;
  /** Required. Second recall bit value. */
  bitSecond?: boolean;
  /** Required. Third recall bit value. */
  bitThird?: boolean;
}

export const Values: Schema.Schema<Values> = Schema.suspend(() => Schema.Struct({
  bitFirst: Schema.optional(Schema.Boolean),
  bitSecond: Schema.optional(Schema.Boolean),
  bitThird: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Values" }) as any as Schema.Schema<Values>;

export interface WriteDates {
  /** Optional. Write time in YYYYMM format (in UTC, e.g. 202402) for the first bit. Note that this value won't be set if the first bit is false. */
  yyyymmFirst?: number;
  /** Optional. Write time in YYYYMM format (in UTC, e.g. 202402) for the second bit. Note that this value won't be set if the second bit is false. */
  yyyymmSecond?: number;
  /** Optional. Write time in YYYYMM format (in UTC, e.g. 202402) for the third bit. Note that this value won't be set if the third bit is false. */
  yyyymmThird?: number;
}

export const WriteDates: Schema.Schema<WriteDates> = Schema.suspend(() => Schema.Struct({
  yyyymmFirst: Schema.optional(Schema.Number),
  yyyymmSecond: Schema.optional(Schema.Number),
  yyyymmThird: Schema.optional(Schema.Number),
})).annotate({ identifier: "WriteDates" }) as any as Schema.Schema<WriteDates>;

export interface DeviceRecall {
  /** Required. Contains the recall bits values. */
  values?: Values;
  /** Required. Contains the recall bits write dates. */
  writeDates?: WriteDates;
}

export const DeviceRecall: Schema.Schema<DeviceRecall> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Values),
  writeDates: Schema.optional(WriteDates),
})).annotate({ identifier: "DeviceRecall" }) as any as Schema.Schema<DeviceRecall>;

export interface DeviceAttributes {
  /** Android SDK version of the device, as defined in the public Android documentation: https://developer.android.com/reference/android/os/Build.VERSION_CODES. It won't be set if a necessary requirement was missed. For example DeviceIntegrity did not meet the minimum bar. */
  sdkVersion?: number;
}

export const DeviceAttributes: Schema.Schema<DeviceAttributes> = Schema.suspend(() => Schema.Struct({
  sdkVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeviceAttributes" }) as any as Schema.Schema<DeviceAttributes>;

export interface DeviceIntegrity {
  /** Details about the integrity of the device the app is running on. */
  deviceRecognitionVerdict?: Array<"UNKNOWN" | "MEETS_BASIC_INTEGRITY" | "MEETS_DEVICE_INTEGRITY" | "MEETS_STRONG_INTEGRITY" | "MEETS_VIRTUAL_INTEGRITY" | (string & {})>;
  /** Details about the device activity of the device the app is running on. */
  recentDeviceActivity?: RecentDeviceActivity;
  /** Details about the device recall bits set by the developer. */
  deviceRecall?: DeviceRecall;
  /** Attributes of the device where the integrity token was generated. */
  deviceAttributes?: DeviceAttributes;
  /** Contains legacy details about the integrity of the device the app is running on. Only for devices with Android version T or higher and only for apps opted in to the new verdicts. Only available during the transition period to the new verdicts system and will be removed afterwards. */
  legacyDeviceRecognitionVerdict?: Array<"UNKNOWN" | "MEETS_BASIC_INTEGRITY" | "MEETS_DEVICE_INTEGRITY" | "MEETS_STRONG_INTEGRITY" | "MEETS_VIRTUAL_INTEGRITY" | (string & {})>;
}

export const DeviceIntegrity: Schema.Schema<DeviceIntegrity> = Schema.suspend(() => Schema.Struct({
  deviceRecognitionVerdict: Schema.optional(Schema.Array(Schema.String)),
  recentDeviceActivity: Schema.optional(RecentDeviceActivity),
  deviceRecall: Schema.optional(DeviceRecall),
  deviceAttributes: Schema.optional(DeviceAttributes),
  legacyDeviceRecognitionVerdict: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeviceIntegrity" }) as any as Schema.Schema<DeviceIntegrity>;

export interface AccountActivity {
  /** Required. Indicates the activity level of the account. */
  activityLevel?: "ACTIVITY_LEVEL_UNSPECIFIED" | "UNEVALUATED" | "UNUSUAL" | "UNKNOWN" | "TYPICAL_BASIC" | "TYPICAL_STRONG" | (string & {});
}

export const AccountActivity: Schema.Schema<AccountActivity> = Schema.suspend(() => Schema.Struct({
  activityLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountActivity" }) as any as Schema.Schema<AccountActivity>;

export interface AccountDetails {
  /** Required. Details about the licensing status of the user for the app in the scope. */
  appLicensingVerdict?: "UNKNOWN" | "LICENSED" | "UNLICENSED" | "UNEVALUATED" | (string & {});
  /** (Restricted Access) Details about the account activity for the user in the scope. */
  accountActivity?: AccountActivity;
}

export const AccountDetails: Schema.Schema<AccountDetails> = Schema.suspend(() => Schema.Struct({
  appLicensingVerdict: Schema.optional(Schema.String),
  accountActivity: Schema.optional(AccountActivity),
})).annotate({ identifier: "AccountDetails" }) as any as Schema.Schema<AccountDetails>;

export interface TestingDetails {
  /** Required. Indicates that the information contained in this payload is a testing response that is statically overridden for a tester. */
  isTestingResponse?: boolean;
}

export const TestingDetails: Schema.Schema<TestingDetails> = Schema.suspend(() => Schema.Struct({
  isTestingResponse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TestingDetails" }) as any as Schema.Schema<TestingDetails>;

export interface AppAccessRiskVerdict {
  /** List of detected app types signalled for App Access Risk. */
  appsDetected?: Array<"APPS_DETECTED_UNSPECIFIED" | "KNOWN_INSTALLED" | "KNOWN_CAPTURING" | "KNOWN_OVERLAYS" | "KNOWN_CONTROLLING" | "UNKNOWN_INSTALLED" | "UNKNOWN_CAPTURING" | "UNKNOWN_OVERLAYS" | "UNKNOWN_CONTROLLING" | (string & {})>;
}

export const AppAccessRiskVerdict: Schema.Schema<AppAccessRiskVerdict> = Schema.suspend(() => Schema.Struct({
  appsDetected: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AppAccessRiskVerdict" }) as any as Schema.Schema<AppAccessRiskVerdict>;

export interface EnvironmentDetails {
  /** The evaluation of Play Protect verdict. */
  playProtectVerdict?: "PLAY_PROTECT_VERDICT_UNSPECIFIED" | "UNEVALUATED" | "NO_ISSUES" | "NO_DATA" | "MEDIUM_RISK" | "HIGH_RISK" | "POSSIBLE_RISK" | (string & {});
  /** The evaluation of the App Access Risk verdicts. */
  appAccessRiskVerdict?: AppAccessRiskVerdict;
}

export const EnvironmentDetails: Schema.Schema<EnvironmentDetails> = Schema.suspend(() => Schema.Struct({
  playProtectVerdict: Schema.optional(Schema.String),
  appAccessRiskVerdict: Schema.optional(AppAccessRiskVerdict),
})).annotate({ identifier: "EnvironmentDetails" }) as any as Schema.Schema<EnvironmentDetails>;

export interface TokenPayloadExternal {
  /** Required. Details about the integrity request. */
  requestDetails?: RequestDetails;
  /** Required. Details about the application integrity. */
  appIntegrity?: AppIntegrity;
  /** Required. Details about the device integrity. */
  deviceIntegrity?: DeviceIntegrity;
  /** Required. Details about the Play Store account. */
  accountDetails?: AccountDetails;
  /** Indicates that this payload is generated for testing purposes and contains any additional data that is linked with testing status. */
  testingDetails?: TestingDetails;
  /** Details of the environment Play Integrity API runs in. */
  environmentDetails?: EnvironmentDetails;
}

export const TokenPayloadExternal: Schema.Schema<TokenPayloadExternal> = Schema.suspend(() => Schema.Struct({
  requestDetails: Schema.optional(RequestDetails),
  appIntegrity: Schema.optional(AppIntegrity),
  deviceIntegrity: Schema.optional(DeviceIntegrity),
  accountDetails: Schema.optional(AccountDetails),
  testingDetails: Schema.optional(TestingDetails),
  environmentDetails: Schema.optional(EnvironmentDetails),
})).annotate({ identifier: "TokenPayloadExternal" }) as any as Schema.Schema<TokenPayloadExternal>;

export interface DecodeIntegrityTokenResponse {
  /** Plain token payload generated from the decoded integrity token. */
  tokenPayloadExternal?: TokenPayloadExternal;
}

export const DecodeIntegrityTokenResponse: Schema.Schema<DecodeIntegrityTokenResponse> = Schema.suspend(() => Schema.Struct({
  tokenPayloadExternal: Schema.optional(TokenPayloadExternal),
})).annotate({ identifier: "DecodeIntegrityTokenResponse" }) as any as Schema.Schema<DecodeIntegrityTokenResponse>;

export interface WriteDeviceRecallRequest {
  /** Required. Integrity token obtained from calling Play Integrity API. */
  integrityToken?: string;
  /** Required. The new values for the device recall bits to be written. */
  newValues?: Values;
}

export const WriteDeviceRecallRequest: Schema.Schema<WriteDeviceRecallRequest> = Schema.suspend(() => Schema.Struct({
  integrityToken: Schema.optional(Schema.String),
  newValues: Schema.optional(Values),
})).annotate({ identifier: "WriteDeviceRecallRequest" }) as any as Schema.Schema<WriteDeviceRecallRequest>;

export interface WriteDeviceRecallResponse {
}

export const WriteDeviceRecallResponse: Schema.Schema<WriteDeviceRecallResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WriteDeviceRecallResponse" }) as any as Schema.Schema<WriteDeviceRecallResponse>;

export interface DecodePcIntegrityTokenRequest {
  /** Encoded integrity token. */
  integrityToken?: string;
}

export const DecodePcIntegrityTokenRequest: Schema.Schema<DecodePcIntegrityTokenRequest> = Schema.suspend(() => Schema.Struct({
  integrityToken: Schema.optional(Schema.String),
})).annotate({ identifier: "DecodePcIntegrityTokenRequest" }) as any as Schema.Schema<DecodePcIntegrityTokenRequest>;

export interface PcRequestDetails {
  /** Required. Application package name this attestation was requested for. Note: This field makes no guarantees or promises on the caller integrity. */
  requestPackageName?: string;
  /** Required. Timestamp, of the integrity application request. */
  requestTime?: string;
  /** Request hash that was provided in the request. */
  requestHash?: string;
}

export const PcRequestDetails: Schema.Schema<PcRequestDetails> = Schema.suspend(() => Schema.Struct({
  requestPackageName: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  requestHash: Schema.optional(Schema.String),
})).annotate({ identifier: "PcRequestDetails" }) as any as Schema.Schema<PcRequestDetails>;

export interface PcDeviceIntegrity {
  /** Details about the integrity of the device the app is running on. */
  deviceRecognitionVerdict?: Array<"DEVICE_RECOGNITION_VERDICT_UNSPECIFIED" | "MEETS_PC_INTEGRITY" | (string & {})>;
}

export const PcDeviceIntegrity: Schema.Schema<PcDeviceIntegrity> = Schema.suspend(() => Schema.Struct({
  deviceRecognitionVerdict: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PcDeviceIntegrity" }) as any as Schema.Schema<PcDeviceIntegrity>;

export interface PcAccountDetails {
  /** Required. Details about the licensing status of the user for the app in the scope. */
  appLicensingVerdict?: "UNKNOWN" | "LICENSED" | "UNLICENSED" | "UNEVALUATED" | (string & {});
}

export const PcAccountDetails: Schema.Schema<PcAccountDetails> = Schema.suspend(() => Schema.Struct({
  appLicensingVerdict: Schema.optional(Schema.String),
})).annotate({ identifier: "PcAccountDetails" }) as any as Schema.Schema<PcAccountDetails>;

export interface PcTestingDetails {
  /** Indicates that the information contained in this payload is a testing response that is statically overridden for a tester. */
  isTestingResponse?: boolean;
}

export const PcTestingDetails: Schema.Schema<PcTestingDetails> = Schema.suspend(() => Schema.Struct({
  isTestingResponse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PcTestingDetails" }) as any as Schema.Schema<PcTestingDetails>;

export interface PcTokenPayloadExternal {
  /** Required. Details about the integrity request. */
  requestDetails?: PcRequestDetails;
  /** Required. Details about the device integrity. */
  deviceIntegrity?: PcDeviceIntegrity;
  /** Details about the account information such as the licensing status. */
  accountDetails?: PcAccountDetails;
  /** Indicates that this payload is generated for testing purposes and contains any additional data that is linked with testing status. */
  testingDetails?: PcTestingDetails;
}

export const PcTokenPayloadExternal: Schema.Schema<PcTokenPayloadExternal> = Schema.suspend(() => Schema.Struct({
  requestDetails: Schema.optional(PcRequestDetails),
  deviceIntegrity: Schema.optional(PcDeviceIntegrity),
  accountDetails: Schema.optional(PcAccountDetails),
  testingDetails: Schema.optional(PcTestingDetails),
})).annotate({ identifier: "PcTokenPayloadExternal" }) as any as Schema.Schema<PcTokenPayloadExternal>;

export interface DecodePcIntegrityTokenResponse {
  /** Plain token payload generated from the decoded integrity token. */
  tokenPayloadExternal?: PcTokenPayloadExternal;
}

export const DecodePcIntegrityTokenResponse: Schema.Schema<DecodePcIntegrityTokenResponse> = Schema.suspend(() => Schema.Struct({
  tokenPayloadExternal: Schema.optional(PcTokenPayloadExternal),
})).annotate({ identifier: "DecodePcIntegrityTokenResponse" }) as any as Schema.Schema<DecodePcIntegrityTokenResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Decodes the integrity token and returns the token payload. */
export interface DecodeIntegrityTokenV1Request {
  /** Package name of the app the attached integrity token belongs to. */
  packageName: string;
  /** Request body */
  body?: DecodeIntegrityTokenRequest;
}

export const DecodeIntegrityTokenV1Request = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(DecodeIntegrityTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}:decodeIntegrityToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DecodeIntegrityTokenV1Request>;

export type DecodeIntegrityTokenV1Response = DecodeIntegrityTokenResponse;
export const DecodeIntegrityTokenV1Response = DecodeIntegrityTokenResponse;

export type DecodeIntegrityTokenV1Error = CommonErrors;

export const decodeIntegrityTokenV1: API.OperationMethod<DecodeIntegrityTokenV1Request, DecodeIntegrityTokenV1Response, DecodeIntegrityTokenV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DecodeIntegrityTokenV1Request,
  output: DecodeIntegrityTokenV1Response,
  errors: [],
}));

/** Decodes the PC integrity token and returns the PC token payload. */
export interface DecodePcIntegrityTokenV1Request {
  /** Package name of the app the attached integrity token belongs to. */
  packageName: string;
  /** Request body */
  body?: DecodePcIntegrityTokenRequest;
}

export const DecodePcIntegrityTokenV1Request = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(DecodePcIntegrityTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}:decodePcIntegrityToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DecodePcIntegrityTokenV1Request>;

export type DecodePcIntegrityTokenV1Response = DecodePcIntegrityTokenResponse;
export const DecodePcIntegrityTokenV1Response = DecodePcIntegrityTokenResponse;

export type DecodePcIntegrityTokenV1Error = CommonErrors;

export const decodePcIntegrityTokenV1: API.OperationMethod<DecodePcIntegrityTokenV1Request, DecodePcIntegrityTokenV1Response, DecodePcIntegrityTokenV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DecodePcIntegrityTokenV1Request,
  output: DecodePcIntegrityTokenV1Response,
  errors: [],
}));

/** Writes recall bits for the device where Play Integrity API token is obtained. The endpoint is available to select Play partners in an early access program (EAP). */
export interface WriteDeviceRecallRequest_Op {
  /** Required. Package name of the app the attached integrity token belongs to. */
  packageName: string;
  /** Request body */
  body?: WriteDeviceRecallRequest;
}

export const WriteDeviceRecallRequest_Op = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(WriteDeviceRecallRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/{v1Id}/deviceRecall:write", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteDeviceRecallRequest_Op>;

export type WriteDeviceRecallResponse_Op = WriteDeviceRecallResponse;
export const WriteDeviceRecallResponse_Op = WriteDeviceRecallResponse;

export type WriteDeviceRecallError = CommonErrors;

export const writeDeviceRecall: API.OperationMethod<WriteDeviceRecallRequest_Op, WriteDeviceRecallResponse_Op, WriteDeviceRecallError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteDeviceRecallRequest_Op,
  output: WriteDeviceRecallResponse_Op,
  errors: [],
}));

