// ==========================================================================
// Cloud OS Login API (oslogin v1)
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
  name: "oslogin",
  version: "v1",
  rootUrl: "https://oslogin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ProvisionPosixAccountRequest {
  /** Optional. The regions to wait for a POSIX account to be written to before returning a response. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. */
  regions?: Array<string>;
}

export const ProvisionPosixAccountRequest: Schema.Schema<ProvisionPosixAccountRequest> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProvisionPosixAccountRequest" }) as any as Schema.Schema<ProvisionPosixAccountRequest>;

export interface SshPublicKey {
  /** Required. Public key text in SSH format, defined by [RFC4253](https://www.ietf.org/rfc/rfc4253.txt) section 6.6. */
  key?: string;
  /** An expiration time in microseconds since epoch. */
  expirationTimeUsec?: string;
  /** Output only. The SHA-256 fingerprint of the SSH public key. */
  fingerprint?: string;
  /** Output only. The canonical resource name. */
  name?: string;
}

export const SshPublicKey: Schema.Schema<SshPublicKey> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  expirationTimeUsec: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SshPublicKey" }) as any as Schema.Schema<SshPublicKey>;

export interface PosixAccount {
  /** Output only. A POSIX account identifier. */
  accountId?: string;
  /** The username of the POSIX account. */
  username?: string;
  /** The path to the home directory for this account. */
  homeDirectory?: string;
  /** The default group ID. */
  gid?: string;
  /** The user ID. */
  uid?: string;
  /** The operating system type where this account applies. */
  operatingSystemType?: "OPERATING_SYSTEM_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS" | (string & {});
  /** Output only. The canonical resource name. */
  name?: string;
  /** System identifier for which account the username or uid applies to. By default, the empty value is used. */
  systemId?: string;
  /** The GECOS (user information) entry for this account. */
  gecos?: string;
  /** The path to the logic shell for this account. */
  shell?: string;
  /** Only one POSIX account can be marked as primary. */
  primary?: boolean;
}

export const PosixAccount: Schema.Schema<PosixAccount> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  homeDirectory: Schema.optional(Schema.String),
  gid: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  operatingSystemType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemId: Schema.optional(Schema.String),
  gecos: Schema.optional(Schema.String),
  shell: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PosixAccount" }) as any as Schema.Schema<PosixAccount>;

export interface LoginProfile {
  /** The list of POSIX accounts associated with the user. */
  posixAccounts?: Array<PosixAccount>;
  /** A map from SSH public key fingerprint to the associated key object. */
  sshPublicKeys?: Record<string, SshPublicKey>;
  /** Required. A unique user ID. */
  name?: string;
}

export const LoginProfile: Schema.Schema<LoginProfile> = Schema.suspend(() => Schema.Struct({
  posixAccounts: Schema.optional(Schema.Array(PosixAccount)),
  sshPublicKeys: Schema.optional(Schema.Record(Schema.String, SshPublicKey)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LoginProfile" }) as any as Schema.Schema<LoginProfile>;

export interface ImportSshPublicKeyResponse {
  /** The login profile information for the user. */
  loginProfile?: LoginProfile;
  /** Detailed information about import results. */
  details?: string;
}

export const ImportSshPublicKeyResponse: Schema.Schema<ImportSshPublicKeyResponse> = Schema.suspend(() => Schema.Struct({
  loginProfile: Schema.optional(LoginProfile),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportSshPublicKeyResponse" }) as any as Schema.Schema<ImportSshPublicKeyResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SignSshPublicKeyResponse {
  /** The signed SSH public key to use in the SSH handshake. */
  signedSshPublicKey?: string;
}

export const SignSshPublicKeyResponse: Schema.Schema<SignSshPublicKeyResponse> = Schema.suspend(() => Schema.Struct({
  signedSshPublicKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SignSshPublicKeyResponse" }) as any as Schema.Schema<SignSshPublicKeyResponse>;

export interface SignSshPublicKeyRequest {
  /** Optional. The service account for the instance. If the instance in question does not have a service account, this field should be left empty. If the wrong service account is provided, this operation will return a signed certificate that will not be accepted by the VM. */
  serviceAccount?: string;
  /** Required. The SSH public key to sign. */
  sshPublicKey?: string;
  /** The App Engine instance to sign the SSH public key for. Expected format: apps/{app}/services/{service}/versions/{version}/instances/{instance} */
  appEngineInstance?: string;
  /** The Compute instance to sign the SSH public key for. Expected format: projects/{project}/zones/{zone}/instances/{numeric_instance_id} */
  computeInstance?: string;
}

export const SignSshPublicKeyRequest: Schema.Schema<SignSshPublicKeyRequest> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
  sshPublicKey: Schema.optional(Schema.String),
  appEngineInstance: Schema.optional(Schema.String),
  computeInstance: Schema.optional(Schema.String),
})).annotate({ identifier: "SignSshPublicKeyRequest" }) as any as Schema.Schema<SignSshPublicKeyRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Adds an SSH public key and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile. */
export interface ImportSshPublicKeyUsersRequest {
  /** Required. The unique ID for the user in format `users/{user}`. */
  parent: string;
  /** The project ID of the Google Cloud Platform project. */
  projectId?: string;
  /** Optional. The regions to which to assert that the key was written. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. */
  regions?: string[];
  /** Request body */
  body?: SshPublicKey;
}

export const ImportSshPublicKeyUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  regions: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("regions")),
  body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}:importSshPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportSshPublicKeyUsersRequest>;

export type ImportSshPublicKeyUsersResponse = ImportSshPublicKeyResponse;
export const ImportSshPublicKeyUsersResponse = ImportSshPublicKeyResponse;

export type ImportSshPublicKeyUsersError = CommonErrors;

export const importSshPublicKeyUsers: API.OperationMethod<ImportSshPublicKeyUsersRequest, ImportSshPublicKeyUsersResponse, ImportSshPublicKeyUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportSshPublicKeyUsersRequest,
  output: ImportSshPublicKeyUsersResponse,
  errors: [],
}));

/** Retrieves the profile information used for logging in to a virtual machine on Google Compute Engine. */
export interface GetLoginProfileUsersRequest {
  /** Required. The project ID of the Google Cloud Platform project. */
  projectId?: string;
  /** Optional. A system ID for filtering the results of the request. */
  systemId?: string;
  /** Required. The unique ID for the user in format `users/{user}`. */
  name: string;
}

export const GetLoginProfileUsersRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  systemId: Schema.optional(Schema.String).pipe(T.HttpQuery("systemId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/users/{usersId}/loginProfile" }),
  svc,
) as unknown as Schema.Schema<GetLoginProfileUsersRequest>;

export type GetLoginProfileUsersResponse = LoginProfile;
export const GetLoginProfileUsersResponse = LoginProfile;

export type GetLoginProfileUsersError = CommonErrors;

export const getLoginProfileUsers: API.OperationMethod<GetLoginProfileUsersRequest, GetLoginProfileUsersResponse, GetLoginProfileUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLoginProfileUsersRequest,
  output: GetLoginProfileUsersResponse,
  errors: [],
}));

/** Deletes a POSIX account. */
export interface DeleteUsersProjectsRequest {
  /** Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`. */
  name: string;
}

export const DeleteUsersProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/users/{usersId}/projects/{projectsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersProjectsRequest>;

export type DeleteUsersProjectsResponse = Empty;
export const DeleteUsersProjectsResponse = Empty;

export type DeleteUsersProjectsError = CommonErrors;

export const deleteUsersProjects: API.OperationMethod<DeleteUsersProjectsRequest, DeleteUsersProjectsResponse, DeleteUsersProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersProjectsRequest,
  output: DeleteUsersProjectsResponse,
  errors: [],
}));

/** Adds a POSIX account and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile. */
export interface ProvisionPosixAccountUsersProjectsRequest {
  /** Required. The unique ID for the user in format `users/{user}/projects/{project}`. */
  name: string;
  /** Request body */
  body?: ProvisionPosixAccountRequest;
}

export const ProvisionPosixAccountUsersProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProvisionPosixAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}/projects/{projectsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionPosixAccountUsersProjectsRequest>;

export type ProvisionPosixAccountUsersProjectsResponse = PosixAccount;
export const ProvisionPosixAccountUsersProjectsResponse = PosixAccount;

export type ProvisionPosixAccountUsersProjectsError = CommonErrors;

export const provisionPosixAccountUsersProjects: API.OperationMethod<ProvisionPosixAccountUsersProjectsRequest, ProvisionPosixAccountUsersProjectsResponse, ProvisionPosixAccountUsersProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionPosixAccountUsersProjectsRequest,
  output: ProvisionPosixAccountUsersProjectsResponse,
  errors: [],
}));

/** Create an SSH public key */
export interface CreateUsersSshPublicKeysRequest {
  /** Required. The unique ID for the user in format `users/{user}`. */
  parent: string;
  /** Request body */
  body?: SshPublicKey;
}

export const CreateUsersSshPublicKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/users/{usersId}/sshPublicKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUsersSshPublicKeysRequest>;

export type CreateUsersSshPublicKeysResponse = SshPublicKey;
export const CreateUsersSshPublicKeysResponse = SshPublicKey;

export type CreateUsersSshPublicKeysError = CommonErrors;

export const createUsersSshPublicKeys: API.OperationMethod<CreateUsersSshPublicKeysRequest, CreateUsersSshPublicKeysResponse, CreateUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateUsersSshPublicKeysRequest,
  output: CreateUsersSshPublicKeysResponse,
  errors: [],
}));

/** Updates an SSH public key and returns the profile information. This method supports patch semantics. */
export interface PatchUsersSshPublicKeysRequest {
  /** Optional. Mask to control which fields get updated. Updates all if not present. */
  updateMask?: string;
  /** Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
  /** Request body */
  body?: SshPublicKey;
}

export const PatchUsersSshPublicKeysRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/users/{usersId}/sshPublicKeys/{sshPublicKeysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersSshPublicKeysRequest>;

export type PatchUsersSshPublicKeysResponse = SshPublicKey;
export const PatchUsersSshPublicKeysResponse = SshPublicKey;

export type PatchUsersSshPublicKeysError = CommonErrors;

export const patchUsersSshPublicKeys: API.OperationMethod<PatchUsersSshPublicKeysRequest, PatchUsersSshPublicKeysResponse, PatchUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersSshPublicKeysRequest,
  output: PatchUsersSshPublicKeysResponse,
  errors: [],
}));

/** Deletes an SSH public key. */
export interface DeleteUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
}

export const DeleteUsersSshPublicKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/users/{usersId}/sshPublicKeys/{sshPublicKeysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersSshPublicKeysRequest>;

export type DeleteUsersSshPublicKeysResponse = Empty;
export const DeleteUsersSshPublicKeysResponse = Empty;

export type DeleteUsersSshPublicKeysError = CommonErrors;

export const deleteUsersSshPublicKeys: API.OperationMethod<DeleteUsersSshPublicKeysRequest, DeleteUsersSshPublicKeysResponse, DeleteUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersSshPublicKeysRequest,
  output: DeleteUsersSshPublicKeysResponse,
  errors: [],
}));

/** Retrieves an SSH public key. */
export interface GetUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
}

export const GetUsersSshPublicKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/users/{usersId}/sshPublicKeys/{sshPublicKeysId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersSshPublicKeysRequest>;

export type GetUsersSshPublicKeysResponse = SshPublicKey;
export const GetUsersSshPublicKeysResponse = SshPublicKey;

export type GetUsersSshPublicKeysError = CommonErrors;

export const getUsersSshPublicKeys: API.OperationMethod<GetUsersSshPublicKeysRequest, GetUsersSshPublicKeysResponse, GetUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersSshPublicKeysRequest,
  output: GetUsersSshPublicKeysResponse,
  errors: [],
}));

/** Signs an SSH public key for a user to authenticate to a virtual machine on Google Compute Engine. */
export interface SignSshPublicKeyProjectsLocationsRequest {
  /** Required. The parent for the signing request. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: SignSshPublicKeyRequest;
}

export const SignSshPublicKeyProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SignSshPublicKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:signSshPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignSshPublicKeyProjectsLocationsRequest>;

export type SignSshPublicKeyProjectsLocationsResponse = SignSshPublicKeyResponse;
export const SignSshPublicKeyProjectsLocationsResponse = SignSshPublicKeyResponse;

export type SignSshPublicKeyProjectsLocationsError = CommonErrors;

export const signSshPublicKeyProjectsLocations: API.OperationMethod<SignSshPublicKeyProjectsLocationsRequest, SignSshPublicKeyProjectsLocationsResponse, SignSshPublicKeyProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignSshPublicKeyProjectsLocationsRequest,
  output: SignSshPublicKeyProjectsLocationsResponse,
  errors: [],
}));

