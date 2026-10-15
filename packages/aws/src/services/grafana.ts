import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "grafana",
  serviceShapeName: "AWSGrafanaControlPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "grafana" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-08-18");
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
              `https://grafana-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://grafana-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://grafana.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://grafana.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://grafana.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(201, __c25, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type WorkspaceId = string;
export type LicenseType = string;
export type GrafanaToken = string;
export interface AssociateLicenseRequest {
  workspaceId: string;
  licenseType: string;
  grafanaToken?: string;
}
export type AccountAccessType = string;
export type DataSourceType = string;
export type DataSourceTypesList = string[];
export type Description = string | redacted.Redacted<string>;
export type Endpoint = string;
export type GrafanaVersion = string;
export type WorkspaceName = string | redacted.Redacted<string>;
export type OrganizationRoleName = string | redacted.Redacted<string>;
export type NotificationDestinationType = string;
export type NotificationDestinationsList = string[];
export type OrganizationalUnit = string;
export type OrganizationalUnitList = string[];
export type PermissionType = string;
export type StackSetName = string;
export type WorkspaceStatus = string;
export type IamRoleArn = string | redacted.Redacted<string>;
export type AuthenticationProviderTypes = string;
export type AuthenticationProviders = string[];
export type SamlConfigurationStatus = string;
export interface AuthenticationSummary {
  providers: string[];
  samlConfigurationStatus?: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type SubnetId = string;
export type SubnetIds = string[];
export interface VpcConfiguration {
  securityGroupIds: string[];
  subnetIds: string[];
}
export type PrefixListId = string;
export type PrefixListIds = string[];
export type VpceId = string;
export type VpceIds = string[];
export interface NetworkAccessConfiguration {
  prefixListIds: string[];
  vpceIds: string[];
}
export type IPAddressType = string;
export type KmsKeyId = string;
export type DegradedWorkspaceReason = string;
export interface WorkspaceDescription {
  accountAccessType?: string;
  created: Date;
  dataSources: string[];
  description?: string | redacted.Redacted<string>;
  endpoint: string;
  grafanaVersion: string;
  id: string;
  modified: Date;
  name?: string | redacted.Redacted<string>;
  organizationRoleName?: string | redacted.Redacted<string>;
  notificationDestinations?: string[];
  organizationalUnits?: string[];
  permissionType?: string;
  stackSetName?: string;
  status: string;
  workspaceRoleArn?: string | redacted.Redacted<string>;
  licenseType?: string;
  freeTrialConsumed?: boolean;
  licenseExpiration?: Date;
  freeTrialExpiration?: Date;
  authentication: AuthenticationSummary;
  tags?: { [key: string]: string | undefined };
  vpcConfiguration?: VpcConfiguration;
  networkAccessControl?: NetworkAccessConfiguration;
  grafanaToken?: string;
  ipAddressType?: string;
  kmsKeyId?: string;
  degradedWorkspaceReason?: string;
}
export interface AssociateLicenseResponse {
  workspace: WorkspaceDescription;
}
export type ClientToken = string;
export type OverridableConfigurationJson = string;
export interface CreateWorkspaceRequest {
  accountAccessType: string;
  clientToken?: string;
  organizationRoleName?: string | redacted.Redacted<string>;
  permissionType: string;
  stackSetName?: string;
  workspaceDataSources?: string[];
  workspaceDescription?: string | redacted.Redacted<string>;
  workspaceName?: string | redacted.Redacted<string>;
  workspaceNotificationDestinations?: string[];
  workspaceOrganizationalUnits?: string[];
  workspaceRoleArn?: string | redacted.Redacted<string>;
  authenticationProviders: string[];
  tags?: { [key: string]: string | undefined };
  vpcConfiguration?: VpcConfiguration;
  configuration?: string;
  networkAccessControl?: NetworkAccessConfiguration;
  grafanaVersion?: string;
  ipAddressType?: string;
  kmsKeyId?: string;
}
export interface CreateWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export type ApiKeyName = string;
export interface CreateWorkspaceApiKeyRequest {
  keyName: string;
  keyRole: string;
  secondsToLive: number;
  workspaceId: string;
}
export type ApiKeyToken = string | redacted.Redacted<string>;
export interface CreateWorkspaceApiKeyResponse {
  keyName: string;
  key: string | redacted.Redacted<string>;
  workspaceId: string;
}
export type ServiceAccountName = string;
export type Role = string;
export interface CreateWorkspaceServiceAccountRequest {
  name: string;
  grafanaRole: string;
  workspaceId: string;
}
export interface CreateWorkspaceServiceAccountResponse {
  id: string;
  name: string;
  grafanaRole: string;
  workspaceId: string;
}
export type ServiceAccountTokenName = string;
export interface CreateWorkspaceServiceAccountTokenRequest {
  name: string;
  secondsToLive: number;
  serviceAccountId: string;
  workspaceId: string;
}
export type ServiceAccountTokenKey = string | redacted.Redacted<string>;
export interface ServiceAccountTokenSummaryWithKey {
  id: string;
  name: string;
  key: string | redacted.Redacted<string>;
}
export interface CreateWorkspaceServiceAccountTokenResponse {
  serviceAccountToken: ServiceAccountTokenSummaryWithKey;
  serviceAccountId: string;
  workspaceId: string;
}
export interface DeleteWorkspaceRequest {
  workspaceId: string;
}
export interface DeleteWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export interface DeleteWorkspaceApiKeyRequest {
  keyName: string;
  workspaceId: string;
}
export interface DeleteWorkspaceApiKeyResponse {
  keyName: string;
  workspaceId: string;
}
export interface DeleteWorkspaceServiceAccountRequest {
  serviceAccountId: string;
  workspaceId: string;
}
export interface DeleteWorkspaceServiceAccountResponse {
  serviceAccountId: string;
  workspaceId: string;
}
export interface DeleteWorkspaceServiceAccountTokenRequest {
  tokenId: string;
  serviceAccountId: string;
  workspaceId: string;
}
export interface DeleteWorkspaceServiceAccountTokenResponse {
  tokenId: string;
  serviceAccountId: string;
  workspaceId: string;
}
export interface DescribeWorkspaceRequest {
  workspaceId: string;
}
export interface DescribeWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export interface DescribeWorkspaceAuthenticationRequest {
  workspaceId: string;
}
export type IdpMetadataUrl = string;
export type IdpMetadata = { url: string; xml?: never } | { url?: never; xml: string };
export type AssertionAttribute = string;
export interface AssertionAttributes {
  name?: string;
  login?: string;
  email?: string;
  groups?: string;
  role?: string;
  org?: string;
}
export type RoleValue = string;
export type RoleValueList = string[];
export interface RoleValues {
  editor?: string[];
  admin?: string[];
}
export type AllowedOrganization = string;
export type AllowedOrganizations = string[];
export type LoginValidityDuration = number;
export interface SamlConfiguration {
  idpMetadata: IdpMetadata;
  assertionAttributes?: AssertionAttributes;
  roleValues?: RoleValues;
  allowedOrganizations?: string[];
  loginValidityDuration?: number;
}
export interface SamlAuthentication {
  status: string;
  configuration?: SamlConfiguration;
}
export type SSOClientId = string;
export interface AwsSsoAuthentication {
  ssoClientId?: string;
}
export interface AuthenticationDescription {
  providers: string[];
  saml?: SamlAuthentication;
  awsSso?: AwsSsoAuthentication;
}
export interface DescribeWorkspaceAuthenticationResponse {
  authentication: AuthenticationDescription;
}
export interface DescribeWorkspaceConfigurationRequest {
  workspaceId: string;
}
export interface DescribeWorkspaceConfigurationResponse {
  configuration: string;
  grafanaVersion?: string;
}
export interface DisassociateLicenseRequest {
  workspaceId: string;
  licenseType: string;
}
export interface DisassociateLicenseResponse {
  workspace: WorkspaceDescription;
}
export type PaginationToken = string;
export type UserType = string;
export type SsoId = string;
export interface ListPermissionsRequest {
  maxResults?: number;
  nextToken?: string;
  userType?: string;
  userId?: string;
  groupId?: string;
  workspaceId: string;
}
export interface User {
  id: string;
  type: string;
}
export interface PermissionEntry {
  user: User;
  role: string;
}
export type PermissionEntryList = PermissionEntry[];
export interface ListPermissionsResponse {
  nextToken?: string;
  permissions: PermissionEntry[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListVersionsRequest {
  maxResults?: number;
  nextToken?: string;
  workspaceId?: string;
}
export type GrafanaVersionList = string[];
export interface ListVersionsResponse {
  nextToken?: string;
  grafanaVersions?: string[];
}
export interface ListWorkspacesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface WorkspaceSummary {
  created: Date;
  description?: string | redacted.Redacted<string>;
  endpoint: string;
  grafanaVersion: string;
  id: string;
  modified: Date;
  name?: string | redacted.Redacted<string>;
  notificationDestinations?: string[];
  status: string;
  authentication: AuthenticationSummary;
  tags?: { [key: string]: string | undefined };
  licenseType?: string;
  grafanaToken?: string;
}
export type WorkspaceList = WorkspaceSummary[];
export interface ListWorkspacesResponse {
  workspaces: WorkspaceSummary[];
  nextToken?: string;
}
export interface ListWorkspaceServiceAccountsRequest {
  maxResults?: number;
  nextToken?: string;
  workspaceId: string;
}
export interface ServiceAccountSummary {
  id: string;
  name: string;
  isDisabled: string;
  grafanaRole: string;
}
export type ServiceAccountList = ServiceAccountSummary[];
export interface ListWorkspaceServiceAccountsResponse {
  nextToken?: string;
  serviceAccounts: ServiceAccountSummary[];
  workspaceId: string;
}
export interface ListWorkspaceServiceAccountTokensRequest {
  maxResults?: number;
  nextToken?: string;
  serviceAccountId: string;
  workspaceId: string;
}
export interface ServiceAccountTokenSummary {
  id: string;
  name: string;
  createdAt: Date;
  expiresAt: Date;
  lastUsedAt?: Date;
}
export type ServiceAccountTokenList = ServiceAccountTokenSummary[];
export interface ListWorkspaceServiceAccountTokensResponse {
  nextToken?: string;
  serviceAccountTokens: ServiceAccountTokenSummary[];
  serviceAccountId: string;
  workspaceId: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type UpdateAction = string;
export type UserList = User[];
export interface UpdateInstruction {
  action: string;
  role: string;
  users: User[];
}
export type UpdateInstructionBatch = UpdateInstruction[];
export interface UpdatePermissionsRequest {
  updateInstructionBatch: UpdateInstruction[];
  workspaceId: string;
}
export interface UpdateError {
  code: number;
  message: string;
  causedBy: UpdateInstruction;
}
export type UpdateErrorList = UpdateError[];
export interface UpdatePermissionsResponse {
  errors: UpdateError[];
}
export interface UpdateWorkspaceRequest {
  accountAccessType?: string;
  organizationRoleName?: string | redacted.Redacted<string>;
  permissionType?: string;
  stackSetName?: string;
  workspaceDataSources?: string[];
  workspaceDescription?: string | redacted.Redacted<string>;
  workspaceId: string;
  workspaceName?: string | redacted.Redacted<string>;
  workspaceNotificationDestinations?: string[];
  workspaceOrganizationalUnits?: string[];
  workspaceRoleArn?: string | redacted.Redacted<string>;
  vpcConfiguration?: VpcConfiguration;
  removeVpcConfiguration?: boolean;
  networkAccessControl?: NetworkAccessConfiguration;
  removeNetworkAccessConfiguration?: boolean;
  ipAddressType?: string;
}
export interface UpdateWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export interface UpdateWorkspaceAuthenticationRequest {
  workspaceId: string;
  authenticationProviders: string[];
  samlConfiguration?: SamlConfiguration;
}
export interface UpdateWorkspaceAuthenticationResponse {
  authentication: AuthenticationDescription;
}
export interface UpdateWorkspaceConfigurationRequest {
  configuration: string;
  workspaceId: string;
  grafanaVersion?: string;
}
export interface UpdateWorkspaceConfigurationResponse {}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateLicenseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns a Grafana Enterprise license to a workspace. To upgrade, you must use `ENTERPRISE` for the `licenseType`, and pass in a valid Grafana Labs token for the `grafanaToken`. Upgrading to Grafana Enterprise incurs additional fees. For more information, see Upgrade a workspace to Grafana Enterprise.
 */
export const associateLicense: API.OperationMethod<
  AssociateLicenseRequest,
  AssociateLicenseResponse,
  AssociateLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<AssociateLicenseRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<AssociateLicenseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLicense",
}));

export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a *workspace*. In a workspace, you can create Grafana dashboards and visualizations to analyze your metrics, logs, and traces. You don't have to build, package, or deploy any hardware to run the Grafana server.
 *
 * Don't use `CreateWorkspace` to modify an existing workspace. Instead, use UpdateWorkspace.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<CreateWorkspaceRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<CreateWorkspaceResponse>,
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
  operationName: "CreateWorkspace",
}));

export type CreateWorkspaceApiKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Grafana API key for the workspace. This key can be used to authenticate requests sent to the workspace's HTTP API. See https://docs.aws.amazon.com/grafana/latest/userguide/Using-Grafana-APIs.html for available APIs and example requests.
 *
 * In workspaces compatible with Grafana version 9 or above, use workspace service accounts instead of API keys. API keys will be removed in a future release.
 */
export const createWorkspaceApiKey: API.OperationMethod<
  CreateWorkspaceApiKeyRequest,
  CreateWorkspaceApiKeyResponse,
  CreateWorkspaceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<CreateWorkspaceApiKeyRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<CreateWorkspaceApiKeyResponse>,
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
  operationName: "CreateWorkspaceApiKey",
}));

export type CreateWorkspaceServiceAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service account for the workspace. A service account can be used to call Grafana HTTP APIs, and run automated workloads. After creating the service account with the correct `GrafanaRole` for your use case, use `CreateWorkspaceServiceAccountToken` to create a token that can be used to authenticate and authorize Grafana HTTP API calls.
 *
 * You can only create service accounts for workspaces that are compatible with Grafana version 9 and above.
 *
 * For more information about service accounts, see Service accounts in the *Amazon Managed Grafana User Guide*.
 *
 * For more information about the Grafana HTTP APIs, see Using Grafana HTTP APIs in the *Amazon Managed Grafana User Guide*.
 */
export const createWorkspaceServiceAccount: API.OperationMethod<
  CreateWorkspaceServiceAccountRequest,
  CreateWorkspaceServiceAccountResponse,
  CreateWorkspaceServiceAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateWorkspaceServiceAccountRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateWorkspaceServiceAccountResponse>,
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
  operationName: "CreateWorkspaceServiceAccount",
}));

export type CreateWorkspaceServiceAccountTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a token that can be used to authenticate and authorize Grafana HTTP API operations for the given workspace service account. The service account acts as a user for the API operations, and defines the permissions that are used by the API.
 *
 * When you create the service account token, you will receive a key that is used when calling Grafana APIs. Do not lose this key, as it will not be retrievable again.
 *
 * If you do lose the key, you can delete the token and recreate it to receive a new key. This will disable the initial key.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const createWorkspaceServiceAccountToken: API.OperationMethod<
  CreateWorkspaceServiceAccountTokenRequest,
  CreateWorkspaceServiceAccountTokenResponse,
  CreateWorkspaceServiceAccountTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<CreateWorkspaceServiceAccountTokenRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<CreateWorkspaceServiceAccountTokenResponse>,
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
  operationName: "CreateWorkspaceServiceAccountToken",
}));

export type DeleteWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Managed Grafana workspace.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DeleteWorkspaceRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<DeleteWorkspaceResponse>,
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
  operationName: "DeleteWorkspace",
}));

export type DeleteWorkspaceApiKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Grafana API key for the workspace.
 *
 * In workspaces compatible with Grafana version 9 or above, use workspace service accounts instead of API keys. API keys will be removed in a future release.
 */
export const deleteWorkspaceApiKey: API.OperationMethod<
  DeleteWorkspaceApiKeyRequest,
  DeleteWorkspaceApiKeyResponse,
  DeleteWorkspaceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DeleteWorkspaceApiKeyRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<DeleteWorkspaceApiKeyResponse>,
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
  operationName: "DeleteWorkspaceApiKey",
}));

export type DeleteWorkspaceServiceAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workspace service account from the workspace.
 *
 * This will delete any tokens created for the service account, as well. If the tokens are currently in use, the will fail to authenticate / authorize after they are deleted.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const deleteWorkspaceServiceAccount: API.OperationMethod<
  DeleteWorkspaceServiceAccountRequest,
  DeleteWorkspaceServiceAccountResponse,
  DeleteWorkspaceServiceAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteWorkspaceServiceAccountRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<DeleteWorkspaceServiceAccountResponse>,
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
  operationName: "DeleteWorkspaceServiceAccount",
}));

export type DeleteWorkspaceServiceAccountTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a token for the workspace service account.
 *
 * This will disable the key associated with the token. If any automation is currently using the key, it will no longer be authenticated or authorized to perform actions with the Grafana HTTP APIs.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const deleteWorkspaceServiceAccountToken: API.OperationMethod<
  DeleteWorkspaceServiceAccountTokenRequest,
  DeleteWorkspaceServiceAccountTokenResponse,
  DeleteWorkspaceServiceAccountTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteWorkspaceServiceAccountTokenRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<DeleteWorkspaceServiceAccountTokenResponse>,
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
  operationName: "DeleteWorkspaceServiceAccountToken",
}));

export type DescribeWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about one Amazon Managed Grafana workspace.
 */
export const describeWorkspace: API.OperationMethod<
  DescribeWorkspaceRequest,
  DescribeWorkspaceResponse,
  DescribeWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DescribeWorkspaceRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<DescribeWorkspaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspace",
}));

export type DescribeWorkspaceAuthenticationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays information about the authentication methods used in one Amazon Managed Grafana workspace.
 */
export const describeWorkspaceAuthentication: API.OperationMethod<
  DescribeWorkspaceAuthenticationRequest,
  DescribeWorkspaceAuthenticationResponse,
  DescribeWorkspaceAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DescribeWorkspaceAuthenticationRequest>,
  output: __S(71, __c8, 7) as any as S.Schema<DescribeWorkspaceAuthenticationResponse>,
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
  operationName: "DescribeWorkspaceAuthentication",
}));

export type DescribeWorkspaceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the current configuration string for the given workspace.
 */
export const describeWorkspaceConfiguration: API.OperationMethod<
  DescribeWorkspaceConfigurationRequest,
  DescribeWorkspaceConfigurationResponse,
  DescribeWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DescribeWorkspaceConfigurationRequest>,
  output: __S(73, __c9, 1) as any as S.Schema<DescribeWorkspaceConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceConfiguration",
}));

export type DisassociateLicenseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the Grafana Enterprise license from a workspace.
 */
export const disassociateLicense: API.OperationMethod<
  DisassociateLicenseRequest,
  DisassociateLicenseResponse,
  DisassociateLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DisassociateLicenseRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<DisassociateLicenseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLicense",
}));

export type ListPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the users and groups who have the Grafana `Admin` and `Editor` roles in this workspace. If you use this operation without specifying `userId` or `groupId`, the operation returns the roles of all users and groups. If you specify a `userId` or a `groupId`, only the roles for that user or group are returned. If you do this, you can specify only one `userId` or one `groupId`.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  PermissionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<ListPermissionsRequest>,
  output: __S(91, __c11, 3) as any as S.Schema<ListPermissionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissions",
    pageSize: "maxResults",
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
 * The `ListTagsForResource` operation returns the tags that are associated with the Amazon Managed Service for Grafana resource specified by the `resourceArn`. Currently, the only resource that can be tagged is a workspace.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type ListVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists available versions of Grafana. These are available when calling `CreateWorkspace`. Optionally, include a workspace to list the versions to which it can be upgraded.
 */
export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient,
  GrafanaVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<ListVersionsRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<ListVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "grafanaVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of Amazon Managed Grafana workspaces in the account, with some information about each workspace. For more complete information about one workspace, use DescribeWorkspace.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<ListWorkspacesRequest>,
  output: __S(123, __c15, 3) as any as S.Schema<ListWorkspacesResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workspaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspaceServiceAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of service accounts for a workspace.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const listWorkspaceServiceAccounts: API.PaginatedOperationMethod<
  ListWorkspaceServiceAccountsRequest,
  ListWorkspaceServiceAccountsResponse,
  ListWorkspaceServiceAccountsError,
  Credentials | HttpClient.HttpClient,
  ServiceAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<ListWorkspaceServiceAccountsRequest>,
  output: __S(131, __c16, 3) as any as S.Schema<ListWorkspaceServiceAccountsResponse>,
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
  operationName: "ListWorkspaceServiceAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkspaceServiceAccountTokensError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tokens for a workspace service account.
 *
 * This does not return the key for each token. You cannot access keys after they are created. To create a new key, delete the token and recreate it.
 *
 * Service accounts are only available for workspaces that are compatible with Grafana version 9 and above.
 */
export const listWorkspaceServiceAccountTokens: API.PaginatedOperationMethod<
  ListWorkspaceServiceAccountTokensRequest,
  ListWorkspaceServiceAccountTokensResponse,
  ListWorkspaceServiceAccountTokensError,
  Credentials | HttpClient.HttpClient,
  ServiceAccountTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<ListWorkspaceServiceAccountTokensRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<ListWorkspaceServiceAccountTokensResponse>,
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
  operationName: "ListWorkspaceServiceAccountTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceAccountTokens",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `TagResource` operation associates tags with an Amazon Managed Grafana resource. Currently, the only resource that can be tagged is workspaces.
 *
 * If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `UntagResource` operation removes the association of the tag with the Amazon Managed Grafana resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates which users in a workspace have the Grafana `Admin` or `Editor` roles.
 */
export const updatePermissions: API.OperationMethod<
  UpdatePermissionsRequest,
  UpdatePermissionsResponse,
  UpdatePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(171, __c21, 3) as any as S.Schema<UpdatePermissionsRequest>,
  output: __S(174, __c21, 6) as any as S.Schema<UpdatePermissionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePermissions",
}));

export type UpdateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing Amazon Managed Grafana workspace. If you use this operation and omit any optional parameters, the existing values of those parameters are not changed.
 *
 * To modify the user authentication methods that the workspace uses, such as SAML or IAM Identity Center, use UpdateWorkspaceAuthentication.
 *
 * To modify which users in the workspace have the `Admin` and `Editor` Grafana roles, use UpdatePermissions.
 */
export const updateWorkspace: API.OperationMethod<
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  UpdateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<UpdateWorkspaceRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<UpdateWorkspaceResponse>,
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
  operationName: "UpdateWorkspace",
}));

export type UpdateWorkspaceAuthenticationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to define the identity provider (IdP) that this workspace authenticates users from, using SAML. You can also map SAML assertion attributes to workspace user information and define which groups in the assertion attribute are to have the `Admin` and `Editor` roles in the workspace.
 *
 * Changes to the authentication method for a workspace may take a few minutes to take effect.
 */
export const updateWorkspaceAuthentication: API.OperationMethod<
  UpdateWorkspaceAuthenticationRequest,
  UpdateWorkspaceAuthenticationResponse,
  UpdateWorkspaceAuthenticationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<UpdateWorkspaceAuthenticationRequest>,
  output: __S(71, __c8, 7) as any as S.Schema<UpdateWorkspaceAuthenticationResponse>,
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
  operationName: "UpdateWorkspaceAuthentication",
}));

export type UpdateWorkspaceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration string for the given workspace
 */
export const updateWorkspaceConfiguration: API.OperationMethod<
  UpdateWorkspaceConfigurationRequest,
  UpdateWorkspaceConfigurationResponse,
  UpdateWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<UpdateWorkspaceConfigurationRequest>,
  output: __S(152, __c19, 0) as any as S.Schema<UpdateWorkspaceConfigurationResponse>,
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
  operationName: "UpdateWorkspaceConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          grafanaRole: S.String,
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/serviceaccounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkspaceServiceAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, name: S.String, grafanaRole: S.String, workspaceId: S.String }),
      ).annotate({ identifier: "CreateWorkspaceServiceAccountResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          secondsToLive: S.Number,
          serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkspaceServiceAccountTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, name: S.String, key: SensitiveString }),
      ).annotate({ identifier: "ServiceAccountTokenSummaryWithKey" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          serviceAccountToken: __S(9, __c1, 1),
          serviceAccountId: S.String,
          workspaceId: S.String,
        }),
      ).annotate({ identifier: "CreateWorkspaceServiceAccountTokenResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkspaceRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          keyName: S.String.pipe(T.HttpLabel("keyName")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/apikeys/{keyName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkspaceApiKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ keyName: S.String, workspaceId: S.String })).annotate({
        identifier: "DeleteWorkspaceApiKeyResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkspaceServiceAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceAccountId: S.String, workspaceId: S.String }),
      ).annotate({ identifier: "DeleteWorkspaceServiceAccountResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tokenId: S.String.pipe(T.HttpLabel("tokenId")),
          serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens/{tokenId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkspaceServiceAccountTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tokenId: S.String, serviceAccountId: S.String, workspaceId: S.String }),
      ).annotate({ identifier: "DeleteWorkspaceServiceAccountTokenResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWorkspaceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/authentication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWorkspaceAuthenticationRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ url: S.String }),
        /*@__PURE__*/ S.Struct({ xml: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          login: S.optional(S.String),
          email: S.optional(S.String),
          groups: S.optional(S.String),
          role: S.optional(S.String),
          org: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssertionAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({ editor: S.optional(__S(216, __c27, 0)), admin: S.optional(__S(216, __c27, 0)) }),
      ).annotate({ identifier: "RoleValues" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          idpMetadata: __S(64, __c8, 0),
          assertionAttributes: S.optional(__S(65, __c8, 1)),
          roleValues: S.optional(__S(66, __c8, 2)),
          allowedOrganizations: S.optional(__S(216, __c27, 0)),
          loginValidityDuration: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SamlConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ status: S.String, configuration: S.optional(__S(67, __c8, 3)) }),
      ).annotate({ identifier: "SamlAuthentication" });
    case 5:
      return S.suspend(() => S.Struct({ ssoClientId: S.optional(S.String) })).annotate({
        identifier: "AwsSsoAuthentication",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          providers: __S(216, __c27, 0),
          saml: S.optional(__S(68, __c8, 4)),
          awsSso: S.optional(__S(69, __c8, 5)),
        }),
      ).annotate({ identifier: "AuthenticationDescription" });
    case 7:
      return S.suspend(() => S.Struct({ authentication: __S(70, __c8, 6) })).annotate({
        identifier: "DescribeWorkspaceAuthenticationResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWorkspaceConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ configuration: S.String, grafanaVersion: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeWorkspaceConfigurationResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          licenseType: S.String.pipe(T.HttpLabel("licenseType")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/licenses/{licenseType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateLicenseRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          userType: S.optional(S.String).pipe(T.HttpQuery("userType")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          groupId: S.optional(S.String).pipe(T.HttpQuery("groupId")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPermissionsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ user: __S(96, __c12, 0), role: S.String })).annotate({
        identifier: "PermissionEntry",
      });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), permissions: __S(90, __c11, 2) }),
      ).annotate({ identifier: "ListPermissionsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, type: S.String })).annotate({
        identifier: "User",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(224, __c28, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          workspaceId: S.optional(S.String).pipe(T.HttpQuery("workspace-id")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/versions" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          grafanaVersions: S.optional(__S(216, __c27, 0)),
        }),
      ).annotate({ identifier: "ListVersionsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/workspaces" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWorkspacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(SensitiveString),
          endpoint: S.String,
          grafanaVersion: S.String,
          id: S.String,
          modified: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          name: S.optional(SensitiveString),
          notificationDestinations: S.optional(__S(216, __c27, 0)),
          status: S.String,
          authentication: __S(232, __c29, 0),
          tags: S.optional(__S(224, __c28, 0)),
          licenseType: S.optional(S.String),
          grafanaToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkspaceSummary" });
    case 2:
      return S.Array(__S(121, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ workspaces: __S(122, __c15, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkspacesResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/serviceaccounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkspaceServiceAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, name: S.String, isDisabled: S.String, grafanaRole: S.String }),
      ).annotate({ identifier: "ServiceAccountSummary" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          serviceAccounts: __S(130, __c16, 2),
          workspaceId: S.String,
        }),
      ).annotate({ identifier: "ListWorkspaceServiceAccountsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          serviceAccountId: S.String.pipe(T.HttpLabel("serviceAccountId")),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkspaceServiceAccountTokensRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          expiresAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUsedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ServiceAccountTokenSummary" });
    case 2:
      return S.Array(__S(137, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          serviceAccountTokens: __S(138, __c17, 2),
          serviceAccountId: S.String,
          workspaceId: S.String,
        }),
      ).annotate({ identifier: "ListWorkspaceServiceAccountTokensResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(224, __c28, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(216, __c27, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(96, __c12, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ action: S.String, role: S.String, users: __S(168, __c21, 0) }),
      ).annotate({ identifier: "UpdateInstruction" });
    case 2:
      return S.Array(__S(169, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          updateInstructionBatch: __S(170, __c21, 2),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/workspaces/{workspaceId}/permissions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePermissionsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({ code: S.Number, message: S.String, causedBy: __S(169, __c21, 1) }),
      ).annotate({ identifier: "UpdateError" });
    case 5:
      return S.Array(__S(172, __c21, 4));
    case 6:
      return S.suspend(() => S.Struct({ errors: __S(173, __c21, 5) })).annotate({
        identifier: "UpdatePermissionsResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountAccessType: S.optional(S.String),
          organizationRoleName: S.optional(SensitiveString),
          permissionType: S.optional(S.String),
          stackSetName: S.optional(S.String),
          workspaceDataSources: S.optional(__S(216, __c27, 0)),
          workspaceDescription: S.optional(SensitiveString),
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          workspaceName: S.optional(SensitiveString),
          workspaceNotificationDestinations: S.optional(__S(216, __c27, 0)),
          workspaceOrganizationalUnits: S.optional(__S(216, __c27, 0)),
          workspaceRoleArn: S.optional(SensitiveString),
          vpcConfiguration: S.optional(__S(240, __c30, 0)),
          removeVpcConfiguration: S.optional(S.Boolean),
          networkAccessControl: S.optional(__S(241, __c30, 1)),
          removeNetworkAccessConfiguration: S.optional(S.Boolean),
          ipAddressType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkspaceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          authenticationProviders: __S(216, __c27, 0),
          samlConfiguration: S.optional(__S(67, __c8, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/authentication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkspaceAuthenticationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuration: S.String,
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          grafanaVersion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkspaceConfigurationRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(200, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          licenseType: S.String.pipe(T.HttpLabel("licenseType")),
          grafanaToken: S.optional(S.String).pipe(T.HttpHeader("Grafana-Token")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/licenses/{licenseType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateLicenseRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ providers: __S(216, __c27, 0), samlConfigurationStatus: S.optional(S.String) }),
      ).annotate({ identifier: "AuthenticationSummary" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ securityGroupIds: __S(216, __c27, 0), subnetIds: __S(216, __c27, 0) }),
      ).annotate({ identifier: "VpcConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ prefixListIds: __S(216, __c27, 0), vpceIds: __S(216, __c27, 0) }),
      ).annotate({ identifier: "NetworkAccessConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          accountAccessType: S.optional(S.String),
          created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          dataSources: __S(216, __c27, 0),
          description: S.optional(SensitiveString),
          endpoint: S.String,
          grafanaVersion: S.String,
          id: S.String,
          modified: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          name: S.optional(SensitiveString),
          organizationRoleName: S.optional(SensitiveString),
          notificationDestinations: S.optional(__S(216, __c27, 0)),
          organizationalUnits: S.optional(__S(216, __c27, 0)),
          permissionType: S.optional(S.String),
          stackSetName: S.optional(S.String),
          status: S.String,
          workspaceRoleArn: S.optional(SensitiveString),
          licenseType: S.optional(S.String),
          freeTrialConsumed: S.optional(S.Boolean),
          licenseExpiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          freeTrialExpiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          authentication: __S(232, __c29, 0),
          tags: S.optional(__S(224, __c28, 0)),
          vpcConfiguration: S.optional(__S(240, __c30, 0)),
          networkAccessControl: S.optional(__S(241, __c30, 1)),
          grafanaToken: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          degradedWorkspaceReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkspaceDescription" });
    case 3:
      return S.suspend(() => S.Struct({ workspace: __S(242, __c30, 2) })).annotate({
        identifier: "AssociateLicenseResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountAccessType: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          organizationRoleName: S.optional(SensitiveString),
          permissionType: S.String,
          stackSetName: S.optional(S.String),
          workspaceDataSources: S.optional(__S(216, __c27, 0)),
          workspaceDescription: S.optional(SensitiveString),
          workspaceName: S.optional(SensitiveString),
          workspaceNotificationDestinations: S.optional(__S(216, __c27, 0)),
          workspaceOrganizationalUnits: S.optional(__S(216, __c27, 0)),
          workspaceRoleArn: S.optional(SensitiveString),
          authenticationProviders: __S(216, __c27, 0),
          tags: S.optional(__S(224, __c28, 0)),
          vpcConfiguration: S.optional(__S(240, __c30, 0)),
          configuration: S.optional(S.String),
          networkAccessControl: S.optional(__S(241, __c30, 1)),
          grafanaVersion: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/workspaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWorkspaceRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          keyName: S.String,
          keyRole: S.String,
          secondsToLive: S.Number,
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/apikeys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkspaceApiKeyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ keyName: S.String, key: SensitiveString, workspaceId: S.String }),
      ).annotate({ identifier: "CreateWorkspaceApiKeyResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
