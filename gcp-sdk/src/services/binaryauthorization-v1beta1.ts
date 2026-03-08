// ==========================================================================
// Binary Authorization API (binaryauthorization v1beta1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "binaryauthorization",
  version: "v1beta1",
  rootUrl: "https://binaryauthorization.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Signature {
  /** The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. */
  signature?: string;
  /** The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" */
  publicKeyId?: string;
}

export const Signature: Schema.Schema<Signature> = Schema.suspend(() =>
  Schema.Struct({
    signature: Schema.optional(Schema.String),
    publicKeyId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Signature" }) as any as Schema.Schema<Signature>;

export interface Jwt {
  /** The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1 */
  compactJwt?: string;
}

export const Jwt: Schema.Schema<Jwt> = Schema.suspend(() =>
  Schema.Struct({
    compactJwt: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Jwt" }) as any as Schema.Schema<Jwt>;

export interface AttestationOccurrence {
  /** Required. The serialized payload that is verified by one or more `signatures`. */
  serializedPayload?: string;
  /** One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. */
  signatures?: Array<Signature>;
  /** One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas. */
  jwts?: Array<Jwt>;
}

export const AttestationOccurrence: Schema.Schema<AttestationOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      serializedPayload: Schema.optional(Schema.String),
      signatures: Schema.optional(Schema.Array(Signature)),
      jwts: Schema.optional(Schema.Array(Jwt)),
    }),
  ).annotate({
    identifier: "AttestationOccurrence",
  }) as any as Schema.Schema<AttestationOccurrence>;

export interface ValidateAttestationOccurrenceRequest {
  /** Required. An AttestationOccurrence to be checked that it can be verified by the `Attestor`. It does not have to be an existing entity in Container Analysis. It must otherwise be a valid `AttestationOccurrence`. */
  attestation?: AttestationOccurrence;
  /** Required. The resource name of the Note to which the containing Occurrence is associated. */
  occurrenceNote?: string;
  /** Required. The URI of the artifact (e.g. container image) that is the subject of the containing Occurrence. */
  occurrenceResourceUri?: string;
}

export const ValidateAttestationOccurrenceRequest: Schema.Schema<ValidateAttestationOccurrenceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      attestation: Schema.optional(AttestationOccurrence),
      occurrenceNote: Schema.optional(Schema.String),
      occurrenceResourceUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ValidateAttestationOccurrenceRequest",
  }) as any as Schema.Schema<ValidateAttestationOccurrenceRequest>;

export interface ValidateAttestationOccurrenceResponse {
  /** The result of the Attestation validation. */
  result?:
    | "RESULT_UNSPECIFIED"
    | "VERIFIED"
    | "ATTESTATION_NOT_VERIFIABLE"
    | (string & {});
  /** The reason for denial if the Attestation couldn't be validated. */
  denialReason?: string;
}

export const ValidateAttestationOccurrenceResponse: Schema.Schema<ValidateAttestationOccurrenceResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(Schema.String),
      denialReason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ValidateAttestationOccurrenceResponse",
  }) as any as Schema.Schema<ValidateAttestationOccurrenceResponse>;

export interface AdmissionWhitelistPattern {
  /** An image name pattern to allowlist, in the form `registry/path/to/image`. This supports a trailing `*` as a wildcard, but this is allowed only in text after the `registry/` part. `*` wildcard does not match `/`, i.e., `gcr.io/nginx*` matches `gcr.io/nginx@latest`, but it does not match `gcr.io/nginx/image`. This also supports a trailing `**` wildcard which matches subdirectories, i.e., `gcr.io/nginx**` matches `gcr.io/nginx/image`. */
  namePattern?: string;
}

export const AdmissionWhitelistPattern: Schema.Schema<AdmissionWhitelistPattern> =
  Schema.suspend(() =>
    Schema.Struct({
      namePattern: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdmissionWhitelistPattern",
  }) as any as Schema.Schema<AdmissionWhitelistPattern>;

export interface AdmissionRule {
  /** Required. How this admission rule will be evaluated. */
  evaluationMode?:
    | "EVALUATION_MODE_UNSPECIFIED"
    | "ALWAYS_ALLOW"
    | "REQUIRE_ATTESTATION"
    | "ALWAYS_DENY"
    | (string & {});
  requireAttestationsBy?: Array<string>;
  /** Required. The action when a pod creation is denied by the admission rule. */
  enforcementMode?:
    | "ENFORCEMENT_MODE_UNSPECIFIED"
    | "ENFORCED_BLOCK_AND_AUDIT_LOG"
    | "DRYRUN_AUDIT_LOG_ONLY"
    | (string & {});
}

export const AdmissionRule: Schema.Schema<AdmissionRule> = Schema.suspend(() =>
  Schema.Struct({
    evaluationMode: Schema.optional(Schema.String),
    requireAttestationsBy: Schema.optional(Schema.Array(Schema.String)),
    enforcementMode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "AdmissionRule",
}) as any as Schema.Schema<AdmissionRule>;

export interface Policy {
  /** Output only. The resource name, in the format `projects/* /policy`. There is at most one policy per project. */
  name?: string;
  /** Optional. A descriptive comment. */
  description?: string;
  /** Optional. Controls the evaluation of a Google-maintained global admission policy for common system-level images. Images not covered by the global policy will be subject to the project admission policy. This setting has no effect when specified inside a global admission policy. */
  globalPolicyEvaluationMode?:
    | "GLOBAL_POLICY_EVALUATION_MODE_UNSPECIFIED"
    | "ENABLE"
    | "DISABLE"
    | (string & {});
  /** Optional. Admission policy allowlisting. A matching admission request will always be permitted. This feature is typically used to exclude Google or third-party infrastructure images from Binary Authorization policies. */
  admissionWhitelistPatterns?: Array<AdmissionWhitelistPattern>;
  /** Optional. Per-cluster admission rules. Cluster spec format: `location.clusterId`. There can be at most one admission rule per cluster spec. A `location` is either a compute zone (e.g. us-central1-a) or a region (e.g. us-central1). For `clusterId` syntax restrictions see https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters. */
  clusterAdmissionRules?: Record<string, AdmissionRule>;
  /** Optional. Per-kubernetes-namespace admission rules. K8s namespace spec format: `[a-z.-]+`, e.g. `some-namespace` */
  kubernetesNamespaceAdmissionRules?: Record<string, AdmissionRule>;
  /** Optional. Per-kubernetes-service-account admission rules. Service account spec format: `namespace:serviceaccount`. e.g. `test-ns:default` */
  kubernetesServiceAccountAdmissionRules?: Record<string, AdmissionRule>;
  /** Optional. Per-istio-service-identity admission rules. Istio service identity spec format: `spiffe:///ns//sa/` or `/ns//sa/` e.g. `spiffe://example.com/ns/test-ns/sa/default` */
  istioServiceIdentityAdmissionRules?: Record<string, AdmissionRule>;
  /** Required. Default admission rule for a cluster without a per-cluster, per- kubernetes-service-account, or per-istio-service-identity admission rule. */
  defaultAdmissionRule?: AdmissionRule;
  /** Output only. Time when the policy was last updated. */
  updateTime?: string;
  /** Optional. A checksum, returned by the server, that can be sent on update requests to ensure the policy has an up-to-date value before attempting to update it. See https://google.aip.dev/154. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    globalPolicyEvaluationMode: Schema.optional(Schema.String),
    admissionWhitelistPatterns: Schema.optional(
      Schema.Array(AdmissionWhitelistPattern),
    ),
    clusterAdmissionRules: Schema.optional(
      Schema.Record(Schema.String, AdmissionRule),
    ),
    kubernetesNamespaceAdmissionRules: Schema.optional(
      Schema.Record(Schema.String, AdmissionRule),
    ),
    kubernetesServiceAccountAdmissionRules: Schema.optional(
      Schema.Record(Schema.String, AdmissionRule),
    ),
    istioServiceIdentityAdmissionRules: Schema.optional(
      Schema.Record(Schema.String, AdmissionRule),
    ),
    defaultAdmissionRule: Schema.optional(AdmissionRule),
    updateTime: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface PkixPublicKey {
  /** A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13 */
  publicKeyPem?: string;
  /** The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key). */
  signatureAlgorithm?:
    | "SIGNATURE_ALGORITHM_UNSPECIFIED"
    | "RSA_PSS_2048_SHA256"
    | "RSA_SIGN_PSS_2048_SHA256"
    | "RSA_PSS_3072_SHA256"
    | "RSA_SIGN_PSS_3072_SHA256"
    | "RSA_PSS_4096_SHA256"
    | "RSA_SIGN_PSS_4096_SHA256"
    | "RSA_PSS_4096_SHA512"
    | "RSA_SIGN_PSS_4096_SHA512"
    | "RSA_SIGN_PKCS1_2048_SHA256"
    | "RSA_SIGN_PKCS1_3072_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA512"
    | "ECDSA_P256_SHA256"
    | "EC_SIGN_P256_SHA256"
    | "ECDSA_P384_SHA384"
    | "EC_SIGN_P384_SHA384"
    | "ECDSA_P521_SHA512"
    | "EC_SIGN_P521_SHA512"
    | (string & {});
}

export const PkixPublicKey: Schema.Schema<PkixPublicKey> = Schema.suspend(() =>
  Schema.Struct({
    publicKeyPem: Schema.optional(Schema.String),
    signatureAlgorithm: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "PkixPublicKey",
}) as any as Schema.Schema<PkixPublicKey>;

export interface AttestorPublicKey {
  /** Optional. A descriptive comment. This field may be updated. */
  comment?: string;
  /** The ID of this public key. Signatures verified by BinAuthz must include the ID of the public key that can be used to verify them, and that ID must match the contents of this field exactly. Additional restrictions on this field can be imposed based on which public key type is encapsulated. See the documentation on `public_key` cases below for details. */
  id?: string;
  /** ASCII-armored representation of a PGP public key, as the entire output by the command `gpg --export --armor foo@example.com` (either LF or CRLF line endings). When using this field, `id` should be left blank. The BinAuthz API handlers will calculate the ID and fill it in automatically. BinAuthz computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as upper-case hex. If `id` is provided by the caller, it will be overwritten by the API-calculated ID. */
  asciiArmoredPgpPublicKey?: string;
  /** A raw PKIX SubjectPublicKeyInfo format public key. NOTE: `id` may be explicitly provided by the caller when using this type of public key, but it MUST be a valid RFC3986 URI. If `id` is left blank, a default one will be computed based on the digest of the DER encoding of the public key. */
  pkixPublicKey?: PkixPublicKey;
}

export const AttestorPublicKey: Schema.Schema<AttestorPublicKey> =
  Schema.suspend(() =>
    Schema.Struct({
      comment: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      asciiArmoredPgpPublicKey: Schema.optional(Schema.String),
      pkixPublicKey: Schema.optional(PkixPublicKey),
    }),
  ).annotate({
    identifier: "AttestorPublicKey",
  }) as any as Schema.Schema<AttestorPublicKey>;

export interface UserOwnedDrydockNote {
  /** Required. The Drydock resource name of a ATTESTATION_AUTHORITY Note, created by the user, in the format: `projects/* /notes/*` (or the legacy `providers/* /notes/*`). This field may not be updated. An attestation by this attestor is stored as a Drydock ATTESTATION_AUTHORITY Occurrence that names a container image and that links to this Note. Drydock is an external dependency. */
  noteReference?: string;
  /** Optional. Public keys that verify attestations signed by this attestor. This field may be updated. If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request. If this field is empty, this attestor always returns that no valid attestations exist. */
  publicKeys?: Array<AttestorPublicKey>;
  /** Output only. This field will contain the service account email address that this Attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`). This email address is fixed for the lifetime of the Attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern. */
  delegationServiceAccountEmail?: string;
}

export const UserOwnedDrydockNote: Schema.Schema<UserOwnedDrydockNote> =
  Schema.suspend(() =>
    Schema.Struct({
      noteReference: Schema.optional(Schema.String),
      publicKeys: Schema.optional(Schema.Array(AttestorPublicKey)),
      delegationServiceAccountEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UserOwnedDrydockNote",
  }) as any as Schema.Schema<UserOwnedDrydockNote>;

export interface Attestor {
  /** Required. The resource name, in the format: `projects/* /attestors/*`. This field may not be updated. */
  name?: string;
  /** Optional. A descriptive comment. This field may be updated. The field may be displayed in chooser dialogs. */
  description?: string;
  /** A Drydock ATTESTATION_AUTHORITY Note, created by the user. */
  userOwnedDrydockNote?: UserOwnedDrydockNote;
  /** Output only. Time when the attestor was last updated. */
  updateTime?: string;
  /** Optional. A checksum, returned by the server, that can be sent on update requests to ensure the attestor has an up-to-date value before attempting to update it. See https://google.aip.dev/154. */
  etag?: string;
}

export const Attestor: Schema.Schema<Attestor> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    userOwnedDrydockNote: Schema.optional(UserOwnedDrydockNote),
    updateTime: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Attestor" }) as any as Schema.Schema<Attestor>;

export interface ListAttestorsResponse {
  /** The list of attestors. */
  attestors?: Array<Attestor>;
  /** A token to retrieve the next page of results. Pass this value in the ListAttestorsRequest.page_token field in the subsequent call to the `ListAttestors` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAttestorsResponse: Schema.Schema<ListAttestorsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      attestors: Schema.optional(Schema.Array(Attestor)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAttestorsResponse",
  }) as any as Schema.Schema<ListAttestorsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

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

export interface IamPolicy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const IamPolicy: Schema.Schema<IamPolicy> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.Number),
    bindings: Schema.optional(Schema.Array(Binding)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "IamPolicy" }) as any as Schema.Schema<IamPolicy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: IamPolicy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(IamPolicy),
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

// ==========================================================================
// Operations
// ==========================================================================

export interface GetPolicyProjectsRequest {
  /** Required. The resource name of the policy to retrieve, in the format `projects/* /policy`. */
  name: string;
}

export const GetPolicyProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/policy" }),
  svc,
) as unknown as Schema.Schema<GetPolicyProjectsRequest>;

export type GetPolicyProjectsResponse = Policy;
export const GetPolicyProjectsResponse = Policy;

export type GetPolicyProjectsError = DefaultErrors;

/** A policy specifies the attestors that must attest to a container image, before the project is allowed to deploy that image. There is at most one policy per project. All image admission requests are permitted if a project has no policy. Gets the policy for this project. Returns a default policy if the project does not have one. */
export const getPolicyProjects: API.OperationMethod<
  GetPolicyProjectsRequest,
  GetPolicyProjectsResponse,
  GetPolicyProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPolicyProjectsRequest,
  output: GetPolicyProjectsResponse,
  errors: [],
}));

export interface UpdatePolicyProjectsRequest {
  /** Output only. The resource name, in the format `projects/* /policy`. There is at most one policy per project. */
  name: string;
  /** Request body */
  body?: Policy;
}

export const UpdatePolicyProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v1beta1/projects/{projectsId}/policy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdatePolicyProjectsRequest>;

export type UpdatePolicyProjectsResponse = Policy;
export const UpdatePolicyProjectsResponse = Policy;

export type UpdatePolicyProjectsError = DefaultErrors;

/** Creates or updates a project's policy, and returns a copy of the new policy. A policy is always updated as a whole, to avoid race conditions with concurrent policy enforcement (or management!) requests. Returns NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is malformed. */
export const updatePolicyProjects: API.OperationMethod<
  UpdatePolicyProjectsRequest,
  UpdatePolicyProjectsResponse,
  UpdatePolicyProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePolicyProjectsRequest,
  output: UpdatePolicyProjectsResponse,
  errors: [],
}));

export interface ValidateAttestationOccurrenceProjectsAttestorsRequest {
  /** Required. The resource name of the Attestor of the occurrence, in the format `projects/* /attestors/*`. */
  attestor: string;
  /** Request body */
  body?: ValidateAttestationOccurrenceRequest;
}

export const ValidateAttestationOccurrenceProjectsAttestorsRequest =
  Schema.Struct({
    attestor: Schema.String.pipe(T.HttpPath("attestor")),
    body: Schema.optional(ValidateAttestationOccurrenceRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}:validateAttestationOccurrence",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ValidateAttestationOccurrenceProjectsAttestorsRequest>;

export type ValidateAttestationOccurrenceProjectsAttestorsResponse =
  ValidateAttestationOccurrenceResponse;
export const ValidateAttestationOccurrenceProjectsAttestorsResponse =
  ValidateAttestationOccurrenceResponse;

export type ValidateAttestationOccurrenceProjectsAttestorsError = DefaultErrors;

/** Returns whether the given `Attestation` for the given image URI was signed by the given `Attestor` */
export const validateAttestationOccurrenceProjectsAttestors: API.OperationMethod<
  ValidateAttestationOccurrenceProjectsAttestorsRequest,
  ValidateAttestationOccurrenceProjectsAttestorsResponse,
  ValidateAttestationOccurrenceProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ValidateAttestationOccurrenceProjectsAttestorsRequest,
  output: ValidateAttestationOccurrenceProjectsAttestorsResponse,
  errors: [],
}));

export interface CreateProjectsAttestorsRequest {
  /** Required. The parent of this attestor. */
  parent: string;
  /** Required. The attestors ID. */
  attestorId?: string;
  /** Request body */
  body?: Attestor;
}

export const CreateProjectsAttestorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  attestorId: Schema.optional(Schema.String).pipe(T.HttpQuery("attestorId")),
  body: Schema.optional(Attestor).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/attestors",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAttestorsRequest>;

export type CreateProjectsAttestorsResponse = Attestor;
export const CreateProjectsAttestorsResponse = Attestor;

export type CreateProjectsAttestorsError = DefaultErrors;

/** Creates an attestor, and returns a copy of the new attestor. Returns NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is malformed, ALREADY_EXISTS if the attestor already exists. */
export const createProjectsAttestors: API.OperationMethod<
  CreateProjectsAttestorsRequest,
  CreateProjectsAttestorsResponse,
  CreateProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsAttestorsRequest,
  output: CreateProjectsAttestorsResponse,
  errors: [],
}));

export interface GetProjectsAttestorsRequest {
  /** Required. The name of the attestor to retrieve, in the format `projects/* /attestors/*`. */
  name: string;
}

export const GetProjectsAttestorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsAttestorsRequest>;

export type GetProjectsAttestorsResponse = Attestor;
export const GetProjectsAttestorsResponse = Attestor;

export type GetProjectsAttestorsError = DefaultErrors;

/** Gets an attestor. Returns NOT_FOUND if the attestor does not exist. */
export const getProjectsAttestors: API.OperationMethod<
  GetProjectsAttestorsRequest,
  GetProjectsAttestorsResponse,
  GetProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsAttestorsRequest,
  output: GetProjectsAttestorsResponse,
  errors: [],
}));

export interface UpdateProjectsAttestorsRequest {
  /** Required. The resource name, in the format: `projects/* /attestors/*`. This field may not be updated. */
  name: string;
  /** Request body */
  body?: Attestor;
}

export const UpdateProjectsAttestorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Attestor).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsAttestorsRequest>;

export type UpdateProjectsAttestorsResponse = Attestor;
export const UpdateProjectsAttestorsResponse = Attestor;

export type UpdateProjectsAttestorsError = DefaultErrors;

/** Updates an attestor. Returns NOT_FOUND if the attestor does not exist. */
export const updateProjectsAttestors: API.OperationMethod<
  UpdateProjectsAttestorsRequest,
  UpdateProjectsAttestorsResponse,
  UpdateProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateProjectsAttestorsRequest,
  output: UpdateProjectsAttestorsResponse,
  errors: [],
}));

export interface ListProjectsAttestorsRequest {
  /** Required. The resource name of the project associated with the attestors, in the format `projects/*`. */
  parent: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListAttestorsResponse.next_page_token returned from the previous call to the `ListAttestors` method. */
  pageToken?: string;
}

export const ListProjectsAttestorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/attestors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAttestorsRequest>;

export type ListProjectsAttestorsResponse = ListAttestorsResponse;
export const ListProjectsAttestorsResponse = ListAttestorsResponse;

export type ListProjectsAttestorsError = DefaultErrors;

/** Lists attestors. Returns INVALID_ARGUMENT if the project does not exist. */
export const listProjectsAttestors: API.PaginatedOperationMethod<
  ListProjectsAttestorsRequest,
  ListProjectsAttestorsResponse,
  ListProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsAttestorsRequest,
  output: ListProjectsAttestorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsAttestorsRequest {
  /** Required. The name of the attestors to delete, in the format `projects/* /attestors/*`. */
  name: string;
}

export const DeleteProjectsAttestorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAttestorsRequest>;

export type DeleteProjectsAttestorsResponse = Empty;
export const DeleteProjectsAttestorsResponse = Empty;

export type DeleteProjectsAttestorsError = DefaultErrors;

/** Deletes an attestor. Returns NOT_FOUND if the attestor does not exist. */
export const deleteProjectsAttestors: API.OperationMethod<
  DeleteProjectsAttestorsRequest,
  DeleteProjectsAttestorsResponse,
  DeleteProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsAttestorsRequest,
  output: DeleteProjectsAttestorsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsAttestorsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsAttestorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsAttestorsRequest>;

export type SetIamPolicyProjectsAttestorsResponse = IamPolicy;
export const SetIamPolicyProjectsAttestorsResponse = IamPolicy;

export type SetIamPolicyProjectsAttestorsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsAttestors: API.OperationMethod<
  SetIamPolicyProjectsAttestorsRequest,
  SetIamPolicyProjectsAttestorsResponse,
  SetIamPolicyProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsAttestorsRequest,
  output: SetIamPolicyProjectsAttestorsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsAttestorsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsAttestorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("options.requestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsAttestorsRequest>;

export type GetIamPolicyProjectsAttestorsResponse = IamPolicy;
export const GetIamPolicyProjectsAttestorsResponse = IamPolicy;

export type GetIamPolicyProjectsAttestorsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsAttestors: API.OperationMethod<
  GetIamPolicyProjectsAttestorsRequest,
  GetIamPolicyProjectsAttestorsResponse,
  GetIamPolicyProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsAttestorsRequest,
  output: GetIamPolicyProjectsAttestorsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsAttestorsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsAttestorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/attestors/{attestorsId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsAttestorsRequest>;

export type TestIamPermissionsProjectsAttestorsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsAttestorsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsAttestorsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsAttestors: API.OperationMethod<
  TestIamPermissionsProjectsAttestorsRequest,
  TestIamPermissionsProjectsAttestorsResponse,
  TestIamPermissionsProjectsAttestorsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsAttestorsRequest,
  output: TestIamPermissionsProjectsAttestorsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsPolicyRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsPolicyRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/policy:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsPolicyRequest>;

export type SetIamPolicyProjectsPolicyResponse = IamPolicy;
export const SetIamPolicyProjectsPolicyResponse = IamPolicy;

export type SetIamPolicyProjectsPolicyError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsPolicy: API.OperationMethod<
  SetIamPolicyProjectsPolicyRequest,
  SetIamPolicyProjectsPolicyResponse,
  SetIamPolicyProjectsPolicyError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsPolicyRequest,
  output: SetIamPolicyProjectsPolicyResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsPolicyRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsPolicyRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("options.requestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/policy:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsPolicyRequest>;

export type GetIamPolicyProjectsPolicyResponse = IamPolicy;
export const GetIamPolicyProjectsPolicyResponse = IamPolicy;

export type GetIamPolicyProjectsPolicyError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsPolicy: API.OperationMethod<
  GetIamPolicyProjectsPolicyRequest,
  GetIamPolicyProjectsPolicyResponse,
  GetIamPolicyProjectsPolicyError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsPolicyRequest,
  output: GetIamPolicyProjectsPolicyResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsPolicyRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsPolicyRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/policy:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsPolicyRequest>;

export type TestIamPermissionsProjectsPolicyResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsPolicyResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsPolicyError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsPolicy: API.OperationMethod<
  TestIamPermissionsProjectsPolicyRequest,
  TestIamPermissionsProjectsPolicyResponse,
  TestIamPermissionsProjectsPolicyError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsPolicyRequest,
  output: TestIamPermissionsProjectsPolicyResponse,
  errors: [],
}));

export interface GetPolicySystempolicyRequest {
  /** Required. The resource name, in the format `locations/* /policy`. Note that the system policy is not associated with a project. */
  name: string;
}

export const GetPolicySystempolicyRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/locations/{locationsId}/policy" }),
  svc,
) as unknown as Schema.Schema<GetPolicySystempolicyRequest>;

export type GetPolicySystempolicyResponse = Policy;
export const GetPolicySystempolicyResponse = Policy;

export type GetPolicySystempolicyError = DefaultErrors;

/** Gets the current system policy in the specified location. */
export const getPolicySystempolicy: API.OperationMethod<
  GetPolicySystempolicyRequest,
  GetPolicySystempolicyResponse,
  GetPolicySystempolicyError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPolicySystempolicyRequest,
  output: GetPolicySystempolicyResponse,
  errors: [],
}));
