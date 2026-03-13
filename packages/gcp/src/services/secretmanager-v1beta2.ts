// ==========================================================================
// Secret Manager API (secretmanager v1beta2)
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
  name: "secretmanager",
  version: "v1beta2",
  rootUrl: "https://secretmanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Topic {
  /** Required. The resource name of the Pub/Sub topic that will be published to, in the following format: `projects/* /topics/*`. For publication to succeed, the Secret Manager service agent must have the `pubsub.topic.publish` permission on the topic. The Pub/Sub Publisher role (`roles/pubsub.publisher`) includes this permission. */
  name?: string;
}

export const Topic: Schema.Schema<Topic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface CustomerManagedEncryptionStatus {
  /** Required. The resource name of the Cloud KMS CryptoKeyVersion used to encrypt the secret payload, in the following format: `projects/* /locations/* /keyRings/* /cryptoKeys/* /versions/*`. */
  kmsKeyVersionName?: string;
}

export const CustomerManagedEncryptionStatus: Schema.Schema<CustomerManagedEncryptionStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKeyVersionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomerManagedEncryptionStatus",
  }) as any as Schema.Schema<CustomerManagedEncryptionStatus>;

export interface ReplicaStatus {
  /** Output only. The canonical ID of the replica location. For example: `"us-east1"`. */
  location?: string;
  /** Output only. The customer-managed encryption status of the SecretVersion. Only populated if customer-managed encryption is used. */
  customerManagedEncryption?: CustomerManagedEncryptionStatus;
}

export const ReplicaStatus: Schema.Schema<ReplicaStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      customerManagedEncryption: Schema.optional(
        CustomerManagedEncryptionStatus,
      ),
    }),
  ).annotate({
    identifier: "ReplicaStatus",
  }) as any as Schema.Schema<ReplicaStatus>;

export interface UserManagedStatus {
  /** Output only. The list of replica statuses for the SecretVersion. */
  replicas?: Array<ReplicaStatus>;
}

export const UserManagedStatus: Schema.Schema<UserManagedStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replicas: Schema.optional(Schema.Array(ReplicaStatus)),
    }),
  ).annotate({
    identifier: "UserManagedStatus",
  }) as any as Schema.Schema<UserManagedStatus>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface SecretPayload {
  /** Optional. If specified, SecretManagerService will verify the integrity of the received data on SecretManagerService.AddSecretVersion calls using the crc32c checksum and store it to include in future SecretManagerService.AccessSecretVersion responses. If a checksum is not provided in the SecretManagerService.AddSecretVersion request, the SecretManagerService will generate and store one for you. The CRC32C value is encoded as a Int64 for compatibility, and can be safely downconverted to uint32 in languages that support this type. https://cloud.google.com/apis/design/design_patterns#integer_types */
  dataCrc32c?: string;
  /** The secret data. Must be no larger than 64KiB. */
  data?: string;
}

export const SecretPayload: Schema.Schema<SecretPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataCrc32c: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretPayload",
  }) as any as Schema.Schema<SecretPayload>;

export interface AutomaticStatus {
  /** Output only. The customer-managed encryption status of the SecretVersion. Only populated if customer-managed encryption is used. */
  customerManagedEncryption?: CustomerManagedEncryptionStatus;
}

export const AutomaticStatus: Schema.Schema<AutomaticStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customerManagedEncryption: Schema.optional(
        CustomerManagedEncryptionStatus,
      ),
    }),
  ).annotate({
    identifier: "AutomaticStatus",
  }) as any as Schema.Schema<AutomaticStatus>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface Rotation {
  /** Input only. The Duration between rotation notifications. Must be in seconds and at least 3600s (1h) and at most 3153600000s (100 years). If rotation_period is set, next_rotation_time must be set. next_rotation_time will be advanced by this period when the service automatically sends rotation notifications. */
  rotationPeriod?: string;
  /** Optional. Timestamp in UTC at which the Secret is scheduled to rotate. Cannot be set to less than 300s (5 min) in the future and at most 3153600000s (100 years). next_rotation_time MUST be set if rotation_period is set. */
  nextRotationTime?: string;
}

export const Rotation: Schema.Schema<Rotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rotationPeriod: Schema.optional(Schema.String),
      nextRotationTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Rotation" }) as any as Schema.Schema<Rotation>;

export interface CustomerManagedEncryption {
  /** Required. The resource name of the Cloud KMS CryptoKey used to encrypt secret payloads. For secrets using the UserManaged replication policy type, Cloud KMS CryptoKeys must reside in the same location as the replica location. For secrets using the Automatic replication policy type, Cloud KMS CryptoKeys must reside in `global`. The expected format is `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  kmsKeyName?: string;
}

export const CustomerManagedEncryption: Schema.Schema<CustomerManagedEncryption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomerManagedEncryption",
  }) as any as Schema.Schema<CustomerManagedEncryption>;

export interface Automatic {
  /** Optional. The customer-managed encryption configuration of the Secret. If no configuration is provided, Google-managed default encryption is used. Updates to the Secret encryption configuration only apply to SecretVersions added afterwards. They do not apply retroactively to existing SecretVersions. */
  customerManagedEncryption?: CustomerManagedEncryption;
}

export const Automatic: Schema.Schema<Automatic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customerManagedEncryption: Schema.optional(CustomerManagedEncryption),
    }),
  ).annotate({ identifier: "Automatic" }) as any as Schema.Schema<Automatic>;

export interface Replica {
  /** Optional. The customer-managed encryption configuration of the User-Managed Replica. If no configuration is provided, Google-managed default encryption is used. Updates to the Secret encryption configuration only apply to SecretVersions added afterwards. They do not apply retroactively to existing SecretVersions. */
  customerManagedEncryption?: CustomerManagedEncryption;
  /** The canonical IDs of the location to replicate data. For example: `"us-east1"`. */
  location?: string;
}

export const Replica: Schema.Schema<Replica> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customerManagedEncryption: Schema.optional(CustomerManagedEncryption),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Replica" }) as any as Schema.Schema<Replica>;

export interface UserManaged {
  /** Required. The list of Replicas for this Secret. Cannot be empty. */
  replicas?: Array<Replica>;
}

export const UserManaged: Schema.Schema<UserManaged> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replicas: Schema.optional(Schema.Array(Replica)),
    }),
  ).annotate({
    identifier: "UserManaged",
  }) as any as Schema.Schema<UserManaged>;

export interface Replication {
  /** The Secret will automatically be replicated without any restrictions. */
  automatic?: Automatic;
  /** The Secret will only be replicated into the locations specified. */
  userManaged?: UserManaged;
}

export const Replication: Schema.Schema<Replication> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      automatic: Schema.optional(Automatic),
      userManaged: Schema.optional(UserManaged),
    }),
  ).annotate({
    identifier: "Replication",
  }) as any as Schema.Schema<Replication>;

export interface Secret {
  /** Optional. Rotation policy attached to the Secret. May be excluded if there is no rotation policy. */
  rotation?: Rotation;
  /** Optional. Secret Version TTL after destruction request This is a part of the Delayed secret version destroy feature. For secret with TTL>0, version destruction doesn't happen immediately on calling destroy instead the version goes to a disabled state and destruction happens after the TTL expires. */
  versionDestroyTtl?: string;
  /** Optional. Immutable. The replication policy of the secret data attached to the Secret. The replication policy cannot be changed after the Secret has been created. */
  replication?: Replication;
  /** Optional. The customer-managed encryption configuration of the Regionalised Secrets. If no configuration is provided, Google-managed default encryption is used. Updates to the Secret encryption configuration only apply to SecretVersions added afterwards. They do not apply retroactively to existing SecretVersions. */
  customerManagedEncryption?: CustomerManagedEncryption;
  /** Input only. The TTL for the Secret. */
  ttl?: string;
  /** Optional. Etag of the currently stored Secret. */
  etag?: string;
  /** Optional. Custom metadata about the secret. Annotations are distinct from various forms of labels. Annotations exist to allow client tools to store their own state information without requiring a database. Annotation keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, begin and end with an alphanumeric character ([a-z0-9A-Z]), and may have dashes (-), underscores (_), dots (.), and alphanumerics in between these symbols. The total size of annotation keys and values must be less than 16KiB. */
  annotations?: Record<string, string>;
  /** Optional. Input only. Immutable. Mapping of Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" Tags are used to organize and group resources. Tags can be used to control policy evaluation for the resource. */
  tags?: Record<string, string>;
  /** Output only. The resource name of the Secret in the format `projects/* /secrets/*`. */
  name?: string;
  /** Optional. Mapping from version alias to version name. A version alias is a string with a maximum length of 63 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore ('_') characters. An alias string must start with a letter and cannot be the string 'latest' or 'NEW'. No more than 50 aliases can be assigned to a given secret. Version-Alias pairs will be viewable via GetSecret and modifiable via UpdateSecret. Access by alias is only supported for GetSecretVersion and AccessSecretVersion. */
  versionAliases?: Record<string, string>;
  /** Optional. Timestamp in UTC when the Secret is scheduled to expire. This is always provided on output, regardless of what was sent on input. */
  expireTime?: string;
  /** The labels assigned to this Secret. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: `\p{Ll}\p{Lo}{0,62}` Label values must be between 0 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}` No more than 64 labels can be assigned to a given resource. */
  labels?: Record<string, string>;
  /** Output only. The time at which the Secret was created. */
  createTime?: string;
  /** Optional. A list of up to 10 Pub/Sub topics to which messages are published when control plane operations are called on the secret or its versions. */
  topics?: Array<Topic>;
}

export const Secret: Schema.Schema<Secret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rotation: Schema.optional(Rotation),
      versionDestroyTtl: Schema.optional(Schema.String),
      replication: Schema.optional(Replication),
      customerManagedEncryption: Schema.optional(CustomerManagedEncryption),
      ttl: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      versionAliases: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      expireTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      topics: Schema.optional(Schema.Array(Topic)),
    }),
  ).annotate({ identifier: "Secret" }) as any as Schema.Schema<Secret>;

export interface ListSecretsResponse {
  /** The list of Secrets sorted in reverse by create_time (newest first). */
  secrets?: Array<Secret>;
  /** The total number of Secrets but 0 when the ListSecretsRequest.filter field is set. */
  totalSize?: number;
  /** A token to retrieve the next page of results. Pass this value in ListSecretsRequest.page_token to retrieve the next page. */
  nextPageToken?: string;
}

export const ListSecretsResponse: Schema.Schema<ListSecretsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secrets: Schema.optional(Schema.Array(Secret)),
      totalSize: Schema.optional(Schema.Number),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSecretsResponse",
  }) as any as Schema.Schema<ListSecretsResponse>;

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

export const AuditLogConfig: Schema.Schema<AuditLogConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AuditLogConfig",
  }) as any as Schema.Schema<AuditLogConfig>;

export interface DestroySecretVersionRequest {
  /** Optional. Etag of the SecretVersion. The request succeeds if it matches the etag of the currently stored secret version object. If the etag is omitted, the request succeeds. */
  etag?: string;
}

export const DestroySecretVersionRequest: Schema.Schema<DestroySecretVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DestroySecretVersionRequest",
  }) as any as Schema.Schema<DestroySecretVersionRequest>;

export interface Location {
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Expr),
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
    }),
  ).annotate({
    identifier: "AuditConfig",
  }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      bindings: Schema.optional(Schema.Array(Binding)),
      version: Schema.optional(Schema.Number),
      auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface ReplicationStatus {
  /** Describes the replication status of a SecretVersion with user-managed replication. Only populated if the parent Secret has a user-managed replication policy. */
  userManaged?: UserManagedStatus;
  /** Describes the replication status of a SecretVersion with automatic replication. Only populated if the parent Secret has an automatic replication policy. */
  automatic?: AutomaticStatus;
}

export const ReplicationStatus: Schema.Schema<ReplicationStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userManaged: Schema.optional(UserManagedStatus),
      automatic: Schema.optional(AutomaticStatus),
    }),
  ).annotate({
    identifier: "ReplicationStatus",
  }) as any as Schema.Schema<ReplicationStatus>;

export interface SecretVersion {
  /** Output only. The current state of the SecretVersion. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ENABLED"
    | "DISABLED"
    | "DESTROYED"
    | (string & {});
  /** Output only. True if payload checksum specified in SecretPayload object has been received by SecretManagerService on SecretManagerService.AddSecretVersion. */
  clientSpecifiedPayloadChecksum?: boolean;
  /** Output only. Etag of the currently stored SecretVersion. */
  etag?: string;
  /** Output only. The customer-managed encryption status of the SecretVersion. Only populated if customer-managed encryption is used and Secret is a Regionalised Secret. */
  customerManagedEncryption?: CustomerManagedEncryptionStatus;
  /** Output only. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*`. SecretVersion IDs in a Secret start at 1 and are incremented for each subsequent version of the secret. */
  name?: string;
  /** Optional. Output only. Scheduled destroy time for secret version. This is a part of the Delayed secret version destroy feature. For a Secret with a valid version destroy TTL, when a secert version is destroyed, version is moved to disabled state and it is scheduled for destruction Version is destroyed only after the scheduled_destroy_time. */
  scheduledDestroyTime?: string;
  /** Output only. The time at which the SecretVersion was created. */
  createTime?: string;
  /** The replication status of the SecretVersion. */
  replicationStatus?: ReplicationStatus;
  /** Output only. The time this SecretVersion was destroyed. Only present if state is DESTROYED. */
  destroyTime?: string;
}

export const SecretVersion: Schema.Schema<SecretVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      clientSpecifiedPayloadChecksum: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
      customerManagedEncryption: Schema.optional(
        CustomerManagedEncryptionStatus,
      ),
      name: Schema.optional(Schema.String),
      scheduledDestroyTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      replicationStatus: Schema.optional(ReplicationStatus),
      destroyTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretVersion",
  }) as any as Schema.Schema<SecretVersion>;

export interface ListSecretVersionsResponse {
  /** The list of SecretVersions sorted in reverse by create_time (newest first). */
  versions?: Array<SecretVersion>;
  /** The total number of SecretVersions but 0 when the ListSecretsRequest.filter field is set. */
  totalSize?: number;
  /** A token to retrieve the next page of results. Pass this value in ListSecretVersionsRequest.page_token to retrieve the next page. */
  nextPageToken?: string;
}

export const ListSecretVersionsResponse: Schema.Schema<ListSecretVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(SecretVersion)),
      totalSize: Schema.optional(Schema.Number),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSecretVersionsResponse",
  }) as any as Schema.Schema<ListSecretVersionsResponse>;

export interface EnableSecretVersionRequest {
  /** Optional. Etag of the SecretVersion. The request succeeds if it matches the etag of the currently stored secret version object. If the etag is omitted, the request succeeds. */
  etag?: string;
}

export const EnableSecretVersionRequest: Schema.Schema<EnableSecretVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnableSecretVersionRequest",
  }) as any as Schema.Schema<EnableSecretVersionRequest>;

export interface DisableSecretVersionRequest {
  /** Optional. Etag of the SecretVersion. The request succeeds if it matches the etag of the currently stored secret version object. If the etag is omitted, the request succeeds. */
  etag?: string;
}

export const DisableSecretVersionRequest: Schema.Schema<DisableSecretVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DisableSecretVersionRequest",
  }) as any as Schema.Schema<DisableSecretVersionRequest>;

export interface AddSecretVersionRequest {
  /** Required. The secret payload of the SecretVersion. */
  payload?: SecretPayload;
}

export const AddSecretVersionRequest: Schema.Schema<AddSecretVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      payload: Schema.optional(SecretPayload),
    }),
  ).annotate({
    identifier: "AddSecretVersionRequest",
  }) as any as Schema.Schema<AddSecretVersionRequest>;

export interface OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verb: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      target: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface Operation {
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      name: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface AccessSecretVersionResponse {
  /** Secret payload */
  payload?: SecretPayload;
  /** The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name?: string;
}

export const AccessSecretVersionResponse: Schema.Schema<AccessSecretVersionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      payload: Schema.optional(SecretPayload),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccessSecretVersionResponse",
  }) as any as Schema.Schema<AccessSecretVersionResponse>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsSecretsRequest {
  /** Optional. Etag of the Secret. The request succeeds if it matches the etag of the currently stored secret object. If the etag is omitted, the request succeeds. */
  etag?: string;
  /** Required. The resource name of the Secret to delete in the format `projects/* /secrets/*`. */
  name: string;
}

export const DeleteProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSecretsRequest>;

export type DeleteProjectsLocationsSecretsResponse = Empty;
export const DeleteProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsSecretsError = DefaultErrors;

/** Deletes a Secret. */
export const deleteProjectsLocationsSecrets: API.OperationMethod<
  DeleteProjectsLocationsSecretsRequest,
  DeleteProjectsLocationsSecretsResponse,
  DeleteProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSecretsRequest,
  output: DeleteProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsSecretsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsSecretsRequest>;

export type TestIamPermissionsProjectsLocationsSecretsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsSecretsError = DefaultErrors;

/** Returns permissions that a caller has for the specified secret. If the secret does not exist, this call returns an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsSecrets: API.OperationMethod<
  TestIamPermissionsProjectsLocationsSecretsRequest,
  TestIamPermissionsProjectsLocationsSecretsResponse,
  TestIamPermissionsProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsSecretsRequest,
  output: TestIamPermissionsProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSecretsRequest {
  /** Required. Specifies the fields to be updated. */
  updateMask?: string;
  /** Output only. The resource name of the Secret in the format `projects/* /secrets/*`. */
  name: string;
  /** Request body */
  body?: Secret;
}

export const PatchProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Secret).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSecretsRequest>;

export type PatchProjectsLocationsSecretsResponse = Secret;
export const PatchProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Secret;

export type PatchProjectsLocationsSecretsError = DefaultErrors;

/** Updates metadata of an existing Secret. */
export const patchProjectsLocationsSecrets: API.OperationMethod<
  PatchProjectsLocationsSecretsRequest,
  PatchProjectsLocationsSecretsResponse,
  PatchProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSecretsRequest,
  output: PatchProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface AddVersionProjectsLocationsSecretsRequest {
  /** Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/* /secrets/*` or `projects/* /locations/* /secrets/*`. */
  parent: string;
  /** Request body */
  body?: AddSecretVersionRequest;
}

export const AddVersionProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(AddSecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}:addVersion",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddVersionProjectsLocationsSecretsRequest>;

export type AddVersionProjectsLocationsSecretsResponse = SecretVersion;
export const AddVersionProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type AddVersionProjectsLocationsSecretsError = DefaultErrors;

/** Creates a new SecretVersion containing secret data and attaches it to an existing Secret. */
export const addVersionProjectsLocationsSecrets: API.OperationMethod<
  AddVersionProjectsLocationsSecretsRequest,
  AddVersionProjectsLocationsSecretsResponse,
  AddVersionProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddVersionProjectsLocationsSecretsRequest,
  output: AddVersionProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSecretsRequest {
  /** Required. The resource name of the Secret, in the format `projects/* /secrets/*` or `projects/* /locations/* /secrets/*`. */
  name: string;
}

export const GetProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSecretsRequest>;

export type GetProjectsLocationsSecretsResponse = Secret;
export const GetProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Secret;

export type GetProjectsLocationsSecretsError = DefaultErrors;

/** Gets metadata for a given Secret. */
export const getProjectsLocationsSecrets: API.OperationMethod<
  GetProjectsLocationsSecretsRequest,
  GetProjectsLocationsSecretsResponse,
  GetProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSecretsRequest,
  output: GetProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecretsRequest {
  /** Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. */
  pageSize?: number;
  /** Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Filter string, adhering to the rules in [List-operation filtering](https://cloud.google.com/secret-manager/docs/filtering). List only secrets matching the filter. If filter is empty, all secrets are listed. */
  filter?: string;
  /** Required. The resource name of the project associated with the Secrets, in the format `projects/*` or `projects/* /locations/*` */
  parent: string;
}

export const ListProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSecretsRequest>;

export type ListProjectsLocationsSecretsResponse = ListSecretsResponse;
export const ListProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSecretsResponse;

export type ListProjectsLocationsSecretsError = DefaultErrors;

/** Lists Secrets. */
export const listProjectsLocationsSecrets: API.PaginatedOperationMethod<
  ListProjectsLocationsSecretsRequest,
  ListProjectsLocationsSecretsResponse,
  ListProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSecretsRequest,
  output: ListProjectsLocationsSecretsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsLocationsSecretsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsSecretsRequest>;

export type SetIamPolicyProjectsLocationsSecretsResponse = Policy;
export const SetIamPolicyProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsSecretsError = DefaultErrors;

/** Sets the access control policy on the specified secret. Replaces any existing policy. Permissions on SecretVersions are enforced according to the policy set on the associated Secret. */
export const setIamPolicyProjectsLocationsSecrets: API.OperationMethod<
  SetIamPolicyProjectsLocationsSecretsRequest,
  SetIamPolicyProjectsLocationsSecretsResponse,
  SetIamPolicyProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsSecretsRequest,
  output: SetIamPolicyProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsSecretsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
    resource: Schema.String.pipe(T.HttpPath("resource")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsSecretsRequest>;

export type GetIamPolicyProjectsLocationsSecretsResponse = Policy;
export const GetIamPolicyProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsSecretsError = DefaultErrors;

/** Gets the access control policy for a secret. Returns empty policy if the secret exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsSecrets: API.OperationMethod<
  GetIamPolicyProjectsLocationsSecretsRequest,
  GetIamPolicyProjectsLocationsSecretsResponse,
  GetIamPolicyProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsSecretsRequest,
  output: GetIamPolicyProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSecretsRequest {
  /** Required. The resource name of the project to associate with the Secret, in the format `projects/*` or `projects/* /locations/*`. */
  parent: string;
  /** Required. This must be unique within the project. A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters. */
  secretId?: string;
  /** Request body */
  body?: Secret;
}

export const CreateProjectsLocationsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    secretId: Schema.optional(Schema.String).pipe(T.HttpQuery("secretId")),
    body: Schema.optional(Secret).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSecretsRequest>;

export type CreateProjectsLocationsSecretsResponse = Secret;
export const CreateProjectsLocationsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Secret;

export type CreateProjectsLocationsSecretsError = DefaultErrors;

/** Creates a new Secret containing no SecretVersions. */
export const createProjectsLocationsSecrets: API.OperationMethod<
  CreateProjectsLocationsSecretsRequest,
  CreateProjectsLocationsSecretsResponse,
  CreateProjectsLocationsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSecretsRequest,
  output: CreateProjectsLocationsSecretsResponse,
  errors: [],
}));

export interface DisableProjectsLocationsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to disable in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: DisableSecretVersionRequest;
}

export const DisableProjectsLocationsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DisableSecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}/versions/{versionsId}:disable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DisableProjectsLocationsSecretsVersionsRequest>;

export type DisableProjectsLocationsSecretsVersionsResponse = SecretVersion;
export const DisableProjectsLocationsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type DisableProjectsLocationsSecretsVersionsError = DefaultErrors;

/** Disables a SecretVersion. Sets the state of the SecretVersion to DISABLED. */
export const disableProjectsLocationsSecretsVersions: API.OperationMethod<
  DisableProjectsLocationsSecretsVersionsRequest,
  DisableProjectsLocationsSecretsVersionsResponse,
  DisableProjectsLocationsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableProjectsLocationsSecretsVersionsRequest,
  output: DisableProjectsLocationsSecretsVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecretsVersionsRequest {
  /** Optional. Filter string, adhering to the rules in [List-operation filtering](https://cloud.google.com/secret-manager/docs/filtering). List only secret versions matching the filter. If filter is empty, all secret versions are listed. */
  filter?: string;
  /** Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. */
  pageSize?: number;
  /** Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/* /secrets/*` or `projects/* /locations/* /secrets/*`. */
  parent: string;
  /** Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token][]. */
  pageToken?: string;
}

export const ListProjectsLocationsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSecretsVersionsRequest>;

export type ListProjectsLocationsSecretsVersionsResponse =
  ListSecretVersionsResponse;
export const ListProjectsLocationsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSecretVersionsResponse;

export type ListProjectsLocationsSecretsVersionsError = DefaultErrors;

/** Lists SecretVersions. This call does not return secret data. */
export const listProjectsLocationsSecretsVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsSecretsVersionsRequest,
  ListProjectsLocationsSecretsVersionsResponse,
  ListProjectsLocationsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSecretsVersionsRequest,
  output: ListProjectsLocationsSecretsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DestroyProjectsLocationsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to destroy in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: DestroySecretVersionRequest;
}

export const DestroyProjectsLocationsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DestroySecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}/versions/{versionsId}:destroy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DestroyProjectsLocationsSecretsVersionsRequest>;

export type DestroyProjectsLocationsSecretsVersionsResponse = SecretVersion;
export const DestroyProjectsLocationsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type DestroyProjectsLocationsSecretsVersionsError = DefaultErrors;

/** Destroys a SecretVersion. Sets the state of the SecretVersion to DESTROYED and irrevocably destroys the secret data. */
export const destroyProjectsLocationsSecretsVersions: API.OperationMethod<
  DestroyProjectsLocationsSecretsVersionsRequest,
  DestroyProjectsLocationsSecretsVersionsResponse,
  DestroyProjectsLocationsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DestroyProjectsLocationsSecretsVersionsRequest,
  output: DestroyProjectsLocationsSecretsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. `projects/* /secrets/* /versions/latest` or `projects/* /locations/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
  name: string;
}

export const GetProjectsLocationsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSecretsVersionsRequest>;

export type GetProjectsLocationsSecretsVersionsResponse = SecretVersion;
export const GetProjectsLocationsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type GetProjectsLocationsSecretsVersionsError = DefaultErrors;

/** Gets metadata for a SecretVersion. `projects/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
export const getProjectsLocationsSecretsVersions: API.OperationMethod<
  GetProjectsLocationsSecretsVersionsRequest,
  GetProjectsLocationsSecretsVersionsResponse,
  GetProjectsLocationsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSecretsVersionsRequest,
  output: GetProjectsLocationsSecretsVersionsResponse,
  errors: [],
}));

export interface AccessProjectsLocationsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. `projects/* /secrets/* /versions/latest` or `projects/* /locations/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
  name: string;
}

export const AccessProjectsLocationsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}/versions/{versionsId}:access",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessProjectsLocationsSecretsVersionsRequest>;

export type AccessProjectsLocationsSecretsVersionsResponse =
  AccessSecretVersionResponse;
export const AccessProjectsLocationsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSecretVersionResponse;

export type AccessProjectsLocationsSecretsVersionsError = DefaultErrors;

/** Accesses a SecretVersion. This call returns the secret data. `projects/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
export const accessProjectsLocationsSecretsVersions: API.OperationMethod<
  AccessProjectsLocationsSecretsVersionsRequest,
  AccessProjectsLocationsSecretsVersionsResponse,
  AccessProjectsLocationsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessProjectsLocationsSecretsVersionsRequest,
  output: AccessProjectsLocationsSecretsVersionsResponse,
  errors: [],
}));

export interface EnableProjectsLocationsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to enable in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: EnableSecretVersionRequest;
}

export const EnableProjectsLocationsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(EnableSecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/locations/{locationsId}/secrets/{secretsId}/versions/{versionsId}:enable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnableProjectsLocationsSecretsVersionsRequest>;

export type EnableProjectsLocationsSecretsVersionsResponse = SecretVersion;
export const EnableProjectsLocationsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type EnableProjectsLocationsSecretsVersionsError = DefaultErrors;

/** Enables a SecretVersion. Sets the state of the SecretVersion to ENABLED. */
export const enableProjectsLocationsSecretsVersions: API.OperationMethod<
  EnableProjectsLocationsSecretsVersionsRequest,
  EnableProjectsLocationsSecretsVersionsResponse,
  EnableProjectsLocationsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableProjectsLocationsSecretsVersionsRequest,
  output: EnableProjectsLocationsSecretsVersionsResponse,
  errors: [],
}));

export interface ListProjectsSecretsRequest {
  /** Optional. Filter string, adhering to the rules in [List-operation filtering](https://cloud.google.com/secret-manager/docs/filtering). List only secrets matching the filter. If filter is empty, all secrets are listed. */
  filter?: string;
  /** Required. The resource name of the project associated with the Secrets, in the format `projects/*` or `projects/* /locations/*` */
  parent: string;
  /** Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. */
  pageSize?: number;
}

export const ListProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/secrets" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSecretsRequest>;

export type ListProjectsSecretsResponse = ListSecretsResponse;
export const ListProjectsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSecretsResponse;

export type ListProjectsSecretsError = DefaultErrors;

/** Lists Secrets. */
export const listProjectsSecrets: API.PaginatedOperationMethod<
  ListProjectsSecretsRequest,
  ListProjectsSecretsResponse,
  ListProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSecretsRequest,
  output: ListProjectsSecretsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetIamPolicyProjectsSecretsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsSecretsRequest>;

export type GetIamPolicyProjectsSecretsResponse = Policy;
export const GetIamPolicyProjectsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsSecretsError = DefaultErrors;

/** Gets the access control policy for a secret. Returns empty policy if the secret exists and does not have a policy set. */
export const getIamPolicyProjectsSecrets: API.OperationMethod<
  GetIamPolicyProjectsSecretsRequest,
  GetIamPolicyProjectsSecretsResponse,
  GetIamPolicyProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsSecretsRequest,
  output: GetIamPolicyProjectsSecretsResponse,
  errors: [],
}));

export interface PatchProjectsSecretsRequest {
  /** Output only. The resource name of the Secret in the format `projects/* /secrets/*`. */
  name: string;
  /** Required. Specifies the fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Secret;
}

export const PatchProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Secret).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsSecretsRequest>;

export type PatchProjectsSecretsResponse = Secret;
export const PatchProjectsSecretsResponse = /*@__PURE__*/ /*#__PURE__*/ Secret;

export type PatchProjectsSecretsError = DefaultErrors;

/** Updates metadata of an existing Secret. */
export const patchProjectsSecrets: API.OperationMethod<
  PatchProjectsSecretsRequest,
  PatchProjectsSecretsResponse,
  PatchProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsSecretsRequest,
  output: PatchProjectsSecretsResponse,
  errors: [],
}));

export interface CreateProjectsSecretsRequest {
  /** Required. The resource name of the project to associate with the Secret, in the format `projects/*` or `projects/* /locations/*`. */
  parent: string;
  /** Required. This must be unique within the project. A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters. */
  secretId?: string;
  /** Request body */
  body?: Secret;
}

export const CreateProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    secretId: Schema.optional(Schema.String).pipe(T.HttpQuery("secretId")),
    body: Schema.optional(Secret).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSecretsRequest>;

export type CreateProjectsSecretsResponse = Secret;
export const CreateProjectsSecretsResponse = /*@__PURE__*/ /*#__PURE__*/ Secret;

export type CreateProjectsSecretsError = DefaultErrors;

/** Creates a new Secret containing no SecretVersions. */
export const createProjectsSecrets: API.OperationMethod<
  CreateProjectsSecretsRequest,
  CreateProjectsSecretsResponse,
  CreateProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSecretsRequest,
  output: CreateProjectsSecretsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsSecretsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsSecretsRequest>;

export type TestIamPermissionsProjectsSecretsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsSecretsError = DefaultErrors;

/** Returns permissions that a caller has for the specified secret. If the secret does not exist, this call returns an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsSecrets: API.OperationMethod<
  TestIamPermissionsProjectsSecretsRequest,
  TestIamPermissionsProjectsSecretsResponse,
  TestIamPermissionsProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsSecretsRequest,
  output: TestIamPermissionsProjectsSecretsResponse,
  errors: [],
}));

export interface GetProjectsSecretsRequest {
  /** Required. The resource name of the Secret, in the format `projects/* /secrets/*` or `projects/* /locations/* /secrets/*`. */
  name: string;
}

export const GetProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSecretsRequest>;

export type GetProjectsSecretsResponse = Secret;
export const GetProjectsSecretsResponse = /*@__PURE__*/ /*#__PURE__*/ Secret;

export type GetProjectsSecretsError = DefaultErrors;

/** Gets metadata for a given Secret. */
export const getProjectsSecrets: API.OperationMethod<
  GetProjectsSecretsRequest,
  GetProjectsSecretsResponse,
  GetProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSecretsRequest,
  output: GetProjectsSecretsResponse,
  errors: [],
}));

export interface DeleteProjectsSecretsRequest {
  /** Required. The resource name of the Secret to delete in the format `projects/* /secrets/*`. */
  name: string;
  /** Optional. Etag of the Secret. The request succeeds if it matches the etag of the currently stored secret object. If the etag is omitted, the request succeeds. */
  etag?: string;
}

export const DeleteProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSecretsRequest>;

export type DeleteProjectsSecretsResponse = Empty;
export const DeleteProjectsSecretsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSecretsError = DefaultErrors;

/** Deletes a Secret. */
export const deleteProjectsSecrets: API.OperationMethod<
  DeleteProjectsSecretsRequest,
  DeleteProjectsSecretsResponse,
  DeleteProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSecretsRequest,
  output: DeleteProjectsSecretsResponse,
  errors: [],
}));

export interface AddVersionProjectsSecretsRequest {
  /** Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/* /secrets/*` or `projects/* /locations/* /secrets/*`. */
  parent: string;
  /** Request body */
  body?: AddSecretVersionRequest;
}

export const AddVersionProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(AddSecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}:addVersion",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddVersionProjectsSecretsRequest>;

export type AddVersionProjectsSecretsResponse = SecretVersion;
export const AddVersionProjectsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type AddVersionProjectsSecretsError = DefaultErrors;

/** Creates a new SecretVersion containing secret data and attaches it to an existing Secret. */
export const addVersionProjectsSecrets: API.OperationMethod<
  AddVersionProjectsSecretsRequest,
  AddVersionProjectsSecretsResponse,
  AddVersionProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddVersionProjectsSecretsRequest,
  output: AddVersionProjectsSecretsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsSecretsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsSecretsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsSecretsRequest>;

export type SetIamPolicyProjectsSecretsResponse = Policy;
export const SetIamPolicyProjectsSecretsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsSecretsError = DefaultErrors;

/** Sets the access control policy on the specified secret. Replaces any existing policy. Permissions on SecretVersions are enforced according to the policy set on the associated Secret. */
export const setIamPolicyProjectsSecrets: API.OperationMethod<
  SetIamPolicyProjectsSecretsRequest,
  SetIamPolicyProjectsSecretsResponse,
  SetIamPolicyProjectsSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsSecretsRequest,
  output: SetIamPolicyProjectsSecretsResponse,
  errors: [],
}));

export interface DestroyProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to destroy in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: DestroySecretVersionRequest;
}

export const DestroyProjectsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DestroySecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:destroy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DestroyProjectsSecretsVersionsRequest>;

export type DestroyProjectsSecretsVersionsResponse = SecretVersion;
export const DestroyProjectsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type DestroyProjectsSecretsVersionsError = DefaultErrors;

/** Destroys a SecretVersion. Sets the state of the SecretVersion to DESTROYED and irrevocably destroys the secret data. */
export const destroyProjectsSecretsVersions: API.OperationMethod<
  DestroyProjectsSecretsVersionsRequest,
  DestroyProjectsSecretsVersionsResponse,
  DestroyProjectsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DestroyProjectsSecretsVersionsRequest,
  output: DestroyProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface EnableProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to enable in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: EnableSecretVersionRequest;
}

export const EnableProjectsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(EnableSecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:enable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnableProjectsSecretsVersionsRequest>;

export type EnableProjectsSecretsVersionsResponse = SecretVersion;
export const EnableProjectsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type EnableProjectsSecretsVersionsError = DefaultErrors;

/** Enables a SecretVersion. Sets the state of the SecretVersion to ENABLED. */
export const enableProjectsSecretsVersions: API.OperationMethod<
  EnableProjectsSecretsVersionsRequest,
  EnableProjectsSecretsVersionsResponse,
  EnableProjectsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableProjectsSecretsVersionsRequest,
  output: EnableProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface DisableProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion to disable in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. */
  name: string;
  /** Request body */
  body?: DisableSecretVersionRequest;
}

export const DisableProjectsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DisableSecretVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:disable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DisableProjectsSecretsVersionsRequest>;

export type DisableProjectsSecretsVersionsResponse = SecretVersion;
export const DisableProjectsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type DisableProjectsSecretsVersionsError = DefaultErrors;

/** Disables a SecretVersion. Sets the state of the SecretVersion to DISABLED. */
export const disableProjectsSecretsVersions: API.OperationMethod<
  DisableProjectsSecretsVersionsRequest,
  DisableProjectsSecretsVersionsResponse,
  DisableProjectsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableProjectsSecretsVersionsRequest,
  output: DisableProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface ListProjectsSecretsVersionsRequest {
  /** Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token][]. */
  pageToken?: string;
  /** Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000. */
  pageSize?: number;
  /** Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/* /secrets/*` or `projects/* /locations/* /secrets/*`. */
  parent: string;
  /** Optional. Filter string, adhering to the rules in [List-operation filtering](https://cloud.google.com/secret-manager/docs/filtering). List only secret versions matching the filter. If filter is empty, all secret versions are listed. */
  filter?: string;
}

export const ListProjectsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSecretsVersionsRequest>;

export type ListProjectsSecretsVersionsResponse = ListSecretVersionsResponse;
export const ListProjectsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSecretVersionsResponse;

export type ListProjectsSecretsVersionsError = DefaultErrors;

/** Lists SecretVersions. This call does not return secret data. */
export const listProjectsSecretsVersions: API.PaginatedOperationMethod<
  ListProjectsSecretsVersionsRequest,
  ListProjectsSecretsVersionsResponse,
  ListProjectsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSecretsVersionsRequest,
  output: ListProjectsSecretsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface AccessProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. `projects/* /secrets/* /versions/latest` or `projects/* /locations/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
  name: string;
}

export const AccessProjectsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}:access",
    }),
    svc,
  ) as unknown as Schema.Schema<AccessProjectsSecretsVersionsRequest>;

export type AccessProjectsSecretsVersionsResponse = AccessSecretVersionResponse;
export const AccessProjectsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccessSecretVersionResponse;

export type AccessProjectsSecretsVersionsError = DefaultErrors;

/** Accesses a SecretVersion. This call returns the secret data. `projects/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
export const accessProjectsSecretsVersions: API.OperationMethod<
  AccessProjectsSecretsVersionsRequest,
  AccessProjectsSecretsVersionsResponse,
  AccessProjectsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AccessProjectsSecretsVersionsRequest,
  output: AccessProjectsSecretsVersionsResponse,
  errors: [],
}));

export interface GetProjectsSecretsVersionsRequest {
  /** Required. The resource name of the SecretVersion in the format `projects/* /secrets/* /versions/*` or `projects/* /locations/* /secrets/* /versions/*`. `projects/* /secrets/* /versions/latest` or `projects/* /locations/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
  name: string;
}

export const GetProjectsSecretsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/secrets/{secretsId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSecretsVersionsRequest>;

export type GetProjectsSecretsVersionsResponse = SecretVersion;
export const GetProjectsSecretsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SecretVersion;

export type GetProjectsSecretsVersionsError = DefaultErrors;

/** Gets metadata for a SecretVersion. `projects/* /secrets/* /versions/latest` is an alias to the most recently created SecretVersion. */
export const getProjectsSecretsVersions: API.OperationMethod<
  GetProjectsSecretsVersionsRequest,
  GetProjectsSecretsVersionsResponse,
  GetProjectsSecretsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSecretsVersionsRequest,
  output: GetProjectsSecretsVersionsResponse,
  errors: [],
}));
