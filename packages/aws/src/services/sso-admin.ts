import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SSO Admin",
  target: "SWBExternalService",
  version: "2020-07-20",
  sigv4: "sso",
  protocol: awsJson1_1Protocol,
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
                `https://sso-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://sso.${Region}.amazonaws.com`);
              }
              return e(
                `https://sso-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://sso.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://sso.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{
    readonly message?: string;
    readonly Reason?: AccessDeniedExceptionReason;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly Reason?: ResourceNotFoundExceptionReason;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message?: string;
    readonly Reason?: ThrottlingExceptionReason;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
export type InstanceArn = string;
export type RegionName = string;
export interface AddRegionRequest {
  InstanceArn: string;
  RegionName: string;
}
export type RegionStatus = "ACTIVE" | "ADDING" | "REMOVING" | (string & {});
export interface AddRegionResponse {
  Status?: RegionStatus;
}
export type PermissionSetArn = string;
export type ManagedPolicyName = string;
export type ManagedPolicyPath = string;
export interface CustomerManagedPolicyReference {
  Name: string;
  Path?: string;
}
export interface AttachCustomerManagedPolicyReferenceToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  CustomerManagedPolicyReference: CustomerManagedPolicyReference;
}
export interface AttachCustomerManagedPolicyReferenceToPermissionSetResponse {}
export type ManagedPolicyArn = string;
export interface AttachManagedPolicyToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  ManagedPolicyArn: string;
}
export interface AttachManagedPolicyToPermissionSetResponse {}
export type TargetId = string;
export type TargetType = "AWS_ACCOUNT" | (string & {});
export type PrincipalType = "USER" | "GROUP" | (string & {});
export type PrincipalId = string;
export interface CreateAccountAssignmentRequest {
  InstanceArn: string;
  TargetId: string;
  TargetType: TargetType;
  PermissionSetArn: string;
  PrincipalType: PrincipalType;
  PrincipalId: string;
}
export type StatusValues =
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export type UUId = string;
export type Reason = string;
export interface AccountAssignmentOperationStatus {
  Status?: StatusValues;
  RequestId?: string;
  FailureReason?: string;
  TargetId?: string;
  TargetType?: TargetType;
  PermissionSetArn?: string;
  PrincipalType?: PrincipalType;
  PrincipalId?: string;
  CreatedDate?: Date;
}
export interface CreateAccountAssignmentResponse {
  AccountAssignmentCreationStatus?: AccountAssignmentOperationStatus;
}
export type ApplicationProviderArn = string;
export type ApplicationNameType = string;
export type Description = string;
export type SignInOrigin = "IDENTITY_CENTER" | "APPLICATION" | (string & {});
export type ApplicationUrl = string;
export interface SignInOptions {
  Origin: SignInOrigin;
  ApplicationUrl?: string;
}
export type ApplicationVisibility = "ENABLED" | "DISABLED" | (string & {});
export interface PortalOptions {
  SignInOptions?: SignInOptions;
  Visibility?: ApplicationVisibility;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type ApplicationStatus = "ENABLED" | "DISABLED" | (string & {});
export type ClientToken = string;
export interface CreateApplicationRequest {
  InstanceArn: string;
  ApplicationProviderArn: string;
  Name: string;
  Description?: string;
  PortalOptions?: PortalOptions;
  Tags?: Tag[];
  Status?: ApplicationStatus;
  ClientToken?: string;
}
export type ApplicationArn = string;
export type IdentityStoreArn = string;
export interface CreateApplicationResponse {
  ApplicationArn?: string;
  InstanceArn?: string;
  IdentityStoreArn?: string;
}
export interface CreateApplicationAssignmentRequest {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export interface CreateApplicationAssignmentResponse {}
export type NameType = string;
export interface CreateInstanceRequest {
  Name?: string;
  ClientToken?: string;
  Tags?: Tag[];
}
export interface CreateInstanceResponse {
  InstanceArn?: string;
}
export type AccessControlAttributeKey = string;
export type AccessControlAttributeValueSource = string;
export type AccessControlAttributeValueSourceList = string[];
export interface AccessControlAttributeValue {
  Source: string[];
}
export interface AccessControlAttribute {
  Key: string;
  Value: AccessControlAttributeValue;
}
export type AccessControlAttributeList = AccessControlAttribute[];
export interface InstanceAccessControlAttributeConfiguration {
  AccessControlAttributes: AccessControlAttribute[];
}
export interface CreateInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
  InstanceAccessControlAttributeConfiguration: InstanceAccessControlAttributeConfiguration;
}
export interface CreateInstanceAccessControlAttributeConfigurationResponse {}
export type PermissionSetName = string;
export type PermissionSetDescription = string;
export type Duration = string;
export type RelayState = string;
export interface CreatePermissionSetRequest {
  Name: string;
  Description?: string;
  InstanceArn: string;
  SessionDuration?: string;
  RelayState?: string;
  Tags?: Tag[];
}
export interface PermissionSet {
  Name?: string;
  PermissionSetArn?: string;
  Description?: string;
  CreatedDate?: Date;
  SessionDuration?: string;
  RelayState?: string;
}
export interface CreatePermissionSetResponse {
  PermissionSet?: PermissionSet;
}
export type TrustedTokenIssuerName = string;
export type TrustedTokenIssuerType = "OIDC_JWT" | (string & {});
export type TrustedTokenIssuerUrl = string;
export type ClaimAttributePath = string;
export type JMESPath = string;
export type JwksRetrievalOption = "OPEN_ID_DISCOVERY" | (string & {});
export interface OidcJwtConfiguration {
  IssuerUrl: string;
  ClaimAttributePath: string;
  IdentityStoreAttributePath: string;
  JwksRetrievalOption: JwksRetrievalOption;
}
export type TrustedTokenIssuerConfiguration = {
  OidcJwtConfiguration: OidcJwtConfiguration;
};
export interface CreateTrustedTokenIssuerRequest {
  InstanceArn: string;
  Name: string;
  TrustedTokenIssuerType: TrustedTokenIssuerType;
  TrustedTokenIssuerConfiguration: TrustedTokenIssuerConfiguration;
  ClientToken?: string;
  Tags?: Tag[];
}
export type TrustedTokenIssuerArn = string;
export interface CreateTrustedTokenIssuerResponse {
  TrustedTokenIssuerArn?: string;
}
export interface DeleteAccountAssignmentRequest {
  InstanceArn: string;
  TargetId: string;
  TargetType: TargetType;
  PermissionSetArn: string;
  PrincipalType: PrincipalType;
  PrincipalId: string;
}
export interface DeleteAccountAssignmentResponse {
  AccountAssignmentDeletionStatus?: AccountAssignmentOperationStatus;
}
export interface DeleteApplicationRequest {
  ApplicationArn: string;
}
export interface DeleteApplicationResponse {}
export type Scope = string;
export interface DeleteApplicationAccessScopeRequest {
  ApplicationArn: string;
  Scope: string;
}
export interface DeleteApplicationAccessScopeResponse {}
export interface DeleteApplicationAssignmentRequest {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export interface DeleteApplicationAssignmentResponse {}
export type AuthenticationMethodType = "IAM" | (string & {});
export interface DeleteApplicationAuthenticationMethodRequest {
  ApplicationArn: string;
  AuthenticationMethodType: AuthenticationMethodType;
}
export interface DeleteApplicationAuthenticationMethodResponse {}
export type GrantType =
  | "authorization_code"
  | "refresh_token"
  | "urn:ietf:params:oauth:grant-type:jwt-bearer"
  | "urn:ietf:params:oauth:grant-type:token-exchange"
  | (string & {});
export interface DeleteApplicationGrantRequest {
  ApplicationArn: string;
  GrantType: GrantType;
}
export interface DeleteApplicationGrantResponse {}
export interface DeleteInlinePolicyFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export interface DeleteInlinePolicyFromPermissionSetResponse {}
export interface DeleteInstanceRequest {
  InstanceArn: string;
}
export interface DeleteInstanceResponse {}
export interface DeleteInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
}
export interface DeleteInstanceAccessControlAttributeConfigurationResponse {}
export interface DeletePermissionsBoundaryFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export interface DeletePermissionsBoundaryFromPermissionSetResponse {}
export interface DeletePermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export interface DeletePermissionSetResponse {}
export interface DeleteTrustedTokenIssuerRequest {
  TrustedTokenIssuerArn: string;
}
export interface DeleteTrustedTokenIssuerResponse {}
export interface DescribeAccountAssignmentCreationStatusRequest {
  InstanceArn: string;
  AccountAssignmentCreationRequestId: string;
}
export interface DescribeAccountAssignmentCreationStatusResponse {
  AccountAssignmentCreationStatus?: AccountAssignmentOperationStatus;
}
export interface DescribeAccountAssignmentDeletionStatusRequest {
  InstanceArn: string;
  AccountAssignmentDeletionRequestId: string;
}
export interface DescribeAccountAssignmentDeletionStatusResponse {
  AccountAssignmentDeletionStatus?: AccountAssignmentOperationStatus;
}
export interface DescribeApplicationRequest {
  ApplicationArn: string;
}
export type AccountId = string;
export interface DescribeApplicationResponse {
  ApplicationArn?: string;
  ApplicationProviderArn?: string;
  Name?: string;
  ApplicationAccount?: string;
  InstanceArn?: string;
  IdentityStoreArn?: string;
  Status?: ApplicationStatus;
  PortalOptions?: PortalOptions;
  Description?: string;
  CreatedDate?: Date;
  CreatedFrom?: string;
}
export interface DescribeApplicationAssignmentRequest {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export interface DescribeApplicationAssignmentResponse {
  PrincipalType?: PrincipalType;
  PrincipalId?: string;
  ApplicationArn?: string;
}
export interface DescribeApplicationProviderRequest {
  ApplicationProviderArn: string;
}
export type FederationProtocol = "SAML" | "OAUTH" | (string & {});
export type Name = string;
export type IconUrl = string;
export interface DisplayData {
  DisplayName?: string;
  IconUrl?: string;
  Description?: string;
}
export type ResourceServerScope = string;
export interface ResourceServerScopeDetails {
  LongDescription?: string;
  DetailedTitle?: string;
}
export type ResourceServerScopes = {
  [key: string]: ResourceServerScopeDetails | undefined;
};
export interface ResourceServerConfig {
  Scopes?: { [key: string]: ResourceServerScopeDetails | undefined };
}
export interface DescribeApplicationProviderResponse {
  ApplicationProviderArn: string;
  FederationProtocol?: FederationProtocol;
  DisplayData?: DisplayData;
  ResourceServerConfig?: ResourceServerConfig;
}
export interface DescribeInstanceRequest {
  InstanceArn: string;
}
export type Id = string;
export type InstanceStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "ACTIVE"
  | (string & {});
export type KmsKeyType =
  | "AWS_OWNED_KMS_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export type KmsKeyArn = string;
export type KmsKeyStatus =
  | "UPDATING"
  | "ENABLED"
  | "UPDATE_FAILED"
  | (string & {});
export interface EncryptionConfigurationDetails {
  KeyType?: KmsKeyType;
  KmsKeyArn?: string;
  EncryptionStatus?: KmsKeyStatus;
  EncryptionStatusReason?: string;
}
export interface DescribeInstanceResponse {
  InstanceArn?: string;
  IdentityStoreId?: string;
  OwnerAccountId?: string;
  Name?: string;
  CreatedDate?: Date;
  Status?: InstanceStatus;
  StatusReason?: string;
  EncryptionConfigurationDetails?: EncryptionConfigurationDetails;
  PermissionSetsEnabled?: boolean;
}
export interface DescribeInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
}
export type InstanceAccessControlAttributeConfigurationStatus =
  | "ENABLED"
  | "CREATION_IN_PROGRESS"
  | "CREATION_FAILED"
  | (string & {});
export type InstanceAccessControlAttributeConfigurationStatusReason = string;
export interface DescribeInstanceAccessControlAttributeConfigurationResponse {
  Status?: InstanceAccessControlAttributeConfigurationStatus;
  StatusReason?: string;
  InstanceAccessControlAttributeConfiguration?: InstanceAccessControlAttributeConfiguration;
}
export interface DescribePermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export interface DescribePermissionSetResponse {
  PermissionSet?: PermissionSet;
}
export interface DescribePermissionSetProvisioningStatusRequest {
  InstanceArn: string;
  ProvisionPermissionSetRequestId: string;
}
export interface PermissionSetProvisioningStatus {
  Status?: StatusValues;
  RequestId?: string;
  AccountId?: string;
  PermissionSetArn?: string;
  FailureReason?: string;
  CreatedDate?: Date;
}
export interface DescribePermissionSetProvisioningStatusResponse {
  PermissionSetProvisioningStatus?: PermissionSetProvisioningStatus;
}
export interface DescribeRegionRequest {
  InstanceArn: string;
  RegionName: string;
}
export type IsPrimaryRegion = boolean;
export interface DescribeRegionResponse {
  RegionName?: string;
  Status?: RegionStatus;
  AddedDate?: Date;
  IsPrimaryRegion?: boolean;
}
export interface DescribeTrustedTokenIssuerRequest {
  TrustedTokenIssuerArn: string;
}
export interface DescribeTrustedTokenIssuerResponse {
  TrustedTokenIssuerArn?: string;
  Name?: string;
  TrustedTokenIssuerType?: TrustedTokenIssuerType;
  TrustedTokenIssuerConfiguration?: TrustedTokenIssuerConfiguration;
}
export interface DetachCustomerManagedPolicyReferenceFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  CustomerManagedPolicyReference: CustomerManagedPolicyReference;
}
export interface DetachCustomerManagedPolicyReferenceFromPermissionSetResponse {}
export interface DetachManagedPolicyFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  ManagedPolicyArn: string;
}
export interface DetachManagedPolicyFromPermissionSetResponse {}
export interface GetApplicationAccessScopeRequest {
  ApplicationArn: string;
  Scope: string;
}
export type ScopeTarget = string;
export type ScopeTargets = string[];
export interface GetApplicationAccessScopeResponse {
  Scope: string;
  AuthorizedTargets?: string[];
}
export interface GetApplicationAssignmentConfigurationRequest {
  ApplicationArn: string;
}
export type AssignmentRequired = boolean;
export interface GetApplicationAssignmentConfigurationResponse {
  AssignmentRequired: boolean;
}
export interface GetApplicationAuthenticationMethodRequest {
  ApplicationArn: string;
  AuthenticationMethodType: AuthenticationMethodType;
}
export type ActorPolicyDocument = unknown;
export interface IamAuthenticationMethod {
  ActorPolicy: any;
}
export type AuthenticationMethod = { Iam: IamAuthenticationMethod };
export interface GetApplicationAuthenticationMethodResponse {
  AuthenticationMethod?: AuthenticationMethod;
}
export interface GetApplicationGrantRequest {
  ApplicationArn: string;
  GrantType: GrantType;
}
export type URI = string;
export type RedirectUris = string[];
export interface AuthorizationCodeGrant {
  RedirectUris?: string[];
}
export type TokenIssuerAudience = string;
export type TokenIssuerAudiences = string[];
export interface AuthorizedTokenIssuer {
  TrustedTokenIssuerArn?: string;
  AuthorizedAudiences?: string[];
}
export type AuthorizedTokenIssuers = AuthorizedTokenIssuer[];
export interface JwtBearerGrant {
  AuthorizedTokenIssuers?: AuthorizedTokenIssuer[];
}
export interface RefreshTokenGrant {}
export interface TokenExchangeGrant {}
export type Grant =
  | {
      AuthorizationCode: AuthorizationCodeGrant;
      JwtBearer?: never;
      RefreshToken?: never;
      TokenExchange?: never;
    }
  | {
      AuthorizationCode?: never;
      JwtBearer: JwtBearerGrant;
      RefreshToken?: never;
      TokenExchange?: never;
    }
  | {
      AuthorizationCode?: never;
      JwtBearer?: never;
      RefreshToken: RefreshTokenGrant;
      TokenExchange?: never;
    }
  | {
      AuthorizationCode?: never;
      JwtBearer?: never;
      RefreshToken?: never;
      TokenExchange: TokenExchangeGrant;
    };
export interface GetApplicationGrantResponse {
  Grant: Grant;
}
export interface GetApplicationSessionConfigurationRequest {
  ApplicationArn: string;
}
export type UserBackgroundSessionApplicationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface GetApplicationSessionConfigurationResponse {
  UserBackgroundSessionApplicationStatus?: UserBackgroundSessionApplicationStatus;
}
export interface GetInlinePolicyForPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export type PermissionSetPolicyDocument = string;
export interface GetInlinePolicyForPermissionSetResponse {
  InlinePolicy?: string;
}
export interface GetPermissionsBoundaryForPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export interface PermissionsBoundary {
  CustomerManagedPolicyReference?: CustomerManagedPolicyReference;
  ManagedPolicyArn?: string;
}
export interface GetPermissionsBoundaryForPermissionSetResponse {
  PermissionsBoundary?: PermissionsBoundary;
}
export type MaxResults = number;
export type Token = string;
export interface OperationStatusFilter {
  Status?: StatusValues;
}
export interface ListAccountAssignmentCreationStatusRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: OperationStatusFilter;
}
export interface AccountAssignmentOperationStatusMetadata {
  Status?: StatusValues;
  RequestId?: string;
  CreatedDate?: Date;
}
export type AccountAssignmentOperationStatusList =
  AccountAssignmentOperationStatusMetadata[];
export interface ListAccountAssignmentCreationStatusResponse {
  AccountAssignmentsCreationStatus?: AccountAssignmentOperationStatusMetadata[];
  NextToken?: string;
}
export interface ListAccountAssignmentDeletionStatusRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: OperationStatusFilter;
}
export interface ListAccountAssignmentDeletionStatusResponse {
  AccountAssignmentsDeletionStatus?: AccountAssignmentOperationStatusMetadata[];
  NextToken?: string;
}
export interface ListAccountAssignmentsRequest {
  InstanceArn: string;
  AccountId: string;
  PermissionSetArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AccountAssignment {
  AccountId?: string;
  PermissionSetArn?: string;
  PrincipalType?: PrincipalType;
  PrincipalId?: string;
}
export type AccountAssignmentList = AccountAssignment[];
export interface ListAccountAssignmentsResponse {
  AccountAssignments?: AccountAssignment[];
  NextToken?: string;
}
export interface ListAccountAssignmentsFilter {
  AccountId?: string;
}
export interface ListAccountAssignmentsForPrincipalRequest {
  InstanceArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
  Filter?: ListAccountAssignmentsFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface AccountAssignmentForPrincipal {
  AccountId?: string;
  PermissionSetArn?: string;
  PrincipalId?: string;
  PrincipalType?: PrincipalType;
}
export type AccountAssignmentListForPrincipal = AccountAssignmentForPrincipal[];
export interface ListAccountAssignmentsForPrincipalResponse {
  AccountAssignments?: AccountAssignmentForPrincipal[];
  NextToken?: string;
}
export type ProvisioningStatus =
  | "LATEST_PERMISSION_SET_PROVISIONED"
  | "LATEST_PERMISSION_SET_NOT_PROVISIONED"
  | (string & {});
export interface ListAccountsForProvisionedPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  ProvisioningStatus?: ProvisioningStatus;
  MaxResults?: number;
  NextToken?: string;
}
export type AccountList = string[];
export interface ListAccountsForProvisionedPermissionSetResponse {
  AccountIds?: string[];
  NextToken?: string;
}
export interface ListApplicationAccessScopesRequest {
  ApplicationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ScopeDetails {
  Scope: string;
  AuthorizedTargets?: string[];
}
export type Scopes = ScopeDetails[];
export interface ListApplicationAccessScopesResponse {
  Scopes: ScopeDetails[];
  NextToken?: string;
}
export interface ListApplicationAssignmentsRequest {
  ApplicationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ApplicationAssignment {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export type ApplicationAssignmentsList = ApplicationAssignment[];
export interface ListApplicationAssignmentsResponse {
  ApplicationAssignments?: ApplicationAssignment[];
  NextToken?: string;
}
export interface ListApplicationAssignmentsFilter {
  ApplicationArn?: string;
}
export interface ListApplicationAssignmentsForPrincipalRequest {
  InstanceArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
  Filter?: ListApplicationAssignmentsFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ApplicationAssignmentForPrincipal {
  ApplicationArn?: string;
  PrincipalId?: string;
  PrincipalType?: PrincipalType;
}
export type ApplicationAssignmentListForPrincipal =
  ApplicationAssignmentForPrincipal[];
export interface ListApplicationAssignmentsForPrincipalResponse {
  ApplicationAssignments?: ApplicationAssignmentForPrincipal[];
  NextToken?: string;
}
export interface ListApplicationAuthenticationMethodsRequest {
  ApplicationArn: string;
  NextToken?: string;
}
export interface AuthenticationMethodItem {
  AuthenticationMethodType?: AuthenticationMethodType;
  AuthenticationMethod?: AuthenticationMethod;
}
export type AuthenticationMethods = AuthenticationMethodItem[];
export interface ListApplicationAuthenticationMethodsResponse {
  AuthenticationMethods?: AuthenticationMethodItem[];
  NextToken?: string;
}
export interface ListApplicationGrantsRequest {
  ApplicationArn: string;
  NextToken?: string;
}
export interface GrantItem {
  GrantType: GrantType;
  Grant: Grant;
}
export type Grants = GrantItem[];
export interface ListApplicationGrantsResponse {
  Grants: GrantItem[];
  NextToken?: string;
}
export interface ListApplicationProvidersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ApplicationProvider {
  ApplicationProviderArn: string;
  FederationProtocol?: FederationProtocol;
  DisplayData?: DisplayData;
  ResourceServerConfig?: ResourceServerConfig;
}
export type ApplicationProviderList = ApplicationProvider[];
export interface ListApplicationProvidersResponse {
  ApplicationProviders?: ApplicationProvider[];
  NextToken?: string;
}
export interface ListApplicationsFilter {
  ApplicationAccount?: string;
  ApplicationProvider?: string;
}
export interface ListApplicationsRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: ListApplicationsFilter;
}
export interface Application {
  ApplicationArn?: string;
  ApplicationProviderArn?: string;
  Name?: string;
  ApplicationAccount?: string;
  InstanceArn?: string;
  IdentityStoreArn?: string;
  Status?: ApplicationStatus;
  PortalOptions?: PortalOptions;
  Description?: string;
  CreatedDate?: Date;
  CreatedFrom?: string;
}
export type ApplicationList = Application[];
export interface ListApplicationsResponse {
  Applications?: Application[];
  NextToken?: string;
}
export interface ListCustomerManagedPolicyReferencesInPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type CustomerManagedPolicyReferenceList =
  CustomerManagedPolicyReference[];
export interface ListCustomerManagedPolicyReferencesInPermissionSetResponse {
  CustomerManagedPolicyReferences?: CustomerManagedPolicyReference[];
  NextToken?: string;
}
export interface ListInstancesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface RegionMetadata {
  RegionName?: string;
  Status?: RegionStatus;
  AddedDate?: Date;
  IsPrimaryRegion?: boolean;
}
export type RegionMetadataList = RegionMetadata[];
export interface InstanceMetadata {
  InstanceArn?: string;
  IdentityStoreId?: string;
  OwnerAccountId?: string;
  Name?: string;
  CreatedDate?: Date;
  Status?: InstanceStatus;
  StatusReason?: string;
  PrimaryRegion?: string;
  Regions?: RegionMetadata[];
}
export type InstanceList = InstanceMetadata[];
export interface ListInstancesResponse {
  Instances?: InstanceMetadata[];
  NextToken?: string;
}
export interface ListManagedPoliciesInPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AttachedManagedPolicy {
  Name?: string;
  Arn?: string;
}
export type AttachedManagedPolicyList = AttachedManagedPolicy[];
export interface ListManagedPoliciesInPermissionSetResponse {
  AttachedManagedPolicies?: AttachedManagedPolicy[];
  NextToken?: string;
}
export interface ListPermissionSetProvisioningStatusRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: OperationStatusFilter;
}
export interface PermissionSetProvisioningStatusMetadata {
  Status?: StatusValues;
  RequestId?: string;
  CreatedDate?: Date;
}
export type PermissionSetProvisioningStatusList =
  PermissionSetProvisioningStatusMetadata[];
export interface ListPermissionSetProvisioningStatusResponse {
  PermissionSetsProvisioningStatus?: PermissionSetProvisioningStatusMetadata[];
  NextToken?: string;
}
export interface ListPermissionSetsRequest {
  InstanceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type PermissionSetList = string[];
export interface ListPermissionSetsResponse {
  PermissionSets?: string[];
  NextToken?: string;
}
export interface ListPermissionSetsProvisionedToAccountRequest {
  InstanceArn: string;
  AccountId: string;
  ProvisioningStatus?: ProvisioningStatus;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPermissionSetsProvisionedToAccountResponse {
  NextToken?: string;
  PermissionSets?: string[];
}
export interface ListRegionsRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListRegionsResponse {
  Regions?: RegionMetadata[];
  NextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  InstanceArn?: string;
  ResourceArn: string;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export interface ListTrustedTokenIssuersRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TrustedTokenIssuerMetadata {
  TrustedTokenIssuerArn?: string;
  Name?: string;
  TrustedTokenIssuerType?: TrustedTokenIssuerType;
}
export type TrustedTokenIssuerList = TrustedTokenIssuerMetadata[];
export interface ListTrustedTokenIssuersResponse {
  TrustedTokenIssuers?: TrustedTokenIssuerMetadata[];
  NextToken?: string;
}
export type ProvisionTargetType =
  | "AWS_ACCOUNT"
  | "ALL_PROVISIONED_ACCOUNTS"
  | (string & {});
export interface ProvisionPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  TargetId?: string;
  TargetType: ProvisionTargetType;
}
export interface ProvisionPermissionSetResponse {
  PermissionSetProvisioningStatus?: PermissionSetProvisioningStatus;
}
export interface PutApplicationAccessScopeRequest {
  Scope: string;
  AuthorizedTargets?: string[];
  ApplicationArn: string;
}
export interface PutApplicationAccessScopeResponse {}
export interface PutApplicationAssignmentConfigurationRequest {
  ApplicationArn: string;
  AssignmentRequired: boolean;
}
export interface PutApplicationAssignmentConfigurationResponse {}
export interface PutApplicationAuthenticationMethodRequest {
  ApplicationArn: string;
  AuthenticationMethodType: AuthenticationMethodType;
  AuthenticationMethod: AuthenticationMethod;
}
export interface PutApplicationAuthenticationMethodResponse {}
export interface PutApplicationGrantRequest {
  ApplicationArn: string;
  GrantType: GrantType;
  Grant: Grant;
}
export interface PutApplicationGrantResponse {}
export interface PutApplicationSessionConfigurationRequest {
  ApplicationArn: string;
  UserBackgroundSessionApplicationStatus?: UserBackgroundSessionApplicationStatus;
}
export interface PutApplicationSessionConfigurationResponse {}
export interface PutInlinePolicyToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  InlinePolicy: string;
}
export interface PutInlinePolicyToPermissionSetResponse {}
export interface PutPermissionsBoundaryToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  PermissionsBoundary: PermissionsBoundary;
}
export interface PutPermissionsBoundaryToPermissionSetResponse {}
export interface RemoveRegionRequest {
  InstanceArn: string;
  RegionName: string;
}
export interface RemoveRegionResponse {
  Status?: RegionStatus;
}
export interface TagResourceRequest {
  InstanceArn?: string;
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  InstanceArn?: string;
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationPortalOptions {
  SignInOptions?: SignInOptions;
}
export interface UpdateApplicationRequest {
  ApplicationArn: string;
  Name?: string;
  Description?: string;
  Status?: ApplicationStatus;
  PortalOptions?: UpdateApplicationPortalOptions;
}
export interface UpdateApplicationResponse {}
export interface EncryptionConfiguration {
  KeyType: KmsKeyType;
  KmsKeyArn?: string;
}
export interface UpdateInstanceRequest {
  Name?: string;
  InstanceArn: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  PermissionSetsEnabled?: boolean;
}
export interface UpdateInstanceResponse {}
export interface UpdateInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
  InstanceAccessControlAttributeConfiguration: InstanceAccessControlAttributeConfiguration;
}
export interface UpdateInstanceAccessControlAttributeConfigurationResponse {}
export interface UpdatePermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  Description?: string;
  SessionDuration?: string;
  RelayState?: string;
}
export interface UpdatePermissionSetResponse {}
export interface OidcJwtUpdateConfiguration {
  ClaimAttributePath?: string;
  IdentityStoreAttributePath?: string;
  JwksRetrievalOption?: JwksRetrievalOption;
}
export type TrustedTokenIssuerUpdateConfiguration = {
  OidcJwtConfiguration: OidcJwtUpdateConfiguration;
};
export interface UpdateTrustedTokenIssuerRequest {
  TrustedTokenIssuerArn: string;
  Name?: string;
  TrustedTokenIssuerConfiguration?: TrustedTokenIssuerUpdateConfiguration;
}
export interface UpdateTrustedTokenIssuerResponse {}
export type AccessDeniedExceptionMessage = string;
export type AccessDeniedExceptionReason =
  | "KMS_AccessDeniedException"
  | (string & {});
export type ConflictExceptionMessage = string;
export type InternalFailureMessage = string;
export type ServiceQuotaExceededMessage = string;
export type ThrottlingExceptionMessage = string;
export type ThrottlingExceptionReason =
  | "KMS_ThrottlingException"
  | (string & {});
export type ValidationExceptionMessage = string;
export type ValidationExceptionReason =
  | "KMS_InvalidKeyUsageException"
  | "KMS_InvalidStateException"
  | "KMS_DisabledException"
  | (string & {});
export type ResourceNotFoundMessage = string;
export type ResourceNotFoundExceptionReason =
  | "KMS_NotFoundException"
  | (string & {});
export type AddRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a Region to an IAM Identity Center instance. This operation initiates an asynchronous workflow to replicate the IAM Identity Center instance to the target Region. The Region status is set to ADDING at first and changes to ACTIVE when the workflow completes.
 *
 * To use this operation, your IAM Identity Center instance and the target Region must meet the requirements described in the IAM Identity Center User Guide.
 *
 * The following actions are related to `AddRegion`:
 *
 * - RemoveRegion
 *
 * - DescribeRegion
 *
 * - ListRegions
 */
export const addRegion: API.OperationMethod<
  AddRegionRequest,
  AddRegionResponse,
  AddRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, RegionName: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddRegion",
})) as any;

export type AttachCustomerManagedPolicyReferenceToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches the specified customer managed policy to the specified PermissionSet.
 */
export const attachCustomerManagedPolicyReferenceToPermissionSet: API.OperationMethod<
  AttachCustomerManagedPolicyReferenceToPermissionSetRequest,
  AttachCustomerManagedPolicyReferenceToPermissionSetResponse,
  AttachCustomerManagedPolicyReferenceToPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PermissionSetArn: 0,
      CustomerManagedPolicyReference: i_CustomerManagedPolicyReference,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachCustomerManagedPolicyReferenceToPermissionSet",
})) as any;

export type AttachManagedPolicyToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an Amazon Web Services managed policy ARN to a permission set.
 *
 * If the permission set is already referenced by one or more account assignments, you will need to call ` ProvisionPermissionSet ` after this operation. Calling `ProvisionPermissionSet` applies the corresponding IAM policy updates to all assigned accounts.
 */
export const attachManagedPolicyToPermissionSet: API.OperationMethod<
  AttachManagedPolicyToPermissionSetRequest,
  AttachManagedPolicyToPermissionSetResponse,
  AttachManagedPolicyToPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0, ManagedPolicyArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachManagedPolicyToPermissionSet",
})) as any;

export type CreateAccountAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns access to a principal for a specified Amazon Web Services account using a specified permission set.
 *
 * The term *principal* here refers to a user or group that is defined in IAM Identity Center.
 *
 * As part of a successful `CreateAccountAssignment` call, the specified permission set will automatically be provisioned to the account in the form of an IAM policy. That policy is attached to the IAM role created in IAM Identity Center. If the permission set is subsequently updated, the corresponding IAM policies attached to roles in your accounts will not be updated automatically. In this case, you must call ` ProvisionPermissionSet ` to make these updates.
 *
 * After a successful response, call `DescribeAccountAssignmentCreationStatus` to describe the status of an assignment creation request.
 */
export const createAccountAssignment: API.OperationMethod<
  CreateAccountAssignmentRequest,
  CreateAccountAssignmentResponse,
  CreateAccountAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      TargetId: 0,
      TargetType: 0,
      PermissionSetArn: 0,
      PrincipalType: 0,
      PrincipalId: 0,
    },
    output: {
      AccountAssignmentCreationStatus: o_AccountAssignmentOperationStatus,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountAssignment",
})) as any;

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OAuth 2.0 customer managed application in IAM Identity Center for the given application provider.
 *
 * This API does not support creating SAML 2.0 customer managed applications or Amazon Web Services managed applications. To learn how to create an Amazon Web Services managed application, see the application user guide. You can create a SAML 2.0 customer managed application in the Amazon Web Services Management Console only. See Setting up customer managed SAML 2.0 applications. For more information on these application types, see Amazon Web Services managed applications.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      ApplicationProviderArn: 0,
      Name: 0,
      Description: 0,
      PortalOptions: { SignInOptions: i_SignInOptions, Visibility: 0 },
      Tags: D.list(i_Tag),
      Status: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateApplicationAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grant application access to a user or group.
 */
export const createApplicationAssignment: API.OperationMethod<
  CreateApplicationAssignmentRequest,
  CreateApplicationAssignmentResponse,
  CreateApplicationAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, PrincipalId: 0, PrincipalType: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationAssignment",
})) as any;

export type CreateInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an instance of IAM Identity Center for a standalone Amazon Web Services account that is not managed by Organizations or a member Amazon Web Services account in an organization. You can create only one instance per account and across all Amazon Web Services Regions.
 *
 * The CreateInstance request is rejected if the following apply:
 *
 * - The instance is created within the organization management account.
 *
 * - An instance already exists in the same account.
 */
export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstance",
})) as any;

export type CreateInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables the attributes-based access control (ABAC) feature for the specified IAM Identity Center instance. You can also specify new attributes to add to your ABAC configuration during the enabling process. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 *
 * After a successful response, call `DescribeInstanceAccessControlAttributeConfiguration` to validate that `InstanceAccessControlAttributeConfiguration` was created.
 */
export const createInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  CreateInstanceAccessControlAttributeConfigurationRequest,
  CreateInstanceAccessControlAttributeConfigurationResponse,
  CreateInstanceAccessControlAttributeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      InstanceAccessControlAttributeConfiguration:
        i_InstanceAccessControlAttributeConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstanceAccessControlAttributeConfiguration",
})) as any;

export type CreatePermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a permission set within a specified IAM Identity Center instance.
 *
 * To grant users and groups access to Amazon Web Services account resources, use ` CreateAccountAssignment `.
 */
export const createPermissionSet: API.OperationMethod<
  CreatePermissionSetRequest,
  CreatePermissionSetResponse,
  CreatePermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      InstanceArn: 0,
      SessionDuration: 0,
      RelayState: 0,
      Tags: D.list(i_Tag),
    },
    output: { PermissionSet: o_PermissionSet },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermissionSet",
})) as any;

export type CreateTrustedTokenIssuerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connection to a trusted token issuer in an instance of IAM Identity Center. A trusted token issuer enables trusted identity propagation to be used with applications that authenticate outside of Amazon Web Services.
 *
 * This trusted token issuer describes an external identity provider (IdP) that can generate claims or assertions in the form of access tokens for a user. Applications enabled for IAM Identity Center can use these tokens for authentication.
 */
export const createTrustedTokenIssuer: API.OperationMethod<
  CreateTrustedTokenIssuerRequest,
  CreateTrustedTokenIssuerResponse,
  CreateTrustedTokenIssuerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      Name: 0,
      TrustedTokenIssuerType: 0,
      TrustedTokenIssuerConfiguration: {
        OidcJwtConfiguration: {
          IssuerUrl: 0,
          ClaimAttributePath: 0,
          IdentityStoreAttributePath: 0,
          JwksRetrievalOption: 0,
        },
      },
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustedTokenIssuer",
})) as any;

export type DeleteAccountAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a principal's access from a specified Amazon Web Services account using a specified permission set.
 *
 * After a successful response, call `DescribeAccountAssignmentDeletionStatus` to describe the status of an assignment deletion request.
 */
export const deleteAccountAssignment: API.OperationMethod<
  DeleteAccountAssignmentRequest,
  DeleteAccountAssignmentResponse,
  DeleteAccountAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      TargetId: 0,
      TargetType: 0,
      PermissionSetArn: 0,
      PrincipalType: 0,
      PrincipalId: 0,
    },
    output: {
      AccountAssignmentDeletionStatus: o_AccountAssignmentOperationStatus,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAssignment",
})) as any;

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the association with the application. The connected service resource still exists.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteApplicationAccessScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an IAM Identity Center access scope from an application.
 */
export const deleteApplicationAccessScope: API.OperationMethod<
  DeleteApplicationAccessScopeRequest,
  DeleteApplicationAccessScopeResponse,
  DeleteApplicationAccessScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0, Scope: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationAccessScope",
})) as any;

export type DeleteApplicationAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revoke application access to an application by deleting application assignments for a user or group.
 */
export const deleteApplicationAssignment: API.OperationMethod<
  DeleteApplicationAssignmentRequest,
  DeleteApplicationAssignmentResponse,
  DeleteApplicationAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, PrincipalId: 0, PrincipalType: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationAssignment",
})) as any;

export type DeleteApplicationAuthenticationMethodError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an authentication method from an application.
 */
export const deleteApplicationAuthenticationMethod: API.OperationMethod<
  DeleteApplicationAuthenticationMethodRequest,
  DeleteApplicationAuthenticationMethodResponse,
  DeleteApplicationAuthenticationMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, AuthenticationMethodType: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationAuthenticationMethod",
})) as any;

export type DeleteApplicationGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a grant from an application.
 */
export const deleteApplicationGrant: API.OperationMethod<
  DeleteApplicationGrantRequest,
  DeleteApplicationGrantResponse,
  DeleteApplicationGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0, GrantType: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationGrant",
})) as any;

export type DeleteInlinePolicyFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the inline policy from a specified permission set.
 */
export const deleteInlinePolicyFromPermissionSet: API.OperationMethod<
  DeleteInlinePolicyFromPermissionSetRequest,
  DeleteInlinePolicyFromPermissionSetResponse,
  DeleteInlinePolicyFromPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, PermissionSetArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInlinePolicyFromPermissionSet",
})) as any;

export type DeleteInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the instance of IAM Identity Center. Only the account that owns the instance can call this API. Neither the delegated administrator nor member account can delete the organization instance, but those roles can delete their own instance.
 */
export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResponse,
  DeleteInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstance",
})) as any;

export type DeleteInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables the attributes-based access control (ABAC) feature for the specified IAM Identity Center instance and deletes all of the attribute mappings that have been configured. Once deleted, any attributes that are received from an identity source and any custom attributes you have previously configured will not be passed. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 */
export const deleteInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  DeleteInstanceAccessControlAttributeConfigurationRequest,
  DeleteInstanceAccessControlAttributeConfigurationResponse,
  DeleteInstanceAccessControlAttributeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceAccessControlAttributeConfiguration",
})) as any;

export type DeletePermissionsBoundaryFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the permissions boundary from a specified PermissionSet.
 */
export const deletePermissionsBoundaryFromPermissionSet: API.OperationMethod<
  DeletePermissionsBoundaryFromPermissionSetRequest,
  DeletePermissionsBoundaryFromPermissionSetResponse,
  DeletePermissionsBoundaryFromPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, PermissionSetArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionsBoundaryFromPermissionSet",
})) as any;

export type DeletePermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified permission set.
 */
export const deletePermissionSet: API.OperationMethod<
  DeletePermissionSetRequest,
  DeletePermissionSetResponse,
  DeletePermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, PermissionSetArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionSet",
})) as any;

export type DeleteTrustedTokenIssuerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a trusted token issuer configuration from an instance of IAM Identity Center.
 *
 * Deleting this trusted token issuer configuration will cause users to lose access to any applications that are configured to use the trusted token issuer.
 */
export const deleteTrustedTokenIssuer: API.OperationMethod<
  DeleteTrustedTokenIssuerRequest,
  DeleteTrustedTokenIssuerResponse,
  DeleteTrustedTokenIssuerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustedTokenIssuerArn: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustedTokenIssuer",
})) as any;

export type DescribeAccountAssignmentCreationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status of the assignment creation request.
 */
export const describeAccountAssignmentCreationStatus: API.OperationMethod<
  DescribeAccountAssignmentCreationStatusRequest,
  DescribeAccountAssignmentCreationStatusResponse,
  DescribeAccountAssignmentCreationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, AccountAssignmentCreationRequestId: 0 },
    output: {
      AccountAssignmentCreationStatus: o_AccountAssignmentOperationStatus,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAssignmentCreationStatus",
})) as any;

export type DescribeAccountAssignmentDeletionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status of the assignment deletion request.
 */
export const describeAccountAssignmentDeletionStatus: API.OperationMethod<
  DescribeAccountAssignmentDeletionStatusRequest,
  DescribeAccountAssignmentDeletionStatusResponse,
  DescribeAccountAssignmentDeletionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, AccountAssignmentDeletionRequestId: 0 },
    output: {
      AccountAssignmentDeletionStatus: o_AccountAssignmentOperationStatus,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAssignmentDeletionStatus",
})) as any;

export type DescribeApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of an application associated with an instance of IAM Identity Center.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0 },
    output: { CreatedDate: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
})) as any;

export type DescribeApplicationAssignmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a direct assignment of a user or group to an application. If the user doesn’t have a direct assignment to the application, the user may still have access to the application through a group. Therefore, don’t use this API to test access to an application for a user. Instead use ListApplicationAssignmentsForPrincipal.
 */
export const describeApplicationAssignment: API.OperationMethod<
  DescribeApplicationAssignmentRequest,
  DescribeApplicationAssignmentResponse,
  DescribeApplicationAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, PrincipalId: 0, PrincipalType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationAssignment",
})) as any;

export type DescribeApplicationProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a provider that can be used to connect an Amazon Web Services managed application or customer managed application to IAM Identity Center.
 */
export const describeApplicationProvider: API.OperationMethod<
  DescribeApplicationProviderRequest,
  DescribeApplicationProviderResponse,
  DescribeApplicationProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationProviderArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationProvider",
})) as any;

export type DescribeInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of an instance of IAM Identity Center. The status can be one of the following:
 *
 * - `CREATE_IN_PROGRESS` - The instance is in the process of being created. When the instance is ready for use, DescribeInstance returns the status of `ACTIVE`. While the instance is in the `CREATE_IN_PROGRESS` state, you can call only DescribeInstance and DeleteInstance operations.
 *
 * - `DELETE_IN_PROGRESS` - The instance is being deleted. Returns `AccessDeniedException` after the delete operation completes.
 *
 * - `ACTIVE` - The instance is active.
 */
export const describeInstance: API.OperationMethod<
  DescribeInstanceRequest,
  DescribeInstanceResponse,
  DescribeInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0 },
    output: { CreatedDate: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstance",
})) as any;

export type DescribeInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of IAM Identity Center identity store attributes that have been configured to work with attributes-based access control (ABAC) for the specified IAM Identity Center instance. This will not return attributes configured and sent by an external identity provider. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 */
export const describeInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  DescribeInstanceAccessControlAttributeConfigurationRequest,
  DescribeInstanceAccessControlAttributeConfigurationResponse,
  DescribeInstanceAccessControlAttributeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceAccessControlAttributeConfiguration",
})) as any;

export type DescribePermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the permission set.
 */
export const describePermissionSet: API.OperationMethod<
  DescribePermissionSetRequest,
  DescribePermissionSetResponse,
  DescribePermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0 },
    output: { PermissionSet: o_PermissionSet },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePermissionSet",
})) as any;

export type DescribePermissionSetProvisioningStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status for the given permission set provisioning request.
 */
export const describePermissionSetProvisioningStatus: API.OperationMethod<
  DescribePermissionSetProvisioningStatusRequest,
  DescribePermissionSetProvisioningStatusResponse,
  DescribePermissionSetProvisioningStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, ProvisionPermissionSetRequestId: 0 },
    output: {
      PermissionSetProvisioningStatus: o_PermissionSetProvisioningStatus,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePermissionSetProvisioningStatus",
})) as any;

export type DescribeRegionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific Region enabled in an IAM Identity Center instance. Details include the Region name, current status (ACTIVE, ADDING, or REMOVING), the date when the Region was added, and whether it is the primary Region. The request must be made from one of the enabled Regions of the IAM Identity Center instance.
 *
 * The following actions are related to `DescribeRegion`:
 *
 * - AddRegion
 *
 * - RemoveRegion
 *
 * - ListRegions
 */
export const describeRegion: API.OperationMethod<
  DescribeRegionRequest,
  DescribeRegionResponse,
  DescribeRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, RegionName: 0 },
    output: { AddedDate: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegion",
})) as any;

export type DescribeTrustedTokenIssuerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a trusted token issuer configuration stored in an instance of IAM Identity Center. Details include the name of the trusted token issuer, the issuer URL, and the path of the source attribute and the destination attribute for a trusted token issuer configuration.
 */
export const describeTrustedTokenIssuer: API.OperationMethod<
  DescribeTrustedTokenIssuerRequest,
  DescribeTrustedTokenIssuerResponse,
  DescribeTrustedTokenIssuerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustedTokenIssuerArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustedTokenIssuer",
})) as any;

export type DetachCustomerManagedPolicyReferenceFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Detaches the specified customer managed policy from the specified PermissionSet.
 */
export const detachCustomerManagedPolicyReferenceFromPermissionSet: API.OperationMethod<
  DetachCustomerManagedPolicyReferenceFromPermissionSetRequest,
  DetachCustomerManagedPolicyReferenceFromPermissionSetResponse,
  DetachCustomerManagedPolicyReferenceFromPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PermissionSetArn: 0,
      CustomerManagedPolicyReference: i_CustomerManagedPolicyReference,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachCustomerManagedPolicyReferenceFromPermissionSet",
})) as any;

export type DetachManagedPolicyFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Detaches the attached Amazon Web Services managed policy ARN from the specified permission set.
 */
export const detachManagedPolicyFromPermissionSet: API.OperationMethod<
  DetachManagedPolicyFromPermissionSetRequest,
  DetachManagedPolicyFromPermissionSetResponse,
  DetachManagedPolicyFromPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0, ManagedPolicyArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachManagedPolicyFromPermissionSet",
})) as any;

export type GetApplicationAccessScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the authorized targets for an IAM Identity Center access scope for an application.
 */
export const getApplicationAccessScope: API.OperationMethod<
  GetApplicationAccessScopeRequest,
  GetApplicationAccessScopeResponse,
  GetApplicationAccessScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0, Scope: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationAccessScope",
})) as any;

export type GetApplicationAssignmentConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration of PutApplicationAssignmentConfiguration.
 */
export const getApplicationAssignmentConfiguration: API.OperationMethod<
  GetApplicationAssignmentConfigurationRequest,
  GetApplicationAssignmentConfigurationResponse,
  GetApplicationAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationAssignmentConfiguration",
})) as any;

export type GetApplicationAuthenticationMethodError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an authentication method used by an application.
 */
export const getApplicationAuthenticationMethod: API.OperationMethod<
  GetApplicationAuthenticationMethodRequest,
  GetApplicationAuthenticationMethodResponse,
  GetApplicationAuthenticationMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, AuthenticationMethodType: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationAuthenticationMethod",
})) as any;

export type GetApplicationGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an application grant.
 */
export const getApplicationGrant: API.OperationMethod<
  GetApplicationGrantRequest,
  GetApplicationGrantResponse,
  GetApplicationGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0, GrantType: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationGrant",
})) as any;

export type GetApplicationSessionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the session configuration for an application in IAM Identity Center.
 *
 * The session configuration determines how users can access an application. This includes whether user background sessions are enabled. User background sessions allow users to start a job on a supported Amazon Web Services managed application without having to remain signed in to an active session while the job runs.
 */
export const getApplicationSessionConfiguration: API.OperationMethod<
  GetApplicationSessionConfigurationRequest,
  GetApplicationSessionConfigurationResponse,
  GetApplicationSessionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationSessionConfiguration",
})) as any;

export type GetInlinePolicyForPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains the inline policy assigned to the permission set.
 */
export const getInlinePolicyForPermissionSet: API.OperationMethod<
  GetInlinePolicyForPermissionSetRequest,
  GetInlinePolicyForPermissionSetResponse,
  GetInlinePolicyForPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, PermissionSetArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInlinePolicyForPermissionSet",
})) as any;

export type GetPermissionsBoundaryForPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains the permissions boundary for a specified PermissionSet.
 */
export const getPermissionsBoundaryForPermissionSet: API.OperationMethod<
  GetPermissionsBoundaryForPermissionSetRequest,
  GetPermissionsBoundaryForPermissionSetResponse,
  GetPermissionsBoundaryForPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, PermissionSetArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermissionsBoundaryForPermissionSet",
})) as any;

export type ListAccountAssignmentCreationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the status of the Amazon Web Services account assignment creation requests for a specified IAM Identity Center instance.
 */
export const listAccountAssignmentCreationStatus: API.PaginatedOperationMethod<
  ListAccountAssignmentCreationStatusRequest,
  ListAccountAssignmentCreationStatusResponse,
  ListAccountAssignmentCreationStatusError,
  Credentials | HttpClient.HttpClient,
  AccountAssignmentOperationStatusMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filter: i_OperationStatusFilter,
    },
    output: {
      AccountAssignmentsCreationStatus: D.list(
        o_AccountAssignmentOperationStatusMetadata,
      ),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssignmentCreationStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignmentsCreationStatus",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountAssignmentDeletionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the status of the Amazon Web Services account assignment deletion requests for a specified IAM Identity Center instance.
 */
export const listAccountAssignmentDeletionStatus: API.PaginatedOperationMethod<
  ListAccountAssignmentDeletionStatusRequest,
  ListAccountAssignmentDeletionStatusResponse,
  ListAccountAssignmentDeletionStatusError,
  Credentials | HttpClient.HttpClient,
  AccountAssignmentOperationStatusMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filter: i_OperationStatusFilter,
    },
    output: {
      AccountAssignmentsDeletionStatus: D.list(
        o_AccountAssignmentOperationStatusMetadata,
      ),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssignmentDeletionStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignmentsDeletionStatus",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountAssignmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the assignee of the specified Amazon Web Services account with the specified permission set.
 */
export const listAccountAssignments: API.PaginatedOperationMethod<
  ListAccountAssignmentsRequest,
  ListAccountAssignmentsResponse,
  ListAccountAssignmentsError,
  Credentials | HttpClient.HttpClient,
  AccountAssignment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      AccountId: 0,
      PermissionSetArn: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssignments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountAssignmentsForPrincipalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the IAM Identity Center associated Amazon Web Services accounts that the principal has access to. This action must be called from the management account containing your organization instance of IAM Identity Center. This action is not valid for account instances of IAM Identity Center.
 */
export const listAccountAssignmentsForPrincipal: API.PaginatedOperationMethod<
  ListAccountAssignmentsForPrincipalRequest,
  ListAccountAssignmentsForPrincipalResponse,
  ListAccountAssignmentsForPrincipalError,
  Credentials | HttpClient.HttpClient,
  AccountAssignmentForPrincipal
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PrincipalId: 0,
      PrincipalType: 0,
      Filter: { AccountId: 0 },
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssignmentsForPrincipal",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountsForProvisionedPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Amazon Web Services accounts where the specified permission set is provisioned.
 */
export const listAccountsForProvisionedPermissionSet: API.PaginatedOperationMethod<
  ListAccountsForProvisionedPermissionSetRequest,
  ListAccountsForProvisionedPermissionSetResponse,
  ListAccountsForProvisionedPermissionSetError,
  Credentials | HttpClient.HttpClient,
  AccountId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PermissionSetArn: 0,
      ProvisioningStatus: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountsForProvisionedPermissionSet",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationAccessScopesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the access scopes and authorized targets associated with an application.
 */
export const listApplicationAccessScopes: API.PaginatedOperationMethod<
  ListApplicationAccessScopesRequest,
  ListApplicationAccessScopesResponse,
  ListApplicationAccessScopesError,
  Credentials | HttpClient.HttpClient,
  ScopeDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationAccessScopes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scopes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationAssignmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Web Services account users that are assigned to an application.
 */
export const listApplicationAssignments: API.PaginatedOperationMethod<
  ListApplicationAssignmentsRequest,
  ListApplicationAssignmentsResponse,
  ListApplicationAssignmentsError,
  Credentials | HttpClient.HttpClient,
  ApplicationAssignment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationAssignments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationAssignments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationAssignmentsForPrincipalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the applications to which a specified principal is assigned. You must provide a filter when calling this action from a member account against your organization instance of IAM Identity Center. A filter is not required when called from the management account against an organization instance of IAM Identity Center, or from a member account against an account instance of IAM Identity Center in the same account.
 */
export const listApplicationAssignmentsForPrincipal: API.PaginatedOperationMethod<
  ListApplicationAssignmentsForPrincipalRequest,
  ListApplicationAssignmentsForPrincipalResponse,
  ListApplicationAssignmentsForPrincipalError,
  Credentials | HttpClient.HttpClient,
  ApplicationAssignmentForPrincipal
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PrincipalId: 0,
      PrincipalType: 0,
      Filter: { ApplicationArn: 0 },
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationAssignmentsForPrincipal",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationAssignments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationAuthenticationMethodsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the authentication methods supported by the specified application.
 */
export const listApplicationAuthenticationMethods: API.PaginatedOperationMethod<
  ListApplicationAuthenticationMethodsRequest,
  ListApplicationAuthenticationMethodsResponse,
  ListApplicationAuthenticationMethodsError,
  Credentials | HttpClient.HttpClient,
  AuthenticationMethodItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationAuthenticationMethods",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AuthenticationMethods",
  } as const,
})) as any;

export type ListApplicationGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the grants associated with an application.
 */
export const listApplicationGrants: API.PaginatedOperationMethod<
  ListApplicationGrantsRequest,
  ListApplicationGrantsResponse,
  ListApplicationGrantsError,
  Credentials | HttpClient.HttpClient,
  GrantItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { ApplicationArn: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationGrants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Grants",
  } as const,
})) as any;

export type ListApplicationProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the application providers configured in the IAM Identity Center identity store.
 */
export const listApplicationProviders: API.PaginatedOperationMethod<
  ListApplicationProvidersRequest,
  ListApplicationProvidersResponse,
  ListApplicationProvidersError,
  Credentials | HttpClient.HttpClient,
  ApplicationProvider
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationProviders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all applications associated with the instance of IAM Identity Center. When listing applications for an organization instance in the management account, member accounts must use the `applicationAccount` parameter to filter the list to only applications created from that account. When listing applications for an account instance in the same member account, a filter is not required.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filter: { ApplicationAccount: 0, ApplicationProvider: 0 },
    },
    output: { Applications: D.list({ CreatedDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomerManagedPolicyReferencesInPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all customer managed policies attached to a specified PermissionSet.
 */
export const listCustomerManagedPolicyReferencesInPermissionSet: API.PaginatedOperationMethod<
  ListCustomerManagedPolicyReferencesInPermissionSetRequest,
  ListCustomerManagedPolicyReferencesInPermissionSetResponse,
  ListCustomerManagedPolicyReferencesInPermissionSetError,
  Credentials | HttpClient.HttpClient,
  CustomerManagedPolicyReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomerManagedPolicyReferencesInPermissionSet",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomerManagedPolicyReferences",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the details of the organization and account instances of IAM Identity Center that were created in or visible to the account calling this API.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient,
  InstanceMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: {
      Instances: D.list({
        CreatedDate: D.ts,
        Regions: D.list(o_RegionMetadata),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedPoliciesInPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Web Services managed policy that is attached to a specified permission set.
 */
export const listManagedPoliciesInPermissionSet: API.PaginatedOperationMethod<
  ListManagedPoliciesInPermissionSetRequest,
  ListManagedPoliciesInPermissionSetResponse,
  ListManagedPoliciesInPermissionSetError,
  Credentials | HttpClient.HttpClient,
  AttachedManagedPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedPoliciesInPermissionSet",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttachedManagedPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPermissionSetProvisioningStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the status of the permission set provisioning requests for a specified IAM Identity Center instance.
 */
export const listPermissionSetProvisioningStatus: API.PaginatedOperationMethod<
  ListPermissionSetProvisioningStatusRequest,
  ListPermissionSetProvisioningStatusResponse,
  ListPermissionSetProvisioningStatusError,
  Credentials | HttpClient.HttpClient,
  PermissionSetProvisioningStatusMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filter: i_OperationStatusFilter,
    },
    output: { PermissionSetsProvisioningStatus: D.list({ CreatedDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionSetProvisioningStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PermissionSetsProvisioningStatus",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPermissionSetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the PermissionSets in an IAM Identity Center instance.
 */
export const listPermissionSets: API.PaginatedOperationMethod<
  ListPermissionSetsRequest,
  ListPermissionSetsResponse,
  ListPermissionSetsError,
  Credentials | HttpClient.HttpClient,
  PermissionSetArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PermissionSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPermissionSetsProvisionedToAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the permission sets that are provisioned to a specified Amazon Web Services account.
 */
export const listPermissionSetsProvisionedToAccount: API.PaginatedOperationMethod<
  ListPermissionSetsProvisionedToAccountRequest,
  ListPermissionSetsProvisionedToAccountResponse,
  ListPermissionSetsProvisionedToAccountError,
  Credentials | HttpClient.HttpClient,
  PermissionSetArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      AccountId: 0,
      ProvisioningStatus: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionSetsProvisionedToAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PermissionSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all enabled Regions of an IAM Identity Center instance, including those that are being added or removed. This operation returns Regions with ACTIVE, ADDING, or REMOVING status.
 *
 * The following actions are related to `ListRegions`:
 *
 * - AddRegion
 *
 * - RemoveRegion
 *
 * - DescribeRegion
 */
export const listRegions: API.PaginatedOperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | HttpClient.HttpClient,
  RegionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, MaxResults: 0, NextToken: 0 },
    output: { Regions: D.list(o_RegionMetadata) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that are attached to a specified resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, ResourceArn: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
  } as const,
})) as any;

export type ListTrustedTokenIssuersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the trusted token issuers configured in an instance of IAM Identity Center.
 */
export const listTrustedTokenIssuers: API.PaginatedOperationMethod<
  ListTrustedTokenIssuersRequest,
  ListTrustedTokenIssuersResponse,
  ListTrustedTokenIssuersError,
  Credentials | HttpClient.HttpClient,
  TrustedTokenIssuerMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustedTokenIssuers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrustedTokenIssuers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ProvisionPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The process by which a specified permission set is provisioned to the specified target.
 */
export const provisionPermissionSet: API.OperationMethod<
  ProvisionPermissionSetRequest,
  ProvisionPermissionSetResponse,
  ProvisionPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0, TargetId: 0, TargetType: 0 },
    output: {
      PermissionSetProvisioningStatus: o_PermissionSetProvisioningStatus,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionPermissionSet",
})) as any;

export type PutApplicationAccessScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the list of authorized targets for an IAM Identity Center access scope for an application.
 */
export const putApplicationAccessScope: API.OperationMethod<
  PutApplicationAccessScopeRequest,
  PutApplicationAccessScopeResponse,
  PutApplicationAccessScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Scope: 0, AuthorizedTargets: 0, ApplicationArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApplicationAccessScope",
})) as any;

export type PutApplicationAssignmentConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Configure how users gain access to an application. If `AssignmentsRequired` is `true` (default value), users don’t have access to the application unless an assignment is created using the CreateApplicationAssignment API. If `false`, all users have access to the application. If an assignment is created using CreateApplicationAssignment., the user retains access if `AssignmentsRequired` is set to `true`.
 */
export const putApplicationAssignmentConfiguration: API.OperationMethod<
  PutApplicationAssignmentConfigurationRequest,
  PutApplicationAssignmentConfigurationResponse,
  PutApplicationAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, AssignmentRequired: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApplicationAssignmentConfiguration",
})) as any;

export type PutApplicationAuthenticationMethodError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates an authentication method for an application.
 */
export const putApplicationAuthenticationMethod: API.OperationMethod<
  PutApplicationAuthenticationMethodRequest,
  PutApplicationAuthenticationMethodResponse,
  PutApplicationAuthenticationMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationArn: 0,
      AuthenticationMethodType: 0,
      AuthenticationMethod: { Iam: { ActorPolicy: 0 } },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApplicationAuthenticationMethod",
})) as any;

export type PutApplicationGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a configuration for an application to use grants. Conceptually grants are authorization to request actions related to tokens. This configuration will be used when parties are requesting and receiving tokens during the trusted identity propagation process. For more information on the IAM Identity Center supported grant workflows, see SAML 2.0 and OAuth 2.0.
 *
 * A grant is created between your applications and Identity Center instance which enables an application to use specified mechanisms to obtain tokens. These tokens are used by your applications to gain access to Amazon Web Services resources on behalf of users. The following elements are within these exchanges:
 *
 * - **Requester** - The application requesting access to Amazon Web Services resources.
 *
 * - **Subject** - Typically the user that is requesting access to Amazon Web Services resources.
 *
 * - **Grant** - Conceptually, a grant is authorization to access Amazon Web Services resources. These grants authorize token generation for authenticating access to the requester and for the request to make requests on behalf of the subjects. There are four types of grants:
 *
 * - **AuthorizationCode** - Allows an application to request authorization through a series of user-agent redirects.
 *
 * - **JWT bearer ** - Authorizes an application to exchange a JSON Web Token that came from an external identity provider. To learn more, see RFC 6479.
 *
 * - **Refresh token** - Enables application to request new access tokens to replace expiring or expired access tokens.
 *
 * - **Exchange token** - A grant that requests tokens from the authorization server by providing a ‘subject’ token with access scope authorizing trusted identity propagation to this application. To learn more, see RFC 8693.
 *
 * - **Authorization server** - IAM Identity Center requests tokens.
 *
 * User credentials are never shared directly within these exchanges. Instead, applications use grants to request access tokens from IAM Identity Center. For more information, see RFC 6479.
 * **Use cases**
 *
 * - Connecting to custom applications.
 *
 * - Configuring an Amazon Web Services service to make calls to another Amazon Web Services services using JWT tokens.
 */
export const putApplicationGrant: API.OperationMethod<
  PutApplicationGrantRequest,
  PutApplicationGrantResponse,
  PutApplicationGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationArn: 0,
      GrantType: 0,
      Grant: {
        AuthorizationCode: { RedirectUris: 0 },
        JwtBearer: {
          AuthorizedTokenIssuers: D.list({
            TrustedTokenIssuerArn: 0,
            AuthorizedAudiences: 0,
          }),
        },
        RefreshToken: {},
        TokenExchange: {},
      },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApplicationGrant",
})) as any;

export type PutApplicationSessionConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the session configuration for an application in IAM Identity Center.
 *
 * The session configuration determines how users can access an application. This includes whether user background sessions are enabled. User background sessions allow users to start a job on a supported Amazon Web Services managed application without having to remain signed in to an active session while the job runs.
 */
export const putApplicationSessionConfiguration: API.OperationMethod<
  PutApplicationSessionConfigurationRequest,
  PutApplicationSessionConfigurationResponse,
  PutApplicationSessionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ApplicationArn: 0, UserBackgroundSessionApplicationStatus: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApplicationSessionConfiguration",
})) as any;

export type PutInlinePolicyToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an inline policy to a permission set.
 *
 * If the permission set is already referenced by one or more account assignments, you will need to call ` ProvisionPermissionSet ` after this action to apply the corresponding IAM policy updates to all assigned accounts.
 */
export const putInlinePolicyToPermissionSet: API.OperationMethod<
  PutInlinePolicyToPermissionSetRequest,
  PutInlinePolicyToPermissionSetResponse,
  PutInlinePolicyToPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, PermissionSetArn: 0, InlinePolicy: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInlinePolicyToPermissionSet",
})) as any;

export type PutPermissionsBoundaryToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an Amazon Web Services managed or customer managed policy to the specified PermissionSet as a permissions boundary.
 */
export const putPermissionsBoundaryToPermissionSet: API.OperationMethod<
  PutPermissionsBoundaryToPermissionSetRequest,
  PutPermissionsBoundaryToPermissionSetResponse,
  PutPermissionsBoundaryToPermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PermissionSetArn: 0,
      PermissionsBoundary: {
        CustomerManagedPolicyReference: i_CustomerManagedPolicyReference,
        ManagedPolicyArn: 0,
      },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermissionsBoundaryToPermissionSet",
})) as any;

export type RemoveRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an additional Region from an IAM Identity Center instance. This operation initiates an asynchronous workflow to clean up IAM Identity Center resources in the specified additional Region. The Region status is set to REMOVING and the Region record is deleted when the workflow completes. The request must be made from the primary Region. The target Region cannot be the primary Region, and no other add or remove Region workflows can be in progress.
 *
 * The following actions are related to `RemoveRegion`:
 *
 * - AddRegion
 *
 * - DescribeRegion
 *
 * - ListRegions
 */
export const removeRegion: API.OperationMethod<
  RemoveRegionRequest,
  RemoveRegionResponse,
  RemoveRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceArn: 0, RegionName: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRegion",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, ResourceArn: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a set of tags from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceArn: 0, ResourceArn: 0, TagKeys: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates application properties.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ApplicationArn: 0,
      Name: 0,
      Description: 0,
      Status: 0,
      PortalOptions: { SignInOptions: i_SignInOptions },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the details for the instance of IAM Identity Center that is owned by the Amazon Web Services account.
 *
 * In a single `UpdateInstance` request, you can perform only one of the following operations:
 *
 * - Update the encryption configuration of the instance by specifying `EncryptionConfiguration`.
 *
 * - Enable permission sets for the instance by specifying `PermissionSetsEnabled`.
 *
 * A request that specifies both `EncryptionConfiguration` and `PermissionSetsEnabled` returns a `ValidationException`. To perform both operations, call `UpdateInstance` separately for each. The two calls can be made in parallel.
 */
export const updateInstance: API.OperationMethod<
  UpdateInstanceRequest,
  UpdateInstanceResponse,
  UpdateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      InstanceArn: 0,
      EncryptionConfiguration: { KeyType: 0, KmsKeyArn: 0 },
      PermissionSetsEnabled: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstance",
})) as any;

export type UpdateInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the IAM Identity Center identity store attributes that you can use with the IAM Identity Center instance for attributes-based access control (ABAC). When using an external identity provider as an identity source, you can pass attributes through the SAML assertion as an alternative to configuring attributes from the IAM Identity Center identity store. If a SAML assertion passes any of these attributes, IAM Identity Center replaces the attribute value with the value from the IAM Identity Center identity store. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 */
export const updateInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  UpdateInstanceAccessControlAttributeConfigurationRequest,
  UpdateInstanceAccessControlAttributeConfigurationResponse,
  UpdateInstanceAccessControlAttributeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      InstanceAccessControlAttributeConfiguration:
        i_InstanceAccessControlAttributeConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInstanceAccessControlAttributeConfiguration",
})) as any;

export type UpdatePermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing permission set.
 */
export const updatePermissionSet: API.OperationMethod<
  UpdatePermissionSetRequest,
  UpdatePermissionSetResponse,
  UpdatePermissionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceArn: 0,
      PermissionSetArn: 0,
      Description: 0,
      SessionDuration: 0,
      RelayState: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePermissionSet",
})) as any;

export type UpdateTrustedTokenIssuerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name of the trusted token issuer, or the path of a source attribute or destination attribute for a trusted token issuer configuration.
 *
 * Updating this trusted token issuer configuration might cause users to lose access to any applications that are configured to use the trusted token issuer.
 */
export const updateTrustedTokenIssuer: API.OperationMethod<
  UpdateTrustedTokenIssuerRequest,
  UpdateTrustedTokenIssuerResponse,
  UpdateTrustedTokenIssuerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrustedTokenIssuerArn: 0,
      Name: 0,
      TrustedTokenIssuerConfiguration: {
        OidcJwtConfiguration: {
          ClaimAttributePath: 0,
          IdentityStoreAttributePath: 0,
          JwksRetrievalOption: 0,
        },
      },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustedTokenIssuer",
})) as any;

const i_CustomerManagedPolicyReference: D.LazyStruct = () => ({
  Name: 0,
  Path: 0,
});
const i_InstanceAccessControlAttributeConfiguration: D.LazyStruct = () => ({
  AccessControlAttributes: D.list({ Key: 0, Value: { Source: 0 } }),
});
const i_OperationStatusFilter: D.LazyStruct = () => ({ Status: 0 });
const i_SignInOptions: D.LazyStruct = () => ({ Origin: 0, ApplicationUrl: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AccountAssignmentOperationStatus: D.LazyStruct = () => ({
  CreatedDate: D.ts,
});
const o_AccountAssignmentOperationStatusMetadata: D.LazyStruct = () => ({
  CreatedDate: D.ts,
});
const o_PermissionSet: D.LazyStruct = () => ({ CreatedDate: D.ts });
const o_PermissionSetProvisioningStatus: D.LazyStruct = () => ({
  CreatedDate: D.ts,
});
const o_RegionMetadata: D.LazyStruct = () => ({ AddedDate: D.ts });
