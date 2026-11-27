import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "AgentRegistryControl",
  service: "AgentRegistryControl",
  propagate: TxXray.propagate,
} as const;

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
export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1025, __c32, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RegistryRecordArn = string;
export type PublisherIdentifierArn = string;
export type Subdomain = string;
export type Category = string;
export type CategoryList = string[];
export type ClientToken = string;
export interface AssociatePublisherRequest {
  recordArn: string;
  publisherArn: string;
  subdomain?: string | undefined;
  categories?: string[] | undefined;
  clientToken?: string | undefined;
}
export type PublicIdentifier = string;
export type AssociationStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED"
  | (string & {});
export type StatusReason = string;
export interface AssociatePublisherResponse {
  recordArn: string;
  publicIdentifier: string;
  publisher: string;
  status: AssociationStatus;
  statusReason?: string | undefined;
}
export type DomainName = string;
export type Identifier = { domain: string };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreatePublisherRequest {
  value: Identifier;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type IdentifierType = "DOMAIN" | (string & {});
export type VerificationStatus =
  | "ACTION_REQUIRED"
  | "ACTIVE"
  | "FAILED"
  | "SUSPENDED"
  | "DELETING"
  | (string & {});
export type ChallengeRecordName = string;
export type ChallengeRecordValue = string;
export interface DomainChallenge {
  recordName: string;
  recordValue: string;
}
export interface CreatePublisherResponse {
  value: Identifier;
  identifierType?: IdentifierType | undefined;
  status: VerificationStatus;
  statusReason?: string | undefined;
  domainChallenge?: DomainChallenge | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  createdAt: Date;
  updatedAt: Date;
  publisherArn: string;
}
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
  | { matchValueString: string; matchValueStringList?: undefined }
  | { matchValueString?: undefined; matchValueStringList: string[] };
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
export type TagsMap = { [key: string]: string | undefined };
export type RoutingDomain = string;
export interface ManagedVpcResource {
  vpcIdentifier: string;
  subnetIds: string[];
  endpointIpAddressType: EndpointIpAddressType;
  securityGroupIds?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  routingDomain?: string | undefined;
}
export type PrivateEndpoint =
  | { selfManagedLatticeResource: SelfManagedLatticeResource; managedVpcResource?: undefined }
  | { selfManagedLatticeResource?: undefined; managedVpcResource: ManagedVpcResource };
export type PrivateEndpointOverrideDomain = string;
export interface PrivateEndpointOverride {
  domain: string;
  privateEndpoint: PrivateEndpoint;
}
export type PrivateEndpointOverrides = PrivateEndpointOverride[];
export interface CustomJWTAuthorizerConfiguration {
  discoveryUrl: string;
  allowedAudience?: string[] | undefined;
  allowedClients?: string[] | undefined;
  allowedScopes?: string[] | undefined;
  customClaims?: CustomClaimValidationType[] | undefined;
  privateEndpoint?: PrivateEndpoint | undefined;
  privateEndpointOverrides?: PrivateEndpointOverride[] | undefined;
}
export type AuthorizerConfiguration = { customJWTAuthorizer: CustomJWTAuthorizerConfiguration };
export type RegistryAuthorizerType = "CUSTOM_JWT" | "AWS_IAM" | (string & {});
export interface DiscoveryConfiguration {
  authorizerConfiguration?: AuthorizerConfiguration | undefined;
  authorizerType?: RegistryAuthorizerType | undefined;
}
export type AutoApprovalRule = "APPROVE_ALL" | (string & {});
export type AutoApprovalRuleList = AutoApprovalRule[];
export interface ApprovalConfiguration {
  autoApprovalRules?: AutoApprovalRule[] | undefined;
}
export type CustomMetadataSchemaDefinition = string | redacted.Redacted<string>;
export type RecordType =
  | "MCP"
  | "AGENT"
  | "CUSTOM"
  | "SKILL"
  | "GATEWAY"
  | "WEB_BOT"
  | (string & {});
export interface RecordTypeSchemaOverride {
  recordType: RecordType;
  schema: string | redacted.Redacted<string>;
}
export type RecordTypeSchemaOverrideList = RecordTypeSchemaOverride[];
export interface CustomMetadataSchemaConfiguration {
  defaultSchema?: string | redacted.Redacted<string> | undefined;
  recordTypeSchemaOverrides?: RecordTypeSchemaOverride[] | undefined;
}
export type AutoDetectionScope = "ORGANIZATION" | (string & {});
export interface AutoDetectionConfiguration {
  scope: AutoDetectionScope;
  enabled: boolean;
}
export interface CreateRegistryRequest {
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  discoveryConfiguration?: DiscoveryConfiguration | undefined;
  clientToken?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  approvalConfiguration?: ApprovalConfiguration | undefined;
  customMetadataSchemaConfiguration?: CustomMetadataSchemaConfiguration | undefined;
  autoDetectionConfiguration?: AutoDetectionConfiguration | undefined;
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
  data?: string | redacted.Redacted<string> | undefined;
  dataSchemaVersion?: string | undefined;
}
export interface McpServerAdditionalData {
  tools?: McpToolsDescriptor | undefined;
}
export type DescriptorSourceUrl = string;
export type RegistryRecordCredentialProviderType = "OAUTH" | "IAM" | (string & {});
export type CredentialProviderArn = string;
export type RegistryRecordOAuthGrantType =
  | "CLIENT_CREDENTIALS"
  | "AUTHORIZATION_CODE"
  | (string & {});
export type ScopeList = string[];
export type CustomParameterMap = { [key: string]: string | undefined };
export type OAuthReturnUrl = string;
export interface RegistryRecordOAuthCredentialProvider {
  providerArn: string;
  grantType?: RegistryRecordOAuthGrantType | undefined;
  scopes?: string[] | undefined;
  customParameters?: { [key: string]: string | undefined } | undefined;
  returnUrl?: string | undefined;
}
export type IamRoleArn = string;
export type IamSigningServiceName = string;
export type IamSigningRegion = string;
export interface RegistryRecordIamCredentialProvider {
  roleArn?: string | undefined;
  service?: string | undefined;
  region?: string | undefined;
}
export type RegistryRecordCredentialProviderUnion =
  | {
      oauthCredentialProvider: RegistryRecordOAuthCredentialProvider;
      iamCredentialProvider?: undefined;
    }
  | {
      oauthCredentialProvider?: undefined;
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
  credentialProviderConfigurations?: RegistryRecordCredentialProviderConfiguration[] | undefined;
}
export interface DescriptorSource {
  fromUrl?: DescriptorSourceFromUrl | undefined;
}
export interface McpServerDescriptor {
  data?: string | redacted.Redacted<string> | undefined;
  dataSchemaVersion?: string | undefined;
  additionalData?: McpServerAdditionalData | undefined;
  source?: DescriptorSource | undefined;
}
export interface A2aAgentCardDescriptor {
  data?: string | redacted.Redacted<string> | undefined;
  dataSchemaVersion?: string | undefined;
  source?: DescriptorSource | undefined;
}
export interface AgentSkillsMdDescriptor {
  data?: string | redacted.Redacted<string> | undefined;
  dataSchemaVersion?: string | undefined;
  source?: DescriptorSource | undefined;
}
export interface AgentSkillsPackageDescriptor {
  source?: DescriptorSource | undefined;
}
export type AgentSkillsRepositoryProvider = "GITHUB" | (string & {});
export type S3BucketOwnerAccountId = string;
export interface S3SourceConfiguration {
  bucketOwnerAccountId?: string | undefined;
}
export type AgentSkillsSourceConfiguration = { s3: S3SourceConfiguration };
export interface AgentSkillsAdditionalData {
  skillMd?: AgentSkillsMdDescriptor | undefined;
  skillPackage?: AgentSkillsPackageDescriptor | undefined;
  repositoryProvider?: AgentSkillsRepositoryProvider | undefined;
  sourceConfiguration?: AgentSkillsSourceConfiguration | undefined;
}
export interface AgentSkillsDefinitionDescriptor {
  data?: string | redacted.Redacted<string> | undefined;
  dataSchemaVersion?: string | undefined;
  additionalData?: AgentSkillsAdditionalData | undefined;
}
export interface CustomDescriptor {
  data?: string | redacted.Redacted<string> | undefined;
}
export interface HttpDescriptor {
  source?: DescriptorSource | undefined;
}
export interface AgUiDescriptor {
  source?: DescriptorSource | undefined;
}
export type BotCategory =
  | "advertising"
  | "archiver"
  | "content_fetcher"
  | "email_client"
  | "http_library"
  | "link_checker"
  | "miscellaneous"
  | "monitoring"
  | "page_preview"
  | "scraping_framework"
  | "search_engine"
  | "security"
  | "seo"
  | "social_media"
  | "ai_training"
  | "ai_search"
  | "ai_assistant"
  | "ai_content_optimization"
  | (string & {});
export interface SignatureAgentCardAdditionalData {
  category?: BotCategory | undefined;
}
export interface SignatureAgentCardDescriptor {
  data?: string | redacted.Redacted<string> | undefined;
  dataSchemaVersion?: string | undefined;
  source?: DescriptorSource | undefined;
  additionalData?: SignatureAgentCardAdditionalData | undefined;
}
export interface Descriptors {
  mcpServer?: McpServerDescriptor | undefined;
  a2aAgentCard?: A2aAgentCardDescriptor | undefined;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor | undefined;
  custom?: CustomDescriptor | undefined;
  http?: HttpDescriptor | undefined;
  agui?: AgUiDescriptor | undefined;
  signatureAgentCard?: SignatureAgentCardDescriptor | undefined;
}
export type ArtifactContent = Uint8Array | redacted.Redacted<Uint8Array>;
export type Sha256Hash = string;
export interface RegistryRecordArtifactUpload {
  content: Uint8Array | redacted.Redacted<Uint8Array>;
  sha256?: string | undefined;
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
  serverProtocol?: AgentCoreRuntimeServerProtocol | undefined;
}
export interface WorkloadIdentityDetails {
  workloadIdentityArn: string;
}
export interface AgentCoreRuntimeSourceDetails {
  protocolConfiguration?: AgentCoreRuntimeProtocolConfiguration | undefined;
  authorizerConfiguration?: AuthorizerConfiguration | undefined;
  workloadIdentityDetails?: WorkloadIdentityDetails | undefined;
}
export type AgentCoreGatewayProtocolType = "MCP" | (string & {});
export interface AgentCoreGatewaySourceDetails {
  protocolType?: AgentCoreGatewayProtocolType | undefined;
  authorizerType?: string | undefined;
  authorizerConfiguration?: AuthorizerConfiguration | undefined;
  workloadIdentityDetails?: WorkloadIdentityDetails | undefined;
}
export type SourceDetails =
  | { agentcoreRuntime: AgentCoreRuntimeSourceDetails; agentcoreGateway?: undefined }
  | { agentcoreRuntime?: undefined; agentcoreGateway: AgentCoreGatewaySourceDetails };
export interface Provenance {
  relation: ProvenanceRelation;
  sourceId: string;
  sourceType?: SourceType | undefined;
  sourceDetails?: SourceDetails | undefined;
}
export type ProvenanceList = Provenance[];
export type CustomMetadataDocument = unknown;
export interface CreateRegistryRecordRequest {
  registryId: string;
  name: string;
  displayName?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  recordType: RecordType;
  descriptors: Descriptors;
  artifact?: RegistryRecordArtifactUpload | undefined;
  recordVersion?: string | undefined;
  clientToken?: string | undefined;
  provenance?: Provenance[] | undefined;
  customMetadata?: any | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
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
  | "CREATE_PENDING_AUTH"
  | "UPDATE_PENDING_AUTH"
  | (string & {});
export type OAuthAuthorizationUrl = string | redacted.Redacted<string>;
export type OAuthUserId = string | redacted.Redacted<string>;
export type AuthorizationAttemptId = string;
export interface OAuth2AuthorizationData {
  authorizationUrl: string | redacted.Redacted<string>;
  userId?: string | redacted.Redacted<string> | undefined;
  authorizationAttemptId?: string | undefined;
  expiresAt?: Date | undefined;
}
export type AuthorizationData = { oauth2: OAuth2AuthorizationData };
export interface CreateRegistryRecordResponse {
  recordArn: string;
  status: RegistryRecordStatus;
  authorizationData?: AuthorizationData | undefined;
}
export interface DeletePublisherRequest {
  publisherArn: string;
}
export interface DeletePublisherResponse {}
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
export interface DisassociatePublisherRequest {
  recordArn: string;
}
export interface DisassociatePublisherResponse {}
export interface GetPublisherRequest {
  publisherArn: string;
}
export interface Publisher {
  value: Identifier;
  identifierType?: IdentifierType | undefined;
  status: VerificationStatus;
  statusReason?: string | undefined;
  domainChallenge?: DomainChallenge | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  createdAt: Date;
  updatedAt: Date;
  publisherArn: string;
}
export interface GetRegistryRequest {
  registryId: string;
}
export type RegistryId = string;
export type AutoDetectionStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface AutoDetection {
  configuration: AutoDetectionConfiguration;
  status: AutoDetectionStatus;
  statusReason?: string | undefined;
}
export interface GetRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  approvalConfiguration?: ApprovalConfiguration | undefined;
  customMetadataSchemaConfiguration?: CustomMetadataSchemaConfiguration | undefined;
  status: RegistryStatus;
  statusReason?: string | undefined;
  autoDetection?: AutoDetection | undefined;
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
export type PresignedDownloadUrl = string | redacted.Redacted<string>;
export interface RegistryRecordArtifactDownload {
  sha256?: string | undefined;
  downloadUrl?: string | redacted.Redacted<string> | undefined;
}
export type SynchronizedSourceUrl = string | redacted.Redacted<string>;
export type S3ObjectVersionId = string;
export type S3ObjectETag = string;
export interface S3SynchronizedSource {
  url: string | redacted.Redacted<string>;
  synchronizedAt: Date;
  versionId?: string | undefined;
  eTag?: string | undefined;
}
export type GitCommitId = string;
export interface GitHubSynchronizedSource {
  url: string | redacted.Redacted<string>;
  synchronizedAt: Date;
  commitId: string;
}
export type RegistryRecordSynchronizedSource =
  | { s3: S3SynchronizedSource; gitHub?: undefined }
  | { s3?: undefined; gitHub: GitHubSynchronizedSource };
export interface GetRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  recordType: RecordType;
  descriptors?: Descriptors | undefined;
  recordVersion?: string | undefined;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string | undefined;
  provenance?: Provenance[] | undefined;
  createdByAutoDetection?: boolean | undefined;
  createdBy?: string | undefined;
  customMetadata?: any | undefined;
  customMetadataSchemaComplianceStatus?: CustomMetadataSchemaComplianceStatus | undefined;
  artifact?: RegistryRecordArtifactDownload | undefined;
  synchronizedSource?: RegistryRecordSynchronizedSource | undefined;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListPublisherAssociationsRequest {
  publisherArn?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PublisherAssociation {
  recordArn: string;
  publicIdentifier: string;
  publisher: string;
  status: AssociationStatus;
  statusReason?: string | undefined;
}
export type PublisherAssociationList = PublisherAssociation[];
export interface ListPublisherAssociationsResponse {
  items: PublisherAssociation[];
  nextToken?: string | undefined;
}
export interface ListPublishersRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PublisherSummary {
  value: Identifier;
  identifierType?: IdentifierType | undefined;
  status: VerificationStatus;
  createdAt: Date;
  publisherArn: string;
  associationCount?: number | undefined;
  pendingAssociationApprovalCount?: number | undefined;
}
export type PublisherSummaryList = PublisherSummary[];
export interface ListPublishersResponse {
  items: PublisherSummary[];
  nextToken?: string | undefined;
}
export type RegistryFilterName = "status" | "discoveryConfiguration.authorizerType" | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export interface RegistryFilter {
  name: RegistryFilterName;
  values: string[];
}
export type RegistryFilterList = RegistryFilter[];
export interface ListRegistriesRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  filters?: RegistryFilter[] | undefined;
}
export interface RegistrySummary {
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration | undefined;
  status: RegistryStatus;
  statusReason?: string | undefined;
  autoDetection?: AutoDetection | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistrySummaryList = RegistrySummary[];
export interface ListRegistriesResponse {
  registries: RegistrySummary[];
  nextToken?: string | undefined;
}
export type RegistryRecordFilterName = "name" | "status" | "recordType" | (string & {});
export interface RegistryRecordFilter {
  name: RegistryRecordFilterName;
  values: string[];
}
export type RegistryRecordFilterList = RegistryRecordFilter[];
export interface ListRegistryRecordsRequest {
  registryId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  filters?: RegistryRecordFilter[] | undefined;
}
export interface ProvenanceSummary {
  relation: ProvenanceRelation;
  sourceId: string;
  sourceType?: SourceType | undefined;
}
export type ProvenanceSummaryList = ProvenanceSummary[];
export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  recordType: RecordType;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  createdByAutoDetection?: boolean | undefined;
  createdBy?: string | undefined;
  provenanceSummaryList?: ProvenanceSummary[] | undefined;
  customMetadataSchemaComplianceStatus?: CustomMetadataSchemaComplianceStatus | undefined;
}
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export interface ListRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
  nextToken?: string | undefined;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type ResourceTagsMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
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
export type AssociationApprovalStatus = "APPROVED" | "REJECTED" | (string & {});
export interface UpdatePublisherAssociationApprovalStatusRequest {
  recordArn: string;
  approvalStatus: AssociationApprovalStatus;
  approvalStatusReason: string;
}
export interface UpdatePublisherAssociationApprovalStatusResponse {}
export interface UpdatedDescription {
  optionalValue?: string | redacted.Redacted<string> | undefined;
}
export interface UpdatedAuthorizerConfiguration {
  optionalValue?: AuthorizerConfiguration | undefined;
}
export interface UpdatedDiscoveryConfiguration {
  authorizerConfiguration?: UpdatedAuthorizerConfiguration | undefined;
}
export interface UpdatedApprovalConfiguration {
  optionalValue?: ApprovalConfiguration | undefined;
}
export interface UpdatedCustomMetadataSchemaConfiguration {
  optionalValue?: CustomMetadataSchemaConfiguration | undefined;
}
export interface UpdatedAutoDetectionConfiguration {
  optionalValue?: AutoDetectionConfiguration | undefined;
}
export interface UpdateRegistryRequest {
  registryId: string;
  name?: string | undefined;
  description?: UpdatedDescription | undefined;
  discoveryConfiguration?: UpdatedDiscoveryConfiguration | undefined;
  approvalConfiguration?: UpdatedApprovalConfiguration | undefined;
  customMetadataSchemaConfiguration?: UpdatedCustomMetadataSchemaConfiguration | undefined;
  autoDetectionConfiguration?: UpdatedAutoDetectionConfiguration | undefined;
}
export interface UpdateRegistryResponse {
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  registryId: string;
  registryArn: string;
  discoveryConfiguration?: DiscoveryConfiguration | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  approvalConfiguration?: ApprovalConfiguration | undefined;
  customMetadataSchemaConfiguration?: CustomMetadataSchemaConfiguration | undefined;
  status: RegistryStatus;
  statusReason?: string | undefined;
  autoDetection?: AutoDetection | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdatedDisplayName {
  optionalValue?: string | undefined;
}
export interface UpdatedDescriptorData {
  optionalValue?: string | redacted.Redacted<string> | undefined;
}
export interface UpdatedDataSchemaVersion {
  optionalValue?: string | undefined;
}
export interface UpdatedDescriptorSource {
  optionalValue?: DescriptorSource | undefined;
}
export interface UpdatedMcpToolsDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
  dataSchemaVersion?: UpdatedDataSchemaVersion | undefined;
}
export interface UpdatedMcpToolsDescriptor {
  optionalValue?: UpdatedMcpToolsDescriptorFields | undefined;
}
export interface UpdatedMcpServerAdditionalDataFields {
  tools?: UpdatedMcpToolsDescriptor | undefined;
}
export interface UpdatedMcpServerAdditionalData {
  optionalValue?: UpdatedMcpServerAdditionalDataFields | undefined;
}
export interface UpdatedMcpServerDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
  dataSchemaVersion?: UpdatedDataSchemaVersion | undefined;
  source?: UpdatedDescriptorSource | undefined;
  additionalData?: UpdatedMcpServerAdditionalData | undefined;
}
export interface UpdatedMcpServerDescriptor {
  optionalValue?: UpdatedMcpServerDescriptorFields | undefined;
}
export interface UpdatedA2aAgentCardDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
  dataSchemaVersion?: UpdatedDataSchemaVersion | undefined;
  source?: UpdatedDescriptorSource | undefined;
}
export interface UpdatedA2aAgentCardDescriptor {
  optionalValue?: UpdatedA2aAgentCardDescriptorFields | undefined;
}
export interface UpdatedAgentSkillsMdDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
  dataSchemaVersion?: UpdatedDataSchemaVersion | undefined;
  source?: UpdatedDescriptorSource | undefined;
}
export interface UpdatedAgentSkillsMdDescriptor {
  optionalValue?: UpdatedAgentSkillsMdDescriptorFields | undefined;
}
export interface UpdatedAgentSkillsPackageDescriptor {
  optionalValue?: AgentSkillsPackageDescriptor | undefined;
}
export interface UpdatedAgentSkillsRepositoryProvider {
  optionalValue?: AgentSkillsRepositoryProvider | undefined;
}
export interface UpdatedAgentSkillsSourceConfiguration {
  optionalValue?: AgentSkillsSourceConfiguration | undefined;
}
export interface UpdatedAgentSkillsAdditionalDataFields {
  skillMd?: UpdatedAgentSkillsMdDescriptor | undefined;
  skillPackage?: UpdatedAgentSkillsPackageDescriptor | undefined;
  repositoryProvider?: UpdatedAgentSkillsRepositoryProvider | undefined;
  sourceConfiguration?: UpdatedAgentSkillsSourceConfiguration | undefined;
}
export interface UpdatedAgentSkillsAdditionalData {
  optionalValue?: UpdatedAgentSkillsAdditionalDataFields | undefined;
}
export interface UpdatedAgentSkillsDefinitionDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
  dataSchemaVersion?: UpdatedDataSchemaVersion | undefined;
  additionalData?: UpdatedAgentSkillsAdditionalData | undefined;
}
export interface UpdatedAgentSkillsDefinitionDescriptor {
  optionalValue?: UpdatedAgentSkillsDefinitionDescriptorFields | undefined;
}
export interface UpdatedCustomDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
}
export interface UpdatedCustomDescriptor {
  optionalValue?: UpdatedCustomDescriptorFields | undefined;
}
export interface UpdatedHttpDescriptorFields {
  source?: UpdatedDescriptorSource | undefined;
}
export interface UpdatedHttpDescriptor {
  optionalValue?: UpdatedHttpDescriptorFields | undefined;
}
export interface UpdatedAgUiDescriptorFields {
  source?: UpdatedDescriptorSource | undefined;
}
export interface UpdatedAgUiDescriptor {
  optionalValue?: UpdatedAgUiDescriptorFields | undefined;
}
export interface UpdatedBotCategory {
  optionalValue?: BotCategory | undefined;
}
export interface UpdatedSignatureAgentCardAdditionalDataFields {
  category?: UpdatedBotCategory | undefined;
}
export interface UpdatedSignatureAgentCardAdditionalData {
  optionalValue?: UpdatedSignatureAgentCardAdditionalDataFields | undefined;
}
export interface UpdatedSignatureAgentCardDescriptorFields {
  data?: UpdatedDescriptorData | undefined;
  dataSchemaVersion?: UpdatedDataSchemaVersion | undefined;
  source?: UpdatedDescriptorSource | undefined;
  additionalData?: UpdatedSignatureAgentCardAdditionalData | undefined;
}
export interface UpdatedSignatureAgentCardDescriptor {
  optionalValue?: UpdatedSignatureAgentCardDescriptorFields | undefined;
}
export interface UpdatedDescriptorsFields {
  mcpServer?: UpdatedMcpServerDescriptor | undefined;
  a2aAgentCard?: UpdatedA2aAgentCardDescriptor | undefined;
  agentSkillsDefinition?: UpdatedAgentSkillsDefinitionDescriptor | undefined;
  custom?: UpdatedCustomDescriptor | undefined;
  http?: UpdatedHttpDescriptor | undefined;
  agui?: UpdatedAgUiDescriptor | undefined;
  signatureAgentCard?: UpdatedSignatureAgentCardDescriptor | undefined;
}
export interface UpdatedDescriptors {
  optionalValue?: UpdatedDescriptorsFields | undefined;
}
export interface UpdatedRegistryRecordArtifact {
  optionalValue?: RegistryRecordArtifactUpload | undefined;
}
export interface UpdatedCustomMetadataMap {
  optionalValue?: any | undefined;
}
export interface UpdateRegistryRecordRequest {
  registryId: string;
  recordId: string;
  name?: string | undefined;
  displayName?: UpdatedDisplayName | undefined;
  description?: UpdatedDescription | undefined;
  recordType?: RecordType | undefined;
  descriptors?: UpdatedDescriptors | undefined;
  artifact?: UpdatedRegistryRecordArtifact | undefined;
  recordVersion?: string | undefined;
  customMetadata?: UpdatedCustomMetadataMap | undefined;
  triggerSynchronization?: boolean | undefined;
  forceAuthentication?: boolean | undefined;
  provenance?: Provenance[] | undefined;
}
export interface UpdateRegistryRecordResponse {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  displayName?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  recordType: RecordType;
  descriptors?: Descriptors | undefined;
  recordVersion?: string | undefined;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
  statusReason?: string | undefined;
  provenance?: Provenance[] | undefined;
  createdByAutoDetection?: boolean | undefined;
  createdBy?: string | undefined;
  customMetadata?: any | undefined;
  customMetadataSchemaComplianceStatus?: CustomMetadataSchemaComplianceStatus | undefined;
  authorizationData?: AuthorizationData | undefined;
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
export interface ValidatePublisherRequest {
  publisherArn: string;
}
export interface ValidatePublisherResponse {
  value: Identifier;
  identifierType?: IdentifierType | undefined;
  status: VerificationStatus;
  statusReason?: string | undefined;
  domainChallenge?: DomainChallenge | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  createdAt: Date;
  updatedAt: Date;
  publisherArn: string;
}
export type NonBlankString = string;
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | "UnsupportedInRegion"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociatePublisherError =
  | AccessDeniedException
  | ConflictException
  | DependencyException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a registry record with a publisher and assign the record a public identifier under the
 * publisher's domain. The registry record must be APPROVED and the publisher must be ACTIVE. A
 * registry record can have only one publisher association. The new association starts in
 * PENDING_APPROVAL until a curator approves or rejects it.
 * A ConflictException (HTTP 409) means the publisher is not ACTIVE yet, the registry record already
 * has an association, or another registry record already holds the public identifier. To retry
 * safely, repeat the request with the same clientToken; a retry returns the original association.
 * If the publisher has reached its association quota, the request fails with
 * ServiceQuotaExceededException (HTTP 402). Remove an unused association or request a quota increase.
 */
export const associatePublisher: API.OperationMethod<
  AssociatePublisherRequest & RegionInput,
  AssociatePublisherResponse,
  AssociatePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<AssociatePublisherRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<AssociatePublisherResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    DependencyException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePublisher",
  telemetry: TELEMETRY,
  span: "AssociatePublisher",
}));

export type CreatePublisherError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a publisher for a domain you control. The publisher starts in ACTION_REQUIRED, and the
 * response includes a domainChallenge. To verify the domain, create a DNS TXT record with the
 * challenge's recordName and recordValue. When the registry finds the record, the publisher becomes
 * ACTIVE and you can associate registry records with it.
 * Your account can have one publisher per domain. Creating a second publisher for the same domain
 * fails with ConflictException unless the request repeats the original clientToken, which returns the
 * existing publisher. The request also fails with ConflictException when another account has already
 * verified the domain.
 * If your account has reached its Publisher quota, the request fails with
 * ServiceQuotaExceededException (HTTP 402). Delete an unused Publisher or request a quota increase.
 */
export const createPublisher: API.OperationMethod<
  CreatePublisherRequest & RegionInput,
  CreatePublisherResponse,
  CreatePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<CreatePublisherRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<CreatePublisherResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublisher",
  telemetry: TELEMETRY,
  span: "CreatePublisher",
}));

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
  CreateRegistryRequest & RegionInput,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateRegistryRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateRegistryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistry",
  telemetry: TELEMETRY,
  span: "CreateRegistry",
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
 * Creates a registry record within a registry. A registry record describes a discoverable resource, such as an MCP server, an agent, an agent skill, or a custom resource. For an agent skill, you can upload a skill package in `artifact`, or synchronize the skill from an Amazon S3 or GitHub source. Creation is asynchronous: the operation returns the record with the `CREATING` status while the registry processes it. If a GitHub user must first authorize access to the source, the operation returns the record with the `CREATE_PENDING_AUTH` status instead.
 */
export const createRegistryRecord: API.OperationMethod<
  CreateRegistryRecordRequest & RegionInput,
  CreateRegistryRecordResponse,
  CreateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CreateRegistryRecordRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<CreateRegistryRecordResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistryRecord",
  telemetry: TELEMETRY,
  span: "CreateRegistryRecord",
}));

export type DeletePublisherError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a publisher. A successful call returns an empty response. You can't delete a publisher
 * that has registry record associations; disassociate every registry record from it first. The
 * request fails with ConflictException while the publisher has associations or another delete is in
 * progress. Association removals can take a few seconds to be reflected, so a delete that follows a
 * disassociation can briefly fail with ConflictException; retry after a short wait. If the publisher
 * ARN names your account and the publisher doesn't exist, the request fails with
 * ResourceNotFoundException.
 */
export const deletePublisher: API.OperationMethod<
  DeletePublisherRequest & RegionInput,
  DeletePublisherResponse,
  DeletePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<DeletePublisherRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DeletePublisherResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublisher",
  telemetry: TELEMETRY,
  span: "DeletePublisher",
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
  DeleteRegistryRequest & RegionInput,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<DeleteRegistryRequest>,
  output: __S(289, __c9, 1) as any as S.Schema<DeleteRegistryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistry",
  telemetry: TELEMETRY,
  span: "DeleteRegistry",
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
  DeleteRegistryRecordRequest & RegionInput,
  DeleteRegistryRecordResponse,
  DeleteRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<DeleteRegistryRecordRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DeleteRegistryRecordResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistryRecord",
  telemetry: TELEMETRY,
  span: "DeleteRegistryRecord",
}));

export type DisassociatePublisherError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove a registry record's publisher association and release its public identifier. A successful
 * call returns an empty response. Disassociating a registry record that has no association succeeds.
 * If another account created the association, the request fails with AccessDeniedException.
 */
export const disassociatePublisher: API.OperationMethod<
  DisassociatePublisherRequest & RegionInput,
  DisassociatePublisherResponse,
  DisassociatePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<DisassociatePublisherRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DisassociatePublisherResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePublisher",
  telemetry: TELEMETRY,
  span: "DisassociatePublisher",
}));

export type GetPublisherError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a publisher, including its verification status and the DNS challenge for its domain. If the
 * publisher ARN names your account and the publisher doesn't exist, the request fails with
 * ResourceNotFoundException.
 */
export const getPublisher: API.OperationMethod<
  GetPublisherRequest & RegionInput,
  Publisher,
  GetPublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<GetPublisherRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<Publisher>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublisher",
  telemetry: TELEMETRY,
  span: "GetPublisher",
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
  GetRegistryRequest & RegionInput,
  GetRegistryResponse,
  GetRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetRegistryRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<GetRegistryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistry",
  telemetry: TELEMETRY,
  span: "GetRegistry",
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
 * Retrieves the details of a registry record. The response describes the record's latest revision, including a revision that isn't approved yet. For a skill record, the operation also returns the skill package in `artifact` and the source that the registry last synchronized the skill from in `synchronizedSource`.
 */
export const getRegistryRecord: API.OperationMethod<
  GetRegistryRecordRequest & RegionInput,
  GetRegistryRecordResponse,
  GetRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<GetRegistryRecordRequest>,
  output: __S(517, __c16, 5) as any as S.Schema<GetRegistryRecordResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistryRecord",
  telemetry: TELEMETRY,
  span: "GetRegistryRecord",
}));

export type ListPublisherAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the registry record associations your account created. Pass publisherArn to list only the
 * associations for that publisher; omit it to list associations across all publishers. Results are
 * eventually consistent, so an association you just created or removed can take a few seconds to
 * appear in or disappear from the list.
 */
export const listPublisherAssociations: API.PaginatedOperationMethod<
  ListPublisherAssociationsRequest & RegionInput,
  ListPublisherAssociationsResponse,
  ListPublisherAssociationsError,
  Credentials | HttpClient.HttpClient,
  PublisherAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<ListPublisherAssociationsRequest>,
  output: __S(546, __c17, 2) as any as S.Schema<ListPublisherAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublisherAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPublisherAssociations",
})) as any;

export type ListPublishersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the publishers your account owns, followed by the ACTIVE publishers shared with your account.
 */
export const listPublishers: API.PaginatedOperationMethod<
  ListPublishersRequest & RegionInput,
  ListPublishersResponse,
  ListPublishersError,
  Credentials | HttpClient.HttpClient,
  PublisherSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<ListPublishersRequest>,
  output: __S(579, __c18, 3) as any as S.Schema<ListPublishersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublishers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPublishers",
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
  ListRegistriesRequest & RegionInput,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistrySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListRegistriesRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<ListRegistriesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRegistries",
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
  ListRegistryRecordsRequest & RegionInput,
  ListRegistryRecordsResponse,
  ListRegistryRecordsError,
  Credentials | HttpClient.HttpClient,
  RegistryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<ListRegistryRecordsRequest>,
  output: __S(677, __c21, 5) as any as S.Schema<ListRegistryRecordsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registryRecords",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRegistryRecords",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
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
  SubmitRegistryRecordForApprovalRequest & RegionInput,
  SubmitRegistryRecordForApprovalResponse,
  SubmitRegistryRecordForApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<SubmitRegistryRecordForApprovalRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<SubmitRegistryRecordForApprovalResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitRegistryRecordForApproval",
  telemetry: TELEMETRY,
  span: "SubmitRegistryRecordForApproval",
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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdatePublisherAssociationApprovalStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Record the curator's decision (APPROVED or REJECTED) on a registry record's publisher association.
 * A successful call returns an empty response. Repeating the decision the association already holds
 * changes nothing; the same approvalStatus with a different approvalStatusReason updates the reason.
 * If the caller has no publisher association for the registry record, the request fails with
 * AccessDeniedException. A ConflictException (HTTP 409) means the association is not in a state
 * that accepts the decision (e.g. not PENDING_APPROVAL/APPROVED/REJECTED) or it changed while the
 * request was being applied; read it again before deciding whether to resubmit.
 */
export const updatePublisherAssociationApprovalStatus: API.OperationMethod<
  UpdatePublisherAssociationApprovalStatusRequest & RegionInput,
  UpdatePublisherAssociationApprovalStatusResponse,
  UpdatePublisherAssociationApprovalStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<UpdatePublisherAssociationApprovalStatusRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<UpdatePublisherAssociationApprovalStatusResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublisherAssociationApprovalStatus",
  telemetry: TELEMETRY,
  span: "UpdatePublisherAssociationApprovalStatus",
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
  UpdateRegistryRequest & RegionInput,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(869, __c27, 5) as any as S.Schema<UpdateRegistryRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UpdateRegistryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegistry",
  telemetry: TELEMETRY,
  span: "UpdateRegistry",
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
 * Updates a registry record. The update is asynchronous: the operation returns the record with the `UPDATING` status while the registry processes it. If a GitHub user must first authorize access to the record's skill source, the operation returns the record with the `UPDATE_PENDING_AUTH` status instead. Fields that use update wrappers follow PATCH semantics: omit the field to leave it unchanged.
 */
export const updateRegistryRecord: API.OperationMethod<
  UpdateRegistryRecordRequest & RegionInput,
  UpdateRegistryRecordResponse,
  UpdateRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(957, __c29, 29) as any as S.Schema<UpdateRegistryRecordRequest>,
  output: __S(958, __c29, 30) as any as S.Schema<UpdateRegistryRecordResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegistryRecord",
  telemetry: TELEMETRY,
  span: "UpdateRegistryRecord",
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
  UpdateRegistryRecordStatusRequest & RegionInput,
  UpdateRegistryRecordStatusResponse,
  UpdateRegistryRecordStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<UpdateRegistryRecordStatusRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<UpdateRegistryRecordStatusResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegistryRecordStatus",
  telemetry: TELEMETRY,
  span: "UpdateRegistryRecordStatus",
}));

export type ValidatePublisherError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restart domain verification for a publisher in FAILED or SUSPENDED. The publisher returns to
 * ACTION_REQUIRED with a new domainChallenge, which the response includes. Update the DNS TXT record
 * with the new recordValue; the previous value no longer verifies the domain. The request fails with
 * ConflictException when the publisher is ACTIVE, verification is already in progress
 * (ACTION_REQUIRED), or the publisher is being deleted.
 */
export const validatePublisher: API.OperationMethod<
  ValidatePublisherRequest & RegionInput,
  ValidatePublisherResponse,
  ValidatePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<ValidatePublisherRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<ValidatePublisherResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidatePublisher",
  telemetry: TELEMETRY,
  span: "ValidatePublisher",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          encryptionConfiguration: S.optional(__S(96, __c3, 0)),
          discoveryConfiguration: S.optional(__S(64, __c2, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(1184, __c37, 0)),
          approvalConfiguration: S.optional(__S(98, __c3, 2)),
          customMetadataSchemaConfiguration: S.optional(__S(101, __c3, 5)),
          autoDetectionConfiguration: S.optional(__S(65, __c2, 1)),
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
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ matchValueString: S.String }),
        /*@__PURE__*/ S.Struct({ matchValueStringList: __S(1088, __c34, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ claimMatchValue: __S(32, __c1, 0), claimMatchOperator: S.String }),
      ).annotate({ identifier: "AuthorizingClaimMatchValueType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          inboundTokenClaimName: S.String,
          inboundTokenClaimValueType: S.String,
          authorizingClaimMatchValue: __S(33, __c1, 1),
        }),
      ).annotate({ identifier: "CustomClaimValidationType" });
    case 3:
      return S.Array(__S(34, __c1, 2));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ resourceConfigurationIdentifier: S.String })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          vpcIdentifier: S.String,
          subnetIds: __S(1088, __c34, 0),
          endpointIpAddressType: S.String,
          securityGroupIds: S.optional(__S(1088, __c34, 0)),
          tags: S.optional(__S(1184, __c37, 0)),
          routingDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedVpcResource" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ selfManagedLatticeResource: __S(36, __c1, 4) }),
        /*@__PURE__*/ S.Struct({ managedVpcResource: __S(37, __c1, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ domain: S.String, privateEndpoint: __S(38, __c1, 6) }),
      ).annotate({ identifier: "PrivateEndpointOverride" });
    case 8:
      return S.Array(__S(39, __c1, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          discoveryUrl: S.String,
          allowedAudience: S.optional(__S(1088, __c34, 0)),
          allowedClients: S.optional(__S(1088, __c34, 0)),
          allowedScopes: S.optional(__S(1088, __c34, 0)),
          customClaims: S.optional(__S(35, __c1, 3)),
          privateEndpoint: S.optional(__S(38, __c1, 6)),
          privateEndpointOverrides: S.optional(__S(40, __c1, 8)),
        }),
      ).annotate({ identifier: "CustomJWTAuthorizerConfiguration" });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ customJWTAuthorizer: __S(41, __c1, 9) })]);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizerConfiguration: S.optional(__S(42, __c1, 10)),
          authorizerType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiscoveryConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ scope: S.String, enabled: S.Boolean })).annotate({
        identifier: "AutoDetectionConfiguration",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyArn: S.String })).annotate({
        identifier: "EncryptionConfiguration",
      });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({ autoApprovalRules: S.optional(__S(97, __c3, 1)) }),
      ).annotate({ identifier: "ApprovalConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ recordType: S.String, schema: SensitiveString })).annotate({
        identifier: "RecordTypeSchemaOverride",
      });
    case 4:
      return S.Array(__S(99, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          defaultSchema: S.optional(SensitiveString),
          recordTypeSchemaOverrides: S.optional(__S(100, __c3, 4)),
        }),
      ).annotate({ identifier: "CustomMetadataSchemaConfiguration" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          recordType: S.String,
          descriptors: __S(179, __c5, 19),
          artifact: S.optional(__S(192, __c6, 0)),
          recordVersion: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          provenance: S.optional(__S(186, __c5, 26)),
          customMetadata: S.optional(S.Any),
          tags: S.optional(__S(1184, __c37, 0)),
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
      return S.suspend(() =>
        S.Struct({
          recordArn: S.String,
          status: S.String,
          authorizationData: S.optional(__S(194, __c6, 2)),
        }),
      ).annotate({ identifier: "CreateRegistryRecordResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ data: S.optional(SensitiveString), dataSchemaVersion: S.optional(S.String) }),
      ).annotate({ identifier: "McpToolsDescriptor" });
    case 1:
      return S.suspend(() => S.Struct({ tools: S.optional(__S(160, __c5, 0)) })).annotate({
        identifier: "McpServerAdditionalData",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          providerArn: S.String,
          grantType: S.optional(S.String),
          scopes: S.optional(__S(1088, __c34, 0)),
          customParameters: S.optional(__S(1184, __c37, 0)),
          returnUrl: S.optional(S.String),
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
        /*@__PURE__*/ S.Struct({ oauthCredentialProvider: __S(162, __c5, 2) }),
        /*@__PURE__*/ S.Struct({ iamCredentialProvider: __S(163, __c5, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({ credentialProviderType: S.String, credentialProvider: __S(164, __c5, 4) }),
      ).annotate({ identifier: "RegistryRecordCredentialProviderConfiguration" });
    case 6:
      return S.Array(__S(165, __c5, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          url: S.String,
          credentialProviderConfigurations: S.optional(__S(166, __c5, 6)),
        }),
      ).annotate({ identifier: "DescriptorSourceFromUrl" });
    case 8:
      return S.suspend(() => S.Struct({ fromUrl: S.optional(__S(167, __c5, 7)) })).annotate({
        identifier: "DescriptorSource",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          additionalData: S.optional(__S(161, __c5, 1)),
          source: S.optional(__S(168, __c5, 8)),
        }),
      ).annotate({ identifier: "McpServerDescriptor" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          source: S.optional(__S(168, __c5, 8)),
        }),
      ).annotate({ identifier: "A2aAgentCardDescriptor" });
    case 11:
      return S.suspend(() => S.Struct({ source: S.optional(__S(168, __c5, 8)) })).annotate({
        identifier: "AgentSkillsPackageDescriptor",
      });
    case 12:
      return S.suspend(() => S.Struct({ bucketOwnerAccountId: S.optional(S.String) })).annotate({
        identifier: "S3SourceConfiguration",
      });
    case 13:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(172, __c5, 12) })]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          skillMd: S.optional(__S(170, __c5, 10)),
          skillPackage: S.optional(__S(171, __c5, 11)),
          repositoryProvider: S.optional(S.String),
          sourceConfiguration: S.optional(__S(173, __c5, 13)),
        }),
      ).annotate({ identifier: "AgentSkillsAdditionalData" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          additionalData: S.optional(__S(174, __c5, 14)),
        }),
      ).annotate({ identifier: "AgentSkillsDefinitionDescriptor" });
    case 16:
      return S.suspend(() => S.Struct({ data: S.optional(SensitiveString) })).annotate({
        identifier: "CustomDescriptor",
      });
    case 17:
      return S.suspend(() => S.Struct({ category: S.optional(S.String) })).annotate({
        identifier: "SignatureAgentCardAdditionalData",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          source: S.optional(__S(168, __c5, 8)),
          additionalData: S.optional(__S(177, __c5, 17)),
        }),
      ).annotate({ identifier: "SignatureAgentCardDescriptor" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          mcpServer: S.optional(__S(169, __c5, 9)),
          a2aAgentCard: S.optional(__S(170, __c5, 10)),
          agentSkillsDefinition: S.optional(__S(175, __c5, 15)),
          custom: S.optional(__S(176, __c5, 16)),
          http: S.optional(__S(171, __c5, 11)),
          agui: S.optional(__S(171, __c5, 11)),
          signatureAgentCard: S.optional(__S(178, __c5, 18)),
        }),
      ).annotate({ identifier: "Descriptors" });
    case 20:
      return S.suspend(() => S.Struct({ serverProtocol: S.optional(S.String) })).annotate({
        identifier: "AgentCoreRuntimeProtocolConfiguration",
      });
    case 21:
      return S.suspend(() => S.Struct({ workloadIdentityArn: S.String })).annotate({
        identifier: "WorkloadIdentityDetails",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          protocolConfiguration: S.optional(__S(180, __c5, 20)),
          authorizerConfiguration: S.optional(__S(42, __c1, 10)),
          workloadIdentityDetails: S.optional(__S(181, __c5, 21)),
        }),
      ).annotate({ identifier: "AgentCoreRuntimeSourceDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          protocolType: S.optional(S.String),
          authorizerType: S.optional(S.String),
          authorizerConfiguration: S.optional(__S(42, __c1, 10)),
          workloadIdentityDetails: S.optional(__S(181, __c5, 21)),
        }),
      ).annotate({ identifier: "AgentCoreGatewaySourceDetails" });
    case 24:
      return S.Union([
        /*@__PURE__*/ S.Struct({ agentcoreRuntime: __S(182, __c5, 22) }),
        /*@__PURE__*/ S.Struct({ agentcoreGateway: __S(183, __c5, 23) }),
      ]);
    case 25:
      return S.suspend(() =>
        S.Struct({
          relation: S.String,
          sourceId: S.String,
          sourceType: S.optional(S.String),
          sourceDetails: S.optional(__S(184, __c5, 24)),
        }),
      ).annotate({ identifier: "Provenance" });
    case 26:
      return S.Array(__S(185, __c5, 25));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ content: SensitiveBlob, sha256: S.optional(S.String) }),
      ).annotate({ identifier: "RegistryRecordArtifactUpload" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          authorizationUrl: SensitiveString,
          userId: S.optional(SensitiveString),
          authorizationAttemptId: S.optional(S.String),
          expiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "OAuth2AuthorizationData" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ oauth2: __S(193, __c6, 1) })]);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ publisherArn: S.String.pipe(T.HttpLabel("publisherArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/publishers/{publisherArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePublisherRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeletePublisherResponse" });
  }
}
function __c9(j: number): any {
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
function __c10(j: number): any {
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
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recordArn: S.String.pipe(T.HttpLabel("recordArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/associations/{recordArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociatePublisherRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ publisherArn: S.String.pipe(T.HttpLabel("publisherArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/publishers/{publisherArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPublisherRequest" });
  }
}
function __c13(j: number): any {
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
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configuration: __S(65, __c2, 1),
          status: S.String,
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoDetection" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          registryId: S.String,
          registryArn: S.String,
          discoveryConfiguration: S.optional(__S(64, __c2, 0)),
          encryptionConfiguration: S.optional(__S(96, __c3, 0)),
          approvalConfiguration: S.optional(__S(98, __c3, 2)),
          customMetadataSchemaConfiguration: S.optional(__S(101, __c3, 5)),
          status: S.String,
          statusReason: S.optional(S.String),
          autoDetection: S.optional(__S(448, __c14, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetRegistryResponse" });
  }
}
function __c16(j: number): any {
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
    case 1:
      return S.suspend(() =>
        S.Struct({ sha256: S.optional(S.String), downloadUrl: S.optional(SensitiveString) }),
      ).annotate({ identifier: "RegistryRecordArtifactDownload" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          url: SensitiveString,
          synchronizedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          versionId: S.optional(S.String),
          eTag: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3SynchronizedSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          url: SensitiveString,
          synchronizedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          commitId: S.String,
        }),
      ).annotate({ identifier: "GitHubSynchronizedSource" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3: __S(514, __c16, 2) }),
        /*@__PURE__*/ S.Struct({ gitHub: __S(515, __c16, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          recordType: S.String,
          descriptors: S.optional(__S(179, __c5, 19)),
          recordVersion: S.optional(S.String),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          statusReason: S.optional(S.String),
          provenance: S.optional(__S(186, __c5, 26)),
          createdByAutoDetection: S.optional(S.Boolean),
          createdBy: S.optional(S.String),
          customMetadata: S.optional(S.Any),
          customMetadataSchemaComplianceStatus: S.optional(S.String),
          artifact: S.optional(__S(513, __c16, 1)),
          synchronizedSource: S.optional(__S(516, __c16, 4)),
        }),
      ).annotate({ identifier: "GetRegistryRecordResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          publisherArn: S.optional(S.String).pipe(T.HttpQuery("publisherArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/associations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPublisherAssociationsRequest" });
    case 1:
      return S.Array(__S(1120, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(545, __c17, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPublisherAssociationsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/publishers" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPublishersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          value: __S(1216, __c38, 0),
          identifierType: S.optional(S.String),
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          publisherArn: S.String,
          associationCount: S.optional(S.Number),
          pendingAssociationApprovalCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PublisherSummary" });
    case 2:
      return S.Array(__S(577, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(578, __c18, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPublishersResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(641, __c20, 1)),
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
          discoveryConfiguration: S.optional(__S(64, __c2, 0)),
          status: S.String,
          statusReason: S.optional(S.String),
          autoDetection: S.optional(__S(448, __c14, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "RegistrySummary" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ registries: __S(610, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegistriesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(1088, __c34, 0) })).annotate({
        identifier: "RegistryFilter",
      });
    case 1:
      return S.Array(__S(640, __c20, 0));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(641, __c20, 1)),
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
      return S.Array(__S(673, __c21, 1));
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
          provenanceSummaryList: S.optional(__S(674, __c21, 2)),
          customMetadataSchemaComplianceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegistryRecordSummary" });
    case 4:
      return S.Array(__S(675, __c21, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ registryRecords: __S(676, __c21, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRegistryRecordsResponse" });
  }
}
function __c22(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(1184, __c37, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c23(j: number): any {
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(1184, __c37, 0),
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1088, __c34, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recordArn: S.String.pipe(T.HttpLabel("recordArn")),
          approvalStatus: S.String,
          approvalStatusReason: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/associations/{recordArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePublisherAssociationApprovalStatusRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(42, __c1, 10)) })).annotate({
        identifier: "UpdatedAuthorizerConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ authorizerConfiguration: S.optional(__S(864, __c27, 0)) }),
      ).annotate({ identifier: "UpdatedDiscoveryConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(98, __c3, 2)) })).annotate({
        identifier: "UpdatedApprovalConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(101, __c3, 5)) })).annotate({
        identifier: "UpdatedCustomMetadataSchemaConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(65, __c2, 1)) })).annotate({
        identifier: "UpdatedAutoDetectionConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          name: S.optional(S.String),
          description: S.optional(__S(896, __c28, 0)),
          discoveryConfiguration: S.optional(__S(865, __c27, 1)),
          approvalConfiguration: S.optional(__S(866, __c27, 2)),
          customMetadataSchemaConfiguration: S.optional(__S(867, __c27, 3)),
          autoDetectionConfiguration: S.optional(__S(868, __c27, 4)),
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(SensitiveString) })).annotate({
        identifier: "UpdatedDescription",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(S.String) })).annotate({
        identifier: "UpdatedDisplayName",
      });
    case 1:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(168, __c5, 8)) })).annotate({
        identifier: "UpdatedDescriptorSource",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(896, __c28, 0)),
          dataSchemaVersion: S.optional(__S(928, __c29, 0)),
        }),
      ).annotate({ identifier: "UpdatedMcpToolsDescriptorFields" });
    case 3:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(930, __c29, 2)) })).annotate({
        identifier: "UpdatedMcpToolsDescriptor",
      });
    case 4:
      return S.suspend(() => S.Struct({ tools: S.optional(__S(931, __c29, 3)) })).annotate({
        identifier: "UpdatedMcpServerAdditionalDataFields",
      });
    case 5:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(932, __c29, 4)) })).annotate({
        identifier: "UpdatedMcpServerAdditionalData",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(896, __c28, 0)),
          dataSchemaVersion: S.optional(__S(928, __c29, 0)),
          source: S.optional(__S(929, __c29, 1)),
          additionalData: S.optional(__S(933, __c29, 5)),
        }),
      ).annotate({ identifier: "UpdatedMcpServerDescriptorFields" });
    case 7:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(934, __c29, 6)) })).annotate({
        identifier: "UpdatedMcpServerDescriptor",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(896, __c28, 0)),
          dataSchemaVersion: S.optional(__S(928, __c29, 0)),
          source: S.optional(__S(929, __c29, 1)),
        }),
      ).annotate({ identifier: "UpdatedA2aAgentCardDescriptorFields" });
    case 9:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(936, __c29, 8)) })).annotate({
        identifier: "UpdatedA2aAgentCardDescriptor",
      });
    case 10:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(171, __c5, 11)) })).annotate({
        identifier: "UpdatedAgentSkillsPackageDescriptor",
      });
    case 11:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(S.String) })).annotate({
        identifier: "UpdatedAgentSkillsRepositoryProvider",
      });
    case 12:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(173, __c5, 13)) })).annotate({
        identifier: "UpdatedAgentSkillsSourceConfiguration",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          skillMd: S.optional(__S(937, __c29, 9)),
          skillPackage: S.optional(__S(938, __c29, 10)),
          repositoryProvider: S.optional(__S(939, __c29, 11)),
          sourceConfiguration: S.optional(__S(940, __c29, 12)),
        }),
      ).annotate({ identifier: "UpdatedAgentSkillsAdditionalDataFields" });
    case 14:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(941, __c29, 13)) })).annotate(
        { identifier: "UpdatedAgentSkillsAdditionalData" },
      );
    case 15:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(896, __c28, 0)),
          dataSchemaVersion: S.optional(__S(928, __c29, 0)),
          additionalData: S.optional(__S(942, __c29, 14)),
        }),
      ).annotate({ identifier: "UpdatedAgentSkillsDefinitionDescriptorFields" });
    case 16:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(943, __c29, 15)) })).annotate(
        { identifier: "UpdatedAgentSkillsDefinitionDescriptor" },
      );
    case 17:
      return S.suspend(() => S.Struct({ data: S.optional(__S(896, __c28, 0)) })).annotate({
        identifier: "UpdatedCustomDescriptorFields",
      });
    case 18:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(945, __c29, 17)) })).annotate(
        { identifier: "UpdatedCustomDescriptor" },
      );
    case 19:
      return S.suspend(() => S.Struct({ source: S.optional(__S(929, __c29, 1)) })).annotate({
        identifier: "UpdatedHttpDescriptorFields",
      });
    case 20:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(947, __c29, 19)) })).annotate(
        { identifier: "UpdatedHttpDescriptor" },
      );
    case 21:
      return S.suspend(() => S.Struct({ category: S.optional(__S(939, __c29, 11)) })).annotate({
        identifier: "UpdatedSignatureAgentCardAdditionalDataFields",
      });
    case 22:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(949, __c29, 21)) })).annotate(
        { identifier: "UpdatedSignatureAgentCardAdditionalData" },
      );
    case 23:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(__S(896, __c28, 0)),
          dataSchemaVersion: S.optional(__S(928, __c29, 0)),
          source: S.optional(__S(929, __c29, 1)),
          additionalData: S.optional(__S(950, __c29, 22)),
        }),
      ).annotate({ identifier: "UpdatedSignatureAgentCardDescriptorFields" });
    case 24:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(951, __c29, 23)) })).annotate(
        { identifier: "UpdatedSignatureAgentCardDescriptor" },
      );
    case 25:
      return S.suspend(() =>
        S.Struct({
          mcpServer: S.optional(__S(935, __c29, 7)),
          a2aAgentCard: S.optional(__S(937, __c29, 9)),
          agentSkillsDefinition: S.optional(__S(944, __c29, 16)),
          custom: S.optional(__S(946, __c29, 18)),
          http: S.optional(__S(948, __c29, 20)),
          agui: S.optional(__S(948, __c29, 20)),
          signatureAgentCard: S.optional(__S(952, __c29, 24)),
        }),
      ).annotate({ identifier: "UpdatedDescriptorsFields" });
    case 26:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(953, __c29, 25)) })).annotate(
        { identifier: "UpdatedDescriptors" },
      );
    case 27:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(__S(192, __c6, 0)) })).annotate({
        identifier: "UpdatedRegistryRecordArtifact",
      });
    case 28:
      return S.suspend(() => S.Struct({ optionalValue: S.optional(S.Any) })).annotate({
        identifier: "UpdatedCustomMetadataMap",
      });
    case 29:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          recordId: S.String.pipe(T.HttpLabel("recordId")),
          name: S.optional(S.String),
          displayName: S.optional(__S(928, __c29, 0)),
          description: S.optional(__S(896, __c28, 0)),
          recordType: S.optional(S.String),
          descriptors: S.optional(__S(954, __c29, 26)),
          artifact: S.optional(__S(955, __c29, 27)),
          recordVersion: S.optional(S.String),
          customMetadata: S.optional(__S(956, __c29, 28)),
          triggerSynchronization: S.optional(S.Boolean),
          forceAuthentication: S.optional(S.Boolean),
          provenance: S.optional(__S(186, __c5, 26)),
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
    case 30:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(SensitiveString),
          recordType: S.String,
          descriptors: S.optional(__S(179, __c5, 19)),
          recordVersion: S.optional(S.String),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          statusReason: S.optional(S.String),
          provenance: S.optional(__S(186, __c5, 26)),
          createdByAutoDetection: S.optional(S.Boolean),
          createdBy: S.optional(S.String),
          customMetadata: S.optional(S.Any),
          customMetadataSchemaComplianceStatus: S.optional(S.String),
          authorizationData: S.optional(__S(194, __c6, 2)),
        }),
      ).annotate({ identifier: "UpdateRegistryRecordResponse" });
  }
}
function __c30(j: number): any {
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ publisherArn: S.String.pipe(T.HttpLabel("publisherArn")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/publishers/{publisherArn}/verification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidatePublisherRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1024, __c32, 0));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recordArn: S.String,
          publisherArn: S.String,
          subdomain: S.optional(S.String),
          categories: S.optional(__S(1088, __c34, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/associations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociatePublisherRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recordArn: S.String,
          publicIdentifier: S.String,
          publisher: S.String,
          status: S.String,
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatePublisherResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          value: __S(1216, __c38, 0),
          tags: S.optional(__S(1184, __c37, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/publishers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePublisherRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ domain: S.String })]);
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ recordName: S.String, recordValue: S.String })).annotate({
        identifier: "DomainChallenge",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          value: __S(1216, __c38, 0),
          identifierType: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          domainChallenge: S.optional(__S(1248, __c39, 0)),
          tags: S.optional(__S(1184, __c37, 0)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          publisherArn: S.String,
        }),
      ).annotate({ identifier: "CreatePublisherResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
