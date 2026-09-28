import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "AmplifyBackend",
  target: "AmplifyBackend",
  version: "2020-08-11",
  sigv4: "amplifybackend",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://amplifybackend.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://amplifybackend.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "GatewayTimeoutException",
    ["TimeoutError"],
    { status: 504, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    {
      status: 404,
      renames: { Message: "message", ResourceType: "resourceType" },
    },
  )<{ readonly message?: string; readonly ResourceType?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, renames: { LimitType: "limitType", Message: "message" } },
  )<{ readonly LimitType?: string; readonly message?: string }> {}
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
export type AuthResources =
  | "USER_POOL_ONLY"
  | "IDENTITY_POOL_AND_USER_POOL"
  | (string & {});
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
export type ListOfRequiredSignUpAttributesElement =
  RequiredSignUpAttributesElement[];
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
export type AuthenticatedElement =
  | "READ"
  | "CREATE_AND_UPDATE"
  | "DELETE"
  | (string & {});
export type ListOfAuthenticatedElement = AuthenticatedElement[];
export type UnAuthenticatedElement =
  | "READ"
  | "CREATE_AND_UPDATE"
  | "DELETE"
  | (string & {});
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
      ForgotPassword: CreateBackendAuthForgotPasswordConfig & {
        DeliveryMethod: DeliveryMethod;
      };
      Mfa: CreateBackendAuthMFAConfig & { MFAMode: MFAMode };
      OAuth: CreateBackendAuthOAuthConfig & {
        OAuthGrantType: OAuthGrantType;
        OAuthScopes: ListOfOAuthScopesElement;
        RedirectSignInURIs: ListOf__string;
        RedirectSignOutURIs: ListOf__string;
      };
      PasswordPolicy: CreateBackendAuthPasswordPolicyConfig & {
        MinimumLength: number;
      };
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
    Permissions: BackendStoragePermissions & {
      Authenticated: ListOfAuthenticatedElement;
    };
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
  Jobs?: (BackendJobRespObj & {
    AppId: string;
    BackendEnvironmentName: string;
  })[];
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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/environments/{BackendEnvironmentName}/clone",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      TargetEnvironmentName: D.m({ wire: "targetEnvironmentName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloneBackend",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend",
    input: {
      AppId: D.m({ wire: "appId" }),
      AppName: D.m({ wire: "appName" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      ResourceConfig: D.m({ wire: "resourceConfig", shape: {} }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackend",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/api",
    input: {
      AppId: 0,
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: i_BackendAPIResourceConfig,
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendAPI",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/auth",
    input: {
      AppId: 0,
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          AuthResources: D.m({ wire: "authResources" }),
          IdentityPoolConfigs: D.m({
            wire: "identityPoolConfigs",
            shape: {
              IdentityPoolName: D.m({ wire: "identityPoolName" }),
              UnauthenticatedLogin: D.m({ wire: "unauthenticatedLogin" }),
            },
          }),
          Service: D.m({ wire: "service" }),
          UserPoolConfigs: D.m({
            wire: "userPoolConfigs",
            shape: {
              ForgotPassword: D.m({
                wire: "forgotPassword",
                shape: {
                  DeliveryMethod: D.m({ wire: "deliveryMethod" }),
                  EmailSettings: D.m({
                    wire: "emailSettings",
                    shape: i_EmailSettings,
                  }),
                  SmsSettings: D.m({
                    wire: "smsSettings",
                    shape: i_SmsSettings,
                  }),
                },
              }),
              Mfa: D.m({
                wire: "mfa",
                shape: {
                  MFAMode: 0,
                  Settings: D.m({ wire: "settings", shape: i_Settings }),
                },
              }),
              OAuth: D.m({
                wire: "oAuth",
                shape: {
                  DomainPrefix: D.m({ wire: "domainPrefix" }),
                  OAuthGrantType: D.m({ wire: "oAuthGrantType" }),
                  OAuthScopes: D.m({ wire: "oAuthScopes" }),
                  RedirectSignInURIs: D.m({ wire: "redirectSignInURIs" }),
                  RedirectSignOutURIs: D.m({ wire: "redirectSignOutURIs" }),
                  SocialProviderSettings: D.m({
                    wire: "socialProviderSettings",
                    shape: i_SocialProviderSettings,
                  }),
                },
              }),
              PasswordPolicy: D.m({
                wire: "passwordPolicy",
                shape: {
                  AdditionalConstraints: D.m({ wire: "additionalConstraints" }),
                  MinimumLength: D.m({ wire: "minimumLength" }),
                },
              }),
              RequiredSignUpAttributes: D.m({
                wire: "requiredSignUpAttributes",
              }),
              SignInMethod: D.m({ wire: "signInMethod" }),
              UserPoolName: D.m({ wire: "userPoolName" }),
              VerificationMessage: D.m({
                wire: "verificationMessage",
                shape: {
                  DeliveryMethod: D.m({ wire: "deliveryMethod" }),
                  EmailSettings: D.m({
                    wire: "emailSettings",
                    shape: i_EmailSettings,
                  }),
                  SmsSettings: D.m({
                    wire: "smsSettings",
                    shape: i_SmsSettings,
                  }),
                },
              }),
            },
          }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendAuth",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/config",
    input: {
      AppId: 0,
      BackendManagerAppId: D.m({ wire: "backendManagerAppId" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      JobId: D.m({ wire: "jobId" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/storage",
    input: {
      AppId: 0,
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          BucketName: D.m({ wire: "bucketName" }),
          Permissions: D.m({
            wire: "permissions",
            shape: i_BackendStoragePermissions,
          }),
          ServiceName: D.m({ wire: "serviceName" }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      JobId: D.m({ wire: "jobId" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackendStorage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/challenge",
    input: { AppId: 0 },
    output: {
      AppId: D.m({ wire: "appId" }),
      ChallengeCode: D.m({ wire: "challengeCode" }),
      SessionId: D.m({ wire: "sessionId" }),
      Ttl: D.m({ wire: "ttl" }),
    },
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/environments/{BackendEnvironmentName}/remove",
    input: { AppId: 0, BackendEnvironmentName: 0 },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackend",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/api/{BackendEnvironmentName}/remove",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: i_BackendAPIResourceConfig,
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendAPI",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/auth/{BackendEnvironmentName}/remove",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendAuth",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/storage/{BackendEnvironmentName}/remove",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceName: D.m({ wire: "resourceName" }),
      ServiceName: D.m({ wire: "serviceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      JobId: D.m({ wire: "jobId" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackendStorage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/challenge/{SessionId}/remove",
    input: { AppId: 0, SessionId: 0 },
    output: { IsSuccess: D.m({ wire: "isSuccess" }) },
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/api/{BackendEnvironmentName}/generateModels",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateBackendAPIModels",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/details",
    input: {
      AppId: 0,
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
    },
    output: {
      AmplifyFeatureFlags: D.m({ wire: "amplifyFeatureFlags" }),
      AmplifyMetaConfig: D.m({ wire: "amplifyMetaConfig" }),
      AppId: D.m({ wire: "appId" }),
      AppName: D.m({ wire: "appName" }),
      BackendEnvironmentList: D.m({ wire: "backendEnvironmentList" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackend",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/api/{BackendEnvironmentName}/details",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: i_BackendAPIResourceConfig,
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          AdditionalAuthTypes: D.m({
            wire: "additionalAuthTypes",
            shape: D.list(o_BackendAPIAuthType),
          }),
          ApiName: D.m({ wire: "apiName" }),
          ConflictResolution: D.m({
            wire: "conflictResolution",
            shape: { ResolutionStrategy: D.m({ wire: "resolutionStrategy" }) },
          }),
          DefaultAuthType: D.m({
            wire: "defaultAuthType",
            shape: o_BackendAPIAuthType,
          }),
          Service: D.m({ wire: "service" }),
          TransformSchema: D.m({ wire: "transformSchema" }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAPI",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/api/{BackendEnvironmentName}/getModels",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      Models: D.m({ wire: "models" }),
      Status: D.m({ wire: "status" }),
      ModelIntrospectionSchema: D.m({ wire: "modelIntrospectionSchema" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAPIModels",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/auth/{BackendEnvironmentName}/details",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          AuthResources: D.m({ wire: "authResources" }),
          IdentityPoolConfigs: D.m({
            wire: "identityPoolConfigs",
            shape: {
              IdentityPoolName: D.m({ wire: "identityPoolName" }),
              UnauthenticatedLogin: D.m({ wire: "unauthenticatedLogin" }),
            },
          }),
          Service: D.m({ wire: "service" }),
          UserPoolConfigs: D.m({
            wire: "userPoolConfigs",
            shape: {
              ForgotPassword: D.m({
                wire: "forgotPassword",
                shape: {
                  DeliveryMethod: D.m({ wire: "deliveryMethod" }),
                  EmailSettings: D.m({
                    wire: "emailSettings",
                    shape: o_EmailSettings,
                  }),
                  SmsSettings: D.m({
                    wire: "smsSettings",
                    shape: o_SmsSettings,
                  }),
                },
              }),
              Mfa: D.m({
                wire: "mfa",
                shape: {
                  Settings: D.m({
                    wire: "settings",
                    shape: {
                      MfaTypes: D.m({ wire: "mfaTypes" }),
                      SmsMessage: D.m({ wire: "smsMessage" }),
                    },
                  }),
                },
              }),
              OAuth: D.m({
                wire: "oAuth",
                shape: {
                  DomainPrefix: D.m({ wire: "domainPrefix" }),
                  OAuthGrantType: D.m({ wire: "oAuthGrantType" }),
                  OAuthScopes: D.m({ wire: "oAuthScopes" }),
                  RedirectSignInURIs: D.m({ wire: "redirectSignInURIs" }),
                  RedirectSignOutURIs: D.m({ wire: "redirectSignOutURIs" }),
                  SocialProviderSettings: D.m({
                    wire: "socialProviderSettings",
                    shape: {
                      Facebook: o_BackendAuthSocialProviderConfig,
                      Google: o_BackendAuthSocialProviderConfig,
                      LoginWithAmazon: o_BackendAuthSocialProviderConfig,
                      SignInWithApple: {
                        ClientId: D.m({ wire: "client_id" }),
                        KeyId: D.m({ wire: "key_id" }),
                        PrivateKey: D.m({ wire: "private_key" }),
                        TeamId: D.m({ wire: "team_id" }),
                      },
                    },
                  }),
                },
              }),
              PasswordPolicy: D.m({
                wire: "passwordPolicy",
                shape: {
                  AdditionalConstraints: D.m({ wire: "additionalConstraints" }),
                  MinimumLength: D.m({ wire: "minimumLength" }),
                },
              }),
              RequiredSignUpAttributes: D.m({
                wire: "requiredSignUpAttributes",
              }),
              SignInMethod: D.m({ wire: "signInMethod" }),
              UserPoolName: D.m({ wire: "userPoolName" }),
              VerificationMessage: D.m({
                wire: "verificationMessage",
                shape: {
                  DeliveryMethod: D.m({ wire: "deliveryMethod" }),
                  EmailSettings: D.m({
                    wire: "emailSettings",
                    shape: o_EmailSettings,
                  }),
                  SmsSettings: D.m({
                    wire: "smsSettings",
                    shape: o_SmsSettings,
                  }),
                },
              }),
            },
          }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendAuth",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /backend/{AppId}/job/{BackendEnvironmentName}/{JobId}",
    input: { AppId: 0, BackendEnvironmentName: 0, JobId: 0 },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      CreateTime: D.m({ wire: "createTime" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
      UpdateTime: D.m({ wire: "updateTime" }),
    },
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/storage/{BackendEnvironmentName}/details",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          BucketName: D.m({ wire: "bucketName" }),
          Imported: D.m({ wire: "imported" }),
          Permissions: D.m({
            wire: "permissions",
            shape: {
              Authenticated: D.m({ wire: "authenticated" }),
              UnAuthenticated: D.m({ wire: "unAuthenticated" }),
            },
          }),
          ServiceName: D.m({ wire: "serviceName" }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBackendStorage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /backend/{AppId}/challenge/{SessionId}",
    input: { AppId: 0, SessionId: 0 },
    output: {
      AppId: D.m({ wire: "appId" }),
      ChallengeCode: D.m({ wire: "challengeCode" }),
      SessionId: D.m({ wire: "sessionId" }),
      Ttl: D.m({ wire: "ttl" }),
    },
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/auth/{BackendEnvironmentName}/import",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      IdentityPoolId: D.m({ wire: "identityPoolId" }),
      NativeClientId: D.m({ wire: "nativeClientId" }),
      UserPoolId: D.m({ wire: "userPoolId" }),
      WebClientId: D.m({ wire: "webClientId" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportBackendAuth",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/storage/{BackendEnvironmentName}/import",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      BucketName: D.m({ wire: "bucketName" }),
      ServiceName: D.m({ wire: "serviceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      JobId: D.m({ wire: "jobId" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportBackendStorage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/job/{BackendEnvironmentName}",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      JobId: D.m({ wire: "jobId" }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    output: {
      Jobs: D.m({
        wire: "jobs",
        shape: D.list({
          AppId: D.m({ wire: "appId" }),
          BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
          CreateTime: D.m({ wire: "createTime" }),
          Error: D.m({ wire: "error" }),
          JobId: D.m({ wire: "jobId" }),
          Operation: D.m({ wire: "operation" }),
          Status: D.m({ wire: "status" }),
          UpdateTime: D.m({ wire: "updateTime" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackendJobs",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /s3Buckets",
    input: { NextToken: D.m({ wire: "nextToken" }) },
    output: {
      Buckets: D.m({
        wire: "buckets",
        shape: D.list({
          CreationDate: D.m({ wire: "creationDate" }),
          Name: D.m({ wire: "name" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListS3Buckets",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/remove",
    input: { AppId: 0, CleanAmplifyApp: D.m({ wire: "cleanAmplifyApp" }) },
    output: {
      AppId: D.m({ wire: "appId" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAllBackends",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/config/remove",
    input: { AppId: 0 },
    output: { Error: D.m({ wire: "error" }) },
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveBackendConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/api/{BackendEnvironmentName}",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: i_BackendAPIResourceConfig,
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendAPI",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/auth/{BackendEnvironmentName}",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          AuthResources: D.m({ wire: "authResources" }),
          IdentityPoolConfigs: D.m({
            wire: "identityPoolConfigs",
            shape: {
              UnauthenticatedLogin: D.m({ wire: "unauthenticatedLogin" }),
            },
          }),
          Service: D.m({ wire: "service" }),
          UserPoolConfigs: D.m({
            wire: "userPoolConfigs",
            shape: {
              ForgotPassword: D.m({
                wire: "forgotPassword",
                shape: {
                  DeliveryMethod: D.m({ wire: "deliveryMethod" }),
                  EmailSettings: D.m({
                    wire: "emailSettings",
                    shape: i_EmailSettings,
                  }),
                  SmsSettings: D.m({
                    wire: "smsSettings",
                    shape: i_SmsSettings,
                  }),
                },
              }),
              Mfa: D.m({
                wire: "mfa",
                shape: {
                  MFAMode: 0,
                  Settings: D.m({ wire: "settings", shape: i_Settings }),
                },
              }),
              OAuth: D.m({
                wire: "oAuth",
                shape: {
                  DomainPrefix: D.m({ wire: "domainPrefix" }),
                  OAuthGrantType: D.m({ wire: "oAuthGrantType" }),
                  OAuthScopes: D.m({ wire: "oAuthScopes" }),
                  RedirectSignInURIs: D.m({ wire: "redirectSignInURIs" }),
                  RedirectSignOutURIs: D.m({ wire: "redirectSignOutURIs" }),
                  SocialProviderSettings: D.m({
                    wire: "socialProviderSettings",
                    shape: i_SocialProviderSettings,
                  }),
                },
              }),
              PasswordPolicy: D.m({
                wire: "passwordPolicy",
                shape: {
                  AdditionalConstraints: D.m({ wire: "additionalConstraints" }),
                  MinimumLength: D.m({ wire: "minimumLength" }),
                },
              }),
              VerificationMessage: D.m({
                wire: "verificationMessage",
                shape: {
                  DeliveryMethod: D.m({ wire: "deliveryMethod" }),
                  EmailSettings: D.m({
                    wire: "emailSettings",
                    shape: i_EmailSettings,
                  }),
                  SmsSettings: D.m({
                    wire: "smsSettings",
                    shape: i_SmsSettings,
                  }),
                },
              }),
            },
          }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendAuth",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/config/update",
    input: {
      AppId: 0,
      LoginAuthConfig: D.m({
        wire: "loginAuthConfig",
        shape: {
          AwsCognitoIdentityPoolId: D.m({
            wire: "aws_cognito_identity_pool_id",
          }),
          AwsCognitoRegion: D.m({ wire: "aws_cognito_region" }),
          AwsUserPoolsId: D.m({ wire: "aws_user_pools_id" }),
          AwsUserPoolsWebClientId: D.m({
            wire: "aws_user_pools_web_client_id",
          }),
        },
      }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendManagerAppId: D.m({ wire: "backendManagerAppId" }),
      Error: D.m({ wire: "error" }),
      LoginAuthConfig: D.m({
        wire: "loginAuthConfig",
        shape: {
          AwsCognitoIdentityPoolId: D.m({
            wire: "aws_cognito_identity_pool_id",
          }),
          AwsCognitoRegion: D.m({ wire: "aws_cognito_region" }),
          AwsUserPoolsId: D.m({ wire: "aws_user_pools_id" }),
          AwsUserPoolsWebClientId: D.m({
            wire: "aws_user_pools_web_client_id",
          }),
        },
      }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/job/{BackendEnvironmentName}/{JobId}",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      JobId: 0,
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      CreateTime: D.m({ wire: "createTime" }),
      Error: D.m({ wire: "error" }),
      JobId: D.m({ wire: "jobId" }),
      Operation: D.m({ wire: "operation" }),
      Status: D.m({ wire: "status" }),
      UpdateTime: D.m({ wire: "updateTime" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /backend/{AppId}/storage/{BackendEnvironmentName}",
    input: {
      AppId: 0,
      BackendEnvironmentName: 0,
      ResourceConfig: D.m({
        wire: "resourceConfig",
        shape: {
          Permissions: D.m({
            wire: "permissions",
            shape: i_BackendStoragePermissions,
          }),
          ServiceName: D.m({ wire: "serviceName" }),
        },
      }),
      ResourceName: D.m({ wire: "resourceName" }),
    },
    output: {
      AppId: D.m({ wire: "appId" }),
      BackendEnvironmentName: D.m({ wire: "backendEnvironmentName" }),
      JobId: D.m({ wire: "jobId" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    GatewayTimeoutException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBackendStorage",
})) as any;

const i_BackendAPIResourceConfig: D.LazyStruct = () => ({
  AdditionalAuthTypes: D.m({
    wire: "additionalAuthTypes",
    shape: D.list(i_BackendAPIAuthType),
  }),
  ApiName: D.m({ wire: "apiName" }),
  ConflictResolution: D.m({
    wire: "conflictResolution",
    shape: { ResolutionStrategy: D.m({ wire: "resolutionStrategy" }) },
  }),
  DefaultAuthType: D.m({
    wire: "defaultAuthType",
    shape: i_BackendAPIAuthType,
  }),
  Service: D.m({ wire: "service" }),
  TransformSchema: D.m({ wire: "transformSchema" }),
});
const i_BackendStoragePermissions: D.LazyStruct = () => ({
  Authenticated: D.m({ wire: "authenticated" }),
  UnAuthenticated: D.m({ wire: "unAuthenticated" }),
});
const i_EmailSettings: D.LazyStruct = () => ({
  EmailMessage: D.m({ wire: "emailMessage" }),
  EmailSubject: D.m({ wire: "emailSubject" }),
});
const i_Settings: D.LazyStruct = () => ({
  MfaTypes: D.m({ wire: "mfaTypes" }),
  SmsMessage: D.m({ wire: "smsMessage" }),
});
const i_SmsSettings: D.LazyStruct = () => ({
  SmsMessage: D.m({ wire: "smsMessage" }),
});
const i_SocialProviderSettings: D.LazyStruct = () => ({
  Facebook: i_BackendAuthSocialProviderConfig,
  Google: i_BackendAuthSocialProviderConfig,
  LoginWithAmazon: i_BackendAuthSocialProviderConfig,
  SignInWithApple: {
    ClientId: D.m({ wire: "client_id" }),
    KeyId: D.m({ wire: "key_id" }),
    PrivateKey: D.m({ wire: "private_key" }),
    TeamId: D.m({ wire: "team_id" }),
  },
});
const o_BackendAPIAuthType: D.LazyStruct = () => ({
  Mode: D.m({ wire: "mode" }),
  Settings: D.m({
    wire: "settings",
    shape: {
      CognitoUserPoolId: D.m({ wire: "cognitoUserPoolId" }),
      Description: D.m({ wire: "description" }),
      ExpirationTime: D.m({ wire: "expirationTime" }),
      OpenIDAuthTTL: D.m({ wire: "openIDAuthTTL" }),
      OpenIDClientId: D.m({ wire: "openIDClientId" }),
      OpenIDIatTTL: D.m({ wire: "openIDIatTTL" }),
      OpenIDIssueURL: D.m({ wire: "openIDIssueURL" }),
      OpenIDProviderName: D.m({ wire: "openIDProviderName" }),
    },
  }),
});
const o_BackendAuthSocialProviderConfig: D.LazyStruct = () => ({
  ClientId: D.m({ wire: "client_id" }),
  ClientSecret: D.m({ wire: "client_secret" }),
});
const o_EmailSettings: D.LazyStruct = () => ({
  EmailMessage: D.m({ wire: "emailMessage" }),
  EmailSubject: D.m({ wire: "emailSubject" }),
});
const o_SmsSettings: D.LazyStruct = () => ({
  SmsMessage: D.m({ wire: "smsMessage" }),
});
const i_BackendAPIAuthType: D.LazyStruct = () => ({
  Mode: D.m({ wire: "mode" }),
  Settings: D.m({
    wire: "settings",
    shape: {
      CognitoUserPoolId: D.m({ wire: "cognitoUserPoolId" }),
      Description: D.m({ wire: "description" }),
      ExpirationTime: D.m({ wire: "expirationTime" }),
      OpenIDAuthTTL: D.m({ wire: "openIDAuthTTL" }),
      OpenIDClientId: D.m({ wire: "openIDClientId" }),
      OpenIDIatTTL: D.m({ wire: "openIDIatTTL" }),
      OpenIDIssueURL: D.m({ wire: "openIDIssueURL" }),
      OpenIDProviderName: D.m({ wire: "openIDProviderName" }),
    },
  }),
});
const i_BackendAuthSocialProviderConfig: D.LazyStruct = () => ({
  ClientId: D.m({ wire: "client_id" }),
  ClientSecret: D.m({ wire: "client_secret" }),
});
