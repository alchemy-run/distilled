// ==========================================================================
// Identity and Access Management (IAM) API (iam v1)
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
  name: "iam",
  version: "v1",
  rootUrl: "https://iam.googleapis.com/",
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

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ServiceAccount {
  /** The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name?: string;
  /** Output only. The ID of the project that owns the service account. */
  projectId?: string;
  /** Output only. The unique, stable numeric ID for the service account. Each service account retains its unique ID even if you delete the service account. For example, if you delete a service account, then create a new service account with the same name, the new service account has a different unique ID than the deleted service account. */
  uniqueId?: string;
  /** Output only. The email address of the service account. */
  email?: string;
  /** Optional. A user-specified, human-readable name for the service account. The maximum length is 100 UTF-8 bytes. */
  displayName?: string;
  /** Deprecated. Do not use. */
  etag?: string;
  /** Optional. A user-specified, human-readable description of the service account. The maximum length is 256 UTF-8 bytes. */
  description?: string;
  /** Output only. The OAuth 2.0 client ID for the service account. */
  oauth2ClientId?: string;
  /** Output only. Whether the service account is disabled. */
  disabled?: boolean;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      uniqueId: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      oauth2ClientId: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "ServiceAccount",
}) as any as Schema.Schema<ServiceAccount>;

export interface ListServiceAccountsResponse {
  /** The list of matching service accounts. */
  accounts?: Array<ServiceAccount>;
  /** To retrieve the next page of results, set ListServiceAccountsRequest.page_token to this value. */
  nextPageToken?: string;
}

export const ListServiceAccountsResponse: Schema.Schema<ListServiceAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accounts: Schema.optional(Schema.Array(ServiceAccount)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListServiceAccountsResponse",
  }) as any as Schema.Schema<ListServiceAccountsResponse>;

export interface CreateServiceAccountRequest {
  /** Required. The account id that is used to generate the service account email address and a stable unique id. It is unique within a project, must be 6-30 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])` to comply with RFC1035. */
  accountId?: string;
  /** The ServiceAccount resource to create. Currently, only the following values are user assignable: `display_name` and `description`. */
  serviceAccount?: ServiceAccount;
}

export const CreateServiceAccountRequest: Schema.Schema<CreateServiceAccountRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(ServiceAccount),
    }),
  ).annotate({
    identifier: "CreateServiceAccountRequest",
  }) as any as Schema.Schema<CreateServiceAccountRequest>;

export interface PatchServiceAccountRequest {
  serviceAccount?: ServiceAccount;
  updateMask?: string;
}

export const PatchServiceAccountRequest: Schema.Schema<PatchServiceAccountRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAccount: Schema.optional(ServiceAccount),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PatchServiceAccountRequest",
  }) as any as Schema.Schema<PatchServiceAccountRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface UndeleteServiceAccountRequest {}

export const UndeleteServiceAccountRequest: Schema.Schema<UndeleteServiceAccountRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteServiceAccountRequest",
  }) as any as Schema.Schema<UndeleteServiceAccountRequest>;

export interface UndeleteServiceAccountResponse {
  /** Metadata for the restored service account. */
  restoredAccount?: ServiceAccount;
}

export const UndeleteServiceAccountResponse: Schema.Schema<UndeleteServiceAccountResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      restoredAccount: Schema.optional(ServiceAccount),
    }),
  ).annotate({
    identifier: "UndeleteServiceAccountResponse",
  }) as any as Schema.Schema<UndeleteServiceAccountResponse>;

export interface EnableServiceAccountRequest {}

export const EnableServiceAccountRequest: Schema.Schema<EnableServiceAccountRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "EnableServiceAccountRequest",
  }) as any as Schema.Schema<EnableServiceAccountRequest>;

export interface DisableServiceAccountRequest {}

export const DisableServiceAccountRequest: Schema.Schema<DisableServiceAccountRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisableServiceAccountRequest",
  }) as any as Schema.Schema<DisableServiceAccountRequest>;

export interface ExtendedStatus {
  /** The key for this extended status. */
  key?:
    | "SERVICE_ACCOUNT_KEY_EXTENDED_STATUS_KEY_UNSPECIFIED"
    | "SERVICE_ACCOUNT_KEY_EXTENDED_STATUS_KEY_EXPOSED"
    | "SERVICE_ACCOUNT_KEY_EXTENDED_STATUS_KEY_COMPROMISE_DETECTED"
    | (string & {});
  /** The value for the extended status. */
  value?: string;
}

export const ExtendedStatus: Schema.Schema<ExtendedStatus> = Schema.suspend(
  () =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ExtendedStatus",
}) as any as Schema.Schema<ExtendedStatus>;

export interface ServiceAccountKey {
  /** The resource name of the service account key in the following format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`. */
  name?: string;
  /** The output format for the private key. Only provided in `CreateServiceAccountKey` responses, not in `GetServiceAccountKey` or `ListServiceAccountKey` responses. Google never exposes system-managed private keys, and never retains user-managed private keys. */
  privateKeyType?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_PKCS12_FILE"
    | "TYPE_GOOGLE_CREDENTIALS_FILE"
    | (string & {});
  /** Specifies the algorithm (and possibly key size) for the key. */
  keyAlgorithm?:
    | "KEY_ALG_UNSPECIFIED"
    | "KEY_ALG_RSA_1024"
    | "KEY_ALG_RSA_2048"
    | (string & {});
  /** The private key data. Only provided in `CreateServiceAccountKey` responses. Make sure to keep the private key data secure because it allows for the assertion of the service account identity. When base64 decoded, the private key data can be used to authenticate with Google API client libraries and with gcloud auth activate-service-account. */
  privateKeyData?: string;
  /** The public key data. Only provided in `GetServiceAccountKey` responses. */
  publicKeyData?: string;
  /** The key can be used after this timestamp. */
  validAfterTime?: string;
  /** The key can be used before this timestamp. For system-managed key pairs, this timestamp is the end time for the private key signing operation. The public key could still be used for verification for a few hours after this time. */
  validBeforeTime?: string;
  /** The key origin. */
  keyOrigin?:
    | "ORIGIN_UNSPECIFIED"
    | "USER_PROVIDED"
    | "GOOGLE_PROVIDED"
    | (string & {});
  /** The key type. */
  keyType?:
    | "KEY_TYPE_UNSPECIFIED"
    | "USER_MANAGED"
    | "SYSTEM_MANAGED"
    | (string & {});
  /** The key status. */
  disabled?: boolean;
  /** Output only. optional. If the key is disabled, it may have a DisableReason describing why it was disabled. */
  disableReason?:
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_UNSPECIFIED"
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_USER_INITIATED"
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_EXPOSED"
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_COMPROMISE_DETECTED"
    | (string & {});
  /** Output only. Extended Status provides permanent information about a service account key. For example, if this key was detected as exposed or compromised, that information will remain for the lifetime of the key in the extended_status. */
  extendedStatus?: Array<ExtendedStatus>;
}

export const ServiceAccountKey: Schema.Schema<ServiceAccountKey> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      privateKeyType: Schema.optional(Schema.String),
      keyAlgorithm: Schema.optional(Schema.String),
      privateKeyData: Schema.optional(Schema.String),
      publicKeyData: Schema.optional(Schema.String),
      validAfterTime: Schema.optional(Schema.String),
      validBeforeTime: Schema.optional(Schema.String),
      keyOrigin: Schema.optional(Schema.String),
      keyType: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      disableReason: Schema.optional(Schema.String),
      extendedStatus: Schema.optional(Schema.Array(ExtendedStatus)),
    }),
  ).annotate({
    identifier: "ServiceAccountKey",
  }) as any as Schema.Schema<ServiceAccountKey>;

export interface ListServiceAccountKeysResponse {
  /** The public keys for the service account. */
  keys?: Array<ServiceAccountKey>;
}

export const ListServiceAccountKeysResponse: Schema.Schema<ListServiceAccountKeysResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      keys: Schema.optional(Schema.Array(ServiceAccountKey)),
    }),
  ).annotate({
    identifier: "ListServiceAccountKeysResponse",
  }) as any as Schema.Schema<ListServiceAccountKeysResponse>;

export interface CreateServiceAccountKeyRequest {
  /** The output format of the private key. The default value is `TYPE_GOOGLE_CREDENTIALS_FILE`, which is the Google Credentials File format. */
  privateKeyType?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_PKCS12_FILE"
    | "TYPE_GOOGLE_CREDENTIALS_FILE"
    | (string & {});
  /** Which type of key and algorithm to use for the key. The default is currently a 2K RSA key. However this may change in the future. */
  keyAlgorithm?:
    | "KEY_ALG_UNSPECIFIED"
    | "KEY_ALG_RSA_1024"
    | "KEY_ALG_RSA_2048"
    | (string & {});
}

export const CreateServiceAccountKeyRequest: Schema.Schema<CreateServiceAccountKeyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      privateKeyType: Schema.optional(Schema.String),
      keyAlgorithm: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateServiceAccountKeyRequest",
  }) as any as Schema.Schema<CreateServiceAccountKeyRequest>;

export interface UploadServiceAccountKeyRequest {
  /** The public key to associate with the service account. Must be an RSA public key that is wrapped in an X.509 v3 certificate. Include the first line, `-----BEGIN CERTIFICATE-----`, and the last line, `-----END CERTIFICATE-----`. */
  publicKeyData?: string;
}

export const UploadServiceAccountKeyRequest: Schema.Schema<UploadServiceAccountKeyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      publicKeyData: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadServiceAccountKeyRequest",
  }) as any as Schema.Schema<UploadServiceAccountKeyRequest>;

export interface DisableServiceAccountKeyRequest {
  /** Optional. Describes the reason this key is being disabled. If unspecified, the default value of SERVICE_ACCOUNT_KEY_DISABLE_REASON_USER_INITIATED will be used. */
  serviceAccountKeyDisableReason?:
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_UNSPECIFIED"
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_USER_INITIATED"
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_EXPOSED"
    | "SERVICE_ACCOUNT_KEY_DISABLE_REASON_COMPROMISE_DETECTED"
    | (string & {});
  /** Optional. Usable by internal google services only. An extended_status_message can be used to include additional information about the key, such as its private key data being exposed on a public repository like GitHub. */
  extendedStatusMessage?: string;
}

export const DisableServiceAccountKeyRequest: Schema.Schema<DisableServiceAccountKeyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAccountKeyDisableReason: Schema.optional(Schema.String),
      extendedStatusMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DisableServiceAccountKeyRequest",
  }) as any as Schema.Schema<DisableServiceAccountKeyRequest>;

export interface EnableServiceAccountKeyRequest {}

export const EnableServiceAccountKeyRequest: Schema.Schema<EnableServiceAccountKeyRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "EnableServiceAccountKeyRequest",
  }) as any as Schema.Schema<EnableServiceAccountKeyRequest>;

export interface SignBlobRequest {
  /** Required. Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The bytes to sign. */
  bytesToSign?: string;
}

export const SignBlobRequest: Schema.Schema<SignBlobRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      bytesToSign: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SignBlobRequest",
}) as any as Schema.Schema<SignBlobRequest>;

export interface SignBlobResponse {
  /** Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The id of the key used to sign the blob. */
  keyId?: string;
  /** Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The signed blob. */
  signature?: string;
}

export const SignBlobResponse: Schema.Schema<SignBlobResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      keyId: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SignBlobResponse",
}) as any as Schema.Schema<SignBlobResponse>;

export interface SignJwtRequest {
  /** Required. Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The JWT payload to sign. Must be a serialized JSON object that contains a JWT Claims Set. For example: `{"sub": "user@example.com", "iat": 313435}` If the JWT Claims Set contains an expiration time (`exp`) claim, it must be an integer timestamp that is not in the past and no more than 12 hours in the future. If the JWT Claims Set does not contain an expiration time (`exp`) claim, this claim is added automatically, with a timestamp that is 1 hour in the future. */
  payload?: string;
}

export const SignJwtRequest: Schema.Schema<SignJwtRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      payload: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SignJwtRequest",
}) as any as Schema.Schema<SignJwtRequest>;

export interface SignJwtResponse {
  /** Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The id of the key used to sign the JWT. */
  keyId?: string;
  /** Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The signed JWT. */
  signedJwt?: string;
}

export const SignJwtResponse: Schema.Schema<SignJwtResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      keyId: Schema.optional(Schema.String),
      signedJwt: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SignJwtResponse",
}) as any as Schema.Schema<SignJwtResponse>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    expression: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    members: Schema.optional(Schema.Array(Schema.String)),
    condition: Schema.optional(Expr),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "AuditLogConfig",
}) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() =>
  Schema.Struct({
    service: Schema.optional(Schema.String),
    auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  }),
).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.Number),
    bindings: Schema.optional(Schema.Array(Binding)),
    auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface QueryGrantableRolesRequest {
  /** Required. Required. The full resource name to query from the list of grantable roles. The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. */
  fullResourceName?: string;
  view?: "BASIC" | "FULL" | (string & {});
  /** Optional limit on the number of roles to include in the response. The default is 300, and the maximum is 2,000. */
  pageSize?: number;
  /** Optional pagination token returned in an earlier QueryGrantableRolesResponse. */
  pageToken?: string;
}

export const QueryGrantableRolesRequest: Schema.Schema<QueryGrantableRolesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      fullResourceName: Schema.optional(Schema.String),
      view: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryGrantableRolesRequest",
  }) as any as Schema.Schema<QueryGrantableRolesRequest>;

export interface Role {
  /** The name of the role. When `Role` is used in `CreateRole`, the role name must not be set. When `Role` is used in output and other input such as `UpdateRole`, the role name is the complete path. For example, `roles/logging.viewer` for predefined roles, `organizations/{ORGANIZATION_ID}/roles/myRole` for organization-level custom roles, and `projects/{PROJECT_ID}/roles/myRole` for project-level custom roles. */
  name?: string;
  /** Optional. A human-readable title for the role. Typically this is limited to 100 UTF-8 bytes. */
  title?: string;
  /** Optional. A human-readable description for the role. */
  description?: string;
  /** The names of the permissions this role grants when bound in an IAM policy. */
  includedPermissions?: Array<string>;
  /** The current launch stage of the role. If the `ALPHA` launch stage has been selected for a role, the `stage` field will not be included in the returned definition for the role. */
  stage?:
    | "ALPHA"
    | "BETA"
    | "GA"
    | "DEPRECATED"
    | "DISABLED"
    | "EAP"
    | (string & {});
  /** Used to perform a consistent read-modify-write. */
  etag?: string;
  /** The current deleted state of the role. This field is read only. It will be ignored in calls to CreateRole and UpdateRole. */
  deleted?: boolean;
}

export const Role: Schema.Schema<Role> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    includedPermissions: Schema.optional(Schema.Array(Schema.String)),
    stage: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    deleted: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Role" }) as any as Schema.Schema<Role>;

export interface QueryGrantableRolesResponse {
  /** The list of matching roles. */
  roles?: Array<Role>;
  /** To retrieve the next page of results, set `QueryGrantableRolesRequest.page_token` to this value. */
  nextPageToken?: string;
}

export const QueryGrantableRolesResponse: Schema.Schema<QueryGrantableRolesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      roles: Schema.optional(Schema.Array(Role)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryGrantableRolesResponse",
  }) as any as Schema.Schema<QueryGrantableRolesResponse>;

export interface ListRolesResponse {
  /** The Roles defined on this resource. */
  roles?: Array<Role>;
  /** To retrieve the next page of results, set `ListRolesRequest.page_token` to this value. */
  nextPageToken?: string;
}

export const ListRolesResponse: Schema.Schema<ListRolesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      roles: Schema.optional(Schema.Array(Role)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRolesResponse",
  }) as any as Schema.Schema<ListRolesResponse>;

export interface CreateRoleRequest {
  /** The role ID to use for this role. A role ID may contain alphanumeric characters, underscores (`_`), and periods (`.`). It must contain a minimum of 3 characters and a maximum of 64 characters. */
  roleId?: string;
  /** The Role resource to create. */
  role?: Role;
}

export const CreateRoleRequest: Schema.Schema<CreateRoleRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      roleId: Schema.optional(Schema.String),
      role: Schema.optional(Role),
    }),
  ).annotate({
    identifier: "CreateRoleRequest",
  }) as any as Schema.Schema<CreateRoleRequest>;

export interface UndeleteRoleRequest {
  /** Used to perform a consistent read-modify-write. */
  etag?: string;
}

export const UndeleteRoleRequest: Schema.Schema<UndeleteRoleRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UndeleteRoleRequest",
  }) as any as Schema.Schema<UndeleteRoleRequest>;

export interface QueryTestablePermissionsRequest {
  /** Required. The full resource name to query from the list of testable permissions. The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. */
  fullResourceName?: string;
  /** Optional limit on the number of permissions to include in the response. The default is 100, and the maximum is 1,000. */
  pageSize?: number;
  /** Optional pagination token returned in an earlier QueryTestablePermissionsRequest. */
  pageToken?: string;
}

export const QueryTestablePermissionsRequest: Schema.Schema<QueryTestablePermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      fullResourceName: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryTestablePermissionsRequest",
  }) as any as Schema.Schema<QueryTestablePermissionsRequest>;

export interface Permission {
  /** The name of this Permission. */
  name?: string;
  /** The title of this Permission. */
  title?: string;
  /** A brief description of what this Permission is used for. */
  description?: string;
  onlyInPredefinedRoles?: boolean;
  /** The current launch stage of the permission. */
  stage?: "ALPHA" | "BETA" | "GA" | "DEPRECATED" | (string & {});
  /** The current custom role support level. */
  customRolesSupportLevel?:
    | "SUPPORTED"
    | "TESTING"
    | "NOT_SUPPORTED"
    | (string & {});
  /** The service API associated with the permission is not enabled. */
  apiDisabled?: boolean;
  /** The preferred name for this permission. If present, then this permission is an alias of, and equivalent to, the listed primary_permission. */
  primaryPermission?: string;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    onlyInPredefinedRoles: Schema.optional(Schema.Boolean),
    stage: Schema.optional(Schema.String),
    customRolesSupportLevel: Schema.optional(Schema.String),
    apiDisabled: Schema.optional(Schema.Boolean),
    primaryPermission: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface QueryTestablePermissionsResponse {
  /** The Permissions testable on the requested resource. */
  permissions?: Array<Permission>;
  /** To retrieve the next page of results, set `QueryTestableRolesRequest.page_token` to this value. */
  nextPageToken?: string;
}

export const QueryTestablePermissionsResponse: Schema.Schema<QueryTestablePermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Permission)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryTestablePermissionsResponse",
  }) as any as Schema.Schema<QueryTestablePermissionsResponse>;

export interface QueryAuditableServicesRequest {
  /** Required. The full resource name to query from the list of auditable services. The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. */
  fullResourceName?: string;
}

export const QueryAuditableServicesRequest: Schema.Schema<QueryAuditableServicesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      fullResourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QueryAuditableServicesRequest",
  }) as any as Schema.Schema<QueryAuditableServicesRequest>;

export interface AuditableService {
  /** Public name of the service. For example, the service name for IAM is 'iam.googleapis.com'. */
  name?: string;
}

export const AuditableService: Schema.Schema<AuditableService> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AuditableService",
}) as any as Schema.Schema<AuditableService>;

export interface QueryAuditableServicesResponse {
  /** The auditable services for a resource. */
  services?: Array<AuditableService>;
}

export const QueryAuditableServicesResponse: Schema.Schema<QueryAuditableServicesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      services: Schema.optional(Schema.Array(AuditableService)),
    }),
  ).annotate({
    identifier: "QueryAuditableServicesResponse",
  }) as any as Schema.Schema<QueryAuditableServicesResponse>;

export interface LintPolicyRequest {
  /** The full resource name of the policy this lint request is about. The name follows the Google Cloud format for full resource names. For example, a Google Cloud project with ID `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. The resource name is not used to read a policy from IAM. Only the data in the request object is linted. */
  fullResourceName?: string;
  /** google.iam.v1.Binding.condition object to be linted. */
  condition?: Expr;
}

export const LintPolicyRequest: Schema.Schema<LintPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      fullResourceName: Schema.optional(Schema.String),
      condition: Schema.optional(Expr),
    }),
  ).annotate({
    identifier: "LintPolicyRequest",
  }) as any as Schema.Schema<LintPolicyRequest>;

export interface LintResult {
  /** The validation unit level. */
  level?: "LEVEL_UNSPECIFIED" | "CONDITION" | (string & {});
  /** The validation unit name, for instance "lintValidationUnits/ConditionComplexityCheck". */
  validationUnitName?: string;
  /** The validation unit severity. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "ERROR"
    | "WARNING"
    | "NOTICE"
    | "INFO"
    | "DEPRECATED"
    | (string & {});
  /** The name of the field for which this lint result is about. For nested messages `field_name` consists of names of the embedded fields separated by period character. The top-level qualifier is the input object to lint in the request. For example, the `field_name` value `condition.expression` identifies a lint result for the `expression` field of the provided condition. */
  fieldName?: string;
  /** 0-based character position of problematic construct within the object identified by `field_name`. Currently, this is populated only for condition expression. */
  locationOffset?: number;
  /** Human readable debug message associated with the issue. */
  debugMessage?: string;
}

export const LintResult: Schema.Schema<LintResult> = Schema.suspend(() =>
  Schema.Struct({
    level: Schema.optional(Schema.String),
    validationUnitName: Schema.optional(Schema.String),
    severity: Schema.optional(Schema.String),
    fieldName: Schema.optional(Schema.String),
    locationOffset: Schema.optional(Schema.Number),
    debugMessage: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LintResult" }) as any as Schema.Schema<LintResult>;

export interface LintPolicyResponse {
  /** List of lint results sorted by `severity` in descending order. */
  lintResults?: Array<LintResult>;
}

export const LintPolicyResponse: Schema.Schema<LintPolicyResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      lintResults: Schema.optional(Schema.Array(LintResult)),
    }),
  ).annotate({
    identifier: "LintPolicyResponse",
  }) as any as Schema.Schema<LintPolicyResponse>;

export interface OauthClient {
  /** Immutable. Identifier. The resource name of the OauthClient. Format:`projects/{project}/locations/{location}/oauthClients/{oauth_client}`. */
  name?: string;
  /** Output only. The state of the OauthClient. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Whether the OauthClient is disabled. You cannot use a disabled OAuth client. */
  disabled?: boolean;
  /** Output only. The system-generated OauthClient id. */
  clientId?: string;
  /** Optional. A user-specified display name of the OauthClient. Cannot exceed 32 characters. */
  displayName?: string;
  /** Optional. A user-specified description of the OauthClient. Cannot exceed 256 characters. */
  description?: string;
  /** Immutable. The type of OauthClient. Either public or private. For private clients, the client secret can be managed using the dedicated OauthClientCredential resource. */
  clientType?:
    | "CLIENT_TYPE_UNSPECIFIED"
    | "PUBLIC_CLIENT"
    | "CONFIDENTIAL_CLIENT"
    | (string & {});
  /** Required. The list of OAuth grant types is allowed for the OauthClient. */
  allowedGrantTypes?: Array<
    | "GRANT_TYPE_UNSPECIFIED"
    | "AUTHORIZATION_CODE_GRANT"
    | "REFRESH_TOKEN_GRANT"
    | (string & {})
  >;
  /** Required. The list of scopes that the OauthClient is allowed to request during OAuth flows. The following scopes are supported: * `https://www.googleapis.com/auth/cloud-platform`: See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account. */
  allowedScopes?: Array<string>;
  /** Required. The list of redirect uris that is allowed to redirect back when authorization process is completed. */
  allowedRedirectUris?: Array<string>;
  /** Output only. Time after which the OauthClient will be permanently purged and cannot be recovered. */
  expireTime?: string;
}

export const OauthClient: Schema.Schema<OauthClient> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    clientId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    clientType: Schema.optional(Schema.String),
    allowedGrantTypes: Schema.optional(Schema.Array(Schema.String)),
    allowedScopes: Schema.optional(Schema.Array(Schema.String)),
    allowedRedirectUris: Schema.optional(Schema.Array(Schema.String)),
    expireTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "OauthClient" }) as any as Schema.Schema<OauthClient>;

export interface ListOauthClientsResponse {
  /** A list of OauthClients. */
  oauthClients?: Array<OauthClient>;
  /** Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListOauthClientsResponse: Schema.Schema<ListOauthClientsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      oauthClients: Schema.optional(Schema.Array(OauthClient)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOauthClientsResponse",
  }) as any as Schema.Schema<ListOauthClientsResponse>;

export interface UndeleteOauthClientRequest {}

export const UndeleteOauthClientRequest: Schema.Schema<UndeleteOauthClientRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteOauthClientRequest",
  }) as any as Schema.Schema<UndeleteOauthClientRequest>;

export interface OauthClientCredential {
  /** Immutable. Identifier. The resource name of the OauthClientCredential. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}/credentials/{credential}` */
  name?: string;
  /** Optional. Whether the OauthClientCredential is disabled. You cannot use a disabled OauthClientCredential. */
  disabled?: boolean;
  /** Output only. The system-generated OAuth client secret. The client secret must be stored securely. If the client secret is leaked, you must delete and re-create the client credential. To learn more, see [OAuth client and credential security risks and mitigations](https://cloud.google.com/iam/docs/workforce-oauth-app#security) */
  clientSecret?: string;
  /** Optional. A user-specified display name of the OauthClientCredential. Cannot exceed 32 characters. */
  displayName?: string;
}

export const OauthClientCredential: Schema.Schema<OauthClientCredential> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      clientSecret: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OauthClientCredential",
  }) as any as Schema.Schema<OauthClientCredential>;

export interface ListOauthClientCredentialsResponse {
  /** A list of OauthClientCredentials. */
  oauthClientCredentials?: Array<OauthClientCredential>;
}

export const ListOauthClientCredentialsResponse: Schema.Schema<ListOauthClientCredentialsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      oauthClientCredentials: Schema.optional(
        Schema.Array(OauthClientCredential),
      ),
    }),
  ).annotate({
    identifier: "ListOauthClientCredentialsResponse",
  }) as any as Schema.Schema<ListOauthClientCredentialsResponse>;

export interface ServiceConfig {
  /** Optional. Domain name of the service. Example: console.cloud.google */
  domain?: string;
}

export const ServiceConfig: Schema.Schema<ServiceConfig> = Schema.suspend(() =>
  Schema.Struct({
    domain: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ServiceConfig",
}) as any as Schema.Schema<ServiceConfig>;

export interface AccessRestrictions {
  /** Optional. Immutable. Services allowed for web sign-in with the workforce pool. If not set by default there are no restrictions. */
  allowedServices?: Array<ServiceConfig>;
  /** Optional. Disable programmatic sign-in by disabling token issue via the Security Token API endpoint. See [Security Token Service API] (https://cloud.google.com/iam/docs/reference/sts/rest). */
  disableProgrammaticSignin?: boolean;
}

export const AccessRestrictions: Schema.Schema<AccessRestrictions> =
  Schema.suspend(() =>
    Schema.Struct({
      allowedServices: Schema.optional(Schema.Array(ServiceConfig)),
      disableProgrammaticSignin: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccessRestrictions",
  }) as any as Schema.Schema<AccessRestrictions>;

export interface WorkforcePool {
  /** Identifier. The resource name of the pool. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  name?: string;
  /** Immutable. The resource name of the parent. Format: `organizations/{org-id}`. */
  parent?: string;
  /** Optional. A display name for the pool. Cannot exceed 32 characters. */
  displayName?: string;
  /** Optional. A description of the pool. Cannot exceed 256 characters. */
  description?: string;
  /** Output only. The state of the pool. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Disables the workforce pool. You cannot use a disabled pool to exchange tokens, or use existing tokens to access resources. If the pool is re-enabled, existing tokens grant access again. */
  disabled?: boolean;
  /** Optional. Duration that the Google Cloud access tokens, console sign-in sessions, and `gcloud` sign-in sessions from this pool are valid. Must be greater than 15 minutes (900s) and less than 12 hours (43200s). If `session_duration` is not configured, minted credentials have a default duration of one hour (3600s). For SAML providers, the lifetime of the token is the minimum of the `session_duration` and the `SessionNotOnOrAfter` claim in the SAML assertion. */
  sessionDuration?: string;
  /** Output only. Time after which the workforce pool will be permanently purged and cannot be recovered. */
  expireTime?: string;
  /** Optional. Configure access restrictions on the workforce pool users. This is an optional field. If specified web sign-in can be restricted to given set of services or programmatic sign-in can be disabled for pool users. */
  accessRestrictions?: AccessRestrictions;
}

export const WorkforcePool: Schema.Schema<WorkforcePool> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    parent: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    sessionDuration: Schema.optional(Schema.String),
    expireTime: Schema.optional(Schema.String),
    accessRestrictions: Schema.optional(AccessRestrictions),
  }),
).annotate({
  identifier: "WorkforcePool",
}) as any as Schema.Schema<WorkforcePool>;

export interface ListWorkforcePoolsResponse {
  /** A list of pools. */
  workforcePools?: Array<WorkforcePool>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkforcePoolsResponse: Schema.Schema<ListWorkforcePoolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workforcePools: Schema.optional(Schema.Array(WorkforcePool)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkforcePoolsResponse",
  }) as any as Schema.Schema<ListWorkforcePoolsResponse>;

export interface UndeleteWorkforcePoolRequest {}

export const UndeleteWorkforcePoolRequest: Schema.Schema<UndeleteWorkforcePoolRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkforcePoolRequest",
  }) as any as Schema.Schema<UndeleteWorkforcePoolRequest>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      requestedPolicyVersion: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "GetPolicyOptions",
}) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(GetPolicyOptions),
    }),
  ).annotate({
    identifier: "GetIamPolicyRequest",
  }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface GoogleIamAdminV1WorkforcePoolProviderSaml {
  /** Required. SAML Identity provider configuration metadata xml doc. The xml document should comply with [SAML 2.0 specification](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The max size of the acceptable xml document will be bounded to 128k characters. The metadata xml document should satisfy the following constraints: 1) Must contain an Identity Provider Entity ID. 2) Must contain at least one non-expired signing key certificate. 3) For each signing key: a) Valid from should be no more than 7 days from now. b) Valid to should be no more than 25 years in the future. 4) Up to 3 IdP signing keys are allowed in the metadata xml. When updating the provider's metadata xml, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata. */
  idpMetadataXml?: string;
}

export const GoogleIamAdminV1WorkforcePoolProviderSaml: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderSaml> =
  Schema.suspend(() =>
    Schema.Struct({
      idpMetadataXml: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleIamAdminV1WorkforcePoolProviderSaml",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderSaml>;

export interface GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue {
  /** Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response. */
  plainText?: string;
  /** Output only. A thumbprint to represent the current client secret value. */
  thumbprint?: string;
}

export const GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue> =
  Schema.suspend(() =>
    Schema.Struct({
      plainText: Schema.optional(Schema.String),
      thumbprint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue>;

export interface GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret {
  /** The value of the client secret. */
  value?: GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue;
}

export const GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue,
      ),
    }),
  ).annotate({
    identifier: "GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret>;

export interface GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig {
  /** Required. The Response Type to request for in the OIDC Authorization Request for web sign-in. The `CODE` Response Type is recommended to avoid the Implicit Flow, for security reasons. */
  responseType?:
    | "RESPONSE_TYPE_UNSPECIFIED"
    | "CODE"
    | "ID_TOKEN"
    | (string & {});
  /** Required. The behavior for how OIDC Claims are included in the `assertion` object used for attribute mapping and attribute condition. */
  assertionClaimsBehavior?:
    | "ASSERTION_CLAIMS_BEHAVIOR_UNSPECIFIED"
    | "MERGE_USER_INFO_OVER_ID_TOKEN_CLAIMS"
    | "ONLY_ID_TOKEN_CLAIMS"
    | (string & {});
  /** Optional. Additional scopes to request for in the OIDC authentication request on top of scopes requested by default. By default, the `openid`, `profile` and `email` scopes that are supported by the identity provider are requested. Each additional scope may be at most 256 characters. A maximum of 10 additional scopes may be configured. */
  additionalScopes?: Array<string>;
}

export const GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      responseType: Schema.optional(Schema.String),
      assertionClaimsBehavior: Schema.optional(Schema.String),
      additionalScopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig>;

export interface GoogleIamAdminV1WorkforcePoolProviderOidc {
  /** Required. The OIDC issuer URI. Must be a valid URI using the `https` scheme. */
  issuerUri?: string;
  /** Required. The client ID. Must match the audience claim of the JWT issued by the identity provider. */
  clientId?: string;
  /** Optional. The optional client secret. Required to enable Authorization Code flow for web sign-in. */
  clientSecret?: GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret;
  /** Required. Configuration for web single sign-on for the OIDC provider. Here, web sign-in refers to console sign-in and gcloud sign-in through the browser. */
  webSsoConfig?: GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig;
  /** Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document that is fetched from the well-known path of the `issuer_uri`, will be used. RSA and EC asymmetric keys are supported. The JWK must use the following format and include only the following fields: { "keys": [ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } ] } */
  jwksJson?: string;
}

export const GoogleIamAdminV1WorkforcePoolProviderOidc: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidc> =
  Schema.suspend(() =>
    Schema.Struct({
      issuerUri: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret,
      ),
      webSsoConfig: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig,
      ),
      jwksJson: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleIamAdminV1WorkforcePoolProviderOidc",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderOidc>;

export interface GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters {
  /** Optional. The filter used to request specific records from the IdP. By default, all of the groups that are associated with a user are fetched. For Microsoft Entra ID, you can add `$search` query parameters using [Keyword Query Language] (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). To learn more about `$search` querying in Microsoft Entra ID, see [Use the `$search` query parameter] (https://learn.microsoft.com/en-us/graph/search-query-parameter). Additionally, Workforce Identity Federation automatically adds the following [`$filter` query parameters] (https://learn.microsoft.com/en-us/graph/filter-query-parameter), based on the value of `attributes_type`. Values passed to `filter` are converted to `$search` query parameters. Additional `$filter` query parameters cannot be added using this field. * `AZURE_AD_GROUPS_MAIL`: `mailEnabled` and `securityEnabled` filters are applied. * `AZURE_AD_GROUPS_ID`: `securityEnabled` filter is applied. */
  filter?: string;
}

export const GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters> =
  Schema.suspend(() =>
    Schema.Struct({
      filter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters>;

export interface GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client {
  /** Required. The OIDC identity provider's issuer URI. Must be a valid URI using the `https` scheme. Required to get the OIDC discovery document. */
  issuerUri?: string;
  /** Required. The OAuth 2.0 client ID for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow. */
  clientId?: string;
  /** Required. The OAuth 2.0 client secret for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow. */
  clientSecret?: GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret;
  /** Required. Represents the IdP and type of claims that should be fetched. */
  attributesType?:
    | "ATTRIBUTES_TYPE_UNSPECIFIED"
    | "AZURE_AD_GROUPS_MAIL"
    | "AZURE_AD_GROUPS_ID"
    | "AZURE_AD_GROUPS_DISPLAY_NAME"
    | (string & {});
  /** Optional. Represents the parameters to control which claims are fetched from an IdP. */
  queryParameters?: GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters;
}

export const GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client: Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client> =
  Schema.suspend(() =>
    Schema.Struct({
      issuerUri: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret,
      ),
      attributesType: Schema.optional(Schema.String),
      queryParameters: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client",
  }) as any as Schema.Schema<GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client>;

export interface WorkforcePoolProvider {
  /** Identifier. The resource name of the provider. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` */
  name?: string;
  /** Optional. A display name for the provider. Cannot exceed 32 characters. */
  displayName?: string;
  /** Optional. A description of the provider. Cannot exceed 256 characters. */
  description?: string;
  /** Output only. The state of the provider. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Disables the workforce pool provider. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access. */
  disabled?: boolean;
  /** Required. Maps attributes from the authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. * `google.groups`: Groups the authenticating user belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. * `google.display_name`: The name of the authenticated user. This is an optional field and the mapped display name cannot exceed 100 bytes. If not set, `google.subject` will be displayed instead. This attribute cannot be referenced in IAM bindings. * `google.profile_photo`: The URL that specifies the authenticated user's thumbnail photo. This is an optional field. When set, the image will be visible as the user's profile picture. If not set, a generic user icon will be displayed instead. This attribute cannot be referenced in IAM bindings. * `google.posix_username`: The Linux username used by OS Login. This is an optional field and the mapped POSIX username cannot exceed 32 characters. The key must match the regex `^a-zA-Z0-9._{0,31}$`. This attribute cannot be referenced in IAM bindings. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where {custom_attribute} is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters `[a-z0-9_]`. You can reference these attributes in IAM policies to define fine-grained access for a workforce pool to Google Cloud resources. For example: * `google.subject`: `principal://iam.googleapis.com/locations/global/workforcePools/{pool}/subject/{value}` * `google.groups`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/group/{value}` * `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 16 KB. For OIDC providers, you must supply a custom mapping that includes the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: ``` {"google.subject": "assertion.sub"} ``` */
  attributeMapping?: Record<string, string>;
  /** Optional. A [Common Expression Language](https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: * `assertion`: JSON representing the authentication credential issued by the provider. * `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. `google.profile_photo`, `google.display_name` and `google.posix_username` are not supported. * `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credentials will be accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: ``` "'admins' in google.groups" ``` */
  attributeCondition?: string;
  /** A SAML identity provider configuration. */
  saml?: GoogleIamAdminV1WorkforcePoolProviderSaml;
  /** An OpenID Connect 1.0 identity provider configuration. */
  oidc?: GoogleIamAdminV1WorkforcePoolProviderOidc;
  /** Output only. Time after which the workforce identity pool provider will be permanently purged and cannot be recovered. */
  expireTime?: string;
  /** Optional. Defines the configuration for the OAuth 2.0 client that is used to get the additional user attributes in a separate backchannel call to the identity provider. This should be used when users can't get the required claims in authentication credentials. Currently, the OAuth 2.0 protocol is the only supported authorization method for this backchannel call. */
  extraAttributesOauth2Client?: GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client;
  /** Optional. If true, populates additional debug information in Cloud Audit Logs for this provider. Logged attribute mappings and values can be found in `sts.googleapis.com` data access logs. Default value is false. */
  detailedAuditLogging?: boolean;
  /** Optional. The configuration for OAuth 2.0 client used to get the extended group memberships for user identities. Only the `AZURE_AD_GROUPS_ID` attribute type is supported. Extended groups supports a subset of Google Cloud services. When the user accesses these services, extended group memberships override the mapped `google.groups` attribute. Extended group memberships cannot be used in attribute mapping or attribute condition expressions. To keep extended group memberships up to date, extended groups are retrieved when the user signs in and at regular intervals during the user's active session. Each user identity in the workforce identity pool must map to a unique Microsoft Entra ID user. */
  extendedAttributesOauth2Client?: GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client;
  /** Optional. Gemini Enterprise only. Specifies whether the workforce identity pool provider uses SCIM-managed groups instead of the `google.groups` attribute mapping for authorization checks. The `scim_usage` and `extended_attributes_oauth2_client` fields are mutually exclusive. A request that enables both fields on the same workforce identity pool provider will produce an error. */
  scimUsage?: "SCIM_USAGE_UNSPECIFIED" | "ENABLED_FOR_GROUPS" | (string & {});
}

export const WorkforcePoolProvider: Schema.Schema<WorkforcePoolProvider> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      attributeMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      attributeCondition: Schema.optional(Schema.String),
      saml: Schema.optional(GoogleIamAdminV1WorkforcePoolProviderSaml),
      oidc: Schema.optional(GoogleIamAdminV1WorkforcePoolProviderOidc),
      expireTime: Schema.optional(Schema.String),
      extraAttributesOauth2Client: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client,
      ),
      detailedAuditLogging: Schema.optional(Schema.Boolean),
      extendedAttributesOauth2Client: Schema.optional(
        GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client,
      ),
      scimUsage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkforcePoolProvider",
  }) as any as Schema.Schema<WorkforcePoolProvider>;

export interface ListWorkforcePoolProvidersResponse {
  /** A list of providers. */
  workforcePoolProviders?: Array<WorkforcePoolProvider>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkforcePoolProvidersResponse: Schema.Schema<ListWorkforcePoolProvidersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workforcePoolProviders: Schema.optional(
        Schema.Array(WorkforcePoolProvider),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkforcePoolProvidersResponse",
  }) as any as Schema.Schema<ListWorkforcePoolProvidersResponse>;

export interface UndeleteWorkforcePoolProviderRequest {}

export const UndeleteWorkforcePoolProviderRequest: Schema.Schema<UndeleteWorkforcePoolProviderRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkforcePoolProviderRequest",
  }) as any as Schema.Schema<UndeleteWorkforcePoolProviderRequest>;

export interface KeyData {
  /** Output only. The format of the key. */
  format?: "KEY_FORMAT_UNSPECIFIED" | "RSA_X509_PEM" | (string & {});
  /** Output only. Earliest timestamp when this key is valid. Attempts to use this key before this time will fail. Only present if the key data represents a X.509 certificate. */
  notBeforeTime?: string;
  /** Output only. Latest timestamp when this key is valid. Attempts to use this key after this time will fail. Only present if the key data represents a X.509 certificate. */
  notAfterTime?: string;
  /** Output only. The key data. The format of the key is represented by the format field. */
  key?: string;
  /** Required. The specifications for the key. */
  keySpec?:
    | "KEY_SPEC_UNSPECIFIED"
    | "RSA_2048"
    | "RSA_3072"
    | "RSA_4096"
    | (string & {});
}

export const KeyData: Schema.Schema<KeyData> = Schema.suspend(() =>
  Schema.Struct({
    format: Schema.optional(Schema.String),
    notBeforeTime: Schema.optional(Schema.String),
    notAfterTime: Schema.optional(Schema.String),
    key: Schema.optional(Schema.String),
    keySpec: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "KeyData" }) as any as Schema.Schema<KeyData>;

export interface WorkforcePoolProviderKey {
  /** Identifier. The resource name of the key. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}/keys/{key_id}` */
  name?: string;
  /** Immutable. Public half of the asymmetric key. */
  keyData?: KeyData;
  /** Output only. The state of the key. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Required. The purpose of the key. */
  use?: "KEY_USE_UNSPECIFIED" | "ENCRYPTION" | (string & {});
  /** Output only. The time after which the key will be permanently deleted and cannot be recovered. Note that the key may get purged before this time if the total limit of keys per provider is exceeded. */
  expireTime?: string;
}

export const WorkforcePoolProviderKey: Schema.Schema<WorkforcePoolProviderKey> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      keyData: Schema.optional(KeyData),
      state: Schema.optional(Schema.String),
      use: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkforcePoolProviderKey",
  }) as any as Schema.Schema<WorkforcePoolProviderKey>;

export interface ListWorkforcePoolProviderKeysResponse {
  /** A list of WorkforcePoolProviderKeys. */
  workforcePoolProviderKeys?: Array<WorkforcePoolProviderKey>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkforcePoolProviderKeysResponse: Schema.Schema<ListWorkforcePoolProviderKeysResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workforcePoolProviderKeys: Schema.optional(
        Schema.Array(WorkforcePoolProviderKey),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkforcePoolProviderKeysResponse",
  }) as any as Schema.Schema<ListWorkforcePoolProviderKeysResponse>;

export interface UndeleteWorkforcePoolProviderKeyRequest {}

export const UndeleteWorkforcePoolProviderKeyRequest: Schema.Schema<UndeleteWorkforcePoolProviderKeyRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkforcePoolProviderKeyRequest",
  }) as any as Schema.Schema<UndeleteWorkforcePoolProviderKeyRequest>;

export interface UndeleteWorkforcePoolSubjectRequest {}

export const UndeleteWorkforcePoolSubjectRequest: Schema.Schema<UndeleteWorkforcePoolSubjectRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkforcePoolSubjectRequest",
  }) as any as Schema.Schema<UndeleteWorkforcePoolSubjectRequest>;

export interface WorkforcePoolProviderScimTenant {
  /** Identifier. Gemini Enterprise only. The resource name of the SCIM Tenant. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}` */
  name?: string;
  /** Output only. Gemini Enterprise only. Represents the base URI as defined in [RFC 7644, Section 1.3](https://datatracker.ietf.org/doc/html/rfc7644#section-1.3). Clients must use this as the root address for managing resources under the tenant. Format: https://iamscim.googleapis.com/{version}/{tenant_id}/ */
  baseUri?: string;
  /** Output only. Gemini Enterprise only. The state of the tenant. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Gemini Enterprise only. The description of the SCIM tenant. Cannot exceed 256 characters. */
  description?: string;
  /** Optional. Gemini Enterprise only. The display name of the SCIM tenant. Cannot exceed 32 characters. */
  displayName?: string;
  /** Required. Immutable. Gemini Enterprise only. Maps SCIM attributes to Google attributes. This mapping is used to associate the attributes synced via SCIM with the Google Cloud attributes used in IAM policies for Workforce Identity Federation. SCIM-managed user and group attributes are mapped to `google.subject` and `google.group` respectively. Each key must be a string specifying the Google Cloud IAM attribute to map to. The supported keys are as follows: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. * `google.group`: Group the authenticating user belongs to. You can grant group access to resources using an IAM `principalSet` binding; access applies to all members of the group. Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) expression that maps SCIM user or group attribute to the normalized attribute specified by the corresponding map key. Example: To map the SCIM user's `externalId` to `google.subject` and the SCIM group's `externalId` to `google.group`: ``` { "google.subject": "user.externalId", "google.group": "group.externalId" } ``` */
  claimMapping?: Record<string, string>;
  /** Output only. Gemini Enterprise only. The timestamp that represents the time when the SCIM tenant is purged. */
  purgeTime?: string;
  /** Output only. Service Agent created by SCIM Tenant API. SCIM tokens created under this tenant will be attached to this service agent. */
  serviceAgent?: string;
}

export const WorkforcePoolProviderScimTenant: Schema.Schema<WorkforcePoolProviderScimTenant> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      baseUri: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      claimMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      purgeTime: Schema.optional(Schema.String),
      serviceAgent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkforcePoolProviderScimTenant",
  }) as any as Schema.Schema<WorkforcePoolProviderScimTenant>;

export interface ListWorkforcePoolProviderScimTenantsResponse {
  /** Output only. Gemini Enterprise only. A list of SCIM tenants. */
  workforcePoolProviderScimTenants?: Array<WorkforcePoolProviderScimTenant>;
  /** Optional. Gemini Enterprise only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkforcePoolProviderScimTenantsResponse: Schema.Schema<ListWorkforcePoolProviderScimTenantsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workforcePoolProviderScimTenants: Schema.optional(
        Schema.Array(WorkforcePoolProviderScimTenant),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkforcePoolProviderScimTenantsResponse",
  }) as any as Schema.Schema<ListWorkforcePoolProviderScimTenantsResponse>;

export interface UndeleteWorkforcePoolProviderScimTenantRequest {}

export const UndeleteWorkforcePoolProviderScimTenantRequest: Schema.Schema<UndeleteWorkforcePoolProviderScimTenantRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkforcePoolProviderScimTenantRequest",
  }) as any as Schema.Schema<UndeleteWorkforcePoolProviderScimTenantRequest>;

export interface WorkforcePoolProviderScimToken {
  /** Identifier. Gemini Enterprise only. The resource name of the SCIM Token. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}/tokens/{token}` */
  name?: string;
  /** Output only. Gemini Enterprise only. The token string. Provide this to the IdP for authentication. Will be set only during creation. */
  securityToken?: string;
  /** Output only. Gemini Enterprise only. The state of the token. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Gemini Enterprise only. The display name of the SCIM token. Cannot exceed 32 characters. */
  displayName?: string;
}

export const WorkforcePoolProviderScimToken: Schema.Schema<WorkforcePoolProviderScimToken> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      securityToken: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkforcePoolProviderScimToken",
  }) as any as Schema.Schema<WorkforcePoolProviderScimToken>;

export interface ListWorkforcePoolProviderScimTokensResponse {
  /** Output only. Gemini Enterprise only. A list of SCIM tokens. */
  workforcePoolProviderScimTokens?: Array<WorkforcePoolProviderScimToken>;
  /** Optional. Gemini Enterprise only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkforcePoolProviderScimTokensResponse: Schema.Schema<ListWorkforcePoolProviderScimTokensResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workforcePoolProviderScimTokens: Schema.optional(
        Schema.Array(WorkforcePoolProviderScimToken),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkforcePoolProviderScimTokensResponse",
  }) as any as Schema.Schema<ListWorkforcePoolProviderScimTokensResponse>;

export interface UndeleteWorkforcePoolProviderScimTokenRequest {}

export const UndeleteWorkforcePoolProviderScimTokenRequest: Schema.Schema<UndeleteWorkforcePoolProviderScimTokenRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkforcePoolProviderScimTokenRequest",
  }) as any as Schema.Schema<UndeleteWorkforcePoolProviderScimTokenRequest>;

export interface InlineCertificateIssuanceConfig {
  /** Optional. A required mapping of a Google Cloud region to the CA pool resource located in that region. The CA pool is used for certificate issuance, adhering to the following constraints: * Key format: A supported cloud region name equivalent to the location identifier in the corresponding map entry's value. * Value format: A valid CA pool resource path format like: "projects/{project}/locations/{location}/caPools/{ca_pool}" * Region Matching: Workloads are ONLY issued certificates from CA pools within the same region. Also the CA pool region (in value) must match the workload's region (key). */
  caPools?: Record<string, string>;
  /** Optional. Lifetime of the workload certificates issued by the CA pool. Must be between 24 hours and 30 days. If not specified, this will be defaulted to 24 hours. */
  lifetime?: string;
  /** Optional. Rotation window percentage, the percentage of remaining lifetime after which certificate rotation is initiated. Must be between 50 and 80. If no value is specified, rotation window percentage is defaulted to 50. */
  rotationWindowPercentage?: number;
  /** Optional. Key algorithm to use when generating the key pair. This key pair will be used to create the certificate. If not specified, this will default to ECDSA_P256. */
  keyAlgorithm?:
    | "KEY_ALGORITHM_UNSPECIFIED"
    | "RSA_2048"
    | "RSA_3072"
    | "RSA_4096"
    | "ECDSA_P256"
    | "ECDSA_P384"
    | (string & {});
}

export const InlineCertificateIssuanceConfig: Schema.Schema<InlineCertificateIssuanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      caPools: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      lifetime: Schema.optional(Schema.String),
      rotationWindowPercentage: Schema.optional(Schema.Number),
      keyAlgorithm: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InlineCertificateIssuanceConfig",
  }) as any as Schema.Schema<InlineCertificateIssuanceConfig>;

export interface TrustAnchor {
  /** PEM certificate of the PKI used for validation. Must only contain one ca certificate (either root or intermediate cert). */
  pemCertificate?: string;
}

export const TrustAnchor: Schema.Schema<TrustAnchor> = Schema.suspend(() =>
  Schema.Struct({
    pemCertificate: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TrustAnchor" }) as any as Schema.Schema<TrustAnchor>;

export interface IntermediateCA {
  /** PEM certificate of the PKI used for validation. Must only contain one ca certificate. */
  pemCertificate?: string;
}

export const IntermediateCA: Schema.Schema<IntermediateCA> = Schema.suspend(
  () =>
    Schema.Struct({
      pemCertificate: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "IntermediateCA",
}) as any as Schema.Schema<IntermediateCA>;

export interface TrustStore {
  /** Required. List of trust anchors to be used while performing validation against a given TrustStore. The incoming end entity's certificate must be in the trust chain of one of the trust anchors here. */
  trustAnchors?: Array<TrustAnchor>;
  /** Optional. Set of intermediate CA certificates used for building the trust chain to the trust anchor. Important: Intermediate CAs are only supported for X.509 federation. */
  intermediateCas?: Array<IntermediateCA>;
}

export const TrustStore: Schema.Schema<TrustStore> = Schema.suspend(() =>
  Schema.Struct({
    trustAnchors: Schema.optional(Schema.Array(TrustAnchor)),
    intermediateCas: Schema.optional(Schema.Array(IntermediateCA)),
  }),
).annotate({ identifier: "TrustStore" }) as any as Schema.Schema<TrustStore>;

export interface InlineTrustConfig {
  /** Optional. Maps specific trust domains (e.g., "example.com") to their corresponding TrustStore, which contain the trusted root certificates for that domain. There can be a maximum of 10 trust domain entries in this map. Note that a trust domain automatically trusts itself and don't need to be specified here. If however, this WorkloadIdentityPool's trust domain contains any trust anchors in the additional_trust_bundles map, those trust anchors will be *appended to* the trust bundle automatically derived from your InlineCertificateIssuanceConfig's ca_pools. */
  additionalTrustBundles?: Record<string, TrustStore>;
}

export const InlineTrustConfig: Schema.Schema<InlineTrustConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      additionalTrustBundles: Schema.optional(
        Schema.Record(Schema.String, TrustStore),
      ),
    }),
  ).annotate({
    identifier: "InlineTrustConfig",
  }) as any as Schema.Schema<InlineTrustConfig>;

export interface WorkloadIdentityPool {
  /** Identifier. The resource name of the pool. */
  name?: string;
  /** Optional. A display name for the pool. Cannot exceed 32 characters. */
  displayName?: string;
  /** Optional. A description of the pool. Cannot exceed 256 characters. */
  description?: string;
  /** Output only. The state of the pool. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Whether the pool is disabled. You cannot use a disabled pool to exchange tokens, or use existing tokens to access resources. If the pool is re-enabled, existing tokens grant access again. */
  disabled?: boolean;
  /** Immutable. The mode the pool is operating in. */
  mode?:
    | "MODE_UNSPECIFIED"
    | "FEDERATION_ONLY"
    | "TRUST_DOMAIN"
    | "SYSTEM_TRUST_DOMAIN"
    | (string & {});
  /** Output only. Time after which the workload identity pool will be permanently purged and cannot be recovered. */
  expireTime?: string;
  /** Optional. Defines the Certificate Authority (CA) pool resources and configurations required for issuance and rotation of mTLS workload certificates. */
  inlineCertificateIssuanceConfig?: InlineCertificateIssuanceConfig;
  /** Optional. Represents config to add additional trusted trust domains. */
  inlineTrustConfig?: InlineTrustConfig;
}

export const WorkloadIdentityPool: Schema.Schema<WorkloadIdentityPool> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      mode: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      inlineCertificateIssuanceConfig: Schema.optional(
        InlineCertificateIssuanceConfig,
      ),
      inlineTrustConfig: Schema.optional(InlineTrustConfig),
    }),
  ).annotate({
    identifier: "WorkloadIdentityPool",
  }) as any as Schema.Schema<WorkloadIdentityPool>;

export interface ListWorkloadIdentityPoolsResponse {
  /** A list of pools. */
  workloadIdentityPools?: Array<WorkloadIdentityPool>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkloadIdentityPoolsResponse: Schema.Schema<ListWorkloadIdentityPoolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workloadIdentityPools: Schema.optional(
        Schema.Array(WorkloadIdentityPool),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkloadIdentityPoolsResponse",
  }) as any as Schema.Schema<ListWorkloadIdentityPoolsResponse>;

export interface UndeleteWorkloadIdentityPoolRequest {}

export const UndeleteWorkloadIdentityPoolRequest: Schema.Schema<UndeleteWorkloadIdentityPoolRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkloadIdentityPoolRequest",
  }) as any as Schema.Schema<UndeleteWorkloadIdentityPoolRequest>;

export interface OwnerService {
  /** Required. The service agent principal subject, e.g. "serviceAccount:service-1234@gcp-sa-gkehub.iam.gserviceaccount.com". */
  principalSubject?: string;
}

export const OwnerService: Schema.Schema<OwnerService> = Schema.suspend(() =>
  Schema.Struct({
    principalSubject: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "OwnerService",
}) as any as Schema.Schema<OwnerService>;

export interface WorkloadIdentityPoolNamespace {
  /** Identifier. The resource name of the namespace. */
  name?: string;
  /** Optional. A description of the namespace. Cannot exceed 256 characters. */
  description?: string;
  /** Output only. The state of the namespace. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Whether the namespace is disabled. If disabled, credentials may no longer be issued for identities within this namespace, however existing credentials will still be accepted until they expire. */
  disabled?: boolean;
  /** Output only. Time after which the namespace will be permanently purged and cannot be recovered. */
  expireTime?: string;
  /** Output only. The Google Cloud service that owns this namespace. */
  ownerService?: OwnerService;
}

export const WorkloadIdentityPoolNamespace: Schema.Schema<WorkloadIdentityPoolNamespace> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      expireTime: Schema.optional(Schema.String),
      ownerService: Schema.optional(OwnerService),
    }),
  ).annotate({
    identifier: "WorkloadIdentityPoolNamespace",
  }) as any as Schema.Schema<WorkloadIdentityPoolNamespace>;

export interface ListWorkloadIdentityPoolNamespacesResponse {
  /** A list of namespaces. */
  workloadIdentityPoolNamespaces?: Array<WorkloadIdentityPoolNamespace>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkloadIdentityPoolNamespacesResponse: Schema.Schema<ListWorkloadIdentityPoolNamespacesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workloadIdentityPoolNamespaces: Schema.optional(
        Schema.Array(WorkloadIdentityPoolNamespace),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkloadIdentityPoolNamespacesResponse",
  }) as any as Schema.Schema<ListWorkloadIdentityPoolNamespacesResponse>;

export interface UndeleteWorkloadIdentityPoolNamespaceRequest {}

export const UndeleteWorkloadIdentityPoolNamespaceRequest: Schema.Schema<UndeleteWorkloadIdentityPoolNamespaceRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkloadIdentityPoolNamespaceRequest",
  }) as any as Schema.Schema<UndeleteWorkloadIdentityPoolNamespaceRequest>;

export interface WorkloadIdentityPoolManagedIdentity {
  /** Identifier. The resource name of the managed identity. */
  name?: string;
  /** Optional. A description of the managed identity. Cannot exceed 256 characters. */
  description?: string;
  /** Output only. The state of the managed identity. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Whether the managed identity is disabled. If disabled, credentials may no longer be issued for the identity, however existing credentials will still be accepted until they expire. */
  disabled?: boolean;
  /** Output only. Time after which the managed identity will be permanently purged and cannot be recovered. */
  expireTime?: string;
}

export const WorkloadIdentityPoolManagedIdentity: Schema.Schema<WorkloadIdentityPoolManagedIdentity> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityPoolManagedIdentity",
  }) as any as Schema.Schema<WorkloadIdentityPoolManagedIdentity>;

export interface ListWorkloadIdentityPoolManagedIdentitiesResponse {
  /** A list of managed identities. */
  workloadIdentityPoolManagedIdentities?: Array<WorkloadIdentityPoolManagedIdentity>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkloadIdentityPoolManagedIdentitiesResponse: Schema.Schema<ListWorkloadIdentityPoolManagedIdentitiesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workloadIdentityPoolManagedIdentities: Schema.optional(
        Schema.Array(WorkloadIdentityPoolManagedIdentity),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkloadIdentityPoolManagedIdentitiesResponse",
  }) as any as Schema.Schema<ListWorkloadIdentityPoolManagedIdentitiesResponse>;

export interface UndeleteWorkloadIdentityPoolManagedIdentityRequest {}

export const UndeleteWorkloadIdentityPoolManagedIdentityRequest: Schema.Schema<UndeleteWorkloadIdentityPoolManagedIdentityRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkloadIdentityPoolManagedIdentityRequest",
  }) as any as Schema.Schema<UndeleteWorkloadIdentityPoolManagedIdentityRequest>;

export interface Aws {
  /** Required. The AWS account ID. */
  accountId?: string;
}

export const Aws: Schema.Schema<Aws> = Schema.suspend(() =>
  Schema.Struct({
    accountId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Aws" }) as any as Schema.Schema<Aws>;

export interface Oidc {
  /** Required. The OIDC issuer URL. Must be an HTTPS endpoint. Per OpenID Connect Discovery 1.0 spec, the OIDC issuer URL is used to locate the provider's public keys (via `jwks_uri`) for verifying tokens like the OIDC ID token. These public key types must be 'EC' or 'RSA'. */
  issuerUri?: string;
  /** Optional. Acceptable values for the `aud` field (audience) in the OIDC token. Token exchange requests are rejected if the token audience does not match one of the configured values. Each audience may be at most 256 characters. A maximum of 10 audiences may be configured. If this list is empty, the OIDC token audience must be equal to the full canonical resource name of the WorkloadIdentityPoolProvider, with or without the HTTPS prefix. For example: ``` //iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ https://iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ ``` */
  allowedAudiences?: Array<string>;
  /** Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document(fetched from the .well-known path of the `issuer_uri`) will be used. Currently, RSA and EC asymmetric keys are supported. The JWK must use following format and include only the following fields: { "keys": [ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } ] } */
  jwksJson?: string;
}

export const Oidc: Schema.Schema<Oidc> = Schema.suspend(() =>
  Schema.Struct({
    issuerUri: Schema.optional(Schema.String),
    allowedAudiences: Schema.optional(Schema.Array(Schema.String)),
    jwksJson: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Oidc" }) as any as Schema.Schema<Oidc>;

export interface Saml {
  /** Required. SAML identity provider (IdP) configuration metadata XML doc. The XML document must comply with the [SAML 2.0 specification](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The maximum size of an acceptable XML document is 128K characters. The SAML metadata XML document must satisfy the following constraints: * Must contain an IdP Entity ID. * Must contain at least one non-expired signing certificate. * For each signing certificate, the expiration must be: * From no more than 7 days in the future. * To no more than 25 years in the future. * Up to three IdP signing keys are allowed. When updating the provider's metadata XML, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata. */
  idpMetadataXml?: string;
}

export const Saml: Schema.Schema<Saml> = Schema.suspend(() =>
  Schema.Struct({
    idpMetadataXml: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Saml" }) as any as Schema.Schema<Saml>;

export interface X509 {
  /** Required. A TrustStore. Use this trust store as a wrapper to config the trust anchor and optional intermediate cas to help build the trust chain for the incoming end entity certificate. Follow the X.509 guidelines to define those PEM encoded certs. Only one trust store is currently supported. */
  trustStore?: TrustStore;
}

export const X509: Schema.Schema<X509> = Schema.suspend(() =>
  Schema.Struct({
    trustStore: Schema.optional(TrustStore),
  }),
).annotate({ identifier: "X509" }) as any as Schema.Schema<X509>;

export interface WorkloadIdentityPoolProvider {
  /** Identifier. The resource name of the provider. */
  name?: string;
  /** Optional. A display name for the provider. Cannot exceed 32 characters. */
  displayName?: string;
  /** Optional. A description for the provider. Cannot exceed 256 characters. */
  description?: string;
  /** Output only. The state of the provider. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Optional. Whether the provider is disabled. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access. */
  disabled?: boolean;
  /** Optional. Maps attributes from authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. Cannot exceed 127 bytes. * `google.groups`: Groups the external identity belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where `{custom_attribute}` is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters [a-z0-9_]. You can reference these attributes in IAM policies to define fine-grained access for a workload to Google Cloud resources. For example: * `google.subject`: `principal://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/subject/{value}` * `google.groups`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/group/{value}` * `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 8KB. For AWS providers, if no attribute mapping is defined, the following default mapping applies: ``` { "google.subject":"assertion.arn", "attribute.aws_role": "assertion.arn.contains('assumed-role')" " ? assertion.arn.extract('{account_arn}assumed-role/')" " + 'assumed-role/'" " + assertion.arn.extract('assumed-role/{role_name}/')" " : assertion.arn", } ``` If any custom attribute mappings are defined, they must include a mapping to the `google.subject` attribute. For OIDC providers, you must supply a custom mapping, which must include the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: ``` {"google.subject": "assertion.sub"} ``` */
  attributeMapping?: Record<string, string>;
  /** Optional. [A Common Expression Language](https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: * `assertion`: JSON representing the authentication credential issued by the provider. * `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. * `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credential are accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: ``` "'admins' in google.groups" ``` */
  attributeCondition?: string;
  /** An Amazon Web Services identity provider. */
  aws?: Aws;
  /** An OpenId Connect 1.0 identity provider. */
  oidc?: Oidc;
  /** An SAML 2.0 identity provider. */
  saml?: Saml;
  /** An X.509-type identity provider. */
  x509?: X509;
  /** Output only. Time after which the workload identity pool provider will be permanently purged and cannot be recovered. */
  expireTime?: string;
}

export const WorkloadIdentityPoolProvider: Schema.Schema<WorkloadIdentityPoolProvider> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      attributeMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      attributeCondition: Schema.optional(Schema.String),
      aws: Schema.optional(Aws),
      oidc: Schema.optional(Oidc),
      saml: Schema.optional(Saml),
      x509: Schema.optional(X509),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityPoolProvider",
  }) as any as Schema.Schema<WorkloadIdentityPoolProvider>;

export interface ListWorkloadIdentityPoolProvidersResponse {
  /** A list of providers. */
  workloadIdentityPoolProviders?: Array<WorkloadIdentityPoolProvider>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkloadIdentityPoolProvidersResponse: Schema.Schema<ListWorkloadIdentityPoolProvidersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workloadIdentityPoolProviders: Schema.optional(
        Schema.Array(WorkloadIdentityPoolProvider),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkloadIdentityPoolProvidersResponse",
  }) as any as Schema.Schema<ListWorkloadIdentityPoolProvidersResponse>;

export interface UndeleteWorkloadIdentityPoolProviderRequest {}

export const UndeleteWorkloadIdentityPoolProviderRequest: Schema.Schema<UndeleteWorkloadIdentityPoolProviderRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkloadIdentityPoolProviderRequest",
  }) as any as Schema.Schema<UndeleteWorkloadIdentityPoolProviderRequest>;

export interface WorkloadIdentityPoolProviderKey {
  /** Identifier. The resource name of the key. */
  name?: string;
  /** Immutable. Public half of the asymmetric key. */
  keyData?: KeyData;
  /** Output only. The state of the key. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Required. The purpose of the key. */
  use?: "KEY_USE_UNSPECIFIED" | "ENCRYPTION" | (string & {});
  /** Output only. Time after which the key will be permanently purged and cannot be recovered. Note that the key may get purged before this timestamp if the total limit of keys per provider is crossed. */
  expireTime?: string;
}

export const WorkloadIdentityPoolProviderKey: Schema.Schema<WorkloadIdentityPoolProviderKey> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      keyData: Schema.optional(KeyData),
      state: Schema.optional(Schema.String),
      use: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityPoolProviderKey",
  }) as any as Schema.Schema<WorkloadIdentityPoolProviderKey>;

export interface ListWorkloadIdentityPoolProviderKeysResponse {
  /** A list of WorkloadIdentityPoolProviderKey */
  workloadIdentityPoolProviderKeys?: Array<WorkloadIdentityPoolProviderKey>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListWorkloadIdentityPoolProviderKeysResponse: Schema.Schema<ListWorkloadIdentityPoolProviderKeysResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      workloadIdentityPoolProviderKeys: Schema.optional(
        Schema.Array(WorkloadIdentityPoolProviderKey),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListWorkloadIdentityPoolProviderKeysResponse",
  }) as any as Schema.Schema<ListWorkloadIdentityPoolProviderKeysResponse>;

export interface UndeleteWorkloadIdentityPoolProviderKeyRequest {}

export const UndeleteWorkloadIdentityPoolProviderKeyRequest: Schema.Schema<UndeleteWorkloadIdentityPoolProviderKeyRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteWorkloadIdentityPoolProviderKeyRequest",
  }) as any as Schema.Schema<UndeleteWorkloadIdentityPoolProviderKeyRequest>;

export interface AttestationRule {
  /** Optional. A single workload operating on Google Cloud. For example: `//compute.googleapis.com/projects/123/uid/zones/us-central1-a/instances/12345`. */
  googleCloudResource?: string;
}

export const AttestationRule: Schema.Schema<AttestationRule> = Schema.suspend(
  () =>
    Schema.Struct({
      googleCloudResource: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AttestationRule",
}) as any as Schema.Schema<AttestationRule>;

export interface AddAttestationRuleRequest {
  /** Required. The attestation rule to be added. */
  attestationRule?: AttestationRule;
}

export const AddAttestationRuleRequest: Schema.Schema<AddAttestationRuleRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      attestationRule: Schema.optional(AttestationRule),
    }),
  ).annotate({
    identifier: "AddAttestationRuleRequest",
  }) as any as Schema.Schema<AddAttestationRuleRequest>;

export interface RemoveAttestationRuleRequest {
  /** Required. The attestation rule to be removed. */
  attestationRule?: AttestationRule;
}

export const RemoveAttestationRuleRequest: Schema.Schema<RemoveAttestationRuleRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      attestationRule: Schema.optional(AttestationRule),
    }),
  ).annotate({
    identifier: "RemoveAttestationRuleRequest",
  }) as any as Schema.Schema<RemoveAttestationRuleRequest>;

export interface SetAttestationRulesRequest {
  /** Required. The attestation rules to be set. At most 50 attestation rules can be set. */
  attestationRules?: Array<AttestationRule>;
}

export const SetAttestationRulesRequest: Schema.Schema<SetAttestationRulesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      attestationRules: Schema.optional(Schema.Array(AttestationRule)),
    }),
  ).annotate({
    identifier: "SetAttestationRulesRequest",
  }) as any as Schema.Schema<SetAttestationRulesRequest>;

export interface ListAttestationRulesResponse {
  /** A list of AttestationRules. */
  attestationRules?: Array<AttestationRule>;
  /** Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAttestationRulesResponse: Schema.Schema<ListAttestationRulesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      attestationRules: Schema.optional(Schema.Array(AttestationRule)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAttestationRulesResponse",
  }) as any as Schema.Schema<ListAttestationRulesResponse>;

export interface PermissionDelta {
  /** Added permissions. */
  addedPermissions?: Array<string>;
  /** Removed permissions. */
  removedPermissions?: Array<string>;
}

export const PermissionDelta: Schema.Schema<PermissionDelta> = Schema.suspend(
  () =>
    Schema.Struct({
      addedPermissions: Schema.optional(Schema.Array(Schema.String)),
      removedPermissions: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "PermissionDelta",
}) as any as Schema.Schema<PermissionDelta>;

export interface AdminAuditData {
  /** The permission_delta when when creating or updating a Role. */
  permissionDelta?: PermissionDelta;
}

export const AdminAuditData: Schema.Schema<AdminAuditData> = Schema.suspend(
  () =>
    Schema.Struct({
      permissionDelta: Schema.optional(PermissionDelta),
    }),
).annotate({
  identifier: "AdminAuditData",
}) as any as Schema.Schema<AdminAuditData>;

export interface BindingDelta {
  /** The action that was performed on a Binding. Required */
  action?: "ACTION_UNSPECIFIED" | "ADD" | "REMOVE" | (string & {});
  /** Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. Required */
  role?: string;
  /** A single identity requesting access for a Google Cloud resource. Follows the same format of Binding.members. Required */
  member?: string;
  /** The condition that is associated with this binding. */
  condition?: Expr;
}

export const BindingDelta: Schema.Schema<BindingDelta> = Schema.suspend(() =>
  Schema.Struct({
    action: Schema.optional(Schema.String),
    role: Schema.optional(Schema.String),
    member: Schema.optional(Schema.String),
    condition: Schema.optional(Expr),
  }),
).annotate({
  identifier: "BindingDelta",
}) as any as Schema.Schema<BindingDelta>;

export interface PolicyDelta {
  /** The delta for Bindings between two policies. */
  bindingDeltas?: Array<BindingDelta>;
}

export const PolicyDelta: Schema.Schema<PolicyDelta> = Schema.suspend(() =>
  Schema.Struct({
    bindingDeltas: Schema.optional(Schema.Array(BindingDelta)),
  }),
).annotate({ identifier: "PolicyDelta" }) as any as Schema.Schema<PolicyDelta>;

export interface AuditData {
  /** Policy delta between the original policy and the newly set policy. */
  policyDelta?: PolicyDelta;
}

export const AuditData: Schema.Schema<AuditData> = Schema.suspend(() =>
  Schema.Struct({
    policyDelta: Schema.optional(PolicyDelta),
  }),
).annotate({ identifier: "AuditData" }) as any as Schema.Schema<AuditData>;

export interface WorkloadIdentityPoolOperationMetadata {}

export const WorkloadIdentityPoolOperationMetadata: Schema.Schema<WorkloadIdentityPoolOperationMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "WorkloadIdentityPoolOperationMetadata",
  }) as any as Schema.Schema<WorkloadIdentityPoolOperationMetadata>;

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

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface ReconciliationOperationMetadata {
  /** DEPRECATED. Use exclusive_action instead. */
  deleteResource?: boolean;
  /** Excluisive action returned by the CLH. */
  exclusiveAction?:
    | "UNKNOWN_REPAIR_ACTION"
    | "DELETE"
    | "RETRY"
    | (string & {});
}

export const ReconciliationOperationMetadata: Schema.Schema<ReconciliationOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      deleteResource: Schema.optional(Schema.Boolean),
      exclusiveAction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReconciliationOperationMetadata",
  }) as any as Schema.Schema<ReconciliationOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsOauthClientsRequest {
  /** Required. The parent to list OauthClients for. */
  parent: string;
  /** Optional. The maximum number of OauthClients to return. If unspecified, at most 50 OauthClients will be returned. The maximum value is 100; values above 100 are truncated to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListOauthClients` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Whether to return soft-deleted OauthClients. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsOauthClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOauthClientsRequest>;

export type ListProjectsLocationsOauthClientsResponse =
  ListOauthClientsResponse;
export const ListProjectsLocationsOauthClientsResponse =
  ListOauthClientsResponse;

export type ListProjectsLocationsOauthClientsError = DefaultErrors;

/** Lists all non-deleted OauthClients in a project. If `show_deleted` is set to `true`, then deleted OauthClients are also listed. */
export const listProjectsLocationsOauthClients: API.PaginatedOperationMethod<
  ListProjectsLocationsOauthClientsRequest,
  ListProjectsLocationsOauthClientsResponse,
  ListProjectsLocationsOauthClientsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsOauthClientsRequest,
  output: ListProjectsLocationsOauthClientsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOauthClientsRequest {
  /** Required. The name of the OauthClient to retrieve. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}`. */
  name: string;
}

export const GetProjectsLocationsOauthClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOauthClientsRequest>;

export type GetProjectsLocationsOauthClientsResponse = OauthClient;
export const GetProjectsLocationsOauthClientsResponse = OauthClient;

export type GetProjectsLocationsOauthClientsError = DefaultErrors;

/** Gets an individual OauthClient. */
export const getProjectsLocationsOauthClients: API.OperationMethod<
  GetProjectsLocationsOauthClientsRequest,
  GetProjectsLocationsOauthClientsResponse,
  GetProjectsLocationsOauthClientsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOauthClientsRequest,
  output: GetProjectsLocationsOauthClientsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsOauthClientsRequest {
  /** Required. The parent resource to create the OauthClient in. The only supported location is `global`. */
  parent: string;
  /** Required. The ID to use for the OauthClient, which becomes the final component of the resource name. This value should be a string of 6 to 63 lowercase letters, digits, or hyphens. It must start with a letter, and cannot have a trailing hyphen. The prefix `gcp-` is reserved for use by Google, and may not be specified. */
  oauthClientId?: string;
  /** Request body */
  body?: OauthClient;
}

export const CreateProjectsLocationsOauthClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  oauthClientId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("oauthClientId"),
  ),
  body: Schema.optional(OauthClient).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsOauthClientsRequest>;

export type CreateProjectsLocationsOauthClientsResponse = OauthClient;
export const CreateProjectsLocationsOauthClientsResponse = OauthClient;

export type CreateProjectsLocationsOauthClientsError = DefaultErrors;

/** Creates a new OauthClient. You cannot reuse the name of a deleted OauthClient until 30 days after deletion. */
export const createProjectsLocationsOauthClients: API.OperationMethod<
  CreateProjectsLocationsOauthClientsRequest,
  CreateProjectsLocationsOauthClientsResponse,
  CreateProjectsLocationsOauthClientsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsOauthClientsRequest,
  output: CreateProjectsLocationsOauthClientsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsOauthClientsRequest {
  /** Immutable. Identifier. The resource name of the OauthClient. Format:`projects/{project}/locations/{location}/oauthClients/{oauth_client}`. */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: OauthClient;
}

export const PatchProjectsLocationsOauthClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(OauthClient).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsOauthClientsRequest>;

export type PatchProjectsLocationsOauthClientsResponse = OauthClient;
export const PatchProjectsLocationsOauthClientsResponse = OauthClient;

export type PatchProjectsLocationsOauthClientsError = DefaultErrors;

/** Updates an existing OauthClient. */
export const patchProjectsLocationsOauthClients: API.OperationMethod<
  PatchProjectsLocationsOauthClientsRequest,
  PatchProjectsLocationsOauthClientsResponse,
  PatchProjectsLocationsOauthClientsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsOauthClientsRequest,
  output: PatchProjectsLocationsOauthClientsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOauthClientsRequest {
  /** Required. The name of the OauthClient to delete. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}`. */
  name: string;
}

export const DeleteProjectsLocationsOauthClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOauthClientsRequest>;

export type DeleteProjectsLocationsOauthClientsResponse = OauthClient;
export const DeleteProjectsLocationsOauthClientsResponse = OauthClient;

export type DeleteProjectsLocationsOauthClientsError = DefaultErrors;

/** Deletes an OauthClient. You cannot use a deleted OauthClient. However, deletion does not revoke access tokens that have already been issued. They continue to grant access. Deletion does revoke refresh tokens that have already been issued. They cannot be used to renew an access token. If the OauthClient is undeleted, and the refresh tokens are not expired, they are valid for token exchange again. You can undelete an OauthClient for 30 days. After 30 days, deletion is permanent. You cannot update deleted OauthClients. However, you can view and list them. */
export const deleteProjectsLocationsOauthClients: API.OperationMethod<
  DeleteProjectsLocationsOauthClientsRequest,
  DeleteProjectsLocationsOauthClientsResponse,
  DeleteProjectsLocationsOauthClientsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOauthClientsRequest,
  output: DeleteProjectsLocationsOauthClientsResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsOauthClientsRequest {
  /** Required. The name of the OauthClient to undelete. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}`. */
  name: string;
  /** Request body */
  body?: UndeleteOauthClientRequest;
}

export const UndeleteProjectsLocationsOauthClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteOauthClientRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsLocationsOauthClientsRequest>;

export type UndeleteProjectsLocationsOauthClientsResponse = OauthClient;
export const UndeleteProjectsLocationsOauthClientsResponse = OauthClient;

export type UndeleteProjectsLocationsOauthClientsError = DefaultErrors;

/** Undeletes an OauthClient, as long as it was deleted fewer than 30 days ago. */
export const undeleteProjectsLocationsOauthClients: API.OperationMethod<
  UndeleteProjectsLocationsOauthClientsRequest,
  UndeleteProjectsLocationsOauthClientsResponse,
  UndeleteProjectsLocationsOauthClientsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsLocationsOauthClientsRequest,
  output: UndeleteProjectsLocationsOauthClientsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOauthClientsCredentialsRequest {
  /** Required. The parent to list OauthClientCredentials for. */
  parent: string;
}

export const ListProjectsLocationsOauthClientsCredentialsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}/credentials",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOauthClientsCredentialsRequest>;

export type ListProjectsLocationsOauthClientsCredentialsResponse =
  ListOauthClientCredentialsResponse;
export const ListProjectsLocationsOauthClientsCredentialsResponse =
  ListOauthClientCredentialsResponse;

export type ListProjectsLocationsOauthClientsCredentialsError = DefaultErrors;

/** Lists all OauthClientCredentials in an OauthClient. */
export const listProjectsLocationsOauthClientsCredentials: API.OperationMethod<
  ListProjectsLocationsOauthClientsCredentialsRequest,
  ListProjectsLocationsOauthClientsCredentialsResponse,
  ListProjectsLocationsOauthClientsCredentialsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListProjectsLocationsOauthClientsCredentialsRequest,
  output: ListProjectsLocationsOauthClientsCredentialsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOauthClientsCredentialsRequest {
  /** Required. The name of the OauthClientCredential to retrieve. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}/credentials/{credential}`. */
  name: string;
}

export const GetProjectsLocationsOauthClientsCredentialsRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}/credentials/{credentialsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOauthClientsCredentialsRequest>;

export type GetProjectsLocationsOauthClientsCredentialsResponse =
  OauthClientCredential;
export const GetProjectsLocationsOauthClientsCredentialsResponse =
  OauthClientCredential;

export type GetProjectsLocationsOauthClientsCredentialsError = DefaultErrors;

/** Gets an individual OauthClientCredential. */
export const getProjectsLocationsOauthClientsCredentials: API.OperationMethod<
  GetProjectsLocationsOauthClientsCredentialsRequest,
  GetProjectsLocationsOauthClientsCredentialsResponse,
  GetProjectsLocationsOauthClientsCredentialsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOauthClientsCredentialsRequest,
  output: GetProjectsLocationsOauthClientsCredentialsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsOauthClientsCredentialsRequest {
  /** Required. The parent resource to create the OauthClientCredential in. */
  parent: string;
  /** Required. The ID to use for the OauthClientCredential, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified. */
  oauthClientCredentialId?: string;
  /** Request body */
  body?: OauthClientCredential;
}

export const CreateProjectsLocationsOauthClientsCredentialsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    oauthClientCredentialId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("oauthClientCredentialId"),
    ),
    body: Schema.optional(OauthClientCredential).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}/credentials",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsOauthClientsCredentialsRequest>;

export type CreateProjectsLocationsOauthClientsCredentialsResponse =
  OauthClientCredential;
export const CreateProjectsLocationsOauthClientsCredentialsResponse =
  OauthClientCredential;

export type CreateProjectsLocationsOauthClientsCredentialsError = DefaultErrors;

/** Creates a new OauthClientCredential. */
export const createProjectsLocationsOauthClientsCredentials: API.OperationMethod<
  CreateProjectsLocationsOauthClientsCredentialsRequest,
  CreateProjectsLocationsOauthClientsCredentialsResponse,
  CreateProjectsLocationsOauthClientsCredentialsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsOauthClientsCredentialsRequest,
  output: CreateProjectsLocationsOauthClientsCredentialsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsOauthClientsCredentialsRequest {
  /** Immutable. Identifier. The resource name of the OauthClientCredential. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}/credentials/{credential}` */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: OauthClientCredential;
}

export const PatchProjectsLocationsOauthClientsCredentialsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(OauthClientCredential).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}/credentials/{credentialsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsOauthClientsCredentialsRequest>;

export type PatchProjectsLocationsOauthClientsCredentialsResponse =
  OauthClientCredential;
export const PatchProjectsLocationsOauthClientsCredentialsResponse =
  OauthClientCredential;

export type PatchProjectsLocationsOauthClientsCredentialsError = DefaultErrors;

/** Updates an existing OauthClientCredential. */
export const patchProjectsLocationsOauthClientsCredentials: API.OperationMethod<
  PatchProjectsLocationsOauthClientsCredentialsRequest,
  PatchProjectsLocationsOauthClientsCredentialsResponse,
  PatchProjectsLocationsOauthClientsCredentialsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsOauthClientsCredentialsRequest,
  output: PatchProjectsLocationsOauthClientsCredentialsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOauthClientsCredentialsRequest {
  /** Required. The name of the OauthClientCredential to delete. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}/credentials/{credential}`. */
  name: string;
}

export const DeleteProjectsLocationsOauthClientsCredentialsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/oauthClients/{oauthClientsId}/credentials/{credentialsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOauthClientsCredentialsRequest>;

export type DeleteProjectsLocationsOauthClientsCredentialsResponse = Empty;
export const DeleteProjectsLocationsOauthClientsCredentialsResponse = Empty;

export type DeleteProjectsLocationsOauthClientsCredentialsError = DefaultErrors;

/** Deletes an OauthClientCredential. Before deleting an OauthClientCredential, it should first be disabled. */
export const deleteProjectsLocationsOauthClientsCredentials: API.OperationMethod<
  DeleteProjectsLocationsOauthClientsCredentialsRequest,
  DeleteProjectsLocationsOauthClientsCredentialsResponse,
  DeleteProjectsLocationsOauthClientsCredentialsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOauthClientsCredentialsRequest,
  output: DeleteProjectsLocationsOauthClientsCredentialsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Required. The parent resource to list pools for. */
  parent: string;
  /** The maximum number of pools to return. If unspecified, at most 50 pools are returned. The maximum value is 1000; values above are 1000 truncated to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkloadIdentityPools` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted pools. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsWorkloadIdentityPoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsWorkloadIdentityPoolsRequest>;

export type ListProjectsLocationsWorkloadIdentityPoolsResponse =
  ListWorkloadIdentityPoolsResponse;
export const ListProjectsLocationsWorkloadIdentityPoolsResponse =
  ListWorkloadIdentityPoolsResponse;

export type ListProjectsLocationsWorkloadIdentityPoolsError = DefaultErrors;

/** Lists all non-deleted WorkloadIdentityPools in a project. If `show_deleted` is set to `true`, then deleted pools are also listed. */
export const listProjectsLocationsWorkloadIdentityPools: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkloadIdentityPoolsRequest,
  ListProjectsLocationsWorkloadIdentityPoolsResponse,
  ListProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkloadIdentityPoolsRequest,
  output: ListProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Required. The name of the pool to retrieve. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsResponse =
  WorkloadIdentityPool;
export const GetProjectsLocationsWorkloadIdentityPoolsResponse =
  WorkloadIdentityPool;

export type GetProjectsLocationsWorkloadIdentityPoolsError = DefaultErrors;

/** Gets an individual WorkloadIdentityPool. */
export const getProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Required. The parent resource to create the pool in. The only supported location is `global`. */
  parent: string;
  /** Required. The ID to use for the pool, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified. */
  workloadIdentityPoolId?: string;
  /** Request body */
  body?: WorkloadIdentityPool;
}

export const CreateProjectsLocationsWorkloadIdentityPoolsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workloadIdentityPoolId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workloadIdentityPoolId"),
    ),
    body: Schema.optional(WorkloadIdentityPool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkloadIdentityPoolsRequest>;

export type CreateProjectsLocationsWorkloadIdentityPoolsResponse = Operation;
export const CreateProjectsLocationsWorkloadIdentityPoolsResponse = Operation;

export type CreateProjectsLocationsWorkloadIdentityPoolsError = DefaultErrors;

/** Creates a new WorkloadIdentityPool. You cannot reuse the name of a deleted pool until 30 days after deletion. */
export const createProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  CreateProjectsLocationsWorkloadIdentityPoolsRequest,
  CreateProjectsLocationsWorkloadIdentityPoolsResponse,
  CreateProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkloadIdentityPoolsRequest,
  output: CreateProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Identifier. The resource name of the pool. */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkloadIdentityPool;
}

export const PatchProjectsLocationsWorkloadIdentityPoolsRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkloadIdentityPool).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsWorkloadIdentityPoolsRequest>;

export type PatchProjectsLocationsWorkloadIdentityPoolsResponse = Operation;
export const PatchProjectsLocationsWorkloadIdentityPoolsResponse = Operation;

export type PatchProjectsLocationsWorkloadIdentityPoolsError = DefaultErrors;

/** Updates an existing WorkloadIdentityPool. */
export const patchProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  PatchProjectsLocationsWorkloadIdentityPoolsRequest,
  PatchProjectsLocationsWorkloadIdentityPoolsResponse,
  PatchProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsWorkloadIdentityPoolsRequest,
  output: PatchProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Required. The name of the pool to delete. */
  name: string;
}

export const DeleteProjectsLocationsWorkloadIdentityPoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkloadIdentityPoolsRequest>;

export type DeleteProjectsLocationsWorkloadIdentityPoolsResponse = Operation;
export const DeleteProjectsLocationsWorkloadIdentityPoolsResponse = Operation;

export type DeleteProjectsLocationsWorkloadIdentityPoolsError = DefaultErrors;

/** Deletes a WorkloadIdentityPool. You cannot use a deleted pool to exchange external credentials for Google Cloud credentials. However, deletion does not revoke credentials that have already been issued. Credentials issued for a deleted pool do not grant access to resources. If the pool is undeleted, and the credentials are not expired, they grant access again. You can undelete a pool for 30 days. After 30 days, deletion is permanent. You cannot update deleted pools. However, you can view and list them. */
export const deleteProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  DeleteProjectsLocationsWorkloadIdentityPoolsRequest,
  DeleteProjectsLocationsWorkloadIdentityPoolsResponse,
  DeleteProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsWorkloadIdentityPoolsRequest,
  output: DeleteProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsWorkloadIdentityPoolsRequest {
  /** Required. The name of the pool to undelete. */
  name: string;
  /** Request body */
  body?: UndeleteWorkloadIdentityPoolRequest;
}

export const UndeleteProjectsLocationsWorkloadIdentityPoolsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkloadIdentityPoolRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsLocationsWorkloadIdentityPoolsRequest>;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsResponse = Operation;
export const UndeleteProjectsLocationsWorkloadIdentityPoolsResponse = Operation;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsError = DefaultErrors;

/** Undeletes a WorkloadIdentityPool, as long as it was deleted fewer than 30 days ago. */
export const undeleteProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  UndeleteProjectsLocationsWorkloadIdentityPoolsRequest,
  UndeleteProjectsLocationsWorkloadIdentityPoolsResponse,
  UndeleteProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsLocationsWorkloadIdentityPoolsRequest,
  output: UndeleteProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest>;

export type SetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse = Policy;
export const SetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse =
  Policy;

export type SetIamPolicyProjectsLocationsWorkloadIdentityPoolsError =
  DefaultErrors;

/** Sets the IAM policies on a WorkloadIdentityPool */
export const setIamPolicyProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  SetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest,
  SetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse,
  SetIamPolicyProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest,
  output: SetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest>;

export type GetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse = Policy;
export const GetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse =
  Policy;

export type GetIamPolicyProjectsLocationsWorkloadIdentityPoolsError =
  DefaultErrors;

/** Gets the IAM policy of a WorkloadIdentityPool. */
export const getIamPolicyProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  GetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest,
  GetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse,
  GetIamPolicyProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsWorkloadIdentityPoolsRequest,
  output: GetIamPolicyProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsRequest>;

export type TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsError =
  DefaultErrors;

/** Returns the caller's permissions on a WorkloadIdentityPool */
export const testIamPermissionsProjectsLocationsWorkloadIdentityPools: API.OperationMethod<
  TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsRequest,
  TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsResponse,
  TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsRequest,
  output: TestIamPermissionsProjectsLocationsWorkloadIdentityPoolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsOperationsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsOperationsResponse =
  Operation;
export const GetProjectsLocationsWorkloadIdentityPoolsOperationsResponse =
  Operation;

export type GetProjectsLocationsWorkloadIdentityPoolsOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsWorkloadIdentityPoolsOperations: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsOperationsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsOperationsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsOperationsRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkloadIdentityPoolsNamespacesRequest {
  /** Required. The parent resource to list namespaces for. */
  parent: string;
  /** The maximum number of namespaces to return. If unspecified, at most 50 namespaces are returned. The maximum value is 1000; values above are 1000 truncated to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkloadIdentityPoolNamespaces` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted namespaces. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsWorkloadIdentityPoolsNamespacesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkloadIdentityPoolsNamespacesRequest>;

export type ListProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  ListWorkloadIdentityPoolNamespacesResponse;
export const ListProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  ListWorkloadIdentityPoolNamespacesResponse;

export type ListProjectsLocationsWorkloadIdentityPoolsNamespacesError =
  DefaultErrors;

/** Lists all non-deleted WorkloadIdentityPoolNamespaces in a workload identity pool. If `show_deleted` is set to `true`, then deleted namespaces are also listed. */
export const listProjectsLocationsWorkloadIdentityPoolsNamespaces: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  ListProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  ListProjectsLocationsWorkloadIdentityPoolsNamespacesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  output: ListProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsNamespacesRequest {
  /** Required. The name of the namespace to retrieve. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsNamespacesRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  WorkloadIdentityPoolNamespace;
export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  WorkloadIdentityPoolNamespace;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesError =
  DefaultErrors;

/** Gets an individual WorkloadIdentityPoolNamespace. */
export const getProjectsLocationsWorkloadIdentityPoolsNamespaces: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkloadIdentityPoolsNamespacesRequest {
  /** Required. The parent resource to create the namespace in. The only supported location is `global`. */
  parent: string;
  /** Required. The ID to use for the namespace. This value must: * contain at most 63 characters * contain only lowercase alphanumeric characters or `-` * start with an alphanumeric character * end with an alphanumeric character The prefix "gcp-" will be reserved for future uses. */
  workloadIdentityPoolNamespaceId?: string;
  /** Request body */
  body?: WorkloadIdentityPoolNamespace;
}

export const CreateProjectsLocationsWorkloadIdentityPoolsNamespacesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workloadIdentityPoolNamespaceId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workloadIdentityPoolNamespaceId"),
    ),
    body: Schema.optional(WorkloadIdentityPoolNamespace).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkloadIdentityPoolsNamespacesRequest>;

export type CreateProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;
export const CreateProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;

export type CreateProjectsLocationsWorkloadIdentityPoolsNamespacesError =
  DefaultErrors;

/** Creates a new WorkloadIdentityPoolNamespace in a WorkloadIdentityPool. */
export const createProjectsLocationsWorkloadIdentityPoolsNamespaces: API.OperationMethod<
  CreateProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  CreateProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  CreateProjectsLocationsWorkloadIdentityPoolsNamespacesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  output: CreateProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkloadIdentityPoolsNamespacesRequest {
  /** Identifier. The resource name of the namespace. */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkloadIdentityPoolNamespace;
}

export const PatchProjectsLocationsWorkloadIdentityPoolsNamespacesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkloadIdentityPoolNamespace).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsWorkloadIdentityPoolsNamespacesRequest>;

export type PatchProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;
export const PatchProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;

export type PatchProjectsLocationsWorkloadIdentityPoolsNamespacesError =
  DefaultErrors;

/** Updates an existing WorkloadIdentityPoolNamespace in a WorkloadIdentityPool. */
export const patchProjectsLocationsWorkloadIdentityPoolsNamespaces: API.OperationMethod<
  PatchProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  PatchProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  PatchProjectsLocationsWorkloadIdentityPoolsNamespacesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  output: PatchProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest {
  /** Required. The name of the namespace to delete. */
  name: string;
}

export const DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest>;

export type DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;
export const DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;

export type DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesError =
  DefaultErrors;

/** Deletes a WorkloadIdentityPoolNamespace. You can undelete a namespace for 30 days. After 30 days, deletion is permanent. */
export const deleteProjectsLocationsWorkloadIdentityPoolsNamespaces: API.OperationMethod<
  DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  output: DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest {
  /** Required. The name of the namespace to undelete. */
  name: string;
  /** Request body */
  body?: UndeleteWorkloadIdentityPoolNamespaceRequest;
}

export const UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkloadIdentityPoolNamespaceRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest>;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;
export const UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse =
  Operation;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesError =
  DefaultErrors;

/** Undeletes a WorkloadIdentityPoolNamespace, as long as it was deleted fewer than 30 days ago. */
export const undeleteProjectsLocationsWorkloadIdentityPoolsNamespaces: API.OperationMethod<
  UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesRequest,
  output: UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsResponse =
  Operation;
export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsResponse =
  Operation;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsWorkloadIdentityPoolsNamespacesOperations: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsNamespacesOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The parent resource to list managed identities for. */
  parent: string;
  /** The maximum number of managed identities to return. If unspecified, at most 50 managed identities are returned. The maximum value is 1000; values above are 1000 truncated to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkloadIdentityPoolManagedIdentities` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted managed identities. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  ListWorkloadIdentityPoolManagedIdentitiesResponse;
export const ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  ListWorkloadIdentityPoolManagedIdentitiesResponse;

export type ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Lists all non-deleted WorkloadIdentityPoolManagedIdentitys in a namespace. If `show_deleted` is set to `true`, then deleted managed identities are also listed. */
export const listProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input:
    ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    ListProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The name of the managed identity to retrieve. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  WorkloadIdentityPoolManagedIdentity;
export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  WorkloadIdentityPoolManagedIdentity;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Gets an individual WorkloadIdentityPoolManagedIdentity. */
export const getProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The parent resource to create the manage identity in. The only supported location is `global`. */
  parent: string;
  /** Required. The ID to use for the managed identity. This value must: * contain at most 63 characters * contain only lowercase alphanumeric characters or `-` * start with an alphanumeric character * end with an alphanumeric character The prefix "gcp-" will be reserved for future uses. */
  workloadIdentityPoolManagedIdentityId?: string;
  /** Request body */
  body?: WorkloadIdentityPoolManagedIdentity;
}

export const CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workloadIdentityPoolManagedIdentityId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workloadIdentityPoolManagedIdentityId"),
    ),
    body: Schema.optional(WorkloadIdentityPoolManagedIdentity).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Creates a new WorkloadIdentityPoolManagedIdentity in a WorkloadIdentityPoolNamespace. */
export const createProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    CreateProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Identifier. The resource name of the managed identity. */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkloadIdentityPoolManagedIdentity;
}

export const PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkloadIdentityPoolManagedIdentity).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Updates an existing WorkloadIdentityPoolManagedIdentity in a WorkloadIdentityPoolNamespace. */
export const patchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    PatchProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The name of the managed identity to delete. */
  name: string;
}

export const DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Deletes a WorkloadIdentityPoolManagedIdentity. You can undelete a managed identity for 30 days. After 30 days, deletion is permanent. */
export const deleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    DeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The name of the managed identity to undelete. */
  name: string;
  /** Request body */
  body?: UndeleteWorkloadIdentityPoolManagedIdentityRequest;
}

export const UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      UndeleteWorkloadIdentityPoolManagedIdentityRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Undeletes a WorkloadIdentityPoolManagedIdentity, as long as it was deleted fewer than 30 days ago. */
export const undeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    UndeleteProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The resource name of the managed identity or namespace resource to add an attestation rule to. */
  resource: string;
  /** Request body */
  body?: AddAttestationRuleRequest;
}

export const AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(AddAttestationRuleRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}:addAttestationRule",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Add an AttestationRule on a WorkloadIdentityPoolManagedIdentity. The total attestation rules after addition must not exceed 50. */
export const addAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    AddAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The resource name of the managed identity or namespace resource to remove an attestation rule from. */
  resource: string;
  /** Request body */
  body?: RemoveAttestationRuleRequest;
}

export const RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(RemoveAttestationRuleRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}:removeAttestationRule",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Remove an AttestationRule on a WorkloadIdentityPoolManagedIdentity. */
export const removeAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    RemoveAttestationRuleProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The resource name of the managed identity or namespace resource to add an attestation rule to. */
  resource: string;
  /** Request body */
  body?: SetAttestationRulesRequest;
}

export const SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetAttestationRulesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}:setAttestationRules",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;
export const SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  Operation;

export type SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** Set all AttestationRule on a WorkloadIdentityPoolManagedIdentity. A maximum of 50 AttestationRules can be set. */
export const setAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.OperationMethod<
  SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    SetAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
}));

export interface ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest {
  /** Required. The resource name of the managed identity or namespace resource to list attestation rules of. */
  resource: string;
  /** Optional. A query filter. Supports the following function: * `container_ids()`: Returns only the AttestationRules under the specific container ids. The function expects a comma-delimited list with only project numbers and must use the format `projects/`. For example: `container_ids(projects/, projects/,...)`. */
  filter?: string;
  /** Optional. The maximum number of AttestationRules to return. If unspecified, at most 50 AttestationRules are returned. The maximum value is 100; values above 100 are truncated to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListWorkloadIdentityPoolProviderKeys` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}:listAttestationRules",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest>;

export type ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  ListAttestationRulesResponse;
export const ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse =
  ListAttestationRulesResponse;

export type ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError =
  DefaultErrors;

/** List all AttestationRule on a WorkloadIdentityPoolManagedIdentity. */
export const listAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentities: API.PaginatedOperationMethod<
  ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input:
    ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesRequest,
  output:
    ListAttestationRulesProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsResponse =
  Operation;
export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsResponse =
  Operation;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperations: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsRequest,
  output:
    GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/namespaces/{namespacesId}/managedIdentities/{managedIdentitiesId}/workloadSources/{workloadSourcesId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsResponse =
  Operation;
export const GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsResponse =
  Operation;

export type GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperations: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsRequest,
  output:
    GetProjectsLocationsWorkloadIdentityPoolsNamespacesManagedIdentitiesWorkloadSourcesOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkloadIdentityPoolsProvidersRequest {
  /** Required. The pool to list providers for. */
  parent: string;
  /** The maximum number of providers to return. If unspecified, at most 50 providers are returned. The maximum value is 100; values above 100 are truncated to 100. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkloadIdentityPoolProviders` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted providers. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsWorkloadIdentityPoolsProvidersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkloadIdentityPoolsProvidersRequest>;

export type ListProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  ListWorkloadIdentityPoolProvidersResponse;
export const ListProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  ListWorkloadIdentityPoolProvidersResponse;

export type ListProjectsLocationsWorkloadIdentityPoolsProvidersError =
  DefaultErrors;

/** Lists all non-deleted WorkloadIdentityPoolProviders in a WorkloadIdentityPool. If `show_deleted` is set to `true`, then deleted providers are also listed. */
export const listProjectsLocationsWorkloadIdentityPoolsProviders: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  ListProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  ListProjectsLocationsWorkloadIdentityPoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  output: ListProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsProvidersRequest {
  /** Required. The name of the provider to retrieve. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsProvidersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsProvidersRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  WorkloadIdentityPoolProvider;
export const GetProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  WorkloadIdentityPoolProvider;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersError =
  DefaultErrors;

/** Gets an individual WorkloadIdentityPoolProvider. */
export const getProjectsLocationsWorkloadIdentityPoolsProviders: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkloadIdentityPoolsProvidersRequest {
  /** Required. The pool to create this provider in. */
  parent: string;
  /** Required. The ID for the provider, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified. */
  workloadIdentityPoolProviderId?: string;
  /** Request body */
  body?: WorkloadIdentityPoolProvider;
}

export const CreateProjectsLocationsWorkloadIdentityPoolsProvidersRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workloadIdentityPoolProviderId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workloadIdentityPoolProviderId"),
    ),
    body: Schema.optional(WorkloadIdentityPoolProvider).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkloadIdentityPoolsProvidersRequest>;

export type CreateProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;
export const CreateProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;

export type CreateProjectsLocationsWorkloadIdentityPoolsProvidersError =
  DefaultErrors;

/** Creates a new WorkloadIdentityPoolProvider in a WorkloadIdentityPool. You cannot reuse the name of a deleted provider until 30 days after deletion. */
export const createProjectsLocationsWorkloadIdentityPoolsProviders: API.OperationMethod<
  CreateProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  CreateProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  CreateProjectsLocationsWorkloadIdentityPoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  output: CreateProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkloadIdentityPoolsProvidersRequest {
  /** Identifier. The resource name of the provider. */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkloadIdentityPoolProvider;
}

export const PatchProjectsLocationsWorkloadIdentityPoolsProvidersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkloadIdentityPoolProvider).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsWorkloadIdentityPoolsProvidersRequest>;

export type PatchProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;
export const PatchProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;

export type PatchProjectsLocationsWorkloadIdentityPoolsProvidersError =
  DefaultErrors;

/** Updates an existing WorkloadIdentityPoolProvider. */
export const patchProjectsLocationsWorkloadIdentityPoolsProviders: API.OperationMethod<
  PatchProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  PatchProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  PatchProjectsLocationsWorkloadIdentityPoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  output: PatchProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest {
  /** Required. The name of the provider to delete. */
  name: string;
}

export const DeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest>;

export type DeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;
export const DeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;

export type DeleteProjectsLocationsWorkloadIdentityPoolsProvidersError =
  DefaultErrors;

/** Deletes a WorkloadIdentityPoolProvider. Deleting a provider does not revoke credentials that have already been issued; they continue to grant access. You can undelete a provider for 30 days. After 30 days, deletion is permanent. You cannot update deleted providers. However, you can view and list them. */
export const deleteProjectsLocationsWorkloadIdentityPoolsProviders: API.OperationMethod<
  DeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  DeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  DeleteProjectsLocationsWorkloadIdentityPoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  output: DeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest {
  /** Required. The name of the provider to undelete. */
  name: string;
  /** Request body */
  body?: UndeleteWorkloadIdentityPoolProviderRequest;
}

export const UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkloadIdentityPoolProviderRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest>;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;
export const UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse =
  Operation;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersError =
  DefaultErrors;

/** Undeletes a WorkloadIdentityPoolProvider, as long as it was deleted fewer than 30 days ago. */
export const undeleteProjectsLocationsWorkloadIdentityPoolsProviders: API.OperationMethod<
  UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersRequest,
  output: UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsResponse =
  Operation;
export const GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsResponse =
  Operation;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsWorkloadIdentityPoolsProvidersOperations: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsProvidersOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest {
  /** Required. The parent provider resource to list encryption keys for. */
  parent: string;
  /** The maximum number of keys to return. If unspecified, all keys are returned. The maximum value is 10; values above 10 are truncated to 10. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkloadIdentityPoolProviderKeys` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft deleted resources as well. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/keys",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest>;

export type ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  ListWorkloadIdentityPoolProviderKeysResponse;
export const ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  ListWorkloadIdentityPoolProviderKeysResponse;

export type ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysError =
  DefaultErrors;

/** Lists all non-deleted WorkloadIdentityPoolProviderKeys in a project. If show_deleted is set to `true`, then deleted pools are also listed. */
export const listProjectsLocationsWorkloadIdentityPoolsProvidersKeys: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  output: ListProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest {
  /** Required. The name of the key to retrieve. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/keys/{keysId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  WorkloadIdentityPoolProviderKey;
export const GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  WorkloadIdentityPoolProviderKey;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysError =
  DefaultErrors;

/** Gets an individual WorkloadIdentityPoolProviderKey. */
export const getProjectsLocationsWorkloadIdentityPoolsProvidersKeys: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  output: GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest {
  /** Required. The parent provider resource to create the key in. */
  parent: string;
  /** Required. The ID to use for the key, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-]. */
  workloadIdentityPoolProviderKeyId?: string;
  /** Request body */
  body?: WorkloadIdentityPoolProviderKey;
}

export const CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workloadIdentityPoolProviderKeyId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workloadIdentityPoolProviderKeyId"),
    ),
    body: Schema.optional(WorkloadIdentityPoolProviderKey).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/keys",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest>;

export type CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  Operation;
export const CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  Operation;

export type CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysError =
  DefaultErrors;

/** Create a new WorkloadIdentityPoolProviderKey in a WorkloadIdentityPoolProvider. */
export const createProjectsLocationsWorkloadIdentityPoolsProvidersKeys: API.OperationMethod<
  CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  output: CreateProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest {
  /** Required. The name of the encryption key to delete. */
  name: string;
}

export const DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/keys/{keysId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest>;

export type DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  Operation;
export const DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  Operation;

export type DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysError =
  DefaultErrors;

/** Deletes an WorkloadIdentityPoolProviderKey. You can undelete a key for 30 days. After 30 days, deletion is permanent. */
export const deleteProjectsLocationsWorkloadIdentityPoolsProvidersKeys: API.OperationMethod<
  DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  output: DeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest {
  /** Required. The name of the encryption key to undelete. */
  name: string;
  /** Request body */
  body?: UndeleteWorkloadIdentityPoolProviderKeyRequest;
}

export const UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkloadIdentityPoolProviderKeyRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/keys/{keysId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest>;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  Operation;
export const UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse =
  Operation;

export type UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysError =
  DefaultErrors;

/** Undeletes an WorkloadIdentityPoolProviderKey, as long as it was deleted fewer than 30 days ago. */
export const undeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeys: API.OperationMethod<
  UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysRequest,
  output: UndeleteProjectsLocationsWorkloadIdentityPoolsProvidersKeysResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workloadIdentityPools/{workloadIdentityPoolsId}/providers/{providersId}/keys/{keysId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsRequest>;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsResponse =
  Operation;
export const GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsResponse =
  Operation;

export type GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperations: API.OperationMethod<
  GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsRequest,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsResponse,
  GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsRequest,
  output:
    GetProjectsLocationsWorkloadIdentityPoolsProvidersKeysOperationsResponse,
  errors: [],
}));

export interface ListProjectsServiceAccountsRequest {
  /** Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`. */
  name: string;
  /** Optional limit on the number of service accounts to include in the response. Further accounts can subsequently be obtained by including the ListServiceAccountsResponse.next_page_token in a subsequent request. The default is 20, and the maximum is 100. */
  pageSize?: number;
  /** Optional pagination token returned in an earlier ListServiceAccountsResponse.next_page_token. */
  pageToken?: string;
}

export const ListProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/serviceAccounts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsServiceAccountsRequest>;

export type ListProjectsServiceAccountsResponse = ListServiceAccountsResponse;
export const ListProjectsServiceAccountsResponse = ListServiceAccountsResponse;

export type ListProjectsServiceAccountsError = DefaultErrors;

/** Lists every ServiceAccount that belongs to a specific project. */
export const listProjectsServiceAccounts: API.PaginatedOperationMethod<
  ListProjectsServiceAccountsRequest,
  ListProjectsServiceAccountsResponse,
  ListProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsServiceAccountsRequest,
  output: ListProjectsServiceAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsServiceAccountsRequest {
  /** Required. The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
}

export const GetProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsServiceAccountsRequest>;

export type GetProjectsServiceAccountsResponse = ServiceAccount;
export const GetProjectsServiceAccountsResponse = ServiceAccount;

export type GetProjectsServiceAccountsError = DefaultErrors;

/** Gets a ServiceAccount. */
export const getProjectsServiceAccounts: API.OperationMethod<
  GetProjectsServiceAccountsRequest,
  GetProjectsServiceAccountsResponse,
  GetProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsServiceAccountsRequest,
  output: GetProjectsServiceAccountsResponse,
  errors: [],
}));

export interface CreateProjectsServiceAccountsRequest {
  /** Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`. */
  name: string;
  /** Request body */
  body?: CreateServiceAccountRequest;
}

export const CreateProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CreateServiceAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsServiceAccountsRequest>;

export type CreateProjectsServiceAccountsResponse = ServiceAccount;
export const CreateProjectsServiceAccountsResponse = ServiceAccount;

export type CreateProjectsServiceAccountsError = DefaultErrors;

/** Creates a ServiceAccount. */
export const createProjectsServiceAccounts: API.OperationMethod<
  CreateProjectsServiceAccountsRequest,
  CreateProjectsServiceAccountsResponse,
  CreateProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsServiceAccountsRequest,
  output: CreateProjectsServiceAccountsResponse,
  errors: [],
}));

export interface UpdateProjectsServiceAccountsRequest {
  /** The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: ServiceAccount;
}

export const UpdateProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ServiceAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsServiceAccountsRequest>;

export type UpdateProjectsServiceAccountsResponse = ServiceAccount;
export const UpdateProjectsServiceAccountsResponse = ServiceAccount;

export type UpdateProjectsServiceAccountsError = DefaultErrors;

/** **Note:** We are in the process of deprecating this method. Use PatchServiceAccount instead. Updates a ServiceAccount. You can update only the `display_name` field. */
export const updateProjectsServiceAccounts: API.OperationMethod<
  UpdateProjectsServiceAccountsRequest,
  UpdateProjectsServiceAccountsResponse,
  UpdateProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateProjectsServiceAccountsRequest,
  output: UpdateProjectsServiceAccountsResponse,
  errors: [],
}));

export interface PatchProjectsServiceAccountsRequest {
  /** The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: PatchServiceAccountRequest;
}

export const PatchProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PatchServiceAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsServiceAccountsRequest>;

export type PatchProjectsServiceAccountsResponse = ServiceAccount;
export const PatchProjectsServiceAccountsResponse = ServiceAccount;

export type PatchProjectsServiceAccountsError = DefaultErrors;

/** Patches a ServiceAccount. */
export const patchProjectsServiceAccounts: API.OperationMethod<
  PatchProjectsServiceAccountsRequest,
  PatchProjectsServiceAccountsResponse,
  PatchProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsServiceAccountsRequest,
  output: PatchProjectsServiceAccountsResponse,
  errors: [],
}));

export interface DeleteProjectsServiceAccountsRequest {
  /** Required. The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
}

export const DeleteProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsServiceAccountsRequest>;

export type DeleteProjectsServiceAccountsResponse = Empty;
export const DeleteProjectsServiceAccountsResponse = Empty;

export type DeleteProjectsServiceAccountsError = DefaultErrors;

/** Deletes a ServiceAccount. **Warning:** After you delete a service account, you might not be able to undelete it. If you know that you need to re-enable the service account in the future, use DisableServiceAccount instead. If you delete a service account, IAM permanently removes the service account 30 days later. Google Cloud cannot recover the service account after it is permanently removed, even if you file a support request. To help avoid unplanned outages, we recommend that you disable the service account before you delete it. Use DisableServiceAccount to disable the service account, then wait at least 24 hours and watch for unintended consequences. If there are no unintended consequences, you can delete the service account. */
export const deleteProjectsServiceAccounts: API.OperationMethod<
  DeleteProjectsServiceAccountsRequest,
  DeleteProjectsServiceAccountsResponse,
  DeleteProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsServiceAccountsRequest,
  output: DeleteProjectsServiceAccountsResponse,
  errors: [],
}));

export interface UndeleteProjectsServiceAccountsRequest {
  /** The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: UndeleteServiceAccountRequest;
}

export const UndeleteProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteServiceAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsServiceAccountsRequest>;

export type UndeleteProjectsServiceAccountsResponse =
  UndeleteServiceAccountResponse;
export const UndeleteProjectsServiceAccountsResponse =
  UndeleteServiceAccountResponse;

export type UndeleteProjectsServiceAccountsError = DefaultErrors;

/** Restores a deleted ServiceAccount. **Important:** It is not always possible to restore a deleted service account. Use this method only as a last resort. After you delete a service account, IAM permanently removes the service account 30 days later. There is no way to restore a deleted service account that has been permanently removed. */
export const undeleteProjectsServiceAccounts: API.OperationMethod<
  UndeleteProjectsServiceAccountsRequest,
  UndeleteProjectsServiceAccountsResponse,
  UndeleteProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsServiceAccountsRequest,
  output: UndeleteProjectsServiceAccountsResponse,
  errors: [],
}));

export interface EnableProjectsServiceAccountsRequest {
  /** The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: EnableServiceAccountRequest;
}

export const EnableProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableServiceAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:enable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnableProjectsServiceAccountsRequest>;

export type EnableProjectsServiceAccountsResponse = Empty;
export const EnableProjectsServiceAccountsResponse = Empty;

export type EnableProjectsServiceAccountsError = DefaultErrors;

/** Enables a ServiceAccount that was disabled by DisableServiceAccount. If the service account is already enabled, then this method has no effect. If the service account was disabled by other means—for example, if Google disabled the service account because it was compromised—you cannot use this method to enable the service account. */
export const enableProjectsServiceAccounts: API.OperationMethod<
  EnableProjectsServiceAccountsRequest,
  EnableProjectsServiceAccountsResponse,
  EnableProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableProjectsServiceAccountsRequest,
  output: EnableProjectsServiceAccountsResponse,
  errors: [],
}));

export interface DisableProjectsServiceAccountsRequest {
  /** The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: DisableServiceAccountRequest;
}

export const DisableProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableServiceAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:disable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DisableProjectsServiceAccountsRequest>;

export type DisableProjectsServiceAccountsResponse = Empty;
export const DisableProjectsServiceAccountsResponse = Empty;

export type DisableProjectsServiceAccountsError = DefaultErrors;

/** Disables a ServiceAccount immediately. If an application uses the service account to authenticate, that application can no longer call Google APIs or access Google Cloud resources. Existing access tokens for the service account are rejected, and requests for new access tokens will fail. To re-enable the service account, use EnableServiceAccount. After you re-enable the service account, its existing access tokens will be accepted, and you can request new access tokens. To help avoid unplanned outages, we recommend that you disable the service account before you delete it. Use this method to disable the service account, then wait at least 24 hours and watch for unintended consequences. If there are no unintended consequences, you can delete the service account with DeleteServiceAccount. */
export const disableProjectsServiceAccounts: API.OperationMethod<
  DisableProjectsServiceAccountsRequest,
  DisableProjectsServiceAccountsResponse,
  DisableProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableProjectsServiceAccountsRequest,
  output: DisableProjectsServiceAccountsResponse,
  errors: [],
}));

export interface SignBlobProjectsServiceAccountsRequest {
  /** Required. Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: SignBlobRequest;
}

export const SignBlobProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SignBlobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:signBlob",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SignBlobProjectsServiceAccountsRequest>;

export type SignBlobProjectsServiceAccountsResponse = SignBlobResponse;
export const SignBlobProjectsServiceAccountsResponse = SignBlobResponse;

export type SignBlobProjectsServiceAccountsError = DefaultErrors;

/** Signs a blob using the system-managed private key for a ServiceAccount. */
export const signBlobProjectsServiceAccounts: API.OperationMethod<
  SignBlobProjectsServiceAccountsRequest,
  SignBlobProjectsServiceAccountsResponse,
  SignBlobProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SignBlobProjectsServiceAccountsRequest,
  output: SignBlobProjectsServiceAccountsResponse,
  errors: [],
}));

export interface SignJwtProjectsServiceAccountsRequest {
  /** Required. Deprecated. [Migrate to Service Account Credentials API](https://cloud.google.com/iam/help/credentials/migrate-api). The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: SignJwtRequest;
}

export const SignJwtProjectsServiceAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SignJwtRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:signJwt",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SignJwtProjectsServiceAccountsRequest>;

export type SignJwtProjectsServiceAccountsResponse = SignJwtResponse;
export const SignJwtProjectsServiceAccountsResponse = SignJwtResponse;

export type SignJwtProjectsServiceAccountsError = DefaultErrors;

/** Signs a JSON Web Token (JWT) using the system-managed private key for a ServiceAccount. */
export const signJwtProjectsServiceAccounts: API.OperationMethod<
  SignJwtProjectsServiceAccountsRequest,
  SignJwtProjectsServiceAccountsResponse,
  SignJwtProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SignJwtProjectsServiceAccountsRequest,
  output: SignJwtProjectsServiceAccountsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsServiceAccountsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsServiceAccountsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("options.requestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsServiceAccountsRequest>;

export type GetIamPolicyProjectsServiceAccountsResponse = Policy;
export const GetIamPolicyProjectsServiceAccountsResponse = Policy;

export type GetIamPolicyProjectsServiceAccountsError = DefaultErrors;

/** Gets the IAM policy that is attached to a ServiceAccount. This IAM policy specifies which principals have access to the service account. This method does not tell you whether the service account has been granted any roles on other resources. To check whether a service account has role grants on a resource, use the `getIamPolicy` method for that resource. For example, to view the role grants for a project, call the Resource Manager API's [projects.getIamPolicy](https://cloud.google.com/resource-manager/reference/rest/v1/projects/getIamPolicy) method. */
export const getIamPolicyProjectsServiceAccounts: API.OperationMethod<
  GetIamPolicyProjectsServiceAccountsRequest,
  GetIamPolicyProjectsServiceAccountsResponse,
  GetIamPolicyProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsServiceAccountsRequest,
  output: GetIamPolicyProjectsServiceAccountsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsServiceAccountsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsServiceAccountsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsServiceAccountsRequest>;

export type SetIamPolicyProjectsServiceAccountsResponse = Policy;
export const SetIamPolicyProjectsServiceAccountsResponse = Policy;

export type SetIamPolicyProjectsServiceAccountsError = DefaultErrors;

/** Sets the IAM policy that is attached to a ServiceAccount. Use this method to grant or revoke access to the service account. For example, you could grant a principal the ability to impersonate the service account. This method does not enable the service account to access other resources. To grant roles to a service account on a resource, follow these steps: 1. Call the resource's `getIamPolicy` method to get its current IAM policy. 2. Edit the policy so that it binds the service account to an IAM role for the resource. 3. Call the resource's `setIamPolicy` method to update its IAM policy. For detailed instructions, see [Manage access to project, folders, and organizations](https://cloud.google.com/iam/help/service-accounts/granting-access-to-service-accounts) or [Manage access to other resources](https://cloud.google.com/iam/help/access/manage-other-resources). */
export const setIamPolicyProjectsServiceAccounts: API.OperationMethod<
  SetIamPolicyProjectsServiceAccountsRequest,
  SetIamPolicyProjectsServiceAccountsResponse,
  SetIamPolicyProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsServiceAccountsRequest,
  output: SetIamPolicyProjectsServiceAccountsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsServiceAccountsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsServiceAccountsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsServiceAccountsRequest>;

export type TestIamPermissionsProjectsServiceAccountsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsServiceAccountsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsServiceAccountsError = DefaultErrors;

/** Tests whether the caller has the specified permissions on a ServiceAccount. */
export const testIamPermissionsProjectsServiceAccounts: API.OperationMethod<
  TestIamPermissionsProjectsServiceAccountsRequest,
  TestIamPermissionsProjectsServiceAccountsResponse,
  TestIamPermissionsProjectsServiceAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsServiceAccountsRequest,
  output: TestIamPermissionsProjectsServiceAccountsResponse,
  errors: [],
}));

export interface ListProjectsServiceAccountsKeysRequest {
  /** Required. The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Filters the types of keys the user wants to include in the list response. Duplicate key types are not allowed. If no key type is provided, all keys are returned. */
  keyTypes?:
    | "KEY_TYPE_UNSPECIFIED"
    | "USER_MANAGED"
    | "SYSTEM_MANAGED"
    | (string & {})[];
}

export const ListProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  keyTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("keyTypes"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsServiceAccountsKeysRequest>;

export type ListProjectsServiceAccountsKeysResponse =
  ListServiceAccountKeysResponse;
export const ListProjectsServiceAccountsKeysResponse =
  ListServiceAccountKeysResponse;

export type ListProjectsServiceAccountsKeysError = DefaultErrors;

/** Lists every ServiceAccountKey for a service account. */
export const listProjectsServiceAccountsKeys: API.OperationMethod<
  ListProjectsServiceAccountsKeysRequest,
  ListProjectsServiceAccountsKeysResponse,
  ListProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListProjectsServiceAccountsKeysRequest,
  output: ListProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface GetProjectsServiceAccountsKeysRequest {
  /** Required. The resource name of the service account key. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/-/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account key `projects/-/serviceAccounts/fake@example.com/keys/fake-key`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Optional. The output format of the public key. The default is `TYPE_NONE`, which means that the public key is not returned. */
  publicKeyType?:
    | "TYPE_NONE"
    | "TYPE_X509_PEM_FILE"
    | "TYPE_RAW_PUBLIC_KEY"
    | (string & {});
}

export const GetProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  publicKeyType: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publicKeyType"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys/{keysId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsServiceAccountsKeysRequest>;

export type GetProjectsServiceAccountsKeysResponse = ServiceAccountKey;
export const GetProjectsServiceAccountsKeysResponse = ServiceAccountKey;

export type GetProjectsServiceAccountsKeysError = DefaultErrors;

/** Gets a ServiceAccountKey. */
export const getProjectsServiceAccountsKeys: API.OperationMethod<
  GetProjectsServiceAccountsKeysRequest,
  GetProjectsServiceAccountsKeysResponse,
  GetProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsServiceAccountsKeysRequest,
  output: GetProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface CreateProjectsServiceAccountsKeysRequest {
  /** Required. The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: CreateServiceAccountKeyRequest;
}

export const CreateProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CreateServiceAccountKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsServiceAccountsKeysRequest>;

export type CreateProjectsServiceAccountsKeysResponse = ServiceAccountKey;
export const CreateProjectsServiceAccountsKeysResponse = ServiceAccountKey;

export type CreateProjectsServiceAccountsKeysError = DefaultErrors;

/** Creates a ServiceAccountKey. */
export const createProjectsServiceAccountsKeys: API.OperationMethod<
  CreateProjectsServiceAccountsKeysRequest,
  CreateProjectsServiceAccountsKeysResponse,
  CreateProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsServiceAccountsKeysRequest,
  output: CreateProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface UploadProjectsServiceAccountsKeysRequest {
  /** The resource name of the service account key. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: UploadServiceAccountKeyRequest;
}

export const UploadProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UploadServiceAccountKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys:upload",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UploadProjectsServiceAccountsKeysRequest>;

export type UploadProjectsServiceAccountsKeysResponse = ServiceAccountKey;
export const UploadProjectsServiceAccountsKeysResponse = ServiceAccountKey;

export type UploadProjectsServiceAccountsKeysError = DefaultErrors;

/** Uploads the public key portion of a key pair that you manage, and associates the public key with a ServiceAccount. After you upload the public key, you can use the private key from the key pair as a service account key. */
export const uploadProjectsServiceAccountsKeys: API.OperationMethod<
  UploadProjectsServiceAccountsKeysRequest,
  UploadProjectsServiceAccountsKeysResponse,
  UploadProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UploadProjectsServiceAccountsKeysRequest,
  output: UploadProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface DeleteProjectsServiceAccountsKeysRequest {
  /** Required. The resource name of the service account key. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/-/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account key `projects/-/serviceAccounts/fake@example.com/keys/fake-key`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
}

export const DeleteProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys/{keysId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsServiceAccountsKeysRequest>;

export type DeleteProjectsServiceAccountsKeysResponse = Empty;
export const DeleteProjectsServiceAccountsKeysResponse = Empty;

export type DeleteProjectsServiceAccountsKeysError = DefaultErrors;

/** Deletes a ServiceAccountKey. Deleting a service account key does not revoke short-lived credentials that have been issued based on the service account key. */
export const deleteProjectsServiceAccountsKeys: API.OperationMethod<
  DeleteProjectsServiceAccountsKeysRequest,
  DeleteProjectsServiceAccountsKeysResponse,
  DeleteProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsServiceAccountsKeysRequest,
  output: DeleteProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface DisableProjectsServiceAccountsKeysRequest {
  /** Required. The resource name of the service account key. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/-/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account key `projects/-/serviceAccounts/fake@example.com/keys/fake-key`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: DisableServiceAccountKeyRequest;
}

export const DisableProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableServiceAccountKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys/{keysId}:disable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DisableProjectsServiceAccountsKeysRequest>;

export type DisableProjectsServiceAccountsKeysResponse = Empty;
export const DisableProjectsServiceAccountsKeysResponse = Empty;

export type DisableProjectsServiceAccountsKeysError = DefaultErrors;

/** Disable a ServiceAccountKey. A disabled service account key can be re-enabled with EnableServiceAccountKey. */
export const disableProjectsServiceAccountsKeys: API.OperationMethod<
  DisableProjectsServiceAccountsKeysRequest,
  DisableProjectsServiceAccountsKeysResponse,
  DisableProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableProjectsServiceAccountsKeysRequest,
  output: DisableProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface EnableProjectsServiceAccountsKeysRequest {
  /** Required. The resource name of the service account key. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}/keys/{KEY_ID}` * `projects/-/serviceAccounts/{UNIQUE_ID}/keys/{KEY_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account key `projects/-/serviceAccounts/fake@example.com/keys/fake-key`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. */
  name: string;
  /** Request body */
  body?: EnableServiceAccountKeyRequest;
}

export const EnableProjectsServiceAccountsKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableServiceAccountKeyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys/{keysId}:enable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnableProjectsServiceAccountsKeysRequest>;

export type EnableProjectsServiceAccountsKeysResponse = Empty;
export const EnableProjectsServiceAccountsKeysResponse = Empty;

export type EnableProjectsServiceAccountsKeysError = DefaultErrors;

/** Enable a ServiceAccountKey. */
export const enableProjectsServiceAccountsKeys: API.OperationMethod<
  EnableProjectsServiceAccountsKeysRequest,
  EnableProjectsServiceAccountsKeysResponse,
  EnableProjectsServiceAccountsKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableProjectsServiceAccountsKeysRequest,
  output: EnableProjectsServiceAccountsKeysResponse,
  errors: [],
}));

export interface ListProjectsRolesRequest {
  /** The `parent` parameter's value depends on the target resource for the request, namely [roles](https://cloud.google.com/iam/docs/reference/rest/v1/roles), [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below: * [roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/roles/list): An empty string. This method doesn't require a resource; it simply returns all [predefined roles](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles` * [projects.roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/list): `projects/{PROJECT_ID}`. This method lists all project-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles` * [organizations.roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/list): `organizations/{ORGANIZATION_ID}`. This method lists all organization-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  parent: string;
  /** Optional limit on the number of roles to include in the response. The default is 300, and the maximum is 1,000. */
  pageSize?: number;
  /** Optional pagination token returned in an earlier ListRolesResponse. */
  pageToken?: string;
  /** Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field. */
  view?: "BASIC" | "FULL" | (string & {});
  /** Include Roles that have been deleted. */
  showDeleted?: boolean;
}

export const ListProjectsRolesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/roles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRolesRequest>;

export type ListProjectsRolesResponse = ListRolesResponse;
export const ListProjectsRolesResponse = ListRolesResponse;

export type ListProjectsRolesError = DefaultErrors;

/** Lists every predefined Role that IAM supports, or every custom role that is defined for an organization or project. */
export const listProjectsRoles: API.PaginatedOperationMethod<
  ListProjectsRolesRequest,
  ListProjectsRolesResponse,
  ListProjectsRolesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsRolesRequest,
  output: ListProjectsRolesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [roles](https://cloud.google.com/iam/docs/reference/rest/v1/roles), [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`. This method returns results from all [predefined roles](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles/{ROLE_NAME}` * [projects.roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/get): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/get): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
}

export const GetProjectsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/roles/{rolesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRolesRequest>;

export type GetProjectsRolesResponse = Role;
export const GetProjectsRolesResponse = Role;

export type GetProjectsRolesError = DefaultErrors;

/** Gets the definition of a Role. */
export const getProjectsRoles: API.OperationMethod<
  GetProjectsRolesRequest,
  GetProjectsRolesResponse,
  GetProjectsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsRolesRequest,
  output: GetProjectsRolesResponse,
  errors: [],
}));

export interface CreateProjectsRolesRequest {
  /** The `parent` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below: * [projects.roles.create](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/create): `projects/{PROJECT_ID}`. This method creates project-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles` * [organizations.roles.create](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/create): `organizations/{ORGANIZATION_ID}`. This method creates organization-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  parent: string;
  /** Request body */
  body?: CreateRoleRequest;
}

export const CreateProjectsRolesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateRoleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/roles",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsRolesRequest>;

export type CreateProjectsRolesResponse = Role;
export const CreateProjectsRolesResponse = Role;

export type CreateProjectsRolesError = DefaultErrors;

/** Creates a new custom Role. */
export const createProjectsRoles: API.OperationMethod<
  CreateProjectsRolesRequest,
  CreateProjectsRolesResponse,
  CreateProjectsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsRolesRequest,
  output: CreateProjectsRolesResponse,
  errors: [],
}));

export interface PatchProjectsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [projects.roles.patch](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/patch): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.patch](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/patch): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
  /** A mask describing which fields in the Role have changed. */
  updateMask?: string;
  /** Request body */
  body?: Role;
}

export const PatchProjectsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Role).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/roles/{rolesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsRolesRequest>;

export type PatchProjectsRolesResponse = Role;
export const PatchProjectsRolesResponse = Role;

export type PatchProjectsRolesError = DefaultErrors;

/** Updates the definition of a custom Role. */
export const patchProjectsRoles: API.OperationMethod<
  PatchProjectsRolesRequest,
  PatchProjectsRolesResponse,
  PatchProjectsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsRolesRequest,
  output: PatchProjectsRolesResponse,
  errors: [],
}));

export interface DeleteProjectsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [projects.roles.delete](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/delete): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.delete](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/delete): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
  /** Used to perform a consistent read-modify-write. */
  etag?: string;
}

export const DeleteProjectsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/roles/{rolesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsRolesRequest>;

export type DeleteProjectsRolesResponse = Role;
export const DeleteProjectsRolesResponse = Role;

export type DeleteProjectsRolesError = DefaultErrors;

/** Deletes a custom Role. When you delete a custom role, the following changes occur immediately: * You cannot bind a principal to the custom role in an IAM Policy. * Existing bindings to the custom role are not changed, but they have no effect. * By default, the response from ListRoles does not include the custom role. A deleted custom role still counts toward the [custom role limit](https://cloud.google.com/iam/help/limits) until it is permanently deleted. You have 7 days to undelete the custom role. After 7 days, the following changes occur: * The custom role is permanently deleted and cannot be recovered. * If an IAM policy contains a binding to the custom role, the binding is permanently removed. * The custom role no longer counts toward your custom role limit. */
export const deleteProjectsRoles: API.OperationMethod<
  DeleteProjectsRolesRequest,
  DeleteProjectsRolesResponse,
  DeleteProjectsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsRolesRequest,
  output: DeleteProjectsRolesResponse,
  errors: [],
}));

export interface UndeleteProjectsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [projects.roles.undelete](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/undelete): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.undelete](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/undelete): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
  /** Request body */
  body?: UndeleteRoleRequest;
}

export const UndeleteProjectsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteRoleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/roles/{rolesId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsRolesRequest>;

export type UndeleteProjectsRolesResponse = Role;
export const UndeleteProjectsRolesResponse = Role;

export type UndeleteProjectsRolesError = DefaultErrors;

/** Undeletes a custom Role. */
export const undeleteProjectsRoles: API.OperationMethod<
  UndeleteProjectsRolesRequest,
  UndeleteProjectsRolesResponse,
  UndeleteProjectsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteProjectsRolesRequest,
  output: UndeleteProjectsRolesResponse,
  errors: [],
}));

export interface ListLocationsWorkforcePoolsRequest {
  /** The location of the pool. Format: `locations/{location}`. */
  location: string;
  /** Required. The parent resource to list pools for. Format: `organizations/{org-id}`. */
  parent?: string;
  /** The maximum number of pools to return. The default value is 50. The maximum value is 100. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkforcePools` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted pools. */
  showDeleted?: boolean;
}

export const ListLocationsWorkforcePoolsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/workforcePools" }),
  svc,
) as unknown as Schema.Schema<ListLocationsWorkforcePoolsRequest>;

export type ListLocationsWorkforcePoolsResponse = ListWorkforcePoolsResponse;
export const ListLocationsWorkforcePoolsResponse = ListWorkforcePoolsResponse;

export type ListLocationsWorkforcePoolsError = DefaultErrors;

/** Lists all non-deleted WorkforcePools under the specified parent. If `show_deleted` is set to `true`, then deleted pools are also listed. */
export const listLocationsWorkforcePools: API.PaginatedOperationMethod<
  ListLocationsWorkforcePoolsRequest,
  ListLocationsWorkforcePoolsResponse,
  ListLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsWorkforcePoolsRequest,
  output: ListLocationsWorkforcePoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLocationsWorkforcePoolsRequest {
  /** Required. The name of the pool to retrieve. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  name: string;
}

export const GetLocationsWorkforcePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLocationsWorkforcePoolsRequest>;

export type GetLocationsWorkforcePoolsResponse = WorkforcePool;
export const GetLocationsWorkforcePoolsResponse = WorkforcePool;

export type GetLocationsWorkforcePoolsError = DefaultErrors;

/** Gets an individual WorkforcePool. */
export const getLocationsWorkforcePools: API.OperationMethod<
  GetLocationsWorkforcePoolsRequest,
  GetLocationsWorkforcePoolsResponse,
  GetLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsRequest,
  output: GetLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface CreateLocationsWorkforcePoolsRequest {
  /** Optional. The location of the pool to create. Format: `locations/{location}`. */
  location: string;
  /** Optional. The ID to use for the pool, which becomes the final component of the resource name. The IDs must be a globally unique string of 6 to 63 lowercase letters, digits, or hyphens. It must start with a letter, and cannot have a trailing hyphen. The prefix `gcp-` is reserved for use by Google, and may not be specified. */
  workforcePoolId?: string;
  /** Request body */
  body?: WorkforcePool;
}

export const CreateLocationsWorkforcePoolsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  workforcePoolId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("workforcePoolId"),
  ),
  body: Schema.optional(WorkforcePool).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateLocationsWorkforcePoolsRequest>;

export type CreateLocationsWorkforcePoolsResponse = Operation;
export const CreateLocationsWorkforcePoolsResponse = Operation;

export type CreateLocationsWorkforcePoolsError = DefaultErrors;

/** Creates a new WorkforcePool. You cannot reuse the name of a deleted pool until 30 days after deletion. */
export const createLocationsWorkforcePools: API.OperationMethod<
  CreateLocationsWorkforcePoolsRequest,
  CreateLocationsWorkforcePoolsResponse,
  CreateLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsWorkforcePoolsRequest,
  output: CreateLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface PatchLocationsWorkforcePoolsRequest {
  /** Identifier. The resource name of the pool. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkforcePool;
}

export const PatchLocationsWorkforcePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(WorkforcePool).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchLocationsWorkforcePoolsRequest>;

export type PatchLocationsWorkforcePoolsResponse = Operation;
export const PatchLocationsWorkforcePoolsResponse = Operation;

export type PatchLocationsWorkforcePoolsError = DefaultErrors;

/** Updates an existing WorkforcePool. */
export const patchLocationsWorkforcePools: API.OperationMethod<
  PatchLocationsWorkforcePoolsRequest,
  PatchLocationsWorkforcePoolsResponse,
  PatchLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLocationsWorkforcePoolsRequest,
  output: PatchLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface DeleteLocationsWorkforcePoolsRequest {
  /** Required. The name of the pool to delete. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  name: string;
}

export const DeleteLocationsWorkforcePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsWorkforcePoolsRequest>;

export type DeleteLocationsWorkforcePoolsResponse = Operation;
export const DeleteLocationsWorkforcePoolsResponse = Operation;

export type DeleteLocationsWorkforcePoolsError = DefaultErrors;

/** Deletes a WorkforcePool. You cannot use a deleted WorkforcePool to exchange external credentials for Google Cloud credentials. However, deletion does not revoke credentials that have already been issued. Credentials issued for a deleted pool do not grant access to resources. If the pool is undeleted, and the credentials are not expired, they grant access again. You can undelete a pool for 30 days. After 30 days, deletion is permanent. You cannot update deleted pools. However, you can view and list them. */
export const deleteLocationsWorkforcePools: API.OperationMethod<
  DeleteLocationsWorkforcePoolsRequest,
  DeleteLocationsWorkforcePoolsResponse,
  DeleteLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsWorkforcePoolsRequest,
  output: DeleteLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface UndeleteLocationsWorkforcePoolsRequest {
  /** Required. The name of the pool to undelete. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  name: string;
  /** Request body */
  body?: UndeleteWorkforcePoolRequest;
}

export const UndeleteLocationsWorkforcePoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteWorkforcePoolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteLocationsWorkforcePoolsRequest>;

export type UndeleteLocationsWorkforcePoolsResponse = Operation;
export const UndeleteLocationsWorkforcePoolsResponse = Operation;

export type UndeleteLocationsWorkforcePoolsError = DefaultErrors;

/** Undeletes a WorkforcePool, as long as it was deleted fewer than 30 days ago. */
export const undeleteLocationsWorkforcePools: API.OperationMethod<
  UndeleteLocationsWorkforcePoolsRequest,
  UndeleteLocationsWorkforcePoolsResponse,
  UndeleteLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteLocationsWorkforcePoolsRequest,
  output: UndeleteLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface GetIamPolicyLocationsWorkforcePoolsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyLocationsWorkforcePoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyLocationsWorkforcePoolsRequest>;

export type GetIamPolicyLocationsWorkforcePoolsResponse = Policy;
export const GetIamPolicyLocationsWorkforcePoolsResponse = Policy;

export type GetIamPolicyLocationsWorkforcePoolsError = DefaultErrors;

/** Gets IAM policies on a WorkforcePool. */
export const getIamPolicyLocationsWorkforcePools: API.OperationMethod<
  GetIamPolicyLocationsWorkforcePoolsRequest,
  GetIamPolicyLocationsWorkforcePoolsResponse,
  GetIamPolicyLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyLocationsWorkforcePoolsRequest,
  output: GetIamPolicyLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface SetIamPolicyLocationsWorkforcePoolsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyLocationsWorkforcePoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyLocationsWorkforcePoolsRequest>;

export type SetIamPolicyLocationsWorkforcePoolsResponse = Policy;
export const SetIamPolicyLocationsWorkforcePoolsResponse = Policy;

export type SetIamPolicyLocationsWorkforcePoolsError = DefaultErrors;

/** Sets IAM policies on a WorkforcePool. */
export const setIamPolicyLocationsWorkforcePools: API.OperationMethod<
  SetIamPolicyLocationsWorkforcePoolsRequest,
  SetIamPolicyLocationsWorkforcePoolsResponse,
  SetIamPolicyLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyLocationsWorkforcePoolsRequest,
  output: SetIamPolicyLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface TestIamPermissionsLocationsWorkforcePoolsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsLocationsWorkforcePoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsLocationsWorkforcePoolsRequest>;

export type TestIamPermissionsLocationsWorkforcePoolsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsLocationsWorkforcePoolsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsLocationsWorkforcePoolsError = DefaultErrors;

/** Returns the caller's permissions on the WorkforcePool. If the pool doesn't exist, this call returns an empty set of permissions. It doesn't return a `NOT_FOUND` error. */
export const testIamPermissionsLocationsWorkforcePools: API.OperationMethod<
  TestIamPermissionsLocationsWorkforcePoolsRequest,
  TestIamPermissionsLocationsWorkforcePoolsResponse,
  TestIamPermissionsLocationsWorkforcePoolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsLocationsWorkforcePoolsRequest,
  output: TestIamPermissionsLocationsWorkforcePoolsResponse,
  errors: [],
}));

export interface GetLocationsWorkforcePoolsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetLocationsWorkforcePoolsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLocationsWorkforcePoolsOperationsRequest>;

export type GetLocationsWorkforcePoolsOperationsResponse = Operation;
export const GetLocationsWorkforcePoolsOperationsResponse = Operation;

export type GetLocationsWorkforcePoolsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getLocationsWorkforcePoolsOperations: API.OperationMethod<
  GetLocationsWorkforcePoolsOperationsRequest,
  GetLocationsWorkforcePoolsOperationsResponse,
  GetLocationsWorkforcePoolsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsOperationsRequest,
  output: GetLocationsWorkforcePoolsOperationsResponse,
  errors: [],
}));

export interface ListLocationsWorkforcePoolsProvidersRequest {
  /** Required. The pool to list providers for. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  parent: string;
  /** The maximum number of providers to return. If unspecified, at most 50 providers are returned. The maximum value is 100; values above 100 are truncated to 100. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkforcePoolProviders` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted providers. */
  showDeleted?: boolean;
}

export const ListLocationsWorkforcePoolsProvidersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers",
  }),
  svc,
) as unknown as Schema.Schema<ListLocationsWorkforcePoolsProvidersRequest>;

export type ListLocationsWorkforcePoolsProvidersResponse =
  ListWorkforcePoolProvidersResponse;
export const ListLocationsWorkforcePoolsProvidersResponse =
  ListWorkforcePoolProvidersResponse;

export type ListLocationsWorkforcePoolsProvidersError = DefaultErrors;

/** Lists all non-deleted WorkforcePoolProviders in a WorkforcePool. If `show_deleted` is set to `true`, then deleted providers are also listed. */
export const listLocationsWorkforcePoolsProviders: API.PaginatedOperationMethod<
  ListLocationsWorkforcePoolsProvidersRequest,
  ListLocationsWorkforcePoolsProvidersResponse,
  ListLocationsWorkforcePoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsWorkforcePoolsProvidersRequest,
  output: ListLocationsWorkforcePoolsProvidersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLocationsWorkforcePoolsProvidersRequest {
  /** Required. The name of the provider to retrieve. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` */
  name: string;
}

export const GetLocationsWorkforcePoolsProvidersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLocationsWorkforcePoolsProvidersRequest>;

export type GetLocationsWorkforcePoolsProvidersResponse = WorkforcePoolProvider;
export const GetLocationsWorkforcePoolsProvidersResponse =
  WorkforcePoolProvider;

export type GetLocationsWorkforcePoolsProvidersError = DefaultErrors;

/** Gets an individual WorkforcePoolProvider. */
export const getLocationsWorkforcePoolsProviders: API.OperationMethod<
  GetLocationsWorkforcePoolsProvidersRequest,
  GetLocationsWorkforcePoolsProvidersResponse,
  GetLocationsWorkforcePoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsProvidersRequest,
  output: GetLocationsWorkforcePoolsProvidersResponse,
  errors: [],
}));

export interface CreateLocationsWorkforcePoolsProvidersRequest {
  /** Required. The pool to create this provider in. Format: `locations/{location}/workforcePools/{workforce_pool_id}` */
  parent: string;
  /** Required. The ID for the provider, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters `[a-z0-9-]`. The prefix `gcp-` is reserved for use by Google, and may not be specified. */
  workforcePoolProviderId?: string;
  /** Request body */
  body?: WorkforcePoolProvider;
}

export const CreateLocationsWorkforcePoolsProvidersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  workforcePoolProviderId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("workforcePoolProviderId"),
  ),
  body: Schema.optional(WorkforcePoolProvider).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateLocationsWorkforcePoolsProvidersRequest>;

export type CreateLocationsWorkforcePoolsProvidersResponse = Operation;
export const CreateLocationsWorkforcePoolsProvidersResponse = Operation;

export type CreateLocationsWorkforcePoolsProvidersError = DefaultErrors;

/** Creates a new WorkforcePoolProvider in a WorkforcePool. You cannot reuse the name of a deleted provider until 30 days after deletion. */
export const createLocationsWorkforcePoolsProviders: API.OperationMethod<
  CreateLocationsWorkforcePoolsProvidersRequest,
  CreateLocationsWorkforcePoolsProvidersResponse,
  CreateLocationsWorkforcePoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsWorkforcePoolsProvidersRequest,
  output: CreateLocationsWorkforcePoolsProvidersResponse,
  errors: [],
}));

export interface PatchLocationsWorkforcePoolsProvidersRequest {
  /** Identifier. The resource name of the provider. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkforcePoolProvider;
}

export const PatchLocationsWorkforcePoolsProvidersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(WorkforcePoolProvider).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchLocationsWorkforcePoolsProvidersRequest>;

export type PatchLocationsWorkforcePoolsProvidersResponse = Operation;
export const PatchLocationsWorkforcePoolsProvidersResponse = Operation;

export type PatchLocationsWorkforcePoolsProvidersError = DefaultErrors;

/** Updates an existing WorkforcePoolProvider. */
export const patchLocationsWorkforcePoolsProviders: API.OperationMethod<
  PatchLocationsWorkforcePoolsProvidersRequest,
  PatchLocationsWorkforcePoolsProvidersResponse,
  PatchLocationsWorkforcePoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLocationsWorkforcePoolsProvidersRequest,
  output: PatchLocationsWorkforcePoolsProvidersResponse,
  errors: [],
}));

export interface DeleteLocationsWorkforcePoolsProvidersRequest {
  /** Required. The name of the provider to delete. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` */
  name: string;
}

export const DeleteLocationsWorkforcePoolsProvidersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsWorkforcePoolsProvidersRequest>;

export type DeleteLocationsWorkforcePoolsProvidersResponse = Operation;
export const DeleteLocationsWorkforcePoolsProvidersResponse = Operation;

export type DeleteLocationsWorkforcePoolsProvidersError = DefaultErrors;

/** Deletes a WorkforcePoolProvider. Deleting a provider does not revoke credentials that have already been issued; they continue to grant access. You can undelete a provider for 30 days. After 30 days, deletion is permanent. You cannot update deleted providers. However, you can view and list them. */
export const deleteLocationsWorkforcePoolsProviders: API.OperationMethod<
  DeleteLocationsWorkforcePoolsProvidersRequest,
  DeleteLocationsWorkforcePoolsProvidersResponse,
  DeleteLocationsWorkforcePoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsWorkforcePoolsProvidersRequest,
  output: DeleteLocationsWorkforcePoolsProvidersResponse,
  errors: [],
}));

export interface UndeleteLocationsWorkforcePoolsProvidersRequest {
  /** Required. The name of the provider to undelete. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` */
  name: string;
  /** Request body */
  body?: UndeleteWorkforcePoolProviderRequest;
}

export const UndeleteLocationsWorkforcePoolsProvidersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteWorkforcePoolProviderRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteLocationsWorkforcePoolsProvidersRequest>;

export type UndeleteLocationsWorkforcePoolsProvidersResponse = Operation;
export const UndeleteLocationsWorkforcePoolsProvidersResponse = Operation;

export type UndeleteLocationsWorkforcePoolsProvidersError = DefaultErrors;

/** Undeletes a WorkforcePoolProvider, as long as it was deleted fewer than 30 days ago. */
export const undeleteLocationsWorkforcePoolsProviders: API.OperationMethod<
  UndeleteLocationsWorkforcePoolsProvidersRequest,
  UndeleteLocationsWorkforcePoolsProvidersResponse,
  UndeleteLocationsWorkforcePoolsProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteLocationsWorkforcePoolsProvidersRequest,
  output: UndeleteLocationsWorkforcePoolsProvidersResponse,
  errors: [],
}));

export interface GetLocationsWorkforcePoolsProvidersOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetLocationsWorkforcePoolsProvidersOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLocationsWorkforcePoolsProvidersOperationsRequest>;

export type GetLocationsWorkforcePoolsProvidersOperationsResponse = Operation;
export const GetLocationsWorkforcePoolsProvidersOperationsResponse = Operation;

export type GetLocationsWorkforcePoolsProvidersOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getLocationsWorkforcePoolsProvidersOperations: API.OperationMethod<
  GetLocationsWorkforcePoolsProvidersOperationsRequest,
  GetLocationsWorkforcePoolsProvidersOperationsResponse,
  GetLocationsWorkforcePoolsProvidersOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsProvidersOperationsRequest,
  output: GetLocationsWorkforcePoolsProvidersOperationsResponse,
  errors: [],
}));

export interface ListLocationsWorkforcePoolsProvidersKeysRequest {
  /** Required. The provider resource to list encryption keys for. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` */
  parent: string;
  /** The maximum number of keys to return. If unspecified, all keys are returned. The maximum value is 10; values above 10 are truncated to 10. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkforcePoolProviderKeys` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Whether to return soft-deleted keys. */
  showDeleted?: boolean;
}

export const ListLocationsWorkforcePoolsProvidersKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/keys",
  }),
  svc,
) as unknown as Schema.Schema<ListLocationsWorkforcePoolsProvidersKeysRequest>;

export type ListLocationsWorkforcePoolsProvidersKeysResponse =
  ListWorkforcePoolProviderKeysResponse;
export const ListLocationsWorkforcePoolsProvidersKeysResponse =
  ListWorkforcePoolProviderKeysResponse;

export type ListLocationsWorkforcePoolsProvidersKeysError = DefaultErrors;

/** Lists all non-deleted WorkforcePoolProviderKeys in a WorkforcePoolProvider. If `show_deleted` is set to `true`, then deleted keys are also listed. */
export const listLocationsWorkforcePoolsProvidersKeys: API.PaginatedOperationMethod<
  ListLocationsWorkforcePoolsProvidersKeysRequest,
  ListLocationsWorkforcePoolsProvidersKeysResponse,
  ListLocationsWorkforcePoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsWorkforcePoolsProvidersKeysRequest,
  output: ListLocationsWorkforcePoolsProvidersKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLocationsWorkforcePoolsProvidersKeysRequest {
  /** Required. The name of the key to retrieve. */
  name: string;
}

export const GetLocationsWorkforcePoolsProvidersKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/keys/{keysId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLocationsWorkforcePoolsProvidersKeysRequest>;

export type GetLocationsWorkforcePoolsProvidersKeysResponse =
  WorkforcePoolProviderKey;
export const GetLocationsWorkforcePoolsProvidersKeysResponse =
  WorkforcePoolProviderKey;

export type GetLocationsWorkforcePoolsProvidersKeysError = DefaultErrors;

/** Gets a WorkforcePoolProviderKey. */
export const getLocationsWorkforcePoolsProvidersKeys: API.OperationMethod<
  GetLocationsWorkforcePoolsProvidersKeysRequest,
  GetLocationsWorkforcePoolsProvidersKeysResponse,
  GetLocationsWorkforcePoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsProvidersKeysRequest,
  output: GetLocationsWorkforcePoolsProvidersKeysResponse,
  errors: [],
}));

export interface CreateLocationsWorkforcePoolsProvidersKeysRequest {
  /** Required. The provider to create this key in. */
  parent: string;
  /** Required. The ID to use for the key, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters `[a-z0-9-]`. */
  workforcePoolProviderKeyId?: string;
  /** Request body */
  body?: WorkforcePoolProviderKey;
}

export const CreateLocationsWorkforcePoolsProvidersKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  workforcePoolProviderKeyId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("workforcePoolProviderKeyId"),
  ),
  body: Schema.optional(WorkforcePoolProviderKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/keys",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateLocationsWorkforcePoolsProvidersKeysRequest>;

export type CreateLocationsWorkforcePoolsProvidersKeysResponse = Operation;
export const CreateLocationsWorkforcePoolsProvidersKeysResponse = Operation;

export type CreateLocationsWorkforcePoolsProvidersKeysError = DefaultErrors;

/** Creates a new WorkforcePoolProviderKey in a WorkforcePoolProvider. */
export const createLocationsWorkforcePoolsProvidersKeys: API.OperationMethod<
  CreateLocationsWorkforcePoolsProvidersKeysRequest,
  CreateLocationsWorkforcePoolsProvidersKeysResponse,
  CreateLocationsWorkforcePoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsWorkforcePoolsProvidersKeysRequest,
  output: CreateLocationsWorkforcePoolsProvidersKeysResponse,
  errors: [],
}));

export interface DeleteLocationsWorkforcePoolsProvidersKeysRequest {
  /** Required. The name of the key to delete. */
  name: string;
}

export const DeleteLocationsWorkforcePoolsProvidersKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/keys/{keysId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsWorkforcePoolsProvidersKeysRequest>;

export type DeleteLocationsWorkforcePoolsProvidersKeysResponse = Operation;
export const DeleteLocationsWorkforcePoolsProvidersKeysResponse = Operation;

export type DeleteLocationsWorkforcePoolsProvidersKeysError = DefaultErrors;

/** Deletes a WorkforcePoolProviderKey. You can undelete a key for 30 days. After 30 days, deletion is permanent. */
export const deleteLocationsWorkforcePoolsProvidersKeys: API.OperationMethod<
  DeleteLocationsWorkforcePoolsProvidersKeysRequest,
  DeleteLocationsWorkforcePoolsProvidersKeysResponse,
  DeleteLocationsWorkforcePoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsWorkforcePoolsProvidersKeysRequest,
  output: DeleteLocationsWorkforcePoolsProvidersKeysResponse,
  errors: [],
}));

export interface UndeleteLocationsWorkforcePoolsProvidersKeysRequest {
  /** Required. The name of the key to undelete. */
  name: string;
  /** Request body */
  body?: UndeleteWorkforcePoolProviderKeyRequest;
}

export const UndeleteLocationsWorkforcePoolsProvidersKeysRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkforcePoolProviderKeyRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/keys/{keysId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteLocationsWorkforcePoolsProvidersKeysRequest>;

export type UndeleteLocationsWorkforcePoolsProvidersKeysResponse = Operation;
export const UndeleteLocationsWorkforcePoolsProvidersKeysResponse = Operation;

export type UndeleteLocationsWorkforcePoolsProvidersKeysError = DefaultErrors;

/** Undeletes a WorkforcePoolProviderKey, as long as it was deleted fewer than 30 days ago. */
export const undeleteLocationsWorkforcePoolsProvidersKeys: API.OperationMethod<
  UndeleteLocationsWorkforcePoolsProvidersKeysRequest,
  UndeleteLocationsWorkforcePoolsProvidersKeysResponse,
  UndeleteLocationsWorkforcePoolsProvidersKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteLocationsWorkforcePoolsProvidersKeysRequest,
  output: UndeleteLocationsWorkforcePoolsProvidersKeysResponse,
  errors: [],
}));

export interface GetLocationsWorkforcePoolsProvidersKeysOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetLocationsWorkforcePoolsProvidersKeysOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/keys/{keysId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLocationsWorkforcePoolsProvidersKeysOperationsRequest>;

export type GetLocationsWorkforcePoolsProvidersKeysOperationsResponse =
  Operation;
export const GetLocationsWorkforcePoolsProvidersKeysOperationsResponse =
  Operation;

export type GetLocationsWorkforcePoolsProvidersKeysOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getLocationsWorkforcePoolsProvidersKeysOperations: API.OperationMethod<
  GetLocationsWorkforcePoolsProvidersKeysOperationsRequest,
  GetLocationsWorkforcePoolsProvidersKeysOperationsResponse,
  GetLocationsWorkforcePoolsProvidersKeysOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsProvidersKeysOperationsRequest,
  output: GetLocationsWorkforcePoolsProvidersKeysOperationsResponse,
  errors: [],
}));

export interface ListLocationsWorkforcePoolsProvidersScimTenantsRequest {
  /** Required. Gemini Enterprise only. The parent to list SCIM tenants. Format: 'locations/{location}/workforcePools/{workforce_pool}/providers/{provider}' */
  parent: string;
  /** Optional. Gemini Enterprise only. The maximum number of SCIM tenants to return. If unspecified, at most 50 SCIM tenants will be returned. The maximum value is 100; values above 100 are truncated to 100. */
  pageSize?: number;
  /** Optional. Gemini Enterprise only. A page token, received from a previous `ListScimTenants` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Gemini Enterprise only. Whether to return soft-deleted SCIM tenants. */
  showDeleted?: boolean;
}

export const ListLocationsWorkforcePoolsProvidersScimTenantsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLocationsWorkforcePoolsProvidersScimTenantsRequest>;

export type ListLocationsWorkforcePoolsProvidersScimTenantsResponse =
  ListWorkforcePoolProviderScimTenantsResponse;
export const ListLocationsWorkforcePoolsProvidersScimTenantsResponse =
  ListWorkforcePoolProviderScimTenantsResponse;

export type ListLocationsWorkforcePoolsProvidersScimTenantsError =
  DefaultErrors;

/** Gemini Enterprise only. Lists all non-deleted WorkforcePoolProviderScimTenants in a WorkforcePoolProvider. If `show_deleted` is set to `true`, then deleted SCIM tenants are also listed. */
export const listLocationsWorkforcePoolsProvidersScimTenants: API.PaginatedOperationMethod<
  ListLocationsWorkforcePoolsProvidersScimTenantsRequest,
  ListLocationsWorkforcePoolsProvidersScimTenantsResponse,
  ListLocationsWorkforcePoolsProvidersScimTenantsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsWorkforcePoolsProvidersScimTenantsRequest,
  output: ListLocationsWorkforcePoolsProvidersScimTenantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLocationsWorkforcePoolsProvidersScimTenantsRequest {
  /** Required. Gemini Enterprise only. The name of the SCIM tenant to retrieve. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}` */
  name: string;
}

export const GetLocationsWorkforcePoolsProvidersScimTenantsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLocationsWorkforcePoolsProvidersScimTenantsRequest>;

export type GetLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;
export const GetLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;

export type GetLocationsWorkforcePoolsProvidersScimTenantsError = DefaultErrors;

/** Gemini Enterprise only. Gets an individual WorkforcePoolProviderScimTenant. */
export const getLocationsWorkforcePoolsProvidersScimTenants: API.OperationMethod<
  GetLocationsWorkforcePoolsProvidersScimTenantsRequest,
  GetLocationsWorkforcePoolsProvidersScimTenantsResponse,
  GetLocationsWorkforcePoolsProvidersScimTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsProvidersScimTenantsRequest,
  output: GetLocationsWorkforcePoolsProvidersScimTenantsResponse,
  errors: [],
}));

export interface CreateLocationsWorkforcePoolsProvidersScimTenantsRequest {
  /** Required. Gemini Enterprise only. The parent to create SCIM tenant. Format: 'locations/{location}/workforcePools/{workforce_pool}/providers/{provider}' */
  parent: string;
  /** Required. Gemini Enterprise only. The ID to use for the SCIM tenant, which becomes the final component of the resource name. This value should be 4-32 characters, containing the characters `[a-z0-9-]`. */
  workforcePoolProviderScimTenantId?: string;
  /** Request body */
  body?: WorkforcePoolProviderScimTenant;
}

export const CreateLocationsWorkforcePoolsProvidersScimTenantsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workforcePoolProviderScimTenantId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workforcePoolProviderScimTenantId"),
    ),
    body: Schema.optional(WorkforcePoolProviderScimTenant).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateLocationsWorkforcePoolsProvidersScimTenantsRequest>;

export type CreateLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;
export const CreateLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;

export type CreateLocationsWorkforcePoolsProvidersScimTenantsError =
  DefaultErrors;

/** Gemini Enterprise only. Creates a new WorkforcePoolProviderScimTenant in a WorkforcePoolProvider. You cannot reuse the name of a deleted SCIM tenant until 30 days after deletion. */
export const createLocationsWorkforcePoolsProvidersScimTenants: API.OperationMethod<
  CreateLocationsWorkforcePoolsProvidersScimTenantsRequest,
  CreateLocationsWorkforcePoolsProvidersScimTenantsResponse,
  CreateLocationsWorkforcePoolsProvidersScimTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsWorkforcePoolsProvidersScimTenantsRequest,
  output: CreateLocationsWorkforcePoolsProvidersScimTenantsResponse,
  errors: [],
}));

export interface PatchLocationsWorkforcePoolsProvidersScimTenantsRequest {
  /** Identifier. Gemini Enterprise only. The resource name of the SCIM Tenant. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}` */
  name: string;
  /** Optional. Gemini Enterprise only. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkforcePoolProviderScimTenant;
}

export const PatchLocationsWorkforcePoolsProvidersScimTenantsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkforcePoolProviderScimTenant).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchLocationsWorkforcePoolsProvidersScimTenantsRequest>;

export type PatchLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;
export const PatchLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;

export type PatchLocationsWorkforcePoolsProvidersScimTenantsError =
  DefaultErrors;

/** Gemini Enterprise only. Updates an existing WorkforcePoolProviderScimTenant. */
export const patchLocationsWorkforcePoolsProvidersScimTenants: API.OperationMethod<
  PatchLocationsWorkforcePoolsProvidersScimTenantsRequest,
  PatchLocationsWorkforcePoolsProvidersScimTenantsResponse,
  PatchLocationsWorkforcePoolsProvidersScimTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLocationsWorkforcePoolsProvidersScimTenantsRequest,
  output: PatchLocationsWorkforcePoolsProvidersScimTenantsResponse,
  errors: [],
}));

export interface DeleteLocationsWorkforcePoolsProvidersScimTenantsRequest {
  /** Required. Gemini Enterprise only. The name of the SCIM tenant to delete. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}` */
  name: string;
  /** Optional. Deletes the SCIM tenant immediately. This operation cannot be undone. */
  hardDelete?: boolean;
}

export const DeleteLocationsWorkforcePoolsProvidersScimTenantsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    hardDelete: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("hardDelete")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteLocationsWorkforcePoolsProvidersScimTenantsRequest>;

export type DeleteLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;
export const DeleteLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;

export type DeleteLocationsWorkforcePoolsProvidersScimTenantsError =
  DefaultErrors;

/** Gemini Enterprise only. Deletes a WorkforcePoolProviderScimTenant. You can undelete a SCIM tenant for 30 days. After 30 days, deletion is permanent. You cannot update deleted SCIM tenants. However, you can view and list them. */
export const deleteLocationsWorkforcePoolsProvidersScimTenants: API.OperationMethod<
  DeleteLocationsWorkforcePoolsProvidersScimTenantsRequest,
  DeleteLocationsWorkforcePoolsProvidersScimTenantsResponse,
  DeleteLocationsWorkforcePoolsProvidersScimTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsWorkforcePoolsProvidersScimTenantsRequest,
  output: DeleteLocationsWorkforcePoolsProvidersScimTenantsResponse,
  errors: [],
}));

export interface UndeleteLocationsWorkforcePoolsProvidersScimTenantsRequest {
  /** Required. Gemini Enterprise only. The name of the SCIM tenant to undelete. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}` */
  name: string;
  /** Request body */
  body?: UndeleteWorkforcePoolProviderScimTenantRequest;
}

export const UndeleteLocationsWorkforcePoolsProvidersScimTenantsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkforcePoolProviderScimTenantRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteLocationsWorkforcePoolsProvidersScimTenantsRequest>;

export type UndeleteLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;
export const UndeleteLocationsWorkforcePoolsProvidersScimTenantsResponse =
  WorkforcePoolProviderScimTenant;

export type UndeleteLocationsWorkforcePoolsProvidersScimTenantsError =
  DefaultErrors;

/** Gemini Enterprise only. Undeletes a WorkforcePoolProviderScimTenant, that was deleted fewer than 30 days ago. */
export const undeleteLocationsWorkforcePoolsProvidersScimTenants: API.OperationMethod<
  UndeleteLocationsWorkforcePoolsProvidersScimTenantsRequest,
  UndeleteLocationsWorkforcePoolsProvidersScimTenantsResponse,
  UndeleteLocationsWorkforcePoolsProvidersScimTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteLocationsWorkforcePoolsProvidersScimTenantsRequest,
  output: UndeleteLocationsWorkforcePoolsProvidersScimTenantsResponse,
  errors: [],
}));

export interface ListLocationsWorkforcePoolsProvidersScimTenantsTokensRequest {
  /** Required. Gemini Enterprise only. The parent to list SCIM tokens. Format: 'locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}' */
  parent: string;
  /** Optional. Gemini Enterprise only. The maximum number of SCIM tokens to return. If unspecified, at most 2 SCIM tokens will be returned. */
  pageSize?: number;
  /** Optional. Gemini Enterprise only. A page token, received from a previous `ListWorkforcePoolProviderScimTokens` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Gemini Enterprise only. Whether to return soft-deleted SCIM tokens. */
  showDeleted?: boolean;
}

export const ListLocationsWorkforcePoolsProvidersScimTenantsTokensRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}/tokens",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLocationsWorkforcePoolsProvidersScimTenantsTokensRequest>;

export type ListLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  ListWorkforcePoolProviderScimTokensResponse;
export const ListLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  ListWorkforcePoolProviderScimTokensResponse;

export type ListLocationsWorkforcePoolsProvidersScimTenantsTokensError =
  DefaultErrors;

/** Gemini Enterprise only. Lists all non-deleted WorkforcePoolProviderScimTokenss in a WorkforcePoolProviderScimTenant. If `show_deleted` is set to `true`, then deleted SCIM tokens are also listed. */
export const listLocationsWorkforcePoolsProvidersScimTenantsTokens: API.PaginatedOperationMethod<
  ListLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  ListLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  ListLocationsWorkforcePoolsProvidersScimTenantsTokensError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  output: ListLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLocationsWorkforcePoolsProvidersScimTenantsTokensRequest {
  /** Required. Gemini Enterprise only. The name of the SCIM token to retrieve. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}/tokens/{token}` */
  name: string;
}

export const GetLocationsWorkforcePoolsProvidersScimTenantsTokensRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}/tokens/{tokensId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLocationsWorkforcePoolsProvidersScimTenantsTokensRequest>;

export type GetLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;
export const GetLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;

export type GetLocationsWorkforcePoolsProvidersScimTenantsTokensError =
  DefaultErrors;

/** Gemini Enterprise only. Gets an individual WorkforcePoolProviderScimToken. */
export const getLocationsWorkforcePoolsProvidersScimTenantsTokens: API.OperationMethod<
  GetLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  GetLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  GetLocationsWorkforcePoolsProvidersScimTenantsTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  output: GetLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  errors: [],
}));

export interface CreateLocationsWorkforcePoolsProvidersScimTenantsTokensRequest {
  /** Required. Gemini Enterprise only. The parent tenant to create SCIM token. Format: 'locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}' */
  parent: string;
  /** Required. Gemini Enterprise only. The ID to use for the SCIM token, which becomes the final component of the resource name. This value should be 4-32 characters and follow the pattern: `([a-z]([a-z0-9\\-]{2,30}[a-z0-9]))` */
  workforcePoolProviderScimTokenId?: string;
  /** Request body */
  body?: WorkforcePoolProviderScimToken;
}

export const CreateLocationsWorkforcePoolsProvidersScimTenantsTokensRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workforcePoolProviderScimTokenId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workforcePoolProviderScimTokenId"),
    ),
    body: Schema.optional(WorkforcePoolProviderScimToken).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}/tokens",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateLocationsWorkforcePoolsProvidersScimTenantsTokensRequest>;

export type CreateLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;
export const CreateLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;

export type CreateLocationsWorkforcePoolsProvidersScimTenantsTokensError =
  DefaultErrors;

/** Gemini Enterprise only. Creates a new WorkforcePoolProviderScimToken in a WorkforcePoolProviderScimTenant. You cannot reuse the name of a deleted SCIM token until 30 days after deletion. */
export const createLocationsWorkforcePoolsProvidersScimTenantsTokens: API.OperationMethod<
  CreateLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  CreateLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  CreateLocationsWorkforcePoolsProvidersScimTenantsTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  output: CreateLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  errors: [],
}));

export interface PatchLocationsWorkforcePoolsProvidersScimTenantsTokensRequest {
  /** Identifier. Gemini Enterprise only. The resource name of the SCIM Token. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}/tokens/{token}` */
  name: string;
  /** Optional. Gemini Enterprise only. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: WorkforcePoolProviderScimToken;
}

export const PatchLocationsWorkforcePoolsProvidersScimTenantsTokensRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkforcePoolProviderScimToken).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}/tokens/{tokensId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchLocationsWorkforcePoolsProvidersScimTenantsTokensRequest>;

export type PatchLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;
export const PatchLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;

export type PatchLocationsWorkforcePoolsProvidersScimTenantsTokensError =
  DefaultErrors;

/** Gemini Enterprise only. Updates an existing WorkforcePoolProviderScimToken. */
export const patchLocationsWorkforcePoolsProvidersScimTenantsTokens: API.OperationMethod<
  PatchLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  PatchLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  PatchLocationsWorkforcePoolsProvidersScimTenantsTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  output: PatchLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  errors: [],
}));

export interface DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest {
  /** Required. Gemini Enterprise only. The name of the SCIM token to delete. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}/tokens/{token}` */
  name: string;
}

export const DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}/tokens/{tokensId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest>;

export type DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;
export const DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;

export type DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensError =
  DefaultErrors;

/** Gemini Enterprise only. Deletes a WorkforcePoolProviderScimToken. You can undelete a SCIM token for 30 days. After 30 days, the SCIM token is permanently deleted. You cannot update deleted SCIM tokens, however, you can view and list them. */
export const deleteLocationsWorkforcePoolsProvidersScimTenantsTokens: API.OperationMethod<
  DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  output: DeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  errors: [],
}));

export interface UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest {
  /** Required. Gemini Enterprise only. The name of the SCIM token to undelete. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/{provider}/scimTenants/{scim_tenant}/tokens/{token}` */
  name: string;
  /** Request body */
  body?: UndeleteWorkforcePoolProviderScimTokenRequest;
}

export const UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteWorkforcePoolProviderScimTokenRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/providers/{providersId}/scimTenants/{scimTenantsId}/tokens/{tokensId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest>;

export type UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;
export const UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse =
  WorkforcePoolProviderScimToken;

export type UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensError =
  DefaultErrors;

/** Gemini Enterprise only. Undeletes a WorkforcePoolProviderScimToken,that was deleted fewer than 30 days ago. */
export const undeleteLocationsWorkforcePoolsProvidersScimTenantsTokens: API.OperationMethod<
  UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensRequest,
  output: UndeleteLocationsWorkforcePoolsProvidersScimTenantsTokensResponse,
  errors: [],
}));

export interface DeleteLocationsWorkforcePoolsSubjectsRequest {
  /** Required. The resource name of the WorkforcePoolSubject. Special characters, like `/` and `:`, must be escaped, because all URLs need to conform to the "When to Escape and Unescape" section of [RFC3986](https://www.ietf.org/rfc/rfc2396.txt). Format: `locations/{location}/workforcePools/{workforce_pool_id}/subjects/{subject_id}` */
  name: string;
}

export const DeleteLocationsWorkforcePoolsSubjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/subjects/{subjectsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsWorkforcePoolsSubjectsRequest>;

export type DeleteLocationsWorkforcePoolsSubjectsResponse = Operation;
export const DeleteLocationsWorkforcePoolsSubjectsResponse = Operation;

export type DeleteLocationsWorkforcePoolsSubjectsError = DefaultErrors;

/** Deletes a WorkforcePoolSubject. Subject must not already be in a deleted state. A WorkforcePoolSubject is automatically created the first time an external credential is exchanged for a Google Cloud credential using a mapped `google.subject` attribute. There is no endpoint to manually create a WorkforcePoolSubject. For 30 days after a WorkforcePoolSubject is deleted, using the same `google.subject` attribute in token exchanges with Google Cloud STS fails. Call UndeleteWorkforcePoolSubject to undelete a WorkforcePoolSubject that has been deleted, within within 30 days of deleting it. After 30 days, the WorkforcePoolSubject is permanently deleted. At this point, a token exchange with Google Cloud STS that uses the same mapped `google.subject` attribute automatically creates a new WorkforcePoolSubject that is unrelated to the previously deleted WorkforcePoolSubject but has the same `google.subject` value. */
export const deleteLocationsWorkforcePoolsSubjects: API.OperationMethod<
  DeleteLocationsWorkforcePoolsSubjectsRequest,
  DeleteLocationsWorkforcePoolsSubjectsResponse,
  DeleteLocationsWorkforcePoolsSubjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsWorkforcePoolsSubjectsRequest,
  output: DeleteLocationsWorkforcePoolsSubjectsResponse,
  errors: [],
}));

export interface UndeleteLocationsWorkforcePoolsSubjectsRequest {
  /** Required. The resource name of the WorkforcePoolSubject. Special characters, like `/` and `:`, must be escaped, because all URLs need to conform to the "When to Escape and Unescape" section of [RFC3986](https://www.ietf.org/rfc/rfc2396.txt). Format: `locations/{location}/workforcePools/{workforce_pool_id}/subjects/{subject_id}` */
  name: string;
  /** Request body */
  body?: UndeleteWorkforcePoolSubjectRequest;
}

export const UndeleteLocationsWorkforcePoolsSubjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteWorkforcePoolSubjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/subjects/{subjectsId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteLocationsWorkforcePoolsSubjectsRequest>;

export type UndeleteLocationsWorkforcePoolsSubjectsResponse = Operation;
export const UndeleteLocationsWorkforcePoolsSubjectsResponse = Operation;

export type UndeleteLocationsWorkforcePoolsSubjectsError = DefaultErrors;

/** Undeletes a WorkforcePoolSubject, as long as it was deleted fewer than 30 days ago. */
export const undeleteLocationsWorkforcePoolsSubjects: API.OperationMethod<
  UndeleteLocationsWorkforcePoolsSubjectsRequest,
  UndeleteLocationsWorkforcePoolsSubjectsResponse,
  UndeleteLocationsWorkforcePoolsSubjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteLocationsWorkforcePoolsSubjectsRequest,
  output: UndeleteLocationsWorkforcePoolsSubjectsResponse,
  errors: [],
}));

export interface GetLocationsWorkforcePoolsSubjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetLocationsWorkforcePoolsSubjectsOperationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/locations/{locationsId}/workforcePools/{workforcePoolsId}/subjects/{subjectsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLocationsWorkforcePoolsSubjectsOperationsRequest>;

export type GetLocationsWorkforcePoolsSubjectsOperationsResponse = Operation;
export const GetLocationsWorkforcePoolsSubjectsOperationsResponse = Operation;

export type GetLocationsWorkforcePoolsSubjectsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getLocationsWorkforcePoolsSubjectsOperations: API.OperationMethod<
  GetLocationsWorkforcePoolsSubjectsOperationsRequest,
  GetLocationsWorkforcePoolsSubjectsOperationsResponse,
  GetLocationsWorkforcePoolsSubjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsWorkforcePoolsSubjectsOperationsRequest,
  output: GetLocationsWorkforcePoolsSubjectsOperationsResponse,
  errors: [],
}));

export interface QueryGrantableRolesRolesRequest {
  /** Request body */
  body?: QueryGrantableRolesRequest;
}

export const QueryGrantableRolesRolesRequest = Schema.Struct({
  body: Schema.optional(QueryGrantableRolesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/roles:queryGrantableRoles",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<QueryGrantableRolesRolesRequest>;

export type QueryGrantableRolesRolesResponse = QueryGrantableRolesResponse;
export const QueryGrantableRolesRolesResponse = QueryGrantableRolesResponse;

export type QueryGrantableRolesRolesError = DefaultErrors;

/** Lists roles that can be granted on a Google Cloud resource. A role is grantable if the IAM policy for the resource can contain bindings to the role. */
export const queryGrantableRolesRoles: API.OperationMethod<
  QueryGrantableRolesRolesRequest,
  QueryGrantableRolesRolesResponse,
  QueryGrantableRolesRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryGrantableRolesRolesRequest,
  output: QueryGrantableRolesRolesResponse,
  errors: [],
}));

export interface ListRolesRequest {
  /** The `parent` parameter's value depends on the target resource for the request, namely [roles](https://cloud.google.com/iam/docs/reference/rest/v1/roles), [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below: * [roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/roles/list): An empty string. This method doesn't require a resource; it simply returns all [predefined roles](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles` * [projects.roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/list): `projects/{PROJECT_ID}`. This method lists all project-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles` * [organizations.roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/list): `organizations/{ORGANIZATION_ID}`. This method lists all organization-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  parent?: string;
  /** Optional limit on the number of roles to include in the response. The default is 300, and the maximum is 1,000. */
  pageSize?: number;
  /** Optional pagination token returned in an earlier ListRolesResponse. */
  pageToken?: string;
  /** Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field. */
  view?: "BASIC" | "FULL" | (string & {});
  /** Include Roles that have been deleted. */
  showDeleted?: boolean;
}

export const ListRolesRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/roles" }),
  svc,
) as unknown as Schema.Schema<ListRolesRequest>;

export type ListRolesResponse_Op = ListRolesResponse;
export const ListRolesResponse_Op = ListRolesResponse;

export type ListRolesError = DefaultErrors;

/** Lists every predefined Role that IAM supports, or every custom role that is defined for an organization or project. */
export const listRoles: API.PaginatedOperationMethod<
  ListRolesRequest,
  ListRolesResponse_Op,
  ListRolesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListRolesRequest,
  output: ListRolesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [roles](https://cloud.google.com/iam/docs/reference/rest/v1/roles), [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`. This method returns results from all [predefined roles](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles/{ROLE_NAME}` * [projects.roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/get): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/get): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
}

export const GetRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/roles/{rolesId}" }),
  svc,
) as unknown as Schema.Schema<GetRolesRequest>;

export type GetRolesResponse = Role;
export const GetRolesResponse = Role;

export type GetRolesError = DefaultErrors;

/** Gets the definition of a Role. */
export const getRoles: API.OperationMethod<
  GetRolesRequest,
  GetRolesResponse,
  GetRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRolesRequest,
  output: GetRolesResponse,
  errors: [],
}));

export interface ListOrganizationsRolesRequest {
  /** The `parent` parameter's value depends on the target resource for the request, namely [roles](https://cloud.google.com/iam/docs/reference/rest/v1/roles), [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below: * [roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/roles/list): An empty string. This method doesn't require a resource; it simply returns all [predefined roles](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles` * [projects.roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/list): `projects/{PROJECT_ID}`. This method lists all project-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles` * [organizations.roles.list](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/list): `organizations/{ORGANIZATION_ID}`. This method lists all organization-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  parent: string;
  /** Optional limit on the number of roles to include in the response. The default is 300, and the maximum is 1,000. */
  pageSize?: number;
  /** Optional pagination token returned in an earlier ListRolesResponse. */
  pageToken?: string;
  /** Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field. */
  view?: "BASIC" | "FULL" | (string & {});
  /** Include Roles that have been deleted. */
  showDeleted?: boolean;
}

export const ListOrganizationsRolesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/roles" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsRolesRequest>;

export type ListOrganizationsRolesResponse = ListRolesResponse;
export const ListOrganizationsRolesResponse = ListRolesResponse;

export type ListOrganizationsRolesError = DefaultErrors;

/** Lists every predefined Role that IAM supports, or every custom role that is defined for an organization or project. */
export const listOrganizationsRoles: API.PaginatedOperationMethod<
  ListOrganizationsRolesRequest,
  ListOrganizationsRolesResponse,
  ListOrganizationsRolesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListOrganizationsRolesRequest,
  output: ListOrganizationsRolesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [roles](https://cloud.google.com/iam/docs/reference/rest/v1/roles), [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles), or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`. This method returns results from all [predefined roles](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) in IAM. Example request URL: `https://iam.googleapis.com/v1/roles/{ROLE_NAME}` * [projects.roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/get): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.get](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/get): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
}

export const GetOrganizationsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/organizations/{organizationsId}/roles/{rolesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsRolesRequest>;

export type GetOrganizationsRolesResponse = Role;
export const GetOrganizationsRolesResponse = Role;

export type GetOrganizationsRolesError = DefaultErrors;

/** Gets the definition of a Role. */
export const getOrganizationsRoles: API.OperationMethod<
  GetOrganizationsRolesRequest,
  GetOrganizationsRolesResponse,
  GetOrganizationsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrganizationsRolesRequest,
  output: GetOrganizationsRolesResponse,
  errors: [],
}));

export interface CreateOrganizationsRolesRequest {
  /** The `parent` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below: * [projects.roles.create](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/create): `projects/{PROJECT_ID}`. This method creates project-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles` * [organizations.roles.create](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/create): `organizations/{ORGANIZATION_ID}`. This method creates organization-level [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles). Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  parent: string;
  /** Request body */
  body?: CreateRoleRequest;
}

export const CreateOrganizationsRolesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateRoleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/organizations/{organizationsId}/roles",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsRolesRequest>;

export type CreateOrganizationsRolesResponse = Role;
export const CreateOrganizationsRolesResponse = Role;

export type CreateOrganizationsRolesError = DefaultErrors;

/** Creates a new custom Role. */
export const createOrganizationsRoles: API.OperationMethod<
  CreateOrganizationsRolesRequest,
  CreateOrganizationsRolesResponse,
  CreateOrganizationsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOrganizationsRolesRequest,
  output: CreateOrganizationsRolesResponse,
  errors: [],
}));

export interface PatchOrganizationsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [projects.roles.patch](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/patch): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.patch](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/patch): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
  /** A mask describing which fields in the Role have changed. */
  updateMask?: string;
  /** Request body */
  body?: Role;
}

export const PatchOrganizationsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Role).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/organizations/{organizationsId}/roles/{rolesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsRolesRequest>;

export type PatchOrganizationsRolesResponse = Role;
export const PatchOrganizationsRolesResponse = Role;

export type PatchOrganizationsRolesError = DefaultErrors;

/** Updates the definition of a custom Role. */
export const patchOrganizationsRoles: API.OperationMethod<
  PatchOrganizationsRolesRequest,
  PatchOrganizationsRolesResponse,
  PatchOrganizationsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchOrganizationsRolesRequest,
  output: PatchOrganizationsRolesResponse,
  errors: [],
}));

export interface DeleteOrganizationsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [projects.roles.delete](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/delete): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.delete](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/delete): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
  /** Used to perform a consistent read-modify-write. */
  etag?: string;
}

export const DeleteOrganizationsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/organizations/{organizationsId}/roles/{rolesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsRolesRequest>;

export type DeleteOrganizationsRolesResponse = Role;
export const DeleteOrganizationsRolesResponse = Role;

export type DeleteOrganizationsRolesError = DefaultErrors;

/** Deletes a custom Role. When you delete a custom role, the following changes occur immediately: * You cannot bind a principal to the custom role in an IAM Policy. * Existing bindings to the custom role are not changed, but they have no effect. * By default, the response from ListRoles does not include the custom role. A deleted custom role still counts toward the [custom role limit](https://cloud.google.com/iam/help/limits) until it is permanently deleted. You have 7 days to undelete the custom role. After 7 days, the following changes occur: * The custom role is permanently deleted and cannot be recovered. * If an IAM policy contains a binding to the custom role, the binding is permanently removed. * The custom role no longer counts toward your custom role limit. */
export const deleteOrganizationsRoles: API.OperationMethod<
  DeleteOrganizationsRolesRequest,
  DeleteOrganizationsRolesResponse,
  DeleteOrganizationsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOrganizationsRolesRequest,
  output: DeleteOrganizationsRolesResponse,
  errors: [],
}));

export interface UndeleteOrganizationsRolesRequest {
  /** The `name` parameter's value depends on the target resource for the request, namely [projects](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles) or [organizations](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below: * [projects.roles.undelete](https://cloud.google.com/iam/docs/reference/rest/v1/projects.roles/undelete): `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the project level. Example request URL: `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}` * [organizations.roles.undelete](https://cloud.google.com/iam/docs/reference/rest/v1/organizations.roles/undelete): `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes only [custom roles](https://cloud.google.com/iam/docs/understanding-custom-roles) that have been created at the organization level. Example request URL: `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}` Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID. */
  name: string;
  /** Request body */
  body?: UndeleteRoleRequest;
}

export const UndeleteOrganizationsRolesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteRoleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/organizations/{organizationsId}/roles/{rolesId}:undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteOrganizationsRolesRequest>;

export type UndeleteOrganizationsRolesResponse = Role;
export const UndeleteOrganizationsRolesResponse = Role;

export type UndeleteOrganizationsRolesError = DefaultErrors;

/** Undeletes a custom Role. */
export const undeleteOrganizationsRoles: API.OperationMethod<
  UndeleteOrganizationsRolesRequest,
  UndeleteOrganizationsRolesResponse,
  UndeleteOrganizationsRolesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteOrganizationsRolesRequest,
  output: UndeleteOrganizationsRolesResponse,
  errors: [],
}));

export interface QueryTestablePermissionsPermissionsRequest {
  /** Request body */
  body?: QueryTestablePermissionsRequest;
}

export const QueryTestablePermissionsPermissionsRequest = Schema.Struct({
  body: Schema.optional(QueryTestablePermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/permissions:queryTestablePermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<QueryTestablePermissionsPermissionsRequest>;

export type QueryTestablePermissionsPermissionsResponse =
  QueryTestablePermissionsResponse;
export const QueryTestablePermissionsPermissionsResponse =
  QueryTestablePermissionsResponse;

export type QueryTestablePermissionsPermissionsError = DefaultErrors;

/** Lists every permission that you can test on a resource. A permission is testable if you can check whether a principal has that permission on the resource. */
export const queryTestablePermissionsPermissions: API.OperationMethod<
  QueryTestablePermissionsPermissionsRequest,
  QueryTestablePermissionsPermissionsResponse,
  QueryTestablePermissionsPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryTestablePermissionsPermissionsRequest,
  output: QueryTestablePermissionsPermissionsResponse,
  errors: [],
}));

export interface QueryAuditableServicesIamPoliciesRequest {
  /** Request body */
  body?: QueryAuditableServicesRequest;
}

export const QueryAuditableServicesIamPoliciesRequest = Schema.Struct({
  body: Schema.optional(QueryAuditableServicesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/iamPolicies:queryAuditableServices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<QueryAuditableServicesIamPoliciesRequest>;

export type QueryAuditableServicesIamPoliciesResponse =
  QueryAuditableServicesResponse;
export const QueryAuditableServicesIamPoliciesResponse =
  QueryAuditableServicesResponse;

export type QueryAuditableServicesIamPoliciesError = DefaultErrors;

/** Returns a list of services that allow you to opt into audit logs that are not generated by default. To learn more about audit logs, see the [Logging documentation](https://cloud.google.com/logging/docs/audit). */
export const queryAuditableServicesIamPolicies: API.OperationMethod<
  QueryAuditableServicesIamPoliciesRequest,
  QueryAuditableServicesIamPoliciesResponse,
  QueryAuditableServicesIamPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: QueryAuditableServicesIamPoliciesRequest,
  output: QueryAuditableServicesIamPoliciesResponse,
  errors: [],
}));

export interface LintPolicyIamPoliciesRequest {
  /** Request body */
  body?: LintPolicyRequest;
}

export const LintPolicyIamPoliciesRequest = Schema.Struct({
  body: Schema.optional(LintPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/iamPolicies:lintPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LintPolicyIamPoliciesRequest>;

export type LintPolicyIamPoliciesResponse = LintPolicyResponse;
export const LintPolicyIamPoliciesResponse = LintPolicyResponse;

export type LintPolicyIamPoliciesError = DefaultErrors;

/** Lints, or validates, an IAM policy. Currently checks the google.iam.v1.Binding.condition field, which contains a condition expression for a role binding. Successful calls to this method always return an HTTP `200 OK` status code, even if the linter detects an issue in the IAM policy. */
export const lintPolicyIamPolicies: API.OperationMethod<
  LintPolicyIamPoliciesRequest,
  LintPolicyIamPoliciesResponse,
  LintPolicyIamPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LintPolicyIamPoliciesRequest,
  output: LintPolicyIamPoliciesResponse,
  errors: [],
}));
