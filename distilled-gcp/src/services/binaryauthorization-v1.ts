// ==========================================================================
// Binary Authorization API (binaryauthorization v1)
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
  name: "binaryauthorization",
  version: "v1",
  rootUrl: "https://binaryauthorization.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface EvaluateGkePolicyRequest {
  /** Required. JSON or YAML blob representing a Kubernetes resource. */
  resource?: Record<string, unknown>;
}

export const EvaluateGkePolicyRequest: Schema.Schema<EvaluateGkePolicyRequest> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "EvaluateGkePolicyRequest" }) as any as Schema.Schema<EvaluateGkePolicyRequest>;

export interface AllowlistResult {
  /** The allowlist pattern that the image matched. */
  matchedPattern?: string;
}

export const AllowlistResult: Schema.Schema<AllowlistResult> = Schema.suspend(() => Schema.Struct({
  matchedPattern: Schema.optional(Schema.String),
})).annotate({ identifier: "AllowlistResult" }) as any as Schema.Schema<AllowlistResult>;

export interface Scope {
  /** Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace. */
  kubernetesServiceAccount?: string;
  /** Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched. */
  kubernetesNamespace?: string;
}

export const Scope: Schema.Schema<Scope> = Schema.suspend(() => Schema.Struct({
  kubernetesServiceAccount: Schema.optional(Schema.String),
  kubernetesNamespace: Schema.optional(Schema.String),
})).annotate({ identifier: "Scope" }) as any as Schema.Schema<Scope>;

export interface EvaluationResult {
  /** The result of evaluating this check. */
  verdict?: "CHECK_VERDICT_UNSPECIFIED" | "CONFORMANT" | "NON_CONFORMANT" | "ERROR" | (string & {});
}

export const EvaluationResult: Schema.Schema<EvaluationResult> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(Schema.String),
})).annotate({ identifier: "EvaluationResult" }) as any as Schema.Schema<EvaluationResult>;

export interface CheckResult {
  /** The index of the check. */
  index?: string;
  /** The name of the check. */
  displayName?: string;
  /** The type of the check. */
  type?: string;
  /** If the image was exempted by an allow_pattern in the check, contains the pattern that the image name matched. */
  allowlistResult?: AllowlistResult;
  /** If a check was evaluated, contains the result of the check. */
  evaluationResult?: EvaluationResult;
  /** Explanation of this check result. */
  explanation?: string;
}

export const CheckResult: Schema.Schema<CheckResult> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  allowlistResult: Schema.optional(AllowlistResult),
  evaluationResult: Schema.optional(EvaluationResult),
  explanation: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckResult" }) as any as Schema.Schema<CheckResult>;

export interface CheckResults {
  /** Per-check details. */
  results?: Array<CheckResult>;
}

export const CheckResults: Schema.Schema<CheckResults> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(CheckResult)),
})).annotate({ identifier: "CheckResults" }) as any as Schema.Schema<CheckResults>;

export interface CheckSetResult {
  /** The index of the check set. */
  index?: string;
  /** The name of the check set. */
  displayName?: string;
  /** The scope of the check set. */
  scope?: Scope;
  /** If the image was exempted by an allow_pattern in the check set, contains the pattern that the image name matched. */
  allowlistResult?: AllowlistResult;
  /** If checks were evaluated, contains the results of evaluating each check. */
  checkResults?: CheckResults;
  /** Explanation of this check set result. Only populated if no checks were evaluated. */
  explanation?: string;
}

export const CheckSetResult: Schema.Schema<CheckSetResult> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  scope: Schema.optional(Scope),
  allowlistResult: Schema.optional(AllowlistResult),
  checkResults: Schema.optional(CheckResults),
  explanation: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckSetResult" }) as any as Schema.Schema<CheckSetResult>;

export interface ImageResult {
  /** Image URI from the request. */
  imageUri?: string;
  /** The result of evaluating this image. */
  verdict?: "IMAGE_VERDICT_UNSPECIFIED" | "CONFORMANT" | "NON_CONFORMANT" | "ERROR" | (string & {});
  /** If the image was exempted by a top-level allow_pattern, contains the allowlist pattern that the image name matched. */
  allowlistResult?: AllowlistResult;
  /** If a check set was evaluated, contains the result of the check set. Empty if there were no check sets. */
  checkSetResult?: CheckSetResult;
  /** Explanation of this image result. Only populated if no check sets were evaluated. */
  explanation?: string;
}

export const ImageResult: Schema.Schema<ImageResult> = Schema.suspend(() => Schema.Struct({
  imageUri: Schema.optional(Schema.String),
  verdict: Schema.optional(Schema.String),
  allowlistResult: Schema.optional(AllowlistResult),
  checkSetResult: Schema.optional(CheckSetResult),
  explanation: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageResult" }) as any as Schema.Schema<ImageResult>;

export interface PodResult {
  /** The name of the Pod. */
  podName?: string;
  /** The Kubernetes namespace of the Pod. */
  kubernetesNamespace?: string;
  /** The Kubernetes service account of the Pod. */
  kubernetesServiceAccount?: string;
  /** The result of evaluating this Pod. */
  verdict?: "POD_VERDICT_UNSPECIFIED" | "CONFORMANT" | "NON_CONFORMANT" | "ERROR" | (string & {});
  /** Per-image details. */
  imageResults?: Array<ImageResult>;
}

export const PodResult: Schema.Schema<PodResult> = Schema.suspend(() => Schema.Struct({
  podName: Schema.optional(Schema.String),
  kubernetesNamespace: Schema.optional(Schema.String),
  kubernetesServiceAccount: Schema.optional(Schema.String),
  verdict: Schema.optional(Schema.String),
  imageResults: Schema.optional(Schema.Array(ImageResult)),
})).annotate({ identifier: "PodResult" }) as any as Schema.Schema<PodResult>;

export interface EvaluateGkePolicyResponse {
  /** The result of evaluating all Pods in the request. */
  verdict?: "VERDICT_UNSPECIFIED" | "CONFORMANT" | "NON_CONFORMANT" | "ERROR" | (string & {});
  /** Evaluation result for each Pod contained in the request. */
  results?: Array<PodResult>;
}

export const EvaluateGkePolicyResponse: Schema.Schema<EvaluateGkePolicyResponse> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(PodResult)),
})).annotate({ identifier: "EvaluateGkePolicyResponse" }) as any as Schema.Schema<EvaluateGkePolicyResponse>;

export interface ImageAllowlist {
  /** Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist. */
  allowPattern?: Array<string>;
}

export const ImageAllowlist: Schema.Schema<ImageAllowlist> = Schema.suspend(() => Schema.Struct({
  allowPattern: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ImageAllowlist" }) as any as Schema.Schema<ImageAllowlist>;

export interface PkixPublicKey {
  /** A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13 */
  publicKeyPem?: string;
  /** The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key). */
  signatureAlgorithm?: "SIGNATURE_ALGORITHM_UNSPECIFIED" | "RSA_PSS_2048_SHA256" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_PSS_3072_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_PSS_4096_SHA512" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "ECDSA_P256_SHA256" | "EC_SIGN_P256_SHA256" | "ECDSA_P384_SHA384" | "EC_SIGN_P384_SHA384" | "ECDSA_P521_SHA512" | "EC_SIGN_P521_SHA512" | (string & {});
  /** Optional. The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them. The ID must match exactly contents of the `key_id` field exactly. The ID may be explicitly provided by the caller, but it MUST be a valid RFC3986 URI. If `key_id` is left blank and this `PkixPublicKey` is not used in the context of a wrapper (see next paragraph), a default key ID will be computed based on the digest of the DER encoding of the public key. If this `PkixPublicKey` is used in the context of a wrapper that has its own notion of key ID (e.g. `AttestorPublicKey`), then this field can either match that value exactly, or be left blank, in which case it behaves exactly as though it is equal to that wrapper value. */
  keyId?: string;
}

export const PkixPublicKey: Schema.Schema<PkixPublicKey> = Schema.suspend(() => Schema.Struct({
  publicKeyPem: Schema.optional(Schema.String),
  signatureAlgorithm: Schema.optional(Schema.String),
  keyId: Schema.optional(Schema.String),
})).annotate({ identifier: "PkixPublicKey" }) as any as Schema.Schema<PkixPublicKey>;

export interface PkixPublicKeySet {
  /** Required. `pkix_public_keys` must have at least one entry. */
  pkixPublicKeys?: Array<PkixPublicKey>;
}

export const PkixPublicKeySet: Schema.Schema<PkixPublicKeySet> = Schema.suspend(() => Schema.Struct({
  pkixPublicKeys: Schema.optional(Schema.Array(PkixPublicKey)),
})).annotate({ identifier: "PkixPublicKeySet" }) as any as Schema.Schema<PkixPublicKeySet>;

export interface AttestationAuthenticator {
  /** Optional. A user-provided name for this `AttestationAuthenticator`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. */
  displayName?: string;
  /** Optional. A set of raw PKIX SubjectPublicKeyInfo format public keys. If any public key in the set validates the attestation signature, then the signature is considered authenticated (i.e. any one key is sufficient to authenticate). */
  pkixPublicKeySet?: PkixPublicKeySet;
}

export const AttestationAuthenticator: Schema.Schema<AttestationAuthenticator> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  pkixPublicKeySet: Schema.optional(PkixPublicKeySet),
})).annotate({ identifier: "AttestationAuthenticator" }) as any as Schema.Schema<AttestationAuthenticator>;

export interface SimpleSigningAttestationCheck {
  /** Required. The authenticators required by this check to verify an attestation. Typically this is one or more PKIX public keys for signature verification. Only one authenticator needs to consider an attestation verified in order for an attestation to be considered fully authenticated. In otherwords, this list of authenticators is an "OR" of the authenticator results. At least one authenticator is required. */
  attestationAuthenticators?: Array<AttestationAuthenticator>;
  /** Optional. The projects where attestations are stored as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Only one attestation needs to successfully verify an image for this check to pass, so a single verified attestation found in any of `container_analysis_attestation_projects` is sufficient for the check to pass. A project ID must be used, not a project number. When fetching Occurrences from Container Analysis, only `AttestationOccurrence` kinds are considered. In the future, additional Occurrence kinds may be added to the query. Maximum number of `container_analysis_attestation_projects` allowed in each `SimpleSigningAttestationCheck` is 10. */
  containerAnalysisAttestationProjects?: Array<string>;
}

export const SimpleSigningAttestationCheck: Schema.Schema<SimpleSigningAttestationCheck> = Schema.suspend(() => Schema.Struct({
  attestationAuthenticators: Schema.optional(Schema.Array(AttestationAuthenticator)),
  containerAnalysisAttestationProjects: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SimpleSigningAttestationCheck" }) as any as Schema.Schema<SimpleSigningAttestationCheck>;

export interface TrustedDirectoryCheck {
  /** Required. List of trusted directory patterns. A pattern is in the form "registry/path/to/directory". The registry domain part is defined as two or more dot-separated words, e.g., `us.pkg.dev`, or `gcr.io`. Additionally, `*` can be used in three ways as wildcards: 1. leading `*` to match varying prefixes in registry subdomain (useful for location prefixes); 2. trailing `*` after registry/ to match varying endings; 3. trailing `**` after registry/ to match "/" as well. For example: -- `gcr.io/my-project/my-repo` is valid to match a single directory -- `*-docker.pkg.dev/my-project/my-repo` or `*.gcr.io/my-project` are valid to match varying prefixes -- `gcr.io/my-project/*` will match all direct directories in `my-project` -- `gcr.io/my-project/**` would match all directories in `my-project` -- `gcr.i*` is not allowed since the registry is not completely specified -- `sub*domain.gcr.io/nginx` is not valid because only leading `*` or trailing `*` are allowed. -- `*pkg.dev/my-project/my-repo` is not valid because leading `*` can only match subdomain -- `**-docker.pkg.dev` is not valid because one leading `*` is allowed, and that it cannot match `/` */
  trustedDirPatterns?: Array<string>;
}

export const TrustedDirectoryCheck: Schema.Schema<TrustedDirectoryCheck> = Schema.suspend(() => Schema.Struct({
  trustedDirPatterns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TrustedDirectoryCheck" }) as any as Schema.Schema<TrustedDirectoryCheck>;

export interface ImageFreshnessCheck {
  /** Required. The max number of days that is allowed since the image was uploaded. Must be greater than zero. */
  maxUploadAgeDays?: number;
}

export const ImageFreshnessCheck: Schema.Schema<ImageFreshnessCheck> = Schema.suspend(() => Schema.Struct({
  maxUploadAgeDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "ImageFreshnessCheck" }) as any as Schema.Schema<ImageFreshnessCheck>;

export interface VulnerabilityCheck {
  /** Optional. A list of specific CVEs to ignore even if the vulnerability level violates `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will allow vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`. */
  allowedCves?: Array<string>;
  /** Optional. A list of specific CVEs to always raise warnings about even if the vulnerability level meets `maximumUnfixableSeverity` or `maximumFixableSeverity`. CVEs are listed in the format of Container Analysis note id. For example: - CVE-2021-20305 - CVE-2020-10543 The CVEs are applicable regardless of note provider project, e.g., an entry of `CVE-2021-20305` will block vulnerabilities with a note name of either `projects/goog-vulnz/notes/CVE-2021-20305` or `projects/CUSTOM-PROJECT/notes/CVE-2021-20305`. */
  blockedCves?: Array<string>;
  /** Required. The threshold for severity for which a fix isn't currently available. This field is required and must be set. */
  maximumUnfixableSeverity?: "MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED" | "BLOCK_ALL" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "ALLOW_ALL" | (string & {});
  /** Required. The threshold for severity for which a fix is currently available. This field is required and must be set. */
  maximumFixableSeverity?: "MAXIMUM_ALLOWED_SEVERITY_UNSPECIFIED" | "BLOCK_ALL" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "ALLOW_ALL" | (string & {});
  /** Optional. The projects where vulnerabilities are stored as Container Analysis Occurrences. Each project is expressed in the resource format of `projects/[PROJECT_ID]`, e.g., `projects/my-gcp-project`. An attempt will be made for each project to fetch vulnerabilities, and all valid vulnerabilities will be used to check against the vulnerability policy. If no valid scan is found in all projects configured here, an error will be returned for the check. Maximum number of `container_analysis_vulnerability_projects` allowed in each `VulnerabilityCheck` is 10. */
  containerAnalysisVulnerabilityProjects?: Array<string>;
}

export const VulnerabilityCheck: Schema.Schema<VulnerabilityCheck> = Schema.suspend(() => Schema.Struct({
  allowedCves: Schema.optional(Schema.Array(Schema.String)),
  blockedCves: Schema.optional(Schema.Array(Schema.String)),
  maximumUnfixableSeverity: Schema.optional(Schema.String),
  maximumFixableSeverity: Schema.optional(Schema.String),
  containerAnalysisVulnerabilityProjects: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VulnerabilityCheck" }) as any as Schema.Schema<VulnerabilityCheck>;

export interface AttestationSource {
  /** The IDs of the Google Cloud projects that store the SLSA attestations as Container Analysis Occurrences, in the format `projects/[PROJECT_ID]`. Maximum number of `container_analysis_attestation_projects` allowed in each `AttestationSource` is 10. */
  containerAnalysisAttestationProjects?: Array<string>;
}

export const AttestationSource: Schema.Schema<AttestationSource> = Schema.suspend(() => Schema.Struct({
  containerAnalysisAttestationProjects: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AttestationSource" }) as any as Schema.Schema<AttestationSource>;

export interface VerificationRule {
  /** Each verification rule is used for evaluation against provenances generated by a specific builder (group). For some of the builders, such as the Google Cloud Build, users don't need to explicitly specify their roots of trust in the policy since the evaluation service can automatically fetch them based on the builder (group). */
  trustedBuilder?: "BUILDER_UNSPECIFIED" | "GOOGLE_CLOUD_BUILD" | (string & {});
  /** Specifies where to fetch the provenances attestations generated by the builder (group). */
  attestationSource?: AttestationSource;
  /** If true, require the image to be built from a top-level configuration. `trusted_source_repo_patterns` specifies the repositories containing this configuration. */
  configBasedBuildRequired?: boolean;
  /** List of trusted source code repository URL patterns. These patterns match the full repository URL without its scheme (e.g. `https://`). The patterns must not include schemes. For example, the pattern `source.cloud.google.com/my-project/my-repo-name` matches the following URLs: - `source.cloud.google.com/my-project/my-repo-name` - `git+ssh://source.cloud.google.com/my-project/my-repo-name` - `https://source.cloud.google.com/my-project/my-repo-name` A pattern matches a URL either exactly or with `*` wildcards. `*` can be used in only two ways: 1. trailing `*` after hosturi/ to match varying endings; 2. trailing `**` after hosturi/ to match `/` as well. `*` and `**` can only be used as wildcards and can only occur at the end of the pattern after a `/`. (So it's not possible to match a URL that contains literal `*`.) For example: - `github.com/my-project/my-repo` is valid to match a single repo - `github.com/my-project/*` will match all direct repos in `my-project` - `github.com/**` matches all repos in GitHub */
  trustedSourceRepoPatterns?: Array<string>;
  /** Optional. A CEL expression for specifying custom constraints on the provenance payload. This can be used when users want to specify expectations on provenance fields that are not covered by the general check. For example, users can use this field to require that certain parameters should never be used during the build process. */
  customConstraints?: string;
}

export const VerificationRule: Schema.Schema<VerificationRule> = Schema.suspend(() => Schema.Struct({
  trustedBuilder: Schema.optional(Schema.String),
  attestationSource: Schema.optional(AttestationSource),
  configBasedBuildRequired: Schema.optional(Schema.Boolean),
  trustedSourceRepoPatterns: Schema.optional(Schema.Array(Schema.String)),
  customConstraints: Schema.optional(Schema.String),
})).annotate({ identifier: "VerificationRule" }) as any as Schema.Schema<VerificationRule>;

export interface SlsaCheck {
  /** Specifies a list of verification rules for the SLSA attestations. An image is considered compliant with the SlsaCheck if any of the rules are satisfied. */
  rules?: Array<VerificationRule>;
}

export const SlsaCheck: Schema.Schema<SlsaCheck> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(VerificationRule)),
})).annotate({ identifier: "SlsaCheck" }) as any as Schema.Schema<SlsaCheck>;

export interface SigstorePublicKey {
  /** The public key material in PEM format. */
  publicKeyPem?: string;
}

export const SigstorePublicKey: Schema.Schema<SigstorePublicKey> = Schema.suspend(() => Schema.Struct({
  publicKeyPem: Schema.optional(Schema.String),
})).annotate({ identifier: "SigstorePublicKey" }) as any as Schema.Schema<SigstorePublicKey>;

export interface SigstorePublicKeySet {
  /** Required. `public_keys` must have at least one entry. */
  publicKeys?: Array<SigstorePublicKey>;
}

export const SigstorePublicKeySet: Schema.Schema<SigstorePublicKeySet> = Schema.suspend(() => Schema.Struct({
  publicKeys: Schema.optional(Schema.Array(SigstorePublicKey)),
})).annotate({ identifier: "SigstorePublicKeySet" }) as any as Schema.Schema<SigstorePublicKeySet>;

export interface SigstoreAuthority {
  /** Optional. A user-provided name for this `SigstoreAuthority`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. */
  displayName?: string;
  /** Required. A simple set of public keys. A signature is considered valid if any keys in the set validate the signature. */
  publicKeySet?: SigstorePublicKeySet;
}

export const SigstoreAuthority: Schema.Schema<SigstoreAuthority> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  publicKeySet: Schema.optional(SigstorePublicKeySet),
})).annotate({ identifier: "SigstoreAuthority" }) as any as Schema.Schema<SigstoreAuthority>;

export interface SigstoreSignatureCheck {
  /** Required. The authorities required by this check to verify the signature. A signature only needs to be verified by one authority to pass the check. */
  sigstoreAuthorities?: Array<SigstoreAuthority>;
}

export const SigstoreSignatureCheck: Schema.Schema<SigstoreSignatureCheck> = Schema.suspend(() => Schema.Struct({
  sigstoreAuthorities: Schema.optional(Schema.Array(SigstoreAuthority)),
})).annotate({ identifier: "SigstoreSignatureCheck" }) as any as Schema.Schema<SigstoreSignatureCheck>;

export interface Check {
  /** Optional. A user-provided name for this check. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. */
  displayName?: string;
  /** Optional. Images exempted from this check. If any of the patterns match the image url, the check will not be evaluated. */
  imageAllowlist?: ImageAllowlist;
  /** Optional. A special-case check that always denies. Note that this still only applies when the scope of the `CheckSet` applies and the image isn't exempted by an image allowlist. This check is primarily useful for testing, or to set the default behavior for all unmatched scopes to "deny". */
  alwaysDeny?: boolean;
  /** Optional. Require a SimpleSigning-type attestation for every image in the deployment. */
  simpleSigningAttestationCheck?: SimpleSigningAttestationCheck;
  /** Optional. Require that an image lives in a trusted directory. */
  trustedDirectoryCheck?: TrustedDirectoryCheck;
  /** Optional. Require that an image is no older than a configured expiration time. Image age is determined by its upload time. */
  imageFreshnessCheck?: ImageFreshnessCheck;
  /** Optional. Require that an image does not contain vulnerabilities that violate the configured rules, such as based on severity levels. */
  vulnerabilityCheck?: VulnerabilityCheck;
  /** Optional. Require that an image was built by a trusted builder (such as Google Cloud Build), meets requirements for Supply chain Levels for Software Artifacts (SLSA), and was built from a trusted source code repostitory. */
  slsaCheck?: SlsaCheck;
  /** Optional. Require that an image was signed by Cosign with a trusted key. This check requires that both the image and signature are stored in Artifact Registry. */
  sigstoreSignatureCheck?: SigstoreSignatureCheck;
}

export const Check: Schema.Schema<Check> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  imageAllowlist: Schema.optional(ImageAllowlist),
  alwaysDeny: Schema.optional(Schema.Boolean),
  simpleSigningAttestationCheck: Schema.optional(SimpleSigningAttestationCheck),
  trustedDirectoryCheck: Schema.optional(TrustedDirectoryCheck),
  imageFreshnessCheck: Schema.optional(ImageFreshnessCheck),
  vulnerabilityCheck: Schema.optional(VulnerabilityCheck),
  slsaCheck: Schema.optional(SlsaCheck),
  sigstoreSignatureCheck: Schema.optional(SigstoreSignatureCheck),
})).annotate({ identifier: "Check" }) as any as Schema.Schema<Check>;

export interface CheckSet {
  /** Optional. A user-provided name for this `CheckSet`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results. */
  displayName?: string;
  /** Optional. The scope to which this `CheckSet` applies. If unset or an empty string (the default), applies to all namespaces and service accounts. See the `Scope` message documentation for details on scoping rules. */
  scope?: Scope;
  /** Optional. Images exempted from this `CheckSet`. If any of the patterns match the image being evaluated, no checks in the `CheckSet` will be evaluated. */
  imageAllowlist?: ImageAllowlist;
  /** Optional. The checks to apply. The ultimate result of evaluating the check set will be "allow" if and only if every check in `checks` evaluates to "allow". If `checks` is empty, the default behavior is "always allow". */
  checks?: Array<Check>;
}

export const CheckSet: Schema.Schema<CheckSet> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  scope: Schema.optional(Scope),
  imageAllowlist: Schema.optional(ImageAllowlist),
  checks: Schema.optional(Schema.Array(Check)),
})).annotate({ identifier: "CheckSet" }) as any as Schema.Schema<CheckSet>;

export interface GkePolicy {
  /** Optional. Images exempted from this policy. If any of the patterns match the image being evaluated, the rest of the policy will not be evaluated. */
  imageAllowlist?: ImageAllowlist;
  /** Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects. */
  checkSets?: Array<CheckSet>;
}

export const GkePolicy: Schema.Schema<GkePolicy> = Schema.suspend(() => Schema.Struct({
  imageAllowlist: Schema.optional(ImageAllowlist),
  checkSets: Schema.optional(Schema.Array(CheckSet)),
})).annotate({ identifier: "GkePolicy" }) as any as Schema.Schema<GkePolicy>;

export interface PlatformPolicy {
  /** Output only. The relative resource name of the Binary Authorization platform policy, in the form of `projects/* /platforms/* /policies/*`. */
  name?: string;
  /** Optional. A description comment about the policy. */
  description?: string;
  /** Optional. GKE platform-specific policy. */
  gkePolicy?: GkePolicy;
  /** Output only. Time when the policy was last updated. */
  updateTime?: string;
  /** Optional. Used to prevent updating the policy when another request has updated it since it was retrieved. */
  etag?: string;
}

export const PlatformPolicy: Schema.Schema<PlatformPolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  gkePolicy: Schema.optional(GkePolicy),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "PlatformPolicy" }) as any as Schema.Schema<PlatformPolicy>;

export interface ListPlatformPoliciesResponse {
  /** The list of platform policies. */
  platformPolicies?: Array<PlatformPolicy>;
  /** A token to retrieve the next page of results. Pass this value in the ListPlatformPoliciesRequest.page_token field in the subsequent call to the `ListPlatformPolicies` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListPlatformPoliciesResponse: Schema.Schema<ListPlatformPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  platformPolicies: Schema.optional(Schema.Array(PlatformPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPlatformPoliciesResponse" }) as any as Schema.Schema<ListPlatformPoliciesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AdmissionWhitelistPattern {
  /** An image name pattern to allowlist, in the form `registry/path/to/image`. This supports a trailing `*` wildcard, but this is allowed only in text after the `registry/` part. This also supports a trailing `**` wildcard which matches subdirectories of a given entry. */
  namePattern?: string;
}

export const AdmissionWhitelistPattern: Schema.Schema<AdmissionWhitelistPattern> = Schema.suspend(() => Schema.Struct({
  namePattern: Schema.optional(Schema.String),
})).annotate({ identifier: "AdmissionWhitelistPattern" }) as any as Schema.Schema<AdmissionWhitelistPattern>;

export interface AdmissionRule {
  /** Required. How this admission rule will be evaluated. */
  evaluationMode?: "EVALUATION_MODE_UNSPECIFIED" | "ALWAYS_ALLOW" | "REQUIRE_ATTESTATION" | "ALWAYS_DENY" | (string & {});
  /** Optional. The resource names of the attestors that must attest to a container image, in the format `projects/* /attestors/*`. Each attestor must exist before a policy can reference it. To add an attestor to a policy the principal issuing the policy change request must be able to read the attestor resource. Note: this field must be non-empty when the `evaluation_mode` field specifies `REQUIRE_ATTESTATION`, otherwise it must be empty. */
  requireAttestationsBy?: Array<string>;
  /** Required. The action when a pod creation is denied by the admission rule. */
  enforcementMode?: "ENFORCEMENT_MODE_UNSPECIFIED" | "ENFORCED_BLOCK_AND_AUDIT_LOG" | "DRYRUN_AUDIT_LOG_ONLY" | (string & {});
}

export const AdmissionRule: Schema.Schema<AdmissionRule> = Schema.suspend(() => Schema.Struct({
  evaluationMode: Schema.optional(Schema.String),
  requireAttestationsBy: Schema.optional(Schema.Array(Schema.String)),
  enforcementMode: Schema.optional(Schema.String),
})).annotate({ identifier: "AdmissionRule" }) as any as Schema.Schema<AdmissionRule>;

export interface Policy {
  /** Output only. The resource name, in the format `projects/* /policy`. There is at most one policy per project. */
  name?: string;
  /** Optional. A descriptive comment. */
  description?: string;
  /** Optional. Controls the evaluation of a Google-maintained global admission policy for common system-level images. Images not covered by the global policy will be subject to the project admission policy. This setting has no effect when specified inside a global admission policy. */
  globalPolicyEvaluationMode?: "GLOBAL_POLICY_EVALUATION_MODE_UNSPECIFIED" | "ENABLE" | "DISABLE" | (string & {});
  /** Optional. Admission policy allowlisting. A matching admission request will always be permitted. This feature is typically used to exclude Google or third-party infrastructure images from Binary Authorization policies. */
  admissionWhitelistPatterns?: Array<AdmissionWhitelistPattern>;
  /** Optional. A valid policy has only one of the following rule maps non-empty, i.e. only one of `cluster_admission_rules`, `kubernetes_namespace_admission_rules`, `kubernetes_service_account_admission_rules`, or `istio_service_identity_admission_rules` can be non-empty. Per-cluster admission rules. Cluster spec format: `location.clusterId`. There can be at most one admission rule per cluster spec. A `location` is either a compute zone (e.g. us-central1-a) or a region (e.g. us-central1). For `clusterId` syntax restrictions see https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters. */
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

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  globalPolicyEvaluationMode: Schema.optional(Schema.String),
  admissionWhitelistPatterns: Schema.optional(Schema.Array(AdmissionWhitelistPattern)),
  clusterAdmissionRules: Schema.optional(Schema.Record(Schema.String, AdmissionRule)),
  kubernetesNamespaceAdmissionRules: Schema.optional(Schema.Record(Schema.String, AdmissionRule)),
  kubernetesServiceAccountAdmissionRules: Schema.optional(Schema.Record(Schema.String, AdmissionRule)),
  istioServiceIdentityAdmissionRules: Schema.optional(Schema.Record(Schema.String, AdmissionRule)),
  defaultAdmissionRule: Schema.optional(AdmissionRule),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface AttestorPublicKey {
  /** Optional. A descriptive comment. This field may be updated. */
  comment?: string;
  /** The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them, and that ID must match the contents of this field exactly. Additional restrictions on this field can be imposed based on which public key type is encapsulated. See the documentation on `public_key` cases below for details. */
  id?: string;
  /** ASCII-armored representation of a PGP public key, as the entire output by the command `gpg --export --armor foo@example.com` (either LF or CRLF line endings). When using this field, `id` should be left blank. The Binary Authorization API handlers will calculate the ID and fill it in automatically. Binary Authorization computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as upper-case hex. If `id` is provided by the caller, it will be overwritten by the API-calculated ID. */
  asciiArmoredPgpPublicKey?: string;
  /** A raw PKIX SubjectPublicKeyInfo format public key. NOTE: `id` may be explicitly provided by the caller when using this type of public key, but it MUST be a valid RFC3986 URI. If `id` is left blank, a default one will be computed based on the digest of the DER encoding of the public key. */
  pkixPublicKey?: PkixPublicKey;
}

export const AttestorPublicKey: Schema.Schema<AttestorPublicKey> = Schema.suspend(() => Schema.Struct({
  comment: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  asciiArmoredPgpPublicKey: Schema.optional(Schema.String),
  pkixPublicKey: Schema.optional(PkixPublicKey),
})).annotate({ identifier: "AttestorPublicKey" }) as any as Schema.Schema<AttestorPublicKey>;

export interface UserOwnedGrafeasNote {
  /** Required. The Grafeas resource name of a Attestation.Authority Note, created by the user, in the format: `projects/[PROJECT_ID]/notes/*`. This field may not be updated. A project ID must be used, not a project number. An attestation by this attestor is stored as a Grafeas Attestation.Authority Occurrence that names a container image and that links to this Note. Grafeas is an external dependency. */
  noteReference?: string;
  /** Optional. Public keys that verify attestations signed by this attestor. This field may be updated. If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request. If this field is empty, this attestor always returns that no valid attestations exist. */
  publicKeys?: Array<AttestorPublicKey>;
  /** Output only. This field will contain the service account email address that this attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`). This email address is fixed for the lifetime of the attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern. */
  delegationServiceAccountEmail?: string;
}

export const UserOwnedGrafeasNote: Schema.Schema<UserOwnedGrafeasNote> = Schema.suspend(() => Schema.Struct({
  noteReference: Schema.optional(Schema.String),
  publicKeys: Schema.optional(Schema.Array(AttestorPublicKey)),
  delegationServiceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "UserOwnedGrafeasNote" }) as any as Schema.Schema<UserOwnedGrafeasNote>;

export interface Attestor {
  /** Required. The resource name, in the format: `projects/* /attestors/*`. This field may not be updated. */
  name?: string;
  /** Optional. A descriptive comment. This field may be updated. The field may be displayed in chooser dialogs. */
  description?: string;
  /** This specifies how an attestation will be read, and how it will be used during policy enforcement. */
  userOwnedGrafeasNote?: UserOwnedGrafeasNote;
  /** Output only. Time when the attestor was last updated. */
  updateTime?: string;
  /** Optional. A checksum, returned by the server, that can be sent on update requests to ensure the attestor has an up-to-date value before attempting to update it. See https://google.aip.dev/154. */
  etag?: string;
}

export const Attestor: Schema.Schema<Attestor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  userOwnedGrafeasNote: Schema.optional(UserOwnedGrafeasNote),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Attestor" }) as any as Schema.Schema<Attestor>;

export interface ListAttestorsResponse {
  /** The list of attestors. */
  attestors?: Array<Attestor>;
  /** A token to retrieve the next page of results. Pass this value in the ListAttestorsRequest.page_token field in the subsequent call to the `ListAttestors` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAttestorsResponse: Schema.Schema<ListAttestorsResponse> = Schema.suspend(() => Schema.Struct({
  attestors: Schema.optional(Schema.Array(Attestor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAttestorsResponse" }) as any as Schema.Schema<ListAttestorsResponse>;

export interface Signature {
  /** The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. */
  signature?: string;
  /** The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" */
  publicKeyId?: string;
}

export const Signature: Schema.Schema<Signature> = Schema.suspend(() => Schema.Struct({
  signature: Schema.optional(Schema.String),
  publicKeyId: Schema.optional(Schema.String),
})).annotate({ identifier: "Signature" }) as any as Schema.Schema<Signature>;

export interface Jwt {
  /** The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1 */
  compactJwt?: string;
}

export const Jwt: Schema.Schema<Jwt> = Schema.suspend(() => Schema.Struct({
  compactJwt: Schema.optional(Schema.String),
})).annotate({ identifier: "Jwt" }) as any as Schema.Schema<Jwt>;

export interface AttestationOccurrence {
  /** Required. The serialized payload that is verified by one or more `signatures`. */
  serializedPayload?: string;
  /** One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. */
  signatures?: Array<Signature>;
  /** One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas. */
  jwts?: Array<Jwt>;
}

export const AttestationOccurrence: Schema.Schema<AttestationOccurrence> = Schema.suspend(() => Schema.Struct({
  serializedPayload: Schema.optional(Schema.String),
  signatures: Schema.optional(Schema.Array(Signature)),
  jwts: Schema.optional(Schema.Array(Jwt)),
})).annotate({ identifier: "AttestationOccurrence" }) as any as Schema.Schema<AttestationOccurrence>;

export interface ValidateAttestationOccurrenceRequest {
  /** Required. An AttestationOccurrence to be checked that it can be verified by the `Attestor`. It does not have to be an existing entity in Container Analysis. It must otherwise be a valid `AttestationOccurrence`. */
  attestation?: AttestationOccurrence;
  /** Required. The resource name of the Note to which the containing Occurrence is associated. */
  occurrenceNote?: string;
  /** Required. The URI of the artifact (e.g. container image) that is the subject of the containing Occurrence. */
  occurrenceResourceUri?: string;
}

export const ValidateAttestationOccurrenceRequest: Schema.Schema<ValidateAttestationOccurrenceRequest> = Schema.suspend(() => Schema.Struct({
  attestation: Schema.optional(AttestationOccurrence),
  occurrenceNote: Schema.optional(Schema.String),
  occurrenceResourceUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidateAttestationOccurrenceRequest" }) as any as Schema.Schema<ValidateAttestationOccurrenceRequest>;

export interface ValidateAttestationOccurrenceResponse {
  /** The result of the Attestation validation. */
  result?: "RESULT_UNSPECIFIED" | "VERIFIED" | "ATTESTATION_NOT_VERIFIABLE" | (string & {});
  /** The reason for denial if the Attestation couldn't be validated. */
  denialReason?: string;
}

export const ValidateAttestationOccurrenceResponse: Schema.Schema<ValidateAttestationOccurrenceResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(Schema.String),
  denialReason: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidateAttestationOccurrenceResponse" }) as any as Schema.Schema<ValidateAttestationOccurrenceResponse>;

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

export interface IamPolicy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const IamPolicy: Schema.Schema<IamPolicy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "IamPolicy" }) as any as Schema.Schema<IamPolicy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: IamPolicy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(IamPolicy),
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

// ==========================================================================
// Operations
// ==========================================================================

/** A policy specifies the attestors that must attest to a container image, before the project is allowed to deploy that image. There is at most one policy per project. All image admission requests are permitted if a project has no policy. Gets the policy for this project. Returns a default policy if the project does not have one. */
export interface GetPolicyProjectsRequest {
  /** Required. The resource name of the policy to retrieve, in the format `projects/* /policy`. */
  name: string;
}

export const GetPolicyProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/policy" }),
  svc,
) as unknown as Schema.Schema<GetPolicyProjectsRequest>;

export type GetPolicyProjectsResponse = Policy;
export const GetPolicyProjectsResponse = Policy;

export type GetPolicyProjectsError = CommonErrors;

export const getPolicyProjects: API.OperationMethod<GetPolicyProjectsRequest, GetPolicyProjectsResponse, GetPolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPolicyProjectsRequest,
  output: GetPolicyProjectsResponse,
  errors: [],
}));

/** Creates or updates a project's policy, and returns a copy of the new policy. A policy is always updated as a whole, to avoid race conditions with concurrent policy enforcement (or management!) requests. Returns `NOT_FOUND` if the project does not exist, `INVALID_ARGUMENT` if the request is malformed. */
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
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/policy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePolicyProjectsRequest>;

export type UpdatePolicyProjectsResponse = Policy;
export const UpdatePolicyProjectsResponse = Policy;

export type UpdatePolicyProjectsError = CommonErrors;

export const updatePolicyProjects: API.OperationMethod<UpdatePolicyProjectsRequest, UpdatePolicyProjectsResponse, UpdatePolicyProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePolicyProjectsRequest,
  output: UpdatePolicyProjectsResponse,
  errors: [],
}));

/** Evaluates a Kubernetes object versus a GKE platform policy. Returns `NOT_FOUND` if the policy doesn't exist, `INVALID_ARGUMENT` if the policy or request is malformed and `PERMISSION_DENIED` if the client does not have sufficient permissions. */
export interface EvaluateProjectsPlatformsGkePoliciesRequest {
  /** Required. The name of the platform policy to evaluate in the format `projects/* /platforms/* /policies/*`. */
  name: string;
  /** Request body */
  body?: EvaluateGkePolicyRequest;
}

export const EvaluateProjectsPlatformsGkePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EvaluateGkePolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/platforms/gke/policies/{policiesId}:evaluate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EvaluateProjectsPlatformsGkePoliciesRequest>;

export type EvaluateProjectsPlatformsGkePoliciesResponse = EvaluateGkePolicyResponse;
export const EvaluateProjectsPlatformsGkePoliciesResponse = EvaluateGkePolicyResponse;

export type EvaluateProjectsPlatformsGkePoliciesError = CommonErrors;

export const evaluateProjectsPlatformsGkePolicies: API.OperationMethod<EvaluateProjectsPlatformsGkePoliciesRequest, EvaluateProjectsPlatformsGkePoliciesResponse, EvaluateProjectsPlatformsGkePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EvaluateProjectsPlatformsGkePoliciesRequest,
  output: EvaluateProjectsPlatformsGkePoliciesResponse,
  errors: [],
}));

/** Creates a platform policy, and returns a copy of it. Returns `NOT_FOUND` if the project or platform doesn't exist, `INVALID_ARGUMENT` if the request is malformed, `ALREADY_EXISTS` if the policy already exists, and `INVALID_ARGUMENT` if the policy contains a platform-specific policy that does not match the platform value specified in the URL. */
export interface CreateProjectsPlatformsPoliciesRequest {
  /** Required. The parent of this platform policy. */
  parent: string;
  /** Required. The platform policy ID. */
  policyId?: string;
  /** Request body */
  body?: PlatformPolicy;
}

export const CreateProjectsPlatformsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  policyId: Schema.optional(Schema.String).pipe(T.HttpQuery("policyId")),
  body: Schema.optional(PlatformPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/platforms/{platformsId}/policies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsPlatformsPoliciesRequest>;

export type CreateProjectsPlatformsPoliciesResponse = PlatformPolicy;
export const CreateProjectsPlatformsPoliciesResponse = PlatformPolicy;

export type CreateProjectsPlatformsPoliciesError = CommonErrors;

export const createProjectsPlatformsPolicies: API.OperationMethod<CreateProjectsPlatformsPoliciesRequest, CreateProjectsPlatformsPoliciesResponse, CreateProjectsPlatformsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsPlatformsPoliciesRequest,
  output: CreateProjectsPlatformsPoliciesResponse,
  errors: [],
}));

/** Gets a platform policy. Returns `NOT_FOUND` if the policy doesn't exist. */
export interface GetProjectsPlatformsPoliciesRequest {
  /** Required. The name of the platform policy to retrieve in the format `projects/* /platforms/* /policies/*`. */
  name: string;
}

export const GetProjectsPlatformsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/platforms/{platformsId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsPlatformsPoliciesRequest>;

export type GetProjectsPlatformsPoliciesResponse = PlatformPolicy;
export const GetProjectsPlatformsPoliciesResponse = PlatformPolicy;

export type GetProjectsPlatformsPoliciesError = CommonErrors;

export const getProjectsPlatformsPolicies: API.OperationMethod<GetProjectsPlatformsPoliciesRequest, GetProjectsPlatformsPoliciesResponse, GetProjectsPlatformsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsPlatformsPoliciesRequest,
  output: GetProjectsPlatformsPoliciesResponse,
  errors: [],
}));

/** Replaces a platform policy. Returns `NOT_FOUND` if the policy doesn't exist. */
export interface ReplacePlatformPolicyProjectsPlatformsPoliciesRequest {
  /** Output only. The relative resource name of the Binary Authorization platform policy, in the form of `projects/* /platforms/* /policies/*`. */
  name: string;
  /** Request body */
  body?: PlatformPolicy;
}

export const ReplacePlatformPolicyProjectsPlatformsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PlatformPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/platforms/{platformsId}/policies/{policiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplacePlatformPolicyProjectsPlatformsPoliciesRequest>;

export type ReplacePlatformPolicyProjectsPlatformsPoliciesResponse = PlatformPolicy;
export const ReplacePlatformPolicyProjectsPlatformsPoliciesResponse = PlatformPolicy;

export type ReplacePlatformPolicyProjectsPlatformsPoliciesError = CommonErrors;

export const replacePlatformPolicyProjectsPlatformsPolicies: API.OperationMethod<ReplacePlatformPolicyProjectsPlatformsPoliciesRequest, ReplacePlatformPolicyProjectsPlatformsPoliciesResponse, ReplacePlatformPolicyProjectsPlatformsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplacePlatformPolicyProjectsPlatformsPoliciesRequest,
  output: ReplacePlatformPolicyProjectsPlatformsPoliciesResponse,
  errors: [],
}));

/** Lists platform policies owned by a project in the specified platform. Returns `INVALID_ARGUMENT` if the project or the platform doesn't exist. */
export interface ListProjectsPlatformsPoliciesRequest {
  /** Required. The resource name of the platform associated with the platform policies using the format `projects/* /platforms/*`. */
  parent: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server picks an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListPlatformPoliciesResponse.next_page_token returned from the previous call to the `ListPlatformPolicies` method. */
  pageToken?: string;
}

export const ListProjectsPlatformsPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/platforms/{platformsId}/policies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsPlatformsPoliciesRequest>;

export type ListProjectsPlatformsPoliciesResponse = ListPlatformPoliciesResponse;
export const ListProjectsPlatformsPoliciesResponse = ListPlatformPoliciesResponse;

export type ListProjectsPlatformsPoliciesError = CommonErrors;

export const listProjectsPlatformsPolicies = API.makePaginated(() => ({
  input: ListProjectsPlatformsPoliciesRequest,
  output: ListProjectsPlatformsPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a platform policy. Returns `NOT_FOUND` if the policy doesn't exist. */
export interface DeleteProjectsPlatformsPoliciesRequest {
  /** Required. The name of the platform policy to delete, in the format `projects/* /platforms/* /policies/*`. */
  name: string;
  /** Optional. Used to prevent deleting the policy when another request has updated it since it was retrieved. */
  etag?: string;
}

export const DeleteProjectsPlatformsPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/platforms/{platformsId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsPlatformsPoliciesRequest>;

export type DeleteProjectsPlatformsPoliciesResponse = Empty;
export const DeleteProjectsPlatformsPoliciesResponse = Empty;

export type DeleteProjectsPlatformsPoliciesError = CommonErrors;

export const deleteProjectsPlatformsPolicies: API.OperationMethod<DeleteProjectsPlatformsPoliciesRequest, DeleteProjectsPlatformsPoliciesResponse, DeleteProjectsPlatformsPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsPlatformsPoliciesRequest,
  output: DeleteProjectsPlatformsPoliciesResponse,
  errors: [],
}));

/** Creates an attestor, and returns a copy of the new attestor. Returns `NOT_FOUND` if the project does not exist, `INVALID_ARGUMENT` if the request is malformed, `ALREADY_EXISTS` if the attestor already exists. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/attestors", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAttestorsRequest>;

export type CreateProjectsAttestorsResponse = Attestor;
export const CreateProjectsAttestorsResponse = Attestor;

export type CreateProjectsAttestorsError = CommonErrors;

export const createProjectsAttestors: API.OperationMethod<CreateProjectsAttestorsRequest, CreateProjectsAttestorsResponse, CreateProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAttestorsRequest,
  output: CreateProjectsAttestorsResponse,
  errors: [],
}));

/** Gets an attestor. Returns `NOT_FOUND` if the attestor does not exist. */
export interface GetProjectsAttestorsRequest {
  /** Required. The name of the attestor to retrieve, in the format `projects/* /attestors/*`. */
  name: string;
}

export const GetProjectsAttestorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/attestors/{attestorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAttestorsRequest>;

export type GetProjectsAttestorsResponse = Attestor;
export const GetProjectsAttestorsResponse = Attestor;

export type GetProjectsAttestorsError = CommonErrors;

export const getProjectsAttestors: API.OperationMethod<GetProjectsAttestorsRequest, GetProjectsAttestorsResponse, GetProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAttestorsRequest,
  output: GetProjectsAttestorsResponse,
  errors: [],
}));

/** Updates an attestor. Returns `NOT_FOUND` if the attestor does not exist. */
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
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/attestors/{attestorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsAttestorsRequest>;

export type UpdateProjectsAttestorsResponse = Attestor;
export const UpdateProjectsAttestorsResponse = Attestor;

export type UpdateProjectsAttestorsError = CommonErrors;

export const updateProjectsAttestors: API.OperationMethod<UpdateProjectsAttestorsRequest, UpdateProjectsAttestorsResponse, UpdateProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsAttestorsRequest,
  output: UpdateProjectsAttestorsResponse,
  errors: [],
}));

/** Lists attestors. Returns `INVALID_ARGUMENT` if the project does not exist. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/attestors" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAttestorsRequest>;

export type ListProjectsAttestorsResponse = ListAttestorsResponse;
export const ListProjectsAttestorsResponse = ListAttestorsResponse;

export type ListProjectsAttestorsError = CommonErrors;

export const listProjectsAttestors = API.makePaginated(() => ({
  input: ListProjectsAttestorsRequest,
  output: ListProjectsAttestorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an attestor. Returns `NOT_FOUND` if the attestor does not exist. */
export interface DeleteProjectsAttestorsRequest {
  /** Required. The name of the attestors to delete, in the format `projects/* /attestors/*`. */
  name: string;
}

export const DeleteProjectsAttestorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/attestors/{attestorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAttestorsRequest>;

export type DeleteProjectsAttestorsResponse = Empty;
export const DeleteProjectsAttestorsResponse = Empty;

export type DeleteProjectsAttestorsError = CommonErrors;

export const deleteProjectsAttestors: API.OperationMethod<DeleteProjectsAttestorsRequest, DeleteProjectsAttestorsResponse, DeleteProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAttestorsRequest,
  output: DeleteProjectsAttestorsResponse,
  errors: [],
}));

/** Returns whether the given `Attestation` for the given image URI was signed by the given `Attestor` */
export interface ValidateAttestationOccurrenceProjectsAttestorsRequest {
  /** Required. The resource name of the Attestor of the occurrence, in the format `projects/* /attestors/*`. */
  attestor: string;
  /** Request body */
  body?: ValidateAttestationOccurrenceRequest;
}

export const ValidateAttestationOccurrenceProjectsAttestorsRequest = Schema.Struct({
  attestor: Schema.String.pipe(T.HttpPath("attestor")),
  body: Schema.optional(ValidateAttestationOccurrenceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/attestors/{attestorsId}:validateAttestationOccurrence", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateAttestationOccurrenceProjectsAttestorsRequest>;

export type ValidateAttestationOccurrenceProjectsAttestorsResponse = ValidateAttestationOccurrenceResponse;
export const ValidateAttestationOccurrenceProjectsAttestorsResponse = ValidateAttestationOccurrenceResponse;

export type ValidateAttestationOccurrenceProjectsAttestorsError = CommonErrors;

export const validateAttestationOccurrenceProjectsAttestors: API.OperationMethod<ValidateAttestationOccurrenceProjectsAttestorsRequest, ValidateAttestationOccurrenceProjectsAttestorsResponse, ValidateAttestationOccurrenceProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateAttestationOccurrenceProjectsAttestorsRequest,
  output: ValidateAttestationOccurrenceProjectsAttestorsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/attestors/{attestorsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsAttestorsRequest>;

export type SetIamPolicyProjectsAttestorsResponse = IamPolicy;
export const SetIamPolicyProjectsAttestorsResponse = IamPolicy;

export type SetIamPolicyProjectsAttestorsError = CommonErrors;

export const setIamPolicyProjectsAttestors: API.OperationMethod<SetIamPolicyProjectsAttestorsRequest, SetIamPolicyProjectsAttestorsResponse, SetIamPolicyProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsAttestorsRequest,
  output: SetIamPolicyProjectsAttestorsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsAttestorsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsAttestorsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/attestors/{attestorsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsAttestorsRequest>;

export type GetIamPolicyProjectsAttestorsResponse = IamPolicy;
export const GetIamPolicyProjectsAttestorsResponse = IamPolicy;

export type GetIamPolicyProjectsAttestorsError = CommonErrors;

export const getIamPolicyProjectsAttestors: API.OperationMethod<GetIamPolicyProjectsAttestorsRequest, GetIamPolicyProjectsAttestorsResponse, GetIamPolicyProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsAttestorsRequest,
  output: GetIamPolicyProjectsAttestorsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/attestors/{attestorsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsAttestorsRequest>;

export type TestIamPermissionsProjectsAttestorsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsAttestorsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsAttestorsError = CommonErrors;

export const testIamPermissionsProjectsAttestors: API.OperationMethod<TestIamPermissionsProjectsAttestorsRequest, TestIamPermissionsProjectsAttestorsResponse, TestIamPermissionsProjectsAttestorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsAttestorsRequest,
  output: TestIamPermissionsProjectsAttestorsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/policy:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsPolicyRequest>;

export type SetIamPolicyProjectsPolicyResponse = IamPolicy;
export const SetIamPolicyProjectsPolicyResponse = IamPolicy;

export type SetIamPolicyProjectsPolicyError = CommonErrors;

export const setIamPolicyProjectsPolicy: API.OperationMethod<SetIamPolicyProjectsPolicyRequest, SetIamPolicyProjectsPolicyResponse, SetIamPolicyProjectsPolicyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsPolicyRequest,
  output: SetIamPolicyProjectsPolicyResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsPolicyRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsPolicyRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/policy:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsPolicyRequest>;

export type GetIamPolicyProjectsPolicyResponse = IamPolicy;
export const GetIamPolicyProjectsPolicyResponse = IamPolicy;

export type GetIamPolicyProjectsPolicyError = CommonErrors;

export const getIamPolicyProjectsPolicy: API.OperationMethod<GetIamPolicyProjectsPolicyRequest, GetIamPolicyProjectsPolicyResponse, GetIamPolicyProjectsPolicyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsPolicyRequest,
  output: GetIamPolicyProjectsPolicyResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/policy:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsPolicyRequest>;

export type TestIamPermissionsProjectsPolicyResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsPolicyResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsPolicyError = CommonErrors;

export const testIamPermissionsProjectsPolicy: API.OperationMethod<TestIamPermissionsProjectsPolicyRequest, TestIamPermissionsProjectsPolicyResponse, TestIamPermissionsProjectsPolicyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsPolicyRequest,
  output: TestIamPermissionsProjectsPolicyResponse,
  errors: [],
}));

/** Gets the current system policy in the specified location. */
export interface GetPolicySystempolicyRequest {
  /** Required. The resource name, in the format `locations/* /policy`. Note that the system policy is not associated with a project. */
  name: string;
}

export const GetPolicySystempolicyRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/policy" }),
  svc,
) as unknown as Schema.Schema<GetPolicySystempolicyRequest>;

export type GetPolicySystempolicyResponse = Policy;
export const GetPolicySystempolicyResponse = Policy;

export type GetPolicySystempolicyError = CommonErrors;

export const getPolicySystempolicy: API.OperationMethod<GetPolicySystempolicyRequest, GetPolicySystempolicyResponse, GetPolicySystempolicyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPolicySystempolicyRequest,
  output: GetPolicySystempolicyResponse,
  errors: [],
}));

