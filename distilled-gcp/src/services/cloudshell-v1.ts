// ==========================================================================
// Cloud Shell API (cloudshell v1)
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
  name: "cloudshell",
  version: "v1",
  rootUrl: "https://cloudshell.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Environment {
  /** Output only. Host to which clients can connect to initiate HTTPS or WSS connections with the environment. */
  webHost?: string;
  /** Output only. Username that clients should use when initiating SSH sessions with the environment. */
  sshUsername?: string;
  /** Output only. Port to which clients can connect to initiate SSH sessions with the environment. */
  sshPort?: number;
  /** Output only. Host to which clients can connect to initiate SSH sessions with the environment. */
  sshHost?: string;
  /** Output only. The environment's identifier, unique among the user's environments. */
  id?: string;
  /** Output only. Current execution state of this environment. */
  state?: "STATE_UNSPECIFIED" | "SUSPENDED" | "PENDING" | "RUNNING" | "DELETING" | (string & {});
  /** Output only. Public keys associated with the environment. Clients can connect to this environment via SSH only if they possess a private key corresponding to at least one of these public keys. Keys can be added to or removed from the environment using the AddPublicKey and RemovePublicKey methods. */
  publicKeys?: Array<string>;
  /** Required. Immutable. Full path to the Docker image used to run this environment, e.g. "gcr.io/dev-con/cloud-devshell:latest". */
  dockerImage?: string;
  /** Immutable. Full name of this resource, in the format `users/{owner_email}/environments/{environment_id}`. `{owner_email}` is the email address of the user to whom this environment belongs, and `{environment_id}` is the identifier of this environment. For example, `users/someone@example.com/environments/default`. */
  name?: string;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  webHost: Schema.optional(Schema.String),
  sshUsername: Schema.optional(Schema.String),
  sshPort: Schema.optional(Schema.Number),
  sshHost: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  publicKeys: Schema.optional(Schema.Array(Schema.String)),
  dockerImage: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface StartEnvironmentResponse {
  /** Environment that was started. */
  environment?: Environment;
}

export const StartEnvironmentResponse: Schema.Schema<StartEnvironmentResponse> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Environment),
})).annotate({ identifier: "StartEnvironmentResponse" }) as any as Schema.Schema<StartEnvironmentResponse>;

export interface AddPublicKeyResponse {
  /** Key that was added to the environment. */
  key?: string;
}

export const AddPublicKeyResponse: Schema.Schema<AddPublicKeyResponse> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "AddPublicKeyResponse" }) as any as Schema.Schema<AddPublicKeyResponse>;

export interface CreateEnvironmentMetadata {
}

export const CreateEnvironmentMetadata: Schema.Schema<CreateEnvironmentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateEnvironmentMetadata" }) as any as Schema.Schema<CreateEnvironmentMetadata>;

export interface AuthorizeEnvironmentRequest {
  /** The OAuth ID token that should be sent to the environment. */
  idToken?: string;
  /** The OAuth access token that should be sent to the environment. */
  accessToken?: string;
  /** The time when the credentials expire. If not set, defaults to one hour from when the server received the request. */
  expireTime?: string;
}

export const AuthorizeEnvironmentRequest: Schema.Schema<AuthorizeEnvironmentRequest> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  accessToken: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizeEnvironmentRequest" }) as any as Schema.Schema<AuthorizeEnvironmentRequest>;

export interface RemovePublicKeyRequest {
  /** Key that should be removed from the environment. */
  key?: string;
}

export const RemovePublicKeyRequest: Schema.Schema<RemovePublicKeyRequest> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "RemovePublicKeyRequest" }) as any as Schema.Schema<RemovePublicKeyRequest>;

export interface DeleteEnvironmentMetadata {
}

export const DeleteEnvironmentMetadata: Schema.Schema<DeleteEnvironmentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteEnvironmentMetadata" }) as any as Schema.Schema<DeleteEnvironmentMetadata>;

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

export interface AddPublicKeyRequest {
  /** Key that should be added to the environment. Supported formats are `ssh-dss` (see RFC4253), `ssh-rsa` (see RFC4253), `ecdsa-sha2-nistp256` (see RFC5656), `ecdsa-sha2-nistp384` (see RFC5656) and `ecdsa-sha2-nistp521` (see RFC5656). It should be structured as <format> <content>, where <content> part is encoded with Base64. */
  key?: string;
}

export const AddPublicKeyRequest: Schema.Schema<AddPublicKeyRequest> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "AddPublicKeyRequest" }) as any as Schema.Schema<AddPublicKeyRequest>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface AuthorizeEnvironmentMetadata {
}

export const AuthorizeEnvironmentMetadata: Schema.Schema<AuthorizeEnvironmentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AuthorizeEnvironmentMetadata" }) as any as Schema.Schema<AuthorizeEnvironmentMetadata>;

export interface StartEnvironmentMetadata {
  /** Current state of the environment being started. */
  state?: "STATE_UNSPECIFIED" | "STARTING" | "UNARCHIVING_DISK" | "AWAITING_COMPUTE_RESOURCES" | "FINISHED" | (string & {});
}

export const StartEnvironmentMetadata: Schema.Schema<StartEnvironmentMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "StartEnvironmentMetadata" }) as any as Schema.Schema<StartEnvironmentMetadata>;

export interface StartEnvironmentRequest {
  /** Public keys that should be added to the environment before it is started. */
  publicKeys?: Array<string>;
  /** The initial access token passed to the environment. If this is present and valid, the environment will be pre-authenticated with gcloud so that the user can run gcloud commands in Cloud Shell without having to log in. This code can be updated later by calling AuthorizeEnvironment. */
  accessToken?: string;
}

export const StartEnvironmentRequest: Schema.Schema<StartEnvironmentRequest> = Schema.suspend(() => Schema.Struct({
  publicKeys: Schema.optional(Schema.Array(Schema.String)),
  accessToken: Schema.optional(Schema.String),
})).annotate({ identifier: "StartEnvironmentRequest" }) as any as Schema.Schema<StartEnvironmentRequest>;

export interface AuthorizeEnvironmentResponse {
}

export const AuthorizeEnvironmentResponse: Schema.Schema<AuthorizeEnvironmentResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AuthorizeEnvironmentResponse" }) as any as Schema.Schema<AuthorizeEnvironmentResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AddPublicKeyMetadata {
}

export const AddPublicKeyMetadata: Schema.Schema<AddPublicKeyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddPublicKeyMetadata" }) as any as Schema.Schema<AddPublicKeyMetadata>;

export interface GenerateAccessTokenResponse {
  /** The access token. */
  accessToken?: string;
}

export const GenerateAccessTokenResponse: Schema.Schema<GenerateAccessTokenResponse> = Schema.suspend(() => Schema.Struct({
  accessToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateAccessTokenResponse" }) as any as Schema.Schema<GenerateAccessTokenResponse>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(Operation)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface RemovePublicKeyMetadata {
}

export const RemovePublicKeyMetadata: Schema.Schema<RemovePublicKeyMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemovePublicKeyMetadata" }) as any as Schema.Schema<RemovePublicKeyMetadata>;

export interface RemovePublicKeyResponse {
}

export const RemovePublicKeyResponse: Schema.Schema<RemovePublicKeyResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RemovePublicKeyResponse" }) as any as Schema.Schema<RemovePublicKeyResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op = ListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = Empty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = Empty;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

/** Sends OAuth credentials to a running environment on behalf of a user. When this completes, the environment will be authorized to run various Google Cloud command line tools without requiring the user to manually authenticate. */
export interface AuthorizeUsersEnvironmentsRequest {
  /** Name of the resource that should receive the credentials, for example `users/me/environments/default` or `users/someone@example.com/environments/default`. */
  name: string;
  /** Request body */
  body?: AuthorizeEnvironmentRequest;
}

export const AuthorizeUsersEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AuthorizeEnvironmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}/environments/{environmentsId}:authorize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AuthorizeUsersEnvironmentsRequest>;

export type AuthorizeUsersEnvironmentsResponse = Operation;
export const AuthorizeUsersEnvironmentsResponse = Operation;

export type AuthorizeUsersEnvironmentsError = CommonErrors;

export const authorizeUsersEnvironments: API.OperationMethod<AuthorizeUsersEnvironmentsRequest, AuthorizeUsersEnvironmentsResponse, AuthorizeUsersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AuthorizeUsersEnvironmentsRequest,
  output: AuthorizeUsersEnvironmentsResponse,
  errors: [],
}));

/** Removes a public SSH key from an environment. Clients will no longer be able to connect to the environment using the corresponding private key. If a key with the same content is not present, this will error with NOT_FOUND. */
export interface RemovePublicKeyUsersEnvironmentsRequest {
  /** Environment this key should be removed from, e.g. `users/me/environments/default`. */
  environment: string;
  /** Request body */
  body?: RemovePublicKeyRequest;
}

export const RemovePublicKeyUsersEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(RemovePublicKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}/environments/{environmentsId}:removePublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemovePublicKeyUsersEnvironmentsRequest>;

export type RemovePublicKeyUsersEnvironmentsResponse = Operation;
export const RemovePublicKeyUsersEnvironmentsResponse = Operation;

export type RemovePublicKeyUsersEnvironmentsError = CommonErrors;

export const removePublicKeyUsersEnvironments: API.OperationMethod<RemovePublicKeyUsersEnvironmentsRequest, RemovePublicKeyUsersEnvironmentsResponse, RemovePublicKeyUsersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemovePublicKeyUsersEnvironmentsRequest,
  output: RemovePublicKeyUsersEnvironmentsResponse,
  errors: [],
}));

/** Adds a public SSH key to an environment, allowing clients with the corresponding private key to connect to that environment via SSH. If a key with the same content already exists, this will error with ALREADY_EXISTS. */
export interface AddPublicKeyUsersEnvironmentsRequest {
  /** Environment this key should be added to, e.g. `users/me/environments/default`. */
  environment: string;
  /** Request body */
  body?: AddPublicKeyRequest;
}

export const AddPublicKeyUsersEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(AddPublicKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}/environments/{environmentsId}:addPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddPublicKeyUsersEnvironmentsRequest>;

export type AddPublicKeyUsersEnvironmentsResponse = Operation;
export const AddPublicKeyUsersEnvironmentsResponse = Operation;

export type AddPublicKeyUsersEnvironmentsError = CommonErrors;

export const addPublicKeyUsersEnvironments: API.OperationMethod<AddPublicKeyUsersEnvironmentsRequest, AddPublicKeyUsersEnvironmentsResponse, AddPublicKeyUsersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddPublicKeyUsersEnvironmentsRequest,
  output: AddPublicKeyUsersEnvironmentsResponse,
  errors: [],
}));

/** Generates an access token for the user's environment. */
export interface GenerateAccessTokenUsersEnvironmentsRequest {
  /** Desired lifetime duration of the access token. This value must be at most 24 hours. If a value is not specified, the token's lifetime will be set to a default value of 1 hour. */
  ttl?: string;
  /** Required. The environment to generate the access token for. */
  environment: string;
  /** Desired expiration time of the access token. This value must be at most 24 hours in the future. If a value is not specified, the token's expiration time will be set to a default value of 1 hour in the future. */
  expireTime?: string;
}

export const GenerateAccessTokenUsersEnvironmentsRequest = Schema.Struct({
  ttl: Schema.optional(Schema.String).pipe(T.HttpQuery("ttl")),
  environment: Schema.String.pipe(T.HttpPath("environment")),
  expireTime: Schema.optional(Schema.String).pipe(T.HttpQuery("expireTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1/users/{usersId}/environments/{environmentsId}:generateAccessToken" }),
  svc,
) as unknown as Schema.Schema<GenerateAccessTokenUsersEnvironmentsRequest>;

export type GenerateAccessTokenUsersEnvironmentsResponse = GenerateAccessTokenResponse;
export const GenerateAccessTokenUsersEnvironmentsResponse = GenerateAccessTokenResponse;

export type GenerateAccessTokenUsersEnvironmentsError = CommonErrors;

export const generateAccessTokenUsersEnvironments: API.OperationMethod<GenerateAccessTokenUsersEnvironmentsRequest, GenerateAccessTokenUsersEnvironmentsResponse, GenerateAccessTokenUsersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAccessTokenUsersEnvironmentsRequest,
  output: GenerateAccessTokenUsersEnvironmentsResponse,
  errors: [],
}));

/** Gets an environment. Returns NOT_FOUND if the environment does not exist. */
export interface GetUsersEnvironmentsRequest {
  /** Required. Name of the requested resource, for example `users/me/environments/default` or `users/someone@example.com/environments/default`. */
  name: string;
}

export const GetUsersEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/users/{usersId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersEnvironmentsRequest>;

export type GetUsersEnvironmentsResponse = Environment;
export const GetUsersEnvironmentsResponse = Environment;

export type GetUsersEnvironmentsError = CommonErrors;

export const getUsersEnvironments: API.OperationMethod<GetUsersEnvironmentsRequest, GetUsersEnvironmentsResponse, GetUsersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersEnvironmentsRequest,
  output: GetUsersEnvironmentsResponse,
  errors: [],
}));

/** Starts an existing environment, allowing clients to connect to it. The returned operation will contain an instance of StartEnvironmentMetadata in its metadata field. Users can wait for the environment to start by polling this operation via GetOperation. Once the environment has finished starting and is ready to accept connections, the operation will contain a StartEnvironmentResponse in its response field. */
export interface StartUsersEnvironmentsRequest {
  /** Name of the resource that should be started, for example `users/me/environments/default` or `users/someone@example.com/environments/default`. */
  name: string;
  /** Request body */
  body?: StartEnvironmentRequest;
}

export const StartUsersEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartEnvironmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}/environments/{environmentsId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartUsersEnvironmentsRequest>;

export type StartUsersEnvironmentsResponse = Operation;
export const StartUsersEnvironmentsResponse = Operation;

export type StartUsersEnvironmentsError = CommonErrors;

export const startUsersEnvironments: API.OperationMethod<StartUsersEnvironmentsRequest, StartUsersEnvironmentsResponse, StartUsersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartUsersEnvironmentsRequest,
  output: StartUsersEnvironmentsResponse,
  errors: [],
}));

