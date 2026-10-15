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
  sdkId: "CodeStar connections",
  serviceShapeName: "CodeStar_connections_20191201",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codestar-connections" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://codestar-connections-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codestar-connections-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codestar-connections.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://codestar-connections.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codestar-connections.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConditionalCheckFailedException
  extends /*@__PURE__*/ S.TaggedError<ConditionalCheckFailedException>()(
    "ConditionalCheckFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RetryLatestCommitFailedException
  extends /*@__PURE__*/ S.TaggedError<RetryLatestCommitFailedException>()(
    "RetryLatestCommitFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class SyncBlockerDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<SyncBlockerDoesNotExistException>()(
    "SyncBlockerDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SyncConfigurationStillExistsException
  extends /*@__PURE__*/ S.TaggedError<SyncConfigurationStillExistsException>()(
    "SyncConfigurationStillExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedProviderTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedProviderTypeException>()(
    "UnsupportedProviderTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UpdateOutOfSyncException
  extends /*@__PURE__*/ S.TaggedError<UpdateOutOfSyncException>()(
    "UpdateOutOfSyncException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export type ProviderType =
  | "Bitbucket"
  | "GitHub"
  | "GitHubEnterpriseServer"
  | "GitLab"
  | "GitLabSelfManaged"
  | (string & {});
export type ConnectionName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type HostArn = string;
export interface CreateConnectionInput {
  ProviderType?: ProviderType;
  ConnectionName: string;
  Tags?: Tag[];
  HostArn?: string;
}
export type ConnectionArn = string;
export interface CreateConnectionOutput {
  ConnectionArn: string;
  Tags?: Tag[];
}
export type HostName = string;
export type Url = string;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type TlsCertificate = string;
export interface VpcConfiguration {
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
  TlsCertificate?: string;
}
export interface CreateHostInput {
  Name: string;
  ProviderType: ProviderType;
  ProviderEndpoint: string;
  VpcConfiguration?: VpcConfiguration;
  Tags?: Tag[];
}
export interface CreateHostOutput {
  HostArn?: string;
  Tags?: Tag[];
}
export type OwnerId = string;
export type RepositoryName = string;
export type KmsKeyArn = string;
export interface CreateRepositoryLinkInput {
  ConnectionArn: string;
  OwnerId: string;
  RepositoryName: string;
  EncryptionKeyArn?: string;
  Tags?: Tag[];
}
export type RepositoryLinkArn = string;
export type RepositoryLinkId = string;
export interface RepositoryLinkInfo {
  ConnectionArn: string;
  EncryptionKeyArn?: string;
  OwnerId: string;
  ProviderType: ProviderType;
  RepositoryLinkArn: string;
  RepositoryLinkId: string;
  RepositoryName: string;
}
export interface CreateRepositoryLinkOutput {
  RepositoryLinkInfo: RepositoryLinkInfo;
}
export type BranchName = string;
export type DeploymentFilePath = string;
export type ResourceName = string;
export type IamRoleArn = string;
export type SyncConfigurationType = "CFN_STACK_SYNC" | (string & {});
export type PublishDeploymentStatus = "ENABLED" | "DISABLED" | (string & {});
export type TriggerResourceUpdateOn = "ANY_CHANGE" | "FILE_CHANGE" | (string & {});
export interface CreateSyncConfigurationInput {
  Branch: string;
  ConfigFile: string;
  RepositoryLinkId: string;
  ResourceName: string;
  RoleArn: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
}
export interface SyncConfiguration {
  Branch: string;
  ConfigFile?: string;
  OwnerId: string;
  ProviderType: ProviderType;
  RepositoryLinkId: string;
  RepositoryName: string;
  ResourceName: string;
  RoleArn: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
}
export interface CreateSyncConfigurationOutput {
  SyncConfiguration: SyncConfiguration;
}
export interface DeleteConnectionInput {
  ConnectionArn: string;
}
export interface DeleteConnectionOutput {}
export interface DeleteHostInput {
  HostArn: string;
}
export interface DeleteHostOutput {}
export interface DeleteRepositoryLinkInput {
  RepositoryLinkId: string;
}
export interface DeleteRepositoryLinkOutput {}
export interface DeleteSyncConfigurationInput {
  SyncType: SyncConfigurationType;
  ResourceName: string;
}
export interface DeleteSyncConfigurationOutput {}
export interface GetConnectionInput {
  ConnectionArn: string;
}
export type AccountId = string;
export type ConnectionStatus = "PENDING" | "AVAILABLE" | "ERROR" | (string & {});
export interface Connection {
  ConnectionName?: string;
  ConnectionArn?: string;
  ProviderType?: ProviderType;
  OwnerAccountId?: string;
  ConnectionStatus?: ConnectionStatus;
  HostArn?: string;
}
export interface GetConnectionOutput {
  Connection?: Connection;
}
export interface GetHostInput {
  HostArn: string;
}
export type HostStatus = string;
export interface GetHostOutput {
  Name?: string;
  Status?: string;
  ProviderType?: ProviderType;
  ProviderEndpoint?: string;
  VpcConfiguration?: VpcConfiguration;
}
export interface GetRepositoryLinkInput {
  RepositoryLinkId: string;
}
export interface GetRepositoryLinkOutput {
  RepositoryLinkInfo: RepositoryLinkInfo;
}
export interface GetRepositorySyncStatusInput {
  Branch: string;
  RepositoryLinkId: string;
  SyncType: SyncConfigurationType;
}
export type RepositorySyncStatus =
  | "FAILED"
  | "INITIATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "QUEUED"
  | (string & {});
export type Event = string;
export type ExternalId = string;
export type Type = string;
export interface RepositorySyncEvent {
  Event: string;
  ExternalId?: string;
  Time: Date;
  Type: string;
}
export type RepositorySyncEventList = RepositorySyncEvent[];
export interface RepositorySyncAttempt {
  StartedAt: Date;
  Status: RepositorySyncStatus;
  Events: RepositorySyncEvent[];
}
export interface GetRepositorySyncStatusOutput {
  LatestSync: RepositorySyncAttempt;
}
export interface GetResourceSyncStatusInput {
  ResourceName: string;
  SyncType: SyncConfigurationType;
}
export type Directory = string;
export type SHA = string;
export interface Revision {
  Branch: string;
  Directory: string;
  OwnerId: string;
  RepositoryName: string;
  ProviderType: ProviderType;
  Sha: string;
}
export interface ResourceSyncEvent {
  Event: string;
  ExternalId?: string;
  Time: Date;
  Type: string;
}
export type ResourceSyncEventList = ResourceSyncEvent[];
export type ResourceSyncStatus =
  | "FAILED"
  | "INITIATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | (string & {});
export type Target = string;
export interface ResourceSyncAttempt {
  Events: ResourceSyncEvent[];
  InitialRevision: Revision;
  StartedAt: Date;
  Status: ResourceSyncStatus;
  TargetRevision: Revision;
  Target: string;
}
export interface GetResourceSyncStatusOutput {
  DesiredState?: Revision;
  LatestSuccessfulSync?: ResourceSyncAttempt;
  LatestSync: ResourceSyncAttempt;
}
export interface GetSyncBlockerSummaryInput {
  SyncType: SyncConfigurationType;
  ResourceName: string;
}
export type Id = string;
export type BlockerType = "AUTOMATED" | (string & {});
export type BlockerStatus = "ACTIVE" | "RESOLVED" | (string & {});
export type CreatedReason = string;
export type SyncBlockerContextKey = string;
export type SyncBlockerContextValue = string;
export interface SyncBlockerContext {
  Key: string;
  Value: string;
}
export type SyncBlockerContextList = SyncBlockerContext[];
export type ResolvedReason = string;
export interface SyncBlocker {
  Id: string;
  Type: BlockerType;
  Status: BlockerStatus;
  CreatedReason: string;
  CreatedAt: Date;
  Contexts?: SyncBlockerContext[];
  ResolvedReason?: string;
  ResolvedAt?: Date;
}
export type LatestSyncBlockerList = SyncBlocker[];
export interface SyncBlockerSummary {
  ResourceName: string;
  ParentResourceName?: string;
  LatestBlockers?: SyncBlocker[];
}
export interface GetSyncBlockerSummaryOutput {
  SyncBlockerSummary: SyncBlockerSummary;
}
export interface GetSyncConfigurationInput {
  SyncType: SyncConfigurationType;
  ResourceName: string;
}
export interface GetSyncConfigurationOutput {
  SyncConfiguration: SyncConfiguration;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListConnectionsInput {
  ProviderTypeFilter?: ProviderType;
  HostArnFilter?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ConnectionList = Connection[];
export interface ListConnectionsOutput {
  Connections?: Connection[];
  NextToken?: string;
}
export interface ListHostsInput {
  MaxResults?: number;
  NextToken?: string;
}
export type HostStatusMessage = string;
export interface Host {
  Name?: string;
  HostArn?: string;
  ProviderType?: ProviderType;
  ProviderEndpoint?: string;
  VpcConfiguration?: VpcConfiguration;
  Status?: string;
  StatusMessage?: string;
}
export type HostList = Host[];
export interface ListHostsOutput {
  Hosts?: Host[];
  NextToken?: string;
}
export type SharpNextToken = string;
export interface ListRepositoryLinksInput {
  MaxResults?: number;
  NextToken?: string;
}
export type RepositoryLinkList = RepositoryLinkInfo[];
export interface ListRepositoryLinksOutput {
  RepositoryLinks: RepositoryLinkInfo[];
  NextToken?: string;
}
export interface ListRepositorySyncDefinitionsInput {
  RepositoryLinkId: string;
  SyncType: SyncConfigurationType;
}
export type Parent = string;
export interface RepositorySyncDefinition {
  Branch: string;
  Directory: string;
  Parent: string;
  Target: string;
}
export type RepositorySyncDefinitionList = RepositorySyncDefinition[];
export interface ListRepositorySyncDefinitionsOutput {
  RepositorySyncDefinitions: RepositorySyncDefinition[];
  NextToken?: string;
}
export interface ListSyncConfigurationsInput {
  MaxResults?: number;
  NextToken?: string;
  RepositoryLinkId: string;
  SyncType: SyncConfigurationType;
}
export type SyncConfigurationList = SyncConfiguration[];
export interface ListSyncConfigurationsOutput {
  SyncConfigurations: SyncConfiguration[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateHostInput {
  HostArn: string;
  ProviderEndpoint?: string;
  VpcConfiguration?: VpcConfiguration;
}
export interface UpdateHostOutput {}
export interface UpdateRepositoryLinkInput {
  ConnectionArn?: string;
  EncryptionKeyArn?: string;
  RepositoryLinkId: string;
}
export interface UpdateRepositoryLinkOutput {
  RepositoryLinkInfo: RepositoryLinkInfo;
}
export interface UpdateSyncBlockerInput {
  Id: string;
  SyncType: SyncConfigurationType;
  ResourceName: string;
  ResolvedReason: string;
}
export interface UpdateSyncBlockerOutput {
  ResourceName: string;
  ParentResourceName?: string;
  SyncBlocker: SyncBlocker;
}
export interface UpdateSyncConfigurationInput {
  Branch?: string;
  ConfigFile?: string;
  RepositoryLinkId?: string;
  ResourceName: string;
  RoleArn?: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
}
export interface UpdateSyncConfigurationOutput {
  SyncConfiguration: SyncConfiguration;
}
export type ErrorMessage = string;
export type CreateConnectionError =
  | LimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Creates a connection that can then be given to other Amazon Web Services services like CodePipeline so
 * that it can access third-party code repositories. The connection is in pending status until
 * the third-party connection handshake is completed from the console.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionInput,
  CreateConnectionOutput,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateConnectionInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateConnectionOutput>,
  errors: [LimitExceededException, ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

export type CreateHostError = LimitExceededException | CommonErrors;
/**
 * Creates a resource that represents the infrastructure where a third-party provider is
 * installed. The host is used when you create connections to an installed third-party provider
 * type, such as GitHub Enterprise Server. You create one host for all connections to that
 * provider.
 *
 * A host created through the CLI or the SDK is in `PENDING` status by
 * default. You can make its status `AVAILABLE` by setting up the host in the console.
 */
export const createHost: API.OperationMethod<
  CreateHostInput,
  CreateHostOutput,
  CreateHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<CreateHostInput>,
  output: __S(9, __c2, 1) as any as S.Schema<CreateHostOutput>,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHost",
}));

export type CreateRepositoryLinkError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a link to a specified external Git repository. A repository link allows Git sync to monitor and sync changes to files in a specified Git repository.
 */
export const createRepositoryLink: API.OperationMethod<
  CreateRepositoryLinkInput,
  CreateRepositoryLinkOutput,
  CreateRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<CreateRepositoryLinkInput>,
  output: __S(28, __c7, 0) as any as S.Schema<CreateRepositoryLinkOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepositoryLink",
}));

export type CreateSyncConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a sync configuration which allows Amazon Web Services to sync content from a Git
 * repository to update a specified Amazon Web Services resource. Parameters for the sync
 * configuration are determined by the sync type.
 */
export const createSyncConfiguration: API.OperationMethod<
  CreateSyncConfigurationInput,
  CreateSyncConfigurationOutput,
  CreateSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<CreateSyncConfigurationInput>,
  output: __S(40, __c10, 0) as any as S.Schema<CreateSyncConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSyncConfiguration",
}));

export type DeleteConnectionError = ResourceNotFoundException | CommonErrors;
/**
 * The connection to be deleted.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionInput,
  DeleteConnectionOutput,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<DeleteConnectionInput>,
  output: __S(48, __c12, 0) as any as S.Schema<DeleteConnectionOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteHostError =
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * The host to be deleted. Before you delete a host, all connections associated to the host must be deleted.
 *
 * A host cannot be deleted if it is in the VPC_CONFIG_INITIALIZING or VPC_CONFIG_DELETING state.
 */
export const deleteHost: API.OperationMethod<
  DeleteHostInput,
  DeleteHostOutput,
  DeleteHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<DeleteHostInput>,
  output: __S(48, __c12, 0) as any as S.Schema<DeleteHostOutput>,
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHost",
}));

export type DeleteRepositoryLinkError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | SyncConfigurationStillExistsException
  | ThrottlingException
  | UnsupportedProviderTypeException
  | CommonErrors;
/**
 * Deletes the association between your connection and a specified external Git repository.
 */
export const deleteRepositoryLink: API.OperationMethod<
  DeleteRepositoryLinkInput,
  DeleteRepositoryLinkOutput,
  DeleteRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<DeleteRepositoryLinkInput>,
  output: __S(48, __c12, 0) as any as S.Schema<DeleteRepositoryLinkOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    SyncConfigurationStillExistsException,
    ThrottlingException,
    UnsupportedProviderTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepositoryLink",
}));

export type DeleteSyncConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the sync configuration for a specified repository and connection.
 */
export const deleteSyncConfiguration: API.OperationMethod<
  DeleteSyncConfigurationInput,
  DeleteSyncConfigurationOutput,
  DeleteSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<DeleteSyncConfigurationInput>,
  output: __S(48, __c12, 0) as any as S.Schema<DeleteSyncConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSyncConfiguration",
}));

export type GetConnectionError =
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
/**
 * Returns the connection ARN and details such as status, owner, and provider type.
 */
export const getConnection: API.OperationMethod<
  GetConnectionInput,
  GetConnectionOutput,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<GetConnectionInput>,
  output: __S(65, __c16, 1) as any as S.Schema<GetConnectionOutput>,
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetHostError = ResourceNotFoundException | ResourceUnavailableException | CommonErrors;
/**
 * Returns the host ARN and details such as status, provider type, endpoint, and, if
 * applicable, the VPC configuration.
 */
export const getHost: API.OperationMethod<
  GetHostInput,
  GetHostOutput,
  GetHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c18, 0) as any as S.Schema<GetHostInput>,
  output: __S(73, __c18, 1) as any as S.Schema<GetHostOutput>,
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHost",
}));

export type GetRepositoryLinkError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns details about a repository link. A repository link allows Git sync to monitor
 * and sync changes from files in a specified Git repository.
 */
export const getRepositoryLink: API.OperationMethod<
  GetRepositoryLinkInput,
  GetRepositoryLinkOutput,
  GetRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(76, __c19, 0) as any as S.Schema<GetRepositoryLinkInput>,
  output: __S(28, __c7, 0) as any as S.Schema<GetRepositoryLinkOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryLink",
}));

export type GetRepositorySyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns details about the sync status for a repository. A repository sync uses Git sync
 * to push and pull changes from your remote repository.
 */
export const getRepositorySyncStatus: API.OperationMethod<
  GetRepositorySyncStatusInput,
  GetRepositorySyncStatusOutput,
  GetRepositorySyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c20, 0) as any as S.Schema<GetRepositorySyncStatusInput>,
  output: __S(82, __c20, 2) as any as S.Schema<GetRepositorySyncStatusOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositorySyncStatus",
}));

export type GetResourceSyncStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the status of the sync with the Git repository for a specific Amazon Web Services
 * resource.
 */
export const getResourceSyncStatus: API.OperationMethod<
  GetResourceSyncStatusInput,
  GetResourceSyncStatusOutput,
  GetResourceSyncStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<GetResourceSyncStatusInput>,
  output: __S(91, __c22, 3) as any as S.Schema<GetResourceSyncStatusOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSyncStatus",
}));

export type GetSyncBlockerSummaryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of the most recent sync blockers.
 */
export const getSyncBlockerSummary: API.OperationMethod<
  GetSyncBlockerSummaryInput,
  GetSyncBlockerSummaryOutput,
  GetSyncBlockerSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(92, __c23, 0) as any as S.Schema<GetSyncBlockerSummaryInput>,
  output: __S(95, __c23, 3) as any as S.Schema<GetSyncBlockerSummaryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSyncBlockerSummary",
}));

export type GetSyncConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns details about a sync configuration, including the sync type and resource name. A sync configuration allows the configuration to sync (push and pull) changes from the remote repository for a specified branch in a Git repository.
 */
export const getSyncConfiguration: API.OperationMethod<
  GetSyncConfigurationInput,
  GetSyncConfigurationOutput,
  GetSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(100, __c25, 0) as any as S.Schema<GetSyncConfigurationInput>,
  output: __S(40, __c10, 0) as any as S.Schema<GetSyncConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSyncConfiguration",
}));

export type ListConnectionsError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the connections associated with your account.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsInput,
  ListConnectionsOutput,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(104, __c26, 0) as any as S.Schema<ListConnectionsInput>,
  output: __S(106, __c26, 2) as any as S.Schema<ListConnectionsOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHostsError = CommonErrors;
/**
 * Lists the hosts associated with your account.
 */
export const listHosts: API.PaginatedOperationMethod<
  ListHostsInput,
  ListHostsOutput,
  ListHostsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(108, __c27, 0) as any as S.Schema<ListHostsInput>,
  output: __S(111, __c27, 3) as any as S.Schema<ListHostsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHosts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRepositoryLinksError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the repository links created for connections in your account.
 */
export const listRepositoryLinks: API.PaginatedOperationMethod<
  ListRepositoryLinksInput,
  ListRepositoryLinksOutput,
  ListRepositoryLinksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c28, 0) as any as S.Schema<ListRepositoryLinksInput>,
  output: __S(114, __c28, 2) as any as S.Schema<ListRepositoryLinksOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositoryLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRepositorySyncDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the repository sync definitions for repository links in your account.
 */
export const listRepositorySyncDefinitions: API.OperationMethod<
  ListRepositorySyncDefinitionsInput,
  ListRepositorySyncDefinitionsOutput,
  ListRepositorySyncDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(116, __c29, 0) as any as S.Schema<ListRepositorySyncDefinitionsInput>,
  output: __S(119, __c29, 3) as any as S.Schema<ListRepositorySyncDefinitionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositorySyncDefinitions",
}));

export type ListSyncConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of sync configurations for a specified repository.
 */
export const listSyncConfigurations: API.PaginatedOperationMethod<
  ListSyncConfigurationsInput,
  ListSyncConfigurationsOutput,
  ListSyncConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c30, 0) as any as S.Schema<ListSyncConfigurationsInput>,
  output: __S(122, __c30, 2) as any as S.Schema<ListSyncConfigurationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyncConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Gets the set of key-value pairs (metadata) that are used to manage the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(124, __c31, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(125, __c31, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError = LimitExceededException | ResourceNotFoundException | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata that can be used
 * to manage a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c32, 0) as any as S.Schema<TagResourceInput>,
  output: __S(48, __c12, 0) as any as S.Schema<TagResourceOutput>,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(132, __c33, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(48, __c12, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateHostError =
  | ConflictException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates a specified host with the provided configurations.
 */
export const updateHost: API.OperationMethod<
  UpdateHostInput,
  UpdateHostOutput,
  UpdateHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c34, 0) as any as S.Schema<UpdateHostInput>,
  output: __S(48, __c12, 0) as any as S.Schema<UpdateHostOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHost",
}));

export type UpdateRepositoryLinkError =
  | AccessDeniedException
  | ConditionalCheckFailedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | UpdateOutOfSyncException
  | CommonErrors;
/**
 * Updates the association between your connection and a specified external Git repository.
 * A repository link allows Git sync to monitor and sync changes to files in a specified Git
 * repository.
 */
export const updateRepositoryLink: API.OperationMethod<
  UpdateRepositoryLinkInput,
  UpdateRepositoryLinkOutput,
  UpdateRepositoryLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(140, __c35, 0) as any as S.Schema<UpdateRepositoryLinkInput>,
  output: __S(28, __c7, 0) as any as S.Schema<UpdateRepositoryLinkOutput>,
  errors: [
    AccessDeniedException,
    ConditionalCheckFailedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    UpdateOutOfSyncException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryLink",
}));

export type UpdateSyncBlockerError =
  | AccessDeniedException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | RetryLatestCommitFailedException
  | SyncBlockerDoesNotExistException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to update the status of a sync blocker, resolving the blocker and allowing syncing to continue.
 */
export const updateSyncBlocker: API.OperationMethod<
  UpdateSyncBlockerInput,
  UpdateSyncBlockerOutput,
  UpdateSyncBlockerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c36, 0) as any as S.Schema<UpdateSyncBlockerInput>,
  output: __S(145, __c36, 1) as any as S.Schema<UpdateSyncBlockerOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    RetryLatestCommitFailedException,
    SyncBlockerDoesNotExistException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSyncBlocker",
}));

export type UpdateSyncConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | ThrottlingException
  | UpdateOutOfSyncException
  | CommonErrors;
/**
 * Updates the sync configuration for your connection and a specified external Git repository.
 */
export const updateSyncConfiguration: API.OperationMethod<
  UpdateSyncConfigurationInput,
  UpdateSyncConfigurationOutput,
  UpdateSyncConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(148, __c37, 0) as any as S.Schema<UpdateSyncConfigurationInput>,
  output: __S(40, __c10, 0) as any as S.Schema<UpdateSyncConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
    ThrottlingException,
    UpdateOutOfSyncException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSyncConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProviderType: S.optional(S.String),
          ConnectionName: S.String,
          Tags: S.optional(__S(5, __c1, 1)),
          HostArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConnectionArn: S.String, Tags: S.optional(__S(5, __c1, 1)) }),
      ).annotate({ identifier: "CreateConnectionOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(4, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ProviderType: S.String,
          ProviderEndpoint: S.String,
          VpcConfiguration: S.optional(__S(16, __c4, 0)),
          Tags: S.optional(__S(5, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateHostInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HostArn: S.optional(S.String), Tags: S.optional(__S(5, __c1, 1)) }),
      ).annotate({ identifier: "CreateHostOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcId: S.String,
          SubnetIds: __S(12, __c3, 0),
          SecurityGroupIds: __S(12, __c3, 0),
          TlsCertificate: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcConfiguration" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.String,
          OwnerId: S.String,
          RepositoryName: S.String,
          EncryptionKeyArn: S.optional(S.String),
          Tags: S.optional(__S(5, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRepositoryLinkInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.String,
          EncryptionKeyArn: S.optional(S.String),
          OwnerId: S.String,
          ProviderType: S.String,
          RepositoryLinkArn: S.String,
          RepositoryLinkId: S.String,
          RepositoryName: S.String,
        }),
      ).annotate({ identifier: "RepositoryLinkInfo" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RepositoryLinkInfo: __S(24, __c6, 0) })).annotate({
        identifier: "CreateRepositoryLinkOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Branch: S.String,
          ConfigFile: S.String,
          RepositoryLinkId: S.String,
          ResourceName: S.String,
          RoleArn: S.String,
          SyncType: S.String,
          PublishDeploymentStatus: S.optional(S.String),
          TriggerResourceUpdateOn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSyncConfigurationInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Branch: S.String,
          ConfigFile: S.optional(S.String),
          OwnerId: S.String,
          ProviderType: S.String,
          RepositoryLinkId: S.String,
          RepositoryName: S.String,
          ResourceName: S.String,
          RoleArn: S.String,
          SyncType: S.String,
          PublishDeploymentStatus: S.optional(S.String),
          TriggerResourceUpdateOn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SyncConfiguration" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SyncConfiguration: __S(36, __c9, 0) })).annotate({
        identifier: "CreateSyncConfigurationOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectionInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteConnectionOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteHostInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RepositoryLinkId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRepositoryLinkInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SyncType: S.String, ResourceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSyncConfigurationInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectionInput" });
    case 1:
      return S.suspend(() => S.Struct({ Connection: S.optional(__S(68, __c17, 0)) })).annotate({
        identifier: "GetConnectionOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionName: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          ProviderType: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          ConnectionStatus: S.optional(S.String),
          HostArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Connection" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetHostInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          ProviderType: S.optional(S.String),
          ProviderEndpoint: S.optional(S.String),
          VpcConfiguration: S.optional(__S(16, __c4, 0)),
        }),
      ).annotate({ identifier: "GetHostOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RepositoryLinkId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositoryLinkInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Branch: S.String, RepositoryLinkId: S.String, SyncType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositorySyncStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          Events: __S(85, __c21, 1),
        }),
      ).annotate({ identifier: "RepositorySyncAttempt" });
    case 2:
      return S.suspend(() => S.Struct({ LatestSync: __S(81, __c20, 1) })).annotate({
        identifier: "GetRepositorySyncStatusOutput",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Event: S.String,
          ExternalId: S.optional(S.String),
          Time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Type: S.String,
        }),
      ).annotate({ identifier: "RepositorySyncEvent" });
    case 1:
      return S.Array(__S(84, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceName: S.String, SyncType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourceSyncStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Branch: S.String,
          Directory: S.String,
          OwnerId: S.String,
          RepositoryName: S.String,
          ProviderType: S.String,
          Sha: S.String,
        }),
      ).annotate({ identifier: "Revision" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Events: __S(85, __c21, 1),
          InitialRevision: __S(89, __c22, 1),
          StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          TargetRevision: __S(89, __c22, 1),
          Target: S.String,
        }),
      ).annotate({ identifier: "ResourceSyncAttempt" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DesiredState: S.optional(__S(89, __c22, 1)),
          LatestSuccessfulSync: S.optional(__S(90, __c22, 2)),
          LatestSync: __S(90, __c22, 2),
        }),
      ).annotate({ identifier: "GetResourceSyncStatusOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SyncType: S.String, ResourceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSyncBlockerSummaryInput" });
    case 1:
      return S.Array(__S(96, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.String,
          ParentResourceName: S.optional(S.String),
          LatestBlockers: S.optional(__S(93, __c23, 1)),
        }),
      ).annotate({ identifier: "SyncBlockerSummary" });
    case 3:
      return S.suspend(() => S.Struct({ SyncBlockerSummary: __S(94, __c23, 2) })).annotate({
        identifier: "GetSyncBlockerSummaryOutput",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Type: S.String,
          Status: S.String,
          CreatedReason: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Contexts: S.optional(__S(5, __c1, 1)),
          ResolvedReason: S.optional(S.String),
          ResolvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SyncBlocker" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SyncType: S.String, ResourceName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSyncConfigurationInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProviderTypeFilter: S.optional(S.String),
          HostArnFilter: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectionsInput" });
    case 1:
      return S.Array(__S(68, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Connections: S.optional(__S(105, __c26, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectionsOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListHostsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          HostArn: S.optional(S.String),
          ProviderType: S.optional(S.String),
          ProviderEndpoint: S.optional(S.String),
          VpcConfiguration: S.optional(__S(16, __c4, 0)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "Host" });
    case 2:
      return S.Array(__S(109, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Hosts: S.optional(__S(110, __c27, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListHostsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRepositoryLinksInput" });
    case 1:
      return S.Array(__S(24, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ RepositoryLinks: __S(113, __c28, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRepositoryLinksOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RepositoryLinkId: S.String, SyncType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRepositorySyncDefinitionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Branch: S.String, Directory: S.String, Parent: S.String, Target: S.String }),
      ).annotate({ identifier: "RepositorySyncDefinition" });
    case 2:
      return S.Array(__S(117, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RepositorySyncDefinitions: __S(118, __c29, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRepositorySyncDefinitionsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          RepositoryLinkId: S.String,
          SyncType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSyncConfigurationsInput" });
    case 1:
      return S.Array(__S(36, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ SyncConfigurations: __S(121, __c30, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSyncConfigurationsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(5, __c1, 1)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(5, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(12, __c3, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostArn: S.String,
          ProviderEndpoint: S.optional(S.String),
          VpcConfiguration: S.optional(__S(16, __c4, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateHostInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          RepositoryLinkId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRepositoryLinkInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          SyncType: S.String,
          ResourceName: S.String,
          ResolvedReason: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSyncBlockerInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceName: S.String,
          ParentResourceName: S.optional(S.String),
          SyncBlocker: __S(96, __c24, 0),
        }),
      ).annotate({ identifier: "UpdateSyncBlockerOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Branch: S.optional(S.String),
          ConfigFile: S.optional(S.String),
          RepositoryLinkId: S.optional(S.String),
          ResourceName: S.String,
          RoleArn: S.optional(S.String),
          SyncType: S.String,
          PublishDeploymentStatus: S.optional(S.String),
          TriggerResourceUpdateOn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSyncConfigurationInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
