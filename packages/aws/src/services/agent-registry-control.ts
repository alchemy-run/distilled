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
  sdkId: "Agent Registry Control",
  target: "AgentRegistryControl",
  version: "2025-12-01",
  sigv4: "agent-registry",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      return e(Endpoint);
    }
    if (Region != null) {
      return e(`https://agent-registry-control.${Region}.api.aws`);
    }
    return err(
      "Unable to resolve an Agent Registry Control endpoint: Region was not set and no explicit Endpoint override was provided.",
    );
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type RegistryName = string;
export type Description = string | redacted.Redacted<string>;
export type DiscoveryUrl = string;
export type AllowedAudience = string;
export type AllowedAudienceList = string[];
export type AllowedClient = string;
export type AllowedClientsList = string[];
export type AllowedScopeType = string;
export type AllowedScopesType = string[];
export type InboundTokenClaimNameType = string;
export type InboundTokenClaimValueType =
  | "STRING"
  | "STRING_ARRAY"
  | (string & {});
export type MatchValueString = string;
export type MatchValueStringList = string[];
export type ClaimMatchValueType =
  | { matchValueString: string; matchValueStringList?: never }
  | { matchValueString?: never; matchValueStringList: string[] };
export type ClaimMatchOperatorType =
  | "EQUALS"
  | "CONTAINS"
  | "CONTAINS_ANY"
  | (string & {});
export interface AuthorizingClaimMatchValueType {
  claimMatchValue: ClaimMatchValueType;
  claimMatchOperator: ClaimMatchOperatorType;
}
export interface CustomClaimValidationType {
  inboundTokenClaimName: string;
  inboundTokenClaimValueType: InboundTokenClaimValueType;
  authorizingClaimMatchValue: AuthorizingClaimMatchValueType;
}
export type CustomClaimValidationsType = CustomClaimValidationType[];
export type ResourceConfigurationIdentifier = string;
export type SelfManagedLatticeResource = {
  resourceConfigurationIdentifier: string;
};
export type VpcIdentifier = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type EndpointIpAddressType = "IPV4" | "IPV6" | (string & {});
export type SecurityGroupIdentifier = string;
export type SecurityGroupIds = string[];
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type RoutingDomain = string;
export interface ManagedVpcResource {
  vpcIdentifier: string;
  subnetIds: string[];
  endpointIpAddressType: EndpointIpAddressType;
  securityGroupIds?: string[];
  tags?: { [key: string]: string | undefined };
  routingDomain?: string;
}
export type PrivateEndpoint =
  | {
      selfManagedLatticeResource: SelfManagedLatticeResource;
      managedVpcResource?: never;
    }
  | {
      selfManagedLatticeResource?: never;
      managedVpcResource: ManagedVpcResource;
    };
export type PrivateEndpointOverrideDomain = string;
export interface PrivateEndpointOverride {
  domain: string;
  privateEndpoint: PrivateEndpoint;
}
export type PrivateEndpointOverrides = PrivateEndpointOverride[];
export interface CustomJWTAuthorizerConfiguration {
  discoveryUrl: string;
  allowedAudience?: string[];
  allowedClients?: string[];
  allowedScopes?: string[];
  customClaims?: CustomClaimValidationType[];
  privateEndpoint?: PrivateEndpoint;
  privateEndpointOverrides?: PrivateEndpointOverride[];
}
export type AuthorizerConfiguration = {
  customJWTAuthorizer: CustomJWTAuthorizerConfiguration;
};
export type RegistryAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export interface DiscoveryConfiguration {
  authorizerConfiguration?: AuthorizerConfiguration;
  authorizerType?: RegistryAuthorizerType;
}
export type ClientToken = string;
export type AutoApprovalRule = "APPROVE_ALL" | (string & {});
export type AutoApprovalRuleList = AutoApprovalRule[];
export interface ApprovalConfiguration {
  autoApprovalRules?: AutoApprovalRule[];
}
export interface CreateRegistryRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  discoveryConfiguration?: DiscoveryConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  approvalConfiguration?: ApprovalConfiguration;
}
export type RegistryArn = string;
export interface CreateRegistryResponse {
  registryArn: string;
}
export type RegistryIdentifier = string;
export type RegistryRecordName = string;
export type RegistryRecordDisplayName = string;
export type RecordType = "MCP" | "AGENT" | "CUSTOM" | "SKILL" | (string & {});
export type DescriptorData = string | redacted.Redacted<string>;
export type DataSchemaVersion = string;
export interface McpToolsDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
}
export interface McpServerAdditionalData {
  tools?: McpToolsDescriptor;
}
export type DescriptorSourceUrl = string;
export type RegistryRecordCredentialProviderType =
  | "OAUTH"
  | "IAM"
  | (string & {});
export type CredentialProviderArn = string;
export type RegistryRecordOAuthGrantType = "CLIENT_CREDENTIALS" | (string & {});
export type ScopeList = string[];
export type CustomParameterMap = { [key: string]: string | undefined };
export interface RegistryRecordOAuthCredentialProvider {
  providerArn: string;
  grantType?: RegistryRecordOAuthGrantType;
  scopes?: string[];
  customParameters?: { [key: string]: string | undefined };
}
export type IamRoleArn = string;
export type IamSigningServiceName = string;
export type IamSigningRegion = string;
export interface RegistryRecordIamCredentialProvider {
  roleArn?: string;
  service?: string;
  region?: string;
}
export type RegistryRecordCredentialProviderUnion =
  | {
      oauthCredentialProvider: RegistryRecordOAuthCredentialProvider;
      iamCredentialProvider?: never;
    }
  | {
      oauthCredentialProvider?: never;
      iamCredentialProvider: RegistryRecordIamCredentialProvider;
    };
export interface RegistryRecordCredentialProviderConfiguration {
  credentialProviderType: RegistryRecordCredentialProviderType;
  credentialProvider: RegistryRecordCredentialProviderUnion;
}
export type RegistryRecordCredentialProviderConfigurationList =
  RegistryRecordCredentialProviderConfiguration[];
export interface DescriptorSourceFromUrl {
  url: string;
  credentialProviderConfigurations?: RegistryRecordCredentialProviderConfiguration[];
}
export interface DescriptorSource {
  fromUrl?: DescriptorSourceFromUrl;
}
export interface McpServerDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: McpServerAdditionalData;
  source?: DescriptorSource;
}
export interface A2aAgentCardDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export interface AgentSkillsMdDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export interface AgentSkillsAdditionalData {
  skillMd?: AgentSkillsMdDescriptor;
}
export interface AgentSkillsDefinitionDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: AgentSkillsAdditionalData;
}
export interface CustomDescriptor {
  data?: string | redacted.Redacted<string>;
}
export interface Descriptors {
  mcpServer?: McpServerDescriptor;
  a2aAgentCard?: A2aAgentCardDescriptor;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor;
  custom?: CustomDescriptor;
}
export type RegistryRecordVersion = string;
export interface CreateRegistryRecordRequest {
  registryId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors: Descriptors;
  recordVersion?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type RegistryRecordArn = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | "CREATING"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export interface CreateRegistryRecordResponse {
  recordArn: string;
  status: RegistryRecordStatus;
}
export interface DeleteRegistryRequest {
  registryId: string;
}
export type RegistryStatus =
  | "CREATING"
  | "READY"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export interface DeleteRegistryResponse {
  status: RegistryStatus;
}
export type RecordIdentifier = string;
export interface DeleteRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export interface DeleteRegistryRecordResponse {}
export interface GetRegistryRequest {
  registryId: string;
}
export type RegistryId = string;
export interface GetRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export type RegistryRecordId = string;
export interface GetRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors?: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
}
export type MaxResults = number;
export type NextToken = string;
export type RegistryFilterName =
  | "status"
  | "discoveryConfiguration.authorizerType"
  | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export interface RegistryFilter {
  name: RegistryFilterName;
  values: string[];
}
export type RegistryFilterList = RegistryFilter[];
export interface ListRegistriesRequest {
  maxResults?: number;
  nextToken?: string;
  filters?: RegistryFilter[];
}
export interface RegistrySummary {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistrySummaryList = RegistrySummary[];
export interface ListRegistriesResponse {
  registries: RegistrySummary[];
  nextToken?: string;
}
export type RegistryRecordFilterName =
  | "name"
  | "status"
  | "recordType"
  | (string & {});
export interface RegistryRecordFilter {
  name: RegistryRecordFilterName;
  values: string[];
}
export type RegistryRecordFilterList = RegistryRecordFilter[];
export interface ListRegistryRecordsRequest {
  registryId: string;
  maxResults?: number;
  nextToken?: string;
  filters?: RegistryRecordFilter[];
}
export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export interface ListRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type ResourceTagsMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface SubmitRegistryRecordForApprovalRequest {
  registryId: string;
  recordId: string;
}
export interface SubmitRegistryRecordForApprovalResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  status: RegistryRecordStatus;
  updatedAt: Date;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdatedDescription {
  optionalValue?: string | redacted.Redacted<string>;
}
export interface UpdatedAuthorizerConfiguration {
  optionalValue?: AuthorizerConfiguration;
}
export interface UpdatedDiscoveryConfiguration {
  authorizerConfiguration?: UpdatedAuthorizerConfiguration;
}
export interface UpdatedApprovalConfiguration {
  optionalValue?: ApprovalConfiguration;
}
export interface UpdateRegistryRequest {
  registryId: string;
  name?: string;
  description?: UpdatedDescription;
  discoveryConfiguration?: UpdatedDiscoveryConfiguration;
  approvalConfiguration?: UpdatedApprovalConfiguration;
}
export interface UpdateRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdatedDisplayName {
  optionalValue?: string;
}
export interface UpdatedDescriptorData {
  optionalValue?: string | redacted.Redacted<string>;
}
export interface UpdatedDataSchemaVersion {
  optionalValue?: string;
}
export interface UpdatedDescriptorSource {
  optionalValue?: DescriptorSource;
}
export interface UpdatedMcpToolsDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
}
export interface UpdatedMcpToolsDescriptor {
  optionalValue?: UpdatedMcpToolsDescriptorFields;
}
export interface UpdatedMcpServerAdditionalDataFields {
  tools?: UpdatedMcpToolsDescriptor;
}
export interface UpdatedMcpServerAdditionalData {
  optionalValue?: UpdatedMcpServerAdditionalDataFields;
}
export interface UpdatedMcpServerDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  source?: UpdatedDescriptorSource;
  additionalData?: UpdatedMcpServerAdditionalData;
}
export interface UpdatedMcpServerDescriptor {
  optionalValue?: UpdatedMcpServerDescriptorFields;
}
export interface UpdatedA2aAgentCardDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  source?: UpdatedDescriptorSource;
}
export interface UpdatedA2aAgentCardDescriptor {
  optionalValue?: UpdatedA2aAgentCardDescriptorFields;
}
export interface UpdatedAgentSkillsMdDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  source?: UpdatedDescriptorSource;
}
export interface UpdatedAgentSkillsMdDescriptor {
  optionalValue?: UpdatedAgentSkillsMdDescriptorFields;
}
export interface UpdatedAgentSkillsAdditionalDataFields {
  skillMd?: UpdatedAgentSkillsMdDescriptor;
}
export interface UpdatedAgentSkillsAdditionalData {
  optionalValue?: UpdatedAgentSkillsAdditionalDataFields;
}
export interface UpdatedAgentSkillsDefinitionDescriptorFields {
  data?: UpdatedDescriptorData;
  dataSchemaVersion?: UpdatedDataSchemaVersion;
  additionalData?: UpdatedAgentSkillsAdditionalData;
}
export interface UpdatedAgentSkillsDefinitionDescriptor {
  optionalValue?: UpdatedAgentSkillsDefinitionDescriptorFields;
}
export interface UpdatedCustomDescriptorFields {
  data?: UpdatedDescriptorData;
}
export interface UpdatedCustomDescriptor {
  optionalValue?: UpdatedCustomDescriptorFields;
}
export interface UpdatedDescriptorsFields {
  mcpServer?: UpdatedMcpServerDescriptor;
  a2aAgentCard?: UpdatedA2aAgentCardDescriptor;
  agentSkillsDefinition?: UpdatedAgentSkillsDefinitionDescriptor;
  custom?: UpdatedCustomDescriptor;
}
export interface UpdatedDescriptors {
  optionalValue?: UpdatedDescriptorsFields;
}
export interface UpdateRegistryRecordRequest {
  registryId: string;
  recordId: string;
  name?: string;
  displayName?: UpdatedDisplayName;
  description?: UpdatedDescription;
  recordType?: RecordType;
  descriptors?: UpdatedDescriptors;
  recordVersion?: string;
  triggerSynchronization?: boolean;
}
export interface UpdateRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors?: Descriptors;
  recordVersion?: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string;
}
export interface UpdateRegistryRecordStatusRequest {
  registryId: string;
  recordId: string;
  status: RegistryRecordStatus;
  statusReason: string;
}
export interface UpdateRegistryRecordStatusResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  status: RegistryRecordStatus;
  statusReason: string;
  updatedAt: Date;
}
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registry, a catalog that organizes registry records and defines their discovery authorization and record approval behavior. Creation is asynchronous: the registry begins in the CREATING status and becomes usable once it reaches READY.
 */
export const createRegistry: API.OperationMethod<
  CreateRegistryRequest,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries",
    input: {
      name: 0,
      description: 0,
      discoveryConfiguration: {
        authorizerConfiguration: i_AuthorizerConfiguration,
        authorizerType: 0,
      },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      approvalConfiguration: i_ApprovalConfiguration,
    },
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
  operationName: "CreateRegistry",
})) as any;

export type CreateRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a registry record within a registry. A registry record describes a discoverable resource, such as an MCP server, an agent, an agent skill, or a custom resource. Creation is asynchronous: the record is returned with the CREATING status while it is processed.
 */
export const createRegistryRecord: API.OperationMethod<
  CreateRegistryRecordRequest,
  CreateRegistryRecordResponse,
  CreateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries/{registryId}/records",
    input: {
      registryId: 0,
      name: 0,
      displayName: 0,
      description: 0,
      recordType: 0,
      descriptors: {
        mcpServer: {
          data: 0,
          dataSchemaVersion: 0,
          additionalData: { tools: { data: 0, dataSchemaVersion: 0 } },
          source: i_DescriptorSource,
        },
        a2aAgentCard: {
          data: 0,
          dataSchemaVersion: 0,
          source: i_DescriptorSource,
        },
        agentSkillsDefinition: {
          data: 0,
          dataSchemaVersion: 0,
          additionalData: {
            skillMd: {
              data: 0,
              dataSchemaVersion: 0,
              source: i_DescriptorSource,
            },
          },
        },
        custom: { data: 0 },
      },
      recordVersion: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
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
  operationName: "CreateRegistryRecord",
})) as any;

export type DeleteRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a registry. Deletion is asynchronous: the registry transitions to the DELETING status and is removed along with its registry records.
 */
export const deleteRegistry: API.OperationMethod<
  DeleteRegistryRequest,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /registries/{registryId}",
    input: { registryId: 0 },
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
  operationName: "DeleteRegistry",
})) as any;

export type DeleteRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a registry record
 */
export const deleteRegistryRecord: API.OperationMethod<
  DeleteRegistryRecordRequest,
  DeleteRegistryRecordResponse,
  DeleteRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /registries/{registryId}/records/{recordId}",
    input: { registryId: 0, recordId: 0 },
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
  operationName: "DeleteRegistryRecord",
})) as any;

export type GetRegistryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a registry by identifier (ARN or ID)
 */
export const getRegistry: API.OperationMethod<
  GetRegistryRequest,
  GetRegistryResponse,
  GetRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /registries/{registryId}",
    input: { registryId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetRegistry",
})) as any;

export type GetRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a registry record
 */
export const getRegistryRecord: API.OperationMethod<
  GetRegistryRecordRequest,
  GetRegistryRecordResponse,
  GetRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /registries/{registryId}/records/{recordId}",
    input: { registryId: 0, recordId: 0 },
    output: {
      description: D.secret,
      descriptors: o_Descriptors,
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetRegistryRecord",
})) as any;

export type ListRegistriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the registries in the caller's account and Region, with optional filtering by status and discovery authorizer type
 */
export const listRegistries: API.PaginatedOperationMethod<
  ListRegistriesRequest,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistrySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries-list",
    input: {
      maxResults: 0,
      nextToken: 0,
      filters: D.list({ name: 0, values: 0 }),
    },
    output: {
      registries: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRegistryRecordsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the registry records within a registry, with optional filtering by name, status, and record type
 */
export const listRegistryRecords: API.PaginatedOperationMethod<
  ListRegistryRecordsRequest,
  ListRegistryRecordsResponse,
  ListRegistryRecordsError,
  Credentials | HttpClient.HttpClient,
  RegistryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries/{registryId}/records-list",
    input: {
      registryId: 0,
      maxResults: 0,
      nextToken: 0,
      filters: D.list({ name: 0, values: 0 }),
    },
    output: {
      registryRecords: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
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
  operationName: "ListRegistryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registryRecords",
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
 * List the tags on a resource
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn+}",
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

export type SubmitRegistryRecordForApprovalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a DRAFT registry record for approval, moving it into the registry's approval workflow. Depending on the registry's approval configuration, the record is either auto-approved or set to PENDING_APPROVAL for a curator to approve or reject.
 */
export const submitRegistryRecordForApproval: API.OperationMethod<
  SubmitRegistryRecordForApprovalRequest,
  SubmitRegistryRecordForApprovalResponse,
  SubmitRegistryRecordForApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries/{registryId}/records/{recordId}/submit-for-approval",
    input: { registryId: 0, recordId: 0 },
    output: { updatedAt: D.ts },
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
  operationName: "SubmitRegistryRecordForApproval",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource with key-value pairs
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn+}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove tags from a resource by key
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn+}",
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

export type UpdateRegistryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing registry. This operation uses PATCH semantics: specify only the fields you want to change, and omit the rest to leave them unchanged. Updates are applied asynchronously and the registry transitions to the UPDATING status while they are processed.
 */
export const updateRegistry: API.OperationMethod<
  UpdateRegistryRequest,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /registries/{registryId}",
    input: {
      registryId: 0,
      name: 0,
      description: i_UpdatedDescription,
      discoveryConfiguration: {
        authorizerConfiguration: { optionalValue: i_AuthorizerConfiguration },
      },
      approvalConfiguration: { optionalValue: i_ApprovalConfiguration },
    },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "UpdateRegistry",
})) as any;

export type UpdateRegistryRecordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a registry record. The update is asynchronous: the record is returned with the UPDATING status while it is processed. Fields that use update wrappers follow PATCH semantics: omit the field to leave it unchanged.
 */
export const updateRegistryRecord: API.OperationMethod<
  UpdateRegistryRecordRequest,
  UpdateRegistryRecordResponse,
  UpdateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /registries/{registryId}/records/{recordId}",
    input: {
      registryId: 0,
      recordId: 0,
      name: 0,
      displayName: { optionalValue: 0 },
      description: i_UpdatedDescription,
      recordType: 0,
      descriptors: {
        optionalValue: {
          mcpServer: {
            optionalValue: {
              data: i_UpdatedDescriptorData,
              dataSchemaVersion: i_UpdatedDataSchemaVersion,
              source: i_UpdatedDescriptorSource,
              additionalData: {
                optionalValue: {
                  tools: {
                    optionalValue: {
                      data: i_UpdatedDescriptorData,
                      dataSchemaVersion: i_UpdatedDataSchemaVersion,
                    },
                  },
                },
              },
            },
          },
          a2aAgentCard: {
            optionalValue: {
              data: i_UpdatedDescriptorData,
              dataSchemaVersion: i_UpdatedDataSchemaVersion,
              source: i_UpdatedDescriptorSource,
            },
          },
          agentSkillsDefinition: {
            optionalValue: {
              data: i_UpdatedDescriptorData,
              dataSchemaVersion: i_UpdatedDataSchemaVersion,
              additionalData: {
                optionalValue: {
                  skillMd: {
                    optionalValue: {
                      data: i_UpdatedDescriptorData,
                      dataSchemaVersion: i_UpdatedDataSchemaVersion,
                      source: i_UpdatedDescriptorSource,
                    },
                  },
                },
              },
            },
          },
          custom: { optionalValue: { data: i_UpdatedDescriptorData } },
        },
      },
      recordVersion: 0,
      triggerSynchronization: 0,
    },
    output: {
      description: D.secret,
      descriptors: o_Descriptors,
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "UpdateRegistryRecord",
})) as any;

export type UpdateRegistryRecordStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a registry record as part of the registry's curation workflow, for example to approve or reject a record that is pending approval, or to deprecate an approved record so that it is no longer discoverable
 */
export const updateRegistryRecordStatus: API.OperationMethod<
  UpdateRegistryRecordStatusRequest,
  UpdateRegistryRecordStatusResponse,
  UpdateRegistryRecordStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /registries/{registryId}/records/{recordId}/status",
    input: { registryId: 0, recordId: 0, status: 0, statusReason: 0 },
    output: { updatedAt: D.ts },
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
  operationName: "UpdateRegistryRecordStatus",
})) as any;

const i_ApprovalConfiguration: D.LazyStruct = () => ({ autoApprovalRules: 0 });
const i_AuthorizerConfiguration: D.LazyStruct = () => ({
  customJWTAuthorizer: {
    discoveryUrl: 0,
    allowedAudience: 0,
    allowedClients: 0,
    allowedScopes: 0,
    customClaims: D.list({
      inboundTokenClaimName: 0,
      inboundTokenClaimValueType: 0,
      authorizingClaimMatchValue: {
        claimMatchValue: { matchValueString: 0, matchValueStringList: 0 },
        claimMatchOperator: 0,
      },
    }),
    privateEndpoint: i_PrivateEndpoint,
    privateEndpointOverrides: D.list({
      domain: 0,
      privateEndpoint: i_PrivateEndpoint,
    }),
  },
});
const i_DescriptorSource: D.LazyStruct = () => ({
  fromUrl: {
    url: 0,
    credentialProviderConfigurations: D.list({
      credentialProviderType: 0,
      credentialProvider: {
        oauthCredentialProvider: {
          providerArn: 0,
          grantType: 0,
          scopes: 0,
          customParameters: 0,
        },
        iamCredentialProvider: { roleArn: 0, service: 0, region: 0 },
      },
    }),
  },
});
const i_UpdatedDataSchemaVersion: D.LazyStruct = () => ({ optionalValue: 0 });
const i_UpdatedDescription: D.LazyStruct = () => ({ optionalValue: 0 });
const i_UpdatedDescriptorData: D.LazyStruct = () => ({ optionalValue: 0 });
const i_UpdatedDescriptorSource: D.LazyStruct = () => ({
  optionalValue: i_DescriptorSource,
});
const o_Descriptors: D.LazyStruct = () => ({
  mcpServer: { data: D.secret, additionalData: { tools: { data: D.secret } } },
  a2aAgentCard: { data: D.secret },
  agentSkillsDefinition: {
    data: D.secret,
    additionalData: { skillMd: { data: D.secret } },
  },
  custom: { data: D.secret },
});
const i_PrivateEndpoint: D.LazyStruct = () => ({
  selfManagedLatticeResource: { resourceConfigurationIdentifier: 0 },
  managedVpcResource: {
    vpcIdentifier: 0,
    subnetIds: 0,
    endpointIpAddressType: 0,
    securityGroupIds: 0,
    tags: 0,
    routingDomain: 0,
  },
});
