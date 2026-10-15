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
  sdkId: "Agent Registry Control",
  serviceShapeName: "AgentRegistryControl",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "agent-registry" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-12-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p) => {
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
}, '{"url":"https://agent-registry-control.{R}.api.aws","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(577, __c18, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RegistryName = string;
export type Description = string | redacted.Redacted<string>;
export type KmsKeyArn = string;
export interface EncryptionConfiguration {
  kmsKeyArn: string;
}
export type DiscoveryUrl = string;
export type AllowedAudience = string;
export type AllowedAudienceList = string[];
export type AllowedClient = string;
export type AllowedClientsList = string[];
export type AllowedScopeType = string;
export type AllowedScopesType = string[];
export type InboundTokenClaimNameType = string;
export type InboundTokenClaimValueType = "STRING" | "STRING_ARRAY" | (string & {});
export type MatchValueString = string;
export type MatchValueStringList = string[];
export type ClaimMatchValueType =
  | { matchValueString: string; matchValueStringList?: never }
  | { matchValueString?: never; matchValueStringList: string[] };
export type ClaimMatchOperatorType = "EQUALS" | "CONTAINS" | "CONTAINS_ANY" | (string & {});
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
export type SelfManagedLatticeResource = { resourceConfigurationIdentifier: string };
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
  | { selfManagedLatticeResource: SelfManagedLatticeResource; managedVpcResource?: never }
  | { selfManagedLatticeResource?: never; managedVpcResource: ManagedVpcResource };
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
export type AuthorizerConfiguration = { customJWTAuthorizer: CustomJWTAuthorizerConfiguration };
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
export type CustomMetadataSchemaDefinition = string | redacted.Redacted<string>;
export type RecordType = "MCP" | "AGENT" | "CUSTOM" | "SKILL" | "GATEWAY" | (string & {});
export interface RecordTypeSchemaOverride {
  recordType: RecordType;
  schema: string | redacted.Redacted<string>;
}
export type RecordTypeSchemaOverrideList = RecordTypeSchemaOverride[];
export interface CustomMetadataSchemaConfiguration {
  defaultSchema?: string | redacted.Redacted<string>;
  recordTypeSchemaOverrides?: RecordTypeSchemaOverride[];
}
export type AutoDetectionScope = "ORGANIZATION" | (string & {});
export interface AutoDetectionConfiguration {
  scope: AutoDetectionScope;
  enabled: boolean;
}
export interface CreateRegistryRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  encryptionConfiguration?: EncryptionConfiguration;
  discoveryConfiguration?: DiscoveryConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  approvalConfiguration?: ApprovalConfiguration;
  customMetadataSchemaConfiguration?: CustomMetadataSchemaConfiguration;
  autoDetectionConfiguration?: AutoDetectionConfiguration;
}
export type RegistryArn = string;
export interface CreateRegistryResponse {
  registryArn: string;
}
export type RegistryIdentifier = string;
export type RegistryRecordName = string;
export type RegistryRecordDisplayName = string;
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
export type RegistryRecordCredentialProviderType = "OAUTH" | "IAM" | (string & {});
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
  | { oauthCredentialProvider?: never; iamCredentialProvider: RegistryRecordIamCredentialProvider };
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
export interface HttpDescriptor {
  source?: DescriptorSource;
}
export interface AgUiDescriptor {
  source?: DescriptorSource;
}
export interface Descriptors {
  mcpServer?: McpServerDescriptor;
  a2aAgentCard?: A2aAgentCardDescriptor;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor;
  custom?: CustomDescriptor;
  http?: HttpDescriptor;
  agui?: AgUiDescriptor;
}
export type RegistryRecordVersion = string;
export type ProvenanceRelation = "DETECTED_FROM" | (string & {});
export type SourceId = string;
export type SourceType =
  | "AWS::BedrockAgentCore::Runtime"
  | "AWS::BedrockAgentCore::Gateway"
  | (string & {});
export type AgentCoreRuntimeServerProtocol = "HTTP" | "A2A" | "MCP" | "AGUI" | (string & {});
export interface AgentCoreRuntimeProtocolConfiguration {
  serverProtocol?: AgentCoreRuntimeServerProtocol;
}
export interface WorkloadIdentityDetails {
  workloadIdentityArn: string;
}
export interface AgentCoreRuntimeSourceDetails {
  protocolConfiguration?: AgentCoreRuntimeProtocolConfiguration;
  authorizerConfiguration?: AuthorizerConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
}
export type AgentCoreGatewayProtocolType = "MCP" | (string & {});
export interface AgentCoreGatewaySourceDetails {
  protocolType?: AgentCoreGatewayProtocolType;
  authorizerType?: string;
  authorizerConfiguration?: AuthorizerConfiguration;
  workloadIdentityDetails?: WorkloadIdentityDetails;
}
export type SourceDetails =
  | { agentcoreRuntime: AgentCoreRuntimeSourceDetails; agentcoreGateway?: never }
  | { agentcoreRuntime?: never; agentcoreGateway: AgentCoreGatewaySourceDetails };
export interface Provenance {
  relation: ProvenanceRelation;
  sourceId: string;
  sourceType?: SourceType;
  sourceDetails?: SourceDetails;
}
export type ProvenanceList = Provenance[];
export type CustomMetadataDocument = unknown;
export interface CreateRegistryRecordRequest {
  registryId: string;
  name: string;
  displayName?: string;
  description?: string | redacted.Redacted<string>;
  recordType: RecordType;
  descriptors: Descriptors;
  recordVersion?: string;
  clientToken?: string;
  provenance?: Provenance[];
  customMetadata?: any;
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
export type AutoDetectionStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface AutoDetection {
  configuration: AutoDetectionConfiguration;
  status: AutoDetectionStatus;
  statusReason?: string;
}
export interface GetRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  customMetadataSchemaConfiguration?: CustomMetadataSchemaConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  autoDetection?: AutoDetection;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetRegistryRecordRequest {
  registryId: string;
  recordId: string;
}
export type RegistryRecordId = string;
export type CreatorAccountId = string;
export type CustomMetadataSchemaComplianceStatus = "COMPLIANT" | "NON_COMPLIANT" | (string & {});
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
  provenance?: Provenance[];
  createdByAutoDetection?: boolean;
  createdBy?: string;
  customMetadata?: any;
  customMetadataSchemaComplianceStatus?: CustomMetadataSchemaComplianceStatus;
}
export type MaxResults = number;
export type NextToken = string;
export type RegistryFilterName = "status" | "discoveryConfiguration.authorizerType" | (string & {});
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
  autoDetection?: AutoDetection;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistrySummaryList = RegistrySummary[];
export interface ListRegistriesResponse {
  registries: RegistrySummary[];
  nextToken?: string;
}
export type RegistryRecordFilterName = "name" | "status" | "recordType" | (string & {});
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
export interface ProvenanceSummary {
  relation: ProvenanceRelation;
  sourceId: string;
  sourceType?: SourceType;
}
export type ProvenanceSummaryList = ProvenanceSummary[];
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
  createdByAutoDetection?: boolean;
  createdBy?: string;
  provenanceSummaryList?: ProvenanceSummary[];
  customMetadataSchemaComplianceStatus?: CustomMetadataSchemaComplianceStatus;
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
export interface UpdatedCustomMetadataSchemaConfiguration {
  optionalValue?: CustomMetadataSchemaConfiguration;
}
export interface UpdatedAutoDetectionConfiguration {
  optionalValue?: AutoDetectionConfiguration;
}
export interface UpdateRegistryRequest {
  registryId: string;
  name?: string;
  description?: UpdatedDescription;
  discoveryConfiguration?: UpdatedDiscoveryConfiguration;
  approvalConfiguration?: UpdatedApprovalConfiguration;
  customMetadataSchemaConfiguration?: UpdatedCustomMetadataSchemaConfiguration;
  autoDetectionConfiguration?: UpdatedAutoDetectionConfiguration;
}
export interface UpdateRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string>;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  approvalConfiguration?: ApprovalConfiguration;
  customMetadataSchemaConfiguration?: CustomMetadataSchemaConfiguration;
  status: RegistryStatus;
  statusReason?: string;
  autoDetection?: AutoDetection;
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
export interface UpdatedHttpDescriptorFields {
  source?: UpdatedDescriptorSource;
}
export interface UpdatedHttpDescriptor {
  optionalValue?: UpdatedHttpDescriptorFields;
}
export interface UpdatedAgUiDescriptorFields {
  source?: UpdatedDescriptorSource;
}
export interface UpdatedAgUiDescriptor {
  optionalValue?: UpdatedAgUiDescriptorFields;
}
export interface UpdatedDescriptorsFields {
  mcpServer?: UpdatedMcpServerDescriptor;
  a2aAgentCard?: UpdatedA2aAgentCardDescriptor;
  agentSkillsDefinition?: UpdatedAgentSkillsDefinitionDescriptor;
  custom?: UpdatedCustomDescriptor;
  http?: UpdatedHttpDescriptor;
  agui?: UpdatedAgUiDescriptor;
}
export interface UpdatedDescriptors {
  optionalValue?: UpdatedDescriptorsFields;
}
export interface UpdatedCustomMetadataMap {
  optionalValue?: any;
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
  customMetadata?: UpdatedCustomMetadataMap;
  triggerSynchronization?: boolean;
  provenance?: Provenance[];
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
  provenance?: Provenance[];
  createdByAutoDetection?: boolean;
  createdBy?: string;
  customMetadata?: any;
  customMetadataSchemaComplianceStatus?: CustomMetadataSchemaComplianceStatus;
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
  input: __S(608, __c19, 0) as any as S.Schema<CreateRegistryRequest>,
  output: __S(609, __c19, 1) as any as S.Schema<CreateRegistryResponse>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<CreateRegistryRecordRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<CreateRegistryRecordResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteRegistryRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<DeleteRegistryResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteRegistryRecordRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteRegistryRecordResponse>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<GetRegistryRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<GetRegistryResponse>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<GetRegistryRecordRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<GetRegistryRecordResponse>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<ListRegistriesRequest>,
  output: __S(227, __c7, 3) as any as S.Schema<ListRegistriesResponse>,
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
  input: __S(288, __c9, 0) as any as S.Schema<ListRegistryRecordsRequest>,
  output: __S(293, __c9, 5) as any as S.Schema<ListRegistryRecordsResponse>,
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
 * Lists the tags associated with the specified Amazon Web Services Agent Registry resource. Returns the current tag key-value pairs on the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  input: __S(352, __c11, 0) as any as S.Schema<SubmitRegistryRecordForApprovalRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<SubmitRegistryRecordForApprovalResponse>,
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
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified Amazon Web Services Agent Registry resource. Tags are key-value pairs that you can use to categorize and manage Amazon Web Services resources. If a tag with the same key already exists on the resource, the service replaces its value with the value you specify.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Amazon Web Services Agent Registry resource. The operation removes only the tags whose keys you supply; other tags on the resource remain unchanged.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UntagResourceResponse>,
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
  input: __S(453, __c14, 5) as any as S.Schema<UpdateRegistryRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<UpdateRegistryResponse>,
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
}));

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
  input: __S(533, __c16, 21) as any as S.Schema<UpdateRegistryRecordRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<UpdateRegistryRecordResponse>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<UpdateRegistryRecordStatusRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<UpdateRegistryRecordStatusResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          recordId: S.String.pipe(T.HttpLabel("recordId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/registries/{registryId}/records/{recordId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRegistryRecordRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteRegistryRecordResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.String.pipe(T.HttpLabel("registryId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/registries/{registryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRegistryRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuration: __S(641, __c20, 1),
          status: S.String,
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoDetection" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          registryId: S.String,
          registryArn: S.String,
          discoveryConfiguration: S.optional(__S(640, __c20, 0)),
          encryptionConfiguration: S.optional(__S(672, __c21, 0)),
          approvalConfiguration: S.optional(__S(674, __c21, 2)),
          customMetadataSchemaConfiguration: S.optional(__S(677, __c21, 5)),
          status: S.String,
          statusReason: S.optional(S.String),
          autoDetection: S.optional(__S(96, __c3, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetRegistryResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          recordId: S.String.pipe(T.HttpLabel("recordId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/registries/{registryId}/records/{recordId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRegistryRecordRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          recordType: S.String,
          descriptors: S.optional(__S(847, __c26, 15)),
          recordVersion: S.optional(S.String),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          statusReason: S.optional(S.String),
          provenance: S.optional(__S(854, __c26, 22)),
          createdByAutoDetection: S.optional(S.Boolean),
          createdBy: S.optional(S.String),
          customMetadata: S.optional(S.Any),
          customMetadataSchemaComplianceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRegistryRecordResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(257, __c8, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/registries-list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegistriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          registryId: S.String,
          registryArn: S.String,
          discoveryConfiguration: S.optional(__S(640, __c20, 0)),
          status: S.String,
          statusReason: S.optional(S.String),
          autoDetection: S.optional(__S(96, __c3, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "RegistrySummary" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ registries: __S(226, __c7, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegistriesResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(704, __c22, 0) })).annotate({
        identifier: "RegistryFilter",
      });
    case 1:
      return S.Array(__S(256, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(257, __c8, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/registries/{registryId}/records-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRegistryRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ relation: S.String, sourceId: S.String, sourceType: S.optional(S.String) }),
      ).annotate({ identifier: "ProvenanceSummary" });
    case 2:
      return S.Array(__S(289, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          recordType: S.String,
          recordVersion: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdByAutoDetection: S.optional(S.Boolean),
          createdBy: S.optional(S.String),
          provenanceSummaryList: S.optional(__S(290, __c9, 2)),
          customMetadataSchemaComplianceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistryRecordSummary" });
    case 4:
      return S.Array(__S(291, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ registryRecords: __S(292, __c9, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegistryRecordsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(736, __c23, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          recordId: S.String.pipe(T.HttpLabel("recordId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/registries/{registryId}/records/{recordId}/submit-for-approval",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SubmitRegistryRecordForApprovalRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "SubmitRegistryRecordForApprovalResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(736, __c23, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn+}" }),
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
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(704, __c22, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn+}" }),
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
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(778, __c24, 10)) })).annotate(
        { identifier: "UpdatedAuthorizerConfiguration" },
      );
    case 1:
      return S.suspend(() =>
        S.Struct({ authorizerConfiguration: S.optional(__S(448, __c14, 0)) }),
      ).annotate({ identifier: "UpdatedDiscoveryConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(674, __c21, 2)) })).annotate({
        identifier: "UpdatedApprovalConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(677, __c21, 5)) })).annotate({
        identifier: "UpdatedCustomMetadataSchemaConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(641, __c20, 1)) })).annotate({
        identifier: "UpdatedAutoDetectionConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          name: S.optional(S.String),
          description: S.optional(__S(480, __c15, 0)),
          discoveryConfiguration: S.optional(__S(449, __c14, 1)),
          approvalConfiguration: S.optional(__S(450, __c14, 2)),
          customMetadataSchemaConfiguration: S.optional(__S(451, __c14, 3)),
          autoDetectionConfiguration: S.optional(__S(452, __c14, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/registries/{registryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRegistryRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(SensitiveString) })).annotate({
        identifier: "UpdatedDescription",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(S.String) })).annotate({
        identifier: "UpdatedDisplayName",
      });
    case 1:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(840, __c26, 8)) })).annotate({
        identifier: "UpdatedDescriptorSource",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(480, __c15, 0)),
          dataSchemaVersion: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "UpdatedMcpToolsDescriptorFields" });
    case 3:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(514, __c16, 2)) })).annotate({
        identifier: "UpdatedMcpToolsDescriptor",
      });
    case 4:
      return S.suspend(() => S.Struct({ tools: S.optional(__S(515, __c16, 3)) })).annotate({
        identifier: "UpdatedMcpServerAdditionalDataFields",
      });
    case 5:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(516, __c16, 4)) })).annotate({
        identifier: "UpdatedMcpServerAdditionalData",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(480, __c15, 0)),
          dataSchemaVersion: S.optional(__S(512, __c16, 0)),
          source: S.optional(__S(513, __c16, 1)),
          additionalData: S.optional(__S(517, __c16, 5)),
        }),
      ).annotate({ identifier: "UpdatedMcpServerDescriptorFields" });
    case 7:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(518, __c16, 6)) })).annotate({
        identifier: "UpdatedMcpServerDescriptor",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(480, __c15, 0)),
          dataSchemaVersion: S.optional(__S(512, __c16, 0)),
          source: S.optional(__S(513, __c16, 1)),
        }),
      ).annotate({ identifier: "UpdatedA2aAgentCardDescriptorFields" });
    case 9:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(520, __c16, 8)) })).annotate({
        identifier: "UpdatedA2aAgentCardDescriptor",
      });
    case 10:
      return S.suspend(() => S.Struct({ skillMd: S.optional(__S(521, __c16, 9)) })).annotate({
        identifier: "UpdatedAgentSkillsAdditionalDataFields",
      });
    case 11:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(522, __c16, 10)) })).annotate(
        { identifier: "UpdatedAgentSkillsAdditionalData" },
      );
    case 12:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(480, __c15, 0)),
          dataSchemaVersion: S.optional(__S(512, __c16, 0)),
          additionalData: S.optional(__S(523, __c16, 11)),
        }),
      ).annotate({ identifier: "UpdatedAgentSkillsDefinitionDescriptorFields" });
    case 13:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(524, __c16, 12)) })).annotate(
        { identifier: "UpdatedAgentSkillsDefinitionDescriptor" },
      );
    case 14:
      return S.suspend(() => S.Struct({ data: S.optional(__S(480, __c15, 0)) })).annotate({
        identifier: "UpdatedCustomDescriptorFields",
      });
    case 15:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(526, __c16, 14)) })).annotate(
        { identifier: "UpdatedCustomDescriptor" },
      );
    case 16:
      return S.suspend(() => S.Struct({ source: S.optional(__S(513, __c16, 1)) })).annotate({
        identifier: "UpdatedHttpDescriptorFields",
      });
    case 17:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(528, __c16, 16)) })).annotate(
        { identifier: "UpdatedHttpDescriptor" },
      );
    case 18:
      return S.suspend(() =>
        S.Struct({
          mcpServer: S.optional(__S(519, __c16, 7)),
          a2aAgentCard: S.optional(__S(521, __c16, 9)),
          agentSkillsDefinition: S.optional(__S(525, __c16, 13)),
          custom: S.optional(__S(527, __c16, 15)),
          http: S.optional(__S(529, __c16, 17)),
          agui: S.optional(__S(529, __c16, 17)),
        }),
      ).annotate({ identifier: "UpdatedDescriptorsFields" });
    case 19:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(530, __c16, 18)) })).annotate(
        { identifier: "UpdatedDescriptors" },
      );
    case 20:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(S.Any) })).annotate({
        identifier: "UpdatedCustomMetadataMap",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          recordId: S.String.pipe(T.HttpLabel("recordId")),
          name: S.optional(S.String),
          displayName: S.optional(__S(512, __c16, 0)),
          description: S.optional(__S(480, __c15, 0)),
          recordType: S.optional(S.String),
          descriptors: S.optional(__S(531, __c16, 19)),
          recordVersion: S.optional(S.String),
          customMetadata: S.optional(__S(532, __c16, 20)),
          triggerSynchronization: S.optional(S.Boolean),
          provenance: S.optional(__S(854, __c26, 22)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/registries/{registryId}/records/{recordId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRegistryRecordRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          recordId: S.String.pipe(T.HttpLabel("recordId")),
          status: S.String,
          statusReason: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/registries/{registryId}/records/{recordId}/status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRegistryRecordStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          status: S.String,
          statusReason: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateRegistryRecordStatusResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(576, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          encryptionConfiguration: S.optional(__S(672, __c21, 0)),
          discoveryConfiguration: S.optional(__S(640, __c20, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(736, __c23, 0)),
          approvalConfiguration: S.optional(__S(674, __c21, 2)),
          customMetadataSchemaConfiguration: S.optional(__S(677, __c21, 5)),
          autoDetectionConfiguration: S.optional(__S(641, __c20, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/registries" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRegistryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ registryArn: S.String })).annotate({
        identifier: "CreateRegistryResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizerConfiguration: S.optional(__S(778, __c24, 10)),
          authorizerType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiscoveryConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ scope: S.String, enabled: S.Boolean })).annotate({
        identifier: "AutoDetectionConfiguration",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyArn: S.String })).annotate({
        identifier: "EncryptionConfiguration",
      });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({ autoApprovalRules: S.optional(__S(673, __c21, 1)) }),
      ).annotate({ identifier: "ApprovalConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ recordType: S.String, schema: SensitiveString })).annotate({
        identifier: "RecordTypeSchemaOverride",
      });
    case 4:
      return S.Array(__S(675, __c21, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          defaultSchema: S.optional(SensitiveString),
          recordTypeSchemaOverrides: S.optional(__S(676, __c21, 4)),
        }),
      ).annotate({ identifier: "CustomMetadataSchemaConfiguration" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ matchValueString: S.String }),
        /*@__PURE__*/ S.Struct({ matchValueStringList: __S(704, __c22, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ claimMatchValue: __S(768, __c24, 0), claimMatchOperator: S.String }),
      ).annotate({ identifier: "AuthorizingClaimMatchValueType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          inboundTokenClaimName: S.String,
          inboundTokenClaimValueType: S.String,
          authorizingClaimMatchValue: __S(769, __c24, 1),
        }),
      ).annotate({ identifier: "CustomClaimValidationType" });
    case 3:
      return S.Array(__S(770, __c24, 2));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ resourceConfigurationIdentifier: S.String })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          vpcIdentifier: S.String,
          subnetIds: __S(704, __c22, 0),
          endpointIpAddressType: S.String,
          securityGroupIds: S.optional(__S(704, __c22, 0)),
          tags: S.optional(__S(736, __c23, 0)),
          routingDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedVpcResource" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ selfManagedLatticeResource: __S(772, __c24, 4) }),
        /*@__PURE__*/ S.Struct({ managedVpcResource: __S(773, __c24, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ domain: S.String, privateEndpoint: __S(774, __c24, 6) }),
      ).annotate({ identifier: "PrivateEndpointOverride" });
    case 8:
      return S.Array(__S(775, __c24, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          discoveryUrl: S.String,
          allowedAudience: S.optional(__S(704, __c22, 0)),
          allowedClients: S.optional(__S(704, __c22, 0)),
          allowedScopes: S.optional(__S(704, __c22, 0)),
          customClaims: S.optional(__S(771, __c24, 3)),
          privateEndpoint: S.optional(__S(774, __c24, 6)),
          privateEndpointOverrides: S.optional(__S(776, __c24, 8)),
        }),
      ).annotate({ identifier: "CustomJWTAuthorizerConfiguration" });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ customJWTAuthorizer: __S(777, __c24, 9) })]);
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          recordType: S.String,
          descriptors: __S(847, __c26, 15),
          recordVersion: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          provenance: S.optional(__S(854, __c26, 22)),
          customMetadata: S.optional(S.Any),
          tags: S.optional(__S(736, __c23, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/registries/{registryId}/records" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRegistryRecordRequest" });
    case 1:
      return S.suspend(() => S.Struct({ recordArn: S.String, status: S.String })).annotate({
        identifier: "CreateRegistryRecordResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ data: S.optional(SensitiveString), dataSchemaVersion: S.optional(S.String) }),
      ).annotate({ identifier: "McpToolsDescriptor" });
    case 1:
      return S.suspend(() => S.Struct({ tools: S.optional(__S(832, __c26, 0)) })).annotate({
        identifier: "McpServerAdditionalData",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          providerArn: S.String,
          grantType: S.optional(S.String),
          scopes: S.optional(__S(704, __c22, 0)),
          customParameters: S.optional(__S(736, __c23, 0)),
        }),
      ).annotate({ identifier: "RegistryRecordOAuthCredentialProvider" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.optional(S.String),
          service: S.optional(S.String),
          region: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistryRecordIamCredentialProvider" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ oauthCredentialProvider: __S(834, __c26, 2) }),
        /*@__PURE__*/ S.Struct({ iamCredentialProvider: __S(835, __c26, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({ credentialProviderType: S.String, credentialProvider: __S(836, __c26, 4) }),
      ).annotate({ identifier: "RegistryRecordCredentialProviderConfiguration" });
    case 6:
      return S.Array(__S(837, __c26, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          url: S.String,
          credentialProviderConfigurations: S.optional(__S(838, __c26, 6)),
        }),
      ).annotate({ identifier: "DescriptorSourceFromUrl" });
    case 8:
      return S.suspend(() => S.Struct({ fromUrl: S.optional(__S(839, __c26, 7)) })).annotate({
        identifier: "DescriptorSource",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          additionalData: S.optional(__S(833, __c26, 1)),
          source: S.optional(__S(840, __c26, 8)),
        }),
      ).annotate({ identifier: "McpServerDescriptor" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          source: S.optional(__S(840, __c26, 8)),
        }),
      ).annotate({ identifier: "A2aAgentCardDescriptor" });
    case 11:
      return S.suspend(() => S.Struct({ skillMd: S.optional(__S(842, __c26, 10)) })).annotate({
        identifier: "AgentSkillsAdditionalData",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          additionalData: S.optional(__S(843, __c26, 11)),
        }),
      ).annotate({ identifier: "AgentSkillsDefinitionDescriptor" });
    case 13:
      return S.suspend(() => S.Struct({ data: S.optional(SensitiveString) })).annotate({
        identifier: "CustomDescriptor",
      });
    case 14:
      return S.suspend(() => S.Struct({ source: S.optional(__S(840, __c26, 8)) })).annotate({
        identifier: "HttpDescriptor",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({
          mcpServer: S.optional(__S(841, __c26, 9)),
          a2aAgentCard: S.optional(__S(842, __c26, 10)),
          agentSkillsDefinition: S.optional(__S(844, __c26, 12)),
          custom: S.optional(__S(845, __c26, 13)),
          http: S.optional(__S(846, __c26, 14)),
          agui: S.optional(__S(846, __c26, 14)),
        }),
      ).annotate({ identifier: "Descriptors" });
    case 16:
      return S.suspend(() => S.Struct({ serverProtocol: S.optional(S.String) })).annotate({
        identifier: "AgentCoreRuntimeProtocolConfiguration",
      });
    case 17:
      return S.suspend(() => S.Struct({ workloadIdentityArn: S.String })).annotate({
        identifier: "WorkloadIdentityDetails",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          protocolConfiguration: S.optional(__S(848, __c26, 16)),
          authorizerConfiguration: S.optional(__S(778, __c24, 10)),
          workloadIdentityDetails: S.optional(__S(849, __c26, 17)),
        }),
      ).annotate({ identifier: "AgentCoreRuntimeSourceDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          protocolType: S.optional(S.String),
          authorizerType: S.optional(S.String),
          authorizerConfiguration: S.optional(__S(778, __c24, 10)),
          workloadIdentityDetails: S.optional(__S(849, __c26, 17)),
        }),
      ).annotate({ identifier: "AgentCoreGatewaySourceDetails" });
    case 20:
      return S.Union([
        /*@__PURE__*/ S.Struct({ agentcoreRuntime: __S(850, __c26, 18) }),
        /*@__PURE__*/ S.Struct({ agentcoreGateway: __S(851, __c26, 19) }),
      ]);
    case 21:
      return S.suspend(() =>
        S.Struct({
          relation: S.String,
          sourceId: S.String,
          sourceType: S.optional(S.String),
          sourceDetails: S.optional(__S(852, __c26, 20)),
        }),
      ).annotate({ identifier: "Provenance" });
    case 22:
      return S.Array(__S(853, __c26, 21));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.String.pipe(T.HttpLabel("registryId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/registries/{registryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRegistryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "DeleteRegistryResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
