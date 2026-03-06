// ==========================================================================
// Cloud OS Login API (oslogin v1alpha)
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
  version: "v1alpha",
  rootUrl: "https://oslogin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface UniversalTwoFactor {
  /** Application ID for the U2F protocol. */
  appId?: string;
}

export const UniversalTwoFactor: Schema.Schema<UniversalTwoFactor> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
})).annotate({ identifier: "UniversalTwoFactor" }) as any as Schema.Schema<UniversalTwoFactor>;

export interface WebAuthn {
  /** Relying party ID for Web Authentication. */
  rpId?: string;
}

export const WebAuthn: Schema.Schema<WebAuthn> = Schema.suspend(() => Schema.Struct({
  rpId: Schema.optional(Schema.String),
})).annotate({ identifier: "WebAuthn" }) as any as Schema.Schema<WebAuthn>;

export interface SecurityKey {
  /** The Web Authentication protocol type. */
  webAuthn?: WebAuthn;
  /** The security key nickname explicitly set by the user. */
  deviceNickname?: string;
  /** Public key text in SSH format, defined by [RFC4253]("https://www.ietf.org/rfc/rfc4253.txt") section 6.6. */
  publicKey?: string;
  /** The U2F protocol type. */
  universalTwoFactor?: UniversalTwoFactor;
  /** Hardware-backed private key text in SSH format. */
  privateKey?: string;
}

export const SecurityKey: Schema.Schema<SecurityKey> = Schema.suspend(() => Schema.Struct({
  webAuthn: Schema.optional(WebAuthn),
  deviceNickname: Schema.optional(Schema.String),
  publicKey: Schema.optional(Schema.String),
  universalTwoFactor: Schema.optional(UniversalTwoFactor),
  privateKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SecurityKey" }) as any as Schema.Schema<SecurityKey>;

export interface PosixAccount {
  /** The GECOS (user information) entry for this account. */
  gecos?: string;
  /** Only one POSIX account can be marked as primary. */
  primary?: boolean;
  /** The user ID. */
  uid?: string;
  /** The operating system type where this account applies. */
  operatingSystemType?: "OPERATING_SYSTEM_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS" | (string & {});
  /** The path to the home directory for this account. */
  homeDirectory?: string;
  /** Output only. The canonical resource name. */
  name?: string;
  /** System identifier for which account the username or uid applies to. By default, the empty value is used. */
  systemId?: string;
  /** The username of the POSIX account. */
  username?: string;
  /** Output only. A POSIX account identifier. */
  accountId?: string;
  /** The default group ID. */
  gid?: string;
  /** The path to the logic shell for this account. */
  shell?: string;
}

export const PosixAccount: Schema.Schema<PosixAccount> = Schema.suspend(() => Schema.Struct({
  gecos: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  uid: Schema.optional(Schema.String),
  operatingSystemType: Schema.optional(Schema.String),
  homeDirectory: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemId: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  gid: Schema.optional(Schema.String),
  shell: Schema.optional(Schema.String),
})).annotate({ identifier: "PosixAccount" }) as any as Schema.Schema<PosixAccount>;

export interface SshPublicKey {
  /** An expiration time in microseconds since epoch. */
  expirationTimeUsec?: string;
  /** Required. Public key text in SSH format, defined by [RFC4253](https://www.ietf.org/rfc/rfc4253.txt) section 6.6. */
  key?: string;
  /** Output only. The SHA-256 fingerprint of the SSH public key. */
  fingerprint?: string;
  /** Output only. The canonical resource name. */
  name?: string;
}

export const SshPublicKey: Schema.Schema<SshPublicKey> = Schema.suspend(() => Schema.Struct({
  expirationTimeUsec: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SshPublicKey" }) as any as Schema.Schema<SshPublicKey>;

export interface LoginProfile {
  /** The registered security key credentials for a user. */
  securityKeys?: Array<SecurityKey>;
  /** The list of POSIX accounts associated with the user. */
  posixAccounts?: Array<PosixAccount>;
  /** A map from SSH public key fingerprint to the associated key object. */
  sshPublicKeys?: Record<string, SshPublicKey>;
  /** Required. A unique user ID. */
  name?: string;
}

export const LoginProfile: Schema.Schema<LoginProfile> = Schema.suspend(() => Schema.Struct({
  securityKeys: Schema.optional(Schema.Array(SecurityKey)),
  posixAccounts: Schema.optional(Schema.Array(PosixAccount)),
  sshPublicKeys: Schema.optional(Schema.Record(Schema.String, SshPublicKey)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LoginProfile" }) as any as Schema.Schema<LoginProfile>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse {
  /** The signed SSH public key to use in the SSH handshake. */
  signedSshPublicKey?: string;
}

export const GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse: Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse> = Schema.suspend(() => Schema.Struct({
  signedSshPublicKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse" }) as any as Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse>;

export interface SignSshPublicKeyRequest {
  /** Required. The SSH public key to sign. */
  sshPublicKey?: string;
}

export const SignSshPublicKeyRequest: Schema.Schema<SignSshPublicKeyRequest> = Schema.suspend(() => Schema.Struct({
  sshPublicKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SignSshPublicKeyRequest" }) as any as Schema.Schema<SignSshPublicKeyRequest>;

export interface ProvisionPosixAccountRequest {
  /** Optional. The regions to wait for a POSIX account to be written to before returning a response. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. */
  regions?: Array<string>;
}

export const ProvisionPosixAccountRequest: Schema.Schema<ProvisionPosixAccountRequest> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProvisionPosixAccountRequest" }) as any as Schema.Schema<ProvisionPosixAccountRequest>;

export interface SignSshPublicKeyResponse {
  /** The signed SSH public key to use in the SSH handshake. */
  signedSshPublicKey?: string;
}

export const SignSshPublicKeyResponse: Schema.Schema<SignSshPublicKeyResponse> = Schema.suspend(() => Schema.Struct({
  signedSshPublicKey: Schema.optional(Schema.String),
})).annotate({ identifier: "SignSshPublicKeyResponse" }) as any as Schema.Schema<SignSshPublicKeyResponse>;

export interface GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest {
  /** The App Engine instance to sign the SSH public key for. Expected format: apps/{app}/services/{service}/versions/{version}/instances/{instance} */
  appEngineInstance?: string;
  /** Required. The SSH public key to sign. */
  sshPublicKey?: string;
  /** Optional. The service account for the instance. If the instance in question does not have a service account, this field should be left empty. If the wrong service account is provided, this operation will return a signed certificate that will not be accepted by the VM. */
  serviceAccount?: string;
  /** The Compute instance to sign the SSH public key for. Expected format: projects/{project}/zones/{zone}/instances/{numeric_instance_id} */
  computeInstance?: string;
}

export const GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest: Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest> = Schema.suspend(() => Schema.Struct({
  appEngineInstance: Schema.optional(Schema.String),
  sshPublicKey: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  computeInstance: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest" }) as any as Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest>;

export interface ImportSshPublicKeyResponse {
  /** Detailed information about import results. */
  details?: string;
  /** The login profile information for the user. */
  loginProfile?: LoginProfile;
}

export const ImportSshPublicKeyResponse: Schema.Schema<ImportSshPublicKeyResponse> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.String),
  loginProfile: Schema.optional(LoginProfile),
})).annotate({ identifier: "ImportSshPublicKeyResponse" }) as any as Schema.Schema<ImportSshPublicKeyResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SignSshPublicKeyProjectsLocationsRequest {
  /** Required. The parent for the signing request. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest;
}

export const SignSshPublicKeyProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/projects/{projectsId}/locations/{locationsId}:signSshPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignSshPublicKeyProjectsLocationsRequest>;

export type SignSshPublicKeyProjectsLocationsResponse = GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse;
export const SignSshPublicKeyProjectsLocationsResponse = GoogleCloudOsloginControlplaneRegionalV1alphaSignSshPublicKeyResponse;

export type SignSshPublicKeyProjectsLocationsError = CommonErrors;

/** Signs an SSH public key for a user to authenticate to a virtual machine on Google Compute Engine. */
export const signSshPublicKeyProjectsLocations: API.OperationMethod<SignSshPublicKeyProjectsLocationsRequest, SignSshPublicKeyProjectsLocationsResponse, SignSshPublicKeyProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignSshPublicKeyProjectsLocationsRequest,
  output: SignSshPublicKeyProjectsLocationsResponse,
  errors: [],
}));

export interface GetLoginProfileUsersRequest {
  /** Required. The project ID of the Google Cloud Platform project. */
  projectId?: string;
  /** Optional. A system ID for filtering the results of the request. */
  systemId?: string;
  /** Optional. The type of operating system associated with the account. */
  operatingSystemType?: "OPERATING_SYSTEM_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS" | (string & {});
  /** The view configures whether to retrieve security keys information. */
  view?: "LOGIN_PROFILE_VIEW_UNSPECIFIED" | "BASIC" | "SECURITY_KEY" | (string & {});
  /** Required. The unique ID for the user in format `users/{user}`. */
  name: string;
}

export const GetLoginProfileUsersRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  systemId: Schema.optional(Schema.String).pipe(T.HttpQuery("systemId")),
  operatingSystemType: Schema.optional(Schema.String).pipe(T.HttpQuery("operatingSystemType")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/users/{usersId}/loginProfile" }),
  svc,
) as unknown as Schema.Schema<GetLoginProfileUsersRequest>;

export type GetLoginProfileUsersResponse = LoginProfile;
export const GetLoginProfileUsersResponse = LoginProfile;

export type GetLoginProfileUsersError = CommonErrors;

/** Retrieves the profile information used for logging in to a virtual machine on Google Compute Engine. */
export const getLoginProfileUsers: API.OperationMethod<GetLoginProfileUsersRequest, GetLoginProfileUsersResponse, GetLoginProfileUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLoginProfileUsersRequest,
  output: GetLoginProfileUsersResponse,
  errors: [],
}));

export interface ImportSshPublicKeyUsersRequest {
  /** The view configures whether to retrieve security keys information. */
  view?: "LOGIN_PROFILE_VIEW_UNSPECIFIED" | "BASIC" | "SECURITY_KEY" | (string & {});
  /** The project ID of the Google Cloud Platform project. */
  projectId?: string;
  /** Optional. The regions to wait for a POSIX account to be written to before returning a response. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. */
  regions?: string[];
  /** The unique ID for the user in format `users/{user}`. */
  parent: string;
  /** Request body */
  body?: SshPublicKey;
}

export const ImportSshPublicKeyUsersRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  regions: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("regions")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/users/{usersId}:importSshPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportSshPublicKeyUsersRequest>;

export type ImportSshPublicKeyUsersResponse = ImportSshPublicKeyResponse;
export const ImportSshPublicKeyUsersResponse = ImportSshPublicKeyResponse;

export type ImportSshPublicKeyUsersError = CommonErrors;

/** Adds an SSH public key and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile. */
export const importSshPublicKeyUsers: API.OperationMethod<ImportSshPublicKeyUsersRequest, ImportSshPublicKeyUsersResponse, ImportSshPublicKeyUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportSshPublicKeyUsersRequest,
  output: ImportSshPublicKeyUsersResponse,
  errors: [],
}));

export interface GetUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
}

export const GetUsersSshPublicKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/users/{usersId}/sshPublicKeys/{sshPublicKeysId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersSshPublicKeysRequest>;

export type GetUsersSshPublicKeysResponse = SshPublicKey;
export const GetUsersSshPublicKeysResponse = SshPublicKey;

export type GetUsersSshPublicKeysError = CommonErrors;

/** Retrieves an SSH public key. */
export const getUsersSshPublicKeys: API.OperationMethod<GetUsersSshPublicKeysRequest, GetUsersSshPublicKeysResponse, GetUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersSshPublicKeysRequest,
  output: GetUsersSshPublicKeysResponse,
  errors: [],
}));

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
  T.Http({ method: "PATCH", path: "v1alpha/users/{usersId}/sshPublicKeys/{sshPublicKeysId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersSshPublicKeysRequest>;

export type PatchUsersSshPublicKeysResponse = SshPublicKey;
export const PatchUsersSshPublicKeysResponse = SshPublicKey;

export type PatchUsersSshPublicKeysError = CommonErrors;

/** Updates an SSH public key and returns the profile information. This method supports patch semantics. */
export const patchUsersSshPublicKeys: API.OperationMethod<PatchUsersSshPublicKeysRequest, PatchUsersSshPublicKeysResponse, PatchUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersSshPublicKeysRequest,
  output: PatchUsersSshPublicKeysResponse,
  errors: [],
}));

export interface DeleteUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
}

export const DeleteUsersSshPublicKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/users/{usersId}/sshPublicKeys/{sshPublicKeysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersSshPublicKeysRequest>;

export type DeleteUsersSshPublicKeysResponse = Empty;
export const DeleteUsersSshPublicKeysResponse = Empty;

export type DeleteUsersSshPublicKeysError = CommonErrors;

/** Deletes an SSH public key. */
export const deleteUsersSshPublicKeys: API.OperationMethod<DeleteUsersSshPublicKeysRequest, DeleteUsersSshPublicKeysResponse, DeleteUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersSshPublicKeysRequest,
  output: DeleteUsersSshPublicKeysResponse,
  errors: [],
}));

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
  T.Http({ method: "POST", path: "v1alpha/users/{usersId}/sshPublicKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUsersSshPublicKeysRequest>;

export type CreateUsersSshPublicKeysResponse = SshPublicKey;
export const CreateUsersSshPublicKeysResponse = SshPublicKey;

export type CreateUsersSshPublicKeysError = CommonErrors;

/** Create an SSH public key */
export const createUsersSshPublicKeys: API.OperationMethod<CreateUsersSshPublicKeysRequest, CreateUsersSshPublicKeysResponse, CreateUsersSshPublicKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateUsersSshPublicKeysRequest,
  output: CreateUsersSshPublicKeysResponse,
  errors: [],
}));

export interface DeleteUsersProjectsRequest {
  /** Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`. */
  name: string;
  /** Optional. The type of operating system associated with the account. */
  operatingSystemType?: "OPERATING_SYSTEM_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS" | (string & {});
}

export const DeleteUsersProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  operatingSystemType: Schema.optional(Schema.String).pipe(T.HttpQuery("operatingSystemType")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/users/{usersId}/projects/{projectsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersProjectsRequest>;

export type DeleteUsersProjectsResponse = Empty;
export const DeleteUsersProjectsResponse = Empty;

export type DeleteUsersProjectsError = CommonErrors;

/** Deletes a POSIX account. */
export const deleteUsersProjects: API.OperationMethod<DeleteUsersProjectsRequest, DeleteUsersProjectsResponse, DeleteUsersProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersProjectsRequest,
  output: DeleteUsersProjectsResponse,
  errors: [],
}));

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
  T.Http({ method: "POST", path: "v1alpha/users/{usersId}/projects/{projectsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionPosixAccountUsersProjectsRequest>;

export type ProvisionPosixAccountUsersProjectsResponse = PosixAccount;
export const ProvisionPosixAccountUsersProjectsResponse = PosixAccount;

export type ProvisionPosixAccountUsersProjectsError = CommonErrors;

/** Create a POSIX account if it doesn't exist. */
export const provisionPosixAccountUsersProjects: API.OperationMethod<ProvisionPosixAccountUsersProjectsRequest, ProvisionPosixAccountUsersProjectsResponse, ProvisionPosixAccountUsersProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionPosixAccountUsersProjectsRequest,
  output: ProvisionPosixAccountUsersProjectsResponse,
  errors: [],
}));

export interface SignSshPublicKeyUsersProjectsZonesRequest {
  /** Required. The parent project and region for the signing request. */
  parent: string;
  /** Request body */
  body?: SignSshPublicKeyRequest;
}

export const SignSshPublicKeyUsersProjectsZonesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SignSshPublicKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/users/{usersId}/projects/{projectsId}/zones/{zonesId}:signSshPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignSshPublicKeyUsersProjectsZonesRequest>;

export type SignSshPublicKeyUsersProjectsZonesResponse = SignSshPublicKeyResponse;
export const SignSshPublicKeyUsersProjectsZonesResponse = SignSshPublicKeyResponse;

export type SignSshPublicKeyUsersProjectsZonesError = CommonErrors;

/** Signs an SSH public key for a user to authenticate to a virtual machine on Google Compute Engine. */
export const signSshPublicKeyUsersProjectsZones: API.OperationMethod<SignSshPublicKeyUsersProjectsZonesRequest, SignSshPublicKeyUsersProjectsZonesResponse, SignSshPublicKeyUsersProjectsZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignSshPublicKeyUsersProjectsZonesRequest,
  output: SignSshPublicKeyUsersProjectsZonesResponse,
  errors: [],
}));

export interface SignSshPublicKeyUsersProjectsLocationsRequest {
  /** Required. The parent project and region for the signing request. */
  parent: string;
  /** Request body */
  body?: SignSshPublicKeyRequest;
}

export const SignSshPublicKeyUsersProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SignSshPublicKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/users/{usersId}/projects/{projectsId}/locations/{locationsId}:signSshPublicKey", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignSshPublicKeyUsersProjectsLocationsRequest>;

export type SignSshPublicKeyUsersProjectsLocationsResponse = SignSshPublicKeyResponse;
export const SignSshPublicKeyUsersProjectsLocationsResponse = SignSshPublicKeyResponse;

export type SignSshPublicKeyUsersProjectsLocationsError = CommonErrors;

/** Signs an SSH public key for a user to authenticate to a virtual machine on Google Compute Engine. */
export const signSshPublicKeyUsersProjectsLocations: API.OperationMethod<SignSshPublicKeyUsersProjectsLocationsRequest, SignSshPublicKeyUsersProjectsLocationsResponse, SignSshPublicKeyUsersProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignSshPublicKeyUsersProjectsLocationsRequest,
  output: SignSshPublicKeyUsersProjectsLocationsResponse,
  errors: [],
}));

