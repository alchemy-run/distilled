import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "grafana",
  target: "AWSGrafanaControlPlane",
  version: "2020-08-18",
  sigv4: "grafana",
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
                `https://grafana-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://grafana-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://grafana.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://grafana.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type IdpMetadata =
  | { url: string; xml?: never }
  | { url?: never; xml: string };
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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/licenses/{licenseType}",
    input: {
      workspaceId: 0,
      licenseType: 0,
      grafanaToken: D.m({ header: "Grafana-Token" }),
    },
    output: { workspace: o_WorkspaceDescription },
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
  operationName: "AssociateLicense",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces",
    input: {
      accountAccessType: 0,
      clientToken: D.m({ idempotency: true }),
      organizationRoleName: 0,
      permissionType: 0,
      stackSetName: 0,
      workspaceDataSources: 0,
      workspaceDescription: 0,
      workspaceName: 0,
      workspaceNotificationDestinations: 0,
      workspaceOrganizationalUnits: 0,
      workspaceRoleArn: 0,
      authenticationProviders: 0,
      tags: 0,
      vpcConfiguration: i_VpcConfiguration,
      configuration: 0,
      networkAccessControl: i_NetworkAccessConfiguration,
      grafanaVersion: 0,
      ipAddressType: 0,
      kmsKeyId: 0,
    },
    output: { workspace: o_WorkspaceDescription },
    body: true,
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
  operationName: "CreateWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/apikeys",
    input: { keyName: 0, keyRole: 0, secondsToLive: 0, workspaceId: 0 },
    output: { key: D.secret },
    body: true,
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
  operationName: "CreateWorkspaceApiKey",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/serviceaccounts",
    input: { name: 0, grafanaRole: 0, workspaceId: 0 },
    body: true,
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
  operationName: "CreateWorkspaceServiceAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens",
    input: { name: 0, secondsToLive: 0, serviceAccountId: 0, workspaceId: 0 },
    output: { serviceAccountToken: { key: D.secret } },
    body: true,
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
  operationName: "CreateWorkspaceServiceAccountToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}",
    input: { workspaceId: 0 },
    output: { workspace: o_WorkspaceDescription },
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
  operationName: "DeleteWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/apikeys/{keyName}",
    input: { keyName: 0, workspaceId: 0 },
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
  operationName: "DeleteWorkspaceApiKey",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}",
    input: { serviceAccountId: 0, workspaceId: 0 },
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
  operationName: "DeleteWorkspaceServiceAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens/{tokenId}",
    input: { tokenId: 0, serviceAccountId: 0, workspaceId: 0 },
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
  operationName: "DeleteWorkspaceServiceAccountToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}",
    input: { workspaceId: 0 },
    output: { workspace: o_WorkspaceDescription },
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
  operationName: "DescribeWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/authentication",
    input: { workspaceId: 0 },
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
  operationName: "DescribeWorkspaceAuthentication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/configuration",
    input: { workspaceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/licenses/{licenseType}",
    input: { workspaceId: 0, licenseType: 0 },
    output: { workspace: o_WorkspaceDescription },
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
  operationName: "DisassociateLicense",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/permissions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      userType: D.m({ query: "userType" }),
      userId: D.m({ query: "userId" }),
      groupId: D.m({ query: "groupId" }),
      workspaceId: 0,
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /versions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      workspaceId: D.m({ query: "workspace-id" }),
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
  descriptor: {
    service: svc,
    http: "GET /workspaces",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      workspaces: D.list({
        created: D.ts,
        description: D.secret,
        modified: D.ts,
        name: D.secret,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/serviceaccounts",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      workspaceId: 0,
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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/serviceaccounts/{serviceAccountId}/tokens",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      serviceAccountId: 0,
      workspaceId: 0,
    },
    output: {
      serviceAccountTokens: D.list({
        createdAt: D.ts,
        expiresAt: D.ts,
        lastUsedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
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
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /workspaces/{workspaceId}/permissions",
    input: {
      updateInstructionBatch: D.list({
        action: 0,
        role: 0,
        users: D.list({ id: 0, type: 0 }),
      }),
      workspaceId: 0,
    },
    body: true,
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
  operationName: "UpdatePermissions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}",
    input: {
      accountAccessType: 0,
      organizationRoleName: 0,
      permissionType: 0,
      stackSetName: 0,
      workspaceDataSources: 0,
      workspaceDescription: 0,
      workspaceId: 0,
      workspaceName: 0,
      workspaceNotificationDestinations: 0,
      workspaceOrganizationalUnits: 0,
      workspaceRoleArn: 0,
      vpcConfiguration: i_VpcConfiguration,
      removeVpcConfiguration: 0,
      networkAccessControl: i_NetworkAccessConfiguration,
      removeNetworkAccessConfiguration: 0,
      ipAddressType: 0,
    },
    output: { workspace: o_WorkspaceDescription },
    body: true,
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
  operationName: "UpdateWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/authentication",
    input: {
      workspaceId: 0,
      authenticationProviders: 0,
      samlConfiguration: {
        idpMetadata: { url: 0, xml: 0 },
        assertionAttributes: {
          name: 0,
          login: 0,
          email: 0,
          groups: 0,
          role: 0,
          org: 0,
        },
        roleValues: { editor: 0, admin: 0 },
        allowedOrganizations: 0,
        loginValidityDuration: 0,
      },
    },
    body: true,
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
  operationName: "UpdateWorkspaceAuthentication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/configuration",
    input: { configuration: 0, workspaceId: 0, grafanaVersion: 0 },
    body: true,
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
  operationName: "UpdateWorkspaceConfiguration",
})) as any;

const i_NetworkAccessConfiguration: D.LazyStruct = () => ({
  prefixListIds: 0,
  vpceIds: 0,
});
const i_VpcConfiguration: D.LazyStruct = () => ({
  securityGroupIds: 0,
  subnetIds: 0,
});
const o_WorkspaceDescription: D.LazyStruct = () => ({
  created: D.ts,
  description: D.secret,
  modified: D.ts,
  name: D.secret,
  organizationRoleName: D.secret,
  workspaceRoleArn: D.secret,
  licenseExpiration: D.ts,
  freeTrialExpiration: D.ts,
});
