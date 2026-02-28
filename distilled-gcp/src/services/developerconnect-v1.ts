// ==========================================================================
// Developer Connect API (developerconnect v1)
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
  name: "developerconnect",
  version: "v1",
  rootUrl: "https://developerconnect.googleapis.com/",
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

export interface OAuthCredential {
  /** Required. A SecretManager resource containing the OAuth token that authorizes the connection. Format: `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). */
  oauthTokenSecretVersion?: string;
  /** Output only. The username associated with this token. */
  username?: string;
}

export const OAuthCredential: Schema.Schema<OAuthCredential> = Schema.suspend(() => Schema.Struct({
  oauthTokenSecretVersion: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuthCredential" }) as any as Schema.Schema<OAuthCredential>;

export interface GitHubConfig {
  /** Required. Immutable. The GitHub Application that was installed to the GitHub user or organization. */
  githubApp?: "GIT_HUB_APP_UNSPECIFIED" | "DEVELOPER_CONNECT" | "FIREBASE" | "GEMINI_CODE_ASSIST" | "DATAFORM" | (string & {});
  /** Optional. OAuth credential of the account that authorized the GitHub App. It is recommended to use a robot account instead of a human user account. The OAuth token must be tied to the GitHub App of this config. */
  authorizerCredential?: OAuthCredential;
  /** Optional. GitHub App installation id. */
  appInstallationId?: string;
  /** Output only. The URI to navigate to in order to manage the installation associated with this GitHubConfig. */
  installationUri?: string;
}

export const GitHubConfig: Schema.Schema<GitHubConfig> = Schema.suspend(() => Schema.Struct({
  githubApp: Schema.optional(Schema.String),
  authorizerCredential: Schema.optional(OAuthCredential),
  appInstallationId: Schema.optional(Schema.String),
  installationUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GitHubConfig" }) as any as Schema.Schema<GitHubConfig>;

export interface ServiceDirectoryConfig {
  /** Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}. */
  service?: string;
}

export const ServiceDirectoryConfig: Schema.Schema<ServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceDirectoryConfig" }) as any as Schema.Schema<ServiceDirectoryConfig>;

export interface GitHubEnterpriseConfig {
  /** Required. The URI of the GitHub Enterprise host this connection is for. */
  hostUri?: string;
  /** Optional. ID of the GitHub App created from the manifest. */
  appId?: string;
  /** Output only. The URL-friendly name of the GitHub App. */
  appSlug?: string;
  /** Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). */
  privateKeySecretVersion?: string;
  /** Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). */
  webhookSecretSecretVersion?: string;
  /** Optional. ID of the installation of the GitHub App. */
  appInstallationId?: string;
  /** Output only. The URI to navigate to in order to manage the installation associated with this GitHubEnterpriseConfig. */
  installationUri?: string;
  /** Optional. Configuration for using Service Directory to privately connect to a GitHub Enterprise server. This should only be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitHub Enterprise server will be made over the public internet. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Output only. GitHub Enterprise version installed at the host_uri. */
  serverVersion?: string;
  /** Optional. SSL certificate to use for requests to GitHub Enterprise. */
  sslCaCertificate?: string;
  /** Optional. Immutable. GitHub Enterprise organization in which the GitHub App is created. */
  organization?: string;
}

export const GitHubEnterpriseConfig: Schema.Schema<GitHubEnterpriseConfig> = Schema.suspend(() => Schema.Struct({
  hostUri: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  appSlug: Schema.optional(Schema.String),
  privateKeySecretVersion: Schema.optional(Schema.String),
  webhookSecretSecretVersion: Schema.optional(Schema.String),
  appInstallationId: Schema.optional(Schema.String),
  installationUri: Schema.optional(Schema.String),
  serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
  serverVersion: Schema.optional(Schema.String),
  sslCaCertificate: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
})).annotate({ identifier: "GitHubEnterpriseConfig" }) as any as Schema.Schema<GitHubEnterpriseConfig>;

export interface UserCredential {
  /** Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). */
  userTokenSecretVersion?: string;
  /** Output only. The username associated with this token. */
  username?: string;
}

export const UserCredential: Schema.Schema<UserCredential> = Schema.suspend(() => Schema.Struct({
  userTokenSecretVersion: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "UserCredential" }) as any as Schema.Schema<UserCredential>;

export interface GitLabConfig {
  /** Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). This is used to validate webhooks. */
  webhookSecretSecretVersion?: string;
  /** Required. A GitLab personal access token with the minimum `read_api` scope access and a minimum role of `reporter`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. */
  readAuthorizerCredential?: UserCredential;
  /** Required. A GitLab personal access token with the minimum `api` scope access and a minimum role of `maintainer`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. */
  authorizerCredential?: UserCredential;
}

export const GitLabConfig: Schema.Schema<GitLabConfig> = Schema.suspend(() => Schema.Struct({
  webhookSecretSecretVersion: Schema.optional(Schema.String),
  readAuthorizerCredential: Schema.optional(UserCredential),
  authorizerCredential: Schema.optional(UserCredential),
})).annotate({ identifier: "GitLabConfig" }) as any as Schema.Schema<GitLabConfig>;

export interface GitLabEnterpriseConfig {
  /** Required. The URI of the GitLab Enterprise host this connection is for. */
  hostUri?: string;
  /** Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). This is used to validate webhooks. */
  webhookSecretSecretVersion?: string;
  /** Required. A GitLab personal access token with the minimum `read_api` scope access and a minimum role of `reporter`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. */
  readAuthorizerCredential?: UserCredential;
  /** Required. A GitLab personal access token with the minimum `api` scope access and a minimum role of `maintainer`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. */
  authorizerCredential?: UserCredential;
  /** Optional. Configuration for using Service Directory to privately connect to a GitLab Enterprise instance. This should only be set if the GitLab Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitLab Enterprise server will be made over the public internet. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. SSL Certificate Authority certificate to use for requests to GitLab Enterprise instance. */
  sslCaCertificate?: string;
  /** Output only. Version of the GitLab Enterprise server running on the `host_uri`. */
  serverVersion?: string;
}

export const GitLabEnterpriseConfig: Schema.Schema<GitLabEnterpriseConfig> = Schema.suspend(() => Schema.Struct({
  hostUri: Schema.optional(Schema.String),
  webhookSecretSecretVersion: Schema.optional(Schema.String),
  readAuthorizerCredential: Schema.optional(UserCredential),
  authorizerCredential: Schema.optional(UserCredential),
  serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
  sslCaCertificate: Schema.optional(Schema.String),
  serverVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GitLabEnterpriseConfig" }) as any as Schema.Schema<GitLabEnterpriseConfig>;

export interface BitbucketDataCenterConfig {
  /** Required. The URI of the Bitbucket Data Center host this connection is for. */
  hostUri?: string;
  /** Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). This is used to validate webhooks. */
  webhookSecretSecretVersion?: string;
  /** Required. An http access token with the minimum `Repository read` access. It's recommended to use a system account to generate the credentials. */
  readAuthorizerCredential?: UserCredential;
  /** Required. An http access token with the minimum `Repository admin` scope access. This is needed to create webhooks. It's recommended to use a system account to generate these credentials. */
  authorizerCredential?: UserCredential;
  /** Optional. Configuration for using Service Directory to privately connect to a Bitbucket Data Center instance. This should only be set if the Bitbucket Data Center is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the Bitbucket Data Center will be made over the public internet. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. SSL certificate authority to trust when making requests to Bitbucket Data Center. */
  sslCaCertificate?: string;
  /** Output only. Version of the Bitbucket Data Center server running on the `host_uri`. */
  serverVersion?: string;
}

export const BitbucketDataCenterConfig: Schema.Schema<BitbucketDataCenterConfig> = Schema.suspend(() => Schema.Struct({
  hostUri: Schema.optional(Schema.String),
  webhookSecretSecretVersion: Schema.optional(Schema.String),
  readAuthorizerCredential: Schema.optional(UserCredential),
  authorizerCredential: Schema.optional(UserCredential),
  serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
  sslCaCertificate: Schema.optional(Schema.String),
  serverVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "BitbucketDataCenterConfig" }) as any as Schema.Schema<BitbucketDataCenterConfig>;

export interface BitbucketCloudConfig {
  /** Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform. */
  workspace?: string;
  /** Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*` (if regional secrets are supported in that location). This is used to validate and create webhooks. */
  webhookSecretSecretVersion?: string;
  /** Required. An access token with the minimum `repository` access. It can either be a workspace, project or repository access token. It's recommended to use a system account to generate the credentials. */
  readAuthorizerCredential?: UserCredential;
  /** Required. An access token with the minimum `repository`, `pullrequest` and `webhook` scope access. It can either be a workspace, project or repository access token. This is needed to create webhooks. It's recommended to use a system account to generate these credentials. */
  authorizerCredential?: UserCredential;
}

export const BitbucketCloudConfig: Schema.Schema<BitbucketCloudConfig> = Schema.suspend(() => Schema.Struct({
  workspace: Schema.optional(Schema.String),
  webhookSecretSecretVersion: Schema.optional(Schema.String),
  readAuthorizerCredential: Schema.optional(UserCredential),
  authorizerCredential: Schema.optional(UserCredential),
})).annotate({ identifier: "BitbucketCloudConfig" }) as any as Schema.Schema<BitbucketCloudConfig>;

export interface SecureSourceManagerInstanceConfig {
  /** Required. Immutable. Secure Source Manager instance resource, formatted as `projects/* /locations/* /instances/*` */
  instance?: string;
}

export const SecureSourceManagerInstanceConfig: Schema.Schema<SecureSourceManagerInstanceConfig> = Schema.suspend(() => Schema.Struct({
  instance: Schema.optional(Schema.String),
})).annotate({ identifier: "SecureSourceManagerInstanceConfig" }) as any as Schema.Schema<SecureSourceManagerInstanceConfig>;

export interface BasicAuthentication {
  /** The password SecretManager secret version to authenticate as. */
  passwordSecretVersion?: string;
  /** Required. The username to authenticate as. */
  username?: string;
}

export const BasicAuthentication: Schema.Schema<BasicAuthentication> = Schema.suspend(() => Schema.Struct({
  passwordSecretVersion: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "BasicAuthentication" }) as any as Schema.Schema<BasicAuthentication>;

export interface BearerTokenAuthentication {
  /** Optional. The token SecretManager secret version to authenticate as. */
  tokenSecretVersion?: string;
}

export const BearerTokenAuthentication: Schema.Schema<BearerTokenAuthentication> = Schema.suspend(() => Schema.Struct({
  tokenSecretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "BearerTokenAuthentication" }) as any as Schema.Schema<BearerTokenAuthentication>;

export interface GenericHTTPEndpointConfig {
  /** Optional. Basic authentication with username and password. */
  basicAuthentication?: BasicAuthentication;
  /** Optional. Bearer token authentication with a token. */
  bearerTokenAuthentication?: BearerTokenAuthentication;
  /** Required. Immutable. The service provider's https endpoint. */
  hostUri?: string;
  /** Optional. Configuration for using Service Directory to privately connect to a HTTP service provider. This should only be set if the Http service provider is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the HTTP service provider will be made over the public internet. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. The SSL certificate to use for requests to the HTTP service provider. */
  sslCaCertificate?: string;
}

export const GenericHTTPEndpointConfig: Schema.Schema<GenericHTTPEndpointConfig> = Schema.suspend(() => Schema.Struct({
  basicAuthentication: Schema.optional(BasicAuthentication),
  bearerTokenAuthentication: Schema.optional(BearerTokenAuthentication),
  hostUri: Schema.optional(Schema.String),
  serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
  sslCaCertificate: Schema.optional(Schema.String),
})).annotate({ identifier: "GenericHTTPEndpointConfig" }) as any as Schema.Schema<GenericHTTPEndpointConfig>;

export interface InstallationState {
  /** Output only. Current step of the installation process. */
  stage?: "STAGE_UNSPECIFIED" | "PENDING_CREATE_APP" | "PENDING_USER_OAUTH" | "PENDING_INSTALL_APP" | "COMPLETE" | (string & {});
  /** Output only. Message of what the user should do next to continue the installation. Empty string if the installation is already complete. */
  message?: string;
  /** Output only. Link to follow for next action. Empty string if the installation is already complete. */
  actionUri?: string;
}

export const InstallationState: Schema.Schema<InstallationState> = Schema.suspend(() => Schema.Struct({
  stage: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  actionUri: Schema.optional(Schema.String),
})).annotate({ identifier: "InstallationState" }) as any as Schema.Schema<InstallationState>;

export interface CryptoKeyConfig {
  /** Required. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  keyReference?: string;
}

export const CryptoKeyConfig: Schema.Schema<CryptoKeyConfig> = Schema.suspend(() => Schema.Struct({
  keyReference: Schema.optional(Schema.String),
})).annotate({ identifier: "CryptoKeyConfig" }) as any as Schema.Schema<CryptoKeyConfig>;

export interface GitProxyConfig {
  /** Optional. Setting this to true allows the git proxy to be used for performing git operations on the repositories linked in the connection. */
  enabled?: boolean;
  /** Output only. The base URI for the HTTP proxy endpoint. Has the format `https://{generatedID}-c-h-{shortRegion}.developerconnect.dev` Populated only when enabled is set to true. This endpoint is used by other Google services that integrate with Developer Connect. */
  httpProxyBaseUri?: string;
}

export const GitProxyConfig: Schema.Schema<GitProxyConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  httpProxyBaseUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GitProxyConfig" }) as any as Schema.Schema<GitProxyConfig>;

export interface Connection {
  /** Configuration for connections to github.com. */
  githubConfig?: GitHubConfig;
  /** Configuration for connections to an instance of GitHub Enterprise. */
  githubEnterpriseConfig?: GitHubEnterpriseConfig;
  /** Configuration for connections to gitlab.com. */
  gitlabConfig?: GitLabConfig;
  /** Configuration for connections to an instance of GitLab Enterprise. */
  gitlabEnterpriseConfig?: GitLabEnterpriseConfig;
  /** Configuration for connections to an instance of Bitbucket Data Center. */
  bitbucketDataCenterConfig?: BitbucketDataCenterConfig;
  /** Configuration for connections to an instance of Bitbucket Clouds. */
  bitbucketCloudConfig?: BitbucketCloudConfig;
  /** Configuration for connections to an instance of Secure Source Manager. */
  secureSourceManagerInstanceConfig?: SecureSourceManagerInstanceConfig;
  /** Optional. Configuration for connections to an HTTP service provider. */
  httpConfig?: GenericHTTPEndpointConfig;
  /** Identifier. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`. */
  name?: string;
  /** Output only. [Output only] Create timestamp */
  createTime?: string;
  /** Output only. [Output only] Update timestamp */
  updateTime?: string;
  /** Output only. [Output only] Delete timestamp */
  deleteTime?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. Installation state of the Connection. */
  installationState?: InstallationState;
  /** Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled. */
  disabled?: boolean;
  /** Output only. Set to true when the connection is being set up or updated in the background. */
  reconciling?: boolean;
  /** Optional. Allows clients to store small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. A system-assigned unique identifier for the Connection. */
  uid?: string;
  /** Optional. The crypto key configuration. This field is used by the Customer-Managed Encryption Keys (CMEK) feature. */
  cryptoKeyConfig?: CryptoKeyConfig;
  /** Optional. Configuration for the git proxy feature. Enabling the git proxy allows clients to perform git operations on the repositories linked in the connection. */
  gitProxyConfig?: GitProxyConfig;
}

export const Connection: Schema.Schema<Connection> = Schema.suspend(() => Schema.Struct({
  githubConfig: Schema.optional(GitHubConfig),
  githubEnterpriseConfig: Schema.optional(GitHubEnterpriseConfig),
  gitlabConfig: Schema.optional(GitLabConfig),
  gitlabEnterpriseConfig: Schema.optional(GitLabEnterpriseConfig),
  bitbucketDataCenterConfig: Schema.optional(BitbucketDataCenterConfig),
  bitbucketCloudConfig: Schema.optional(BitbucketCloudConfig),
  secureSourceManagerInstanceConfig: Schema.optional(SecureSourceManagerInstanceConfig),
  httpConfig: Schema.optional(GenericHTTPEndpointConfig),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  installationState: Schema.optional(InstallationState),
  disabled: Schema.optional(Schema.Boolean),
  reconciling: Schema.optional(Schema.Boolean),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  cryptoKeyConfig: Schema.optional(CryptoKeyConfig),
  gitProxyConfig: Schema.optional(GitProxyConfig),
})).annotate({ identifier: "Connection" }) as any as Schema.Schema<Connection>;

export interface ListConnectionsResponse {
  /** The list of Connection */
  connections?: Array<Connection>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConnectionsResponse: Schema.Schema<ListConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  connections: Schema.optional(Schema.Array(Connection)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConnectionsResponse" }) as any as Schema.Schema<ListConnectionsResponse>;

export interface GitRepositoryLink {
  /** Identifier. Resource name of the repository, in the format `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  name?: string;
  /** Required. Git Clone URI. */
  cloneUri?: string;
  /** Output only. [Output only] Create timestamp */
  createTime?: string;
  /** Output only. [Output only] Update timestamp */
  updateTime?: string;
  /** Output only. [Output only] Delete timestamp */
  deleteTime?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. Set to true when the connection is being set up or updated in the background. */
  reconciling?: boolean;
  /** Optional. Allows clients to store small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Output only. A system-assigned unique identifier for the GitRepositoryLink. */
  uid?: string;
  /** Output only. External ID of the webhook created for the repository. */
  webhookId?: string;
  /** Output only. URI to access the linked repository through the Git Proxy. This field is only populated if the git proxy is enabled for the connection. */
  gitProxyUri?: string;
}

export const GitRepositoryLink: Schema.Schema<GitRepositoryLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  cloneUri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  webhookId: Schema.optional(Schema.String),
  gitProxyUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GitRepositoryLink" }) as any as Schema.Schema<GitRepositoryLink>;

export interface ListGitRepositoryLinksResponse {
  /** The list of GitRepositoryLinks */
  gitRepositoryLinks?: Array<GitRepositoryLink>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListGitRepositoryLinksResponse: Schema.Schema<ListGitRepositoryLinksResponse> = Schema.suspend(() => Schema.Struct({
  gitRepositoryLinks: Schema.optional(Schema.Array(GitRepositoryLink)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListGitRepositoryLinksResponse" }) as any as Schema.Schema<ListGitRepositoryLinksResponse>;

export interface FetchReadWriteTokenRequest {
}

export const FetchReadWriteTokenRequest: Schema.Schema<FetchReadWriteTokenRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FetchReadWriteTokenRequest" }) as any as Schema.Schema<FetchReadWriteTokenRequest>;

export interface FetchReadWriteTokenResponse {
  /** The token content. */
  token?: string;
  /** Expiration timestamp. Can be empty if unknown or non-expiring. */
  expirationTime?: string;
  /** The git_username to specify when making a git clone with the token. For example, for GitHub GitRepositoryLinks, this would be "x-access-token" */
  gitUsername?: string;
}

export const FetchReadWriteTokenResponse: Schema.Schema<FetchReadWriteTokenResponse> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  gitUsername: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchReadWriteTokenResponse" }) as any as Schema.Schema<FetchReadWriteTokenResponse>;

export interface FetchReadTokenRequest {
}

export const FetchReadTokenRequest: Schema.Schema<FetchReadTokenRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FetchReadTokenRequest" }) as any as Schema.Schema<FetchReadTokenRequest>;

export interface FetchReadTokenResponse {
  /** The token content. */
  token?: string;
  /** Expiration timestamp. Can be empty if unknown or non-expiring. */
  expirationTime?: string;
  /** The git_username to specify when making a git clone with the token. For example, for GitHub GitRepositoryLinks, this would be "x-access-token" */
  gitUsername?: string;
}

export const FetchReadTokenResponse: Schema.Schema<FetchReadTokenResponse> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  gitUsername: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchReadTokenResponse" }) as any as Schema.Schema<FetchReadTokenResponse>;

export interface LinkableGitRepository {
  /** The clone uri of the repository. */
  cloneUri?: string;
}

export const LinkableGitRepository: Schema.Schema<LinkableGitRepository> = Schema.suspend(() => Schema.Struct({
  cloneUri: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkableGitRepository" }) as any as Schema.Schema<LinkableGitRepository>;

export interface FetchLinkableGitRepositoriesResponse {
  /** The git repositories that can be linked to the connection. */
  linkableGitRepositories?: Array<LinkableGitRepository>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const FetchLinkableGitRepositoriesResponse: Schema.Schema<FetchLinkableGitRepositoriesResponse> = Schema.suspend(() => Schema.Struct({
  linkableGitRepositories: Schema.optional(Schema.Array(LinkableGitRepository)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchLinkableGitRepositoriesResponse" }) as any as Schema.Schema<FetchLinkableGitRepositoriesResponse>;

export interface Installation {
  /** ID of the installation in GitHub. */
  id?: string;
  /** Name of the GitHub user or organization that owns this installation. */
  name?: string;
  /** Either "user" or "organization". */
  type?: string;
}

export const Installation: Schema.Schema<Installation> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Installation" }) as any as Schema.Schema<Installation>;

export interface FetchGitHubInstallationsResponse {
  /** List of installations available to the OAuth user (for github.com) or all the installations (for GitHub enterprise). */
  installations?: Array<Installation>;
}

export const FetchGitHubInstallationsResponse: Schema.Schema<FetchGitHubInstallationsResponse> = Schema.suspend(() => Schema.Struct({
  installations: Schema.optional(Schema.Array(Installation)),
})).annotate({ identifier: "FetchGitHubInstallationsResponse" }) as any as Schema.Schema<FetchGitHubInstallationsResponse>;

export interface FetchGitRefsResponse {
  /** Name of the refs fetched. */
  refNames?: Array<string>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const FetchGitRefsResponse: Schema.Schema<FetchGitRefsResponse> = Schema.suspend(() => Schema.Struct({
  refNames: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchGitRefsResponse" }) as any as Schema.Schema<FetchGitRefsResponse>;

export interface ProviderOAuthConfig {
  /** Optional. Immutable. Developer Connect provided OAuth. */
  systemProviderId?: "SYSTEM_PROVIDER_UNSPECIFIED" | "GITHUB" | "GITLAB" | "GOOGLE" | "SENTRY" | "ROVO" | "NEW_RELIC" | "DATASTAX" | "DYNATRACE" | (string & {});
  /** Required. User selected scopes to apply to the Oauth config In the event of changing scopes, user records under AccountConnector will be deleted and users will re-auth again. */
  scopes?: Array<string>;
}

export const ProviderOAuthConfig: Schema.Schema<ProviderOAuthConfig> = Schema.suspend(() => Schema.Struct({
  systemProviderId: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProviderOAuthConfig" }) as any as Schema.Schema<ProviderOAuthConfig>;

export interface AccountConnector {
  /** Optional. Provider OAuth config. */
  providerOauthConfig?: ProviderOAuthConfig;
  /** Identifier. The resource name of the accountConnector, in the format `projects/{project}/locations/{location}/accountConnectors/{account_connector_id}`. */
  name?: string;
  /** Output only. The timestamp when the accountConnector was created. */
  createTime?: string;
  /** Output only. The timestamp when the accountConnector was updated. */
  updateTime?: string;
  /** Optional. Allows users to store small amounts of arbitrary data. */
  annotations?: Record<string, string>;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Output only. Start OAuth flow by clicking on this URL. */
  oauthStartUri?: string;
}

export const AccountConnector: Schema.Schema<AccountConnector> = Schema.suspend(() => Schema.Struct({
  providerOauthConfig: Schema.optional(ProviderOAuthConfig),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  oauthStartUri: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountConnector" }) as any as Schema.Schema<AccountConnector>;

export interface ListAccountConnectorsResponse {
  /** The list of AccountConnectors */
  accountConnectors?: Array<AccountConnector>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAccountConnectorsResponse: Schema.Schema<ListAccountConnectorsResponse> = Schema.suspend(() => Schema.Struct({
  accountConnectors: Schema.optional(Schema.Array(AccountConnector)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAccountConnectorsResponse" }) as any as Schema.Schema<ListAccountConnectorsResponse>;

export interface FetchAccessTokenRequest {
}

export const FetchAccessTokenRequest: Schema.Schema<FetchAccessTokenRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FetchAccessTokenRequest" }) as any as Schema.Schema<FetchAccessTokenRequest>;

export interface ExchangeError {
  /** https://datatracker.ietf.org/doc/html/rfc6749#section-5.2 - error */
  code?: string;
  /** https://datatracker.ietf.org/doc/html/rfc6749#section-5.2 - error_description */
  description?: string;
}

export const ExchangeError: Schema.Schema<ExchangeError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ExchangeError" }) as any as Schema.Schema<ExchangeError>;

export interface FetchAccessTokenResponse {
  /** The token content. */
  token?: string;
  /** Expiration timestamp. Can be empty if unknown or non-expiring. */
  expirationTime?: string;
  /** The scopes of the access token. */
  scopes?: Array<string>;
  /** The error resulted from exchanging OAuth tokens from the service provider. */
  exchangeError?: ExchangeError;
}

export const FetchAccessTokenResponse: Schema.Schema<FetchAccessTokenResponse> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  exchangeError: Schema.optional(ExchangeError),
})).annotate({ identifier: "FetchAccessTokenResponse" }) as any as Schema.Schema<FetchAccessTokenResponse>;

export interface User {
  /** Identifier. Resource name of the user, in the format `projects/* /locations/* /accountConnectors/* /users/*`. */
  name?: string;
  /** Output only. Developer Connect automatically converts user identity to some human readable description, e.g., email address. */
  displayName?: string;
  /** Output only. The timestamp when the user was created. */
  createTime?: string;
  /** Output only. The timestamp when the token was last requested. */
  lastTokenRequestTime?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastTokenRequestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface ListUsersResponse {
  /** The list of Users */
  users?: Array<User>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListUsersResponse: Schema.Schema<ListUsersResponse> = Schema.suspend(() => Schema.Struct({
  users: Schema.optional(Schema.Array(User)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListUsersResponse" }) as any as Schema.Schema<ListUsersResponse>;

export interface StartOAuthResponse {
  /** The ID of the system provider. */
  systemProviderId?: "SYSTEM_PROVIDER_UNSPECIFIED" | "GITHUB" | "GITLAB" | "GOOGLE" | "SENTRY" | "ROVO" | "NEW_RELIC" | "DATASTAX" | "DYNATRACE" | (string & {});
  /** The ticket to be used for post processing the callback from the service provider. */
  ticket?: string;
  /** Please refer to https://datatracker.ietf.org/doc/html/rfc7636#section-4.1 */
  codeChallenge?: string;
  /** Please refer to https://datatracker.ietf.org/doc/html/rfc7636#section-4.2 */
  codeChallengeMethod?: string;
  /** The client ID to the OAuth App of the service provider. */
  clientId?: string;
  /** The list of scopes requested by the application. */
  scopes?: Array<string>;
  /** The authorization server URL to the OAuth flow of the service provider. */
  authUri?: string;
}

export const StartOAuthResponse: Schema.Schema<StartOAuthResponse> = Schema.suspend(() => Schema.Struct({
  systemProviderId: Schema.optional(Schema.String),
  ticket: Schema.optional(Schema.String),
  codeChallenge: Schema.optional(Schema.String),
  codeChallengeMethod: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  authUri: Schema.optional(Schema.String),
})).annotate({ identifier: "StartOAuthResponse" }) as any as Schema.Schema<StartOAuthResponse>;

export interface FinishOAuthResponse {
  /** The error resulted from exchanging OAuth tokens from the service provider. */
  exchangeError?: ExchangeError;
}

export const FinishOAuthResponse: Schema.Schema<FinishOAuthResponse> = Schema.suspend(() => Schema.Struct({
  exchangeError: Schema.optional(ExchangeError),
})).annotate({ identifier: "FinishOAuthResponse" }) as any as Schema.Schema<FinishOAuthResponse>;

export interface Projects {
  /** Optional. The project IDs. Format: {project} */
  projectIds?: Array<string>;
}

export const Projects: Schema.Schema<Projects> = Schema.suspend(() => Schema.Struct({
  projectIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Projects" }) as any as Schema.Schema<Projects>;

export interface GKEWorkload {
  /** Required. Immutable. The name of the GKE cluster. Format: `projects/{project}/locations/{location}/clusters/{cluster}`. */
  cluster?: string;
  /** Output only. The name of the GKE deployment. Format: `projects/{project}/locations/{location}/clusters/{cluster}/namespaces/{namespace}/deployments/{deployment}`. */
  deployment?: string;
}

export const GKEWorkload: Schema.Schema<GKEWorkload> = Schema.suspend(() => Schema.Struct({
  cluster: Schema.optional(Schema.String),
  deployment: Schema.optional(Schema.String),
})).annotate({ identifier: "GKEWorkload" }) as any as Schema.Schema<GKEWorkload>;

export interface GoogleCloudRun {
  /** Required. Immutable. The name of the Cloud Run service. Format: `projects/{project}/locations/{location}/services/{service}`. */
  serviceUri?: string;
}

export const GoogleCloudRun: Schema.Schema<GoogleCloudRun> = Schema.suspend(() => Schema.Struct({
  serviceUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRun" }) as any as Schema.Schema<GoogleCloudRun>;

export interface AppHubWorkload {
  /** Required. Output only. Immutable. The name of the App Hub Workload. Format: `projects/{project}/locations/{location}/applications/{application}/workloads/{workload}`. */
  workload?: string;
  /** Output only. The criticality of the App Hub Workload. */
  criticality?: string;
  /** Output only. The environment of the App Hub Workload. */
  environment?: string;
}

export const AppHubWorkload: Schema.Schema<AppHubWorkload> = Schema.suspend(() => Schema.Struct({
  workload: Schema.optional(Schema.String),
  criticality: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "AppHubWorkload" }) as any as Schema.Schema<AppHubWorkload>;

export interface AppHubService {
  /** Required. Output only. Immutable. The name of the App Hub Service. Format: `projects/{project}/locations/{location}/applications/{application}/services/{service}`. */
  apphubService?: string;
  /** Output only. The criticality of the App Hub Service. */
  criticality?: string;
  /** Output only. The environment of the App Hub Service. */
  environment?: string;
}

export const AppHubService: Schema.Schema<AppHubService> = Schema.suspend(() => Schema.Struct({
  apphubService: Schema.optional(Schema.String),
  criticality: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "AppHubService" }) as any as Schema.Schema<AppHubService>;

export interface RuntimeConfig {
  /** Output only. Google Kubernetes Engine runtime. */
  gkeWorkload?: GKEWorkload;
  /** Output only. Cloud Run runtime. */
  googleCloudRun?: GoogleCloudRun;
  /** Output only. App Hub Workload. */
  appHubWorkload?: AppHubWorkload;
  /** Output only. App Hub Service. */
  appHubService?: AppHubService;
  /** Required. Immutable. The URI of the runtime configuration. For GKE, this is the cluster name. For Cloud Run, this is the service name. */
  uri?: string;
  /** Output only. The state of the Runtime. */
  state?: "STATE_UNSPECIFIED" | "LINKED" | "UNLINKED" | (string & {});
}

export const RuntimeConfig: Schema.Schema<RuntimeConfig> = Schema.suspend(() => Schema.Struct({
  gkeWorkload: Schema.optional(GKEWorkload),
  googleCloudRun: Schema.optional(GoogleCloudRun),
  appHubWorkload: Schema.optional(AppHubWorkload),
  appHubService: Schema.optional(AppHubService),
  uri: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "RuntimeConfig" }) as any as Schema.Schema<RuntimeConfig>;

export interface GoogleArtifactRegistry {
  /** Required. The host project of Artifact Registry. */
  projectId?: string;
  /** Required. Immutable. The name of the artifact registry package. */
  artifactRegistryPackage?: string;
}

export const GoogleArtifactRegistry: Schema.Schema<GoogleArtifactRegistry> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleArtifactRegistry" }) as any as Schema.Schema<GoogleArtifactRegistry>;

export interface GoogleArtifactAnalysis {
  /** Required. The project id of the project where the provenance is stored. */
  projectId?: string;
}

export const GoogleArtifactAnalysis: Schema.Schema<GoogleArtifactAnalysis> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleArtifactAnalysis" }) as any as Schema.Schema<GoogleArtifactAnalysis>;

export interface ArtifactConfig {
  /** Optional. Set if the artifact is stored in Artifact registry. */
  googleArtifactRegistry?: GoogleArtifactRegistry;
  /** Optional. Set if the artifact metadata is stored in Artifact analysis. */
  googleArtifactAnalysis?: GoogleArtifactAnalysis;
  /** Required. Immutable. The URI of the artifact that is deployed. e.g. `us-docker.pkg.dev/my-project/my-repo/image`. The URI does not include the tag / digest because it captures a lineage of artifacts. */
  uri?: string;
}

export const ArtifactConfig: Schema.Schema<ArtifactConfig> = Schema.suspend(() => Schema.Struct({
  googleArtifactRegistry: Schema.optional(GoogleArtifactRegistry),
  googleArtifactAnalysis: Schema.optional(GoogleArtifactAnalysis),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ArtifactConfig" }) as any as Schema.Schema<ArtifactConfig>;

export interface InsightsConfig {
  /** Optional. The name of the App Hub Application. Format: projects/{project}/locations/{location}/applications/{application} */
  appHubApplication?: string;
  /** Optional. The projects to track with the InsightsConfig. */
  projects?: Projects;
  /** Identifier. The name of the InsightsConfig. Format: projects/{project}/locations/{location}/insightsConfigs/{insightsConfig} */
  name?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
  /** Output only. The runtime configurations where the application is deployed. */
  runtimeConfigs?: Array<RuntimeConfig>;
  /** Optional. The artifact configurations of the artifacts that are deployed. */
  artifactConfigs?: Array<ArtifactConfig>;
  /** Optional. Output only. The state of the InsightsConfig. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "COMPLETE" | "ERROR" | (string & {});
  /** Optional. User specified annotations. See https://google.aip.dev/148#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
  /** Optional. Set of labels associated with an InsightsConfig. */
  labels?: Record<string, string>;
  /** Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of InsightsConfig does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. */
  reconciling?: boolean;
  /** Output only. Any errors that occurred while setting up the InsightsConfig. Each error will be in the format: `field_name: error_message`, e.g. GetAppHubApplication: Permission denied while getting App Hub application. Please grant permissions to the P4SA. */
  errors?: Array<Status>;
}

export const InsightsConfig: Schema.Schema<InsightsConfig> = Schema.suspend(() => Schema.Struct({
  appHubApplication: Schema.optional(Schema.String),
  projects: Schema.optional(Projects),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  runtimeConfigs: Schema.optional(Schema.Array(RuntimeConfig)),
  artifactConfigs: Schema.optional(Schema.Array(ArtifactConfig)),
  state: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reconciling: Schema.optional(Schema.Boolean),
  errors: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "InsightsConfig" }) as any as Schema.Schema<InsightsConfig>;

export interface ListInsightsConfigsResponse {
  /** The list of InsightsConfigs. */
  insightsConfigs?: Array<InsightsConfig>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInsightsConfigsResponse: Schema.Schema<ListInsightsConfigsResponse> = Schema.suspend(() => Schema.Struct({
  insightsConfigs: Schema.optional(Schema.Array(InsightsConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInsightsConfigsResponse" }) as any as Schema.Schema<ListInsightsConfigsResponse>;

export interface ArtifactDeployment {
  /** Output only. Unique identifier of `ArtifactDeployment`. */
  id?: string;
  /** Output only. The artifact that is deployed. */
  artifactReference?: string;
  /** Output only. The artifact alias in the deployment spec, with Tag/SHA. e.g. us-docker.pkg.dev/my-project/my-repo/image:1.0.0 */
  artifactAlias?: string;
  /** Output only. The source commits at which this artifact was built. Extracted from provenance. */
  sourceCommitUris?: Array<string>;
  /** Output only. The time at which the deployment was deployed. */
  deployTime?: string;
  /** Output only. The time at which the deployment was undeployed, all artifacts are considered undeployed once this time is set. */
  undeployTime?: string;
  /** Output only. The summary of container status of the artifact deployment. Format as `ContainerStatusState-Reason : restartCount` e.g. "Waiting-ImagePullBackOff : 3" */
  containerStatusSummary?: string;
}

export const ArtifactDeployment: Schema.Schema<ArtifactDeployment> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  artifactReference: Schema.optional(Schema.String),
  artifactAlias: Schema.optional(Schema.String),
  sourceCommitUris: Schema.optional(Schema.Array(Schema.String)),
  deployTime: Schema.optional(Schema.String),
  undeployTime: Schema.optional(Schema.String),
  containerStatusSummary: Schema.optional(Schema.String),
})).annotate({ identifier: "ArtifactDeployment" }) as any as Schema.Schema<ArtifactDeployment>;

export interface DeploymentEvent {
  /** Identifier. The name of the DeploymentEvent. This name is provided by Developer Connect insights. Format: projects/{project}/locations/{location}/insightsConfigs/{insights_config}/deploymentEvents/{uuid} */
  name?: string;
  /** Output only. The create time of the DeploymentEvent. */
  createTime?: string;
  /** Output only. The update time of the DeploymentEvent. */
  updateTime?: string;
  /** Output only. The runtime configurations where the DeploymentEvent happened. */
  runtimeConfig?: RuntimeConfig;
  /** Output only. The runtime assigned URI of the DeploymentEvent. For GKE, this is the fully qualified replica set uri. e.g. container.googleapis.com/projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/apps/replicasets/{replica-set-id} For Cloud Run, this is the revision name. */
  runtimeDeploymentUri?: string;
  /** Output only. The state of the DeploymentEvent. */
  state?: "STATE_UNSPECIFIED" | "STATE_ACTIVE" | "STATE_INACTIVE" | (string & {});
  /** Output only. The artifact deployments of the DeploymentEvent. Each artifact deployment contains the artifact uri and the runtime configuration uri. For GKE, this would be all the containers images that are deployed in the pod. */
  artifactDeployments?: Array<ArtifactDeployment>;
  /** Output only. The time at which the DeploymentEvent was deployed. This would be the min of all ArtifactDeployment deploy_times. */
  deployTime?: string;
  /** Output only. The time at which the DeploymentEvent was undeployed, all artifacts are considered undeployed once this time is set. This would be the max of all ArtifactDeployment undeploy_times. If any ArtifactDeployment is still active (i.e. does not have an undeploy_time), this field will be empty. */
  undeployTime?: string;
}

export const DeploymentEvent: Schema.Schema<DeploymentEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  runtimeConfig: Schema.optional(RuntimeConfig),
  runtimeDeploymentUri: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  artifactDeployments: Schema.optional(Schema.Array(ArtifactDeployment)),
  deployTime: Schema.optional(Schema.String),
  undeployTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DeploymentEvent" }) as any as Schema.Schema<DeploymentEvent>;

export interface ListDeploymentEventsResponse {
  /** The list of DeploymentEvents. */
  deploymentEvents?: Array<DeploymentEvent>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDeploymentEventsResponse: Schema.Schema<ListDeploymentEventsResponse> = Schema.suspend(() => Schema.Struct({
  deploymentEvents: Schema.optional(Schema.Array(DeploymentEvent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDeploymentEventsResponse" }) as any as Schema.Schema<ListDeploymentEventsResponse>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface ProcessGitHubEnterpriseWebhookRequest {
  /** Required. HTTP request body. */
  body?: HttpBody;
}

export const ProcessGitHubEnterpriseWebhookRequest: Schema.Schema<ProcessGitHubEnterpriseWebhookRequest> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(HttpBody),
})).annotate({ identifier: "ProcessGitHubEnterpriseWebhookRequest" }) as any as Schema.Schema<ProcessGitHubEnterpriseWebhookRequest>;

export interface ProcessGitLabEnterpriseWebhookRequest {
  /** Required. HTTP request body. */
  body?: HttpBody;
}

export const ProcessGitLabEnterpriseWebhookRequest: Schema.Schema<ProcessGitLabEnterpriseWebhookRequest> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(HttpBody),
})).annotate({ identifier: "ProcessGitLabEnterpriseWebhookRequest" }) as any as Schema.Schema<ProcessGitLabEnterpriseWebhookRequest>;

export interface ProcessGitLabWebhookRequest {
  /** Required. HTTP request body. */
  body?: HttpBody;
}

export const ProcessGitLabWebhookRequest: Schema.Schema<ProcessGitLabWebhookRequest> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(HttpBody),
})).annotate({ identifier: "ProcessGitLabWebhookRequest" }) as any as Schema.Schema<ProcessGitLabWebhookRequest>;

export interface ProcessBitbucketDataCenterWebhookRequest {
  /** Required. HTTP request body. */
  body?: HttpBody;
}

export const ProcessBitbucketDataCenterWebhookRequest: Schema.Schema<ProcessBitbucketDataCenterWebhookRequest> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(HttpBody),
})).annotate({ identifier: "ProcessBitbucketDataCenterWebhookRequest" }) as any as Schema.Schema<ProcessBitbucketDataCenterWebhookRequest>;

export interface ProcessBitbucketCloudWebhookRequest {
  /** Required. HTTP request body. */
  body?: HttpBody;
}

export const ProcessBitbucketCloudWebhookRequest: Schema.Schema<ProcessBitbucketCloudWebhookRequest> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(HttpBody),
})).annotate({ identifier: "ProcessBitbucketCloudWebhookRequest" }) as any as Schema.Schema<ProcessBitbucketCloudWebhookRequest>;

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
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

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

/** Lists Connections in a given project and location. */
export interface ListProjectsLocationsConnectionsRequest {
  /** Required. Parent value for ListConnectionsRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsRequest>;

export type ListProjectsLocationsConnectionsResponse = ListConnectionsResponse;
export const ListProjectsLocationsConnectionsResponse = ListConnectionsResponse;

export type ListProjectsLocationsConnectionsError = CommonErrors;

export const listProjectsLocationsConnections = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsRequest,
  output: ListProjectsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Connection. */
export interface GetProjectsLocationsConnectionsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsRequest>;

export type GetProjectsLocationsConnectionsResponse = Connection;
export const GetProjectsLocationsConnectionsResponse = Connection;

export type GetProjectsLocationsConnectionsError = CommonErrors;

export const getProjectsLocationsConnections: API.OperationMethod<GetProjectsLocationsConnectionsRequest, GetProjectsLocationsConnectionsResponse, GetProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsRequest,
  output: GetProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Creates a new Connection in a given project and location. */
export interface CreateProjectsLocationsConnectionsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. Id of the requesting object If auto-generating Id server-side, remove this field and connection_id from the method_signature of Create RPC */
  connectionId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Connection;
}

export const CreateProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectionId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Connection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionsRequest>;

export type CreateProjectsLocationsConnectionsResponse = Operation;
export const CreateProjectsLocationsConnectionsResponse = Operation;

export type CreateProjectsLocationsConnectionsError = CommonErrors;

export const createProjectsLocationsConnections: API.OperationMethod<CreateProjectsLocationsConnectionsRequest, CreateProjectsLocationsConnectionsResponse, CreateProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionsRequest,
  output: CreateProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Updates the parameters of a single Connection. */
export interface PatchProjectsLocationsConnectionsRequest {
  /** Identifier. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Connection resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, and the connection is not found a new connection will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input connection has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties). */
  allowMissing?: boolean;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Connection;
}

export const PatchProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Connection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectionsRequest>;

export type PatchProjectsLocationsConnectionsResponse = Operation;
export const PatchProjectsLocationsConnectionsResponse = Operation;

export type PatchProjectsLocationsConnectionsError = CommonErrors;

export const patchProjectsLocationsConnections: API.OperationMethod<PatchProjectsLocationsConnectionsRequest, PatchProjectsLocationsConnectionsResponse, PatchProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectionsRequest,
  output: PatchProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Deletes a single Connection. */
export interface DeleteProjectsLocationsConnectionsRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Optional. The current etag of the Connection. If an etag is provided and does not match the current etag of the Connection, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionsRequest>;

export type DeleteProjectsLocationsConnectionsResponse = Operation;
export const DeleteProjectsLocationsConnectionsResponse = Operation;

export type DeleteProjectsLocationsConnectionsError = CommonErrors;

export const deleteProjectsLocationsConnections: API.OperationMethod<DeleteProjectsLocationsConnectionsRequest, DeleteProjectsLocationsConnectionsResponse, DeleteProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionsRequest,
  output: DeleteProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** FetchLinkableGitRepositories returns a list of git repositories from an SCM that are available to be added to a Connection. */
export interface FetchLinkableGitRepositoriesProjectsLocationsConnectionsRequest {
  /** Required. The name of the Connection. Format: `projects/* /locations/* /connections/*`. */
  connection: string;
  /** Optional. Number of results to return in the list. Defaults to 20. */
  pageSize?: number;
  /** Optional. Page start. */
  pageToken?: string;
}

export const FetchLinkableGitRepositoriesProjectsLocationsConnectionsRequest = Schema.Struct({
  connection: Schema.String.pipe(T.HttpPath("connection")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:fetchLinkableGitRepositories" }),
  svc,
) as unknown as Schema.Schema<FetchLinkableGitRepositoriesProjectsLocationsConnectionsRequest>;

export type FetchLinkableGitRepositoriesProjectsLocationsConnectionsResponse = FetchLinkableGitRepositoriesResponse;
export const FetchLinkableGitRepositoriesProjectsLocationsConnectionsResponse = FetchLinkableGitRepositoriesResponse;

export type FetchLinkableGitRepositoriesProjectsLocationsConnectionsError = CommonErrors;

export const fetchLinkableGitRepositoriesProjectsLocationsConnections = API.makePaginated(() => ({
  input: FetchLinkableGitRepositoriesProjectsLocationsConnectionsRequest,
  output: FetchLinkableGitRepositoriesProjectsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** FetchGitHubInstallations returns the list of GitHub Installations that are available to be added to a Connection. For github.com, only installations accessible to the authorizer token are returned. For GitHub Enterprise, all installations are returned. */
export interface FetchGitHubInstallationsProjectsLocationsConnectionsRequest {
  /** Required. The resource name of the connection in the format `projects/* /locations/* /connections/*`. */
  connection: string;
}

export const FetchGitHubInstallationsProjectsLocationsConnectionsRequest = Schema.Struct({
  connection: Schema.String.pipe(T.HttpPath("connection")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:fetchGitHubInstallations" }),
  svc,
) as unknown as Schema.Schema<FetchGitHubInstallationsProjectsLocationsConnectionsRequest>;

export type FetchGitHubInstallationsProjectsLocationsConnectionsResponse = FetchGitHubInstallationsResponse;
export const FetchGitHubInstallationsProjectsLocationsConnectionsResponse = FetchGitHubInstallationsResponse;

export type FetchGitHubInstallationsProjectsLocationsConnectionsError = CommonErrors;

export const fetchGitHubInstallationsProjectsLocationsConnections: API.OperationMethod<FetchGitHubInstallationsProjectsLocationsConnectionsRequest, FetchGitHubInstallationsProjectsLocationsConnectionsResponse, FetchGitHubInstallationsProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchGitHubInstallationsProjectsLocationsConnectionsRequest,
  output: FetchGitHubInstallationsProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** ProcessGitHubEnterpriseWebhook is called by the external GitHub Enterprise instances for notifying events. */
export interface ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsRequest {
  /** Required. Project and location where the webhook will be received. Format: `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: ProcessGitHubEnterpriseWebhookRequest;
}

export const ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ProcessGitHubEnterpriseWebhookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections:processGitHubEnterpriseWebhook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsRequest>;

export type ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsResponse = Empty;
export const ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsResponse = Empty;

export type ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsError = CommonErrors;

export const processGitHubEnterpriseWebhookProjectsLocationsConnections: API.OperationMethod<ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsRequest, ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsResponse, ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsRequest,
  output: ProcessGitHubEnterpriseWebhookProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Creates a GitRepositoryLink. Upon linking a Git Repository, Developer Connect will configure the Git Repository to send webhook events to Developer Connect. Connections that use Firebase GitHub Application will have events forwarded to the Firebase service. Connections that use Gemini Code Assist will have events forwarded to Gemini Code Assist service. All other Connections will have events forwarded to Cloud Build. */
export interface CreateProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. The ID to use for the repository, which will become the final component of the repository's resource name. This ID should be unique in the connection. Allows alphanumeric characters and any of -._~%!$&'()*+,;=@. */
  gitRepositoryLinkId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GitRepositoryLink;
}

export const CreateProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  gitRepositoryLinkId: Schema.optional(Schema.String).pipe(T.HttpQuery("gitRepositoryLinkId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GitRepositoryLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type CreateProjectsLocationsConnectionsGitRepositoryLinksResponse = Operation;
export const CreateProjectsLocationsConnectionsGitRepositoryLinksResponse = Operation;

export type CreateProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const createProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<CreateProjectsLocationsConnectionsGitRepositoryLinksRequest, CreateProjectsLocationsConnectionsGitRepositoryLinksResponse, CreateProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: CreateProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** Deletes a single GitRepositoryLink. */
export interface DeleteProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type DeleteProjectsLocationsConnectionsGitRepositoryLinksResponse = Operation;
export const DeleteProjectsLocationsConnectionsGitRepositoryLinksResponse = Operation;

export type DeleteProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const deleteProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<DeleteProjectsLocationsConnectionsGitRepositoryLinksRequest, DeleteProjectsLocationsConnectionsGitRepositoryLinksResponse, DeleteProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: DeleteProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** Lists GitRepositoryLinks in a given project, location, and connection. */
export interface ListProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. Parent value for ListGitRepositoryLinksRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type ListProjectsLocationsConnectionsGitRepositoryLinksResponse = ListGitRepositoryLinksResponse;
export const ListProjectsLocationsConnectionsGitRepositoryLinksResponse = ListGitRepositoryLinksResponse;

export type ListProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const listProjectsLocationsConnectionsGitRepositoryLinks = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: ListProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single GitRepositoryLink. */
export interface GetProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type GetProjectsLocationsConnectionsGitRepositoryLinksResponse = GitRepositoryLink;
export const GetProjectsLocationsConnectionsGitRepositoryLinksResponse = GitRepositoryLink;

export type GetProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const getProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<GetProjectsLocationsConnectionsGitRepositoryLinksRequest, GetProjectsLocationsConnectionsGitRepositoryLinksResponse, GetProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: GetProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** Fetches read/write token of a given gitRepositoryLink. */
export interface FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The resource name of the gitRepositoryLink in the format `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  gitRepositoryLink: string;
  /** Request body */
  body?: FetchReadWriteTokenRequest;
}

export const FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  gitRepositoryLink: Schema.String.pipe(T.HttpPath("gitRepositoryLink")),
  body: Schema.optional(FetchReadWriteTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:fetchReadWriteToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksResponse = FetchReadWriteTokenResponse;
export const FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksResponse = FetchReadWriteTokenResponse;

export type FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const fetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksRequest, FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksResponse, FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: FetchReadWriteTokenProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** Fetches read token of a given gitRepositoryLink. */
export interface FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The resource name of the gitRepositoryLink in the format `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  gitRepositoryLink: string;
  /** Request body */
  body?: FetchReadTokenRequest;
}

export const FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  gitRepositoryLink: Schema.String.pipe(T.HttpPath("gitRepositoryLink")),
  body: Schema.optional(FetchReadTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:fetchReadToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksResponse = FetchReadTokenResponse;
export const FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksResponse = FetchReadTokenResponse;

export type FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const fetchReadTokenProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksRequest, FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksResponse, FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: FetchReadTokenProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** Fetch the list of branches or tags for a given repository. */
export interface FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The resource name of GitRepositoryLink in the format `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  gitRepositoryLink: string;
  /** Required. Type of refs to fetch. */
  refType?: "REF_TYPE_UNSPECIFIED" | "TAG" | "BRANCH" | (string & {});
  /** Optional. Number of results to return in the list. Default to 20. */
  pageSize?: number;
  /** Optional. Page start. */
  pageToken?: string;
}

export const FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  gitRepositoryLink: Schema.String.pipe(T.HttpPath("gitRepositoryLink")),
  refType: Schema.optional(Schema.String).pipe(T.HttpQuery("refType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:fetchGitRefs" }),
  svc,
) as unknown as Schema.Schema<FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksResponse = FetchGitRefsResponse;
export const FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksResponse = FetchGitRefsResponse;

export type FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const fetchGitRefsProjectsLocationsConnectionsGitRepositoryLinks = API.makePaginated(() => ({
  input: FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: FetchGitRefsProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** ProcessGitLabEnterpriseWebhook is called by the external GitLab Enterprise instances for notifying events. */
export interface ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The GitRepositoryLink resource where the webhook will be received. Format: `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  name: string;
  /** Request body */
  body?: ProcessGitLabEnterpriseWebhookRequest;
}

export const ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProcessGitLabEnterpriseWebhookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:processGitLabEnterpriseWebhook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;
export const ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;

export type ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const processGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest, ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse, ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: ProcessGitLabEnterpriseWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** ProcessGitLabWebhook is called by the GitLab.com for notifying events. */
export interface ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The GitRepositoryLink resource where the webhook will be received. Format: `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  name: string;
  /** Request body */
  body?: ProcessGitLabWebhookRequest;
}

export const ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProcessGitLabWebhookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:processGitLabWebhook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;
export const ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;

export type ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const processGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest, ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse, ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: ProcessGitLabWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** ProcessBitbucketDataCenterWebhook is called by the external Bitbucket Data Center instances for notifying events. */
export interface ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The GitRepositoryLink where the webhook will be received. Format: `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  name: string;
  /** Request body */
  body?: ProcessBitbucketDataCenterWebhookRequest;
}

export const ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProcessBitbucketDataCenterWebhookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:processBitbucketDataCenterWebhook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;
export const ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;

export type ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const processBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest, ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse, ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: ProcessBitbucketDataCenterWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** ProcessBitbucketCloudWebhook is called by the external Bitbucket Cloud instances for notifying events. */
export interface ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest {
  /** Required. The GitRepositoryLink where the webhook will be received. Format: `projects/* /locations/* /connections/* /gitRepositoryLinks/*`. */
  name: string;
  /** Request body */
  body?: ProcessBitbucketCloudWebhookRequest;
}

export const ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProcessBitbucketCloudWebhookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/gitRepositoryLinks/{gitRepositoryLinksId}:processBitbucketCloudWebhook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest>;

export type ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;
export const ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse = Empty;

export type ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksError = CommonErrors;

export const processBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinks: API.OperationMethod<ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest, ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse, ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksRequest,
  output: ProcessBitbucketCloudWebhookProjectsLocationsConnectionsGitRepositoryLinksResponse,
  errors: [],
}));

/** Lists AccountConnectors in a given project and location. */
export interface ListProjectsLocationsAccountConnectorsRequest {
  /** Required. Parent value for ListAccountConnectorsRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsAccountConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAccountConnectorsRequest>;

export type ListProjectsLocationsAccountConnectorsResponse = ListAccountConnectorsResponse;
export const ListProjectsLocationsAccountConnectorsResponse = ListAccountConnectorsResponse;

export type ListProjectsLocationsAccountConnectorsError = CommonErrors;

export const listProjectsLocationsAccountConnectors = API.makePaginated(() => ({
  input: ListProjectsLocationsAccountConnectorsRequest,
  output: ListProjectsLocationsAccountConnectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single AccountConnector. */
export interface GetProjectsLocationsAccountConnectorsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const GetProjectsLocationsAccountConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAccountConnectorsRequest>;

export type GetProjectsLocationsAccountConnectorsResponse = AccountConnector;
export const GetProjectsLocationsAccountConnectorsResponse = AccountConnector;

export type GetProjectsLocationsAccountConnectorsError = CommonErrors;

export const getProjectsLocationsAccountConnectors: API.OperationMethod<GetProjectsLocationsAccountConnectorsRequest, GetProjectsLocationsAccountConnectorsResponse, GetProjectsLocationsAccountConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAccountConnectorsRequest,
  output: GetProjectsLocationsAccountConnectorsResponse,
  errors: [],
}));

/** Creates a new AccountConnector in a given project and location. */
export interface CreateProjectsLocationsAccountConnectorsRequest {
  /** Required. Location resource name as the account_connector’s parent. */
  parent: string;
  /** Required. The ID to use for the AccountConnector, which will become the final component of the AccountConnector's resource name. Its format should adhere to https://google.aip.dev/122#resource-id-segments Names must be unique per-project per-location. */
  accountConnectorId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: AccountConnector;
}

export const CreateProjectsLocationsAccountConnectorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  accountConnectorId: Schema.optional(Schema.String).pipe(T.HttpQuery("accountConnectorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(AccountConnector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAccountConnectorsRequest>;

export type CreateProjectsLocationsAccountConnectorsResponse = Operation;
export const CreateProjectsLocationsAccountConnectorsResponse = Operation;

export type CreateProjectsLocationsAccountConnectorsError = CommonErrors;

export const createProjectsLocationsAccountConnectors: API.OperationMethod<CreateProjectsLocationsAccountConnectorsRequest, CreateProjectsLocationsAccountConnectorsResponse, CreateProjectsLocationsAccountConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAccountConnectorsRequest,
  output: CreateProjectsLocationsAccountConnectorsResponse,
  errors: [],
}));

/** Updates the parameters of a single AccountConnector. */
export interface PatchProjectsLocationsAccountConnectorsRequest {
  /** Identifier. The resource name of the accountConnector, in the format `projects/{project}/locations/{location}/accountConnectors/{account_connector_id}`. */
  name: string;
  /** Optional. The list of fields to be updated. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, and the accountConnector is not found a new accountConnector will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input accountConnector has all the necessary */
  allowMissing?: boolean;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: AccountConnector;
}

export const PatchProjectsLocationsAccountConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(AccountConnector).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAccountConnectorsRequest>;

export type PatchProjectsLocationsAccountConnectorsResponse = Operation;
export const PatchProjectsLocationsAccountConnectorsResponse = Operation;

export type PatchProjectsLocationsAccountConnectorsError = CommonErrors;

export const patchProjectsLocationsAccountConnectors: API.OperationMethod<PatchProjectsLocationsAccountConnectorsRequest, PatchProjectsLocationsAccountConnectorsResponse, PatchProjectsLocationsAccountConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAccountConnectorsRequest,
  output: PatchProjectsLocationsAccountConnectorsResponse,
  errors: [],
}));

/** Deletes a single AccountConnector. */
export interface DeleteProjectsLocationsAccountConnectorsRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Optional. The current etag of the AccountConnectorn. If an etag is provided and does not match the current etag of the AccountConnector, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. If set to true, any Users from this AccountConnector will also be deleted. (Otherwise, the request will only work if the AccountConnector has no Users.) */
  force?: boolean;
}

export const DeleteProjectsLocationsAccountConnectorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAccountConnectorsRequest>;

export type DeleteProjectsLocationsAccountConnectorsResponse = Operation;
export const DeleteProjectsLocationsAccountConnectorsResponse = Operation;

export type DeleteProjectsLocationsAccountConnectorsError = CommonErrors;

export const deleteProjectsLocationsAccountConnectors: API.OperationMethod<DeleteProjectsLocationsAccountConnectorsRequest, DeleteProjectsLocationsAccountConnectorsResponse, DeleteProjectsLocationsAccountConnectorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAccountConnectorsRequest,
  output: DeleteProjectsLocationsAccountConnectorsResponse,
  errors: [],
}));

/** Fetches OAuth access token based on end user credentials. */
export interface FetchAccessTokenProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. The resource name of the AccountConnector in the format `projects/* /locations/* /accountConnectors/*`. */
  accountConnector: string;
  /** Request body */
  body?: FetchAccessTokenRequest;
}

export const FetchAccessTokenProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  accountConnector: Schema.String.pipe(T.HttpPath("accountConnector")),
  body: Schema.optional(FetchAccessTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users:fetchAccessToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchAccessTokenProjectsLocationsAccountConnectorsUsersRequest>;

export type FetchAccessTokenProjectsLocationsAccountConnectorsUsersResponse = FetchAccessTokenResponse;
export const FetchAccessTokenProjectsLocationsAccountConnectorsUsersResponse = FetchAccessTokenResponse;

export type FetchAccessTokenProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const fetchAccessTokenProjectsLocationsAccountConnectorsUsers: API.OperationMethod<FetchAccessTokenProjectsLocationsAccountConnectorsUsersRequest, FetchAccessTokenProjectsLocationsAccountConnectorsUsersResponse, FetchAccessTokenProjectsLocationsAccountConnectorsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchAccessTokenProjectsLocationsAccountConnectorsUsersRequest,
  output: FetchAccessTokenProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
}));

/** Lists Users in a given project, location, and account_connector. */
export interface ListProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. Parent value for ListUsersRequest */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAccountConnectorsUsersRequest>;

export type ListProjectsLocationsAccountConnectorsUsersResponse = ListUsersResponse;
export const ListProjectsLocationsAccountConnectorsUsersResponse = ListUsersResponse;

export type ListProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const listProjectsLocationsAccountConnectorsUsers = API.makePaginated(() => ({
  input: ListProjectsLocationsAccountConnectorsUsersRequest,
  output: ListProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a single User. */
export interface DeleteProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. Name of the resource */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAccountConnectorsUsersRequest>;

export type DeleteProjectsLocationsAccountConnectorsUsersResponse = Operation;
export const DeleteProjectsLocationsAccountConnectorsUsersResponse = Operation;

export type DeleteProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const deleteProjectsLocationsAccountConnectorsUsers: API.OperationMethod<DeleteProjectsLocationsAccountConnectorsUsersRequest, DeleteProjectsLocationsAccountConnectorsUsersResponse, DeleteProjectsLocationsAccountConnectorsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAccountConnectorsUsersRequest,
  output: DeleteProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
}));

/** Fetch the User based on the user credentials. */
export interface FetchSelfProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. Name of the AccountConnector resource */
  name: string;
}

export const FetchSelfProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users:fetchSelf" }),
  svc,
) as unknown as Schema.Schema<FetchSelfProjectsLocationsAccountConnectorsUsersRequest>;

export type FetchSelfProjectsLocationsAccountConnectorsUsersResponse = User;
export const FetchSelfProjectsLocationsAccountConnectorsUsersResponse = User;

export type FetchSelfProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const fetchSelfProjectsLocationsAccountConnectorsUsers: API.OperationMethod<FetchSelfProjectsLocationsAccountConnectorsUsersRequest, FetchSelfProjectsLocationsAccountConnectorsUsersResponse, FetchSelfProjectsLocationsAccountConnectorsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchSelfProjectsLocationsAccountConnectorsUsersRequest,
  output: FetchSelfProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
}));

/** Delete the User based on the user credentials. */
export interface DeleteSelfProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. Name of the AccountConnector resource */
  name: string;
}

export const DeleteSelfProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users:deleteSelf" }),
  svc,
) as unknown as Schema.Schema<DeleteSelfProjectsLocationsAccountConnectorsUsersRequest>;

export type DeleteSelfProjectsLocationsAccountConnectorsUsersResponse = Operation;
export const DeleteSelfProjectsLocationsAccountConnectorsUsersResponse = Operation;

export type DeleteSelfProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const deleteSelfProjectsLocationsAccountConnectorsUsers: API.OperationMethod<DeleteSelfProjectsLocationsAccountConnectorsUsersRequest, DeleteSelfProjectsLocationsAccountConnectorsUsersResponse, DeleteSelfProjectsLocationsAccountConnectorsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSelfProjectsLocationsAccountConnectorsUsersRequest,
  output: DeleteSelfProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
}));

/** Starts OAuth flow for an account connector. */
export interface StartOAuthFlowProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. The resource name of the AccountConnector in the format `projects/* /locations/* /accountConnectors/*`. */
  accountConnector: string;
}

export const StartOAuthFlowProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  accountConnector: Schema.String.pipe(T.HttpPath("accountConnector")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users:startOAuthFlow" }),
  svc,
) as unknown as Schema.Schema<StartOAuthFlowProjectsLocationsAccountConnectorsUsersRequest>;

export type StartOAuthFlowProjectsLocationsAccountConnectorsUsersResponse = StartOAuthResponse;
export const StartOAuthFlowProjectsLocationsAccountConnectorsUsersResponse = StartOAuthResponse;

export type StartOAuthFlowProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const startOAuthFlowProjectsLocationsAccountConnectorsUsers: API.OperationMethod<StartOAuthFlowProjectsLocationsAccountConnectorsUsersRequest, StartOAuthFlowProjectsLocationsAccountConnectorsUsersResponse, StartOAuthFlowProjectsLocationsAccountConnectorsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartOAuthFlowProjectsLocationsAccountConnectorsUsersRequest,
  output: StartOAuthFlowProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
}));

/** Finishes OAuth flow for an account connector. */
export interface FinishOAuthFlowProjectsLocationsAccountConnectorsUsersRequest {
  /** Required. The resource name of the AccountConnector in the format `projects/* /locations/* /accountConnectors/*`. */
  accountConnector: string;
  /** Required. The code to be used for getting the token from SCM provider. */
  "oauthParams.code"?: string;
  /** Required. The ticket to be used for post processing the callback from SCM provider. */
  "oauthParams.ticket"?: string;
  /** Required. The scopes returned by Google OAuth flow. */
  "googleOauthParams.scopes"?: string[];
  /** Optional. The version info returned by Google OAuth flow. */
  "googleOauthParams.versionInfo"?: string;
  /** Required. The ticket to be used for post processing the callback from Google OAuth flow. */
  "googleOauthParams.ticket"?: string;
}

export const FinishOAuthFlowProjectsLocationsAccountConnectorsUsersRequest = Schema.Struct({
  accountConnector: Schema.String.pipe(T.HttpPath("accountConnector")),
  "oauthParams.code": Schema.optional(Schema.String).pipe(T.HttpQuery("oauthParams.code")),
  "oauthParams.ticket": Schema.optional(Schema.String).pipe(T.HttpQuery("oauthParams.ticket")),
  "googleOauthParams.scopes": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("googleOauthParams.scopes")),
  "googleOauthParams.versionInfo": Schema.optional(Schema.String).pipe(T.HttpQuery("googleOauthParams.versionInfo")),
  "googleOauthParams.ticket": Schema.optional(Schema.String).pipe(T.HttpQuery("googleOauthParams.ticket")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/accountConnectors/{accountConnectorsId}/users:finishOAuthFlow" }),
  svc,
) as unknown as Schema.Schema<FinishOAuthFlowProjectsLocationsAccountConnectorsUsersRequest>;

export type FinishOAuthFlowProjectsLocationsAccountConnectorsUsersResponse = FinishOAuthResponse;
export const FinishOAuthFlowProjectsLocationsAccountConnectorsUsersResponse = FinishOAuthResponse;

export type FinishOAuthFlowProjectsLocationsAccountConnectorsUsersError = CommonErrors;

export const finishOAuthFlowProjectsLocationsAccountConnectorsUsers: API.OperationMethod<FinishOAuthFlowProjectsLocationsAccountConnectorsUsersRequest, FinishOAuthFlowProjectsLocationsAccountConnectorsUsersResponse, FinishOAuthFlowProjectsLocationsAccountConnectorsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FinishOAuthFlowProjectsLocationsAccountConnectorsUsersRequest,
  output: FinishOAuthFlowProjectsLocationsAccountConnectorsUsersResponse,
  errors: [],
}));

/** Lists InsightsConfigs in a given project and location. */
export interface ListProjectsLocationsInsightsConfigsRequest {
  /** Required. Parent value for ListInsightsConfigsRequest. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. See https://google.aip.dev/160 for more details. Filter string, adhering to the rules in https://google.aip.dev/160. List only InsightsConfigs matching the filter. If filter is empty, all InsightsConfigs are listed. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsInsightsConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInsightsConfigsRequest>;

export type ListProjectsLocationsInsightsConfigsResponse = ListInsightsConfigsResponse;
export const ListProjectsLocationsInsightsConfigsResponse = ListInsightsConfigsResponse;

export type ListProjectsLocationsInsightsConfigsError = CommonErrors;

export const listProjectsLocationsInsightsConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsInsightsConfigsRequest,
  output: ListProjectsLocationsInsightsConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new InsightsConfig in a given project and location. */
export interface CreateProjectsLocationsInsightsConfigsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the requesting InsightsConfig. */
  insightsConfigId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: InsightsConfig;
}

export const CreateProjectsLocationsInsightsConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  insightsConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("insightsConfigId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(InsightsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInsightsConfigsRequest>;

export type CreateProjectsLocationsInsightsConfigsResponse = Operation;
export const CreateProjectsLocationsInsightsConfigsResponse = Operation;

export type CreateProjectsLocationsInsightsConfigsError = CommonErrors;

export const createProjectsLocationsInsightsConfigs: API.OperationMethod<CreateProjectsLocationsInsightsConfigsRequest, CreateProjectsLocationsInsightsConfigsResponse, CreateProjectsLocationsInsightsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInsightsConfigsRequest,
  output: CreateProjectsLocationsInsightsConfigsResponse,
  errors: [],
}));

/** Gets details of a single Insight. */
export interface GetProjectsLocationsInsightsConfigsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsInsightsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs/{insightsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInsightsConfigsRequest>;

export type GetProjectsLocationsInsightsConfigsResponse = InsightsConfig;
export const GetProjectsLocationsInsightsConfigsResponse = InsightsConfig;

export type GetProjectsLocationsInsightsConfigsError = CommonErrors;

export const getProjectsLocationsInsightsConfigs: API.OperationMethod<GetProjectsLocationsInsightsConfigsRequest, GetProjectsLocationsInsightsConfigsResponse, GetProjectsLocationsInsightsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInsightsConfigsRequest,
  output: GetProjectsLocationsInsightsConfigsResponse,
  errors: [],
}));

/** Updates the parameters of a single InsightsConfig. */
export interface PatchProjectsLocationsInsightsConfigsRequest {
  /** Identifier. The name of the InsightsConfig. Format: projects/{project}/locations/{location}/insightsConfigs/{insightsConfig} */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, and the insightsConfig is not found a new insightsConfig will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input insightsConfig has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties). */
  allowMissing?: boolean;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Request body */
  body?: InsightsConfig;
}

export const PatchProjectsLocationsInsightsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(InsightsConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs/{insightsConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInsightsConfigsRequest>;

export type PatchProjectsLocationsInsightsConfigsResponse = Operation;
export const PatchProjectsLocationsInsightsConfigsResponse = Operation;

export type PatchProjectsLocationsInsightsConfigsError = CommonErrors;

export const patchProjectsLocationsInsightsConfigs: API.OperationMethod<PatchProjectsLocationsInsightsConfigsRequest, PatchProjectsLocationsInsightsConfigsResponse, PatchProjectsLocationsInsightsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInsightsConfigsRequest,
  output: PatchProjectsLocationsInsightsConfigsResponse,
  errors: [],
}));

/** Deletes a single Insight. */
export interface DeleteProjectsLocationsInsightsConfigsRequest {
  /** Required. Value for parent. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set, validate the request, but do not actually post it. */
  validateOnly?: boolean;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const DeleteProjectsLocationsInsightsConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs/{insightsConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInsightsConfigsRequest>;

export type DeleteProjectsLocationsInsightsConfigsResponse = Operation;
export const DeleteProjectsLocationsInsightsConfigsResponse = Operation;

export type DeleteProjectsLocationsInsightsConfigsError = CommonErrors;

export const deleteProjectsLocationsInsightsConfigs: API.OperationMethod<DeleteProjectsLocationsInsightsConfigsRequest, DeleteProjectsLocationsInsightsConfigsResponse, DeleteProjectsLocationsInsightsConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInsightsConfigsRequest,
  output: DeleteProjectsLocationsInsightsConfigsResponse,
  errors: [],
}));

/** Gets a single Deployment Event. */
export interface GetProjectsLocationsInsightsConfigsDeploymentEventsRequest {
  /** Required. The name of the deployment event to retrieve. Format: projects/{project}/locations/{location}/insightsConfigs/{insights_config}/deploymentEvents/{uuid} */
  name: string;
}

export const GetProjectsLocationsInsightsConfigsDeploymentEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs/{insightsConfigsId}/deploymentEvents/{deploymentEventsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInsightsConfigsDeploymentEventsRequest>;

export type GetProjectsLocationsInsightsConfigsDeploymentEventsResponse = DeploymentEvent;
export const GetProjectsLocationsInsightsConfigsDeploymentEventsResponse = DeploymentEvent;

export type GetProjectsLocationsInsightsConfigsDeploymentEventsError = CommonErrors;

export const getProjectsLocationsInsightsConfigsDeploymentEvents: API.OperationMethod<GetProjectsLocationsInsightsConfigsDeploymentEventsRequest, GetProjectsLocationsInsightsConfigsDeploymentEventsResponse, GetProjectsLocationsInsightsConfigsDeploymentEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInsightsConfigsDeploymentEventsRequest,
  output: GetProjectsLocationsInsightsConfigsDeploymentEventsResponse,
  errors: [],
}));

/** Lists Deployment Events in a given insights config. */
export interface ListProjectsLocationsInsightsConfigsDeploymentEventsRequest {
  /** Required. The parent insights config that owns this collection of deployment events. Format: projects/{project}/locations/{location}/insightsConfigs/{insights_config} */
  parent: string;
  /** Optional. The maximum number of deployment events to return. The service may return fewer than this value. If unspecified, at most 50 deployment events will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDeploymentEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDeploymentEvents` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter expression that matches a subset of the DeploymentEvents. https://google.aip.dev/160. */
  filter?: string;
}

export const ListProjectsLocationsInsightsConfigsDeploymentEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightsConfigs/{insightsConfigsId}/deploymentEvents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInsightsConfigsDeploymentEventsRequest>;

export type ListProjectsLocationsInsightsConfigsDeploymentEventsResponse = ListDeploymentEventsResponse;
export const ListProjectsLocationsInsightsConfigsDeploymentEventsResponse = ListDeploymentEventsResponse;

export type ListProjectsLocationsInsightsConfigsDeploymentEventsError = CommonErrors;

export const listProjectsLocationsInsightsConfigsDeploymentEvents = API.makePaginated(() => ({
  input: ListProjectsLocationsInsightsConfigsDeploymentEventsRequest,
  output: ListProjectsLocationsInsightsConfigsDeploymentEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

