import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CodeConnections",
  target: "CodeConnections_20231201",
  version: "2023-12-01",
  sigv4: "codeconnections",
  protocol: awsJson1_0Protocol,
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
                `https://codeconnections-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codeconnections-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codeconnections.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codeconnections.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConditionalCheckFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConditionalCheckFailedException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceUnavailableException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RetryLatestCommitFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "RetryLatestCommitFailedException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class SyncBlockerDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "SyncBlockerDoesNotExistException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SyncConfigurationStillExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "SyncConfigurationStillExistsException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedProviderTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedProviderTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UpdateOutOfSyncException
  extends /*@__PURE__*/ TE.TaggedError(
    "UpdateOutOfSyncException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export type ProviderType =
  | "Bitbucket"
  | "GitHub"
  | "GitHubEnterpriseServer"
  | "GitLab"
  | "GitLabSelfManaged"
  | "AzureDevOps"
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
export type TriggerResourceUpdateOn =
  | "ANY_CHANGE"
  | "FILE_CHANGE"
  | (string & {});
export type PullRequestComment = "ENABLED" | "DISABLED" | (string & {});
export interface CreateSyncConfigurationInput {
  Branch: string;
  ConfigFile: string;
  RepositoryLinkId: string;
  ResourceName: string;
  RoleArn: string;
  SyncType: SyncConfigurationType;
  PublishDeploymentStatus?: PublishDeploymentStatus;
  TriggerResourceUpdateOn?: TriggerResourceUpdateOn;
  PullRequestComment?: PullRequestComment;
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
  PullRequestComment?: PullRequestComment;
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
export type ConnectionStatus =
  | "PENDING"
  | "AVAILABLE"
  | "ERROR"
  | (string & {});
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
  PullRequestComment?: PullRequestComment;
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
  descriptor: {
    service: svc,
    input: {
      ProviderType: 0,
      ConnectionName: 0,
      Tags: D.list(i_Tag),
      HostArn: 0,
    },
  },
  errors: [
    LimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ProviderType: 0,
      ProviderEndpoint: 0,
      VpcConfiguration: i_VpcConfiguration,
      Tags: D.list(i_Tag),
    },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHost",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ConnectionArn: 0,
      OwnerId: 0,
      RepositoryName: 0,
      EncryptionKeyArn: 0,
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Branch: 0,
      ConfigFile: 0,
      RepositoryLinkId: 0,
      ResourceName: 0,
      RoleArn: 0,
      SyncType: 0,
      PublishDeploymentStatus: 0,
      TriggerResourceUpdateOn: 0,
      PullRequestComment: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ConnectionArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

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
  descriptor: { service: svc, input: { HostArn: 0 } },
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHost",
})) as any;

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
  descriptor: { service: svc, input: { RepositoryLinkId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { SyncType: 0, ResourceName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ConnectionArn: 0 } },
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
})) as any;

export type GetHostError =
  | ResourceNotFoundException
  | ResourceUnavailableException
  | CommonErrors;
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
  descriptor: { service: svc, input: { HostArn: 0 } },
  errors: [ResourceNotFoundException, ResourceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHost",
})) as any;

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
  descriptor: { service: svc, input: { RepositoryLinkId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Branch: 0, RepositoryLinkId: 0, SyncType: 0 },
    output: { LatestSync: { StartedAt: D.ts, Events: D.list({ Time: D.ts }) } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceName: 0, SyncType: 0 },
    output: {
      LatestSuccessfulSync: o_ResourceSyncAttempt,
      LatestSync: o_ResourceSyncAttempt,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { SyncType: 0, ResourceName: 0 },
    output: { SyncBlockerSummary: { LatestBlockers: D.list(o_SyncBlocker) } },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { SyncType: 0, ResourceName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProviderTypeFilter: 0,
      HostArnFilter: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: { service: svc, input: { RepositoryLinkId: 0, SyncType: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, RepositoryLinkId: 0, SyncType: 0 },
  },
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
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
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
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      HostArn: 0,
      ProviderEndpoint: 0,
      VpcConfiguration: i_VpcConfiguration,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHost",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ConnectionArn: 0, EncryptionKeyArn: 0, RepositoryLinkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, SyncType: 0, ResourceName: 0, ResolvedReason: 0 },
    output: { SyncBlocker: o_SyncBlocker },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Branch: 0,
      ConfigFile: 0,
      RepositoryLinkId: 0,
      ResourceName: 0,
      RoleArn: 0,
      SyncType: 0,
      PublishDeploymentStatus: 0,
      TriggerResourceUpdateOn: 0,
      PullRequestComment: 0,
    },
  },
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
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VpcConfiguration: D.LazyStruct = () => ({
  VpcId: 0,
  SubnetIds: 0,
  SecurityGroupIds: 0,
  TlsCertificate: 0,
});
const o_ResourceSyncAttempt: D.LazyStruct = () => ({
  Events: D.list({ Time: D.ts }),
  StartedAt: D.ts,
});
const o_SyncBlocker: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  ResolvedAt: D.ts,
});
