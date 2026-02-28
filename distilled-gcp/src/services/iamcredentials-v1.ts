// ==========================================================================
// IAM Service Account Credentials API (iamcredentials v1)
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
  name: "iamcredentials",
  version: "v1",
  rootUrl: "https://iamcredentials.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SignJwtResponse {
  /** The signed JWT. Contains the automatically generated header; the client-supplied payload; and the signature, which is generated using the key referenced by the `kid` field in the header. After the key pair referenced by the `key_id` response field expires, Google no longer exposes the public key that can be used to verify the JWT. As a result, the receiver can no longer verify the signature. */
  signedJwt?: string;
  /** The ID of the key used to sign the JWT. The key used for signing will remain valid for at least 12 hours after the JWT is signed. To verify the signature, you can retrieve the public key in several formats from the following endpoints: - RSA public key wrapped in an X.509 v3 certificate: `https://www.googleapis.com/service_accounts/v1/metadata/x509/{ACCOUNT_EMAIL}` - Raw key in JSON format: `https://www.googleapis.com/service_accounts/v1/metadata/raw/{ACCOUNT_EMAIL}` - JSON Web Key (JWK): `https://www.googleapis.com/service_accounts/v1/metadata/jwk/{ACCOUNT_EMAIL}` */
  keyId?: string;
}

export const SignJwtResponse: Schema.Schema<SignJwtResponse> = Schema.suspend(() => Schema.Struct({
  signedJwt: Schema.optional(Schema.String),
  keyId: Schema.optional(Schema.String),
})).annotate({ identifier: "SignJwtResponse" }) as any as Schema.Schema<SignJwtResponse>;

export interface GenerateAccessTokenRequest {
  /** Required. Code to identify the scopes to be included in the OAuth 2.0 access token. See https://developers.google.com/identity/protocols/googlescopes for more information. At least one value required. */
  scope?: Array<string>;
  /** The desired lifetime duration of the access token in seconds. By default, the maximum allowed value is 1 hour. To set a lifetime of up to 12 hours, you can add the service account as an allowed value in an Organization Policy that enforces the `constraints/iam.allowServiceAccountCredentialLifetimeExtension` constraint. See detailed instructions at https://cloud.google.com/iam/help/credentials/lifetime If a value is not specified, the token's lifetime will be set to a default value of 1 hour. */
  lifetime?: string;
  /** The sequence of service accounts in a delegation chain. This field is required for [delegated requests](https://cloud.google.com/iam/help/credentials/delegated-request). For [direct requests](https://cloud.google.com/iam/help/credentials/direct-request), which are more common, do not specify this field. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  delegates?: Array<string>;
}

export const GenerateAccessTokenRequest: Schema.Schema<GenerateAccessTokenRequest> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(Schema.Array(Schema.String)),
  lifetime: Schema.optional(Schema.String),
  delegates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GenerateAccessTokenRequest" }) as any as Schema.Schema<GenerateAccessTokenRequest>;

export interface GenerateIdTokenResponse {
  /** The OpenId Connect ID token. The token is a JSON Web Token (JWT) that contains a payload with claims. See the [JSON Web Token spec](https://tools.ietf.org/html/rfc7519) for more information. Here is an example of a decoded JWT payload: ``` { "iss": "https://accounts.google.com", "iat": 1496953245, "exp": 1496953245, "aud": "https://www.example.com", "sub": "107517467455664443765", "azp": "107517467455664443765", "email": "my-iam-account@my-project.iam.gserviceaccount.com", "email_verified": true, "google": { "organization_number": 123456 } } ``` */
  token?: string;
}

export const GenerateIdTokenResponse: Schema.Schema<GenerateIdTokenResponse> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateIdTokenResponse" }) as any as Schema.Schema<GenerateIdTokenResponse>;

export interface WorkforcePoolAllowedLocations {
  /** Output only. The human readable trust boundary locations. For example, ["us-central1", "europe-west1"] */
  locations?: Array<string>;
  /** Output only. The hex encoded bitmap of the trust boundary locations */
  encodedLocations?: string;
}

export const WorkforcePoolAllowedLocations: Schema.Schema<WorkforcePoolAllowedLocations> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Schema.String)),
  encodedLocations: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkforcePoolAllowedLocations" }) as any as Schema.Schema<WorkforcePoolAllowedLocations>;

export interface GenerateAccessTokenResponse {
  /** Token expiration time. The expiration time is always set. */
  expireTime?: string;
  /** The OAuth 2.0 access token. */
  accessToken?: string;
}

export const GenerateAccessTokenResponse: Schema.Schema<GenerateAccessTokenResponse> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
  accessToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateAccessTokenResponse" }) as any as Schema.Schema<GenerateAccessTokenResponse>;

export interface SignJwtRequest {
  /** Required. The JWT payload to sign. Must be a serialized JSON object that contains a JWT Claims Set. For example: `{"sub": "user@example.com", "iat": 313435}` If the JWT Claims Set contains an expiration time (`exp`) claim, it must be an integer timestamp that is not in the past and no more than 12 hours in the future. */
  payload?: string;
  /** The sequence of service accounts in a delegation chain. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  delegates?: Array<string>;
}

export const SignJwtRequest: Schema.Schema<SignJwtRequest> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(Schema.String),
  delegates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SignJwtRequest" }) as any as Schema.Schema<SignJwtRequest>;

export interface GenerateIdTokenRequest {
  /** Include the organization number of the service account in the token. If set to `true`, the token will contain a `google.organization_number` claim. The value of the claim will be `null` if the service account isn't associated with an organization. */
  organizationNumberIncluded?: boolean;
  /** Include the service account email in the token. If set to `true`, the token will contain `email` and `email_verified` claims. */
  includeEmail?: boolean;
  /** The sequence of service accounts in a delegation chain. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  delegates?: Array<string>;
  /** Required. The audience for the token, such as the API or account that this token grants access to. */
  audience?: string;
}

export const GenerateIdTokenRequest: Schema.Schema<GenerateIdTokenRequest> = Schema.suspend(() => Schema.Struct({
  organizationNumberIncluded: Schema.optional(Schema.Boolean),
  includeEmail: Schema.optional(Schema.Boolean),
  delegates: Schema.optional(Schema.Array(Schema.String)),
  audience: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateIdTokenRequest" }) as any as Schema.Schema<GenerateIdTokenRequest>;

export interface ServiceAccountAllowedLocations {
  /** Output only. The hex encoded bitmap of the trust boundary locations */
  encodedLocations?: string;
  /** Output only. The human readable trust boundary locations. For example, ["us-central1", "europe-west1"] */
  locations?: Array<string>;
}

export const ServiceAccountAllowedLocations: Schema.Schema<ServiceAccountAllowedLocations> = Schema.suspend(() => Schema.Struct({
  encodedLocations: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ServiceAccountAllowedLocations" }) as any as Schema.Schema<ServiceAccountAllowedLocations>;

export interface SignBlobResponse {
  /** The ID of the key used to sign the blob. The key used for signing will remain valid for at least 12 hours after the blob is signed. To verify the signature, you can retrieve the public key in several formats from the following endpoints: - RSA public key wrapped in an X.509 v3 certificate: `https://www.googleapis.com/service_accounts/v1/metadata/x509/{ACCOUNT_EMAIL}` - Raw key in JSON format: `https://www.googleapis.com/service_accounts/v1/metadata/raw/{ACCOUNT_EMAIL}` - JSON Web Key (JWK): `https://www.googleapis.com/service_accounts/v1/metadata/jwk/{ACCOUNT_EMAIL}` */
  keyId?: string;
  /** The signature for the blob. Does not include the original blob. After the key pair referenced by the `key_id` response field expires, Google no longer exposes the public key that can be used to verify the blob. As a result, the receiver can no longer verify the signature. */
  signedBlob?: string;
}

export const SignBlobResponse: Schema.Schema<SignBlobResponse> = Schema.suspend(() => Schema.Struct({
  keyId: Schema.optional(Schema.String),
  signedBlob: Schema.optional(Schema.String),
})).annotate({ identifier: "SignBlobResponse" }) as any as Schema.Schema<SignBlobResponse>;

export interface WorkloadIdentityPoolAllowedLocations {
  /** Output only. The human readable trust boundary locations. For example, ["us-central1", "europe-west1"] */
  locations?: Array<string>;
  /** Output only. The hex encoded bitmap of the trust boundary locations */
  encodedLocations?: string;
}

export const WorkloadIdentityPoolAllowedLocations: Schema.Schema<WorkloadIdentityPoolAllowedLocations> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Schema.String)),
  encodedLocations: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadIdentityPoolAllowedLocations" }) as any as Schema.Schema<WorkloadIdentityPoolAllowedLocations>;

export interface SignBlobRequest {
  /** The sequence of service accounts in a delegation chain. Each service account must be granted the `roles/iam.serviceAccountTokenCreator` role on its next service account in the chain. The last service account in the chain must be granted the `roles/iam.serviceAccountTokenCreator` role on the service account that is specified in the `name` field of the request. The delegates must have the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  delegates?: Array<string>;
  /** Required. The bytes to sign. */
  payload?: string;
}

export const SignBlobRequest: Schema.Schema<SignBlobRequest> = Schema.suspend(() => Schema.Struct({
  delegates: Schema.optional(Schema.Array(Schema.String)),
  payload: Schema.optional(Schema.String),
})).annotate({ identifier: "SignBlobRequest" }) as any as Schema.Schema<SignBlobRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns the trust boundary info for a given workforce pool. */
export interface GetAllowedLocationsLocationsWorkforcePoolsRequest {
  /** Required. Resource name of workforce pool. */
  name: string;
}

export const GetAllowedLocationsLocationsWorkforcePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/allowedLocations" }),
  svc,
) as unknown as Schema.Schema<GetAllowedLocationsLocationsWorkforcePoolsRequest>;

export type GetAllowedLocationsLocationsWorkforcePoolsResponse = WorkforcePoolAllowedLocations;
export const GetAllowedLocationsLocationsWorkforcePoolsResponse = WorkforcePoolAllowedLocations;

export type GetAllowedLocationsLocationsWorkforcePoolsError = CommonErrors;

export const getAllowedLocationsLocationsWorkforcePools: API.OperationMethod<GetAllowedLocationsLocationsWorkforcePoolsRequest, GetAllowedLocationsLocationsWorkforcePoolsResponse, GetAllowedLocationsLocationsWorkforcePoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAllowedLocationsLocationsWorkforcePoolsRequest,
  output: GetAllowedLocationsLocationsWorkforcePoolsResponse,
  errors: [],
}));

/** Returns the trust boundary info for a given workload identity pool. */
export interface GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Required. Resource name of workload identity pool. */
  name: string;
}

export const GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/allowedLocations" }),
  svc,
) as unknown as Schema.Schema<GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsRequest>;

export type GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsResponse = WorkloadIdentityPoolAllowedLocations;
export const GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsResponse = WorkloadIdentityPoolAllowedLocations;

export type GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsError = CommonErrors;

export const getAllowedLocationsProjectsLocationsWorkloadIdentityPools: API.OperationMethod<GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsRequest, GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsResponse, GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsRequest,
  output: GetAllowedLocationsProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

/** Signs a blob using a service account's system-managed private key. */
export interface SignBlobProjectsServiceAccountsRequest {
  /** Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  name: string;
  /** Request body */
  body?: SignBlobRequest;
}

export const SignBlobProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SignBlobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:signBlob", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignBlobProjectsServiceAccountsRequest>;

export type SignBlobProjectsServiceAccountsResponse = SignBlobResponse;
export const SignBlobProjectsServiceAccountsResponse = SignBlobResponse;

export type SignBlobProjectsServiceAccountsError = CommonErrors;

export const signBlobProjectsServiceAccounts: API.OperationMethod<SignBlobProjectsServiceAccountsRequest, SignBlobProjectsServiceAccountsResponse, SignBlobProjectsServiceAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignBlobProjectsServiceAccountsRequest,
  output: SignBlobProjectsServiceAccountsResponse,
  errors: [],
}));

/** Generates an OAuth 2.0 access token for a service account. */
export interface GenerateAccessTokenProjectsServiceAccountsRequest {
  /** Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  name: string;
  /** Request body */
  body?: GenerateAccessTokenRequest;
}

export const GenerateAccessTokenProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateAccessTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:generateAccessToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAccessTokenProjectsServiceAccountsRequest>;

export type GenerateAccessTokenProjectsServiceAccountsResponse = GenerateAccessTokenResponse;
export const GenerateAccessTokenProjectsServiceAccountsResponse = GenerateAccessTokenResponse;

export type GenerateAccessTokenProjectsServiceAccountsError = CommonErrors;

export const generateAccessTokenProjectsServiceAccounts: API.OperationMethod<GenerateAccessTokenProjectsServiceAccountsRequest, GenerateAccessTokenProjectsServiceAccountsResponse, GenerateAccessTokenProjectsServiceAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAccessTokenProjectsServiceAccountsRequest,
  output: GenerateAccessTokenProjectsServiceAccountsResponse,
  errors: [],
}));

/** Generates an OpenID Connect ID token for a service account. */
export interface GenerateIdTokenProjectsServiceAccountsRequest {
  /** Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  name: string;
  /** Request body */
  body?: GenerateIdTokenRequest;
}

export const GenerateIdTokenProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateIdTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:generateIdToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateIdTokenProjectsServiceAccountsRequest>;

export type GenerateIdTokenProjectsServiceAccountsResponse = GenerateIdTokenResponse;
export const GenerateIdTokenProjectsServiceAccountsResponse = GenerateIdTokenResponse;

export type GenerateIdTokenProjectsServiceAccountsError = CommonErrors;

export const generateIdTokenProjectsServiceAccounts: API.OperationMethod<GenerateIdTokenProjectsServiceAccountsRequest, GenerateIdTokenProjectsServiceAccountsResponse, GenerateIdTokenProjectsServiceAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateIdTokenProjectsServiceAccountsRequest,
  output: GenerateIdTokenProjectsServiceAccountsResponse,
  errors: [],
}));

/** Signs a JWT using a service account's system-managed private key. */
export interface SignJwtProjectsServiceAccountsRequest {
  /** Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid. */
  name: string;
  /** Request body */
  body?: SignJwtRequest;
}

export const SignJwtProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SignJwtRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:signJwt", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignJwtProjectsServiceAccountsRequest>;

export type SignJwtProjectsServiceAccountsResponse = SignJwtResponse;
export const SignJwtProjectsServiceAccountsResponse = SignJwtResponse;

export type SignJwtProjectsServiceAccountsError = CommonErrors;

export const signJwtProjectsServiceAccounts: API.OperationMethod<SignJwtProjectsServiceAccountsRequest, SignJwtProjectsServiceAccountsResponse, SignJwtProjectsServiceAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignJwtProjectsServiceAccountsRequest,
  output: SignJwtProjectsServiceAccountsResponse,
  errors: [],
}));

/** Returns the trust boundary info for a given service account. */
export interface GetAllowedLocationsProjectsServiceAccountsRequest {
  /** Required. Resource name of service account. */
  name: string;
}

export const GetAllowedLocationsProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/allowedLocations" }),
  svc,
) as unknown as Schema.Schema<GetAllowedLocationsProjectsServiceAccountsRequest>;

export type GetAllowedLocationsProjectsServiceAccountsResponse = ServiceAccountAllowedLocations;
export const GetAllowedLocationsProjectsServiceAccountsResponse = ServiceAccountAllowedLocations;

export type GetAllowedLocationsProjectsServiceAccountsError = CommonErrors;

export const getAllowedLocationsProjectsServiceAccounts: API.OperationMethod<GetAllowedLocationsProjectsServiceAccountsRequest, GetAllowedLocationsProjectsServiceAccountsResponse, GetAllowedLocationsProjectsServiceAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAllowedLocationsProjectsServiceAccountsRequest,
  output: GetAllowedLocationsProjectsServiceAccountsResponse,
  errors: [],
}));

