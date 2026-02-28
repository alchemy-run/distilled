// ==========================================================================
// Dataform API (dataform v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "dataform",
  version: "v1",
  rootUrl: "https://dataform.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface SshAuthenticationConfig {
  /** Required. The name of the Secret Manager secret version to use as a ssh private key for Git operations. Must be in the format `projects/* /secrets/* /versions/*`. */
  userPrivateKeySecretVersion?: string;
  /** Required. Content of a public SSH key to verify an identity of a remote Git host. */
  hostPublicKey?: string;
}

export const SshAuthenticationConfig: Schema.Schema<SshAuthenticationConfig> = Schema.suspend(() => Schema.Struct({
  userPrivateKeySecretVersion: Schema.optional(Schema.String),
  hostPublicKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SshAuthenticationConfig" }) as any as Schema.Schema<SshAuthenticationConfig>;

export interface GitRemoteSettings {
  /** Required. The Git remote's URL. */
  url?: string;
  /** Required. The Git remote's default branch name. */
  defaultBranch?: string;
  /** Optional. The name of the Secret Manager secret version to use as an authentication token for Git operations. Must be in the format `projects/* /secrets/* /versions/*`. */
  authenticationTokenSecretVersion?: string;
  /** Optional. Authentication fields for remote uris using SSH protocol. */
  sshAuthenticationConfig?: SshAuthenticationConfig;
  /** Output only. Deprecated: The field does not contain any token status information. */
  tokenStatus?: "TOKEN_STATUS_UNSPECIFIED" | "NOT_FOUND" | "INVALID" | "VALID" | (string & {});
}

export const GitRemoteSettings: Schema.Schema<GitRemoteSettings> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  defaultBranch: Schema.optional(Schema.String),
  authenticationTokenSecretVersion: Schema.optional(Schema.String),
  sshAuthenticationConfig: Schema.optional(SshAuthenticationConfig),
  tokenStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GitRemoteSettings" }) as any as Schema.Schema<GitRemoteSettings>;

export interface WorkspaceCompilationOverrides {
  /** Optional. The default database (Google Cloud project ID). */
  defaultDatabase?: string;
  /** Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names. */
  schemaSuffix?: string;
  /** Optional. The prefix that should be prepended to all table names. */
  tablePrefix?: string;
}

export const WorkspaceCompilationOverrides: Schema.Schema<WorkspaceCompilationOverrides> = Schema.suspend(() => Schema.Struct({
  defaultDatabase: Schema.optional(Schema.String),
  schemaSuffix: Schema.optional(Schema.String),
  tablePrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkspaceCompilationOverrides" }) as any as Schema.Schema<WorkspaceCompilationOverrides>;

export interface DataEncryptionState {
  /** Required. The KMS key version name with which data of a resource is encrypted. */
  kmsKeyVersionName?: string;
}

export const DataEncryptionState: Schema.Schema<DataEncryptionState> = Schema.suspend(() => Schema.Struct({
  kmsKeyVersionName: Schema.optional(Schema.String),
})).annotate({ identifier: "DataEncryptionState" }) as any as Schema.Schema<DataEncryptionState>;

export interface Repository {
  /** Identifier. The repository's name. */
  name?: string;
  /** Output only. The timestamp of when the repository was created. */
  createTime?: string;
  /** Optional. The repository's user-friendly name. */
  displayName?: string;
  /** Optional. If set, configures this repository to be linked to a Git remote. */
  gitRemoteSettings?: GitRemoteSettings;
  /** Optional. The name of the Secret Manager secret version to be used to interpolate variables into the .npmrc file for package installation operations. Must be in the format `projects/* /secrets/* /versions/*`. The file itself must be in a JSON format. */
  npmrcEnvironmentVariablesSecretVersion?: string;
  /** Optional. If set, fields of `workspace_compilation_overrides` override the default compilation settings that are specified in dataform.json when creating workspace-scoped compilation results. See documentation for `WorkspaceCompilationOverrides` for more information. */
  workspaceCompilationOverrides?: WorkspaceCompilationOverrides;
  /** Optional. Repository user labels. */
  labels?: Record<string, string>;
  /** Optional. Input only. If set to true, the authenticated user will be granted the roles/dataform.admin role on the created repository. */
  setAuthenticatedUserAdmin?: boolean;
  /** Optional. The service account to run workflow invocations under. */
  serviceAccount?: string;
  /** Optional. The reference to a KMS encryption key. If provided, it will be used to encrypt user data in the repository and all child resources. It is not possible to add or update the encryption key after the repository is created. Example: `projects/{kms_project}/locations/{location}/keyRings/{key_location}/cryptoKeys/{key}` */
  kmsKeyName?: string;
  /** Output only. A data encryption state of a Git repository if this Repository is protected by a KMS key. */
  dataEncryptionState?: DataEncryptionState;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
}

export const Repository: Schema.Schema<Repository> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  gitRemoteSettings: Schema.optional(GitRemoteSettings),
  npmrcEnvironmentVariablesSecretVersion: Schema.optional(Schema.String),
  workspaceCompilationOverrides: Schema.optional(WorkspaceCompilationOverrides),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  setAuthenticatedUserAdmin: Schema.optional(Schema.Boolean),
  serviceAccount: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  dataEncryptionState: Schema.optional(DataEncryptionState),
  internalMetadata: Schema.optional(Schema.String),
})).annotate({ identifier: "Repository" }) as any as Schema.Schema<Repository>;

export interface ListRepositoriesResponse {
  /** List of repositories. */
  repositories?: Array<Repository>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations which could not be reached. */
  unreachable?: Array<string>;
}

export const ListRepositoriesResponse: Schema.Schema<ListRepositoriesResponse> = Schema.suspend(() => Schema.Struct({
  repositories: Schema.optional(Schema.Array(Repository)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRepositoriesResponse" }) as any as Schema.Schema<ListRepositoriesResponse>;

export interface CommitAuthor {
  /** Required. The commit author's name. */
  name?: string;
  /** Required. The commit author's email address. */
  emailAddress?: string;
}

export const CommitAuthor: Schema.Schema<CommitAuthor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitAuthor" }) as any as Schema.Schema<CommitAuthor>;

export interface CommitMetadata {
  /** Required. The commit's author. */
  author?: CommitAuthor;
  /** Optional. The commit's message. */
  commitMessage?: string;
}

export const CommitMetadata: Schema.Schema<CommitMetadata> = Schema.suspend(() => Schema.Struct({
  author: Schema.optional(CommitAuthor),
  commitMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitMetadata" }) as any as Schema.Schema<CommitMetadata>;

export interface WriteFile {
  /** The file's contents. */
  contents?: string;
}

export const WriteFile: Schema.Schema<WriteFile> = Schema.suspend(() => Schema.Struct({
  contents: Schema.optional(Schema.String),
})).annotate({ identifier: "WriteFile" }) as any as Schema.Schema<WriteFile>;

export interface DeleteFile {
}

export const DeleteFile: Schema.Schema<DeleteFile> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteFile" }) as any as Schema.Schema<DeleteFile>;

export interface FileOperation {
  /** Represents the write operation. */
  writeFile?: WriteFile;
  /** Represents the delete operation. */
  deleteFile?: DeleteFile;
}

export const FileOperation: Schema.Schema<FileOperation> = Schema.suspend(() => Schema.Struct({
  writeFile: Schema.optional(WriteFile),
  deleteFile: Schema.optional(DeleteFile),
})).annotate({ identifier: "FileOperation" }) as any as Schema.Schema<FileOperation>;

export interface CommitRepositoryChangesRequest {
  /** Required. The changes to commit to the repository. */
  commitMetadata?: CommitMetadata;
  /** Optional. The commit SHA which must be the repository's current HEAD before applying this commit; otherwise this request will fail. If unset, no validation on the current HEAD commit SHA is performed. */
  requiredHeadCommitSha?: string;
  /** Optional. A map to the path of the file to the operation. The path is the full file path including filename, from repository root. */
  fileOperations?: Record<string, FileOperation>;
}

export const CommitRepositoryChangesRequest: Schema.Schema<CommitRepositoryChangesRequest> = Schema.suspend(() => Schema.Struct({
  commitMetadata: Schema.optional(CommitMetadata),
  requiredHeadCommitSha: Schema.optional(Schema.String),
  fileOperations: Schema.optional(Schema.Record(Schema.String, FileOperation)),
})).annotate({ identifier: "CommitRepositoryChangesRequest" }) as any as Schema.Schema<CommitRepositoryChangesRequest>;

export interface CommitRepositoryChangesResponse {
  /** The commit SHA of the current commit. */
  commitSha?: string;
}

export const CommitRepositoryChangesResponse: Schema.Schema<CommitRepositoryChangesResponse> = Schema.suspend(() => Schema.Struct({
  commitSha: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitRepositoryChangesResponse" }) as any as Schema.Schema<CommitRepositoryChangesResponse>;

export interface ReadRepositoryFileResponse {
  /** The file's contents. */
  contents?: string;
}

export const ReadRepositoryFileResponse: Schema.Schema<ReadRepositoryFileResponse> = Schema.suspend(() => Schema.Struct({
  contents: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadRepositoryFileResponse" }) as any as Schema.Schema<ReadRepositoryFileResponse>;

export interface DirectoryEntry {
  /** A file in the directory. */
  file?: string;
  /** A child directory in the directory. */
  directory?: string;
}

export const DirectoryEntry: Schema.Schema<DirectoryEntry> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(Schema.String),
  directory: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectoryEntry" }) as any as Schema.Schema<DirectoryEntry>;

export interface QueryRepositoryDirectoryContentsResponse {
  /** List of entries in the directory. */
  directoryEntries?: Array<DirectoryEntry>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const QueryRepositoryDirectoryContentsResponse: Schema.Schema<QueryRepositoryDirectoryContentsResponse> = Schema.suspend(() => Schema.Struct({
  directoryEntries: Schema.optional(Schema.Array(DirectoryEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryRepositoryDirectoryContentsResponse" }) as any as Schema.Schema<QueryRepositoryDirectoryContentsResponse>;

export interface CommitLogEntry {
  /** Commit timestamp. */
  commitTime?: string;
  /** The commit SHA for this commit log entry. */
  commitSha?: string;
  /** The commit author for this commit log entry. */
  author?: CommitAuthor;
  /** The commit message for this commit log entry. */
  commitMessage?: string;
}

export const CommitLogEntry: Schema.Schema<CommitLogEntry> = Schema.suspend(() => Schema.Struct({
  commitTime: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
  author: Schema.optional(CommitAuthor),
  commitMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "CommitLogEntry" }) as any as Schema.Schema<CommitLogEntry>;

export interface FetchRepositoryHistoryResponse {
  /** A list of commit logs, ordered by 'git log' default order. */
  commits?: Array<CommitLogEntry>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const FetchRepositoryHistoryResponse: Schema.Schema<FetchRepositoryHistoryResponse> = Schema.suspend(() => Schema.Struct({
  commits: Schema.optional(Schema.Array(CommitLogEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchRepositoryHistoryResponse" }) as any as Schema.Schema<FetchRepositoryHistoryResponse>;

export interface ComputeRepositoryAccessTokenStatusResponse {
  /** Indicates the status of the Git access token. */
  tokenStatus?: "TOKEN_STATUS_UNSPECIFIED" | "NOT_FOUND" | "INVALID" | "VALID" | (string & {});
}

export const ComputeRepositoryAccessTokenStatusResponse: Schema.Schema<ComputeRepositoryAccessTokenStatusResponse> = Schema.suspend(() => Schema.Struct({
  tokenStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeRepositoryAccessTokenStatusResponse" }) as any as Schema.Schema<ComputeRepositoryAccessTokenStatusResponse>;

export interface FetchRemoteBranchesResponse {
  /** The remote repository's branch names. */
  branches?: Array<string>;
}

export const FetchRemoteBranchesResponse: Schema.Schema<FetchRemoteBranchesResponse> = Schema.suspend(() => Schema.Struct({
  branches: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FetchRemoteBranchesResponse" }) as any as Schema.Schema<FetchRemoteBranchesResponse>;

export interface PrivateResourceMetadata {
  /** Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace. */
  userScoped?: boolean;
}

export const PrivateResourceMetadata: Schema.Schema<PrivateResourceMetadata> = Schema.suspend(() => Schema.Struct({
  userScoped: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PrivateResourceMetadata" }) as any as Schema.Schema<PrivateResourceMetadata>;

export interface Workspace {
  /** Identifier. The workspace's name. */
  name?: string;
  /** Output only. The timestamp of when the workspace was created. */
  createTime?: string;
  /** Output only. A data encryption state of a Git repository if this Workspace is protected by a KMS key. */
  dataEncryptionState?: DataEncryptionState;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
  /** Output only. Metadata indicating whether this resource is user-scoped. For `Workspace` resources, the `user_scoped` field is always `true`. */
  privateResourceMetadata?: PrivateResourceMetadata;
}

export const Workspace: Schema.Schema<Workspace> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  dataEncryptionState: Schema.optional(DataEncryptionState),
  internalMetadata: Schema.optional(Schema.String),
  privateResourceMetadata: Schema.optional(PrivateResourceMetadata),
})).annotate({ identifier: "Workspace" }) as any as Schema.Schema<Workspace>;

export interface ListWorkspacesResponse {
  /** List of workspaces. */
  workspaces?: Array<Workspace>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations which could not be reached. */
  unreachable?: Array<string>;
}

export const ListWorkspacesResponse: Schema.Schema<ListWorkspacesResponse> = Schema.suspend(() => Schema.Struct({
  workspaces: Schema.optional(Schema.Array(Workspace)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkspacesResponse" }) as any as Schema.Schema<ListWorkspacesResponse>;

export interface InstallNpmPackagesRequest {
}

export const InstallNpmPackagesRequest: Schema.Schema<InstallNpmPackagesRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "InstallNpmPackagesRequest" }) as any as Schema.Schema<InstallNpmPackagesRequest>;

export interface InstallNpmPackagesResponse {
}

export const InstallNpmPackagesResponse: Schema.Schema<InstallNpmPackagesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "InstallNpmPackagesResponse" }) as any as Schema.Schema<InstallNpmPackagesResponse>;

export interface PullGitCommitsRequest {
  /** Optional. The name of the branch in the Git remote from which to pull commits. If left unset, the repository's default branch name will be used. */
  remoteBranch?: string;
  /** Required. The author of any merge commit which may be created as a result of merging fetched Git commits into this workspace. */
  author?: CommitAuthor;
}

export const PullGitCommitsRequest: Schema.Schema<PullGitCommitsRequest> = Schema.suspend(() => Schema.Struct({
  remoteBranch: Schema.optional(Schema.String),
  author: Schema.optional(CommitAuthor),
})).annotate({ identifier: "PullGitCommitsRequest" }) as any as Schema.Schema<PullGitCommitsRequest>;

export interface PullGitCommitsResponse {
}

export const PullGitCommitsResponse: Schema.Schema<PullGitCommitsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PullGitCommitsResponse" }) as any as Schema.Schema<PullGitCommitsResponse>;

export interface PushGitCommitsRequest {
  /** Optional. The name of the branch in the Git remote to which commits should be pushed. If left unset, the repository's default branch name will be used. */
  remoteBranch?: string;
}

export const PushGitCommitsRequest: Schema.Schema<PushGitCommitsRequest> = Schema.suspend(() => Schema.Struct({
  remoteBranch: Schema.optional(Schema.String),
})).annotate({ identifier: "PushGitCommitsRequest" }) as any as Schema.Schema<PushGitCommitsRequest>;

export interface PushGitCommitsResponse {
}

export const PushGitCommitsResponse: Schema.Schema<PushGitCommitsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PushGitCommitsResponse" }) as any as Schema.Schema<PushGitCommitsResponse>;

export interface UncommittedFileChange {
  /** The file's full path including filename, relative to the workspace root. */
  path?: string;
  /** Output only. Indicates the status of the file. */
  state?: "STATE_UNSPECIFIED" | "ADDED" | "DELETED" | "MODIFIED" | "HAS_CONFLICTS" | (string & {});
}

export const UncommittedFileChange: Schema.Schema<UncommittedFileChange> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "UncommittedFileChange" }) as any as Schema.Schema<UncommittedFileChange>;

export interface FetchFileGitStatusesResponse {
  /** A list of all files which have uncommitted Git changes. There will only be a single entry for any given file. */
  uncommittedFileChanges?: Array<UncommittedFileChange>;
}

export const FetchFileGitStatusesResponse: Schema.Schema<FetchFileGitStatusesResponse> = Schema.suspend(() => Schema.Struct({
  uncommittedFileChanges: Schema.optional(Schema.Array(UncommittedFileChange)),
})).annotate({ identifier: "FetchFileGitStatusesResponse" }) as any as Schema.Schema<FetchFileGitStatusesResponse>;

export interface FetchGitAheadBehindResponse {
  /** The number of commits in the remote branch that are not in the workspace. */
  commitsAhead?: number;
  /** The number of commits in the workspace that are not in the remote branch. */
  commitsBehind?: number;
}

export const FetchGitAheadBehindResponse: Schema.Schema<FetchGitAheadBehindResponse> = Schema.suspend(() => Schema.Struct({
  commitsAhead: Schema.optional(Schema.Number),
  commitsBehind: Schema.optional(Schema.Number),
})).annotate({ identifier: "FetchGitAheadBehindResponse" }) as any as Schema.Schema<FetchGitAheadBehindResponse>;

export interface CommitWorkspaceChangesRequest {
  /** Required. The commit's author. */
  author?: CommitAuthor;
  /** Optional. The commit's message. */
  commitMessage?: string;
  /** Optional. Full file paths to commit including filename, rooted at workspace root. If left empty, all files will be committed. */
  paths?: Array<string>;
}

export const CommitWorkspaceChangesRequest: Schema.Schema<CommitWorkspaceChangesRequest> = Schema.suspend(() => Schema.Struct({
  author: Schema.optional(CommitAuthor),
  commitMessage: Schema.optional(Schema.String),
  paths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CommitWorkspaceChangesRequest" }) as any as Schema.Schema<CommitWorkspaceChangesRequest>;

export interface CommitWorkspaceChangesResponse {
}

export const CommitWorkspaceChangesResponse: Schema.Schema<CommitWorkspaceChangesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CommitWorkspaceChangesResponse" }) as any as Schema.Schema<CommitWorkspaceChangesResponse>;

export interface ResetWorkspaceChangesRequest {
  /** Optional. Full file paths to reset back to their committed state including filename, rooted at workspace root. If left empty, all files will be reset. */
  paths?: Array<string>;
  /** Optional. If set to true, untracked files will be deleted. */
  clean?: boolean;
}

export const ResetWorkspaceChangesRequest: Schema.Schema<ResetWorkspaceChangesRequest> = Schema.suspend(() => Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  clean: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ResetWorkspaceChangesRequest" }) as any as Schema.Schema<ResetWorkspaceChangesRequest>;

export interface ResetWorkspaceChangesResponse {
}

export const ResetWorkspaceChangesResponse: Schema.Schema<ResetWorkspaceChangesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetWorkspaceChangesResponse" }) as any as Schema.Schema<ResetWorkspaceChangesResponse>;

export interface FetchFileDiffResponse {
  /** The raw formatted Git diff for the file. */
  formattedDiff?: string;
}

export const FetchFileDiffResponse: Schema.Schema<FetchFileDiffResponse> = Schema.suspend(() => Schema.Struct({
  formattedDiff: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchFileDiffResponse" }) as any as Schema.Schema<FetchFileDiffResponse>;

export interface QueryDirectoryContentsResponse {
  /** List of entries in the directory. */
  directoryEntries?: Array<DirectoryEntry>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const QueryDirectoryContentsResponse: Schema.Schema<QueryDirectoryContentsResponse> = Schema.suspend(() => Schema.Struct({
  directoryEntries: Schema.optional(Schema.Array(DirectoryEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryDirectoryContentsResponse" }) as any as Schema.Schema<QueryDirectoryContentsResponse>;

export interface FileSearchResult {
  /** File system path relative to the workspace root. */
  path?: string;
}

export const FileSearchResult: Schema.Schema<FileSearchResult> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "FileSearchResult" }) as any as Schema.Schema<FileSearchResult>;

export interface DirectorySearchResult {
  /** File system path relative to the workspace root. */
  path?: string;
}

export const DirectorySearchResult: Schema.Schema<DirectorySearchResult> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectorySearchResult" }) as any as Schema.Schema<DirectorySearchResult>;

export interface SearchResult {
  /** Details when search result is a file. */
  file?: FileSearchResult;
  /** Details when search result is a directory. */
  directory?: DirectorySearchResult;
}

export const SearchResult: Schema.Schema<SearchResult> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(FileSearchResult),
  directory: Schema.optional(DirectorySearchResult),
})).annotate({ identifier: "SearchResult" }) as any as Schema.Schema<SearchResult>;

export interface SearchFilesResponse {
  /** List of matched results. */
  searchResults?: Array<SearchResult>;
  /** Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const SearchFilesResponse: Schema.Schema<SearchFilesResponse> = Schema.suspend(() => Schema.Struct({
  searchResults: Schema.optional(Schema.Array(SearchResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchFilesResponse" }) as any as Schema.Schema<SearchFilesResponse>;

export interface MakeDirectoryRequest {
  /** Required. The directory's full path including directory name, relative to the workspace root. */
  path?: string;
}

export const MakeDirectoryRequest: Schema.Schema<MakeDirectoryRequest> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "MakeDirectoryRequest" }) as any as Schema.Schema<MakeDirectoryRequest>;

export interface MakeDirectoryResponse {
}

export const MakeDirectoryResponse: Schema.Schema<MakeDirectoryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MakeDirectoryResponse" }) as any as Schema.Schema<MakeDirectoryResponse>;

export interface RemoveDirectoryRequest {
  /** Required. The directory's full path including directory name, relative to the workspace root. */
  path?: string;
}

export const RemoveDirectoryRequest: Schema.Schema<RemoveDirectoryRequest> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveDirectoryRequest" }) as any as Schema.Schema<RemoveDirectoryRequest>;

export interface RemoveDirectoryResponse {
}

export const RemoveDirectoryResponse: Schema.Schema<RemoveDirectoryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveDirectoryResponse" }) as any as Schema.Schema<RemoveDirectoryResponse>;

export interface MoveDirectoryRequest {
  /** Required. The directory's full path including directory name, relative to the workspace root. */
  path?: string;
  /** Required. The new path for the directory including directory name, rooted at workspace root. */
  newPath?: string;
}

export const MoveDirectoryRequest: Schema.Schema<MoveDirectoryRequest> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  newPath: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveDirectoryRequest" }) as any as Schema.Schema<MoveDirectoryRequest>;

export interface MoveDirectoryResponse {
}

export const MoveDirectoryResponse: Schema.Schema<MoveDirectoryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MoveDirectoryResponse" }) as any as Schema.Schema<MoveDirectoryResponse>;

export interface ReadFileResponse {
  /** The file's contents. */
  fileContents?: string;
}

export const ReadFileResponse: Schema.Schema<ReadFileResponse> = Schema.suspend(() => Schema.Struct({
  fileContents: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadFileResponse" }) as any as Schema.Schema<ReadFileResponse>;

export interface RemoveFileRequest {
  /** Required. The file's full path including filename, relative to the workspace root. */
  path?: string;
}

export const RemoveFileRequest: Schema.Schema<RemoveFileRequest> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveFileRequest" }) as any as Schema.Schema<RemoveFileRequest>;

export interface RemoveFileResponse {
}

export const RemoveFileResponse: Schema.Schema<RemoveFileResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemoveFileResponse" }) as any as Schema.Schema<RemoveFileResponse>;

export interface MoveFileRequest {
  /** Required. The file's full path including filename, relative to the workspace root. */
  path?: string;
  /** Required. The file's new path including filename, relative to the workspace root. */
  newPath?: string;
}

export const MoveFileRequest: Schema.Schema<MoveFileRequest> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  newPath: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveFileRequest" }) as any as Schema.Schema<MoveFileRequest>;

export interface MoveFileResponse {
}

export const MoveFileResponse: Schema.Schema<MoveFileResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MoveFileResponse" }) as any as Schema.Schema<MoveFileResponse>;

export interface WriteFileRequest {
  /** Required. The file. */
  path?: string;
  /** Required. The file's contents. */
  contents?: string;
}

export const WriteFileRequest: Schema.Schema<WriteFileRequest> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  contents: Schema.optional(Schema.String),
})).annotate({ identifier: "WriteFileRequest" }) as any as Schema.Schema<WriteFileRequest>;

export interface WriteFileResponse {
}

export const WriteFileResponse: Schema.Schema<WriteFileResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WriteFileResponse" }) as any as Schema.Schema<WriteFileResponse>;

export interface NotebookRuntimeOptions {
  /** Optional. The Google Cloud Storage location to upload the result to. Format: `gs://bucket-name`. */
  gcsOutputBucket?: string;
  /** Optional. The resource name of the [Colab runtime template] (https://cloud.google.com/colab/docs/runtimes), from which a runtime is created for notebook executions. If not specified, a runtime is created with Colab's default specifications. */
  aiPlatformNotebookRuntimeTemplate?: string;
}

export const NotebookRuntimeOptions: Schema.Schema<NotebookRuntimeOptions> = Schema.suspend(() => Schema.Struct({
  gcsOutputBucket: Schema.optional(Schema.String),
  aiPlatformNotebookRuntimeTemplate: Schema.optional(Schema.String),
})).annotate({ identifier: "NotebookRuntimeOptions" }) as any as Schema.Schema<NotebookRuntimeOptions>;

export interface CodeCompilationConfig {
  /** Optional. The default database (Google Cloud project ID). */
  defaultDatabase?: string;
  /** Optional. The default schema (BigQuery dataset ID). */
  defaultSchema?: string;
  /** Optional. The default BigQuery location to use. Defaults to "US". See the BigQuery docs for a full list of locations: https://cloud.google.com/bigquery/docs/locations. */
  defaultLocation?: string;
  /** Optional. The default schema (BigQuery dataset ID) for assertions. */
  assertionSchema?: string;
  /** Optional. User-defined variables that are made available to project code during compilation. */
  vars?: Record<string, string>;
  /** Optional. The suffix that should be appended to all database (Google Cloud project ID) names. */
  databaseSuffix?: string;
  /** Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names. */
  schemaSuffix?: string;
  /** Optional. The prefix that should be prepended to all table names. */
  tablePrefix?: string;
  /** Optional. The prefix to prepend to built-in assertion names. */
  builtinAssertionNamePrefix?: string;
  /** Optional. The default notebook runtime options. */
  defaultNotebookRuntimeOptions?: NotebookRuntimeOptions;
}

export const CodeCompilationConfig: Schema.Schema<CodeCompilationConfig> = Schema.suspend(() => Schema.Struct({
  defaultDatabase: Schema.optional(Schema.String),
  defaultSchema: Schema.optional(Schema.String),
  defaultLocation: Schema.optional(Schema.String),
  assertionSchema: Schema.optional(Schema.String),
  vars: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  databaseSuffix: Schema.optional(Schema.String),
  schemaSuffix: Schema.optional(Schema.String),
  tablePrefix: Schema.optional(Schema.String),
  builtinAssertionNamePrefix: Schema.optional(Schema.String),
  defaultNotebookRuntimeOptions: Schema.optional(NotebookRuntimeOptions),
})).annotate({ identifier: "CodeCompilationConfig" }) as any as Schema.Schema<CodeCompilationConfig>;

export interface ScheduledReleaseRecord {
  /** The name of the created compilation result, if one was successfully created. Must be in the format `projects/* /locations/* /repositories/* /compilationResults/*`. */
  compilationResult?: string;
  /** The error status encountered upon this attempt to create the compilation result, if the attempt was unsuccessful. */
  errorStatus?: Status;
  /** Output only. The timestamp of this release attempt. */
  releaseTime?: string;
}

export const ScheduledReleaseRecord: Schema.Schema<ScheduledReleaseRecord> = Schema.suspend(() => Schema.Struct({
  compilationResult: Schema.optional(Schema.String),
  errorStatus: Schema.optional(Status),
  releaseTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ScheduledReleaseRecord" }) as any as Schema.Schema<ScheduledReleaseRecord>;

export interface ReleaseConfig {
  /** Identifier. The release config's name. */
  name?: string;
  /** Required. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1` */
  gitCommitish?: string;
  /** Optional. If set, fields of `code_compilation_config` override the default compilation settings that are specified in dataform.json. */
  codeCompilationConfig?: CodeCompilationConfig;
  /** Optional. Optional schedule (in cron format) for automatic creation of compilation results. */
  cronSchedule?: string;
  /** Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is UTC. */
  timeZone?: string;
  /** Output only. Records of the 10 most recent scheduled release attempts, ordered in descending order of `release_time`. Updated whenever automatic creation of a compilation result is triggered by cron_schedule. */
  recentScheduledReleaseRecords?: Array<ScheduledReleaseRecord>;
  /** Optional. The name of the currently released compilation result for this release config. This value is updated when a compilation result is automatically created from this release config (using cron_schedule), or when this resource is updated by API call (perhaps to roll back to an earlier release). The compilation result must have been created using this release config. Must be in the format `projects/* /locations/* /repositories/* /compilationResults/*`. */
  releaseCompilationResult?: string;
  /** Optional. Disables automatic creation of compilation results. */
  disabled?: boolean;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
}

export const ReleaseConfig: Schema.Schema<ReleaseConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  gitCommitish: Schema.optional(Schema.String),
  codeCompilationConfig: Schema.optional(CodeCompilationConfig),
  cronSchedule: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  recentScheduledReleaseRecords: Schema.optional(Schema.Array(ScheduledReleaseRecord)),
  releaseCompilationResult: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  internalMetadata: Schema.optional(Schema.String),
})).annotate({ identifier: "ReleaseConfig" }) as any as Schema.Schema<ReleaseConfig>;

export interface ListReleaseConfigsResponse {
  /** List of release configs. */
  releaseConfigs?: Array<ReleaseConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations which could not be reached. */
  unreachable?: Array<string>;
}

export const ListReleaseConfigsResponse: Schema.Schema<ListReleaseConfigsResponse> = Schema.suspend(() => Schema.Struct({
  releaseConfigs: Schema.optional(Schema.Array(ReleaseConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListReleaseConfigsResponse" }) as any as Schema.Schema<ListReleaseConfigsResponse>;

export interface Target {
  /** Optional. The action's database (Google Cloud project ID) . */
  database?: string;
  /** Optional. The action's schema (BigQuery dataset ID), within `database`. */
  schema?: string;
  /** Optional. The action's name, within `database` and `schema`. */
  name?: string;
}

export const Target: Schema.Schema<Target> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Target" }) as any as Schema.Schema<Target>;

export interface CompilationError {
  /** Output only. The error's top level message. */
  message?: string;
  /** Output only. The error's full stack trace. */
  stack?: string;
  /** Output only. The path of the file where this error occurred, if available, relative to the project root. */
  path?: string;
  /** Output only. The identifier of the action where this error occurred, if available. */
  actionTarget?: Target;
}

export const CompilationError: Schema.Schema<CompilationError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  stack: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  actionTarget: Schema.optional(Target),
})).annotate({ identifier: "CompilationError" }) as any as Schema.Schema<CompilationError>;

export interface CompilationResult {
  /** Immutable. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1` */
  gitCommitish?: string;
  /** Immutable. The name of the workspace to compile. Must be in the format `projects/* /locations/* /repositories/* /workspaces/*`. */
  workspace?: string;
  /** Immutable. The name of the release config to compile. Must be in the format `projects/* /locations/* /repositories/* /releaseConfigs/*`. */
  releaseConfig?: string;
  /** Output only. The compilation result's name. */
  name?: string;
  /** Immutable. If set, fields of `code_compilation_config` override the default compilation settings that are specified in dataform.json. */
  codeCompilationConfig?: CodeCompilationConfig;
  /** Output only. The fully resolved Git commit SHA of the code that was compiled. Not set for compilation results whose source is a workspace. */
  resolvedGitCommitSha?: string;
  /** Output only. The version of `@dataform/core` that was used for compilation. */
  dataformCoreVersion?: string;
  /** Output only. Errors encountered during project compilation. */
  compilationErrors?: Array<CompilationError>;
  /** Output only. Only set if the repository has a KMS Key. */
  dataEncryptionState?: DataEncryptionState;
  /** Output only. The timestamp of when the compilation result was created. */
  createTime?: string;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
  /** Output only. Metadata indicating whether this resource is user-scoped. `CompilationResult` resource is `user_scoped` only if it is sourced from a workspace. */
  privateResourceMetadata?: PrivateResourceMetadata;
}

export const CompilationResult: Schema.Schema<CompilationResult> = Schema.suspend(() => Schema.Struct({
  gitCommitish: Schema.optional(Schema.String),
  workspace: Schema.optional(Schema.String),
  releaseConfig: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  codeCompilationConfig: Schema.optional(CodeCompilationConfig),
  resolvedGitCommitSha: Schema.optional(Schema.String),
  dataformCoreVersion: Schema.optional(Schema.String),
  compilationErrors: Schema.optional(Schema.Array(CompilationError)),
  dataEncryptionState: Schema.optional(DataEncryptionState),
  createTime: Schema.optional(Schema.String),
  internalMetadata: Schema.optional(Schema.String),
  privateResourceMetadata: Schema.optional(PrivateResourceMetadata),
})).annotate({ identifier: "CompilationResult" }) as any as Schema.Schema<CompilationResult>;

export interface ListCompilationResultsResponse {
  /** List of compilation results. */
  compilationResults?: Array<CompilationResult>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations which could not be reached. */
  unreachable?: Array<string>;
}

export const ListCompilationResultsResponse: Schema.Schema<ListCompilationResultsResponse> = Schema.suspend(() => Schema.Struct({
  compilationResults: Schema.optional(Schema.Array(CompilationResult)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCompilationResultsResponse" }) as any as Schema.Schema<ListCompilationResultsResponse>;

export interface ColumnDescriptor {
  /** The identifier for the column. Each entry in `path` represents one level of nesting. */
  path?: Array<string>;
  /** A textual description of the column. */
  description?: string;
  /** A list of BigQuery policy tags that will be applied to the column. */
  bigqueryPolicyTags?: Array<string>;
}

export const ColumnDescriptor: Schema.Schema<ColumnDescriptor> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  bigqueryPolicyTags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ColumnDescriptor" }) as any as Schema.Schema<ColumnDescriptor>;

export interface RelationDescriptor {
  /** A text description of the relation. */
  description?: string;
  /** A list of descriptions of columns within the relation. */
  columns?: Array<ColumnDescriptor>;
  /** A set of BigQuery labels that should be applied to the relation. */
  bigqueryLabels?: Record<string, string>;
}

export const RelationDescriptor: Schema.Schema<RelationDescriptor> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  columns: Schema.optional(Schema.Array(ColumnDescriptor)),
  bigqueryLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "RelationDescriptor" }) as any as Schema.Schema<RelationDescriptor>;

export interface IncrementalTableConfig {
  /** The SELECT query which returns rows which should be inserted into the relation if it already exists and is not being refreshed. */
  incrementalSelectQuery?: string;
  /** Whether this table should be protected from being refreshed. */
  refreshDisabled?: boolean;
  /** A set of columns or SQL expressions used to define row uniqueness. If any duplicates are discovered (as defined by `unique_key_parts`), only the newly selected rows (as defined by `incremental_select_query`) will be included in the relation. */
  uniqueKeyParts?: Array<string>;
  /** A SQL expression conditional used to limit the set of existing rows considered for a merge operation (see `unique_key_parts` for more information). */
  updatePartitionFilter?: string;
  /** SQL statements to be executed before inserting new rows into the relation. */
  incrementalPreOperations?: Array<string>;
  /** SQL statements to be executed after inserting new rows into the relation. */
  incrementalPostOperations?: Array<string>;
}

export const IncrementalTableConfig: Schema.Schema<IncrementalTableConfig> = Schema.suspend(() => Schema.Struct({
  incrementalSelectQuery: Schema.optional(Schema.String),
  refreshDisabled: Schema.optional(Schema.Boolean),
  uniqueKeyParts: Schema.optional(Schema.Array(Schema.String)),
  updatePartitionFilter: Schema.optional(Schema.String),
  incrementalPreOperations: Schema.optional(Schema.Array(Schema.String)),
  incrementalPostOperations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IncrementalTableConfig" }) as any as Schema.Schema<IncrementalTableConfig>;

export interface Relation {
  /** A list of actions that this action depends on. */
  dependencyTargets?: Array<Target>;
  /** Whether this action is disabled (i.e. should not be run). */
  disabled?: boolean;
  /** Arbitrary, user-defined tags on this action. */
  tags?: Array<string>;
  /** Descriptor for the relation and its columns. */
  relationDescriptor?: RelationDescriptor;
  /** The type of this relation. */
  relationType?: "RELATION_TYPE_UNSPECIFIED" | "TABLE" | "VIEW" | "INCREMENTAL_TABLE" | "MATERIALIZED_VIEW" | (string & {});
  /** The SELECT query which returns rows which this relation should contain. */
  selectQuery?: string;
  /** SQL statements to be executed before creating the relation. */
  preOperations?: Array<string>;
  /** SQL statements to be executed after creating the relation. */
  postOperations?: Array<string>;
  /** Configures `INCREMENTAL_TABLE` settings for this relation. Only set if `relation_type` is `INCREMENTAL_TABLE`. */
  incrementalTableConfig?: IncrementalTableConfig;
  /** The SQL expression used to partition the relation. */
  partitionExpression?: string;
  /** A list of columns or SQL expressions used to cluster the table. */
  clusterExpressions?: Array<string>;
  /** Sets the partition expiration in days. */
  partitionExpirationDays?: number;
  /** Specifies whether queries on this table must include a predicate filter that filters on the partitioning column. */
  requirePartitionFilter?: boolean;
  /** Additional options that will be provided as key/value pairs into the options clause of a create table/view statement. See https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language for more information on which options are supported. */
  additionalOptions?: Record<string, string>;
  /** Optional. The connection specifying the credentials to be used to read and write to external storage, such as Cloud Storage. The connection can have the form `{project}.{location}.{connection_id}` or `projects/{project}/locations/{location}/connections/{connection_id}`, or be set to DEFAULT. */
  connection?: string;
  /** Optional. The table format for the BigQuery table. */
  tableFormat?: "TABLE_FORMAT_UNSPECIFIED" | "ICEBERG" | (string & {});
  /** Optional. The file format for the BigQuery table. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "PARQUET" | (string & {});
  /** Optional. The fully qualified location prefix of the external folder where table data is stored. The URI should be in the format `gs://bucket/path_to_table/`. */
  storageUri?: string;
}

export const Relation: Schema.Schema<Relation> = Schema.suspend(() => Schema.Struct({
  dependencyTargets: Schema.optional(Schema.Array(Target)),
  disabled: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Array(Schema.String)),
  relationDescriptor: Schema.optional(RelationDescriptor),
  relationType: Schema.optional(Schema.String),
  selectQuery: Schema.optional(Schema.String),
  preOperations: Schema.optional(Schema.Array(Schema.String)),
  postOperations: Schema.optional(Schema.Array(Schema.String)),
  incrementalTableConfig: Schema.optional(IncrementalTableConfig),
  partitionExpression: Schema.optional(Schema.String),
  clusterExpressions: Schema.optional(Schema.Array(Schema.String)),
  partitionExpirationDays: Schema.optional(Schema.Number),
  requirePartitionFilter: Schema.optional(Schema.Boolean),
  additionalOptions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  connection: Schema.optional(Schema.String),
  tableFormat: Schema.optional(Schema.String),
  fileFormat: Schema.optional(Schema.String),
  storageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Relation" }) as any as Schema.Schema<Relation>;

export interface Operations {
  /** A list of actions that this action depends on. */
  dependencyTargets?: Array<Target>;
  /** Whether this action is disabled (i.e. should not be run). */
  disabled?: boolean;
  /** Arbitrary, user-defined tags on this action. */
  tags?: Array<string>;
  /** Descriptor for any output relation and its columns. Only set if `has_output` is true. */
  relationDescriptor?: RelationDescriptor;
  /** A list of arbitrary SQL statements that will be executed without alteration. */
  queries?: Array<string>;
  /** Whether these operations produce an output relation. */
  hasOutput?: boolean;
}

export const Operations: Schema.Schema<Operations> = Schema.suspend(() => Schema.Struct({
  dependencyTargets: Schema.optional(Schema.Array(Target)),
  disabled: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Array(Schema.String)),
  relationDescriptor: Schema.optional(RelationDescriptor),
  queries: Schema.optional(Schema.Array(Schema.String)),
  hasOutput: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Operations" }) as any as Schema.Schema<Operations>;

export interface Assertion {
  /** A list of actions that this action depends on. */
  dependencyTargets?: Array<Target>;
  /** The parent action of this assertion. Only set if this assertion was automatically generated. */
  parentAction?: Target;
  /** Whether this action is disabled (i.e. should not be run). */
  disabled?: boolean;
  /** Arbitrary, user-defined tags on this action. */
  tags?: Array<string>;
  /** The SELECT query which must return zero rows in order for this assertion to succeed. */
  selectQuery?: string;
  /** Descriptor for the assertion's automatically-generated view and its columns. */
  relationDescriptor?: RelationDescriptor;
}

export const Assertion: Schema.Schema<Assertion> = Schema.suspend(() => Schema.Struct({
  dependencyTargets: Schema.optional(Schema.Array(Target)),
  parentAction: Schema.optional(Target),
  disabled: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Array(Schema.String)),
  selectQuery: Schema.optional(Schema.String),
  relationDescriptor: Schema.optional(RelationDescriptor),
})).annotate({ identifier: "Assertion" }) as any as Schema.Schema<Assertion>;

export interface Declaration {
  /** Descriptor for the relation and its columns. Used as documentation only, i.e. values here will result in no changes to the relation's metadata. */
  relationDescriptor?: RelationDescriptor;
}

export const Declaration: Schema.Schema<Declaration> = Schema.suspend(() => Schema.Struct({
  relationDescriptor: Schema.optional(RelationDescriptor),
})).annotate({ identifier: "Declaration" }) as any as Schema.Schema<Declaration>;

export interface Notebook {
  /** A list of actions that this action depends on. */
  dependencyTargets?: Array<Target>;
  /** Whether this action is disabled (i.e. should not be run). */
  disabled?: boolean;
  /** The contents of the notebook. */
  contents?: string;
  /** Arbitrary, user-defined tags on this action. */
  tags?: Array<string>;
}

export const Notebook: Schema.Schema<Notebook> = Schema.suspend(() => Schema.Struct({
  dependencyTargets: Schema.optional(Schema.Array(Target)),
  disabled: Schema.optional(Schema.Boolean),
  contents: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Notebook" }) as any as Schema.Schema<Notebook>;

export interface ErrorTable {
  /** Error Table target. */
  target?: Target;
  /** Error table partition expiration in days. Only positive values are allowed. */
  retentionDays?: number;
}

export const ErrorTable: Schema.Schema<ErrorTable> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Target),
  retentionDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "ErrorTable" }) as any as Schema.Schema<ErrorTable>;

export interface SimpleLoadMode {
}

export const SimpleLoadMode: Schema.Schema<SimpleLoadMode> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SimpleLoadMode" }) as any as Schema.Schema<SimpleLoadMode>;

export interface IncrementalLoadMode {
  /** Column name for incremental load modes */
  column?: string;
}

export const IncrementalLoadMode: Schema.Schema<IncrementalLoadMode> = Schema.suspend(() => Schema.Struct({
  column: Schema.optional(Schema.String),
})).annotate({ identifier: "IncrementalLoadMode" }) as any as Schema.Schema<IncrementalLoadMode>;

export interface LoadConfig {
  /** Replace destination table */
  replace?: SimpleLoadMode;
  /** Append into destination table */
  append?: SimpleLoadMode;
  /** Insert records where the value exceeds the previous maximum value for a column in the destination table */
  maximum?: IncrementalLoadMode;
  /** Insert records where the value of a column is not already present in the destination table */
  unique?: IncrementalLoadMode;
}

export const LoadConfig: Schema.Schema<LoadConfig> = Schema.suspend(() => Schema.Struct({
  replace: Schema.optional(SimpleLoadMode),
  append: Schema.optional(SimpleLoadMode),
  maximum: Schema.optional(IncrementalLoadMode),
  unique: Schema.optional(IncrementalLoadMode),
})).annotate({ identifier: "LoadConfig" }) as any as Schema.Schema<LoadConfig>;

export interface SqlDefinition {
  /** The SQL query representing the data preparation steps. Formatted as a Pipe SQL query statement. */
  query?: string;
  /** Error table configuration, */
  errorTable?: ErrorTable;
  /** Load configuration. */
  load?: LoadConfig;
}

export const SqlDefinition: Schema.Schema<SqlDefinition> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  errorTable: Schema.optional(ErrorTable),
  load: Schema.optional(LoadConfig),
})).annotate({ identifier: "SqlDefinition" }) as any as Schema.Schema<SqlDefinition>;

export interface DataPreparation {
  /** The data preparation definition, stored as a YAML string. */
  contentsYaml?: string;
  /** SQL definition for a Data Preparation. Contains a SQL query and additional context information. */
  contentsSql?: SqlDefinition;
  /** A list of actions that this action depends on. */
  dependencyTargets?: Array<Target>;
  /** Whether this action is disabled (i.e. should not be run). */
  disabled?: boolean;
  /** Arbitrary, user-defined tags on this action. */
  tags?: Array<string>;
}

export const DataPreparation: Schema.Schema<DataPreparation> = Schema.suspend(() => Schema.Struct({
  contentsYaml: Schema.optional(Schema.String),
  contentsSql: Schema.optional(SqlDefinition),
  dependencyTargets: Schema.optional(Schema.Array(Target)),
  disabled: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DataPreparation" }) as any as Schema.Schema<DataPreparation>;

export interface CompilationResultAction {
  /** The database relation created/updated by this action. */
  relation?: Relation;
  /** The database operations executed by this action. */
  operations?: Operations;
  /** The assertion executed by this action. */
  assertion?: Assertion;
  /** The declaration declared by this action. */
  declaration?: Declaration;
  /** The notebook executed by this action. */
  notebook?: Notebook;
  /** The data preparation executed by this action. */
  dataPreparation?: DataPreparation;
  /** This action's identifier. Unique within the compilation result. */
  target?: Target;
  /** The action's identifier if the project had been compiled without any overrides configured. Unique within the compilation result. */
  canonicalTarget?: Target;
  /** The full path including filename in which this action is located, relative to the workspace root. */
  filePath?: string;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
}

export const CompilationResultAction: Schema.Schema<CompilationResultAction> = Schema.suspend(() => Schema.Struct({
  relation: Schema.optional(Relation),
  operations: Schema.optional(Operations),
  assertion: Schema.optional(Assertion),
  declaration: Schema.optional(Declaration),
  notebook: Schema.optional(Notebook),
  dataPreparation: Schema.optional(DataPreparation),
  target: Schema.optional(Target),
  canonicalTarget: Schema.optional(Target),
  filePath: Schema.optional(Schema.String),
  internalMetadata: Schema.optional(Schema.String),
})).annotate({ identifier: "CompilationResultAction" }) as any as Schema.Schema<CompilationResultAction>;

export interface QueryCompilationResultActionsResponse {
  /** List of compilation result actions. */
  compilationResultActions?: Array<CompilationResultAction>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const QueryCompilationResultActionsResponse: Schema.Schema<QueryCompilationResultActionsResponse> = Schema.suspend(() => Schema.Struct({
  compilationResultActions: Schema.optional(Schema.Array(CompilationResultAction)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryCompilationResultActionsResponse" }) as any as Schema.Schema<QueryCompilationResultActionsResponse>;

export interface InvocationConfig {
  /** Optional. The set of action identifiers to include. */
  includedTargets?: Array<Target>;
  /** Optional. The set of tags to include. */
  includedTags?: Array<string>;
  /** Optional. When set to true, transitive dependencies of included actions will be executed. */
  transitiveDependenciesIncluded?: boolean;
  /** Optional. When set to true, transitive dependents of included actions will be executed. */
  transitiveDependentsIncluded?: boolean;
  /** Optional. When set to true, any incremental tables will be fully refreshed. */
  fullyRefreshIncrementalTablesEnabled?: boolean;
  /** Optional. The service account to run workflow invocations under. */
  serviceAccount?: string;
  /** Optional. Specifies the priority for query execution in BigQuery. More information can be found at https://cloud.google.com/bigquery/docs/running-queries#queries. */
  queryPriority?: "QUERY_PRIORITY_UNSPECIFIED" | "INTERACTIVE" | "BATCH" | (string & {});
}

export const InvocationConfig: Schema.Schema<InvocationConfig> = Schema.suspend(() => Schema.Struct({
  includedTargets: Schema.optional(Schema.Array(Target)),
  includedTags: Schema.optional(Schema.Array(Schema.String)),
  transitiveDependenciesIncluded: Schema.optional(Schema.Boolean),
  transitiveDependentsIncluded: Schema.optional(Schema.Boolean),
  fullyRefreshIncrementalTablesEnabled: Schema.optional(Schema.Boolean),
  serviceAccount: Schema.optional(Schema.String),
  queryPriority: Schema.optional(Schema.String),
})).annotate({ identifier: "InvocationConfig" }) as any as Schema.Schema<InvocationConfig>;

export interface ScheduledExecutionRecord {
  /** The name of the created workflow invocation, if one was successfully created. Must be in the format `projects/* /locations/* /repositories/* /workflowInvocations/*`. */
  workflowInvocation?: string;
  /** The error status encountered upon this attempt to create the workflow invocation, if the attempt was unsuccessful. */
  errorStatus?: Status;
  /** Output only. The timestamp of this execution attempt. */
  executionTime?: string;
}

export const ScheduledExecutionRecord: Schema.Schema<ScheduledExecutionRecord> = Schema.suspend(() => Schema.Struct({
  workflowInvocation: Schema.optional(Schema.String),
  errorStatus: Schema.optional(Status),
  executionTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ScheduledExecutionRecord" }) as any as Schema.Schema<ScheduledExecutionRecord>;

export interface WorkflowConfig {
  /** Identifier. The workflow config's name. */
  name?: string;
  /** Required. The name of the release config whose release_compilation_result should be executed. Must be in the format `projects/* /locations/* /repositories/* /releaseConfigs/*`. */
  releaseConfig?: string;
  /** Optional. If left unset, a default InvocationConfig will be used. */
  invocationConfig?: InvocationConfig;
  /** Optional. Optional schedule (in cron format) for automatic execution of this workflow config. */
  cronSchedule?: string;
  /** Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is UTC. */
  timeZone?: string;
  /** Output only. Records of the 10 most recent scheduled execution attempts, ordered in descending order of `execution_time`. Updated whenever automatic creation of a workflow invocation is triggered by cron_schedule. */
  recentScheduledExecutionRecords?: Array<ScheduledExecutionRecord>;
  /** Optional. Disables automatic creation of workflow invocations. */
  disabled?: boolean;
  /** Output only. The timestamp of when the WorkflowConfig was created. */
  createTime?: string;
  /** Output only. The timestamp of when the WorkflowConfig was last updated. */
  updateTime?: string;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
}

export const WorkflowConfig: Schema.Schema<WorkflowConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  releaseConfig: Schema.optional(Schema.String),
  invocationConfig: Schema.optional(InvocationConfig),
  cronSchedule: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  recentScheduledExecutionRecords: Schema.optional(Schema.Array(ScheduledExecutionRecord)),
  disabled: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  internalMetadata: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkflowConfig" }) as any as Schema.Schema<WorkflowConfig>;

export interface ListWorkflowConfigsResponse {
  /** List of workflow configs. */
  workflowConfigs?: Array<WorkflowConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations which could not be reached. */
  unreachable?: Array<string>;
}

export const ListWorkflowConfigsResponse: Schema.Schema<ListWorkflowConfigsResponse> = Schema.suspend(() => Schema.Struct({
  workflowConfigs: Schema.optional(Schema.Array(WorkflowConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkflowConfigsResponse" }) as any as Schema.Schema<ListWorkflowConfigsResponse>;

export interface Interval {
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const Interval: Schema.Schema<Interval> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Interval" }) as any as Schema.Schema<Interval>;

export interface WorkflowInvocation {
  /** Immutable. The name of the compilation result to use for this invocation. Must be in the format `projects/* /locations/* /repositories/* /compilationResults/*`. */
  compilationResult?: string;
  /** Immutable. The name of the workflow config to invoke. Must be in the format `projects/* /locations/* /repositories/* /workflowConfigs/*`. */
  workflowConfig?: string;
  /** Output only. The workflow invocation's name. */
  name?: string;
  /** Immutable. If left unset, a default InvocationConfig will be used. */
  invocationConfig?: InvocationConfig;
  /** Output only. This workflow invocation's current state. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "CANCELLED" | "FAILED" | "CANCELING" | (string & {});
  /** Output only. This workflow invocation's timing details. */
  invocationTiming?: Interval;
  /** Output only. The resolved compilation result that was used to create this invocation. Will be in the format `projects/* /locations/* /repositories/* /compilationResults/*`. */
  resolvedCompilationResult?: string;
  /** Output only. Only set if the repository has a KMS Key. */
  dataEncryptionState?: DataEncryptionState;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
  /** Output only. Metadata indicating whether this resource is user-scoped. `WorkflowInvocation` resource is `user_scoped` only if it is sourced from a compilation result and the compilation result is user-scoped. */
  privateResourceMetadata?: PrivateResourceMetadata;
}

export const WorkflowInvocation: Schema.Schema<WorkflowInvocation> = Schema.suspend(() => Schema.Struct({
  compilationResult: Schema.optional(Schema.String),
  workflowConfig: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  invocationConfig: Schema.optional(InvocationConfig),
  state: Schema.optional(Schema.String),
  invocationTiming: Schema.optional(Interval),
  resolvedCompilationResult: Schema.optional(Schema.String),
  dataEncryptionState: Schema.optional(DataEncryptionState),
  internalMetadata: Schema.optional(Schema.String),
  privateResourceMetadata: Schema.optional(PrivateResourceMetadata),
})).annotate({ identifier: "WorkflowInvocation" }) as any as Schema.Schema<WorkflowInvocation>;

export interface ListWorkflowInvocationsResponse {
  /** List of workflow invocations. */
  workflowInvocations?: Array<WorkflowInvocation>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations which could not be reached. */
  unreachable?: Array<string>;
}

export const ListWorkflowInvocationsResponse: Schema.Schema<ListWorkflowInvocationsResponse> = Schema.suspend(() => Schema.Struct({
  workflowInvocations: Schema.optional(Schema.Array(WorkflowInvocation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkflowInvocationsResponse" }) as any as Schema.Schema<ListWorkflowInvocationsResponse>;

export interface CancelWorkflowInvocationRequest {
}

export const CancelWorkflowInvocationRequest: Schema.Schema<CancelWorkflowInvocationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelWorkflowInvocationRequest" }) as any as Schema.Schema<CancelWorkflowInvocationRequest>;

export interface CancelWorkflowInvocationResponse {
}

export const CancelWorkflowInvocationResponse: Schema.Schema<CancelWorkflowInvocationResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelWorkflowInvocationResponse" }) as any as Schema.Schema<CancelWorkflowInvocationResponse>;

export interface BigQueryAction {
  /** Output only. The generated BigQuery SQL script that will be executed. */
  sqlScript?: string;
  /** Output only. The ID of the BigQuery job that executed the SQL in sql_script. Only set once the job has started to run. */
  jobId?: string;
}

export const BigQueryAction: Schema.Schema<BigQueryAction> = Schema.suspend(() => Schema.Struct({
  sqlScript: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryAction" }) as any as Schema.Schema<BigQueryAction>;

export interface NotebookAction {
  /** Output only. The code contents of a Notebook to be run. */
  contents?: string;
  /** Output only. The ID of the Vertex job that executed the notebook in contents and also the ID used for the outputs created in Google Cloud Storage buckets. Only set once the job has started to run. */
  jobId?: string;
}

export const NotebookAction: Schema.Schema<NotebookAction> = Schema.suspend(() => Schema.Struct({
  contents: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
})).annotate({ identifier: "NotebookAction" }) as any as Schema.Schema<NotebookAction>;

export interface ActionErrorTable {
  /** Error Table target. */
  target?: Target;
  /** Error table partition expiration in days. Only positive values are allowed. */
  retentionDays?: number;
}

export const ActionErrorTable: Schema.Schema<ActionErrorTable> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Target),
  retentionDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "ActionErrorTable" }) as any as Schema.Schema<ActionErrorTable>;

export interface ActionSimpleLoadMode {
}

export const ActionSimpleLoadMode: Schema.Schema<ActionSimpleLoadMode> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ActionSimpleLoadMode" }) as any as Schema.Schema<ActionSimpleLoadMode>;

export interface ActionIncrementalLoadMode {
  /** Column name for incremental load modes */
  column?: string;
}

export const ActionIncrementalLoadMode: Schema.Schema<ActionIncrementalLoadMode> = Schema.suspend(() => Schema.Struct({
  column: Schema.optional(Schema.String),
})).annotate({ identifier: "ActionIncrementalLoadMode" }) as any as Schema.Schema<ActionIncrementalLoadMode>;

export interface ActionLoadConfig {
  /** Replace destination table */
  replace?: ActionSimpleLoadMode;
  /** Append into destination table */
  append?: ActionSimpleLoadMode;
  /** Insert records where the value exceeds the previous maximum value for a column in the destination table */
  maximum?: ActionIncrementalLoadMode;
  /** Insert records where the value of a column is not already present in the destination table */
  unique?: ActionIncrementalLoadMode;
}

export const ActionLoadConfig: Schema.Schema<ActionLoadConfig> = Schema.suspend(() => Schema.Struct({
  replace: Schema.optional(ActionSimpleLoadMode),
  append: Schema.optional(ActionSimpleLoadMode),
  maximum: Schema.optional(ActionIncrementalLoadMode),
  unique: Schema.optional(ActionIncrementalLoadMode),
})).annotate({ identifier: "ActionLoadConfig" }) as any as Schema.Schema<ActionLoadConfig>;

export interface ActionSqlDefinition {
  /** The SQL query representing the data preparation steps. Formatted as a Pipe SQL query statement. */
  query?: string;
  /** Error table configuration, */
  errorTable?: ActionErrorTable;
  /** Load configuration. */
  loadConfig?: ActionLoadConfig;
}

export const ActionSqlDefinition: Schema.Schema<ActionSqlDefinition> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  errorTable: Schema.optional(ActionErrorTable),
  loadConfig: Schema.optional(ActionLoadConfig),
})).annotate({ identifier: "ActionSqlDefinition" }) as any as Schema.Schema<ActionSqlDefinition>;

export interface DataPreparationAction {
  /** Output only. YAML representing the contents of the data preparation. Can be used to show the customer what the input was to their workflow. */
  contentsYaml?: string;
  /** SQL definition for a Data Preparation. Contains a SQL query and additional context information. */
  contentsSql?: ActionSqlDefinition;
  /** Output only. The generated BigQuery SQL script that will be executed. For reference only. */
  generatedSql?: string;
  /** Output only. The ID of the BigQuery job that executed the SQL in sql_script. Only set once the job has started to run. */
  jobId?: string;
}

export const DataPreparationAction: Schema.Schema<DataPreparationAction> = Schema.suspend(() => Schema.Struct({
  contentsYaml: Schema.optional(Schema.String),
  contentsSql: Schema.optional(ActionSqlDefinition),
  generatedSql: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
})).annotate({ identifier: "DataPreparationAction" }) as any as Schema.Schema<DataPreparationAction>;

export interface WorkflowInvocationAction {
  /** Output only. The workflow action's bigquery action details. */
  bigqueryAction?: BigQueryAction;
  /** Output only. The workflow action's notebook action details. */
  notebookAction?: NotebookAction;
  /** Output only. The workflow action's data preparation action details. */
  dataPreparationAction?: DataPreparationAction;
  /** Output only. This action's identifier. Unique within the workflow invocation. */
  target?: Target;
  /** Output only. The action's identifier if the project had been compiled without any overrides configured. Unique within the compilation result. */
  canonicalTarget?: Target;
  /** Output only. This action's current state. */
  state?: "PENDING" | "RUNNING" | "SKIPPED" | "DISABLED" | "SUCCEEDED" | "CANCELLED" | "FAILED" | (string & {});
  /** Output only. If and only if action's state is FAILED a failure reason is set. */
  failureReason?: string;
  /** Output only. This action's timing details. `start_time` will be set if the action is in [RUNNING, SUCCEEDED, CANCELLED, FAILED] state. `end_time` will be set if the action is in [SUCCEEDED, CANCELLED, FAILED] state. */
  invocationTiming?: Interval;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
}

export const WorkflowInvocationAction: Schema.Schema<WorkflowInvocationAction> = Schema.suspend(() => Schema.Struct({
  bigqueryAction: Schema.optional(BigQueryAction),
  notebookAction: Schema.optional(NotebookAction),
  dataPreparationAction: Schema.optional(DataPreparationAction),
  target: Schema.optional(Target),
  canonicalTarget: Schema.optional(Target),
  state: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  invocationTiming: Schema.optional(Interval),
  internalMetadata: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkflowInvocationAction" }) as any as Schema.Schema<WorkflowInvocationAction>;

export interface QueryWorkflowInvocationActionsResponse {
  /** List of workflow invocation actions. */
  workflowInvocationActions?: Array<WorkflowInvocationAction>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const QueryWorkflowInvocationActionsResponse: Schema.Schema<QueryWorkflowInvocationActionsResponse> = Schema.suspend(() => Schema.Struct({
  workflowInvocationActions: Schema.optional(Schema.Array(WorkflowInvocationAction)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryWorkflowInvocationActionsResponse" }) as any as Schema.Schema<QueryWorkflowInvocationActionsResponse>;

export interface Config {
  /** Identifier. The config name. */
  name?: string;
  /** Optional. The default KMS key that is used if no encryption key is provided when a repository is created. */
  defaultKmsKeyName?: string;
  /** Output only. All the metadata information that is used internally to serve the resource. For example: timestamps, flags, status fields, etc. The format of this field is a JSON string. */
  internalMetadata?: string;
}

export const Config: Schema.Schema<Config> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  defaultKmsKeyName: Schema.optional(Schema.String),
  internalMetadata: Schema.optional(Schema.String),
})).annotate({ identifier: "Config" }) as any as Schema.Schema<Config>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface PolicyName {
  /** Resource type. Types are defined in IAM's .service files. Valid values for type might be 'storage_buckets', 'compute_instances', 'resourcemanager_customers', 'billing_accounts', etc. */
  type?: string;
  /** Identifies an instance of the type. ID format varies by type. The ID format is defined in the IAM .service file that defines the type, either in path_mapping or in a comment. */
  id?: string;
  /** For Cloud IAM: The location of the Policy. Must be empty or "global" for Policies owned by global IAM. Must name a region from prodspec/cloud-iam-cloudspec for Regional IAM Policies, see go/iam-faq#where-is-iam-currently-deployed. For Local IAM: This field should be set to "local". */
  region?: string;
}

export const PolicyName: Schema.Schema<PolicyName> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyName" }) as any as Schema.Schema<PolicyName>;

export interface IamPolicyOverrideView {
  /** The IAM policy name for the resource. */
  iamPolicyName?: PolicyName;
  /** Whether the IAM policy encoded in this view is active. */
  isActive?: boolean;
}

export const IamPolicyOverrideView: Schema.Schema<IamPolicyOverrideView> = Schema.suspend(() => Schema.Struct({
  iamPolicyName: Schema.optional(PolicyName),
  isActive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IamPolicyOverrideView" }) as any as Schema.Schema<IamPolicyOverrideView>;

// ==========================================================================
// Operations
// ==========================================================================

/** Get default config for a given project and location. */
export interface GetConfigProjectsLocationsRequest {
  /** Required. The config name. */
  name: string;
}

export const GetConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsLocationsRequest>;

export type GetConfigProjectsLocationsResponse = Config;
export const GetConfigProjectsLocationsResponse = Config;

export type GetConfigProjectsLocationsError = CommonErrors;

export const getConfigProjectsLocations: API.OperationMethod<GetConfigProjectsLocationsRequest, GetConfigProjectsLocationsResponse, GetConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsLocationsRequest,
  output: GetConfigProjectsLocationsResponse,
  errors: [],
}));

/** Update default config for a given project and location. **Note:** *This method does not fully implement [AIP/134](https://google.aip.dev/134). The wildcard entry (\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.* */
export interface UpdateConfigProjectsLocationsRequest {
  /** Identifier. The config name. */
  name: string;
  /** Optional. Specifies the fields to be updated in the config. */
  updateMask?: string;
  /** Request body */
  body?: Config;
}

export const UpdateConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Config).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigProjectsLocationsRequest>;

export type UpdateConfigProjectsLocationsResponse = Config;
export const UpdateConfigProjectsLocationsResponse = Config;

export type UpdateConfigProjectsLocationsError = CommonErrors;

export const updateConfigProjectsLocations: API.OperationMethod<UpdateConfigProjectsLocationsRequest, UpdateConfigProjectsLocationsResponse, UpdateConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigProjectsLocationsRequest,
  output: UpdateConfigProjectsLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists Repositories in a given project and location. **Note:** *This method can return repositories not shown in the [Dataform UI](https://console.cloud.google.com/bigquery/dataform)*. */
export interface ListProjectsLocationsRepositoriesRequest {
  /** Required. The location in which to list repositories. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Maximum number of repositories to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListRepositories` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRepositories`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. This field only supports ordering by `name`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. */
  orderBy?: string;
  /** Optional. Filter for the returned list. */
  filter?: string;
}

export const ListProjectsLocationsRepositoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesRequest>;

export type ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;
export const ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;

export type ListProjectsLocationsRepositoriesError = CommonErrors;

export const listProjectsLocationsRepositories = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesRequest,
  output: ListProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a single Repository. */
export interface GetProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
}

export const GetProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesRequest>;

export type GetProjectsLocationsRepositoriesResponse = Repository;
export const GetProjectsLocationsRepositoriesResponse = Repository;

export type GetProjectsLocationsRepositoriesError = CommonErrors;

export const getProjectsLocationsRepositories: API.OperationMethod<GetProjectsLocationsRepositoriesRequest, GetProjectsLocationsRepositoriesResponse, GetProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesRequest,
  output: GetProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Creates a new Repository in a given project and location. */
export interface CreateProjectsLocationsRepositoriesRequest {
  /** Required. The location in which to create the repository. Must be in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. The ID to use for the repository, which will become the final component of the repository's resource name. */
  repositoryId?: string;
  /** Request body */
  body?: Repository;
}

export const CreateProjectsLocationsRepositoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  repositoryId: Schema.optional(Schema.String).pipe(T.HttpQuery("repositoryId")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesRequest>;

export type CreateProjectsLocationsRepositoriesResponse = Repository;
export const CreateProjectsLocationsRepositoriesResponse = Repository;

export type CreateProjectsLocationsRepositoriesError = CommonErrors;

export const createProjectsLocationsRepositories: API.OperationMethod<CreateProjectsLocationsRepositoriesRequest, CreateProjectsLocationsRepositoriesResponse, CreateProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesRequest,
  output: CreateProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Updates a single Repository. **Note:** *This method does not fully implement [AIP/134](https://google.aip.dev/134). The wildcard entry (\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.* */
export interface PatchProjectsLocationsRepositoriesRequest {
  /** Identifier. The repository's name. */
  name: string;
  /** Optional. Specifies the fields to be updated in the repository. If left unset, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Repository;
}

export const PatchProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesRequest>;

export type PatchProjectsLocationsRepositoriesResponse = Repository;
export const PatchProjectsLocationsRepositoriesResponse = Repository;

export type PatchProjectsLocationsRepositoriesError = CommonErrors;

export const patchProjectsLocationsRepositories: API.OperationMethod<PatchProjectsLocationsRepositoriesRequest, PatchProjectsLocationsRepositoriesResponse, PatchProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesRequest,
  output: PatchProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Deletes a single Repository. */
export interface DeleteProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
  /** Optional. If set to true, child resources of this repository (compilation results and workflow invocations) will also be deleted. Otherwise, the request will only succeed if the repository has no child resources. **Note:** *This flag doesn't support deletion of workspaces, release configs or workflow configs. If any of such resources exists in the repository, the request will fail.*. */
  force?: boolean;
}

export const DeleteProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesRequest>;

export type DeleteProjectsLocationsRepositoriesResponse = Empty;
export const DeleteProjectsLocationsRepositoriesResponse = Empty;

export type DeleteProjectsLocationsRepositoriesError = CommonErrors;

export const deleteProjectsLocationsRepositories: API.OperationMethod<DeleteProjectsLocationsRepositoriesRequest, DeleteProjectsLocationsRepositoriesResponse, DeleteProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesRequest,
  output: DeleteProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Applies a Git commit to a Repository. The Repository must not have a value for `git_remote_settings.url`. */
export interface CommitProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
  /** Request body */
  body?: CommitRepositoryChangesRequest;
}

export const CommitProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CommitRepositoryChangesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitProjectsLocationsRepositoriesRequest>;

export type CommitProjectsLocationsRepositoriesResponse = CommitRepositoryChangesResponse;
export const CommitProjectsLocationsRepositoriesResponse = CommitRepositoryChangesResponse;

export type CommitProjectsLocationsRepositoriesError = CommonErrors;

export const commitProjectsLocationsRepositories: API.OperationMethod<CommitProjectsLocationsRepositoriesRequest, CommitProjectsLocationsRepositoriesResponse, CommitProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitProjectsLocationsRepositoriesRequest,
  output: CommitProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Returns the contents of a file (inside a Repository). The Repository must not have a value for `git_remote_settings.url`. */
export interface ReadFileProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
  /** Optional. The commit SHA for the commit to read from. If unset, the file will be read from HEAD. */
  commitSha?: string;
  /** Required. Full file path to read including filename, from repository root. */
  path?: string;
}

export const ReadFileProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  commitSha: Schema.optional(Schema.String).pipe(T.HttpQuery("commitSha")),
  path: Schema.optional(Schema.String).pipe(T.HttpQuery("path")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:readFile" }),
  svc,
) as unknown as Schema.Schema<ReadFileProjectsLocationsRepositoriesRequest>;

export type ReadFileProjectsLocationsRepositoriesResponse = ReadRepositoryFileResponse;
export const ReadFileProjectsLocationsRepositoriesResponse = ReadRepositoryFileResponse;

export type ReadFileProjectsLocationsRepositoriesError = CommonErrors;

export const readFileProjectsLocationsRepositories: API.OperationMethod<ReadFileProjectsLocationsRepositoriesRequest, ReadFileProjectsLocationsRepositoriesResponse, ReadFileProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReadFileProjectsLocationsRepositoriesRequest,
  output: ReadFileProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Returns the contents of a given Repository directory. The Repository must not have a value for `git_remote_settings.url`. */
export interface QueryDirectoryContentsProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
  /** Optional. The Commit SHA for the commit to query from. If unset, the directory will be queried from HEAD. */
  commitSha?: string;
  /** Optional. The directory's full path including directory name, relative to root. If left unset, the root is used. */
  path?: string;
  /** Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `QueryRepositoryDirectoryContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryRepositoryDirectoryContents`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
}

export const QueryDirectoryContentsProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  commitSha: Schema.optional(Schema.String).pipe(T.HttpQuery("commitSha")),
  path: Schema.optional(Schema.String).pipe(T.HttpQuery("path")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:queryDirectoryContents" }),
  svc,
) as unknown as Schema.Schema<QueryDirectoryContentsProjectsLocationsRepositoriesRequest>;

export type QueryDirectoryContentsProjectsLocationsRepositoriesResponse = QueryRepositoryDirectoryContentsResponse;
export const QueryDirectoryContentsProjectsLocationsRepositoriesResponse = QueryRepositoryDirectoryContentsResponse;

export type QueryDirectoryContentsProjectsLocationsRepositoriesError = CommonErrors;

export const queryDirectoryContentsProjectsLocationsRepositories = API.makePaginated(() => ({
  input: QueryDirectoryContentsProjectsLocationsRepositoriesRequest,
  output: QueryDirectoryContentsProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a Repository's history of commits. The Repository must not have a value for `git_remote_settings.url`. */
export interface FetchHistoryProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
  /** Optional. Maximum number of commits to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `FetchRepositoryHistory` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchRepositoryHistory`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
}

export const FetchHistoryProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:fetchHistory" }),
  svc,
) as unknown as Schema.Schema<FetchHistoryProjectsLocationsRepositoriesRequest>;

export type FetchHistoryProjectsLocationsRepositoriesResponse = FetchRepositoryHistoryResponse;
export const FetchHistoryProjectsLocationsRepositoriesResponse = FetchRepositoryHistoryResponse;

export type FetchHistoryProjectsLocationsRepositoriesError = CommonErrors;

export const fetchHistoryProjectsLocationsRepositories = API.makePaginated(() => ({
  input: FetchHistoryProjectsLocationsRepositoriesRequest,
  output: FetchHistoryProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Computes a Repository's Git access token status. */
export interface ComputeAccessTokenStatusProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
}

export const ComputeAccessTokenStatusProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:computeAccessTokenStatus" }),
  svc,
) as unknown as Schema.Schema<ComputeAccessTokenStatusProjectsLocationsRepositoriesRequest>;

export type ComputeAccessTokenStatusProjectsLocationsRepositoriesResponse = ComputeRepositoryAccessTokenStatusResponse;
export const ComputeAccessTokenStatusProjectsLocationsRepositoriesResponse = ComputeRepositoryAccessTokenStatusResponse;

export type ComputeAccessTokenStatusProjectsLocationsRepositoriesError = CommonErrors;

export const computeAccessTokenStatusProjectsLocationsRepositories: API.OperationMethod<ComputeAccessTokenStatusProjectsLocationsRepositoriesRequest, ComputeAccessTokenStatusProjectsLocationsRepositoriesResponse, ComputeAccessTokenStatusProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeAccessTokenStatusProjectsLocationsRepositoriesRequest,
  output: ComputeAccessTokenStatusProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Fetches a Repository's remote branches. */
export interface FetchRemoteBranchesProjectsLocationsRepositoriesRequest {
  /** Required. The repository's name. */
  name: string;
}

export const FetchRemoteBranchesProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:fetchRemoteBranches" }),
  svc,
) as unknown as Schema.Schema<FetchRemoteBranchesProjectsLocationsRepositoriesRequest>;

export type FetchRemoteBranchesProjectsLocationsRepositoriesResponse = FetchRemoteBranchesResponse;
export const FetchRemoteBranchesProjectsLocationsRepositoriesResponse = FetchRemoteBranchesResponse;

export type FetchRemoteBranchesProjectsLocationsRepositoriesError = CommonErrors;

export const fetchRemoteBranchesProjectsLocationsRepositories: API.OperationMethod<FetchRemoteBranchesProjectsLocationsRepositoriesRequest, FetchRemoteBranchesProjectsLocationsRepositoriesResponse, FetchRemoteBranchesProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchRemoteBranchesProjectsLocationsRepositoriesRequest,
  output: FetchRemoteBranchesProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRepositoriesRequest>;

export type GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type GetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

export const getIamPolicyProjectsLocationsRepositories: API.OperationMethod<GetIamPolicyProjectsLocationsRepositoriesRequest, GetIamPolicyProjectsLocationsRepositoriesResponse, GetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRepositoriesRequest,
  output: GetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRepositoriesRequest>;

export type SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type SetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

export const setIamPolicyProjectsLocationsRepositories: API.OperationMethod<SetIamPolicyProjectsLocationsRepositoriesRequest, SetIamPolicyProjectsLocationsRepositoriesResponse, SetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRepositoriesRequest,
  output: SetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRepositoriesRequest>;

export type TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRepositoriesError = CommonErrors;

export const testIamPermissionsProjectsLocationsRepositories: API.OperationMethod<TestIamPermissionsProjectsLocationsRepositoriesRequest, TestIamPermissionsProjectsLocationsRepositoriesResponse, TestIamPermissionsProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRepositoriesRequest,
  output: TestIamPermissionsProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Lists Workspaces in a given Repository. */
export interface ListProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The repository in which to list workspaces. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Optional. Maximum number of workspaces to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListWorkspaces` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkspaces`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. This field only supports ordering by `name`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. */
  orderBy?: string;
  /** Optional. Filter for the returned list. */
  filter?: string;
}

export const ListProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesWorkspacesRequest>;

export type ListProjectsLocationsRepositoriesWorkspacesResponse = ListWorkspacesResponse;
export const ListProjectsLocationsRepositoriesWorkspacesResponse = ListWorkspacesResponse;

export type ListProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const listProjectsLocationsRepositoriesWorkspaces = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesWorkspacesRequest,
  output: ListProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a single Workspace. */
export interface GetProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
}

export const GetProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesWorkspacesRequest>;

export type GetProjectsLocationsRepositoriesWorkspacesResponse = Workspace;
export const GetProjectsLocationsRepositoriesWorkspacesResponse = Workspace;

export type GetProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const getProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<GetProjectsLocationsRepositoriesWorkspacesRequest, GetProjectsLocationsRepositoriesWorkspacesResponse, GetProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesWorkspacesRequest,
  output: GetProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Creates a new Workspace in a given Repository. */
export interface CreateProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The repository in which to create the workspace. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Required. The ID to use for the workspace, which will become the final component of the workspace's resource name. */
  workspaceId?: string;
  /** Request body */
  body?: Workspace;
}

export const CreateProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  workspaceId: Schema.optional(Schema.String).pipe(T.HttpQuery("workspaceId")),
  body: Schema.optional(Workspace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesWorkspacesRequest>;

export type CreateProjectsLocationsRepositoriesWorkspacesResponse = Workspace;
export const CreateProjectsLocationsRepositoriesWorkspacesResponse = Workspace;

export type CreateProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const createProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<CreateProjectsLocationsRepositoriesWorkspacesRequest, CreateProjectsLocationsRepositoriesWorkspacesResponse, CreateProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesWorkspacesRequest,
  output: CreateProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Deletes a single Workspace. */
export interface DeleteProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace resource's name. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesWorkspacesRequest>;

export type DeleteProjectsLocationsRepositoriesWorkspacesResponse = Empty;
export const DeleteProjectsLocationsRepositoriesWorkspacesResponse = Empty;

export type DeleteProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const deleteProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<DeleteProjectsLocationsRepositoriesWorkspacesRequest, DeleteProjectsLocationsRepositoriesWorkspacesResponse, DeleteProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesWorkspacesRequest,
  output: DeleteProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Installs dependency NPM packages (inside a Workspace). */
export interface InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: InstallNpmPackagesRequest;
}

export const InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(InstallNpmPackagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:installNpmPackages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesRequest>;

export type InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesResponse = InstallNpmPackagesResponse;
export const InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesResponse = InstallNpmPackagesResponse;

export type InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const installNpmPackagesProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesRequest, InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesResponse, InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesRequest,
  output: InstallNpmPackagesProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Pulls Git commits from the Repository's remote into a Workspace. */
export interface PullProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
  /** Request body */
  body?: PullGitCommitsRequest;
}

export const PullProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PullGitCommitsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:pull", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PullProjectsLocationsRepositoriesWorkspacesRequest>;

export type PullProjectsLocationsRepositoriesWorkspacesResponse = PullGitCommitsResponse;
export const PullProjectsLocationsRepositoriesWorkspacesResponse = PullGitCommitsResponse;

export type PullProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const pullProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<PullProjectsLocationsRepositoriesWorkspacesRequest, PullProjectsLocationsRepositoriesWorkspacesResponse, PullProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PullProjectsLocationsRepositoriesWorkspacesRequest,
  output: PullProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Pushes Git commits from a Workspace to the Repository's remote. */
export interface PushProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
  /** Request body */
  body?: PushGitCommitsRequest;
}

export const PushProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PushGitCommitsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:push", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PushProjectsLocationsRepositoriesWorkspacesRequest>;

export type PushProjectsLocationsRepositoriesWorkspacesResponse = PushGitCommitsResponse;
export const PushProjectsLocationsRepositoriesWorkspacesResponse = PushGitCommitsResponse;

export type PushProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const pushProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<PushProjectsLocationsRepositoriesWorkspacesRequest, PushProjectsLocationsRepositoriesWorkspacesResponse, PushProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PushProjectsLocationsRepositoriesWorkspacesRequest,
  output: PushProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Fetches Git statuses for the files in a Workspace. */
export interface FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
}

export const FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:fetchFileGitStatuses" }),
  svc,
) as unknown as Schema.Schema<FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesRequest>;

export type FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesResponse = FetchFileGitStatusesResponse;
export const FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesResponse = FetchFileGitStatusesResponse;

export type FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const fetchFileGitStatusesProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesRequest, FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesResponse, FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesRequest,
  output: FetchFileGitStatusesProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Fetches Git ahead/behind against a remote branch. */
export interface FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
  /** Optional. The name of the branch in the Git remote against which this workspace should be compared. If left unset, the repository's default branch name will be used. */
  remoteBranch?: string;
}

export const FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  remoteBranch: Schema.optional(Schema.String).pipe(T.HttpQuery("remoteBranch")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:fetchGitAheadBehind" }),
  svc,
) as unknown as Schema.Schema<FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesRequest>;

export type FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesResponse = FetchGitAheadBehindResponse;
export const FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesResponse = FetchGitAheadBehindResponse;

export type FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const fetchGitAheadBehindProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesRequest, FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesResponse, FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesRequest,
  output: FetchGitAheadBehindProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Applies a Git commit for uncommitted files in a Workspace. */
export interface CommitProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
  /** Request body */
  body?: CommitWorkspaceChangesRequest;
}

export const CommitProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CommitWorkspaceChangesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitProjectsLocationsRepositoriesWorkspacesRequest>;

export type CommitProjectsLocationsRepositoriesWorkspacesResponse = CommitWorkspaceChangesResponse;
export const CommitProjectsLocationsRepositoriesWorkspacesResponse = CommitWorkspaceChangesResponse;

export type CommitProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const commitProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<CommitProjectsLocationsRepositoriesWorkspacesRequest, CommitProjectsLocationsRepositoriesWorkspacesResponse, CommitProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitProjectsLocationsRepositoriesWorkspacesRequest,
  output: CommitProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Performs a Git reset for uncommitted files in a Workspace. */
export interface ResetProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  name: string;
  /** Request body */
  body?: ResetWorkspaceChangesRequest;
}

export const ResetProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResetWorkspaceChangesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetProjectsLocationsRepositoriesWorkspacesRequest>;

export type ResetProjectsLocationsRepositoriesWorkspacesResponse = ResetWorkspaceChangesResponse;
export const ResetProjectsLocationsRepositoriesWorkspacesResponse = ResetWorkspaceChangesResponse;

export type ResetProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const resetProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<ResetProjectsLocationsRepositoriesWorkspacesRequest, ResetProjectsLocationsRepositoriesWorkspacesResponse, ResetProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetProjectsLocationsRepositoriesWorkspacesRequest,
  output: ResetProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Fetches Git diff for an uncommitted file in a Workspace. */
export interface FetchFileDiffProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Required. The file's full path including filename, relative to the workspace root. */
  path?: string;
}

export const FetchFileDiffProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  path: Schema.optional(Schema.String).pipe(T.HttpQuery("path")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:fetchFileDiff" }),
  svc,
) as unknown as Schema.Schema<FetchFileDiffProjectsLocationsRepositoriesWorkspacesRequest>;

export type FetchFileDiffProjectsLocationsRepositoriesWorkspacesResponse = FetchFileDiffResponse;
export const FetchFileDiffProjectsLocationsRepositoriesWorkspacesResponse = FetchFileDiffResponse;

export type FetchFileDiffProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const fetchFileDiffProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<FetchFileDiffProjectsLocationsRepositoriesWorkspacesRequest, FetchFileDiffProjectsLocationsRepositoriesWorkspacesResponse, FetchFileDiffProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchFileDiffProjectsLocationsRepositoriesWorkspacesRequest,
  output: FetchFileDiffProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Returns the contents of a given Workspace directory. */
export interface QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Optional. The directory's full path including directory name, relative to the workspace root. If left unset, the workspace root is used. */
  path?: string;
  /** Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `QueryDirectoryContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryDirectoryContents`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
}

export const QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  path: Schema.optional(Schema.String).pipe(T.HttpQuery("path")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:queryDirectoryContents" }),
  svc,
) as unknown as Schema.Schema<QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesRequest>;

export type QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesResponse = QueryDirectoryContentsResponse;
export const QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesResponse = QueryDirectoryContentsResponse;

export type QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const queryDirectoryContentsProjectsLocationsRepositoriesWorkspaces = API.makePaginated(() => ({
  input: QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesRequest,
  output: QueryDirectoryContentsProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Finds the contents of a given Workspace directory by filter. */
export interface SearchFilesProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Optional. Maximum number of search results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `SearchFilesRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchFilesRequest`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Optional filter for the returned list in filtering format. Filtering is only currently supported on the `path` field. See https://google.aip.dev/160 for details. */
  filter?: string;
}

export const SearchFilesProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:searchFiles" }),
  svc,
) as unknown as Schema.Schema<SearchFilesProjectsLocationsRepositoriesWorkspacesRequest>;

export type SearchFilesProjectsLocationsRepositoriesWorkspacesResponse = SearchFilesResponse;
export const SearchFilesProjectsLocationsRepositoriesWorkspacesResponse = SearchFilesResponse;

export type SearchFilesProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const searchFilesProjectsLocationsRepositoriesWorkspaces = API.makePaginated(() => ({
  input: SearchFilesProjectsLocationsRepositoriesWorkspacesRequest,
  output: SearchFilesProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a directory inside a Workspace. */
export interface MakeDirectoryProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: MakeDirectoryRequest;
}

export const MakeDirectoryProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(MakeDirectoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:makeDirectory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MakeDirectoryProjectsLocationsRepositoriesWorkspacesRequest>;

export type MakeDirectoryProjectsLocationsRepositoriesWorkspacesResponse = MakeDirectoryResponse;
export const MakeDirectoryProjectsLocationsRepositoriesWorkspacesResponse = MakeDirectoryResponse;

export type MakeDirectoryProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const makeDirectoryProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<MakeDirectoryProjectsLocationsRepositoriesWorkspacesRequest, MakeDirectoryProjectsLocationsRepositoriesWorkspacesResponse, MakeDirectoryProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MakeDirectoryProjectsLocationsRepositoriesWorkspacesRequest,
  output: MakeDirectoryProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Deletes a directory (inside a Workspace) and all of its contents. */
export interface RemoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: RemoveDirectoryRequest;
}

export const RemoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(RemoveDirectoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:removeDirectory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest>;

export type RemoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse = RemoveDirectoryResponse;
export const RemoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse = RemoveDirectoryResponse;

export type RemoveDirectoryProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const removeDirectoryProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<RemoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest, RemoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse, RemoveDirectoryProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest,
  output: RemoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Moves a directory (inside a Workspace), and all of its contents, to a new location. */
export interface MoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: MoveDirectoryRequest;
}

export const MoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(MoveDirectoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:moveDirectory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest>;

export type MoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse = MoveDirectoryResponse;
export const MoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse = MoveDirectoryResponse;

export type MoveDirectoryProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const moveDirectoryProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<MoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest, MoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse, MoveDirectoryProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveDirectoryProjectsLocationsRepositoriesWorkspacesRequest,
  output: MoveDirectoryProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Returns the contents of a file (inside a Workspace). */
export interface ReadFileProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Required. The file's full path including filename, relative to the workspace root. */
  path?: string;
  /** Optional. The Git revision of the file to return. If left empty, the current contents of `path` will be returned. */
  revision?: string;
}

export const ReadFileProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  path: Schema.optional(Schema.String).pipe(T.HttpQuery("path")),
  revision: Schema.optional(Schema.String).pipe(T.HttpQuery("revision")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:readFile" }),
  svc,
) as unknown as Schema.Schema<ReadFileProjectsLocationsRepositoriesWorkspacesRequest>;

export type ReadFileProjectsLocationsRepositoriesWorkspacesResponse = ReadFileResponse;
export const ReadFileProjectsLocationsRepositoriesWorkspacesResponse = ReadFileResponse;

export type ReadFileProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const readFileProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<ReadFileProjectsLocationsRepositoriesWorkspacesRequest, ReadFileProjectsLocationsRepositoriesWorkspacesResponse, ReadFileProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReadFileProjectsLocationsRepositoriesWorkspacesRequest,
  output: ReadFileProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Deletes a file (inside a Workspace). */
export interface RemoveFileProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: RemoveFileRequest;
}

export const RemoveFileProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(RemoveFileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:removeFile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveFileProjectsLocationsRepositoriesWorkspacesRequest>;

export type RemoveFileProjectsLocationsRepositoriesWorkspacesResponse = RemoveFileResponse;
export const RemoveFileProjectsLocationsRepositoriesWorkspacesResponse = RemoveFileResponse;

export type RemoveFileProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const removeFileProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<RemoveFileProjectsLocationsRepositoriesWorkspacesRequest, RemoveFileProjectsLocationsRepositoriesWorkspacesResponse, RemoveFileProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveFileProjectsLocationsRepositoriesWorkspacesRequest,
  output: RemoveFileProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Moves a file (inside a Workspace) to a new location. */
export interface MoveFileProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: MoveFileRequest;
}

export const MoveFileProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(MoveFileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:moveFile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveFileProjectsLocationsRepositoriesWorkspacesRequest>;

export type MoveFileProjectsLocationsRepositoriesWorkspacesResponse = MoveFileResponse;
export const MoveFileProjectsLocationsRepositoriesWorkspacesResponse = MoveFileResponse;

export type MoveFileProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const moveFileProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<MoveFileProjectsLocationsRepositoriesWorkspacesRequest, MoveFileProjectsLocationsRepositoriesWorkspacesResponse, MoveFileProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveFileProjectsLocationsRepositoriesWorkspacesRequest,
  output: MoveFileProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Writes to a file (inside a Workspace). */
export interface WriteFileProjectsLocationsRepositoriesWorkspacesRequest {
  /** Required. The workspace's name. */
  workspace: string;
  /** Request body */
  body?: WriteFileRequest;
}

export const WriteFileProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  workspace: Schema.String.pipe(T.HttpPath("workspace")),
  body: Schema.optional(WriteFileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:writeFile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteFileProjectsLocationsRepositoriesWorkspacesRequest>;

export type WriteFileProjectsLocationsRepositoriesWorkspacesResponse = WriteFileResponse;
export const WriteFileProjectsLocationsRepositoriesWorkspacesResponse = WriteFileResponse;

export type WriteFileProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const writeFileProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<WriteFileProjectsLocationsRepositoriesWorkspacesRequest, WriteFileProjectsLocationsRepositoriesWorkspacesResponse, WriteFileProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteFileProjectsLocationsRepositoriesWorkspacesRequest,
  output: WriteFileProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest>;

export type GetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse = Policy;
export const GetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse = Policy;

export type GetIamPolicyProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const getIamPolicyProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<GetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest, GetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse, GetIamPolicyProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest,
  output: GetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest>;

export type SetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse = Policy;
export const SetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse = Policy;

export type SetIamPolicyProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const setIamPolicyProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<SetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest, SetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse, SetIamPolicyProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRepositoriesWorkspacesRequest,
  output: SetIamPolicyProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsRepositoriesWorkspacesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRepositoriesWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRepositoriesWorkspacesRequest>;

export type TestIamPermissionsProjectsLocationsRepositoriesWorkspacesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRepositoriesWorkspacesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRepositoriesWorkspacesError = CommonErrors;

export const testIamPermissionsProjectsLocationsRepositoriesWorkspaces: API.OperationMethod<TestIamPermissionsProjectsLocationsRepositoriesWorkspacesRequest, TestIamPermissionsProjectsLocationsRepositoriesWorkspacesResponse, TestIamPermissionsProjectsLocationsRepositoriesWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRepositoriesWorkspacesRequest,
  output: TestIamPermissionsProjectsLocationsRepositoriesWorkspacesResponse,
  errors: [],
}));

/** Lists ReleaseConfigs in a given Repository. */
export interface ListProjectsLocationsRepositoriesReleaseConfigsRequest {
  /** Required. The repository in which to list release configs. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Optional. Maximum number of release configs to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListReleaseConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReleaseConfigs`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesReleaseConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesReleaseConfigsRequest>;

export type ListProjectsLocationsRepositoriesReleaseConfigsResponse = ListReleaseConfigsResponse;
export const ListProjectsLocationsRepositoriesReleaseConfigsResponse = ListReleaseConfigsResponse;

export type ListProjectsLocationsRepositoriesReleaseConfigsError = CommonErrors;

export const listProjectsLocationsRepositoriesReleaseConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesReleaseConfigsRequest,
  output: ListProjectsLocationsRepositoriesReleaseConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a single ReleaseConfig. */
export interface GetProjectsLocationsRepositoriesReleaseConfigsRequest {
  /** Required. The release config's name. */
  name: string;
}

export const GetProjectsLocationsRepositoriesReleaseConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs/{releaseConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesReleaseConfigsRequest>;

export type GetProjectsLocationsRepositoriesReleaseConfigsResponse = ReleaseConfig;
export const GetProjectsLocationsRepositoriesReleaseConfigsResponse = ReleaseConfig;

export type GetProjectsLocationsRepositoriesReleaseConfigsError = CommonErrors;

export const getProjectsLocationsRepositoriesReleaseConfigs: API.OperationMethod<GetProjectsLocationsRepositoriesReleaseConfigsRequest, GetProjectsLocationsRepositoriesReleaseConfigsResponse, GetProjectsLocationsRepositoriesReleaseConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesReleaseConfigsRequest,
  output: GetProjectsLocationsRepositoriesReleaseConfigsResponse,
  errors: [],
}));

/** Creates a new ReleaseConfig in a given Repository. */
export interface CreateProjectsLocationsRepositoriesReleaseConfigsRequest {
  /** Required. The repository in which to create the release config. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Required. The ID to use for the release config, which will become the final component of the release config's resource name. */
  releaseConfigId?: string;
  /** Request body */
  body?: ReleaseConfig;
}

export const CreateProjectsLocationsRepositoriesReleaseConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  releaseConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("releaseConfigId")),
  body: Schema.optional(ReleaseConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesReleaseConfigsRequest>;

export type CreateProjectsLocationsRepositoriesReleaseConfigsResponse = ReleaseConfig;
export const CreateProjectsLocationsRepositoriesReleaseConfigsResponse = ReleaseConfig;

export type CreateProjectsLocationsRepositoriesReleaseConfigsError = CommonErrors;

export const createProjectsLocationsRepositoriesReleaseConfigs: API.OperationMethod<CreateProjectsLocationsRepositoriesReleaseConfigsRequest, CreateProjectsLocationsRepositoriesReleaseConfigsResponse, CreateProjectsLocationsRepositoriesReleaseConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesReleaseConfigsRequest,
  output: CreateProjectsLocationsRepositoriesReleaseConfigsResponse,
  errors: [],
}));

/** Updates a single ReleaseConfig. **Note:** *This method does not fully implement [AIP/134](https://google.aip.dev/134). The wildcard entry (\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.* */
export interface PatchProjectsLocationsRepositoriesReleaseConfigsRequest {
  /** Identifier. The release config's name. */
  name: string;
  /** Optional. Specifies the fields to be updated in the release config. If left unset, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: ReleaseConfig;
}

export const PatchProjectsLocationsRepositoriesReleaseConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ReleaseConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs/{releaseConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesReleaseConfigsRequest>;

export type PatchProjectsLocationsRepositoriesReleaseConfigsResponse = ReleaseConfig;
export const PatchProjectsLocationsRepositoriesReleaseConfigsResponse = ReleaseConfig;

export type PatchProjectsLocationsRepositoriesReleaseConfigsError = CommonErrors;

export const patchProjectsLocationsRepositoriesReleaseConfigs: API.OperationMethod<PatchProjectsLocationsRepositoriesReleaseConfigsRequest, PatchProjectsLocationsRepositoriesReleaseConfigsResponse, PatchProjectsLocationsRepositoriesReleaseConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesReleaseConfigsRequest,
  output: PatchProjectsLocationsRepositoriesReleaseConfigsResponse,
  errors: [],
}));

/** Deletes a single ReleaseConfig. */
export interface DeleteProjectsLocationsRepositoriesReleaseConfigsRequest {
  /** Required. The release config's name. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesReleaseConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs/{releaseConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesReleaseConfigsRequest>;

export type DeleteProjectsLocationsRepositoriesReleaseConfigsResponse = Empty;
export const DeleteProjectsLocationsRepositoriesReleaseConfigsResponse = Empty;

export type DeleteProjectsLocationsRepositoriesReleaseConfigsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesReleaseConfigs: API.OperationMethod<DeleteProjectsLocationsRepositoriesReleaseConfigsRequest, DeleteProjectsLocationsRepositoriesReleaseConfigsResponse, DeleteProjectsLocationsRepositoriesReleaseConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesReleaseConfigsRequest,
  output: DeleteProjectsLocationsRepositoriesReleaseConfigsResponse,
  errors: [],
}));

/** Lists CompilationResults in a given Repository. */
export interface ListProjectsLocationsRepositoriesCompilationResultsRequest {
  /** Required. The repository in which to list compilation results. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Optional. Maximum number of compilation results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListCompilationResults` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCompilationResults`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. This field only supports ordering by `name` and `create_time`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. */
  orderBy?: string;
  /** Optional. Filter for the returned list. */
  filter?: string;
}

export const ListProjectsLocationsRepositoriesCompilationResultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/compilationResults" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesCompilationResultsRequest>;

export type ListProjectsLocationsRepositoriesCompilationResultsResponse = ListCompilationResultsResponse;
export const ListProjectsLocationsRepositoriesCompilationResultsResponse = ListCompilationResultsResponse;

export type ListProjectsLocationsRepositoriesCompilationResultsError = CommonErrors;

export const listProjectsLocationsRepositoriesCompilationResults = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesCompilationResultsRequest,
  output: ListProjectsLocationsRepositoriesCompilationResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a single CompilationResult. */
export interface GetProjectsLocationsRepositoriesCompilationResultsRequest {
  /** Required. The compilation result's name. */
  name: string;
}

export const GetProjectsLocationsRepositoriesCompilationResultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/compilationResults/{compilationResultsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesCompilationResultsRequest>;

export type GetProjectsLocationsRepositoriesCompilationResultsResponse = CompilationResult;
export const GetProjectsLocationsRepositoriesCompilationResultsResponse = CompilationResult;

export type GetProjectsLocationsRepositoriesCompilationResultsError = CommonErrors;

export const getProjectsLocationsRepositoriesCompilationResults: API.OperationMethod<GetProjectsLocationsRepositoriesCompilationResultsRequest, GetProjectsLocationsRepositoriesCompilationResultsResponse, GetProjectsLocationsRepositoriesCompilationResultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesCompilationResultsRequest,
  output: GetProjectsLocationsRepositoriesCompilationResultsResponse,
  errors: [],
}));

/** Creates a new CompilationResult in a given project and location. */
export interface CreateProjectsLocationsRepositoriesCompilationResultsRequest {
  /** Required. The repository in which to create the compilation result. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Request body */
  body?: CompilationResult;
}

export const CreateProjectsLocationsRepositoriesCompilationResultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CompilationResult).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/compilationResults", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesCompilationResultsRequest>;

export type CreateProjectsLocationsRepositoriesCompilationResultsResponse = CompilationResult;
export const CreateProjectsLocationsRepositoriesCompilationResultsResponse = CompilationResult;

export type CreateProjectsLocationsRepositoriesCompilationResultsError = CommonErrors;

export const createProjectsLocationsRepositoriesCompilationResults: API.OperationMethod<CreateProjectsLocationsRepositoriesCompilationResultsRequest, CreateProjectsLocationsRepositoriesCompilationResultsResponse, CreateProjectsLocationsRepositoriesCompilationResultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesCompilationResultsRequest,
  output: CreateProjectsLocationsRepositoriesCompilationResultsResponse,
  errors: [],
}));

/** Returns CompilationResultActions in a given CompilationResult. */
export interface QueryProjectsLocationsRepositoriesCompilationResultsRequest {
  /** Required. The compilation result's name. */
  name: string;
  /** Optional. Maximum number of compilation results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `QueryCompilationResultActions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryCompilationResultActions`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Optional filter for the returned list. Filtering is only currently supported on the `file_path` field. */
  filter?: string;
}

export const QueryProjectsLocationsRepositoriesCompilationResultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/compilationResults/{compilationResultsId}:query" }),
  svc,
) as unknown as Schema.Schema<QueryProjectsLocationsRepositoriesCompilationResultsRequest>;

export type QueryProjectsLocationsRepositoriesCompilationResultsResponse = QueryCompilationResultActionsResponse;
export const QueryProjectsLocationsRepositoriesCompilationResultsResponse = QueryCompilationResultActionsResponse;

export type QueryProjectsLocationsRepositoriesCompilationResultsError = CommonErrors;

export const queryProjectsLocationsRepositoriesCompilationResults = API.makePaginated(() => ({
  input: QueryProjectsLocationsRepositoriesCompilationResultsRequest,
  output: QueryProjectsLocationsRepositoriesCompilationResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists WorkflowConfigs in a given Repository. */
export interface ListProjectsLocationsRepositoriesWorkflowConfigsRequest {
  /** Required. The repository in which to list workflow configs. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Optional. Maximum number of workflow configs to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListWorkflowConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkflowConfigs`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesWorkflowConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesWorkflowConfigsRequest>;

export type ListProjectsLocationsRepositoriesWorkflowConfigsResponse = ListWorkflowConfigsResponse;
export const ListProjectsLocationsRepositoriesWorkflowConfigsResponse = ListWorkflowConfigsResponse;

export type ListProjectsLocationsRepositoriesWorkflowConfigsError = CommonErrors;

export const listProjectsLocationsRepositoriesWorkflowConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesWorkflowConfigsRequest,
  output: ListProjectsLocationsRepositoriesWorkflowConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a single WorkflowConfig. */
export interface GetProjectsLocationsRepositoriesWorkflowConfigsRequest {
  /** Required. The workflow config's name. */
  name: string;
}

export const GetProjectsLocationsRepositoriesWorkflowConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs/{workflowConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesWorkflowConfigsRequest>;

export type GetProjectsLocationsRepositoriesWorkflowConfigsResponse = WorkflowConfig;
export const GetProjectsLocationsRepositoriesWorkflowConfigsResponse = WorkflowConfig;

export type GetProjectsLocationsRepositoriesWorkflowConfigsError = CommonErrors;

export const getProjectsLocationsRepositoriesWorkflowConfigs: API.OperationMethod<GetProjectsLocationsRepositoriesWorkflowConfigsRequest, GetProjectsLocationsRepositoriesWorkflowConfigsResponse, GetProjectsLocationsRepositoriesWorkflowConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesWorkflowConfigsRequest,
  output: GetProjectsLocationsRepositoriesWorkflowConfigsResponse,
  errors: [],
}));

/** Creates a new WorkflowConfig in a given Repository. */
export interface CreateProjectsLocationsRepositoriesWorkflowConfigsRequest {
  /** Required. The repository in which to create the workflow config. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Required. The ID to use for the workflow config, which will become the final component of the workflow config's resource name. */
  workflowConfigId?: string;
  /** Request body */
  body?: WorkflowConfig;
}

export const CreateProjectsLocationsRepositoriesWorkflowConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  workflowConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("workflowConfigId")),
  body: Schema.optional(WorkflowConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesWorkflowConfigsRequest>;

export type CreateProjectsLocationsRepositoriesWorkflowConfigsResponse = WorkflowConfig;
export const CreateProjectsLocationsRepositoriesWorkflowConfigsResponse = WorkflowConfig;

export type CreateProjectsLocationsRepositoriesWorkflowConfigsError = CommonErrors;

export const createProjectsLocationsRepositoriesWorkflowConfigs: API.OperationMethod<CreateProjectsLocationsRepositoriesWorkflowConfigsRequest, CreateProjectsLocationsRepositoriesWorkflowConfigsResponse, CreateProjectsLocationsRepositoriesWorkflowConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesWorkflowConfigsRequest,
  output: CreateProjectsLocationsRepositoriesWorkflowConfigsResponse,
  errors: [],
}));

/** Updates a single WorkflowConfig. **Note:** *This method does not fully implement [AIP/134](https://google.aip.dev/134). The wildcard entry (\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.* */
export interface PatchProjectsLocationsRepositoriesWorkflowConfigsRequest {
  /** Identifier. The workflow config's name. */
  name: string;
  /** Optional. Specifies the fields to be updated in the workflow config. If left unset, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: WorkflowConfig;
}

export const PatchProjectsLocationsRepositoriesWorkflowConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(WorkflowConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs/{workflowConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesWorkflowConfigsRequest>;

export type PatchProjectsLocationsRepositoriesWorkflowConfigsResponse = WorkflowConfig;
export const PatchProjectsLocationsRepositoriesWorkflowConfigsResponse = WorkflowConfig;

export type PatchProjectsLocationsRepositoriesWorkflowConfigsError = CommonErrors;

export const patchProjectsLocationsRepositoriesWorkflowConfigs: API.OperationMethod<PatchProjectsLocationsRepositoriesWorkflowConfigsRequest, PatchProjectsLocationsRepositoriesWorkflowConfigsResponse, PatchProjectsLocationsRepositoriesWorkflowConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesWorkflowConfigsRequest,
  output: PatchProjectsLocationsRepositoriesWorkflowConfigsResponse,
  errors: [],
}));

/** Deletes a single WorkflowConfig. */
export interface DeleteProjectsLocationsRepositoriesWorkflowConfigsRequest {
  /** Required. The workflow config's name. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesWorkflowConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs/{workflowConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesWorkflowConfigsRequest>;

export type DeleteProjectsLocationsRepositoriesWorkflowConfigsResponse = Empty;
export const DeleteProjectsLocationsRepositoriesWorkflowConfigsResponse = Empty;

export type DeleteProjectsLocationsRepositoriesWorkflowConfigsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesWorkflowConfigs: API.OperationMethod<DeleteProjectsLocationsRepositoriesWorkflowConfigsRequest, DeleteProjectsLocationsRepositoriesWorkflowConfigsResponse, DeleteProjectsLocationsRepositoriesWorkflowConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesWorkflowConfigsRequest,
  output: DeleteProjectsLocationsRepositoriesWorkflowConfigsResponse,
  errors: [],
}));

/** Lists WorkflowInvocations in a given Repository. */
export interface ListProjectsLocationsRepositoriesWorkflowInvocationsRequest {
  /** Required. The parent resource of the WorkflowInvocation type. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Optional. Maximum number of workflow invocations to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `ListWorkflowInvocations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkflowInvocations`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. This field only supports ordering by `name`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. */
  orderBy?: string;
  /** Optional. Filter for the returned list. */
  filter?: string;
}

export const ListProjectsLocationsRepositoriesWorkflowInvocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesWorkflowInvocationsRequest>;

export type ListProjectsLocationsRepositoriesWorkflowInvocationsResponse = ListWorkflowInvocationsResponse;
export const ListProjectsLocationsRepositoriesWorkflowInvocationsResponse = ListWorkflowInvocationsResponse;

export type ListProjectsLocationsRepositoriesWorkflowInvocationsError = CommonErrors;

export const listProjectsLocationsRepositoriesWorkflowInvocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesWorkflowInvocationsRequest,
  output: ListProjectsLocationsRepositoriesWorkflowInvocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a single WorkflowInvocation. */
export interface GetProjectsLocationsRepositoriesWorkflowInvocationsRequest {
  /** Required. The workflow invocation resource's name. */
  name: string;
}

export const GetProjectsLocationsRepositoriesWorkflowInvocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesWorkflowInvocationsRequest>;

export type GetProjectsLocationsRepositoriesWorkflowInvocationsResponse = WorkflowInvocation;
export const GetProjectsLocationsRepositoriesWorkflowInvocationsResponse = WorkflowInvocation;

export type GetProjectsLocationsRepositoriesWorkflowInvocationsError = CommonErrors;

export const getProjectsLocationsRepositoriesWorkflowInvocations: API.OperationMethod<GetProjectsLocationsRepositoriesWorkflowInvocationsRequest, GetProjectsLocationsRepositoriesWorkflowInvocationsResponse, GetProjectsLocationsRepositoriesWorkflowInvocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesWorkflowInvocationsRequest,
  output: GetProjectsLocationsRepositoriesWorkflowInvocationsResponse,
  errors: [],
}));

/** Creates a new WorkflowInvocation in a given Repository. */
export interface CreateProjectsLocationsRepositoriesWorkflowInvocationsRequest {
  /** Required. The repository in which to create the workflow invocation. Must be in the format `projects/* /locations/* /repositories/*`. */
  parent: string;
  /** Request body */
  body?: WorkflowInvocation;
}

export const CreateProjectsLocationsRepositoriesWorkflowInvocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(WorkflowInvocation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesWorkflowInvocationsRequest>;

export type CreateProjectsLocationsRepositoriesWorkflowInvocationsResponse = WorkflowInvocation;
export const CreateProjectsLocationsRepositoriesWorkflowInvocationsResponse = WorkflowInvocation;

export type CreateProjectsLocationsRepositoriesWorkflowInvocationsError = CommonErrors;

export const createProjectsLocationsRepositoriesWorkflowInvocations: API.OperationMethod<CreateProjectsLocationsRepositoriesWorkflowInvocationsRequest, CreateProjectsLocationsRepositoriesWorkflowInvocationsResponse, CreateProjectsLocationsRepositoriesWorkflowInvocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesWorkflowInvocationsRequest,
  output: CreateProjectsLocationsRepositoriesWorkflowInvocationsResponse,
  errors: [],
}));

/** Deletes a single WorkflowInvocation. */
export interface DeleteProjectsLocationsRepositoriesWorkflowInvocationsRequest {
  /** Required. The workflow invocation resource's name. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesWorkflowInvocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesWorkflowInvocationsRequest>;

export type DeleteProjectsLocationsRepositoriesWorkflowInvocationsResponse = Empty;
export const DeleteProjectsLocationsRepositoriesWorkflowInvocationsResponse = Empty;

export type DeleteProjectsLocationsRepositoriesWorkflowInvocationsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesWorkflowInvocations: API.OperationMethod<DeleteProjectsLocationsRepositoriesWorkflowInvocationsRequest, DeleteProjectsLocationsRepositoriesWorkflowInvocationsResponse, DeleteProjectsLocationsRepositoriesWorkflowInvocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesWorkflowInvocationsRequest,
  output: DeleteProjectsLocationsRepositoriesWorkflowInvocationsResponse,
  errors: [],
}));

/** Requests cancellation of a running WorkflowInvocation. */
export interface CancelProjectsLocationsRepositoriesWorkflowInvocationsRequest {
  /** Required. The workflow invocation resource's name. */
  name: string;
  /** Request body */
  body?: CancelWorkflowInvocationRequest;
}

export const CancelProjectsLocationsRepositoriesWorkflowInvocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelWorkflowInvocationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsRepositoriesWorkflowInvocationsRequest>;

export type CancelProjectsLocationsRepositoriesWorkflowInvocationsResponse = CancelWorkflowInvocationResponse;
export const CancelProjectsLocationsRepositoriesWorkflowInvocationsResponse = CancelWorkflowInvocationResponse;

export type CancelProjectsLocationsRepositoriesWorkflowInvocationsError = CommonErrors;

export const cancelProjectsLocationsRepositoriesWorkflowInvocations: API.OperationMethod<CancelProjectsLocationsRepositoriesWorkflowInvocationsRequest, CancelProjectsLocationsRepositoriesWorkflowInvocationsResponse, CancelProjectsLocationsRepositoriesWorkflowInvocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsRepositoriesWorkflowInvocationsRequest,
  output: CancelProjectsLocationsRepositoriesWorkflowInvocationsResponse,
  errors: [],
}));

/** Returns WorkflowInvocationActions in a given WorkflowInvocation. */
export interface QueryProjectsLocationsRepositoriesWorkflowInvocationsRequest {
  /** Required. The workflow invocation's name. */
  name: string;
  /** Optional. Maximum number of workflow invocations to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Page token received from a previous `QueryWorkflowInvocationActions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryWorkflowInvocationActions`, with the exception of `page_size`, must match the call that provided the page token. */
  pageToken?: string;
}

export const QueryProjectsLocationsRepositoriesWorkflowInvocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}:query" }),
  svc,
) as unknown as Schema.Schema<QueryProjectsLocationsRepositoriesWorkflowInvocationsRequest>;

export type QueryProjectsLocationsRepositoriesWorkflowInvocationsResponse = QueryWorkflowInvocationActionsResponse;
export const QueryProjectsLocationsRepositoriesWorkflowInvocationsResponse = QueryWorkflowInvocationActionsResponse;

export type QueryProjectsLocationsRepositoriesWorkflowInvocationsError = CommonErrors;

export const queryProjectsLocationsRepositoriesWorkflowInvocations = API.makePaginated(() => ({
  input: QueryProjectsLocationsRepositoriesWorkflowInvocationsRequest,
  output: QueryProjectsLocationsRepositoriesWorkflowInvocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsFoldersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/folders/{foldersId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsFoldersRequest>;

export type GetIamPolicyProjectsLocationsFoldersResponse = Policy;
export const GetIamPolicyProjectsLocationsFoldersResponse = Policy;

export type GetIamPolicyProjectsLocationsFoldersError = CommonErrors;

export const getIamPolicyProjectsLocationsFolders: API.OperationMethod<GetIamPolicyProjectsLocationsFoldersRequest, GetIamPolicyProjectsLocationsFoldersResponse, GetIamPolicyProjectsLocationsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsFoldersRequest,
  output: GetIamPolicyProjectsLocationsFoldersResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsFoldersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/folders/{foldersId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsFoldersRequest>;

export type SetIamPolicyProjectsLocationsFoldersResponse = Policy;
export const SetIamPolicyProjectsLocationsFoldersResponse = Policy;

export type SetIamPolicyProjectsLocationsFoldersError = CommonErrors;

export const setIamPolicyProjectsLocationsFolders: API.OperationMethod<SetIamPolicyProjectsLocationsFoldersRequest, SetIamPolicyProjectsLocationsFoldersResponse, SetIamPolicyProjectsLocationsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsFoldersRequest,
  output: SetIamPolicyProjectsLocationsFoldersResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsFoldersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/folders/{foldersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsFoldersRequest>;

export type TestIamPermissionsProjectsLocationsFoldersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsFoldersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsFoldersError = CommonErrors;

export const testIamPermissionsProjectsLocationsFolders: API.OperationMethod<TestIamPermissionsProjectsLocationsFoldersRequest, TestIamPermissionsProjectsLocationsFoldersResponse, TestIamPermissionsProjectsLocationsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsFoldersRequest,
  output: TestIamPermissionsProjectsLocationsFoldersResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsTeamFoldersRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsTeamFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsTeamFoldersRequest>;

export type GetIamPolicyProjectsLocationsTeamFoldersResponse = Policy;
export const GetIamPolicyProjectsLocationsTeamFoldersResponse = Policy;

export type GetIamPolicyProjectsLocationsTeamFoldersError = CommonErrors;

export const getIamPolicyProjectsLocationsTeamFolders: API.OperationMethod<GetIamPolicyProjectsLocationsTeamFoldersRequest, GetIamPolicyProjectsLocationsTeamFoldersResponse, GetIamPolicyProjectsLocationsTeamFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsTeamFoldersRequest,
  output: GetIamPolicyProjectsLocationsTeamFoldersResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsTeamFoldersRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsTeamFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsTeamFoldersRequest>;

export type SetIamPolicyProjectsLocationsTeamFoldersResponse = Policy;
export const SetIamPolicyProjectsLocationsTeamFoldersResponse = Policy;

export type SetIamPolicyProjectsLocationsTeamFoldersError = CommonErrors;

export const setIamPolicyProjectsLocationsTeamFolders: API.OperationMethod<SetIamPolicyProjectsLocationsTeamFoldersRequest, SetIamPolicyProjectsLocationsTeamFoldersResponse, SetIamPolicyProjectsLocationsTeamFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsTeamFoldersRequest,
  output: SetIamPolicyProjectsLocationsTeamFoldersResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsTeamFoldersRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsTeamFoldersRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsTeamFoldersRequest>;

export type TestIamPermissionsProjectsLocationsTeamFoldersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsTeamFoldersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsTeamFoldersError = CommonErrors;

export const testIamPermissionsProjectsLocationsTeamFolders: API.OperationMethod<TestIamPermissionsProjectsLocationsTeamFoldersRequest, TestIamPermissionsProjectsLocationsTeamFoldersResponse, TestIamPermissionsProjectsLocationsTeamFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsTeamFoldersRequest,
  output: TestIamPermissionsProjectsLocationsTeamFoldersResponse,
  errors: [],
}));

