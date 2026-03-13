// ==========================================================================
// Cloud OS Login API (oslogin v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "oslogin",
  version: "v1beta",
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

export const ProvisionPosixAccountRequest: Schema.Schema<ProvisionPosixAccountRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ProvisionPosixAccountRequest",
  }) as any as Schema.Schema<ProvisionPosixAccountRequest>;

export interface WebAuthn {
  /** Relying party ID for Web Authentication. */
  rpId?: string;
}

export const WebAuthn: Schema.Schema<WebAuthn> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rpId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "WebAuthn" }) as any as Schema.Schema<WebAuthn>;

export interface UniversalTwoFactor {
  /** Application ID for the U2F protocol. */
  appId?: string;
}

export const UniversalTwoFactor: Schema.Schema<UniversalTwoFactor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UniversalTwoFactor",
  }) as any as Schema.Schema<UniversalTwoFactor>;

export interface SecurityKey {
  /** The Web Authentication protocol type. */
  webAuthn?: WebAuthn;
  /** The security key nickname explicitly set by the user. */
  deviceNickname?: string;
  /** The U2F protocol type. */
  universalTwoFactor?: UniversalTwoFactor;
  /** Hardware-backed private key text in SSH format. */
  privateKey?: string;
  /** Public key text in SSH format, defined by [RFC4253]("https://www.ietf.org/rfc/rfc4253.txt") section 6.6. */
  publicKey?: string;
}

export const SecurityKey: Schema.Schema<SecurityKey> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webAuthn: Schema.optional(WebAuthn),
      deviceNickname: Schema.optional(Schema.String),
      universalTwoFactor: Schema.optional(UniversalTwoFactor),
      privateKey: Schema.optional(Schema.String),
      publicKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecurityKey",
  }) as any as Schema.Schema<SecurityKey>;

export interface SshPublicKey {
  /** An expiration time in microseconds since epoch. */
  expirationTimeUsec?: string;
  /** Output only. The canonical resource name. */
  name?: string;
  /** Required. Public key text in SSH format, defined by [RFC4253](https://www.ietf.org/rfc/rfc4253.txt) section 6.6. */
  key?: string;
  /** Output only. The SHA-256 fingerprint of the SSH public key. */
  fingerprint?: string;
}

export const SshPublicKey: Schema.Schema<SshPublicKey> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expirationTimeUsec: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
      fingerprint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SshPublicKey",
  }) as any as Schema.Schema<SshPublicKey>;

export interface PosixAccount {
  /** The GECOS (user information) entry for this account. */
  gecos?: string;
  /** The operating system type where this account applies. */
  operatingSystemType?:
    | "OPERATING_SYSTEM_TYPE_UNSPECIFIED"
    | "LINUX"
    | "WINDOWS"
    | (string & {});
  /** The username of the POSIX account. */
  username?: string;
  /** System identifier for which account the username or uid applies to. By default, the empty value is used. */
  systemId?: string;
  /** The user ID. */
  uid?: string;
  /** The path to the home directory for this account. */
  homeDirectory?: string;
  /** Only one POSIX account can be marked as primary. */
  primary?: boolean;
  /** The default group ID. */
  gid?: string;
  /** The path to the logic shell for this account. */
  shell?: string;
  /** Output only. A POSIX account identifier. */
  accountId?: string;
  /** Output only. The canonical resource name. */
  name?: string;
}

export const PosixAccount: Schema.Schema<PosixAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gecos: Schema.optional(Schema.String),
      operatingSystemType: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      systemId: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      homeDirectory: Schema.optional(Schema.String),
      primary: Schema.optional(Schema.Boolean),
      gid: Schema.optional(Schema.String),
      shell: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosixAccount",
  }) as any as Schema.Schema<PosixAccount>;

export interface LoginProfile {
  /** Required. A unique user ID. */
  name?: string;
  /** A map from SSH public key fingerprint to the associated key object. */
  sshPublicKeys?: Record<string, SshPublicKey>;
  /** The registered security key credentials for a user. */
  securityKeys?: Array<SecurityKey>;
  /** The list of POSIX accounts associated with the user. */
  posixAccounts?: Array<PosixAccount>;
}

export const LoginProfile: Schema.Schema<LoginProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sshPublicKeys: Schema.optional(
        Schema.Record(Schema.String, SshPublicKey),
      ),
      securityKeys: Schema.optional(Schema.Array(SecurityKey)),
      posixAccounts: Schema.optional(Schema.Array(PosixAccount)),
    }),
  ).annotate({
    identifier: "LoginProfile",
  }) as any as Schema.Schema<LoginProfile>;

export interface SignSshPublicKeyResponse {
  /** The signed SSH public key to use in the SSH handshake. */
  signedSshPublicKey?: string;
}

export const SignSshPublicKeyResponse: Schema.Schema<SignSshPublicKeyResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signedSshPublicKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SignSshPublicKeyResponse",
  }) as any as Schema.Schema<SignSshPublicKeyResponse>;

export interface GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse {
  /** The signed SSH public key to use in the SSH handshake. */
  signedSshPublicKey?: string;
}

export const GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse: Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signedSshPublicKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse",
  }) as any as Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse>;

export interface ImportSshPublicKeyResponse {
  /** The login profile information for the user. */
  loginProfile?: LoginProfile;
  /** Detailed information about import results. */
  details?: string;
}

export const ImportSshPublicKeyResponse: Schema.Schema<ImportSshPublicKeyResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      loginProfile: Schema.optional(LoginProfile),
      details: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImportSshPublicKeyResponse",
  }) as any as Schema.Schema<ImportSshPublicKeyResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface SignSshPublicKeyRequest {
  /** Required. The SSH public key to sign. */
  sshPublicKey?: string;
}

export const SignSshPublicKeyRequest: Schema.Schema<SignSshPublicKeyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sshPublicKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SignSshPublicKeyRequest",
  }) as any as Schema.Schema<SignSshPublicKeyRequest>;

export interface GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest {
  /** Required. The SSH public key to sign. */
  sshPublicKey?: string;
  /** The Compute instance to sign the SSH public key for. Expected format: projects/{project}/zones/{zone}/instances/{numeric_instance_id} */
  computeInstance?: string;
  /** The App Engine instance to sign the SSH public key for. Expected format: apps/{app}/services/{service}/versions/{version}/instances/{instance} */
  appEngineInstance?: string;
  /** Optional. The service account for the instance. If the instance in question does not have a service account, this field should be left empty. If the wrong service account is provided, this operation will return a signed certificate that will not be accepted by the VM. */
  serviceAccount?: string;
}

export const GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest: Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sshPublicKey: Schema.optional(Schema.String),
      computeInstance: Schema.optional(Schema.String),
      appEngineInstance: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest",
  }) as any as Schema.Schema<GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SignSshPublicKeyProjectsLocationsRequest {
  /** Required. The parent for the signing request. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest;
}

export const SignSshPublicKeyProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}:signSshPublicKey",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SignSshPublicKeyProjectsLocationsRequest>;

export type SignSshPublicKeyProjectsLocationsResponse =
  GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse;
export const SignSshPublicKeyProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudOsloginControlplaneRegionalV1betaSignSshPublicKeyResponse;

export type SignSshPublicKeyProjectsLocationsError = DefaultErrors;

/** Signs an SSH public key for a user to authenticate to a virtual machine on Google Compute Engine. */
export const signSshPublicKeyProjectsLocations: API.OperationMethod<
  SignSshPublicKeyProjectsLocationsRequest,
  SignSshPublicKeyProjectsLocationsResponse,
  SignSshPublicKeyProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SignSshPublicKeyProjectsLocationsRequest,
  output: SignSshPublicKeyProjectsLocationsResponse,
  errors: [],
}));

export interface GetLoginProfileUsersRequest {
  /** Required. The unique ID for the user in format `users/{user}`. */
  name: string;
  /** The view configures whether to retrieve security keys information. */
  view?:
    | "LOGIN_PROFILE_VIEW_UNSPECIFIED"
    | "BASIC"
    | "SECURITY_KEY"
    | (string & {});
  /** Required. The project ID of the Google Cloud Platform project. */
  projectId?: string;
  /** Optional. A system ID for filtering the results of the request. */
  systemId?: string;
}

export const GetLoginProfileUsersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    systemId: Schema.optional(Schema.String).pipe(T.HttpQuery("systemId")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta/users/{usersId}/loginProfile" }),
    svc,
  ) as unknown as Schema.Schema<GetLoginProfileUsersRequest>;

export type GetLoginProfileUsersResponse = LoginProfile;
export const GetLoginProfileUsersResponse =
  /*@__PURE__*/ /*#__PURE__*/ LoginProfile;

export type GetLoginProfileUsersError = DefaultErrors;

/** Retrieves the profile information used for logging in to a virtual machine on Google Compute Engine. */
export const getLoginProfileUsers: API.OperationMethod<
  GetLoginProfileUsersRequest,
  GetLoginProfileUsersResponse,
  GetLoginProfileUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLoginProfileUsersRequest,
  output: GetLoginProfileUsersResponse,
  errors: [],
}));

export interface ImportSshPublicKeyUsersRequest {
  /** The view configures whether to retrieve security keys information. */
  view?:
    | "LOGIN_PROFILE_VIEW_UNSPECIFIED"
    | "BASIC"
    | "SECURITY_KEY"
    | (string & {});
  /** The project ID of the Google Cloud Platform project. */
  projectId?: string;
  /** The unique ID for the user in format `users/{user}`. */
  parent: string;
  /** Optional. The regions to which to assert that the key was written. If unspecified, defaults to all regions. Regions are listed at https://cloud.google.com/about/locations#region. */
  regions?: string[];
  /** Request body */
  body?: SshPublicKey;
}

export const ImportSshPublicKeyUsersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    regions: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("regions"),
    ),
    body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/users/{usersId}:importSshPublicKey",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportSshPublicKeyUsersRequest>;

export type ImportSshPublicKeyUsersResponse = ImportSshPublicKeyResponse;
export const ImportSshPublicKeyUsersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ImportSshPublicKeyResponse;

export type ImportSshPublicKeyUsersError = DefaultErrors;

/** Adds an SSH public key and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile. */
export const importSshPublicKeyUsers: API.OperationMethod<
  ImportSshPublicKeyUsersRequest,
  ImportSshPublicKeyUsersResponse,
  ImportSshPublicKeyUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportSshPublicKeyUsersRequest,
  output: ImportSshPublicKeyUsersResponse,
  errors: [],
}));

export interface PatchUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
  /** Mask to control which fields get updated. Updates all if not present. */
  updateMask?: string;
  /** Request body */
  body?: SshPublicKey;
}

export const PatchUsersSshPublicKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/users/{usersId}/sshPublicKeys/{sshPublicKeysId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchUsersSshPublicKeysRequest>;

export type PatchUsersSshPublicKeysResponse = SshPublicKey;
export const PatchUsersSshPublicKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ SshPublicKey;

export type PatchUsersSshPublicKeysError = DefaultErrors;

/** Updates an SSH public key and returns the profile information. This method supports patch semantics. */
export const patchUsersSshPublicKeys: API.OperationMethod<
  PatchUsersSshPublicKeysRequest,
  PatchUsersSshPublicKeysResponse,
  PatchUsersSshPublicKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUsersSshPublicKeysRequest,
  output: PatchUsersSshPublicKeysResponse,
  errors: [],
}));

export interface GetUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
}

export const GetUsersSshPublicKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/users/{usersId}/sshPublicKeys/{sshPublicKeysId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSshPublicKeysRequest>;

export type GetUsersSshPublicKeysResponse = SshPublicKey;
export const GetUsersSshPublicKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ SshPublicKey;

export type GetUsersSshPublicKeysError = DefaultErrors;

/** Retrieves an SSH public key. */
export const getUsersSshPublicKeys: API.OperationMethod<
  GetUsersSshPublicKeysRequest,
  GetUsersSshPublicKeysResponse,
  GetUsersSshPublicKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSshPublicKeysRequest,
  output: GetUsersSshPublicKeysResponse,
  errors: [],
}));

export interface DeleteUsersSshPublicKeysRequest {
  /** Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`. */
  name: string;
}

export const DeleteUsersSshPublicKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/users/{usersId}/sshPublicKeys/{sshPublicKeysId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSshPublicKeysRequest>;

export type DeleteUsersSshPublicKeysResponse = Empty;
export const DeleteUsersSshPublicKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteUsersSshPublicKeysError = DefaultErrors;

/** Deletes an SSH public key. */
export const deleteUsersSshPublicKeys: API.OperationMethod<
  DeleteUsersSshPublicKeysRequest,
  DeleteUsersSshPublicKeysResponse,
  DeleteUsersSshPublicKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateUsersSshPublicKeysRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(SshPublicKey).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/users/{usersId}/sshPublicKeys",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSshPublicKeysRequest>;

export type CreateUsersSshPublicKeysResponse = SshPublicKey;
export const CreateUsersSshPublicKeysResponse =
  /*@__PURE__*/ /*#__PURE__*/ SshPublicKey;

export type CreateUsersSshPublicKeysError = DefaultErrors;

/** Create an SSH public key */
export const createUsersSshPublicKeys: API.OperationMethod<
  CreateUsersSshPublicKeysRequest,
  CreateUsersSshPublicKeysResponse,
  CreateUsersSshPublicKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSshPublicKeysRequest,
  output: CreateUsersSshPublicKeysResponse,
  errors: [],
}));

export interface DeleteUsersProjectsRequest {
  /** Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`. */
  name: string;
}

export const DeleteUsersProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/users/{usersId}/projects/{projectsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersProjectsRequest>;

export type DeleteUsersProjectsResponse = Empty;
export const DeleteUsersProjectsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteUsersProjectsError = DefaultErrors;

/** Deletes a POSIX account. */
export const deleteUsersProjects: API.OperationMethod<
  DeleteUsersProjectsRequest,
  DeleteUsersProjectsResponse,
  DeleteUsersProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ProvisionPosixAccountUsersProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ProvisionPosixAccountRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/users/{usersId}/projects/{projectsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ProvisionPosixAccountUsersProjectsRequest>;

export type ProvisionPosixAccountUsersProjectsResponse = PosixAccount;
export const ProvisionPosixAccountUsersProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PosixAccount;

export type ProvisionPosixAccountUsersProjectsError = DefaultErrors;

/** Create a POSIX account if it doesn't exist. */
export const provisionPosixAccountUsersProjects: API.OperationMethod<
  ProvisionPosixAccountUsersProjectsRequest,
  ProvisionPosixAccountUsersProjectsResponse,
  ProvisionPosixAccountUsersProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ProvisionPosixAccountUsersProjectsRequest,
  output: ProvisionPosixAccountUsersProjectsResponse,
  errors: [],
}));

export interface SignSshPublicKeyUsersProjectsLocationsRequest {
  /** Required. The parent project and region for the signing request. */
  parent: string;
  /** Request body */
  body?: SignSshPublicKeyRequest;
}

export const SignSshPublicKeyUsersProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(SignSshPublicKeyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/users/{usersId}/projects/{projectsId}/locations/{locationsId}:signSshPublicKey",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SignSshPublicKeyUsersProjectsLocationsRequest>;

export type SignSshPublicKeyUsersProjectsLocationsResponse =
  SignSshPublicKeyResponse;
export const SignSshPublicKeyUsersProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SignSshPublicKeyResponse;

export type SignSshPublicKeyUsersProjectsLocationsError = DefaultErrors;

/** Signs an SSH public key for a user to authenticate to an instance. */
export const signSshPublicKeyUsersProjectsLocations: API.OperationMethod<
  SignSshPublicKeyUsersProjectsLocationsRequest,
  SignSshPublicKeyUsersProjectsLocationsResponse,
  SignSshPublicKeyUsersProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SignSshPublicKeyUsersProjectsLocationsRequest,
  output: SignSshPublicKeyUsersProjectsLocationsResponse,
  errors: [],
}));

export interface SignSshPublicKeyUsersProjectsZonesRequest {
  /** Required. The parent project and region for the signing request. */
  parent: string;
  /** Request body */
  body?: SignSshPublicKeyRequest;
}

export const SignSshPublicKeyUsersProjectsZonesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(SignSshPublicKeyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/users/{usersId}/projects/{projectsId}/zones/{zonesId}:signSshPublicKey",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SignSshPublicKeyUsersProjectsZonesRequest>;

export type SignSshPublicKeyUsersProjectsZonesResponse =
  SignSshPublicKeyResponse;
export const SignSshPublicKeyUsersProjectsZonesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SignSshPublicKeyResponse;

export type SignSshPublicKeyUsersProjectsZonesError = DefaultErrors;

/** Signs an SSH public key for a user to authenticate to an instance. */
export const signSshPublicKeyUsersProjectsZones: API.OperationMethod<
  SignSshPublicKeyUsersProjectsZonesRequest,
  SignSshPublicKeyUsersProjectsZonesResponse,
  SignSshPublicKeyUsersProjectsZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SignSshPublicKeyUsersProjectsZonesRequest,
  output: SignSshPublicKeyUsersProjectsZonesResponse,
  errors: [],
}));
