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
  sdkId: "SSO Admin",
  serviceShapeName: "SWBExternalService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sso" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-07-20");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
            return e(`https://sso-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://sso.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://sso.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://sso.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ThrottlingExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type StatusValues = "IN_PROGRESS" | "FAILED" | "SUCCEEDED" | (string & {});
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
export type TrustedTokenIssuerConfiguration = { OidcJwtConfiguration: OidcJwtConfiguration };
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
export type ResourceServerScopes = { [key: string]: ResourceServerScopeDetails | undefined };
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
export type InstanceIdentityStoreArn = string;
export type InstanceStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "ACTIVE"
  | (string & {});
export type IsPrimaryRegion = boolean;
export interface RegionMetadata {
  RegionName?: string;
  Status?: RegionStatus;
  AddedDate?: Date;
  IsPrimaryRegion?: boolean;
}
export type RegionMetadataList = RegionMetadata[];
export type KmsKeyType = "AWS_OWNED_KMS_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export type KmsKeyArn = string;
export type KmsKeyStatus = "UPDATING" | "ENABLED" | "UPDATE_FAILED" | (string & {});
export interface EncryptionConfigurationDetails {
  KeyType?: KmsKeyType;
  KmsKeyArn?: string;
  EncryptionStatus?: KmsKeyStatus;
  EncryptionStatusReason?: string;
}
export interface DescribeInstanceResponse {
  InstanceArn?: string;
  IdentityStoreId?: string;
  IdentityStoreArn?: string;
  OwnerAccountId?: string;
  Name?: string;
  CreatedDate?: Date;
  Status?: InstanceStatus;
  StatusReason?: string;
  PrimaryRegion?: string;
  Regions?: RegionMetadata[];
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
export type UserBackgroundSessionApplicationStatus = "ENABLED" | "DISABLED" | (string & {});
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
export type AccountAssignmentOperationStatusList = AccountAssignmentOperationStatusMetadata[];
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
export type ApplicationAssignmentListForPrincipal = ApplicationAssignmentForPrincipal[];
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
export type CustomerManagedPolicyReferenceList = CustomerManagedPolicyReference[];
export interface ListCustomerManagedPolicyReferencesInPermissionSetResponse {
  CustomerManagedPolicyReferences?: CustomerManagedPolicyReference[];
  NextToken?: string;
}
export interface ListInstancesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface InstanceMetadata {
  InstanceArn?: string;
  IdentityStoreId?: string;
  IdentityStoreArn?: string;
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
export type PermissionSetProvisioningStatusList = PermissionSetProvisioningStatusMetadata[];
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
export type ProvisionTargetType = "AWS_ACCOUNT" | "ALL_PROVISIONED_ACCOUNTS" | (string & {});
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
export type AccessDeniedExceptionReason = "KMS_AccessDeniedException" | (string & {});
export type ConflictExceptionMessage = string;
export type InternalFailureMessage = string;
export type ServiceQuotaExceededMessage = string;
export type ThrottlingExceptionMessage = string;
export type ThrottlingExceptionReason = "KMS_ThrottlingException" | (string & {});
export type ValidationExceptionMessage = string;
export type ValidationExceptionReason =
  | "KMS_InvalidKeyUsageException"
  | "KMS_InvalidStateException"
  | "KMS_DisabledException"
  | (string & {});
export type ResourceNotFoundMessage = string;
export type ResourceNotFoundExceptionReason = "KMS_NotFoundException" | (string & {});
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
  input: __S(640, __c80, 0) as any as S.Schema<AddRegionRequest>,
  output: __S(648, __c81, 0) as any as S.Schema<AddRegionResponse>,
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
}));

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
  input: __S(
    736,
    __c92,
    0,
  ) as any as S.Schema<AttachCustomerManagedPolicyReferenceToPermissionSetRequest>,
  output: __S(
    752,
    __c94,
    0,
  ) as any as S.Schema<AttachCustomerManagedPolicyReferenceToPermissionSetResponse>,
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
}));

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
  input: __S(808, __c101, 0) as any as S.Schema<AttachManagedPolicyToPermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<AttachManagedPolicyToPermissionSetResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateAccountAssignmentRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateAccountAssignmentResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<CreateApplicationResponse>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateApplicationAssignmentRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<CreateApplicationAssignmentResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<CreateInstanceRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<CreateInstanceResponse>,
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
}));

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
  input: __S(
    72,
    __c9,
    0,
  ) as any as S.Schema<CreateInstanceAccessControlAttributeConfigurationRequest>,
  output: __S(
    752,
    __c94,
    0,
  ) as any as S.Schema<CreateInstanceAccessControlAttributeConfigurationResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<CreatePermissionSetRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<CreatePermissionSetResponse>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<CreateTrustedTokenIssuerRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<CreateTrustedTokenIssuerResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DeleteAccountAssignmentRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteAccountAssignmentResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteApplicationResponse>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<DeleteApplicationAccessScopeRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteApplicationAccessScopeResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DeleteApplicationAssignmentRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteApplicationAssignmentResponse>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<DeleteApplicationAuthenticationMethodRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteApplicationAuthenticationMethodResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<DeleteApplicationGrantRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteApplicationGrantResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<DeleteInlinePolicyFromPermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteInlinePolicyFromPermissionSetResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<DeleteInstanceRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteInstanceResponse>,
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
}));

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
  input: __S(
    200,
    __c25,
    0,
  ) as any as S.Schema<DeleteInstanceAccessControlAttributeConfigurationRequest>,
  output: __S(
    752,
    __c94,
    0,
  ) as any as S.Schema<DeleteInstanceAccessControlAttributeConfigurationResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<DeletePermissionsBoundaryFromPermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeletePermissionsBoundaryFromPermissionSetResponse>,
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
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<DeletePermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeletePermissionSetResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<DeleteTrustedTokenIssuerRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DeleteTrustedTokenIssuerResponse>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<DescribeAccountAssignmentCreationStatusRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DescribeAccountAssignmentCreationStatusResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<DescribeAccountAssignmentDeletionStatusRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DescribeAccountAssignmentDeletionStatusResponse>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<DescribeApplicationRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<DescribeApplicationResponse>,
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
}));

export type DescribeApplicationAssignmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a direct assignment of a user or group to an application. If the user doesn't have a direct assignment to the application, the user may still have access to the application through a group. Therefore, don't use this API to test access to an application for a user. Instead use ListApplicationAssignmentsForPrincipal.
 */
export const describeApplicationAssignment: API.OperationMethod<
  DescribeApplicationAssignmentRequest,
  DescribeApplicationAssignmentResponse,
  DescribeApplicationAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<DescribeApplicationAssignmentRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<DescribeApplicationAssignmentResponse>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<DescribeApplicationProviderRequest>,
  output: __S(284, __c35, 4) as any as S.Schema<DescribeApplicationProviderResponse>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DescribeInstanceRequest>,
  output: __S(290, __c36, 2) as any as S.Schema<DescribeInstanceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstance",
}));

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
  input: __S(
    312,
    __c39,
    0,
  ) as any as S.Schema<DescribeInstanceAccessControlAttributeConfigurationRequest>,
  output: __S(
    313,
    __c39,
    1,
  ) as any as S.Schema<DescribeInstanceAccessControlAttributeConfigurationResponse>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DescribePermissionSetRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<DescribePermissionSetResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DescribePermissionSetProvisioningStatusRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<DescribePermissionSetProvisioningStatusResponse>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DescribeRegionRequest>,
  output: __S(296, __c37, 0) as any as S.Schema<DescribeRegionResponse>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DescribeTrustedTokenIssuerRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<DescribeTrustedTokenIssuerResponse>,
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
}));

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
  input: __S(
    360,
    __c45,
    0,
  ) as any as S.Schema<DetachCustomerManagedPolicyReferenceFromPermissionSetRequest>,
  output: __S(
    752,
    __c94,
    0,
  ) as any as S.Schema<DetachCustomerManagedPolicyReferenceFromPermissionSetResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<DetachManagedPolicyFromPermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<DetachManagedPolicyFromPermissionSetResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<GetApplicationAccessScopeRequest>,
  output: __S(384, __c48, 0) as any as S.Schema<GetApplicationAccessScopeResponse>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<GetApplicationAssignmentConfigurationRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<GetApplicationAssignmentConfigurationResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<GetApplicationAuthenticationMethodRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<GetApplicationAuthenticationMethodResponse>,
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
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<GetApplicationGrantRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<GetApplicationGrantResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<GetApplicationSessionConfigurationRequest>,
  output: __S(433, __c54, 1) as any as S.Schema<GetApplicationSessionConfigurationResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<GetInlinePolicyForPermissionSetRequest>,
  output: __S(441, __c55, 1) as any as S.Schema<GetInlinePolicyForPermissionSetResponse>,
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
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<GetPermissionsBoundaryForPermissionSetRequest>,
  output: __S(449, __c56, 1) as any as S.Schema<GetPermissionsBoundaryForPermissionSetResponse>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<ListAccountAssignmentCreationStatusRequest>,
  output: __S(465, __c58, 1) as any as S.Schema<ListAccountAssignmentCreationStatusResponse>,
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
  input: __S(480, __c60, 0) as any as S.Schema<ListAccountAssignmentDeletionStatusRequest>,
  output: __S(481, __c60, 1) as any as S.Schema<ListAccountAssignmentDeletionStatusResponse>,
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
  input: __S(488, __c61, 0) as any as S.Schema<ListAccountAssignmentsRequest>,
  output: __S(491, __c61, 3) as any as S.Schema<ListAccountAssignmentsResponse>,
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
  input: __S(497, __c62, 1) as any as S.Schema<ListAccountAssignmentsForPrincipalRequest>,
  output: __S(500, __c62, 4) as any as S.Schema<ListAccountAssignmentsForPrincipalResponse>,
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
  input: __S(504, __c63, 0) as any as S.Schema<ListAccountsForProvisionedPermissionSetRequest>,
  output: __S(505, __c63, 1) as any as S.Schema<ListAccountsForProvisionedPermissionSetResponse>,
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
  input: __S(512, __c64, 0) as any as S.Schema<ListApplicationAccessScopesRequest>,
  output: __S(514, __c64, 2) as any as S.Schema<ListApplicationAccessScopesResponse>,
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
  input: __S(520, __c65, 0) as any as S.Schema<ListApplicationAssignmentsRequest>,
  output: __S(523, __c65, 3) as any as S.Schema<ListApplicationAssignmentsResponse>,
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
  input: __S(529, __c66, 1) as any as S.Schema<ListApplicationAssignmentsForPrincipalRequest>,
  output: __S(532, __c66, 4) as any as S.Schema<ListApplicationAssignmentsForPrincipalResponse>,
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
  input: __S(536, __c67, 0) as any as S.Schema<ListApplicationAuthenticationMethodsRequest>,
  output: __S(539, __c67, 3) as any as S.Schema<ListApplicationAuthenticationMethodsResponse>,
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
  input: __S(544, __c68, 0) as any as S.Schema<ListApplicationGrantsRequest>,
  output: __S(547, __c68, 3) as any as S.Schema<ListApplicationGrantsResponse>,
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
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Grants" } as const,
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
  input: __S(552, __c69, 0) as any as S.Schema<ListApplicationProvidersRequest>,
  output: __S(554, __c69, 2) as any as S.Schema<ListApplicationProvidersResponse>,
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
  input: __S(561, __c70, 1) as any as S.Schema<ListApplicationsRequest>,
  output: __S(563, __c70, 3) as any as S.Schema<ListApplicationsResponse>,
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
  input: __S(
    568,
    __c71,
    0,
  ) as any as S.Schema<ListCustomerManagedPolicyReferencesInPermissionSetRequest>,
  output: __S(
    570,
    __c71,
    2,
  ) as any as S.Schema<ListCustomerManagedPolicyReferencesInPermissionSetResponse>,
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
  input: __S(576, __c72, 0) as any as S.Schema<ListInstancesRequest>,
  output: __S(579, __c72, 3) as any as S.Schema<ListInstancesResponse>,
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
  input: __S(584, __c73, 0) as any as S.Schema<ListManagedPoliciesInPermissionSetRequest>,
  output: __S(587, __c73, 3) as any as S.Schema<ListManagedPoliciesInPermissionSetResponse>,
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
  input: __S(592, __c74, 0) as any as S.Schema<ListPermissionSetProvisioningStatusRequest>,
  output: __S(593, __c74, 1) as any as S.Schema<ListPermissionSetProvisioningStatusResponse>,
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
  input: __S(600, __c75, 0) as any as S.Schema<ListPermissionSetsRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<ListPermissionSetsResponse>,
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
  input: __S(608, __c76, 0) as any as S.Schema<ListPermissionSetsProvisionedToAccountRequest>,
  output: __S(609, __c76, 1) as any as S.Schema<ListPermissionSetsProvisionedToAccountResponse>,
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
  input: __S(616, __c77, 0) as any as S.Schema<ListRegionsRequest>,
  output: __S(617, __c77, 1) as any as S.Schema<ListRegionsResponse>,
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
  input: __S(624, __c78, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(625, __c78, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Tags" } as const,
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
  input: __S(632, __c79, 0) as any as S.Schema<ListTrustedTokenIssuersRequest>,
  output: __S(635, __c79, 3) as any as S.Schema<ListTrustedTokenIssuersResponse>,
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
  input: __S(656, __c82, 0) as any as S.Schema<ProvisionPermissionSetRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<ProvisionPermissionSetResponse>,
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
}));

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
  input: __S(664, __c83, 0) as any as S.Schema<PutApplicationAccessScopeRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutApplicationAccessScopeResponse>,
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
}));

export type PutApplicationAssignmentConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Configure how users gain access to an application. If `AssignmentsRequired` is `true` (default value), users don't have access to the application unless an assignment is created using the CreateApplicationAssignment API. If `false`, all users have access to the application. If an assignment is created using CreateApplicationAssignment., the user retains access if `AssignmentsRequired` is set to `true`.
 */
export const putApplicationAssignmentConfiguration: API.OperationMethod<
  PutApplicationAssignmentConfigurationRequest,
  PutApplicationAssignmentConfigurationResponse,
  PutApplicationAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<PutApplicationAssignmentConfigurationRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutApplicationAssignmentConfigurationResponse>,
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
}));

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
  input: __S(680, __c85, 0) as any as S.Schema<PutApplicationAuthenticationMethodRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutApplicationAuthenticationMethodResponse>,
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
}));

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
 * - **Exchange token** - A grant that requests tokens from the authorization server by providing a 'subject' token with access scope authorizing trusted identity propagation to this application. To learn more, see RFC 8693.
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
  input: __S(688, __c86, 0) as any as S.Schema<PutApplicationGrantRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutApplicationGrantResponse>,
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
}));

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
  input: __S(696, __c87, 0) as any as S.Schema<PutApplicationSessionConfigurationRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutApplicationSessionConfigurationResponse>,
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
}));

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
  input: __S(704, __c88, 0) as any as S.Schema<PutInlinePolicyToPermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutInlinePolicyToPermissionSetResponse>,
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
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<PutPermissionsBoundaryToPermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<PutPermissionsBoundaryToPermissionSetResponse>,
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
}));

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
  input: __S(720, __c90, 0) as any as S.Schema<RemoveRegionRequest>,
  output: __S(648, __c81, 0) as any as S.Schema<RemoveRegionResponse>,
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
}));

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
  input: __S(728, __c91, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(769, __c96, 1) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<UpdateApplicationResponse>,
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
}));

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
  input: __S(777, __c97, 1) as any as S.Schema<UpdateInstanceRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<UpdateInstanceResponse>,
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
}));

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
  input: __S(
    784,
    __c98,
    0,
  ) as any as S.Schema<UpdateInstanceAccessControlAttributeConfigurationRequest>,
  output: __S(
    752,
    __c94,
    0,
  ) as any as S.Schema<UpdateInstanceAccessControlAttributeConfigurationResponse>,
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
}));

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
  input: __S(792, __c99, 0) as any as S.Schema<UpdatePermissionSetRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<UpdatePermissionSetResponse>,
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
}));

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
  input: __S(802, __c100, 2) as any as S.Schema<UpdateTrustedTokenIssuerRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<UpdateTrustedTokenIssuerResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          TargetId: S.String,
          TargetType: S.String,
          PermissionSetArn: S.String,
          PrincipalType: S.String,
          PrincipalId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccountAssignmentRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          RequestId: S.optional(S.String),
          FailureReason: S.optional(S.String),
          TargetId: S.optional(S.String),
          TargetType: S.optional(S.String),
          PermissionSetArn: S.optional(S.String),
          PrincipalType: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AccountAssignmentOperationStatus" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountAssignmentCreationStatus: S.optional(__S(8, __c1, 0)) }),
      ).annotate({ identifier: "CreateAccountAssignmentResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          ApplicationProviderArn: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          PortalOptions: S.optional(__S(40, __c5, 0)),
          Tags: S.optional(__S(33, __c4, 1)),
          Status: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.optional(S.String),
          InstanceArn: S.optional(S.String),
          IdentityStoreArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(32, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SignInOptions: S.optional(__S(48, __c6, 0)), Visibility: S.optional(S.String) }),
      ).annotate({ identifier: "PortalOptions" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Origin: S.String, ApplicationUrl: S.optional(S.String) }),
      ).annotate({ identifier: "SignInOptions" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, PrincipalId: S.String, PrincipalType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateApplicationAssignmentRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(33, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInstanceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ InstanceArn: S.optional(S.String) })).annotate({
        identifier: "CreateInstanceResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          InstanceAccessControlAttributeConfiguration: __S(91, __c11, 3),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInstanceAccessControlAttributeConfigurationRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Source: __S(80, __c10, 0) })).annotate({
        identifier: "AccessControlAttributeValue",
      });
    case 1:
      return S.suspend(() => S.Struct({ Key: S.String, Value: __S(88, __c11, 0) })).annotate({
        identifier: "AccessControlAttribute",
      });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() => S.Struct({ AccessControlAttributes: __S(90, __c11, 2) })).annotate({
        identifier: "InstanceAccessControlAttributeConfiguration",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          InstanceArn: S.String,
          SessionDuration: S.optional(S.String),
          RelayState: S.optional(S.String),
          Tags: S.optional(__S(33, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePermissionSetRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          PermissionSetArn: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SessionDuration: S.optional(S.String),
          RelayState: S.optional(S.String),
        }),
      ).annotate({ identifier: "PermissionSet" });
    case 1:
      return S.suspend(() => S.Struct({ PermissionSet: S.optional(__S(104, __c13, 0)) })).annotate({
        identifier: "CreatePermissionSetResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          Name: S.String,
          TrustedTokenIssuerType: S.String,
          TrustedTokenIssuerConfiguration: __S(121, __c15, 1),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(33, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTrustedTokenIssuerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TrustedTokenIssuerArn: S.optional(S.String) })).annotate({
        identifier: "CreateTrustedTokenIssuerResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IssuerUrl: S.String,
          ClaimAttributePath: S.String,
          IdentityStoreAttributePath: S.String,
          JwksRetrievalOption: S.String,
        }),
      ).annotate({ identifier: "OidcJwtConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ OidcJwtConfiguration: __S(120, __c15, 0) })]);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          TargetId: S.String,
          TargetType: S.String,
          PermissionSetArn: S.String,
          PrincipalType: S.String,
          PrincipalId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAccountAssignmentRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountAssignmentDeletionStatus: S.optional(__S(8, __c1, 0)) }),
      ).annotate({ identifier: "DeleteAccountAssignmentResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, Scope: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationAccessScopeRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, PrincipalId: S.String, PrincipalType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationAssignmentRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, AuthenticationMethodType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationAuthenticationMethodRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, GrantType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationGrantRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInlinePolicyFromPermissionSetRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInstanceRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInstanceAccessControlAttributeConfigurationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePermissionsBoundaryFromPermissionSetRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePermissionSetRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrustedTokenIssuerArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTrustedTokenIssuerRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, AccountAssignmentCreationRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountAssignmentCreationStatusRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, AccountAssignmentDeletionRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountAssignmentDeletionStatusRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.optional(S.String),
          ApplicationProviderArn: S.optional(S.String),
          Name: S.optional(S.String),
          ApplicationAccount: S.optional(S.String),
          InstanceArn: S.optional(S.String),
          IdentityStoreArn: S.optional(S.String),
          Status: S.optional(S.String),
          PortalOptions: S.optional(__S(40, __c5, 0)),
          Description: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedFrom: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeApplicationResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, PrincipalId: S.String, PrincipalType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationAssignmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PrincipalType: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeApplicationAssignmentResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationProviderArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationProviderRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.optional(S.String),
          IconUrl: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "DisplayData" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LongDescription: S.optional(S.String), DetailedTitle: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceServerScopeDetails" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(281, __c35, 1).pipe(S.optional));
    case 3:
      return S.suspend(() => S.Struct({ Scopes: S.optional(__S(282, __c35, 2)) })).annotate({
        identifier: "ResourceServerConfig",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ApplicationProviderArn: S.String,
          FederationProtocol: S.optional(S.String),
          DisplayData: S.optional(__S(280, __c35, 0)),
          ResourceServerConfig: S.optional(__S(283, __c35, 3)),
        }),
      ).annotate({ identifier: "DescribeApplicationProviderResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyType: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          EncryptionStatus: S.optional(S.String),
          EncryptionStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "EncryptionConfigurationDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.optional(S.String),
          IdentityStoreId: S.optional(S.String),
          IdentityStoreArn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          Name: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          PrimaryRegion: S.optional(S.String),
          Regions: S.optional(__S(304, __c38, 0)),
          EncryptionConfigurationDetails: S.optional(__S(289, __c36, 1)),
          PermissionSetsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeInstanceResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegionName: S.optional(S.String),
          Status: S.optional(S.String),
          AddedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsPrimaryRegion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RegionMetadata" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(296, __c37, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeInstanceAccessControlAttributeConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          InstanceAccessControlAttributeConfiguration: S.optional(__S(91, __c11, 3)),
        }),
      ).annotate({ identifier: "DescribeInstanceAccessControlAttributeConfigurationResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePermissionSetRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, ProvisionPermissionSetRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePermissionSetProvisioningStatusRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          RequestId: S.optional(S.String),
          AccountId: S.optional(S.String),
          PermissionSetArn: S.optional(S.String),
          FailureReason: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PermissionSetProvisioningStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PermissionSetProvisioningStatus: S.optional(__S(336, __c42, 0)) }),
      ).annotate({ identifier: "DescribePermissionSetProvisioningStatusResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, RegionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRegionRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TrustedTokenIssuerArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTrustedTokenIssuerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustedTokenIssuerArn: S.optional(S.String),
          Name: S.optional(S.String),
          TrustedTokenIssuerType: S.optional(S.String),
          TrustedTokenIssuerConfiguration: S.optional(__S(121, __c15, 1)),
        }),
      ).annotate({ identifier: "DescribeTrustedTokenIssuerResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          CustomerManagedPolicyReference: __S(744, __c93, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachCustomerManagedPolicyReferenceFromPermissionSetRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          ManagedPolicyArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachManagedPolicyFromPermissionSetRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, Scope: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationAccessScopeRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Scope: S.String, AuthorizedTargets: S.optional(__S(80, __c10, 0)) }),
      ).annotate({ identifier: "GetApplicationAccessScopeResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationAssignmentConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AssignmentRequired: S.Boolean })).annotate({
        identifier: "GetApplicationAssignmentConfigurationResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, AuthenticationMethodType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationAuthenticationMethodRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuthenticationMethod: S.optional(__S(409, __c51, 1)) }),
      ).annotate({ identifier: "GetApplicationAuthenticationMethodResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ActorPolicy: S.Any })).annotate({
        identifier: "IamAuthenticationMethod",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Iam: __S(408, __c51, 0) })]);
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, GrantType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationGrantRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Grant: __S(428, __c53, 4) })).annotate({
        identifier: "GetApplicationGrantResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RedirectUris: S.optional(__S(80, __c10, 0)) })).annotate({
        identifier: "AuthorizationCodeGrant",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustedTokenIssuerArn: S.optional(S.String),
          AuthorizedAudiences: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "AuthorizedTokenIssuer" });
    case 2:
      return S.Array(__S(425, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AuthorizedTokenIssuers: S.optional(__S(426, __c53, 2)) }),
      ).annotate({ identifier: "JwtBearerGrant" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ AuthorizationCode: __S(424, __c53, 0) }),
        /*@__PURE__*/ S.Struct({ JwtBearer: __S(427, __c53, 3) }),
        /*@__PURE__*/ S.Struct({ RefreshToken: __S(752, __c94, 0) }),
        /*@__PURE__*/ S.Struct({ TokenExchange: __S(752, __c94, 0) }),
      ]);
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationSessionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ UserBackgroundSessionApplicationStatus: S.optional(S.String) }),
      ).annotate({ identifier: "GetApplicationSessionConfigurationResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInlinePolicyForPermissionSetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ InlinePolicy: S.optional(S.String) })).annotate({
        identifier: "GetInlinePolicyForPermissionSetResponse",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPermissionsBoundaryForPermissionSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PermissionsBoundary: S.optional(__S(456, __c57, 0)) }),
      ).annotate({ identifier: "GetPermissionsBoundaryForPermissionSetResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomerManagedPolicyReference: S.optional(__S(744, __c93, 0)),
          ManagedPolicyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "PermissionsBoundary" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filter: S.optional(__S(648, __c81, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountAssignmentCreationStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountAssignmentsCreationStatus: S.optional(__S(473, __c59, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccountAssignmentCreationStatusResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          RequestId: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AccountAssignmentOperationStatusMetadata" });
    case 1:
      return S.Array(__S(472, __c59, 0));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filter: S.optional(__S(648, __c81, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountAssignmentDeletionStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountAssignmentsDeletionStatus: S.optional(__S(473, __c59, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccountAssignmentDeletionStatusResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          AccountId: S.String,
          PermissionSetArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountAssignmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          PermissionSetArn: S.optional(S.String),
          PrincipalType: S.optional(S.String),
          PrincipalId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountAssignment" });
    case 2:
      return S.Array(__S(489, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountAssignments: S.optional(__S(490, __c61, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccountAssignmentsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AccountId: S.optional(S.String) })).annotate({
        identifier: "ListAccountAssignmentsFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PrincipalId: S.String,
          PrincipalType: S.String,
          Filter: S.optional(__S(496, __c62, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountAssignmentsForPrincipalRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          PermissionSetArn: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          PrincipalType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountAssignmentForPrincipal" });
    case 3:
      return S.Array(__S(498, __c62, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          AccountAssignments: S.optional(__S(499, __c62, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccountAssignmentsForPrincipalResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          ProvisioningStatus: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountsForProvisionedPermissionSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountIds: S.optional(__S(80, __c10, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountsForProvisionedPermissionSetResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationAccessScopesRequest" });
    case 1:
      return S.Array(__S(384, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Scopes: __S(513, __c64, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationAccessScopesResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationAssignmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, PrincipalId: S.String, PrincipalType: S.String }),
      ).annotate({ identifier: "ApplicationAssignment" });
    case 2:
      return S.Array(__S(521, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationAssignments: S.optional(__S(522, __c65, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationAssignmentsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ApplicationArn: S.optional(S.String) })).annotate({
        identifier: "ListApplicationAssignmentsFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PrincipalId: S.String,
          PrincipalType: S.String,
          Filter: S.optional(__S(528, __c66, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationAssignmentsForPrincipalRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.optional(S.String),
          PrincipalId: S.optional(S.String),
          PrincipalType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationAssignmentForPrincipal" });
    case 3:
      return S.Array(__S(530, __c66, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ApplicationAssignments: S.optional(__S(531, __c66, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationAssignmentsForPrincipalResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationAuthenticationMethodsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationMethodType: S.optional(S.String),
          AuthenticationMethod: S.optional(__S(409, __c51, 1)),
        }),
      ).annotate({ identifier: "AuthenticationMethodItem" });
    case 2:
      return S.Array(__S(537, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AuthenticationMethods: S.optional(__S(538, __c67, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationAuthenticationMethodsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationGrantsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ GrantType: S.String, Grant: __S(428, __c53, 4) })).annotate(
        { identifier: "GrantItem" },
      );
    case 2:
      return S.Array(__S(545, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Grants: __S(546, __c68, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationGrantsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationProvidersRequest" });
    case 1:
      return S.Array(__S(284, __c35, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationProviders: S.optional(__S(553, __c69, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationProvidersResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationAccount: S.optional(S.String),
          ApplicationProvider: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationsFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filter: S.optional(__S(560, __c70, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 2:
      return S.Array(__S(256, __c32, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ Applications: S.optional(__S(562, __c70, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCustomerManagedPolicyReferencesInPermissionSetRequest" });
    case 1:
      return S.Array(__S(744, __c93, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CustomerManagedPolicyReferences: S.optional(__S(569, __c71, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomerManagedPolicyReferencesInPermissionSetResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.optional(S.String),
          IdentityStoreId: S.optional(S.String),
          IdentityStoreArn: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          Name: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          PrimaryRegion: S.optional(S.String),
          Regions: S.optional(__S(304, __c38, 0)),
        }),
      ).annotate({ identifier: "InstanceMetadata" });
    case 2:
      return S.Array(__S(577, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Instances: S.optional(__S(578, __c72, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInstancesResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListManagedPoliciesInPermissionSetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "AttachedManagedPolicy" });
    case 2:
      return S.Array(__S(585, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AttachedManagedPolicies: S.optional(__S(586, __c73, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListManagedPoliciesInPermissionSetResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filter: S.optional(__S(648, __c81, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPermissionSetProvisioningStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PermissionSetsProvisioningStatus: S.optional(__S(473, __c59, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPermissionSetProvisioningStatusResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPermissionSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PermissionSets: S.optional(__S(80, __c10, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPermissionSetsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          AccountId: S.String,
          ProvisioningStatus: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPermissionSetsProvisionedToAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          PermissionSets: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "ListPermissionSetsProvisionedToAccountResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRegionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Regions: S.optional(__S(304, __c38, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegionsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.optional(S.String),
          ResourceArn: S.String,
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(33, __c4, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTrustedTokenIssuersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrustedTokenIssuerArn: S.optional(S.String),
          Name: S.optional(S.String),
          TrustedTokenIssuerType: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrustedTokenIssuerMetadata" });
    case 2:
      return S.Array(__S(633, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TrustedTokenIssuers: S.optional(__S(634, __c79, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTrustedTokenIssuersResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, RegionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddRegionRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "AddRegionResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          TargetId: S.optional(S.String),
          TargetType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ProvisionPermissionSetRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Scope: S.String,
          AuthorizedTargets: S.optional(__S(80, __c10, 0)),
          ApplicationArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutApplicationAccessScopeRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, AssignmentRequired: S.Boolean }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutApplicationAssignmentConfigurationRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.String,
          AuthenticationMethodType: S.String,
          AuthenticationMethod: __S(409, __c51, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutApplicationAuthenticationMethodRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationArn: S.String, GrantType: S.String, Grant: __S(428, __c53, 4) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutApplicationGrantRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.String,
          UserBackgroundSessionApplicationStatus: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutApplicationSessionConfigurationRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          InlinePolicy: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutInlinePolicyToPermissionSetRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          PermissionsBoundary: __S(456, __c57, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutPermissionsBoundaryToPermissionSetRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceArn: S.String, RegionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveRegionRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.optional(S.String),
          ResourceArn: S.String,
          Tags: __S(33, __c4, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          CustomerManagedPolicyReference: __S(744, __c93, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachCustomerManagedPolicyReferenceToPermissionSetRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Path: S.optional(S.String) })).annotate({
        identifier: "CustomerManagedPolicyReference",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AttachCustomerManagedPolicyReferenceToPermissionSetResponse",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.optional(S.String),
          ResourceArn: S.String,
          TagKeys: __S(80, __c10, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SignInOptions: S.optional(__S(48, __c6, 0)) })).annotate({
        identifier: "UpdateApplicationPortalOptions",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationArn: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          PortalOptions: S.optional(__S(768, __c96, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyType: S.String, KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceArn: S.String,
          EncryptionConfiguration: S.optional(__S(776, __c97, 0)),
          PermissionSetsEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateInstanceRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          InstanceAccessControlAttributeConfiguration: __S(91, __c11, 3),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateInstanceAccessControlAttributeConfigurationRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          Description: S.optional(S.String),
          SessionDuration: S.optional(S.String),
          RelayState: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePermissionSetRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClaimAttributePath: S.optional(S.String),
          IdentityStoreAttributePath: S.optional(S.String),
          JwksRetrievalOption: S.optional(S.String),
        }),
      ).annotate({ identifier: "OidcJwtUpdateConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ OidcJwtConfiguration: __S(800, __c100, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          TrustedTokenIssuerArn: S.String,
          Name: S.optional(S.String),
          TrustedTokenIssuerConfiguration: S.optional(__S(801, __c100, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTrustedTokenIssuerRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceArn: S.String,
          PermissionSetArn: S.String,
          ManagedPolicyArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachManagedPolicyToPermissionSetRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
