// ==========================================================================
// Access Approval API (accessapproval v1)
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
  name: "accessapproval",
  version: "v1",
  rootUrl: "https://accessapproval.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface EnrolledService {
  /** The enrollment level of the service. */
  enrollmentLevel?: "ENROLLMENT_LEVEL_UNSPECIFIED" | "BLOCK_ALL" | (string & {});
  /** The product for which Access Approval will be enrolled. Allowed values are listed below (case-sensitive): * all * GA * Access Context Manager * Anthos Identity Service * AlloyDB for PostgreSQL * Apigee * Application Integration * App Hub * Artifact Registry * Anthos Service Mesh * Access Transparency * BigQuery * Certificate Authority Service * Cloud Bigtable * CCAI Assist and Knowledge * Cloud Dataflow * Cloud Dataproc * CEP Security Gateway * Compliance Evaluation Service * Cloud Firestore * Cloud Healthcare API * Chronicle * Cloud AI Companion Gateway - Titan * Google Cloud Armor * Cloud Asset Inventory * Cloud Asset Search * Cloud Deploy * Cloud DNS * Cloud Latency * Cloud Memorystore for Redis * CloudNet Control * Cloud Riptide * Cloud Tasks * Cloud Trace * Cloud Data Transfer * Cloud Composer * Integration Connectors * Contact Center AI Insights * Cloud Pub/Sub * Cloud Run * Resource Manager * Cloud Spanner * Database Center * Cloud Dataform * Cloud Data Fusion * Dataplex * Dialogflow Customer Experience Edition * Cloud DLP * Document AI * Edge Container * Edge Network * Cloud EKM * Eventarc * Firebase Data Connect * Firebase Rules * App Engine * Cloud Build * Compute Engine * Cloud Functions (2nd Gen) * Cloud Filestore * Cloud Interconnect * Cloud NetApp Volumes * Cloud Storage * Generative AI App Builder * Google Kubernetes Engine * Backup for GKE API * GKE Connect * GKE Hub * Hoverboard * Cloud HSM * Cloud Identity and Access Management * Cloud Identity-Aware Proxy * Infrastructure Manager * Identity Storage Service * Key Access Justifications * Cloud Key Management Service * Cloud Logging * Looker (Google Cloud core) * Looker Studio * Management Hub * Model Armor * Cloud Monitoring * Cloud NAT * Connectivity Hub * External passthrough Network Load Balancer * OIDC One * Organization Policy Service * Org Lifecycle * Persistent Disk * Parameter Manager * Private Services Access * Regional Internal Application Load Balancer * Storage Batch Operations * Cloud Security Command Center * Secure Source Manager * Seeker * Service Provisioning * Speaker ID * Secret Manager * Cloud SQL * Cloud Speech-to-Text * Traffic Director * Cloud Text-to-Speech * USPS Andromeda * Vertex AI * Virtual Private Cloud (VPC) * VPC Access * VPC Service Controls Troubleshooter * VPC virtnet * Cloud Workstations * Web Risk Note: These values are supported as input for legacy purposes, but will not be returned from the API. * all * ga-only * appengine.googleapis.com * artifactregistry.googleapis.com * bigquery.googleapis.com * bigtable.googleapis.com * container.googleapis.com * cloudkms.googleapis.com * cloudresourcemanager.googleapis.com * cloudsql.googleapis.com * compute.googleapis.com * dataflow.googleapis.com * dataproc.googleapis.com * dlp.googleapis.com * iam.googleapis.com * logging.googleapis.com * orgpolicy.googleapis.com * pubsub.googleapis.com * spanner.googleapis.com * secretmanager.googleapis.com * speakerid.googleapis.com * storage.googleapis.com Calls to UpdateAccessApprovalSettings using 'all' or any of the XXX.googleapis.com will be translated to the associated product name ('all', 'App Engine', etc.). Note: 'all' will enroll the resource in all products supported at both 'GA' and 'Preview' levels. More information about levels of support is available at https://cloud.google.com/access-approval/docs/supported-services */
  cloudProduct?: string;
}

export const EnrolledService: Schema.Schema<EnrolledService> = Schema.suspend(() => Schema.Struct({
  enrollmentLevel: Schema.optional(Schema.String),
  cloudProduct: Schema.optional(Schema.String),
})).annotate({ identifier: "EnrolledService" }) as any as Schema.Schema<EnrolledService>;

export interface ResourceProperties {
  /** Whether an approval will exclude the descendants of the resource being requested. */
  excludesDescendants?: boolean;
}

export const ResourceProperties: Schema.Schema<ResourceProperties> = Schema.suspend(() => Schema.Struct({
  excludesDescendants: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ResourceProperties" }) as any as Schema.Schema<ResourceProperties>;

export interface AccessApprovalServiceAccount {
  /** The resource name of the Access Approval service account. Format is one of: * "projects/{project}/serviceAccount" * "folders/{folder}/serviceAccount" * "organizations/{organization}/serviceAccount" */
  name?: string;
  /** Email address of the service account. */
  accountEmail?: string;
}

export const AccessApprovalServiceAccount: Schema.Schema<AccessApprovalServiceAccount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  accountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessApprovalServiceAccount" }) as any as Schema.Schema<AccessApprovalServiceAccount>;

export interface DismissDecision {
  /** The time at which the approval request was dismissed. */
  dismissTime?: string;
  /** This field will be true if the ApprovalRequest was implicitly dismissed due to inaction by the access approval approvers (the request is not acted on by the approvers before the exiration time). */
  implicit?: boolean;
}

export const DismissDecision: Schema.Schema<DismissDecision> = Schema.suspend(() => Schema.Struct({
  dismissTime: Schema.optional(Schema.String),
  implicit: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DismissDecision" }) as any as Schema.Schema<DismissDecision>;

export interface SignatureInfo {
  /** The hashing algorithm used for signature verification. It will only be present in the case of Google managed keys. */
  googleKeyAlgorithm?: "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED" | "GOOGLE_SYMMETRIC_ENCRYPTION" | "AES_128_GCM" | "AES_256_GCM" | "AES_128_CBC" | "AES_256_CBC" | "AES_128_CTR" | "AES_256_CTR" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "RSA_SIGN_RAW_PKCS1_2048" | "RSA_SIGN_RAW_PKCS1_3072" | "RSA_SIGN_RAW_PKCS1_4096" | "RSA_DECRYPT_OAEP_2048_SHA256" | "RSA_DECRYPT_OAEP_3072_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA512" | "RSA_DECRYPT_OAEP_2048_SHA1" | "RSA_DECRYPT_OAEP_3072_SHA1" | "RSA_DECRYPT_OAEP_4096_SHA1" | "EC_SIGN_P256_SHA256" | "EC_SIGN_P384_SHA384" | "EC_SIGN_SECP256K1_SHA256" | "EC_SIGN_ED25519" | "HMAC_SHA256" | "HMAC_SHA1" | "HMAC_SHA384" | "HMAC_SHA512" | "HMAC_SHA224" | "EXTERNAL_SYMMETRIC_ENCRYPTION" | "ML_KEM_768" | "ML_KEM_1024" | "KEM_XWING" | "PQ_SIGN_ML_DSA_44" | "PQ_SIGN_ML_DSA_65" | "PQ_SIGN_ML_DSA_87" | "PQ_SIGN_SLH_DSA_SHA2_128S" | "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256" | "PQ_SIGN_ML_DSA_44_EXTERNAL_MU" | "PQ_SIGN_ML_DSA_65_EXTERNAL_MU" | "PQ_SIGN_ML_DSA_87_EXTERNAL_MU" | (string & {});
  /** The public key for the Google default signing, encoded in PEM format. The signature was created using a private key which may be verified using this public key. */
  googlePublicKeyPem?: string;
  /** The digital signature. */
  signature?: string;
  /** The resource name of the customer CryptoKeyVersion used for signing. */
  customerKmsKeyVersion?: string;
  /** The ApprovalRequest that is serialized without the SignatureInfo message field. This data is used with the hashing algorithm to generate the digital signature, and it can be used for signature verification. */
  serializedApprovalRequest?: string;
}

export const SignatureInfo: Schema.Schema<SignatureInfo> = Schema.suspend(() => Schema.Struct({
  googleKeyAlgorithm: Schema.optional(Schema.String),
  googlePublicKeyPem: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  customerKmsKeyVersion: Schema.optional(Schema.String),
  serializedApprovalRequest: Schema.optional(Schema.String),
})).annotate({ identifier: "SignatureInfo" }) as any as Schema.Schema<SignatureInfo>;

export interface ApproveDecision {
  /** True when the request has been auto-approved. */
  autoApproved?: boolean;
  /** If set, denotes the timestamp at which the approval is invalidated. */
  invalidateTime?: string;
  /** The time at which the approval expires. */
  expireTime?: string;
  /** The signature for the ApprovalRequest and details on how it was signed. */
  signatureInfo?: SignatureInfo;
  /** The time at which approval was granted. */
  approveTime?: string;
  /** True when the request has been approved by the customer's defined policy. */
  policyApproved?: boolean;
}

export const ApproveDecision: Schema.Schema<ApproveDecision> = Schema.suspend(() => Schema.Struct({
  autoApproved: Schema.optional(Schema.Boolean),
  invalidateTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  signatureInfo: Schema.optional(SignatureInfo),
  approveTime: Schema.optional(Schema.String),
  policyApproved: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ApproveDecision" }) as any as Schema.Schema<ApproveDecision>;

export interface AccessLocations {
  /** Physical location of the Google administrator at the time of the access. A two-letter country code (ISO 3166-1 alpha-2), such as "US", "DE" or "GB" or a region code. In some limited situations Google systems may refer refer to a region code instead of a country code. Possible Region Codes: * ASI: Asia * EUR: Europe * OCE: Oceania * AFR: Africa * NAM: North America * SAM: South America * ANT: Antarctica * ANY: Any location */
  principalPhysicalLocationCountry?: string;
  /** The "home office" location of the Google administrator. A two-letter country code (ISO 3166-1 alpha-2), such as "US", "DE" or "GB" or a region code. In some limited situations Google systems may refer refer to a region code instead of a country code. Possible Region Codes: * ASI: Asia * EUR: Europe * OCE: Oceania * AFR: Africa * NAM: North America * SAM: South America * ANT: Antarctica * ANY: Any location */
  principalOfficeCountry?: string;
}

export const AccessLocations: Schema.Schema<AccessLocations> = Schema.suspend(() => Schema.Struct({
  principalPhysicalLocationCountry: Schema.optional(Schema.String),
  principalOfficeCountry: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessLocations" }) as any as Schema.Schema<AccessLocations>;

export interface AccessReason {
  /** Type of access reason. */
  type?: "TYPE_UNSPECIFIED" | "CUSTOMER_INITIATED_SUPPORT" | "GOOGLE_INITIATED_SERVICE" | "GOOGLE_INITIATED_REVIEW" | "THIRD_PARTY_DATA_REQUEST" | "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT" | "CLOUD_INITIATED_ACCESS" | (string & {});
  /** More detail about certain reason types. See comments for each type above. */
  detail?: string;
}

export const AccessReason: Schema.Schema<AccessReason> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessReason" }) as any as Schema.Schema<AccessReason>;

export interface AugmentedInfo {
  /** For command-line tools, the full command-line exactly as entered by the actor without adding any additional characters (such as quotation marks). */
  command?: string;
}

export const AugmentedInfo: Schema.Schema<AugmentedInfo> = Schema.suspend(() => Schema.Struct({
  command: Schema.optional(Schema.String),
})).annotate({ identifier: "AugmentedInfo" }) as any as Schema.Schema<AugmentedInfo>;

export interface ApprovalRequest {
  /** The requested access duration. */
  requestedDuration?: string;
  /** Properties related to the resource represented by requested_resource_name. */
  requestedResourceProperties?: ResourceProperties;
  /** The request was dismissed. */
  dismiss?: DismissDecision;
  /** The locations for which approval is being requested. */
  requestedLocations?: AccessLocations;
  /** The time at which approval was requested. */
  requestTime?: string;
  /** The access reason for which approval is being requested. */
  requestedReason?: AccessReason;
  /** This field contains the augmented information of the request. */
  requestedAugmentedInfo?: AugmentedInfo;
  /** Access was approved. */
  approve?: ApproveDecision;
  /** The resource name of the request. Format is "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}". */
  name?: string;
  /** The resource for which approval is being requested. The format of the resource name is defined at https://cloud.google.com/apis/design/resource_names. The resource name here may either be a "full" resource name (e.g. "//library.googleapis.com/shelves/shelf1/books/book2") or a "relative" resource name (e.g. "shelves/shelf1/books/book2") as described in the resource name specification. */
  requestedResourceName?: string;
  /** The original requested expiration for the approval. Calculated by adding the requested_duration to the request_time. */
  requestedExpiration?: string;
}

export const ApprovalRequest: Schema.Schema<ApprovalRequest> = Schema.suspend(() => Schema.Struct({
  requestedDuration: Schema.optional(Schema.String),
  requestedResourceProperties: Schema.optional(ResourceProperties),
  dismiss: Schema.optional(DismissDecision),
  requestedLocations: Schema.optional(AccessLocations),
  requestTime: Schema.optional(Schema.String),
  requestedReason: Schema.optional(AccessReason),
  requestedAugmentedInfo: Schema.optional(AugmentedInfo),
  approve: Schema.optional(ApproveDecision),
  name: Schema.optional(Schema.String),
  requestedResourceName: Schema.optional(Schema.String),
  requestedExpiration: Schema.optional(Schema.String),
})).annotate({ identifier: "ApprovalRequest" }) as any as Schema.Schema<ApprovalRequest>;

export interface ListApprovalRequestsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more. */
  nextPageToken?: string;
  /** Approval request details. */
  approvalRequests?: Array<ApprovalRequest>;
}

export const ListApprovalRequestsResponse: Schema.Schema<ListApprovalRequestsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  approvalRequests: Schema.optional(Schema.Array(ApprovalRequest)),
})).annotate({ identifier: "ListApprovalRequestsResponse" }) as any as Schema.Schema<ListApprovalRequestsResponse>;

export interface InvalidateApprovalRequestMessage {
}

export const InvalidateApprovalRequestMessage: Schema.Schema<InvalidateApprovalRequestMessage> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "InvalidateApprovalRequestMessage" }) as any as Schema.Schema<InvalidateApprovalRequestMessage>;

export interface DismissApprovalRequestMessage {
}

export const DismissApprovalRequestMessage: Schema.Schema<DismissApprovalRequestMessage> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DismissApprovalRequestMessage" }) as any as Schema.Schema<DismissApprovalRequestMessage>;

export interface CustomerApprovalApprovalPolicy {
  /** Optional. Policy for approval based on the justification given. */
  justificationBasedApprovalPolicy?: "JUSTIFICATION_BASED_APPROVAL_POLICY_UNSPECIFIED" | "JUSTIFICATION_BASED_APPROVAL_ENABLED_ALL" | "JUSTIFICATION_BASED_APPROVAL_ENABLED_EXTERNAL_JUSTIFICATIONS" | "JUSTIFICATION_BASED_APPROVAL_NOT_ENABLED" | "JUSTIFICATION_BASED_APPROVAL_INHERITED" | (string & {});
}

export const CustomerApprovalApprovalPolicy: Schema.Schema<CustomerApprovalApprovalPolicy> = Schema.suspend(() => Schema.Struct({
  justificationBasedApprovalPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerApprovalApprovalPolicy" }) as any as Schema.Schema<CustomerApprovalApprovalPolicy>;

export interface AccessApprovalSettings {
  /** The asymmetric crypto key version to use for signing approval requests. Empty active_key_version indicates that a Google-managed key should be used for signing. This property will be ignored if set by an ancestor of this resource, and new non-empty values may not be set. */
  activeKeyVersion?: string;
  /** Output only. Effective policy applied for Access Approval, inclusive of inheritance. */
  effectiveApprovalPolicy?: CustomerApprovalApprovalPolicy;
  /** The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings" */
  name?: string;
  /** Output only. This field is read only (not settable via UpdateAccessApprovalSettings method). If the field is true, that indicates that an ancestor of this Project or Folder has set active_key_version (this field will always be unset for the organization since organizations do not have ancestors). */
  ancestorHasActiveKeyVersion?: boolean;
  /** Optional. When enabled, Google will only be able to send approval requests for access reasons with a customer accessible case ID in the reason detail. Also known as "Require customer initiated support case justification" */
  requireCustomerVisibleJustification?: boolean;
  /** Optional. A pubsub topic that notifications relating to access approval are published to. Notifications include pre-approved accesses. */
  notificationPubsubTopic?: string;
  /** Output only. This field is read only (not settable via UpdateAccessApprovalSettings method). If the field is true, that indicates that at least one service is enrolled for Access Approval in one or more ancestors of the Project or Folder (this field will always be unset for the organization since organizations do not have ancestors). */
  enrolledAncestor?: boolean;
  /** Output only. Field to differentiate ancestor enrolled services from locally enrolled services. */
  ancestorsEnrolledServices?: Array<EnrolledService>;
  /** Set the default access approval request expiration time. This value is able to be set directly by the customer at the time of approval, overriding this suggested value. We recommend setting this value to 30 days. */
  preferredRequestExpirationDays?: number;
  /** A list of Google Cloud Services for which the given resource has Access Approval enrolled. Access requests for the resource given by name against any of these services contained here will be required to have explicit approval. If name refers to an organization, enrollment can be done for individual services. If name refers to a folder or project, enrollment can only be done on an all or nothing basis. If a cloud_product is repeated in this list, the first entry will be honored and all following entries will be discarded. */
  enrolledServices?: Array<EnrolledService>;
  /** This field is used to set a preference for granularity of an access approval request. If true, Google personnel will be asked to send resource-level requests when possible. If false, Google personnel will be asked to send requests at the project level. */
  preferNoBroadApprovalRequests?: boolean;
  /** Optional. A setting that indicates the maximum scope of an Access Approval request: either organization, folder, or project. Google administrators will be asked to send requests no broader than the configured scope. */
  requestScopeMaxWidthPreference?: "REQUEST_SCOPE_MAX_WIDTH_PREFERENCE_UNSPECIFIED" | "ORGANIZATION" | "FOLDER" | "PROJECT" | (string & {});
  /** A list of email addresses to which notifications relating to approval requests should be sent. Notifications relating to a resource will be sent to all emails in the settings of ancestor resources of that resource. A maximum of 50 email addresses are allowed. */
  notificationEmails?: Array<string>;
  /** Output only. This field is read only (not settable via UpdateAccessApprovalSettings method). If the field is true, that indicates that there is some configuration issue with the active_key_version configured at this level in the resource hierarchy (e.g. it doesn't exist or the Access Approval service account doesn't have the correct permissions on it, etc.) This key version is not necessarily the effective key version at this level, as key versions are inherited top-down. */
  invalidKeyVersion?: boolean;
  /** Optional. Policy configuration for Access Approval that sets the operating mode. The available policies are Transparency, Streamlined Support, and Approval Required. */
  approvalPolicy?: CustomerApprovalApprovalPolicy;
}

export const AccessApprovalSettings: Schema.Schema<AccessApprovalSettings> = Schema.suspend(() => Schema.Struct({
  activeKeyVersion: Schema.optional(Schema.String),
  effectiveApprovalPolicy: Schema.optional(CustomerApprovalApprovalPolicy),
  name: Schema.optional(Schema.String),
  ancestorHasActiveKeyVersion: Schema.optional(Schema.Boolean),
  requireCustomerVisibleJustification: Schema.optional(Schema.Boolean),
  notificationPubsubTopic: Schema.optional(Schema.String),
  enrolledAncestor: Schema.optional(Schema.Boolean),
  ancestorsEnrolledServices: Schema.optional(Schema.Array(EnrolledService)),
  preferredRequestExpirationDays: Schema.optional(Schema.Number),
  enrolledServices: Schema.optional(Schema.Array(EnrolledService)),
  preferNoBroadApprovalRequests: Schema.optional(Schema.Boolean),
  requestScopeMaxWidthPreference: Schema.optional(Schema.String),
  notificationEmails: Schema.optional(Schema.Array(Schema.String)),
  invalidKeyVersion: Schema.optional(Schema.Boolean),
  approvalPolicy: Schema.optional(CustomerApprovalApprovalPolicy),
})).annotate({ identifier: "AccessApprovalSettings" }) as any as Schema.Schema<AccessApprovalSettings>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ApproveApprovalRequestMessage {
  /** The expiration time of this approval. */
  expireTime?: string;
}

export const ApproveApprovalRequestMessage: Schema.Schema<ApproveApprovalRequestMessage> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ApproveApprovalRequestMessage" }) as any as Schema.Schema<ApproveApprovalRequestMessage>;

// ==========================================================================
// Operations
// ==========================================================================

/** Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask. */
export interface UpdateAccessApprovalSettingsOrganizationsRequest {
  /** The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings" */
  name: string;
  /** The update mask applies to the settings. Only the top level fields of AccessApprovalSettings (notification_emails & enrolled_services) are supported. For each field, if it is included, the currently stored value will be entirely overwritten with the value of the field passed in this request. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If this field is left unset, only the notification_emails field will be updated. */
  updateMask?: string;
  /** Request body */
  body?: AccessApprovalSettings;
}

export const UpdateAccessApprovalSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AccessApprovalSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/accessApprovalSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccessApprovalSettingsOrganizationsRequest>;

export type UpdateAccessApprovalSettingsOrganizationsResponse = AccessApprovalSettings;
export const UpdateAccessApprovalSettingsOrganizationsResponse = AccessApprovalSettings;

export type UpdateAccessApprovalSettingsOrganizationsError = CommonErrors;

export const updateAccessApprovalSettingsOrganizations: API.OperationMethod<UpdateAccessApprovalSettingsOrganizationsRequest, UpdateAccessApprovalSettingsOrganizationsResponse, UpdateAccessApprovalSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccessApprovalSettingsOrganizationsRequest,
  output: UpdateAccessApprovalSettingsOrganizationsResponse,
  errors: [],
}));

/** Gets the Access Approval settings associated with a project, folder, or organization. */
export interface GetAccessApprovalSettingsOrganizationsRequest {
  /** The name of the AccessApprovalSettings to retrieve. Format: "{projects|folders|organizations}/{id}/accessApprovalSettings" */
  name: string;
}

export const GetAccessApprovalSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/accessApprovalSettings" }),
  svc,
) as unknown as Schema.Schema<GetAccessApprovalSettingsOrganizationsRequest>;

export type GetAccessApprovalSettingsOrganizationsResponse = AccessApprovalSettings;
export const GetAccessApprovalSettingsOrganizationsResponse = AccessApprovalSettings;

export type GetAccessApprovalSettingsOrganizationsError = CommonErrors;

export const getAccessApprovalSettingsOrganizations: API.OperationMethod<GetAccessApprovalSettingsOrganizationsRequest, GetAccessApprovalSettingsOrganizationsResponse, GetAccessApprovalSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessApprovalSettingsOrganizationsRequest,
  output: GetAccessApprovalSettingsOrganizationsResponse,
  errors: [],
}));

/** Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the resource. Access Approval may remain active based on parent resource settings. To confirm the effective settings, call GetAccessApprovalSettings and verify effective setting is disabled. */
export interface DeleteAccessApprovalSettingsOrganizationsRequest {
  /** Name of the AccessApprovalSettings to delete. */
  name: string;
}

export const DeleteAccessApprovalSettingsOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/accessApprovalSettings" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessApprovalSettingsOrganizationsRequest>;

export type DeleteAccessApprovalSettingsOrganizationsResponse = Empty;
export const DeleteAccessApprovalSettingsOrganizationsResponse = Empty;

export type DeleteAccessApprovalSettingsOrganizationsError = CommonErrors;

export const deleteAccessApprovalSettingsOrganizations: API.OperationMethod<DeleteAccessApprovalSettingsOrganizationsRequest, DeleteAccessApprovalSettingsOrganizationsResponse, DeleteAccessApprovalSettingsOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessApprovalSettingsOrganizationsRequest,
  output: DeleteAccessApprovalSettingsOrganizationsResponse,
  errors: [],
}));

/** Retrieves the service account that is used by Access Approval to access KMS keys for signing approved approval requests. */
export interface GetServiceAccountOrganizationsRequest {
  /** Name of the AccessApprovalServiceAccount to retrieve. */
  name: string;
}

export const GetServiceAccountOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/serviceAccount" }),
  svc,
) as unknown as Schema.Schema<GetServiceAccountOrganizationsRequest>;

export type GetServiceAccountOrganizationsResponse = AccessApprovalServiceAccount;
export const GetServiceAccountOrganizationsResponse = AccessApprovalServiceAccount;

export type GetServiceAccountOrganizationsError = CommonErrors;

export const getServiceAccountOrganizations: API.OperationMethod<GetServiceAccountOrganizationsRequest, GetServiceAccountOrganizationsResponse, GetServiceAccountOrganizationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServiceAccountOrganizationsRequest,
  output: GetServiceAccountOrganizationsResponse,
  errors: [],
}));

/** Invalidates an existing ApprovalRequest. Returns the updated ApprovalRequest. NOTE: This action revokes Google access based on this approval request. If the resource has other active approvals, access will remain granted. Returns FAILED_PRECONDITION if the request exists but is not in an approved state. */
export interface InvalidateOrganizationsApprovalRequestsRequest {
  /** Name of the ApprovalRequest to invalidate. */
  name: string;
  /** Request body */
  body?: InvalidateApprovalRequestMessage;
}

export const InvalidateOrganizationsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(InvalidateApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/approvalRequests/{approvalRequestsId}:invalidate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InvalidateOrganizationsApprovalRequestsRequest>;

export type InvalidateOrganizationsApprovalRequestsResponse = ApprovalRequest;
export const InvalidateOrganizationsApprovalRequestsResponse = ApprovalRequest;

export type InvalidateOrganizationsApprovalRequestsError = CommonErrors;

export const invalidateOrganizationsApprovalRequests: API.OperationMethod<InvalidateOrganizationsApprovalRequestsRequest, InvalidateOrganizationsApprovalRequestsResponse, InvalidateOrganizationsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InvalidateOrganizationsApprovalRequestsRequest,
  output: InvalidateOrganizationsApprovalRequestsResponse,
  errors: [],
}));

/** Dismisses a request. Returns the updated ApprovalRequest. NOTE: When a request is dismissed, it is considered ignored. Dismissing a request does not prevent access granted by other Access Approval requests. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state. */
export interface DismissOrganizationsApprovalRequestsRequest {
  /** Name of the ApprovalRequest to dismiss. */
  name: string;
  /** Request body */
  body?: DismissApprovalRequestMessage;
}

export const DismissOrganizationsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DismissApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/approvalRequests/{approvalRequestsId}:dismiss", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DismissOrganizationsApprovalRequestsRequest>;

export type DismissOrganizationsApprovalRequestsResponse = ApprovalRequest;
export const DismissOrganizationsApprovalRequestsResponse = ApprovalRequest;

export type DismissOrganizationsApprovalRequestsError = CommonErrors;

export const dismissOrganizationsApprovalRequests: API.OperationMethod<DismissOrganizationsApprovalRequestsRequest, DismissOrganizationsApprovalRequestsResponse, DismissOrganizationsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DismissOrganizationsApprovalRequestsRequest,
  output: DismissOrganizationsApprovalRequestsResponse,
  errors: [],
}));

/** Lists approval requests associated with a project, folder, or organization. Approval requests can be filtered by state (pending, active, dismissed). The order is reverse chronological. */
export interface ListOrganizationsApprovalRequestsRequest {
  /** Requested page size. */
  pageSize?: number;
  /** A filter on the type of approval requests to retrieve. Must be one of the following values: * [not set]: Requests that are pending or have active approvals. * ALL: All requests. * PENDING: Only pending requests. * ACTIVE: Only active (i.e. currently approved) requests. * DISMISSED: Only requests that have been dismissed, or requests that are not approved and past expiration. * EXPIRED: Only requests that have been approved, and the approval has expired. * HISTORY: Active, dismissed and expired requests. */
  filter?: string;
  /** A token identifying the page of results to return. */
  pageToken?: string;
  /** The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}". */
  parent: string;
}

export const ListOrganizationsApprovalRequestsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/approvalRequests" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsApprovalRequestsRequest>;

export type ListOrganizationsApprovalRequestsResponse = ListApprovalRequestsResponse;
export const ListOrganizationsApprovalRequestsResponse = ListApprovalRequestsResponse;

export type ListOrganizationsApprovalRequestsError = CommonErrors;

export const listOrganizationsApprovalRequests = API.makePaginated(() => ({
  input: ListOrganizationsApprovalRequestsRequest,
  output: ListOrganizationsApprovalRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Approves a request and returns the updated ApprovalRequest. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state. */
export interface ApproveOrganizationsApprovalRequestsRequest {
  /** Name of the approval request to approve. */
  name: string;
  /** Request body */
  body?: ApproveApprovalRequestMessage;
}

export const ApproveOrganizationsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/approvalRequests/{approvalRequestsId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveOrganizationsApprovalRequestsRequest>;

export type ApproveOrganizationsApprovalRequestsResponse = ApprovalRequest;
export const ApproveOrganizationsApprovalRequestsResponse = ApprovalRequest;

export type ApproveOrganizationsApprovalRequestsError = CommonErrors;

export const approveOrganizationsApprovalRequests: API.OperationMethod<ApproveOrganizationsApprovalRequestsRequest, ApproveOrganizationsApprovalRequestsResponse, ApproveOrganizationsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveOrganizationsApprovalRequestsRequest,
  output: ApproveOrganizationsApprovalRequestsResponse,
  errors: [],
}));

/** Gets an approval request. Returns NOT_FOUND if the request does not exist. */
export interface GetOrganizationsApprovalRequestsRequest {
  /** The name of the approval request to retrieve. Format: "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}" */
  name: string;
}

export const GetOrganizationsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/approvalRequests/{approvalRequestsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsApprovalRequestsRequest>;

export type GetOrganizationsApprovalRequestsResponse = ApprovalRequest;
export const GetOrganizationsApprovalRequestsResponse = ApprovalRequest;

export type GetOrganizationsApprovalRequestsError = CommonErrors;

export const getOrganizationsApprovalRequests: API.OperationMethod<GetOrganizationsApprovalRequestsRequest, GetOrganizationsApprovalRequestsResponse, GetOrganizationsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsApprovalRequestsRequest,
  output: GetOrganizationsApprovalRequestsResponse,
  errors: [],
}));

/** Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask. */
export interface UpdateAccessApprovalSettingsProjectsRequest {
  /** The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings" */
  name: string;
  /** The update mask applies to the settings. Only the top level fields of AccessApprovalSettings (notification_emails & enrolled_services) are supported. For each field, if it is included, the currently stored value will be entirely overwritten with the value of the field passed in this request. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If this field is left unset, only the notification_emails field will be updated. */
  updateMask?: string;
  /** Request body */
  body?: AccessApprovalSettings;
}

export const UpdateAccessApprovalSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AccessApprovalSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/accessApprovalSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccessApprovalSettingsProjectsRequest>;

export type UpdateAccessApprovalSettingsProjectsResponse = AccessApprovalSettings;
export const UpdateAccessApprovalSettingsProjectsResponse = AccessApprovalSettings;

export type UpdateAccessApprovalSettingsProjectsError = CommonErrors;

export const updateAccessApprovalSettingsProjects: API.OperationMethod<UpdateAccessApprovalSettingsProjectsRequest, UpdateAccessApprovalSettingsProjectsResponse, UpdateAccessApprovalSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccessApprovalSettingsProjectsRequest,
  output: UpdateAccessApprovalSettingsProjectsResponse,
  errors: [],
}));

/** Retrieves the service account that is used by Access Approval to access KMS keys for signing approved approval requests. */
export interface GetServiceAccountProjectsRequest {
  /** Name of the AccessApprovalServiceAccount to retrieve. */
  name: string;
}

export const GetServiceAccountProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/serviceAccount" }),
  svc,
) as unknown as Schema.Schema<GetServiceAccountProjectsRequest>;

export type GetServiceAccountProjectsResponse = AccessApprovalServiceAccount;
export const GetServiceAccountProjectsResponse = AccessApprovalServiceAccount;

export type GetServiceAccountProjectsError = CommonErrors;

export const getServiceAccountProjects: API.OperationMethod<GetServiceAccountProjectsRequest, GetServiceAccountProjectsResponse, GetServiceAccountProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServiceAccountProjectsRequest,
  output: GetServiceAccountProjectsResponse,
  errors: [],
}));

/** Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the resource. Access Approval may remain active based on parent resource settings. To confirm the effective settings, call GetAccessApprovalSettings and verify effective setting is disabled. */
export interface DeleteAccessApprovalSettingsProjectsRequest {
  /** Name of the AccessApprovalSettings to delete. */
  name: string;
}

export const DeleteAccessApprovalSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/accessApprovalSettings" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessApprovalSettingsProjectsRequest>;

export type DeleteAccessApprovalSettingsProjectsResponse = Empty;
export const DeleteAccessApprovalSettingsProjectsResponse = Empty;

export type DeleteAccessApprovalSettingsProjectsError = CommonErrors;

export const deleteAccessApprovalSettingsProjects: API.OperationMethod<DeleteAccessApprovalSettingsProjectsRequest, DeleteAccessApprovalSettingsProjectsResponse, DeleteAccessApprovalSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessApprovalSettingsProjectsRequest,
  output: DeleteAccessApprovalSettingsProjectsResponse,
  errors: [],
}));

/** Gets the Access Approval settings associated with a project, folder, or organization. */
export interface GetAccessApprovalSettingsProjectsRequest {
  /** The name of the AccessApprovalSettings to retrieve. Format: "{projects|folders|organizations}/{id}/accessApprovalSettings" */
  name: string;
}

export const GetAccessApprovalSettingsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/accessApprovalSettings" }),
  svc,
) as unknown as Schema.Schema<GetAccessApprovalSettingsProjectsRequest>;

export type GetAccessApprovalSettingsProjectsResponse = AccessApprovalSettings;
export const GetAccessApprovalSettingsProjectsResponse = AccessApprovalSettings;

export type GetAccessApprovalSettingsProjectsError = CommonErrors;

export const getAccessApprovalSettingsProjects: API.OperationMethod<GetAccessApprovalSettingsProjectsRequest, GetAccessApprovalSettingsProjectsResponse, GetAccessApprovalSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessApprovalSettingsProjectsRequest,
  output: GetAccessApprovalSettingsProjectsResponse,
  errors: [],
}));

/** Dismisses a request. Returns the updated ApprovalRequest. NOTE: When a request is dismissed, it is considered ignored. Dismissing a request does not prevent access granted by other Access Approval requests. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state. */
export interface DismissProjectsApprovalRequestsRequest {
  /** Name of the ApprovalRequest to dismiss. */
  name: string;
  /** Request body */
  body?: DismissApprovalRequestMessage;
}

export const DismissProjectsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DismissApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/approvalRequests/{approvalRequestsId}:dismiss", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DismissProjectsApprovalRequestsRequest>;

export type DismissProjectsApprovalRequestsResponse = ApprovalRequest;
export const DismissProjectsApprovalRequestsResponse = ApprovalRequest;

export type DismissProjectsApprovalRequestsError = CommonErrors;

export const dismissProjectsApprovalRequests: API.OperationMethod<DismissProjectsApprovalRequestsRequest, DismissProjectsApprovalRequestsResponse, DismissProjectsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DismissProjectsApprovalRequestsRequest,
  output: DismissProjectsApprovalRequestsResponse,
  errors: [],
}));

/** Gets an approval request. Returns NOT_FOUND if the request does not exist. */
export interface GetProjectsApprovalRequestsRequest {
  /** The name of the approval request to retrieve. Format: "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}" */
  name: string;
}

export const GetProjectsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/approvalRequests/{approvalRequestsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsApprovalRequestsRequest>;

export type GetProjectsApprovalRequestsResponse = ApprovalRequest;
export const GetProjectsApprovalRequestsResponse = ApprovalRequest;

export type GetProjectsApprovalRequestsError = CommonErrors;

export const getProjectsApprovalRequests: API.OperationMethod<GetProjectsApprovalRequestsRequest, GetProjectsApprovalRequestsResponse, GetProjectsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsApprovalRequestsRequest,
  output: GetProjectsApprovalRequestsResponse,
  errors: [],
}));

/** Invalidates an existing ApprovalRequest. Returns the updated ApprovalRequest. NOTE: This action revokes Google access based on this approval request. If the resource has other active approvals, access will remain granted. Returns FAILED_PRECONDITION if the request exists but is not in an approved state. */
export interface InvalidateProjectsApprovalRequestsRequest {
  /** Name of the ApprovalRequest to invalidate. */
  name: string;
  /** Request body */
  body?: InvalidateApprovalRequestMessage;
}

export const InvalidateProjectsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(InvalidateApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/approvalRequests/{approvalRequestsId}:invalidate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InvalidateProjectsApprovalRequestsRequest>;

export type InvalidateProjectsApprovalRequestsResponse = ApprovalRequest;
export const InvalidateProjectsApprovalRequestsResponse = ApprovalRequest;

export type InvalidateProjectsApprovalRequestsError = CommonErrors;

export const invalidateProjectsApprovalRequests: API.OperationMethod<InvalidateProjectsApprovalRequestsRequest, InvalidateProjectsApprovalRequestsResponse, InvalidateProjectsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InvalidateProjectsApprovalRequestsRequest,
  output: InvalidateProjectsApprovalRequestsResponse,
  errors: [],
}));

/** Approves a request and returns the updated ApprovalRequest. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state. */
export interface ApproveProjectsApprovalRequestsRequest {
  /** Name of the approval request to approve. */
  name: string;
  /** Request body */
  body?: ApproveApprovalRequestMessage;
}

export const ApproveProjectsApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/approvalRequests/{approvalRequestsId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveProjectsApprovalRequestsRequest>;

export type ApproveProjectsApprovalRequestsResponse = ApprovalRequest;
export const ApproveProjectsApprovalRequestsResponse = ApprovalRequest;

export type ApproveProjectsApprovalRequestsError = CommonErrors;

export const approveProjectsApprovalRequests: API.OperationMethod<ApproveProjectsApprovalRequestsRequest, ApproveProjectsApprovalRequestsResponse, ApproveProjectsApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveProjectsApprovalRequestsRequest,
  output: ApproveProjectsApprovalRequestsResponse,
  errors: [],
}));

/** Lists approval requests associated with a project, folder, or organization. Approval requests can be filtered by state (pending, active, dismissed). The order is reverse chronological. */
export interface ListProjectsApprovalRequestsRequest {
  /** The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}". */
  parent: string;
  /** Requested page size. */
  pageSize?: number;
  /** A filter on the type of approval requests to retrieve. Must be one of the following values: * [not set]: Requests that are pending or have active approvals. * ALL: All requests. * PENDING: Only pending requests. * ACTIVE: Only active (i.e. currently approved) requests. * DISMISSED: Only requests that have been dismissed, or requests that are not approved and past expiration. * EXPIRED: Only requests that have been approved, and the approval has expired. * HISTORY: Active, dismissed and expired requests. */
  filter?: string;
  /** A token identifying the page of results to return. */
  pageToken?: string;
}

export const ListProjectsApprovalRequestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/approvalRequests" }),
  svc,
) as unknown as Schema.Schema<ListProjectsApprovalRequestsRequest>;

export type ListProjectsApprovalRequestsResponse = ListApprovalRequestsResponse;
export const ListProjectsApprovalRequestsResponse = ListApprovalRequestsResponse;

export type ListProjectsApprovalRequestsError = CommonErrors;

export const listProjectsApprovalRequests = API.makePaginated(() => ({
  input: ListProjectsApprovalRequestsRequest,
  output: ListProjectsApprovalRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the resource. Access Approval may remain active based on parent resource settings. To confirm the effective settings, call GetAccessApprovalSettings and verify effective setting is disabled. */
export interface DeleteAccessApprovalSettingsFoldersRequest {
  /** Name of the AccessApprovalSettings to delete. */
  name: string;
}

export const DeleteAccessApprovalSettingsFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/folders/{foldersId}/accessApprovalSettings" }),
  svc,
) as unknown as Schema.Schema<DeleteAccessApprovalSettingsFoldersRequest>;

export type DeleteAccessApprovalSettingsFoldersResponse = Empty;
export const DeleteAccessApprovalSettingsFoldersResponse = Empty;

export type DeleteAccessApprovalSettingsFoldersError = CommonErrors;

export const deleteAccessApprovalSettingsFolders: API.OperationMethod<DeleteAccessApprovalSettingsFoldersRequest, DeleteAccessApprovalSettingsFoldersResponse, DeleteAccessApprovalSettingsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccessApprovalSettingsFoldersRequest,
  output: DeleteAccessApprovalSettingsFoldersResponse,
  errors: [],
}));

/** Gets the Access Approval settings associated with a project, folder, or organization. */
export interface GetAccessApprovalSettingsFoldersRequest {
  /** The name of the AccessApprovalSettings to retrieve. Format: "{projects|folders|organizations}/{id}/accessApprovalSettings" */
  name: string;
}

export const GetAccessApprovalSettingsFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/accessApprovalSettings" }),
  svc,
) as unknown as Schema.Schema<GetAccessApprovalSettingsFoldersRequest>;

export type GetAccessApprovalSettingsFoldersResponse = AccessApprovalSettings;
export const GetAccessApprovalSettingsFoldersResponse = AccessApprovalSettings;

export type GetAccessApprovalSettingsFoldersError = CommonErrors;

export const getAccessApprovalSettingsFolders: API.OperationMethod<GetAccessApprovalSettingsFoldersRequest, GetAccessApprovalSettingsFoldersResponse, GetAccessApprovalSettingsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccessApprovalSettingsFoldersRequest,
  output: GetAccessApprovalSettingsFoldersResponse,
  errors: [],
}));

/** Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask. */
export interface UpdateAccessApprovalSettingsFoldersRequest {
  /** The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings" */
  name: string;
  /** The update mask applies to the settings. Only the top level fields of AccessApprovalSettings (notification_emails & enrolled_services) are supported. For each field, if it is included, the currently stored value will be entirely overwritten with the value of the field passed in this request. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If this field is left unset, only the notification_emails field will be updated. */
  updateMask?: string;
  /** Request body */
  body?: AccessApprovalSettings;
}

export const UpdateAccessApprovalSettingsFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AccessApprovalSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/folders/{foldersId}/accessApprovalSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccessApprovalSettingsFoldersRequest>;

export type UpdateAccessApprovalSettingsFoldersResponse = AccessApprovalSettings;
export const UpdateAccessApprovalSettingsFoldersResponse = AccessApprovalSettings;

export type UpdateAccessApprovalSettingsFoldersError = CommonErrors;

export const updateAccessApprovalSettingsFolders: API.OperationMethod<UpdateAccessApprovalSettingsFoldersRequest, UpdateAccessApprovalSettingsFoldersResponse, UpdateAccessApprovalSettingsFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccessApprovalSettingsFoldersRequest,
  output: UpdateAccessApprovalSettingsFoldersResponse,
  errors: [],
}));

/** Retrieves the service account that is used by Access Approval to access KMS keys for signing approved approval requests. */
export interface GetServiceAccountFoldersRequest {
  /** Name of the AccessApprovalServiceAccount to retrieve. */
  name: string;
}

export const GetServiceAccountFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/serviceAccount" }),
  svc,
) as unknown as Schema.Schema<GetServiceAccountFoldersRequest>;

export type GetServiceAccountFoldersResponse = AccessApprovalServiceAccount;
export const GetServiceAccountFoldersResponse = AccessApprovalServiceAccount;

export type GetServiceAccountFoldersError = CommonErrors;

export const getServiceAccountFolders: API.OperationMethod<GetServiceAccountFoldersRequest, GetServiceAccountFoldersResponse, GetServiceAccountFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServiceAccountFoldersRequest,
  output: GetServiceAccountFoldersResponse,
  errors: [],
}));

/** Approves a request and returns the updated ApprovalRequest. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state. */
export interface ApproveFoldersApprovalRequestsRequest {
  /** Name of the approval request to approve. */
  name: string;
  /** Request body */
  body?: ApproveApprovalRequestMessage;
}

export const ApproveFoldersApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/approvalRequests/{approvalRequestsId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveFoldersApprovalRequestsRequest>;

export type ApproveFoldersApprovalRequestsResponse = ApprovalRequest;
export const ApproveFoldersApprovalRequestsResponse = ApprovalRequest;

export type ApproveFoldersApprovalRequestsError = CommonErrors;

export const approveFoldersApprovalRequests: API.OperationMethod<ApproveFoldersApprovalRequestsRequest, ApproveFoldersApprovalRequestsResponse, ApproveFoldersApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveFoldersApprovalRequestsRequest,
  output: ApproveFoldersApprovalRequestsResponse,
  errors: [],
}));

/** Gets an approval request. Returns NOT_FOUND if the request does not exist. */
export interface GetFoldersApprovalRequestsRequest {
  /** The name of the approval request to retrieve. Format: "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}" */
  name: string;
}

export const GetFoldersApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/approvalRequests/{approvalRequestsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersApprovalRequestsRequest>;

export type GetFoldersApprovalRequestsResponse = ApprovalRequest;
export const GetFoldersApprovalRequestsResponse = ApprovalRequest;

export type GetFoldersApprovalRequestsError = CommonErrors;

export const getFoldersApprovalRequests: API.OperationMethod<GetFoldersApprovalRequestsRequest, GetFoldersApprovalRequestsResponse, GetFoldersApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersApprovalRequestsRequest,
  output: GetFoldersApprovalRequestsResponse,
  errors: [],
}));

/** Invalidates an existing ApprovalRequest. Returns the updated ApprovalRequest. NOTE: This action revokes Google access based on this approval request. If the resource has other active approvals, access will remain granted. Returns FAILED_PRECONDITION if the request exists but is not in an approved state. */
export interface InvalidateFoldersApprovalRequestsRequest {
  /** Name of the ApprovalRequest to invalidate. */
  name: string;
  /** Request body */
  body?: InvalidateApprovalRequestMessage;
}

export const InvalidateFoldersApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(InvalidateApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/approvalRequests/{approvalRequestsId}:invalidate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InvalidateFoldersApprovalRequestsRequest>;

export type InvalidateFoldersApprovalRequestsResponse = ApprovalRequest;
export const InvalidateFoldersApprovalRequestsResponse = ApprovalRequest;

export type InvalidateFoldersApprovalRequestsError = CommonErrors;

export const invalidateFoldersApprovalRequests: API.OperationMethod<InvalidateFoldersApprovalRequestsRequest, InvalidateFoldersApprovalRequestsResponse, InvalidateFoldersApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InvalidateFoldersApprovalRequestsRequest,
  output: InvalidateFoldersApprovalRequestsResponse,
  errors: [],
}));

/** Dismisses a request. Returns the updated ApprovalRequest. NOTE: When a request is dismissed, it is considered ignored. Dismissing a request does not prevent access granted by other Access Approval requests. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state. */
export interface DismissFoldersApprovalRequestsRequest {
  /** Name of the ApprovalRequest to dismiss. */
  name: string;
  /** Request body */
  body?: DismissApprovalRequestMessage;
}

export const DismissFoldersApprovalRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DismissApprovalRequestMessage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/approvalRequests/{approvalRequestsId}:dismiss", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DismissFoldersApprovalRequestsRequest>;

export type DismissFoldersApprovalRequestsResponse = ApprovalRequest;
export const DismissFoldersApprovalRequestsResponse = ApprovalRequest;

export type DismissFoldersApprovalRequestsError = CommonErrors;

export const dismissFoldersApprovalRequests: API.OperationMethod<DismissFoldersApprovalRequestsRequest, DismissFoldersApprovalRequestsResponse, DismissFoldersApprovalRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DismissFoldersApprovalRequestsRequest,
  output: DismissFoldersApprovalRequestsResponse,
  errors: [],
}));

/** Lists approval requests associated with a project, folder, or organization. Approval requests can be filtered by state (pending, active, dismissed). The order is reverse chronological. */
export interface ListFoldersApprovalRequestsRequest {
  /** Requested page size. */
  pageSize?: number;
  /** The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}". */
  parent: string;
  /** A filter on the type of approval requests to retrieve. Must be one of the following values: * [not set]: Requests that are pending or have active approvals. * ALL: All requests. * PENDING: Only pending requests. * ACTIVE: Only active (i.e. currently approved) requests. * DISMISSED: Only requests that have been dismissed, or requests that are not approved and past expiration. * EXPIRED: Only requests that have been approved, and the approval has expired. * HISTORY: Active, dismissed and expired requests. */
  filter?: string;
  /** A token identifying the page of results to return. */
  pageToken?: string;
}

export const ListFoldersApprovalRequestsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/approvalRequests" }),
  svc,
) as unknown as Schema.Schema<ListFoldersApprovalRequestsRequest>;

export type ListFoldersApprovalRequestsResponse = ListApprovalRequestsResponse;
export const ListFoldersApprovalRequestsResponse = ListApprovalRequestsResponse;

export type ListFoldersApprovalRequestsError = CommonErrors;

export const listFoldersApprovalRequests = API.makePaginated(() => ({
  input: ListFoldersApprovalRequestsRequest,
  output: ListFoldersApprovalRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

