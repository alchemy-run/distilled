import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "AmplifyBackend",
  serviceShapeName: "AmplifyBackend",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "amplifybackend" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-08-11");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://amplifybackend-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://amplifybackend-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://amplifybackend.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://amplifybackend.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://amplifybackend.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimeoutException>()(
    "GatewayTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      LimitType: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export interface CloneBackendRequest {
  AppId: string;
  BackendEnvironmentName: string;
  TargetEnvironmentName?: string;
}
export interface CloneBackendResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface ResourceConfig {}
export interface CreateBackendRequest {
  AppId?: string;
  AppName?: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: ResourceConfig;
  ResourceName?: string;
}
export interface CreateBackendResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export type Mode =
  | "API_KEY"
  | "AWS_IAM"
  | "AMAZON_COGNITO_USER_POOLS"
  | "OPENID_CONNECT"
  | (string & {});
export interface BackendAPIAppSyncAuthSettings {
  CognitoUserPoolId?: string;
  Description?: string;
  ExpirationTime?: number;
  OpenIDAuthTTL?: string;
  OpenIDClientId?: string;
  OpenIDIatTTL?: string;
  OpenIDIssueURL?: string;
  OpenIDProviderName?: string;
}
export interface BackendAPIAuthType {
  Mode?: Mode;
  Settings?: BackendAPIAppSyncAuthSettings;
}
export type ListOfBackendAPIAuthType = BackendAPIAuthType[];
export type ResolutionStrategy =
  | "OPTIMISTIC_CONCURRENCY"
  | "LAMBDA"
  | "AUTOMERGE"
  | "NONE"
  | (string & {});
export interface BackendAPIConflictResolution {
  ResolutionStrategy?: ResolutionStrategy;
}
export interface BackendAPIResourceConfig {
  AdditionalAuthTypes?: BackendAPIAuthType[];
  ApiName?: string;
  ConflictResolution?: BackendAPIConflictResolution;
  DefaultAuthType?: BackendAPIAuthType;
  Service?: string;
  TransformSchema?: string;
}
export interface CreateBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export interface CreateBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export type AuthResources = "USER_POOL_ONLY" | "IDENTITY_POOL_AND_USER_POOL" | (string & {});
export interface CreateBackendAuthIdentityPoolConfig {
  IdentityPoolName?: string;
  UnauthenticatedLogin?: boolean;
}
export type Service = "COGNITO" | (string & {});
export type DeliveryMethod = "EMAIL" | "SMS" | (string & {});
export interface EmailSettings {
  EmailMessage?: string;
  EmailSubject?: string;
}
export interface SmsSettings {
  SmsMessage?: string;
}
export interface CreateBackendAuthForgotPasswordConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export type MFAMode = "ON" | "OFF" | "OPTIONAL" | (string & {});
export type MfaTypesElement = "SMS" | "TOTP" | (string & {});
export type ListOfMfaTypesElement = MfaTypesElement[];
export interface Settings {
  MfaTypes?: MfaTypesElement[];
  SmsMessage?: string;
}
export interface CreateBackendAuthMFAConfig {
  MFAMode?: MFAMode;
  Settings?: Settings;
}
export type OAuthGrantType = "CODE" | "IMPLICIT" | (string & {});
export type OAuthScopesElement =
  | "PHONE"
  | "EMAIL"
  | "OPENID"
  | "PROFILE"
  | "AWS_COGNITO_SIGNIN_USER_ADMIN"
  | (string & {});
export type ListOfOAuthScopesElement = OAuthScopesElement[];
export type ListOf__string = string[];
export interface BackendAuthSocialProviderConfig {
  ClientId?: string;
  ClientSecret?: string;
}
export interface BackendAuthAppleProviderConfig {
  ClientId?: string;
  KeyId?: string;
  PrivateKey?: string;
  TeamId?: string;
}
export interface SocialProviderSettings {
  Facebook?: BackendAuthSocialProviderConfig;
  Google?: BackendAuthSocialProviderConfig;
  LoginWithAmazon?: BackendAuthSocialProviderConfig;
  SignInWithApple?: BackendAuthAppleProviderConfig;
}
export interface CreateBackendAuthOAuthConfig {
  DomainPrefix?: string;
  OAuthGrantType?: OAuthGrantType;
  OAuthScopes?: OAuthScopesElement[];
  RedirectSignInURIs?: string[];
  RedirectSignOutURIs?: string[];
  SocialProviderSettings?: SocialProviderSettings;
}
export type AdditionalConstraintsElement =
  | "REQUIRE_DIGIT"
  | "REQUIRE_LOWERCASE"
  | "REQUIRE_SYMBOL"
  | "REQUIRE_UPPERCASE"
  | (string & {});
export type ListOfAdditionalConstraintsElement = AdditionalConstraintsElement[];
export interface CreateBackendAuthPasswordPolicyConfig {
  AdditionalConstraints?: AdditionalConstraintsElement[];
  MinimumLength?: number;
}
export type RequiredSignUpAttributesElement =
  | "ADDRESS"
  | "BIRTHDATE"
  | "EMAIL"
  | "FAMILY_NAME"
  | "GENDER"
  | "GIVEN_NAME"
  | "LOCALE"
  | "MIDDLE_NAME"
  | "NAME"
  | "NICKNAME"
  | "PHONE_NUMBER"
  | "PICTURE"
  | "PREFERRED_USERNAME"
  | "PROFILE"
  | "UPDATED_AT"
  | "WEBSITE"
  | "ZONE_INFO"
  | (string & {});
export type ListOfRequiredSignUpAttributesElement = RequiredSignUpAttributesElement[];
export type SignInMethod =
  | "EMAIL"
  | "EMAIL_AND_PHONE_NUMBER"
  | "PHONE_NUMBER"
  | "USERNAME"
  | (string & {});
export interface CreateBackendAuthVerificationMessageConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export interface CreateBackendAuthUserPoolConfig {
  ForgotPassword?: CreateBackendAuthForgotPasswordConfig;
  Mfa?: CreateBackendAuthMFAConfig;
  OAuth?: CreateBackendAuthOAuthConfig;
  PasswordPolicy?: CreateBackendAuthPasswordPolicyConfig;
  RequiredSignUpAttributes?: RequiredSignUpAttributesElement[];
  SignInMethod?: SignInMethod;
  UserPoolName?: string;
  VerificationMessage?: CreateBackendAuthVerificationMessageConfig;
}
export interface CreateBackendAuthResourceConfig {
  AuthResources?: AuthResources;
  IdentityPoolConfigs?: CreateBackendAuthIdentityPoolConfig;
  Service?: Service;
  UserPoolConfigs?: CreateBackendAuthUserPoolConfig;
}
export interface CreateBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: CreateBackendAuthResourceConfig;
  ResourceName?: string;
}
export interface CreateBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface CreateBackendConfigRequest {
  AppId: string;
  BackendManagerAppId?: string;
}
export interface CreateBackendConfigResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export type AuthenticatedElement = "READ" | "CREATE_AND_UPDATE" | "DELETE" | (string & {});
export type ListOfAuthenticatedElement = AuthenticatedElement[];
export type UnAuthenticatedElement = "READ" | "CREATE_AND_UPDATE" | "DELETE" | (string & {});
export type ListOfUnAuthenticatedElement = UnAuthenticatedElement[];
export interface BackendStoragePermissions {
  Authenticated?: AuthenticatedElement[];
  UnAuthenticated?: UnAuthenticatedElement[];
}
export type ServiceName = "S3" | (string & {});
export interface CreateBackendStorageResourceConfig {
  BucketName?: string;
  Permissions?: BackendStoragePermissions;
  ServiceName?: ServiceName;
}
export interface CreateBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: CreateBackendStorageResourceConfig;
  ResourceName?: string;
}
export interface CreateBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export interface CreateTokenRequest {
  AppId: string;
}
export interface CreateTokenResponse {
  AppId?: string;
  ChallengeCode?: string;
  SessionId?: string;
  Ttl?: string;
}
export interface DeleteBackendRequest {
  AppId: string;
  BackendEnvironmentName: string;
}
export interface DeleteBackendResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface DeleteBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export interface DeleteBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface DeleteBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export interface DeleteBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface DeleteBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
  ServiceName?: ServiceName;
}
export interface DeleteBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export interface DeleteTokenRequest {
  AppId: string;
  SessionId: string;
}
export interface DeleteTokenResponse {
  IsSuccess?: boolean;
}
export interface GenerateBackendAPIModelsRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export interface GenerateBackendAPIModelsResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface GetBackendRequest {
  AppId: string;
  BackendEnvironmentName?: string;
}
export interface GetBackendResponse {
  AmplifyFeatureFlags?: string;
  AmplifyMetaConfig?: string;
  AppId?: string;
  AppName?: string;
  BackendEnvironmentList?: string[];
  BackendEnvironmentName?: string;
  Error?: string;
}
export interface GetBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export interface GetBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export interface GetBackendAPIModelsRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export type Status = "LATEST" | "STALE" | (string & {});
export interface GetBackendAPIModelsResponse {
  Models?: string;
  Status?: Status;
  ModelIntrospectionSchema?: string;
}
export interface GetBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export interface GetBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  ResourceConfig?: CreateBackendAuthResourceConfig & {
    AuthResources: AuthResources;
    Service: Service;
    UserPoolConfigs: CreateBackendAuthUserPoolConfig & {
      RequiredSignUpAttributes: ListOfRequiredSignUpAttributesElement;
      SignInMethod: SignInMethod;
      UserPoolName: string;
      ForgotPassword: CreateBackendAuthForgotPasswordConfig & { DeliveryMethod: DeliveryMethod };
      Mfa: CreateBackendAuthMFAConfig & { MFAMode: MFAMode };
      OAuth: CreateBackendAuthOAuthConfig & {
        OAuthGrantType: OAuthGrantType;
        OAuthScopes: ListOfOAuthScopesElement;
        RedirectSignInURIs: ListOf__string;
        RedirectSignOutURIs: ListOf__string;
      };
      PasswordPolicy: CreateBackendAuthPasswordPolicyConfig & { MinimumLength: number };
      VerificationMessage: CreateBackendAuthVerificationMessageConfig & {
        DeliveryMethod: DeliveryMethod;
      };
    };
    IdentityPoolConfigs: CreateBackendAuthIdentityPoolConfig & {
      IdentityPoolName: string;
      UnauthenticatedLogin: boolean;
    };
  };
  ResourceName?: string;
}
export interface GetBackendJobRequest {
  AppId: string;
  BackendEnvironmentName: string;
  JobId: string;
}
export interface GetBackendJobResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  CreateTime?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
  UpdateTime?: string;
}
export interface GetBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceName?: string;
}
export interface GetBackendStorageResourceConfig {
  BucketName?: string;
  Imported?: boolean;
  Permissions?: BackendStoragePermissions;
  ServiceName?: ServiceName;
}
export interface GetBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  ResourceConfig?: GetBackendStorageResourceConfig & {
    Imported: boolean;
    ServiceName: ServiceName;
    Permissions: BackendStoragePermissions & { Authenticated: ListOfAuthenticatedElement };
  };
  ResourceName?: string;
}
export interface GetTokenRequest {
  AppId: string;
  SessionId: string;
}
export interface GetTokenResponse {
  AppId?: string;
  ChallengeCode?: string;
  SessionId?: string;
  Ttl?: string;
}
export interface ImportBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  IdentityPoolId?: string;
  NativeClientId?: string;
  UserPoolId?: string;
  WebClientId?: string;
}
export interface ImportBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface ImportBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  BucketName?: string;
  ServiceName?: ServiceName;
}
export interface ImportBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export type __integerMin1Max25 = number;
export interface ListBackendJobsRequest {
  AppId: string;
  BackendEnvironmentName: string;
  JobId?: string;
  MaxResults?: number;
  NextToken?: string;
  Operation?: string;
  Status?: string;
}
export interface BackendJobRespObj {
  AppId?: string;
  BackendEnvironmentName?: string;
  CreateTime?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
  UpdateTime?: string;
}
export type ListOfBackendJobRespObj = BackendJobRespObj[];
export interface ListBackendJobsResponse {
  Jobs?: (BackendJobRespObj & { AppId: string; BackendEnvironmentName: string })[];
  NextToken?: string;
}
export interface ListS3BucketsRequest {
  NextToken?: string;
}
export interface S3BucketInfo {
  CreationDate?: string;
  Name?: string;
}
export type ListOfS3BucketInfo = S3BucketInfo[];
export interface ListS3BucketsResponse {
  Buckets?: S3BucketInfo[];
  NextToken?: string;
}
export interface RemoveAllBackendsRequest {
  AppId: string;
  CleanAmplifyApp?: boolean;
}
export interface RemoveAllBackendsResponse {
  AppId?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface RemoveBackendConfigRequest {
  AppId: string;
}
export interface RemoveBackendConfigResponse {
  Error?: string;
}
export interface UpdateBackendAPIRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: BackendAPIResourceConfig;
  ResourceName?: string;
}
export interface UpdateBackendAPIResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface UpdateBackendAuthIdentityPoolConfig {
  UnauthenticatedLogin?: boolean;
}
export interface UpdateBackendAuthForgotPasswordConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export interface UpdateBackendAuthMFAConfig {
  MFAMode?: MFAMode;
  Settings?: Settings;
}
export interface UpdateBackendAuthOAuthConfig {
  DomainPrefix?: string;
  OAuthGrantType?: OAuthGrantType;
  OAuthScopes?: OAuthScopesElement[];
  RedirectSignInURIs?: string[];
  RedirectSignOutURIs?: string[];
  SocialProviderSettings?: SocialProviderSettings;
}
export interface UpdateBackendAuthPasswordPolicyConfig {
  AdditionalConstraints?: AdditionalConstraintsElement[];
  MinimumLength?: number;
}
export interface UpdateBackendAuthVerificationMessageConfig {
  DeliveryMethod?: DeliveryMethod;
  EmailSettings?: EmailSettings;
  SmsSettings?: SmsSettings;
}
export interface UpdateBackendAuthUserPoolConfig {
  ForgotPassword?: UpdateBackendAuthForgotPasswordConfig;
  Mfa?: UpdateBackendAuthMFAConfig;
  OAuth?: UpdateBackendAuthOAuthConfig;
  PasswordPolicy?: UpdateBackendAuthPasswordPolicyConfig;
  VerificationMessage?: UpdateBackendAuthVerificationMessageConfig;
}
export interface UpdateBackendAuthResourceConfig {
  AuthResources?: AuthResources;
  IdentityPoolConfigs?: UpdateBackendAuthIdentityPoolConfig;
  Service?: Service;
  UserPoolConfigs?: UpdateBackendAuthUserPoolConfig;
}
export interface UpdateBackendAuthRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: UpdateBackendAuthResourceConfig;
  ResourceName?: string;
}
export interface UpdateBackendAuthResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
}
export interface LoginAuthConfigReqObj {
  AwsCognitoIdentityPoolId?: string;
  AwsCognitoRegion?: string;
  AwsUserPoolsId?: string;
  AwsUserPoolsWebClientId?: string;
}
export interface UpdateBackendConfigRequest {
  AppId: string;
  LoginAuthConfig?: LoginAuthConfigReqObj;
}
export interface UpdateBackendConfigResponse {
  AppId?: string;
  BackendManagerAppId?: string;
  Error?: string;
  LoginAuthConfig?: LoginAuthConfigReqObj;
}
export interface UpdateBackendJobRequest {
  AppId: string;
  BackendEnvironmentName: string;
  JobId: string;
  Operation?: string;
  Status?: string;
}
export interface UpdateBackendJobResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  CreateTime?: string;
  Error?: string;
  JobId?: string;
  Operation?: string;
  Status?: string;
  UpdateTime?: string;
}
export interface UpdateBackendStorageResourceConfig {
  Permissions?: BackendStoragePermissions;
  ServiceName?: ServiceName;
}
export interface UpdateBackendStorageRequest {
  AppId: string;
  BackendEnvironmentName: string;
  ResourceConfig?: UpdateBackendStorageResourceConfig;
  ResourceName?: string;
}
export interface UpdateBackendStorageResponse {
  AppId?: string;
  BackendEnvironmentName?: string;
  JobId?: string;
  Status?: string;
}
export type CloneBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * This operation clones an existing backend.
 */
export const cloneBackend: API.OperationMethod<
  CloneBackendRequest,
  CloneBackendResponse,
  CloneBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<CloneBackendRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CloneBackendResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloneBackend",
}));

export type CreateBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * This operation creates a backend for an Amplify app. Backends are automatically created at the time of app creation.
 */
export const createBackend: API.OperationMethod<
  CreateBackendRequest,
  CreateBackendResponse,
  CreateBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(465, __c29, 1) as any as S.Schema<CreateBackendRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateBackendResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackend",
}));

export type CreateBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new backend API resource.
 */
export const createBackendAPI: API.OperationMethod<
  CreateBackendAPIRequest,
  CreateBackendAPIResponse,
  CreateBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<CreateBackendAPIRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateBackendAPIResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendAPI",
}));

export type CreateBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new backend authentication resource.
 */
export const createBackendAuth: API.OperationMethod<
  CreateBackendAuthRequest,
  CreateBackendAuthResponse,
  CreateBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<CreateBackendAuthRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateBackendAuthResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendAuth",
}));

export type CreateBackendConfigError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a config object for a backend.
 */
export const createBackendConfig: API.OperationMethod<
  CreateBackendConfigRequest,
  CreateBackendConfigResponse,
  CreateBackendConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<CreateBackendConfigRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<CreateBackendConfigResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendConfig",
}));

export type CreateBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a backend storage resource.
 */
export const createBackendStorage: API.OperationMethod<
  CreateBackendStorageRequest,
  CreateBackendStorageResponse,
  CreateBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(625, __c39, 1) as any as S.Schema<CreateBackendStorageRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<CreateBackendStorageResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendStorage",
}));

export type CreateTokenError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates a one-time challenge code to authenticate a user into your Amplify Admin UI.
 */
export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateTokenRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateTokenResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateToken",
}));

export type DeleteBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an existing environment from your Amplify project.
 */
export const deleteBackend: API.OperationMethod<
  DeleteBackendRequest,
  DeleteBackendResponse,
  DeleteBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteBackendRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteBackendResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackend",
}));

export type DeleteBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing backend API resource.
 */
export const deleteBackendAPI: API.OperationMethod<
  DeleteBackendAPIRequest,
  DeleteBackendAPIResponse,
  DeleteBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteBackendAPIRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteBackendAPIResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendAPI",
}));

export type DeleteBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing backend authentication resource.
 */
export const deleteBackendAuth: API.OperationMethod<
  DeleteBackendAuthRequest,
  DeleteBackendAuthResponse,
  DeleteBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteBackendAuthRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteBackendAuthResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendAuth",
}));

export type DeleteBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified backend storage resource.
 */
export const deleteBackendStorage: API.OperationMethod<
  DeleteBackendStorageRequest,
  DeleteBackendStorageResponse,
  DeleteBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DeleteBackendStorageRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<DeleteBackendStorageResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendStorage",
}));

export type DeleteTokenError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the challenge token based on the given appId and sessionId.
 */
export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  DeleteTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteTokenRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<DeleteTokenResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteToken",
}));

export type GenerateBackendAPIModelsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates a model schema for an existing backend API resource.
 */
export const generateBackendAPIModels: API.OperationMethod<
  GenerateBackendAPIModelsRequest,
  GenerateBackendAPIModelsResponse,
  GenerateBackendAPIModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<GenerateBackendAPIModelsRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<GenerateBackendAPIModelsResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateBackendAPIModels",
}));

export type GetBackendError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides project-level details for your Amplify UI project.
 */
export const getBackend: API.OperationMethod<
  GetBackendRequest,
  GetBackendResponse,
  GetBackendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetBackendRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<GetBackendResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackend",
}));

export type GetBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the details for a backend API.
 */
export const getBackendAPI: API.OperationMethod<
  GetBackendAPIRequest,
  GetBackendAPIResponse,
  GetBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetBackendAPIRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<GetBackendAPIResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAPI",
}));

export type GetBackendAPIModelsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a model introspection schema for an existing backend API resource.
 */
export const getBackendAPIModels: API.OperationMethod<
  GetBackendAPIModelsRequest,
  GetBackendAPIModelsResponse,
  GetBackendAPIModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetBackendAPIModelsRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<GetBackendAPIModelsResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAPIModels",
}));

export type GetBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a backend auth details.
 */
export const getBackendAuth: API.OperationMethod<
  GetBackendAuthRequest,
  GetBackendAuthResponse,
  GetBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetBackendAuthRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetBackendAuthResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAuth",
}));

export type GetBackendJobError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a specific job.
 */
export const getBackendJob: API.OperationMethod<
  GetBackendJobRequest,
  GetBackendJobResponse,
  GetBackendJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetBackendJobRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<GetBackendJobResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendJob",
}));

export type GetBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details for a backend storage resource.
 */
export const getBackendStorage: API.OperationMethod<
  GetBackendStorageRequest,
  GetBackendStorageResponse,
  GetBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetBackendStorageRequest>,
  output: __S(226, __c14, 2) as any as S.Schema<GetBackendStorageResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendStorage",
}));

export type GetTokenError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the challenge token based on the given appId and sessionId.
 */
export const getToken: API.OperationMethod<
  GetTokenRequest,
  GetTokenResponse,
  GetTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetTokenRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<GetTokenResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetToken",
}));

export type ImportBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports an existing backend authentication resource.
 */
export const importBackendAuth: API.OperationMethod<
  ImportBackendAuthRequest,
  ImportBackendAuthResponse,
  ImportBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ImportBackendAuthRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<ImportBackendAuthResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportBackendAuth",
}));

export type ImportBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports an existing backend storage resource.
 */
export const importBackendStorage: API.OperationMethod<
  ImportBackendStorageRequest,
  ImportBackendStorageResponse,
  ImportBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ImportBackendStorageRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<ImportBackendStorageResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportBackendStorage",
}));

export type ListBackendJobsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the jobs for the backend of an Amplify app.
 */
export const listBackendJobs: API.OperationMethod<
  ListBackendJobsRequest,
  ListBackendJobsResponse,
  ListBackendJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListBackendJobsRequest>,
  output: __S(290, __c18, 2) as any as S.Schema<ListBackendJobsResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackendJobs",
}));

export type ListS3BucketsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The list of S3 buckets in your account.
 */
export const listS3Buckets: API.OperationMethod<
  ListS3BucketsRequest,
  ListS3BucketsResponse,
  ListS3BucketsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListS3BucketsRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<ListS3BucketsResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListS3Buckets",
}));

export type RemoveAllBackendsError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes all backend environments from your Amplify project.
 */
export const removeAllBackends: API.OperationMethod<
  RemoveAllBackendsRequest,
  RemoveAllBackendsResponse,
  RemoveAllBackendsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<RemoveAllBackendsRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<RemoveAllBackendsResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAllBackends",
}));

export type RemoveBackendConfigError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the AWS resources required to access the Amplify Admin UI.
 */
export const removeBackendConfig: API.OperationMethod<
  RemoveBackendConfigRequest,
  RemoveBackendConfigResponse,
  RemoveBackendConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<RemoveBackendConfigRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<RemoveBackendConfigResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBackendConfig",
}));

export type UpdateBackendAPIError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing backend API resource.
 */
export const updateBackendAPI: API.OperationMethod<
  UpdateBackendAPIRequest,
  UpdateBackendAPIResponse,
  UpdateBackendAPIError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<UpdateBackendAPIRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UpdateBackendAPIResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendAPI",
}));

export type UpdateBackendAuthError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing backend authentication resource.
 */
export const updateBackendAuth: API.OperationMethod<
  UpdateBackendAuthRequest,
  UpdateBackendAuthResponse,
  UpdateBackendAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(371, __c23, 3) as any as S.Schema<UpdateBackendAuthRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UpdateBackendAuthResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendAuth",
}));

export type UpdateBackendConfigError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the AWS resources required to access the Amplify Admin UI.
 */
export const updateBackendConfig: API.OperationMethod<
  UpdateBackendConfigRequest,
  UpdateBackendConfigResponse,
  UpdateBackendConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(385, __c24, 1) as any as S.Schema<UpdateBackendConfigRequest>,
  output: __S(386, __c24, 2) as any as S.Schema<UpdateBackendConfigResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendConfig",
}));

export type UpdateBackendJobError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a specific job.
 */
export const updateBackendJob: API.OperationMethod<
  UpdateBackendJobRequest,
  UpdateBackendJobResponse,
  UpdateBackendJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateBackendJobRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateBackendJobResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendJob",
}));

export type UpdateBackendStorageError =
  | BadRequestException
  | GatewayTimeoutException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing backend storage resource.
 */
export const updateBackendStorage: API.OperationMethod<
  UpdateBackendStorageRequest,
  UpdateBackendStorageResponse,
  UpdateBackendStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(417, __c26, 1) as any as S.Schema<UpdateBackendStorageRequest>,
  output: __S(608, __c38, 0) as any as S.Schema<UpdateBackendStorageResponse>,
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendStorage",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppId: S.String.pipe(T.HttpLabel("AppId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backend/{AppId}/challenge" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTokenRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          ChallengeCode: S.optional(S.String),
          SessionId: S.optional(S.String),
          Ttl: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            ChallengeCode: "challengeCode",
            SessionId: "sessionId",
            Ttl: "ttl",
          }),
        ),
      ).annotate({ identifier: "CreateTokenResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backend/{AppId}/environments/{BackendEnvironmentName}/remove",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBackendRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceConfig: S.optional(__S(500, __c31, 4)),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceConfig: "resourceConfig", ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/api/{BackendEnvironmentName}/remove",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DeleteBackendAPIRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/auth/{BackendEnvironmentName}/remove",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DeleteBackendAuthRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceName: S.optional(S.String),
          ServiceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceName: "resourceName", ServiceName: "serviceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/storage/{BackendEnvironmentName}/remove",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "DeleteBackendStorageRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          SessionId: S.String.pipe(T.HttpLabel("SessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backend/{AppId}/challenge/{SessionId}/remove" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IsSuccess: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ IsSuccess: "isSuccess" }),
        ),
      ).annotate({ identifier: "DeleteTokenResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/api/{BackendEnvironmentName}/generateModels",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GenerateBackendAPIModelsRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ BackendEnvironmentName: "backendEnvironmentName" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/details" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetBackendRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AmplifyFeatureFlags: S.optional(S.String),
          AmplifyMetaConfig: S.optional(S.String),
          AppId: S.optional(S.String),
          AppName: S.optional(S.String),
          BackendEnvironmentList: S.optional(__S(528, __c33, 0)),
          BackendEnvironmentName: S.optional(S.String),
          Error: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AmplifyFeatureFlags: "amplifyFeatureFlags",
            AmplifyMetaConfig: "amplifyMetaConfig",
            AppId: "appId",
            AppName: "appName",
            BackendEnvironmentList: "backendEnvironmentList",
            BackendEnvironmentName: "backendEnvironmentName",
            Error: "error",
          }),
        ),
      ).annotate({ identifier: "GetBackendResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceConfig: S.optional(__S(500, __c31, 4)),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceConfig: "resourceConfig", ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/api/{BackendEnvironmentName}/details",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetBackendAPIRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          Error: S.optional(S.String),
          ResourceConfig: S.optional(__S(500, __c31, 4)),
          ResourceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendEnvironmentName: "backendEnvironmentName",
            Error: "error",
            ResourceConfig: "resourceConfig",
            ResourceName: "resourceName",
          }),
        ),
      ).annotate({ identifier: "GetBackendAPIResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/api/{BackendEnvironmentName}/getModels",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetBackendAPIModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Models: S.optional(S.String),
          Status: S.optional(S.String),
          ModelIntrospectionSchema: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Models: "models",
            Status: "status",
            ModelIntrospectionSchema: "modelIntrospectionSchema",
          }),
        ),
      ).annotate({ identifier: "GetBackendAPIModelsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/auth/{BackendEnvironmentName}/details",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetBackendAuthRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          Error: S.optional(S.String),
          ResourceConfig: S.optional(__S(546, __c34, 2)),
          ResourceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendEnvironmentName: "backendEnvironmentName",
            Error: "error",
            ResourceConfig: "resourceConfig",
            ResourceName: "resourceName",
          }),
        ),
      ).annotate({ identifier: "GetBackendAuthResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backend/{AppId}/job/{BackendEnvironmentName}/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBackendJobRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          CreateTime: S.optional(S.String),
          Error: S.optional(S.String),
          JobId: S.optional(S.String),
          Operation: S.optional(S.String),
          Status: S.optional(S.String),
          UpdateTime: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendEnvironmentName: "backendEnvironmentName",
            CreateTime: "createTime",
            Error: "error",
            JobId: "jobId",
            Operation: "operation",
            Status: "status",
            UpdateTime: "updateTime",
          }),
        ),
      ).annotate({ identifier: "GetBackendJobResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/storage/{BackendEnvironmentName}/details",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "GetBackendStorageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          Imported: S.optional(S.Boolean),
          Permissions: S.optional(__S(640, __c40, 0)),
          ServiceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BucketName: "bucketName",
            Imported: "imported",
            Permissions: "permissions",
            ServiceName: "serviceName",
          }),
        ),
      ).annotate({ identifier: "GetBackendStorageResourceConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          ResourceConfig: S.optional(__S(225, __c14, 1)),
          ResourceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendEnvironmentName: "backendEnvironmentName",
            ResourceConfig: "resourceConfig",
            ResourceName: "resourceName",
          }),
        ),
      ).annotate({ identifier: "GetBackendStorageResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          SessionId: S.String.pipe(T.HttpLabel("SessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backend/{AppId}/challenge/{SessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTokenRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          IdentityPoolId: S.optional(S.String),
          NativeClientId: S.optional(S.String),
          UserPoolId: S.optional(S.String),
          WebClientId: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              IdentityPoolId: "identityPoolId",
              NativeClientId: "nativeClientId",
              UserPoolId: "userPoolId",
              WebClientId: "webClientId",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/auth/{BackendEnvironmentName}/import",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ImportBackendAuthRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          BucketName: S.optional(S.String),
          ServiceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ BucketName: "bucketName", ServiceName: "serviceName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/storage/{BackendEnvironmentName}/import",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ImportBackendStorageRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          JobId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Operation: S.optional(S.String),
          Status: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              JobId: "jobId",
              MaxResults: "maxResults",
              NextToken: "nextToken",
              Operation: "operation",
              Status: "status",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/job/{BackendEnvironmentName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ListBackendJobsRequest" });
    case 1:
      return S.Array(__S(208, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Jobs: S.optional(__S(289, __c18, 1)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListBackendJobsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) })
          .pipe(S.encodeKeys({ NextToken: "nextToken" }))
          .pipe(T.all(T.Http({ method: "POST", uri: "/s3Buckets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListS3BucketsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CreationDate: S.optional(S.String), Name: S.optional(S.String) }).pipe(
          S.encodeKeys({ CreationDate: "creationDate", Name: "name" }),
        ),
      ).annotate({ identifier: "S3BucketInfo" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Buckets: S.optional(__S(306, __c19, 2)), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Buckets: "buckets", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListS3BucketsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          CleanAmplifyApp: S.optional(S.Boolean),
        })
          .pipe(S.encodeKeys({ CleanAmplifyApp: "cleanAmplifyApp" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/remove" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "RemoveAllBackendsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          Error: S.optional(S.String),
          JobId: S.optional(S.String),
          Operation: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            Error: "error",
            JobId: "jobId",
            Operation: "operation",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "RemoveAllBackendsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppId: S.String.pipe(T.HttpLabel("AppId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backend/{AppId}/config/remove" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveBackendConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Error: S.optional(S.String) }).pipe(S.encodeKeys({ Error: "error" })),
      ).annotate({ identifier: "RemoveBackendConfigResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceConfig: S.optional(__S(500, __c31, 4)),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceConfig: "resourceConfig", ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/api/{BackendEnvironmentName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBackendAPIRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UnauthenticatedLogin: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ UnauthenticatedLogin: "unauthenticatedLogin" }),
        ),
      ).annotate({ identifier: "UpdateBackendAuthIdentityPoolConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ForgotPassword: S.optional(__S(562, __c35, 2)),
          Mfa: S.optional(__S(564, __c35, 4)),
          OAuth: S.optional(__S(568, __c35, 8)),
          PasswordPolicy: S.optional(__S(569, __c35, 9)),
          VerificationMessage: S.optional(__S(562, __c35, 2)),
        }).pipe(
          S.encodeKeys({
            ForgotPassword: "forgotPassword",
            Mfa: "mfa",
            OAuth: "oAuth",
            PasswordPolicy: "passwordPolicy",
            VerificationMessage: "verificationMessage",
          }),
        ),
      ).annotate({ identifier: "UpdateBackendAuthUserPoolConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AuthResources: S.optional(S.String),
          IdentityPoolConfigs: S.optional(__S(368, __c23, 0)),
          Service: S.optional(S.String),
          UserPoolConfigs: S.optional(__S(369, __c23, 1)),
        }).pipe(
          S.encodeKeys({
            AuthResources: "authResources",
            IdentityPoolConfigs: "identityPoolConfigs",
            Service: "service",
            UserPoolConfigs: "userPoolConfigs",
          }),
        ),
      ).annotate({ identifier: "UpdateBackendAuthResourceConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceConfig: S.optional(__S(370, __c23, 2)),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceConfig: "resourceConfig", ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/auth/{BackendEnvironmentName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBackendAuthRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsCognitoIdentityPoolId: S.optional(S.String),
          AwsCognitoRegion: S.optional(S.String),
          AwsUserPoolsId: S.optional(S.String),
          AwsUserPoolsWebClientId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AwsCognitoIdentityPoolId: "aws_cognito_identity_pool_id",
            AwsCognitoRegion: "aws_cognito_region",
            AwsUserPoolsId: "aws_user_pools_id",
            AwsUserPoolsWebClientId: "aws_user_pools_web_client_id",
          }),
        ),
      ).annotate({ identifier: "LoginAuthConfigReqObj" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          LoginAuthConfig: S.optional(__S(384, __c24, 0)),
        })
          .pipe(S.encodeKeys({ LoginAuthConfig: "loginAuthConfig" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/config/update" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBackendConfigRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendManagerAppId: S.optional(S.String),
          Error: S.optional(S.String),
          LoginAuthConfig: S.optional(__S(384, __c24, 0)),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendManagerAppId: "backendManagerAppId",
            Error: "error",
            LoginAuthConfig: "loginAuthConfig",
          }),
        ),
      ).annotate({ identifier: "UpdateBackendConfigResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
          Operation: S.optional(S.String),
          Status: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Operation: "operation", Status: "status" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/job/{BackendEnvironmentName}/{JobId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBackendJobRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Permissions: S.optional(__S(640, __c40, 0)),
          ServiceName: S.optional(S.String),
        }).pipe(S.encodeKeys({ Permissions: "permissions", ServiceName: "serviceName" })),
      ).annotate({ identifier: "UpdateBackendStorageResourceConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          ResourceConfig: S.optional(__S(416, __c26, 0)),
          ResourceName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceConfig: "resourceConfig", ResourceName: "resourceName" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/storage/{BackendEnvironmentName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBackendStorageRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.String.pipe(T.HttpLabel("BackendEnvironmentName")),
          TargetEnvironmentName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ TargetEnvironmentName: "targetEnvironmentName" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/backend/{AppId}/environments/{BackendEnvironmentName}/clone",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CloneBackendRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          Error: S.optional(S.String),
          JobId: S.optional(S.String),
          Operation: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendEnvironmentName: "backendEnvironmentName",
            Error: "error",
            JobId: "jobId",
            Operation: "operation",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "CloneBackendResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ResourceConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          AppName: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          ResourceConfig: S.optional(__S(464, __c29, 0)),
          ResourceName: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AppId: "appId",
              AppName: "appName",
              BackendEnvironmentName: "backendEnvironmentName",
              ResourceConfig: "resourceConfig",
              ResourceName: "resourceName",
            }),
          )
          .pipe(T.all(T.Http({ method: "POST", uri: "/backend" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBackendRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.optional(S.String),
          ResourceConfig: S.optional(__S(500, __c31, 4)),
          ResourceName: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              BackendEnvironmentName: "backendEnvironmentName",
              ResourceConfig: "resourceConfig",
              ResourceName: "resourceName",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/api" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateBackendAPIRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CognitoUserPoolId: S.optional(S.String),
          Description: S.optional(S.String),
          ExpirationTime: S.optional(S.Number),
          OpenIDAuthTTL: S.optional(S.String),
          OpenIDClientId: S.optional(S.String),
          OpenIDIatTTL: S.optional(S.String),
          OpenIDIssueURL: S.optional(S.String),
          OpenIDProviderName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CognitoUserPoolId: "cognitoUserPoolId",
            Description: "description",
            ExpirationTime: "expirationTime",
            OpenIDAuthTTL: "openIDAuthTTL",
            OpenIDClientId: "openIDClientId",
            OpenIDIatTTL: "openIDIatTTL",
            OpenIDIssueURL: "openIDIssueURL",
            OpenIDProviderName: "openIDProviderName",
          }),
        ),
      ).annotate({ identifier: "BackendAPIAppSyncAuthSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Mode: S.optional(S.String), Settings: S.optional(__S(496, __c31, 0)) }).pipe(
          S.encodeKeys({ Mode: "mode", Settings: "settings" }),
        ),
      ).annotate({ identifier: "BackendAPIAuthType" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ResolutionStrategy: S.optional(S.String) }).pipe(
          S.encodeKeys({ ResolutionStrategy: "resolutionStrategy" }),
        ),
      ).annotate({ identifier: "BackendAPIConflictResolution" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AdditionalAuthTypes: S.optional(__S(498, __c31, 2)),
          ApiName: S.optional(S.String),
          ConflictResolution: S.optional(__S(499, __c31, 3)),
          DefaultAuthType: S.optional(__S(497, __c31, 1)),
          Service: S.optional(S.String),
          TransformSchema: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdditionalAuthTypes: "additionalAuthTypes",
            ApiName: "apiName",
            ConflictResolution: "conflictResolution",
            DefaultAuthType: "defaultAuthType",
            Service: "service",
            TransformSchema: "transformSchema",
          }),
        ),
      ).annotate({ identifier: "BackendAPIResourceConfig" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.optional(S.String),
          ResourceConfig: S.optional(__S(546, __c34, 2)),
          ResourceName: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              BackendEnvironmentName: "backendEnvironmentName",
              ResourceConfig: "resourceConfig",
              ResourceName: "resourceName",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/auth" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateBackendAuthRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolName: S.optional(S.String),
          UnauthenticatedLogin: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            IdentityPoolName: "identityPoolName",
            UnauthenticatedLogin: "unauthenticatedLogin",
          }),
        ),
      ).annotate({ identifier: "CreateBackendAuthIdentityPoolConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ForgotPassword: S.optional(__S(562, __c35, 2)),
          Mfa: S.optional(__S(564, __c35, 4)),
          OAuth: S.optional(__S(568, __c35, 8)),
          PasswordPolicy: S.optional(__S(569, __c35, 9)),
          RequiredSignUpAttributes: S.optional(__S(576, __c36, 0)),
          SignInMethod: S.optional(S.String),
          UserPoolName: S.optional(S.String),
          VerificationMessage: S.optional(__S(562, __c35, 2)),
        }).pipe(
          S.encodeKeys({
            ForgotPassword: "forgotPassword",
            Mfa: "mfa",
            OAuth: "oAuth",
            PasswordPolicy: "passwordPolicy",
            RequiredSignUpAttributes: "requiredSignUpAttributes",
            SignInMethod: "signInMethod",
            UserPoolName: "userPoolName",
            VerificationMessage: "verificationMessage",
          }),
        ),
      ).annotate({ identifier: "CreateBackendAuthUserPoolConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AuthResources: S.optional(S.String),
          IdentityPoolConfigs: S.optional(__S(544, __c34, 0)),
          Service: S.optional(S.String),
          UserPoolConfigs: S.optional(__S(545, __c34, 1)),
        }).pipe(
          S.encodeKeys({
            AuthResources: "authResources",
            IdentityPoolConfigs: "identityPoolConfigs",
            Service: "service",
            UserPoolConfigs: "userPoolConfigs",
          }),
        ),
      ).annotate({ identifier: "CreateBackendAuthResourceConfig" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EmailMessage: S.optional(S.String), EmailSubject: S.optional(S.String) }).pipe(
          S.encodeKeys({ EmailMessage: "emailMessage", EmailSubject: "emailSubject" }),
        ),
      ).annotate({ identifier: "EmailSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SmsMessage: S.optional(S.String) }).pipe(
          S.encodeKeys({ SmsMessage: "smsMessage" }),
        ),
      ).annotate({ identifier: "SmsSettings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DeliveryMethod: S.optional(S.String),
          EmailSettings: S.optional(__S(560, __c35, 0)),
          SmsSettings: S.optional(__S(561, __c35, 1)),
        }).pipe(
          S.encodeKeys({
            DeliveryMethod: "deliveryMethod",
            EmailSettings: "emailSettings",
            SmsSettings: "smsSettings",
          }),
        ),
      ).annotate({ identifier: "CreateBackendAuthForgotPasswordConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MfaTypes: S.optional(__S(576, __c36, 0)),
          SmsMessage: S.optional(S.String),
        }).pipe(S.encodeKeys({ MfaTypes: "mfaTypes", SmsMessage: "smsMessage" })),
      ).annotate({ identifier: "Settings" });
    case 4:
      return S.suspend(() =>
        S.Struct({ MFAMode: S.optional(S.String), Settings: S.optional(__S(563, __c35, 3)) }).pipe(
          S.encodeKeys({ Settings: "settings" }),
        ),
      ).annotate({ identifier: "CreateBackendAuthMFAConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({ ClientId: S.optional(S.String), ClientSecret: S.optional(S.String) }).pipe(
          S.encodeKeys({ ClientId: "client_id", ClientSecret: "client_secret" }),
        ),
      ).annotate({ identifier: "BackendAuthSocialProviderConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ClientId: S.optional(S.String),
          KeyId: S.optional(S.String),
          PrivateKey: S.optional(S.String),
          TeamId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ClientId: "client_id",
            KeyId: "key_id",
            PrivateKey: "private_key",
            TeamId: "team_id",
          }),
        ),
      ).annotate({ identifier: "BackendAuthAppleProviderConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Facebook: S.optional(__S(565, __c35, 5)),
          Google: S.optional(__S(565, __c35, 5)),
          LoginWithAmazon: S.optional(__S(565, __c35, 5)),
          SignInWithApple: S.optional(__S(566, __c35, 6)),
        }),
      ).annotate({ identifier: "SocialProviderSettings" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DomainPrefix: S.optional(S.String),
          OAuthGrantType: S.optional(S.String),
          OAuthScopes: S.optional(__S(576, __c36, 0)),
          RedirectSignInURIs: S.optional(__S(528, __c33, 0)),
          RedirectSignOutURIs: S.optional(__S(528, __c33, 0)),
          SocialProviderSettings: S.optional(__S(567, __c35, 7)),
        }).pipe(
          S.encodeKeys({
            DomainPrefix: "domainPrefix",
            OAuthGrantType: "oAuthGrantType",
            OAuthScopes: "oAuthScopes",
            RedirectSignInURIs: "redirectSignInURIs",
            RedirectSignOutURIs: "redirectSignOutURIs",
            SocialProviderSettings: "socialProviderSettings",
          }),
        ),
      ).annotate({ identifier: "CreateBackendAuthOAuthConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          AdditionalConstraints: S.optional(__S(576, __c36, 0)),
          MinimumLength: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AdditionalConstraints: "additionalConstraints",
            MinimumLength: "minimumLength",
          }),
        ),
      ).annotate({ identifier: "CreateBackendAuthPasswordPolicyConfig" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendManagerAppId: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ BackendManagerAppId: "backendManagerAppId" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/config" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateBackendConfigRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppId: S.optional(S.String),
          BackendEnvironmentName: S.optional(S.String),
          JobId: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppId: "appId",
            BackendEnvironmentName: "backendEnvironmentName",
            JobId: "jobId",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "CreateBackendConfigResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          Permissions: S.optional(__S(640, __c40, 0)),
          ServiceName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BucketName: "bucketName",
            Permissions: "permissions",
            ServiceName: "serviceName",
          }),
        ),
      ).annotate({ identifier: "CreateBackendStorageResourceConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppId: S.String.pipe(T.HttpLabel("AppId")),
          BackendEnvironmentName: S.optional(S.String),
          ResourceConfig: S.optional(__S(624, __c39, 0)),
          ResourceName: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              BackendEnvironmentName: "backendEnvironmentName",
              ResourceConfig: "resourceConfig",
              ResourceName: "resourceName",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/backend/{AppId}/storage" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateBackendStorageRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Authenticated: S.optional(__S(576, __c36, 0)),
          UnAuthenticated: S.optional(__S(576, __c36, 0)),
        }).pipe(
          S.encodeKeys({ Authenticated: "authenticated", UnAuthenticated: "unAuthenticated" }),
        ),
      ).annotate({ identifier: "BackendStoragePermissions" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
