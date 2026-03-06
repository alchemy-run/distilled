// ==========================================================================
// Application Integration API (integrations v1)
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
  name: "integrations",
  version: "v1",
  rootUrl: "https://integrations.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest {
  /** The id of the Apps Script project to be linked. */
  scriptId?: string;
}

export const GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest> = Schema.suspend(() => Schema.Struct({
  scriptId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest>;

export interface GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse {
  /** The id of the linked Apps Script project. */
  scriptId?: string;
}

export const GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse> = Schema.suspend(() => Schema.Struct({
  scriptId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse>;

export interface GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest {
  /** The name of the Apps Script project to be created. */
  appsScriptProject?: string;
  /** The auth config id necessary to fetch the necessary credentials to create the project for external clients */
  authConfigId?: string;
}

export const GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest> = Schema.suspend(() => Schema.Struct({
  appsScriptProject: Schema.optional(Schema.String),
  authConfigId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest>;

export interface GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse {
  /** The created AppsScriptProject ID. */
  projectId?: string;
}

export const GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse>;

export interface GoogleCloudIntegrationsV1alphaCloudKmsConfig {
  /** Required. Location name of the key ring, e.g. "us-west1". */
  kmsLocation?: string;
  /** Required. A key ring organizes keys in a specific Google Cloud location and allows you to manage access control on groups of keys. A key ring's name does not need to be unique across a Google Cloud project, but must be unique within a given location. */
  kmsRing?: string;
  /** Required. A Cloud KMS key is a named object containing one or more key versions, along with metadata for the key. A key exists on exactly one key ring tied to a specific location. */
  key?: string;
  /** Optional. Each version of a key contains key material used for encryption or signing. A key's version is represented by an integer, starting at 1. To decrypt data or verify a signature, you must use the same key version that was used to encrypt or sign the data. */
  keyVersion?: string;
  /** Optional. The gcp project id of the project where the kms key stored. If empty, the kms key is stored at the same project as customer's project and ecrypted with CMEK, otherwise, the kms key is stored in the tenant project and encrypted with GMEK */
  kmsProjectId?: string;
}

export const GoogleCloudIntegrationsV1alphaCloudKmsConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaCloudKmsConfig> = Schema.suspend(() => Schema.Struct({
  kmsLocation: Schema.optional(Schema.String),
  kmsRing: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  keyVersion: Schema.optional(Schema.String),
  kmsProjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCloudKmsConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCloudKmsConfig>;

export interface GoogleCloudIntegrationsV1alphaProvisionClientRequest {
  /** Optional. OPTIONAL: Cloud KMS config for AuthModule to encrypt/decrypt credentials. */
  cloudKmsConfig?: GoogleCloudIntegrationsV1alphaCloudKmsConfig;
  /** Optional. Indicates if sample workflow should be created along with provisioning */
  createSampleWorkflows?: boolean;
  /** Optional. Deprecated. Indicates provision with GMEK or CMEK. This field is deprecated and the provision would always be GMEK if cloud_kms_config is not present in the request. */
  provisionGmek?: boolean;
  /** Optional. User input run-as service account, if empty, will bring up a new default service account */
  runAsServiceAccount?: string;
  /** Optional. Indicates if skip CP provision or not */
  skipCpProvision?: boolean;
  /** Optional. Indicates if the client should be allowed to make HTTP calls. */
  enableHttpCall?: boolean;
  /** Optional. Indicates if the client should be allowed to use managed AI features, i.e. using Cloud Companion APIs of the tenant project. This will allow the customers to use features like Troubleshooting, OpenAPI spec enrichment, etc. for free. */
  enableManagedAiFeatures?: boolean;
}

export const GoogleCloudIntegrationsV1alphaProvisionClientRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaProvisionClientRequest> = Schema.suspend(() => Schema.Struct({
  cloudKmsConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCloudKmsConfig),
  createSampleWorkflows: Schema.optional(Schema.Boolean),
  provisionGmek: Schema.optional(Schema.Boolean),
  runAsServiceAccount: Schema.optional(Schema.String),
  skipCpProvision: Schema.optional(Schema.Boolean),
  enableHttpCall: Schema.optional(Schema.Boolean),
  enableManagedAiFeatures: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaProvisionClientRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaProvisionClientRequest>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest {
  /** Optional. Indicate which workflows to create */
  workflows?: Array<"SAMPLE_INTEGRATIONS_UNSPECIFIED" | "SAMPLE_WORKFLOW_ECOM_PROCESSING" | "EXECUTE_CONNECTOR_TOOL_WORKFLOW" | (string & {})>;
}

export const GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest> = Schema.suspend(() => Schema.Struct({
  workflows: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest>;

export interface GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse {
}

export const GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse>;

export interface GoogleCloudIntegrationsV1alphaDeprovisionClientRequest {
}

export const GoogleCloudIntegrationsV1alphaDeprovisionClientRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaDeprovisionClientRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDeprovisionClientRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDeprovisionClientRequest>;

export interface GoogleCloudIntegrationsV1alphaCustomerConfig {
  /** Optional. Indicates if the client should be allowed to use managed AI features, i.e. using Cloud Companion APIs of the tenant project. This will allow the customers to use features like Troubleshooting, OpenAPI spec enrichment, etc. for free. */
  enableManagedAiFeatures?: boolean;
  /** Optional. Run-as service account to be updated for the provisioned client. */
  runAsServiceAccount?: string;
  /** Optional. True if variable masking feature should be turned on for this region. */
  enableVariableMasking?: boolean;
  /** Optional. Indicates if the client should be allowed to make HTTP calls. True if http call feature should be turned on for this region. */
  enableHttpCall?: boolean;
  /** Optional. Cloud KMS config for Auth Module to encrypt/decrypt credentials. */
  cloudKmsConfig?: GoogleCloudIntegrationsV1alphaCloudKmsConfig;
}

export const GoogleCloudIntegrationsV1alphaCustomerConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaCustomerConfig> = Schema.suspend(() => Schema.Struct({
  enableManagedAiFeatures: Schema.optional(Schema.Boolean),
  runAsServiceAccount: Schema.optional(Schema.String),
  enableVariableMasking: Schema.optional(Schema.Boolean),
  enableHttpCall: Schema.optional(Schema.Boolean),
  cloudKmsConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCloudKmsConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCustomerConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCustomerConfig>;

export interface GoogleCloudIntegrationsV1alphaClientConfig {
  /** Globally unique ID (project_id + region) */
  id?: string;
  /** The GCP project id of the client associated with */
  projectId?: string;
  /** Description of what the client is used for */
  description?: string;
  /** The region the client is linked to. */
  region?: string;
  cloudKmsConfig?: GoogleCloudIntegrationsV1alphaCloudKmsConfig;
  /** The timestamp when the client was first created. */
  createTime?: string;
  /** The service agent associated with this client */
  p4ServiceAccount?: string;
  /** Indicates the billing type of the client */
  billingType?: "BILLING_TYPE_UNSPECIFIED" | "BILLING_TYPE_APIGEE_TRIALS" | "BILLING_TYPE_APIGEE_SUBSCRIPTION" | "BILLING_TYPE_PAYG" | (string & {});
  /** Indicates the activity state the client */
  clientState?: "CLIENT_STATE_UNSPECIFIED" | "CLIENT_STATE_ACTIVE" | "CLIENT_STATE_DISABLED" | (string & {});
  runAsServiceAccount?: string;
  /** Optional. */
  enableVariableMasking?: boolean;
  /** Optional. Indicates the client is provisioned with CMEK or GMEK. */
  isGmek?: boolean;
  /** Optional. Indicates the client enables internal IP feature, this is applicable for internal clients only. */
  enableInternalIp?: boolean;
  /** Optional. */
  enableHttpCall?: boolean;
  /** Optional. */
  enableManagedAiFeatures?: boolean;
  /** Optional. Customer configuration information for the given client. */
  customerConfig?: GoogleCloudIntegrationsV1alphaCustomerConfig;
}

export const GoogleCloudIntegrationsV1alphaClientConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaClientConfig> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  cloudKmsConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCloudKmsConfig),
  createTime: Schema.optional(Schema.String),
  p4ServiceAccount: Schema.optional(Schema.String),
  billingType: Schema.optional(Schema.String),
  clientState: Schema.optional(Schema.String),
  runAsServiceAccount: Schema.optional(Schema.String),
  enableVariableMasking: Schema.optional(Schema.Boolean),
  isGmek: Schema.optional(Schema.Boolean),
  enableInternalIp: Schema.optional(Schema.Boolean),
  enableHttpCall: Schema.optional(Schema.Boolean),
  enableManagedAiFeatures: Schema.optional(Schema.Boolean),
  customerConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCustomerConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaClientConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaClientConfig>;

export interface GoogleCloudIntegrationsV1alphaGetClientResponse {
  /** Required. Required: The client configuration that was requested */
  client?: GoogleCloudIntegrationsV1alphaClientConfig;
}

export const GoogleCloudIntegrationsV1alphaGetClientResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaGetClientResponse> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(GoogleCloudIntegrationsV1alphaClientConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaGetClientResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaGetClientResponse>;

export interface GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest {
  /** Required. Field mask specifying the fields in the customer config that have been modified and must be updated. If absent or empty, no fields are updated. */
  updateMask?: string;
  /** Optional. The customer configuration to be updated. */
  customerConfig?: GoogleCloudIntegrationsV1alphaCustomerConfig;
}

export const GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  customerConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCustomerConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest>;

export interface GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse {
  /** Required. The updated customer configuration. */
  customerConfig?: GoogleCloudIntegrationsV1alphaCustomerConfig;
}

export const GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse> = Schema.suspend(() => Schema.Struct({
  customerConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCustomerConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse>;

export interface GoogleCloudIntegrationsV1alphaProjectProperties {
  /** An enum value of what the enablement state is for the given project */
  ipEnablementState?: "IP_ENABLEMENT_STATE_UNSPECIFIED" | "IP_ENABLEMENT_STATE_STANDALONE" | "IP_ENABLEMENT_STATE_APIGEE" | "IP_ENABLEMENT_STATE_APIGEE_ENTITLED" | (string & {});
  /** A list of provisioned regions on the current project */
  provisionedRegions?: Array<string>;
  /** Required. Required: The client billing type that was requested */
  billingType?: "BILLING_TYPE_UNSPECIFIED" | "APIGEE_TRIALS" | "APIGEE_SUBSCRIPTION" | "PAYG" | "SUBSCRIPTION" | "NO_BILLING" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaProjectProperties: Schema.Schema<GoogleCloudIntegrationsV1alphaProjectProperties> = Schema.suspend(() => Schema.Struct({
  ipEnablementState: Schema.optional(Schema.String),
  provisionedRegions: Schema.optional(Schema.Array(Schema.String)),
  billingType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaProjectProperties" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaProjectProperties>;

export interface GoogleCloudIntegrationsV1alphaGetClientMetadataResponse {
  /** Required. Required: The client configuration that was requested */
  properties?: GoogleCloudIntegrationsV1alphaProjectProperties;
}

export const GoogleCloudIntegrationsV1alphaGetClientMetadataResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaGetClientMetadataResponse> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(GoogleCloudIntegrationsV1alphaProjectProperties),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaGetClientMetadataResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaGetClientMetadataResponse>;

export interface GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest {
  /** Required. REQUIRED: Cloud KMS config for AuthModule to encrypt/decrypt credentials. */
  cloudKmsConfig?: GoogleCloudIntegrationsV1alphaCloudKmsConfig;
}

export const GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest> = Schema.suspend(() => Schema.Struct({
  cloudKmsConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCloudKmsConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest>;

export interface GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest {
  /** Required. REQUIRED: Run-as service account to be updated */
  runAsServiceAccount?: string;
}

export const GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest> = Schema.suspend(() => Schema.Struct({
  runAsServiceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest>;

export interface GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest {
  /** Required. REQUIRED: True if variable masking feature should be turned on for this region */
  enableVariableMasking?: boolean;
}

export const GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest> = Schema.suspend(() => Schema.Struct({
  enableVariableMasking: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest>;

export interface GoogleCloudIntegrationsV1alphaToggleHttpRequest {
  /** Required. REQUIRED: True if http call feature should be turned on for this region */
  enableHttpCall?: boolean;
}

export const GoogleCloudIntegrationsV1alphaToggleHttpRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaToggleHttpRequest> = Schema.suspend(() => Schema.Struct({
  enableHttpCall: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaToggleHttpRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaToggleHttpRequest>;

export interface GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest {
  /** Indicates the id of the GCP project that the function will be created in. */
  projectId?: string;
  /** The function name of CF to be created */
  functionName?: string;
  /** The function region of CF to be created */
  functionRegion?: string;
  /** Optional. The api version of CF to be created */
  gcfApiVersion?: "GCF_API_VERSION_UNSPECIFIED" | "API_VERSION_V1" | "API_VERSION_V2" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  functionName: Schema.optional(Schema.String),
  functionRegion: Schema.optional(Schema.String),
  gcfApiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest>;

export interface GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse {
  /** The trigger url that will be returned */
  triggerUrl?: string;
}

export const GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse> = Schema.suspend(() => Schema.Struct({
  triggerUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse>;

export interface GoogleCloudIntegrationsV1alphaClientCertificate {
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  sslCertificate?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  encryptedPrivateKey?: string;
  /** 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. */
  passphrase?: string;
}

export const GoogleCloudIntegrationsV1alphaClientCertificate: Schema.Schema<GoogleCloudIntegrationsV1alphaClientCertificate> = Schema.suspend(() => Schema.Struct({
  sslCertificate: Schema.optional(Schema.String),
  encryptedPrivateKey: Schema.optional(Schema.String),
  passphrase: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaClientCertificate" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaClientCertificate>;

export interface GoogleCloudIntegrationsV1alphaCertificate {
  /** Output only. Auto generated primary key */
  name?: string;
  /** Required. Name of the certificate */
  displayName?: string;
  /** Description of the certificate */
  description?: string;
  /** Immutable. Requestor ID to be used to register certificate with trawler */
  requestorId?: string;
  /** Immutable. Credential id that will be used to register with trawler */
  credentialId?: string;
  /** Status of the certificate */
  certificateStatus?: "STATE_UNSPECIFIED" | "ACTIVE" | "EXPIRED" | (string & {});
  /** Output only. The timestamp after which certificate will be valid */
  validStartTime?: string;
  /** Output only. The timestamp after which certificate will expire */
  validEndTime?: string;
  /** Input only. Raw client certificate which would be registered with trawler */
  rawCertificate?: GoogleCloudIntegrationsV1alphaClientCertificate;
}

export const GoogleCloudIntegrationsV1alphaCertificate: Schema.Schema<GoogleCloudIntegrationsV1alphaCertificate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  requestorId: Schema.optional(Schema.String),
  credentialId: Schema.optional(Schema.String),
  certificateStatus: Schema.optional(Schema.String),
  validStartTime: Schema.optional(Schema.String),
  validEndTime: Schema.optional(Schema.String),
  rawCertificate: Schema.optional(GoogleCloudIntegrationsV1alphaClientCertificate),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCertificate" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCertificate>;

export interface GoogleCloudIntegrationsV1alphaListCertificatesResponse {
  /** The list of Certificates retrieved. */
  certificates?: Array<GoogleCloudIntegrationsV1alphaCertificate>;
  /** The token used to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListCertificatesResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListCertificatesResponse> = Schema.suspend(() => Schema.Struct({
  certificates: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaCertificate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListCertificatesResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListCertificatesResponse>;

export interface GoogleCloudIntegrationsV1alphaUsernameAndPassword {
  /** Username to be used */
  username?: string;
  /** Password to be used */
  password?: string;
}

export const GoogleCloudIntegrationsV1alphaUsernameAndPassword: Schema.Schema<GoogleCloudIntegrationsV1alphaUsernameAndPassword> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUsernameAndPassword" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUsernameAndPassword>;

export interface GoogleCloudIntegrationsV1alphaStringParameterArray {
  /** String array. */
  stringValues?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaStringParameterArray: Schema.Schema<GoogleCloudIntegrationsV1alphaStringParameterArray> = Schema.suspend(() => Schema.Struct({
  stringValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaStringParameterArray" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaStringParameterArray>;

export interface GoogleCloudIntegrationsV1alphaIntParameterArray {
  /** Integer array. */
  intValues?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaIntParameterArray: Schema.Schema<GoogleCloudIntegrationsV1alphaIntParameterArray> = Schema.suspend(() => Schema.Struct({
  intValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntParameterArray" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntParameterArray>;

export interface GoogleCloudIntegrationsV1alphaDoubleParameterArray {
  /** Double number array. */
  doubleValues?: Array<number>;
}

export const GoogleCloudIntegrationsV1alphaDoubleParameterArray: Schema.Schema<GoogleCloudIntegrationsV1alphaDoubleParameterArray> = Schema.suspend(() => Schema.Struct({
  doubleValues: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDoubleParameterArray" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDoubleParameterArray>;

export interface GoogleCloudIntegrationsV1alphaBooleanParameterArray {
  /** Boolean array. */
  booleanValues?: Array<boolean>;
}

export const GoogleCloudIntegrationsV1alphaBooleanParameterArray: Schema.Schema<GoogleCloudIntegrationsV1alphaBooleanParameterArray> = Schema.suspend(() => Schema.Struct({
  booleanValues: Schema.optional(Schema.Array(Schema.Boolean)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaBooleanParameterArray" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaBooleanParameterArray>;

export interface GoogleCloudIntegrationsV1alphaValueType {
  /** String. */
  stringValue?: string;
  /** Integer. */
  intValue?: string;
  /** Double Number. */
  doubleValue?: number;
  /** Boolean. */
  booleanValue?: boolean;
  /** String Array. */
  stringArray?: GoogleCloudIntegrationsV1alphaStringParameterArray;
  /** Integer Array. */
  intArray?: GoogleCloudIntegrationsV1alphaIntParameterArray;
  /** Double Number Array. */
  doubleArray?: GoogleCloudIntegrationsV1alphaDoubleParameterArray;
  /** Boolean Array. */
  booleanArray?: GoogleCloudIntegrationsV1alphaBooleanParameterArray;
  /** Json. */
  jsonValue?: string;
}

export const GoogleCloudIntegrationsV1alphaValueType: Schema.Schema<GoogleCloudIntegrationsV1alphaValueType> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  booleanValue: Schema.optional(Schema.Boolean),
  stringArray: Schema.optional(GoogleCloudIntegrationsV1alphaStringParameterArray),
  intArray: Schema.optional(GoogleCloudIntegrationsV1alphaIntParameterArray),
  doubleArray: Schema.optional(GoogleCloudIntegrationsV1alphaDoubleParameterArray),
  booleanArray: Schema.optional(GoogleCloudIntegrationsV1alphaBooleanParameterArray),
  jsonValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaValueType" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaValueType>;

export interface GoogleCloudIntegrationsV1alphaParameterMapField {
  /** Referencing one of the Integration variables. */
  referenceKey?: string;
  /** Passing a literal value. */
  literalValue?: GoogleCloudIntegrationsV1alphaValueType;
}

export const GoogleCloudIntegrationsV1alphaParameterMapField: Schema.Schema<GoogleCloudIntegrationsV1alphaParameterMapField> = Schema.suspend(() => Schema.Struct({
  referenceKey: Schema.optional(Schema.String),
  literalValue: Schema.optional(GoogleCloudIntegrationsV1alphaValueType),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaParameterMapField" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaParameterMapField>;

export interface GoogleCloudIntegrationsV1alphaParameterMapEntry {
  /** Key of the map entry. */
  key?: GoogleCloudIntegrationsV1alphaParameterMapField;
  /** Value of the map entry. */
  value?: GoogleCloudIntegrationsV1alphaParameterMapField;
}

export const GoogleCloudIntegrationsV1alphaParameterMapEntry: Schema.Schema<GoogleCloudIntegrationsV1alphaParameterMapEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(GoogleCloudIntegrationsV1alphaParameterMapField),
  value: Schema.optional(GoogleCloudIntegrationsV1alphaParameterMapField),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaParameterMapEntry" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaParameterMapEntry>;

export interface GoogleCloudIntegrationsV1alphaParameterMap {
  /** A list of parameter map entries. */
  entries?: Array<GoogleCloudIntegrationsV1alphaParameterMapEntry>;
  /** Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this. */
  keyType?: "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "BOOLEAN_ARRAY" | "JSON_VALUE" | "PROTO_VALUE" | "PROTO_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "PROTO_ENUM" | "SERIALIZED_OBJECT_VALUE" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | (string & {});
  /** Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this. */
  valueType?: "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "BOOLEAN_ARRAY" | "JSON_VALUE" | "PROTO_VALUE" | "PROTO_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "PROTO_ENUM" | "SERIALIZED_OBJECT_VALUE" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaParameterMap: Schema.Schema<GoogleCloudIntegrationsV1alphaParameterMap> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaParameterMapEntry)),
  keyType: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaParameterMap" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaParameterMap>;

export interface GoogleCloudIntegrationsV1alphaAccessToken {
  /** The access token encapsulating the security identity of a process or thread. */
  accessToken?: string;
  /** Required. The approximate time until the access token retrieved is valid. */
  accessTokenExpireTime?: string;
  /** Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0. */
  tokenType?: string;
  /** If the access token will expire, use the refresh token to obtain another access token. */
  refreshToken?: string;
  /** The approximate time until the refresh token retrieved is valid. */
  refreshTokenExpireTime?: string;
}

export const GoogleCloudIntegrationsV1alphaAccessToken: Schema.Schema<GoogleCloudIntegrationsV1alphaAccessToken> = Schema.suspend(() => Schema.Struct({
  accessToken: Schema.optional(Schema.String),
  accessTokenExpireTime: Schema.optional(Schema.String),
  tokenType: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  refreshTokenExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaAccessToken" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaAccessToken>;

export interface GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode {
  /** The client's id. */
  clientId?: string;
  /** The client's secret. */
  clientSecret?: string;
  /** A space-delimited list of requested scope permissions. */
  scope?: string;
  /** The auth url endpoint to send the auth code request to. */
  authEndpoint?: string;
  /** The auth parameters sent along with the auth code request. */
  authParams?: GoogleCloudIntegrationsV1alphaParameterMap;
  /** The token url endpoint to send the token request to. */
  tokenEndpoint?: string;
  /** The token parameters sent along with the token request. */
  tokenParams?: GoogleCloudIntegrationsV1alphaParameterMap;
  /** The access token received from the token endpoint. */
  accessToken?: GoogleCloudIntegrationsV1alphaAccessToken;
  /** The Auth Code that is used to initially retrieve the access token. */
  authCode?: string;
  /** Represent how to pass parameters to fetch access token */
  requestType?: "REQUEST_TYPE_UNSPECIFIED" | "REQUEST_BODY" | "QUERY_PARAMETERS" | "ENCODED_HEADER" | (string & {});
  /** Indicates if the user has opted in Google Reauth Policy. If opted in, the refresh token will be valid for 20 hours, after which time users must re-authenticate in order to obtain a new one. */
  applyReauthPolicy?: boolean;
}

export const GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode: Schema.Schema<GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  authEndpoint: Schema.optional(Schema.String),
  authParams: Schema.optional(GoogleCloudIntegrationsV1alphaParameterMap),
  tokenEndpoint: Schema.optional(Schema.String),
  tokenParams: Schema.optional(GoogleCloudIntegrationsV1alphaParameterMap),
  accessToken: Schema.optional(GoogleCloudIntegrationsV1alphaAccessToken),
  authCode: Schema.optional(Schema.String),
  requestType: Schema.optional(Schema.String),
  applyReauthPolicy: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode>;

export interface GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials {
  /** The client's ID. */
  clientId?: string;
  /** The client's secret. */
  clientSecret?: string;
  /** The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token. */
  tokenEndpoint?: string;
  /** A space-delimited list of requested scope permissions. */
  scope?: string;
  /** Token parameters for the auth request. */
  tokenParams?: GoogleCloudIntegrationsV1alphaParameterMap;
  /** Access token fetched from the authorization server. */
  accessToken?: GoogleCloudIntegrationsV1alphaAccessToken;
  /** Represent how to pass parameters to fetch access token */
  requestType?: "REQUEST_TYPE_UNSPECIFIED" | "REQUEST_BODY" | "QUERY_PARAMETERS" | "ENCODED_HEADER" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials: Schema.Schema<GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  tokenParams: Schema.optional(GoogleCloudIntegrationsV1alphaParameterMap),
  accessToken: Schema.optional(GoogleCloudIntegrationsV1alphaAccessToken),
  requestType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials>;

export interface GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials {
  /** The client's ID. */
  clientId?: string;
  /** The client's secret. */
  clientSecret?: string;
  /** The user's username. */
  username?: string;
  /** The user's password. */
  password?: string;
  /** The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token. */
  tokenEndpoint?: string;
  /** A space-delimited list of requested scope permissions. */
  scope?: string;
  /** Token parameters for the auth request. */
  tokenParams?: GoogleCloudIntegrationsV1alphaParameterMap;
  /** Access token fetched from the authorization server. */
  accessToken?: GoogleCloudIntegrationsV1alphaAccessToken;
  /** Represent how to pass parameters to fetch access token */
  requestType?: "REQUEST_TYPE_UNSPECIFIED" | "REQUEST_BODY" | "QUERY_PARAMETERS" | "ENCODED_HEADER" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials: Schema.Schema<GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  tokenParams: Schema.optional(GoogleCloudIntegrationsV1alphaParameterMap),
  accessToken: Schema.optional(GoogleCloudIntegrationsV1alphaAccessToken),
  requestType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials>;

export interface GoogleCloudIntegrationsV1alphaJwt {
  /** Identifies which algorithm is used to generate the signature. */
  jwtHeader?: string;
  /** Contains a set of claims. The JWT specification defines seven Registered Claim Names which are the standard fields commonly included in tokens. Custom claims are usually also included, depending on the purpose of the token. */
  jwtPayload?: string;
  /** User's pre-shared secret to sign the token. */
  secret?: string;
  /** The token calculated by the header, payload and signature. */
  jwt?: string;
}

export const GoogleCloudIntegrationsV1alphaJwt: Schema.Schema<GoogleCloudIntegrationsV1alphaJwt> = Schema.suspend(() => Schema.Struct({
  jwtHeader: Schema.optional(Schema.String),
  jwtPayload: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  jwt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaJwt" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaJwt>;

export interface GoogleCloudIntegrationsV1alphaAuthToken {
  /** Authentication type, e.g. "Basic", "Bearer", etc. */
  type?: string;
  /** The token for the auth type. */
  token?: string;
}

export const GoogleCloudIntegrationsV1alphaAuthToken: Schema.Schema<GoogleCloudIntegrationsV1alphaAuthToken> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaAuthToken" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaAuthToken>;

export interface GoogleCloudIntegrationsV1alphaServiceAccountCredentials {
  /** Name of the service account that has the permission to make the request. */
  serviceAccount?: string;
  /** A space-delimited list of requested scope permissions. */
  scope?: string;
}

export const GoogleCloudIntegrationsV1alphaServiceAccountCredentials: Schema.Schema<GoogleCloudIntegrationsV1alphaServiceAccountCredentials> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaServiceAccountCredentials" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaServiceAccountCredentials>;

export interface GoogleCloudIntegrationsV1alphaOidcToken {
  /** The service account email to be used as the identity for the token. */
  serviceAccountEmail?: string;
  /** Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. */
  audience?: string;
  /** ID token obtained for the service account */
  token?: string;
  /** The approximate time until the token retrieved is valid. */
  tokenExpireTime?: string;
}

export const GoogleCloudIntegrationsV1alphaOidcToken: Schema.Schema<GoogleCloudIntegrationsV1alphaOidcToken> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  audience: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  tokenExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaOidcToken" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaOidcToken>;

export interface GoogleCloudIntegrationsV1alphaCredential {
  /** Credential type associated with auth config. */
  credentialType?: "CREDENTIAL_TYPE_UNSPECIFIED" | "USERNAME_AND_PASSWORD" | "API_KEY" | "OAUTH2_AUTHORIZATION_CODE" | "OAUTH2_IMPLICIT" | "OAUTH2_CLIENT_CREDENTIALS" | "OAUTH2_RESOURCE_OWNER_CREDENTIALS" | "JWT" | "AUTH_TOKEN" | "SERVICE_ACCOUNT" | "CLIENT_CERTIFICATE_ONLY" | "OIDC_TOKEN" | (string & {});
  /** Username and password credential */
  usernameAndPassword?: GoogleCloudIntegrationsV1alphaUsernameAndPassword;
  /** The api_key and oauth2_implicit are not covered in v1 and will be picked up once v1 is implemented. ApiKey api_key = 3; OAuth2 authorization code credential */
  oauth2AuthorizationCode?: GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode;
  /** OAuth2Implicit oauth2_implicit = 5; OAuth2 client credentials */
  oauth2ClientCredentials?: GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials;
  /** OAuth2 resource owner credentials */
  oauth2ResourceOwnerCredentials?: GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials;
  /** JWT credential */
  jwt?: GoogleCloudIntegrationsV1alphaJwt;
  /** Auth token credential */
  authToken?: GoogleCloudIntegrationsV1alphaAuthToken;
  /** Service account credential */
  serviceAccountCredentials?: GoogleCloudIntegrationsV1alphaServiceAccountCredentials;
  /** Google OIDC ID Token */
  oidcToken?: GoogleCloudIntegrationsV1alphaOidcToken;
}

export const GoogleCloudIntegrationsV1alphaCredential: Schema.Schema<GoogleCloudIntegrationsV1alphaCredential> = Schema.suspend(() => Schema.Struct({
  credentialType: Schema.optional(Schema.String),
  usernameAndPassword: Schema.optional(GoogleCloudIntegrationsV1alphaUsernameAndPassword),
  oauth2AuthorizationCode: Schema.optional(GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode),
  oauth2ClientCredentials: Schema.optional(GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials),
  oauth2ResourceOwnerCredentials: Schema.optional(GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials),
  jwt: Schema.optional(GoogleCloudIntegrationsV1alphaJwt),
  authToken: Schema.optional(GoogleCloudIntegrationsV1alphaAuthToken),
  serviceAccountCredentials: Schema.optional(GoogleCloudIntegrationsV1alphaServiceAccountCredentials),
  oidcToken: Schema.optional(GoogleCloudIntegrationsV1alphaOidcToken),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCredential" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCredential>;

export interface GoogleCloudIntegrationsV1alphaAuthConfig {
  /** Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}. */
  name?: string;
  /** Required. The name of the auth config. */
  displayName?: string;
  /** Optional. A description of the auth config. */
  description?: string;
  /** Auth credential encrypted by Cloud KMS. Can be decrypted as Credential with proper KMS key. */
  encryptedCredential?: string;
  /** Raw auth credentials. */
  decryptedCredential?: GoogleCloudIntegrationsV1alphaCredential;
  /** Certificate id for client certificate */
  certificateId?: string;
  /** Required. Credential type of the encrypted credential. */
  credentialType?: "CREDENTIAL_TYPE_UNSPECIFIED" | "USERNAME_AND_PASSWORD" | "API_KEY" | "OAUTH2_AUTHORIZATION_CODE" | "OAUTH2_IMPLICIT" | "OAUTH2_CLIENT_CREDENTIALS" | "OAUTH2_RESOURCE_OWNER_CREDENTIALS" | "JWT" | "AUTH_TOKEN" | "SERVICE_ACCOUNT" | "CLIENT_CERTIFICATE_ONLY" | "OIDC_TOKEN" | (string & {});
  /** The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  creatorEmail?: string;
  /** Output only. The timestamp when the auth config is created. */
  createTime?: string;
  /** The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  lastModifierEmail?: string;
  /** Output only. The timestamp when the auth config is modified. */
  updateTime?: string;
  /** Optional. The visibility of the auth config. */
  visibility?: "AUTH_CONFIG_VISIBILITY_UNSPECIFIED" | "PRIVATE" | "CLIENT_VISIBLE" | (string & {});
  /** Output only. The status of the auth config. */
  state?: "STATE_UNSPECIFIED" | "VALID" | "INVALID" | "SOFT_DELETED" | "EXPIRED" | "UNAUTHORIZED" | "UNSUPPORTED" | (string & {});
  /** Output only. The reason / details of the current status. */
  reason?: string;
  /** Optional. User can define the time to receive notification after which the auth config becomes invalid. Support up to 30 days. Support granularity in hours. */
  expiryNotificationDuration?: Array<string>;
  /** Optional. The time until the auth config is valid. Empty or max value is considered the auth config won't expire. */
  validTime?: string;
  /** Optional. User provided expiry time to override. For the example of Salesforce, username/password credentials can be valid for 6 months depending on the instance settings. */
  overrideValidTime?: string;
}

export const GoogleCloudIntegrationsV1alphaAuthConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaAuthConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  encryptedCredential: Schema.optional(Schema.String),
  decryptedCredential: Schema.optional(GoogleCloudIntegrationsV1alphaCredential),
  certificateId: Schema.optional(Schema.String),
  credentialType: Schema.optional(Schema.String),
  creatorEmail: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastModifierEmail: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  expiryNotificationDuration: Schema.optional(Schema.Array(Schema.String)),
  validTime: Schema.optional(Schema.String),
  overrideValidTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaAuthConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaAuthConfig>;

export interface GoogleCloudIntegrationsV1alphaListAuthConfigsResponse {
  /** The list of AuthConfigs retrieved. */
  authConfigs?: Array<GoogleCloudIntegrationsV1alphaAuthConfig>;
  /** The token used to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListAuthConfigsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListAuthConfigsResponse> = Schema.suspend(() => Schema.Struct({
  authConfigs: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaAuthConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListAuthConfigsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListAuthConfigsResponse>;

export interface GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse {
  /** All regions where Connector Platform is provisioned. */
  regions?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse>;

export interface GoogleCloudConnectorsV1ConnectionStatus {
  /** State. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "INACTIVE" | "DELETING" | "UPDATING" | "ERROR" | "AUTHORIZATION_REQUIRED" | (string & {});
  /** Description. */
  description?: string;
  /** Status provides detailed information for the state. */
  status?: string;
}

export const GoogleCloudConnectorsV1ConnectionStatus: Schema.Schema<GoogleCloudConnectorsV1ConnectionStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1ConnectionStatus" }) as any as Schema.Schema<GoogleCloudConnectorsV1ConnectionStatus>;

export interface GoogleCloudConnectorsV1Secret {
  /** Optional. The resource name of the secret version in the format, format as: `projects/* /secrets/* /versions/*`. */
  secretVersion?: string;
}

export const GoogleCloudConnectorsV1Secret: Schema.Schema<GoogleCloudConnectorsV1Secret> = Schema.suspend(() => Schema.Struct({
  secretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1Secret" }) as any as Schema.Schema<GoogleCloudConnectorsV1Secret>;

export interface GoogleCloudConnectorsV1EncryptionKey {
  /** Optional. Specifies the type of the encryption key. */
  type?: "TYPE_UNSPECIFIED" | "GOOGLE_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
  /** Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/* /locations/* /keyRings/* /cryptoKeys/*`. Will be empty string if google managed. */
  kmsKeyName?: string;
}

export const GoogleCloudConnectorsV1EncryptionKey: Schema.Schema<GoogleCloudConnectorsV1EncryptionKey> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1EncryptionKey" }) as any as Schema.Schema<GoogleCloudConnectorsV1EncryptionKey>;

export interface GoogleCloudConnectorsV1ConfigVariable {
  /** Optional. Key of the config variable. */
  key?: string;
  /** Optional. Value is an integer */
  intValue?: string;
  /** Optional. Value is a bool. */
  boolValue?: boolean;
  /** Optional. Value is a string. */
  stringValue?: string;
  /** Optional. Value is a secret. */
  secretValue?: GoogleCloudConnectorsV1Secret;
  /** Optional. Value is a Encryption Key. */
  encryptionKeyValue?: GoogleCloudConnectorsV1EncryptionKey;
}

export const GoogleCloudConnectorsV1ConfigVariable: Schema.Schema<GoogleCloudConnectorsV1ConfigVariable> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
  stringValue: Schema.optional(Schema.String),
  secretValue: Schema.optional(GoogleCloudConnectorsV1Secret),
  encryptionKeyValue: Schema.optional(GoogleCloudConnectorsV1EncryptionKey),
})).annotate({ identifier: "GoogleCloudConnectorsV1ConfigVariable" }) as any as Schema.Schema<GoogleCloudConnectorsV1ConfigVariable>;

export interface GoogleCloudConnectorsV1AuthConfigUserPassword {
  /** Optional. Username. */
  username?: string;
  /** Optional. Secret version reference containing the password. */
  password?: GoogleCloudConnectorsV1Secret;
}

export const GoogleCloudConnectorsV1AuthConfigUserPassword: Schema.Schema<GoogleCloudConnectorsV1AuthConfigUserPassword> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  password: Schema.optional(GoogleCloudConnectorsV1Secret),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigUserPassword" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigUserPassword>;

export interface GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims {
  /** Optional. Value for the "iss" claim. */
  issuer?: string;
  /** Optional. Value for the "sub" claim. */
  subject?: string;
  /** Optional. Value for the "aud" claim. */
  audience?: string;
}

export const GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims: Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims> = Schema.suspend(() => Schema.Struct({
  issuer: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  audience: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims>;

export interface GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer {
  /** Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/* /secrets/* /versions/*`. */
  clientKey?: GoogleCloudConnectorsV1Secret;
  /** Optional. JwtClaims providers fields to generate the token. */
  jwtClaims?: GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims;
}

export const GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer: Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer> = Schema.suspend(() => Schema.Struct({
  clientKey: Schema.optional(GoogleCloudConnectorsV1Secret),
  jwtClaims: Schema.optional(GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer>;

export interface GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials {
  /** Optional. The client identifier. */
  clientId?: string;
  /** Optional. Secret version reference containing the client secret. */
  clientSecret?: GoogleCloudConnectorsV1Secret;
}

export const GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials: Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(GoogleCloudConnectorsV1Secret),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials>;

export interface GoogleCloudConnectorsV1AuthConfigSshPublicKey {
  /** Optional. The user account used to authenticate. */
  username?: string;
  /** Optional. SSH Client Cert. It should contain both public and private key. */
  sshClientCert?: GoogleCloudConnectorsV1Secret;
  /** Optional. Format of SSH Client cert. */
  certType?: string;
  /** Optional. Password (passphrase) for ssh client certificate if it has one. */
  sshClientCertPass?: GoogleCloudConnectorsV1Secret;
}

export const GoogleCloudConnectorsV1AuthConfigSshPublicKey: Schema.Schema<GoogleCloudConnectorsV1AuthConfigSshPublicKey> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  sshClientCert: Schema.optional(GoogleCloudConnectorsV1Secret),
  certType: Schema.optional(Schema.String),
  sshClientCertPass: Schema.optional(GoogleCloudConnectorsV1Secret),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigSshPublicKey" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigSshPublicKey>;

export interface GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow {
  /** Optional. Authorization code to be exchanged for access and refresh tokens. */
  authCode?: string;
  /** Optional. PKCE verifier to be used during the auth code exchange. */
  pkceVerifier?: string;
  /** Optional. Redirect URI to be provided during the auth code exchange. */
  redirectUri?: string;
  /** Optional. Client ID for user-provided OAuth app. */
  clientId?: string;
  /** Optional. Client secret for user-provided OAuth app. */
  clientSecret?: GoogleCloudConnectorsV1Secret;
  /** Optional. Scopes the connection will request when the user performs the auth code flow. */
  scopes?: Array<string>;
  /** Optional. Whether to enable PKCE when the user performs the auth code flow. */
  enablePkce?: boolean;
  /** Optional. Auth URL for Authorization Code Flow */
  authUri?: string;
}

export const GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow: Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow> = Schema.suspend(() => Schema.Struct({
  authCode: Schema.optional(Schema.String),
  pkceVerifier: Schema.optional(Schema.String),
  redirectUri: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(GoogleCloudConnectorsV1Secret),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  enablePkce: Schema.optional(Schema.Boolean),
  authUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow>;

export interface GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged {
  /** Optional. Authorization code to be exchanged for access and refresh tokens. */
  authCode?: string;
  /** Optional. Redirect URI to be provided during the auth code exchange. */
  redirectUri?: string;
  /** Required. Scopes the connection will request when the user performs the auth code flow. */
  scopes?: Array<string>;
}

export const GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged: Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged> = Schema.suspend(() => Schema.Struct({
  authCode: Schema.optional(Schema.String),
  redirectUri: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged>;

export interface GoogleCloudConnectorsV1AuthConfig {
  /** Optional. The type of authentication configured. */
  authType?: "AUTH_TYPE_UNSPECIFIED" | "USER_PASSWORD" | "OAUTH2_JWT_BEARER" | "OAUTH2_CLIENT_CREDENTIALS" | "SSH_PUBLIC_KEY" | "OAUTH2_AUTH_CODE_FLOW" | "GOOGLE_AUTHENTICATION" | "OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED" | (string & {});
  /** UserPassword. */
  userPassword?: GoogleCloudConnectorsV1AuthConfigUserPassword;
  /** Oauth2JwtBearer. */
  oauth2JwtBearer?: GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer;
  /** Oauth2ClientCredentials. */
  oauth2ClientCredentials?: GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials;
  /** SSH Public Key. */
  sshPublicKey?: GoogleCloudConnectorsV1AuthConfigSshPublicKey;
  /** Oauth2AuthCodeFlow. */
  oauth2AuthCodeFlow?: GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow;
  /** Oauth2AuthCodeFlowGoogleManaged. */
  oauth2AuthCodeFlowGoogleManaged?: GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged;
  /** Optional. List containing additional auth configs. */
  additionalVariables?: Array<GoogleCloudConnectorsV1ConfigVariable>;
  /** Optional. Identifier key for auth config */
  authKey?: string;
}

export const GoogleCloudConnectorsV1AuthConfig: Schema.Schema<GoogleCloudConnectorsV1AuthConfig> = Schema.suspend(() => Schema.Struct({
  authType: Schema.optional(Schema.String),
  userPassword: Schema.optional(GoogleCloudConnectorsV1AuthConfigUserPassword),
  oauth2JwtBearer: Schema.optional(GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer),
  oauth2ClientCredentials: Schema.optional(GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials),
  sshPublicKey: Schema.optional(GoogleCloudConnectorsV1AuthConfigSshPublicKey),
  oauth2AuthCodeFlow: Schema.optional(GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow),
  oauth2AuthCodeFlowGoogleManaged: Schema.optional(GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged),
  additionalVariables: Schema.optional(Schema.Array(GoogleCloudConnectorsV1ConfigVariable)),
  authKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1AuthConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1AuthConfig>;

export interface GoogleCloudConnectorsV1LockConfig {
  /** Optional. Indicates whether or not the connection is locked. */
  locked?: boolean;
  /** Optional. Describes why a connection is locked. */
  reason?: string;
}

export const GoogleCloudConnectorsV1LockConfig: Schema.Schema<GoogleCloudConnectorsV1LockConfig> = Schema.suspend(() => Schema.Struct({
  locked: Schema.optional(Schema.Boolean),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1LockConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1LockConfig>;

export interface GoogleCloudConnectorsV1Destination {
  /** PSC service attachments. Format: projects/* /regions/* /serviceAttachments/* */
  serviceAttachment?: string;
  /** For publicly routable host. */
  host?: string;
  /** Optional. The port is the target port number that is accepted by the destination. */
  port?: number;
}

export const GoogleCloudConnectorsV1Destination: Schema.Schema<GoogleCloudConnectorsV1Destination> = Schema.suspend(() => Schema.Struct({
  serviceAttachment: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudConnectorsV1Destination" }) as any as Schema.Schema<GoogleCloudConnectorsV1Destination>;

export interface GoogleCloudConnectorsV1DestinationConfig {
  /** Optional. The key is the destination identifier that is supported by the Connector. */
  key?: string;
  /** Optional. The destinations for the key. */
  destinations?: Array<GoogleCloudConnectorsV1Destination>;
}

export const GoogleCloudConnectorsV1DestinationConfig: Schema.Schema<GoogleCloudConnectorsV1DestinationConfig> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  destinations: Schema.optional(Schema.Array(GoogleCloudConnectorsV1Destination)),
})).annotate({ identifier: "GoogleCloudConnectorsV1DestinationConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1DestinationConfig>;

export interface GoogleCloudConnectorsV1NodeConfig {
  /** Optional. Minimum number of nodes in the runtime nodes. */
  minNodeCount?: number;
  /** Optional. Maximum number of nodes in the runtime nodes. */
  maxNodeCount?: number;
}

export const GoogleCloudConnectorsV1NodeConfig: Schema.Schema<GoogleCloudConnectorsV1NodeConfig> = Schema.suspend(() => Schema.Struct({
  minNodeCount: Schema.optional(Schema.Number),
  maxNodeCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudConnectorsV1NodeConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1NodeConfig>;

export interface GoogleCloudConnectorsV1LogConfig {
  /** Optional. Enabled represents whether logging is enabled or not for a connection. */
  enabled?: boolean;
  /** Optional. Log configuration level. */
  level?: "LOG_LEVEL_UNSPECIFIED" | "ERROR" | "INFO" | "DEBUG" | (string & {});
}

export const GoogleCloudConnectorsV1LogConfig: Schema.Schema<GoogleCloudConnectorsV1LogConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  level: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1LogConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1LogConfig>;

export interface GoogleCloudConnectorsV1SslConfig {
  /** Optional. Controls the ssl type for the given connector version. */
  type?: "SSL_TYPE_UNSPECIFIED" | "TLS" | "MTLS" | (string & {});
  /** Optional. Trust Model of the SSL connection */
  trustModel?: "PUBLIC" | "PRIVATE" | "INSECURE" | (string & {});
  /** Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`. */
  privateServerCertificate?: GoogleCloudConnectorsV1Secret;
  /** Optional. Client Certificate */
  clientCertificate?: GoogleCloudConnectorsV1Secret;
  /** Optional. Client Private Key */
  clientPrivateKey?: GoogleCloudConnectorsV1Secret;
  /** Optional. Secret containing the passphrase protecting the Client Private Key */
  clientPrivateKeyPass?: GoogleCloudConnectorsV1Secret;
  /** Optional. Type of Server Cert (PEM/JKS/.. etc.) */
  serverCertType?: "CERT_TYPE_UNSPECIFIED" | "PEM" | (string & {});
  /** Optional. Type of Client Cert (PEM/JKS/.. etc.) */
  clientCertType?: "CERT_TYPE_UNSPECIFIED" | "PEM" | (string & {});
  /** Optional. Bool for enabling SSL */
  useSsl?: boolean;
  /** Optional. Additional SSL related field values */
  additionalVariables?: Array<GoogleCloudConnectorsV1ConfigVariable>;
}

export const GoogleCloudConnectorsV1SslConfig: Schema.Schema<GoogleCloudConnectorsV1SslConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  trustModel: Schema.optional(Schema.String),
  privateServerCertificate: Schema.optional(GoogleCloudConnectorsV1Secret),
  clientCertificate: Schema.optional(GoogleCloudConnectorsV1Secret),
  clientPrivateKey: Schema.optional(GoogleCloudConnectorsV1Secret),
  clientPrivateKeyPass: Schema.optional(GoogleCloudConnectorsV1Secret),
  serverCertType: Schema.optional(Schema.String),
  clientCertType: Schema.optional(Schema.String),
  useSsl: Schema.optional(Schema.Boolean),
  additionalVariables: Schema.optional(Schema.Array(GoogleCloudConnectorsV1ConfigVariable)),
})).annotate({ identifier: "GoogleCloudConnectorsV1SslConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1SslConfig>;

export interface GoogleCloudConnectorsV1EventingConfigDeadLetterConfig {
  /** Optional. Topic to push events which couldn't be processed. */
  topic?: string;
  /** Optional. Project which has the topic given. */
  projectId?: string;
}

export const GoogleCloudConnectorsV1EventingConfigDeadLetterConfig: Schema.Schema<GoogleCloudConnectorsV1EventingConfigDeadLetterConfig> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1EventingConfigDeadLetterConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1EventingConfigDeadLetterConfig>;

export interface GoogleCloudConnectorsV1EnrichmentConfig {
  /** Optional. Append ACL to the event. */
  appendAcl?: boolean;
}

export const GoogleCloudConnectorsV1EnrichmentConfig: Schema.Schema<GoogleCloudConnectorsV1EnrichmentConfig> = Schema.suspend(() => Schema.Struct({
  appendAcl: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudConnectorsV1EnrichmentConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1EnrichmentConfig>;

export interface GoogleCloudConnectorsV1EventingConfig {
  /** Optional. Registration endpoint for auto registration. */
  registrationDestinationConfig?: GoogleCloudConnectorsV1DestinationConfig;
  /** Optional. Auth details for the webhook adapter. */
  authConfig?: GoogleCloudConnectorsV1AuthConfig;
  /** Optional. Auth details for the event listener. */
  listenerAuthConfig?: GoogleCloudConnectorsV1AuthConfig;
  /** Optional. Additional eventing related field values */
  additionalVariables?: Array<GoogleCloudConnectorsV1ConfigVariable>;
  /** Optional. Enrichment Enabled. */
  enrichmentEnabled?: boolean;
  /** Optional. Private Connectivity Enabled. */
  privateConnectivityEnabled?: boolean;
  /** Output only. Ingress endpoint of the event listener. This is used only when private connectivity is enabled. */
  eventsListenerIngressEndpoint?: string;
  /** Optional. Dead letter configuration for eventing of a connection. */
  deadLetterConfig?: GoogleCloudConnectorsV1EventingConfigDeadLetterConfig;
  /** Optional. Proxy for Eventing auto-registration. */
  proxyDestinationConfig?: GoogleCloudConnectorsV1DestinationConfig;
  /** Optional. Data enrichment configuration. */
  enrichmentConfig?: GoogleCloudConnectorsV1EnrichmentConfig;
  /** Optional. Ssl config of a connection */
  sslConfig?: GoogleCloudConnectorsV1SslConfig;
  /** Optional. List of projects to be allowlisted for the service attachment created in the tenant project for eventing ingress. */
  privateConnectivityAllowlistedProjects?: Array<string>;
  /** Optional. List of allowed event types for the connection. */
  allowedEventTypes?: Array<string>;
}

export const GoogleCloudConnectorsV1EventingConfig: Schema.Schema<GoogleCloudConnectorsV1EventingConfig> = Schema.suspend(() => Schema.Struct({
  registrationDestinationConfig: Schema.optional(GoogleCloudConnectorsV1DestinationConfig),
  authConfig: Schema.optional(GoogleCloudConnectorsV1AuthConfig),
  listenerAuthConfig: Schema.optional(GoogleCloudConnectorsV1AuthConfig),
  additionalVariables: Schema.optional(Schema.Array(GoogleCloudConnectorsV1ConfigVariable)),
  enrichmentEnabled: Schema.optional(Schema.Boolean),
  privateConnectivityEnabled: Schema.optional(Schema.Boolean),
  eventsListenerIngressEndpoint: Schema.optional(Schema.String),
  deadLetterConfig: Schema.optional(GoogleCloudConnectorsV1EventingConfigDeadLetterConfig),
  proxyDestinationConfig: Schema.optional(GoogleCloudConnectorsV1DestinationConfig),
  enrichmentConfig: Schema.optional(GoogleCloudConnectorsV1EnrichmentConfig),
  sslConfig: Schema.optional(GoogleCloudConnectorsV1SslConfig),
  privateConnectivityAllowlistedProjects: Schema.optional(Schema.Array(Schema.String)),
  allowedEventTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudConnectorsV1EventingConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1EventingConfig>;

export interface GoogleCloudConnectorsV1EventingStatus {
  /** Output only. State. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "ERROR" | "INGRESS_ENDPOINT_REQUIRED" | (string & {});
  /** Output only. Description of error if State is set to "ERROR". */
  description?: string;
}

export const GoogleCloudConnectorsV1EventingStatus: Schema.Schema<GoogleCloudConnectorsV1EventingStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1EventingStatus" }) as any as Schema.Schema<GoogleCloudConnectorsV1EventingStatus>;

export interface GoogleCloudConnectorsV1EventingRuntimeDataWebhookData {
  /** Output only. Name of the Webhook */
  name?: string;
  /** Output only. ID to uniquely identify webhook. */
  id?: string;
  /** Output only. Additional webhook related field values. */
  additionalVariables?: Array<GoogleCloudConnectorsV1ConfigVariable>;
  /** Output only. Timestamp when the webhook was created. */
  createTime?: string;
  /** Output only. Timestamp when the webhook was last updated. */
  updateTime?: string;
  /** Output only. Next webhook refresh time. Will be null if refresh is not supported. */
  nextRefreshTime?: string;
}

export const GoogleCloudConnectorsV1EventingRuntimeDataWebhookData: Schema.Schema<GoogleCloudConnectorsV1EventingRuntimeDataWebhookData> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  additionalVariables: Schema.optional(Schema.Array(GoogleCloudConnectorsV1ConfigVariable)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  nextRefreshTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1EventingRuntimeDataWebhookData" }) as any as Schema.Schema<GoogleCloudConnectorsV1EventingRuntimeDataWebhookData>;

export interface GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions {
  /** Output only. Webhook data. */
  webhookData?: Array<GoogleCloudConnectorsV1EventingRuntimeDataWebhookData>;
}

export const GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions: Schema.Schema<GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions> = Schema.suspend(() => Schema.Struct({
  webhookData: Schema.optional(Schema.Array(GoogleCloudConnectorsV1EventingRuntimeDataWebhookData)),
})).annotate({ identifier: "GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions" }) as any as Schema.Schema<GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions>;

export interface GoogleCloudConnectorsV1EventingRuntimeData {
  /** Output only. Current status of eventing. */
  status?: GoogleCloudConnectorsV1EventingStatus;
  /** Output only. Events listener endpoint. The value will populated after provisioning the events listener. */
  eventsListenerEndpoint?: string;
  /** Output only. Events listener PSC Service attachment. The value will be populated after provisioning the events listener with private connectivity enabled. */
  eventsListenerPscSa?: string;
  /** Output only. Webhook data. */
  webhookData?: GoogleCloudConnectorsV1EventingRuntimeDataWebhookData;
  /** Output only. Webhook subscriptions. */
  webhookSubscriptions?: GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions;
}

export const GoogleCloudConnectorsV1EventingRuntimeData: Schema.Schema<GoogleCloudConnectorsV1EventingRuntimeData> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(GoogleCloudConnectorsV1EventingStatus),
  eventsListenerEndpoint: Schema.optional(Schema.String),
  eventsListenerPscSa: Schema.optional(Schema.String),
  webhookData: Schema.optional(GoogleCloudConnectorsV1EventingRuntimeDataWebhookData),
  webhookSubscriptions: Schema.optional(GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions),
})).annotate({ identifier: "GoogleCloudConnectorsV1EventingRuntimeData" }) as any as Schema.Schema<GoogleCloudConnectorsV1EventingRuntimeData>;

export interface GoogleCloudConnectorsV1HPAConfig {
  /** Output only. Percent CPU utilization where HPA triggers autoscaling. */
  cpuUtilizationThreshold?: string;
  /** Output only. Percent Memory utilization where HPA triggers autoscaling. */
  memoryUtilizationThreshold?: string;
}

export const GoogleCloudConnectorsV1HPAConfig: Schema.Schema<GoogleCloudConnectorsV1HPAConfig> = Schema.suspend(() => Schema.Struct({
  cpuUtilizationThreshold: Schema.optional(Schema.String),
  memoryUtilizationThreshold: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1HPAConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1HPAConfig>;

export interface GoogleCloudConnectorsV1ResourceRequests {
  /** Output only. CPU request. */
  cpu?: string;
  /** Output only. Memory request. */
  memory?: string;
}

export const GoogleCloudConnectorsV1ResourceRequests: Schema.Schema<GoogleCloudConnectorsV1ResourceRequests> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.String),
  memory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1ResourceRequests" }) as any as Schema.Schema<GoogleCloudConnectorsV1ResourceRequests>;

export interface GoogleCloudConnectorsV1ResourceLimits {
  /** Output only. CPU limit. */
  cpu?: string;
  /** Output only. Memory limit. */
  memory?: string;
}

export const GoogleCloudConnectorsV1ResourceLimits: Schema.Schema<GoogleCloudConnectorsV1ResourceLimits> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.String),
  memory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1ResourceLimits" }) as any as Schema.Schema<GoogleCloudConnectorsV1ResourceLimits>;

export interface GoogleCloudConnectorsV1ConnectorVersionInfraConfig {
  /** Output only. Max QPS supported by the connector version before throttling of requests. */
  ratelimitThreshold?: string;
  /** Output only. Max QPS supported for internal requests originating from Connd. */
  internalclientRatelimitThreshold?: string;
  /** Output only. HPA autoscaling config. */
  hpaConfig?: GoogleCloudConnectorsV1HPAConfig;
  /** Output only. System resource requests. */
  resourceRequests?: GoogleCloudConnectorsV1ResourceRequests;
  /** Output only. System resource limits. */
  resourceLimits?: GoogleCloudConnectorsV1ResourceLimits;
  /** Output only. The name of shared connector deployment. */
  sharedDeployment?: string;
  /** Output only. The window used for ratelimiting runtime requests to connections. */
  connectionRatelimitWindowSeconds?: string;
  /** Output only. Indicates whether connector is deployed on GKE/CloudRun */
  deploymentModel?: "DEPLOYMENT_MODEL_UNSPECIFIED" | "GKE_MST" | "CLOUD_RUN_MST" | (string & {});
  /** Output only. Status of the deployment model migration. */
  deploymentModelMigrationState?: "DEPLOYMENT_MODEL_MIGRATION_STATE_UNSPECIFIED" | "IN_PROGRESS" | "COMPLETED" | "ROLLEDBACK" | "ROLLBACK_IN_PROGRESS" | (string & {});
  /** Output only. Max instance request concurrency. */
  maxInstanceRequestConcurrency?: number;
  /** Output only. Status of the TLS migration. */
  tlsMigrationState?: "TLS_MIGRATION_STATE_UNSPECIFIED" | "TLS_MIGRATION_NOT_STARTED" | "TLS_MIGRATION_COMPLETED" | (string & {});
}

export const GoogleCloudConnectorsV1ConnectorVersionInfraConfig: Schema.Schema<GoogleCloudConnectorsV1ConnectorVersionInfraConfig> = Schema.suspend(() => Schema.Struct({
  ratelimitThreshold: Schema.optional(Schema.String),
  internalclientRatelimitThreshold: Schema.optional(Schema.String),
  hpaConfig: Schema.optional(GoogleCloudConnectorsV1HPAConfig),
  resourceRequests: Schema.optional(GoogleCloudConnectorsV1ResourceRequests),
  resourceLimits: Schema.optional(GoogleCloudConnectorsV1ResourceLimits),
  sharedDeployment: Schema.optional(Schema.String),
  connectionRatelimitWindowSeconds: Schema.optional(Schema.String),
  deploymentModel: Schema.optional(Schema.String),
  deploymentModelMigrationState: Schema.optional(Schema.String),
  maxInstanceRequestConcurrency: Schema.optional(Schema.Number),
  tlsMigrationState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1ConnectorVersionInfraConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1ConnectorVersionInfraConfig>;

export interface GoogleCloudConnectorsV1BillingConfig {
  /** Output only. Billing category for the connector. */
  billingCategory?: "BILLING_CATEGORY_UNSPECIFIED" | "GCP_AND_TECHNICAL_CONNECTOR" | "NON_GCP_CONNECTOR" | (string & {});
}

export const GoogleCloudConnectorsV1BillingConfig: Schema.Schema<GoogleCloudConnectorsV1BillingConfig> = Schema.suspend(() => Schema.Struct({
  billingCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1BillingConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1BillingConfig>;

export interface GoogleCloudConnectorsV1TrafficShapingConfig {
  /** Required. Maximum number of api calls allowed. */
  quotaLimit?: string;
  /** Required. Specifies the duration over which the API call quota limits are calculated. This duration is used to define the time window for evaluating if the number of API calls made by a user is within the allowed quota limits. For example: - To define a quota sampled over 16 seconds, set `seconds` to 16 - To define a quota sampled over 5 minutes, set `seconds` to 300 (5 * 60) - To define a quota sampled over 1 day, set `seconds` to 86400 (24 * 60 * 60) and so on. It is important to note that this duration is not the time the quota is valid for, but rather the time window over which the quota is evaluated. For example, if the quota is 100 calls per 10 seconds, then this duration field would be set to 10 seconds. */
  duration?: string;
}

export const GoogleCloudConnectorsV1TrafficShapingConfig: Schema.Schema<GoogleCloudConnectorsV1TrafficShapingConfig> = Schema.suspend(() => Schema.Struct({
  quotaLimit: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudConnectorsV1TrafficShapingConfig" }) as any as Schema.Schema<GoogleCloudConnectorsV1TrafficShapingConfig>;

export interface GoogleCloudConnectorsV1Connection {
  /** Output only. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} */
  name?: string;
  /** Output only. Created time. */
  createTime?: string;
  /** Output only. Updated time. */
  updateTime?: string;
  /** Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources */
  labels?: Record<string, string>;
  /** Optional. Description of the resource. */
  description?: string;
  /** Required. Connector version on which the connection is created. The format is: projects/* /locations/* /providers/* /connectors/* /versions/* Only global location is supported for ConnectorVersion resource. */
  connectorVersion?: string;
  /** Output only. Current status of the connection. */
  status?: GoogleCloudConnectorsV1ConnectionStatus;
  /** Optional. Configuration for configuring the connection with an external system. */
  configVariables?: Array<GoogleCloudConnectorsV1ConfigVariable>;
  /** Optional. Configuration for establishing the connection's authentication with an external system. */
  authConfig?: GoogleCloudConnectorsV1AuthConfig;
  /** Optional. Configuration that indicates whether or not the Connection can be edited. */
  lockConfig?: GoogleCloudConnectorsV1LockConfig;
  /** Optional. Configuration of the Connector's destination. Only accepted for Connectors that accepts user defined destination(s). */
  destinationConfigs?: Array<GoogleCloudConnectorsV1DestinationConfig>;
  /** Output only. GCR location where the runtime image is stored. formatted like: gcr.io/{bucketName}/{imageName} */
  imageLocation?: string;
  /** Optional. Service account needed for runtime plane to access Google Cloud resources. */
  serviceAccount?: string;
  /** Output only. The name of the Service Directory service name. Used for Private Harpoon to resolve the ILB address. e.g. "projects/cloud-connectors-e2e-testing/locations/us-central1/namespaces/istio-system/services/istio-ingressgateway-connectors" */
  serviceDirectory?: string;
  /** Output only. GCR location where the envoy image is stored. formatted like: gcr.io/{bucketName}/{imageName} */
  envoyImageLocation?: string;
  /** Optional. Suspended indicates if a user has suspended a connection or not. */
  suspended?: boolean;
  /** Optional. Node configuration for the connection. */
  nodeConfig?: GoogleCloudConnectorsV1NodeConfig;
  /** Optional. Log configuration for the connection. */
  logConfig?: GoogleCloudConnectorsV1LogConfig;
  /** Optional. Ssl config of a connection */
  sslConfig?: GoogleCloudConnectorsV1SslConfig;
  /** Output only. This subscription type enum states the subscription type of the project. */
  subscriptionType?: "SUBSCRIPTION_TYPE_UNSPECIFIED" | "PAY_G" | "PAID" | (string & {});
  /** Output only. Connection revision. This field is only updated when the connection is created or updated by User. */
  connectionRevision?: string;
  /** Optional. Eventing enablement type. Will be nil if eventing is not enabled. */
  eventingEnablementType?: "EVENTING_ENABLEMENT_TYPE_UNSPECIFIED" | "EVENTING_AND_CONNECTION" | "ONLY_EVENTING" | (string & {});
  /** Optional. Eventing config of a connection */
  eventingConfig?: GoogleCloudConnectorsV1EventingConfig;
  /** Output only. Flag to mark the version indicating the launch stage. */
  connectorVersionLaunchStage?: "LAUNCH_STAGE_UNSPECIFIED" | "PREVIEW" | "GA" | "DEPRECATED" | "TEST" | "PRIVATE_PREVIEW" | (string & {});
  /** Output only. Eventing Runtime Data. */
  eventingRuntimeData?: GoogleCloudConnectorsV1EventingRuntimeData;
  /** Output only. Infra configs supported by Connector Version. */
  connectorVersionInfraConfig?: GoogleCloudConnectorsV1ConnectorVersionInfraConfig;
  /** Output only. Is trusted tester program enabled for the project. */
  isTrustedTester?: boolean;
  /** Optional. Auth override enabled for the connection. If Auth Override is enabled, Connection allows the backend service auth to be overridden in the entities/actions API. */
  authOverrideEnabled?: boolean;
  /** Output only. Billing config for the connection. */
  billingConfig?: GoogleCloudConnectorsV1BillingConfig;
  /** Optional. Async operations enabled for the connection. If Async Operations is enabled, Connection allows the customers to initiate async long running operations using the actions API. */
  asyncOperationsEnabled?: boolean;
  /** Output only. The name of the Hostname of the Service Directory service with TLS. */
  host?: string;
  /** Output only. The name of the Service Directory service with TLS. */
  tlsServiceDirectory?: string;
  /** Optional. Additional Oauth2.0 Auth config for EUA. If the connection is configured using non-OAuth authentication but OAuth needs to be used for EUA, this field can be populated with the OAuth config. This should be a OAuth2AuthCodeFlow Auth type only. */
  euaOauthAuthConfig?: GoogleCloudConnectorsV1AuthConfig;
  /** Optional. Traffic shaping configuration for the connection. */
  trafficShapingConfigs?: Array<GoogleCloudConnectorsV1TrafficShapingConfig>;
  /** Optional. Fallback on admin credentials for the connection. If this both auth_override_enabled and fallback_on_admin_credentials are set to true, the connection will use the admin credentials if the dynamic auth header is not present during auth override. */
  fallbackOnAdminCredentials?: boolean;
}

export const GoogleCloudConnectorsV1Connection: Schema.Schema<GoogleCloudConnectorsV1Connection> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  connectorVersion: Schema.optional(Schema.String),
  status: Schema.optional(GoogleCloudConnectorsV1ConnectionStatus),
  configVariables: Schema.optional(Schema.Array(GoogleCloudConnectorsV1ConfigVariable)),
  authConfig: Schema.optional(GoogleCloudConnectorsV1AuthConfig),
  lockConfig: Schema.optional(GoogleCloudConnectorsV1LockConfig),
  destinationConfigs: Schema.optional(Schema.Array(GoogleCloudConnectorsV1DestinationConfig)),
  imageLocation: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  serviceDirectory: Schema.optional(Schema.String),
  envoyImageLocation: Schema.optional(Schema.String),
  suspended: Schema.optional(Schema.Boolean),
  nodeConfig: Schema.optional(GoogleCloudConnectorsV1NodeConfig),
  logConfig: Schema.optional(GoogleCloudConnectorsV1LogConfig),
  sslConfig: Schema.optional(GoogleCloudConnectorsV1SslConfig),
  subscriptionType: Schema.optional(Schema.String),
  connectionRevision: Schema.optional(Schema.String),
  eventingEnablementType: Schema.optional(Schema.String),
  eventingConfig: Schema.optional(GoogleCloudConnectorsV1EventingConfig),
  connectorVersionLaunchStage: Schema.optional(Schema.String),
  eventingRuntimeData: Schema.optional(GoogleCloudConnectorsV1EventingRuntimeData),
  connectorVersionInfraConfig: Schema.optional(GoogleCloudConnectorsV1ConnectorVersionInfraConfig),
  isTrustedTester: Schema.optional(Schema.Boolean),
  authOverrideEnabled: Schema.optional(Schema.Boolean),
  billingConfig: Schema.optional(GoogleCloudConnectorsV1BillingConfig),
  asyncOperationsEnabled: Schema.optional(Schema.Boolean),
  host: Schema.optional(Schema.String),
  tlsServiceDirectory: Schema.optional(Schema.String),
  euaOauthAuthConfig: Schema.optional(GoogleCloudConnectorsV1AuthConfig),
  trafficShapingConfigs: Schema.optional(Schema.Array(GoogleCloudConnectorsV1TrafficShapingConfig)),
  fallbackOnAdminCredentials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudConnectorsV1Connection" }) as any as Schema.Schema<GoogleCloudConnectorsV1Connection>;

export interface GoogleCloudIntegrationsV1alphaListConnectionsResponse {
  /** Connections. */
  connections?: Array<GoogleCloudConnectorsV1Connection>;
  /** Next page token. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListConnectionsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  connections: Schema.optional(Schema.Array(GoogleCloudConnectorsV1Connection)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListConnectionsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListConnectionsResponse>;

export interface GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata {
  /** List of entity names. */
  entities?: Array<string>;
  /** List of actions. */
  actions?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata: Schema.Schema<GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(Schema.String)),
  actions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata>;

export interface GoogleCloudIntegrationsV1alphaRuntimeEntitySchema {
  /** Name of the entity. */
  entity?: string;
  /** List of fields in the entity. */
  fieldSchema?: string;
  /** The above schema, but for an array of the associated entity. */
  arrayFieldSchema?: string;
}

export const GoogleCloudIntegrationsV1alphaRuntimeEntitySchema: Schema.Schema<GoogleCloudIntegrationsV1alphaRuntimeEntitySchema> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(Schema.String),
  fieldSchema: Schema.optional(Schema.String),
  arrayFieldSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaRuntimeEntitySchema" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaRuntimeEntitySchema>;

export interface GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse {
  /** Runtime entity schemas. */
  runtimeEntitySchemas?: Array<GoogleCloudIntegrationsV1alphaRuntimeEntitySchema>;
  /** Next page token. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse> = Schema.suspend(() => Schema.Struct({
  runtimeEntitySchemas: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaRuntimeEntitySchema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse>;

export interface GoogleCloudIntegrationsV1alphaRuntimeActionSchema {
  /** Name of the action. */
  action?: string;
  /** Input parameter schema for the action. */
  inputSchema?: string;
  /** Output parameter schema for the action. */
  outputSchema?: string;
}

export const GoogleCloudIntegrationsV1alphaRuntimeActionSchema: Schema.Schema<GoogleCloudIntegrationsV1alphaRuntimeActionSchema> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  inputSchema: Schema.optional(Schema.String),
  outputSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaRuntimeActionSchema" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaRuntimeActionSchema>;

export interface GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse {
  /** Runtime action schemas. */
  runtimeActionSchemas?: Array<GoogleCloudIntegrationsV1alphaRuntimeActionSchema>;
  /** Next page token. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse> = Schema.suspend(() => Schema.Struct({
  runtimeActionSchemas: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaRuntimeActionSchema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse>;

export interface EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter {
  objectValue?: string;
}

export const EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter> = Schema.suspend(() => Schema.Struct({
  objectValue: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter>;

export interface EnterpriseCrmFrontendsEventbusProtoStringParameterArray {
  stringValues?: Array<string>;
}

export const EnterpriseCrmFrontendsEventbusProtoStringParameterArray: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoStringParameterArray> = Schema.suspend(() => Schema.Struct({
  stringValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoStringParameterArray" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoStringParameterArray>;

export interface EnterpriseCrmFrontendsEventbusProtoIntParameterArray {
  intValues?: Array<string>;
}

export const EnterpriseCrmFrontendsEventbusProtoIntParameterArray: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoIntParameterArray> = Schema.suspend(() => Schema.Struct({
  intValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoIntParameterArray" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoIntParameterArray>;

export interface EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray {
  doubleValues?: Array<number>;
}

export const EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray> = Schema.suspend(() => Schema.Struct({
  doubleValues: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray>;

export interface EnterpriseCrmFrontendsEventbusProtoProtoParameterArray {
  protoValues?: Array<Record<string, unknown>>;
}

export const EnterpriseCrmFrontendsEventbusProtoProtoParameterArray: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoProtoParameterArray> = Schema.suspend(() => Schema.Struct({
  protoValues: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoProtoParameterArray" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoProtoParameterArray>;

export interface EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray {
  booleanValues?: Array<boolean>;
}

export const EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray> = Schema.suspend(() => Schema.Struct({
  booleanValues: Schema.optional(Schema.Array(Schema.Boolean)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray>;

export interface EnterpriseCrmFrontendsEventbusProtoParameterValueType {
  stringValue?: string;
  intValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  protoValue?: Record<string, unknown>;
  serializedObjectValue?: EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter;
  stringArray?: EnterpriseCrmFrontendsEventbusProtoStringParameterArray;
  intArray?: EnterpriseCrmFrontendsEventbusProtoIntParameterArray;
  doubleArray?: EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray;
  protoArray?: EnterpriseCrmFrontendsEventbusProtoProtoParameterArray;
  booleanArray?: EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray;
  jsonValue?: string;
}

export const EnterpriseCrmFrontendsEventbusProtoParameterValueType: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterValueType> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  booleanValue: Schema.optional(Schema.Boolean),
  protoValue: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  serializedObjectValue: Schema.optional(EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter),
  stringArray: Schema.optional(EnterpriseCrmFrontendsEventbusProtoStringParameterArray),
  intArray: Schema.optional(EnterpriseCrmFrontendsEventbusProtoIntParameterArray),
  doubleArray: Schema.optional(EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray),
  protoArray: Schema.optional(EnterpriseCrmFrontendsEventbusProtoProtoParameterArray),
  booleanArray: Schema.optional(EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray),
  jsonValue: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParameterValueType" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterValueType>;

export interface EnterpriseCrmFrontendsEventbusProtoParameterEntry {
  /** Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition. */
  key?: string;
  /** Values for the defined keys. Each value can either be string, int, double or any proto message. */
  value?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
  /** Explicitly getting the type of the parameter. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
  /** True if this parameter should be masked in the logs */
  masked?: boolean;
}

export const EnterpriseCrmFrontendsEventbusProtoParameterEntry: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParameterValueType),
  dataType: Schema.optional(Schema.String),
  masked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParameterEntry" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;

export interface EnterpriseCrmEventbusProtoFailurePolicy {
  /** Defines what happens to the task upon failure. */
  retryStrategy?: "UNSPECIFIED" | "IGNORE" | "NONE" | "FATAL" | "FIXED_INTERVAL" | "LINEAR_BACKOFF" | "EXPONENTIAL_BACKOFF" | "RESTART_WORKFLOW_WITH_BACKOFF" | (string & {});
  /** Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed. */
  maxNumRetries?: number;
  /** Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff. */
  intervalInSeconds?: string;
  /** Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy. */
  retryCondition?: string;
}

export const EnterpriseCrmEventbusProtoFailurePolicy: Schema.Schema<EnterpriseCrmEventbusProtoFailurePolicy> = Schema.suspend(() => Schema.Struct({
  retryStrategy: Schema.optional(Schema.String),
  maxNumRetries: Schema.optional(Schema.Number),
  intervalInSeconds: Schema.optional(Schema.String),
  retryCondition: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoFailurePolicy" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoFailurePolicy>;

export interface EnterpriseCrmEventbusProtoConditionalFailurePolicies {
  /** The list of failure policies that will be applied to the task in order. */
  failurePolicies?: Array<EnterpriseCrmEventbusProtoFailurePolicy>;
  /** The default failure policy to be applied if no conditional failure policy matches */
  defaultFailurePolicy?: EnterpriseCrmEventbusProtoFailurePolicy;
}

export const EnterpriseCrmEventbusProtoConditionalFailurePolicies: Schema.Schema<EnterpriseCrmEventbusProtoConditionalFailurePolicies> = Schema.suspend(() => Schema.Struct({
  failurePolicies: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoFailurePolicy)),
  defaultFailurePolicy: Schema.optional(EnterpriseCrmEventbusProtoFailurePolicy),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoConditionalFailurePolicies" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoConditionalFailurePolicies>;

export interface EnterpriseCrmEventbusProtoStringArray {
  values?: Array<string>;
}

export const EnterpriseCrmEventbusProtoStringArray: Schema.Schema<EnterpriseCrmEventbusProtoStringArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoStringArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoStringArray>;

export interface EnterpriseCrmEventbusProtoIntArray {
  values?: Array<string>;
}

export const EnterpriseCrmEventbusProtoIntArray: Schema.Schema<EnterpriseCrmEventbusProtoIntArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoIntArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoIntArray>;

export interface EnterpriseCrmEventbusProtoDoubleArray {
  values?: Array<number>;
}

export const EnterpriseCrmEventbusProtoDoubleArray: Schema.Schema<EnterpriseCrmEventbusProtoDoubleArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoDoubleArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoDoubleArray>;

export interface EnterpriseCrmEventbusProtoValueType {
  stringValue?: string;
  intValue?: string;
  doubleValue?: number;
  protoValue?: Record<string, unknown>;
  stringArray?: EnterpriseCrmEventbusProtoStringArray;
  intArray?: EnterpriseCrmEventbusProtoIntArray;
  doubleArray?: EnterpriseCrmEventbusProtoDoubleArray;
  booleanValue?: boolean;
}

export const EnterpriseCrmEventbusProtoValueType: Schema.Schema<EnterpriseCrmEventbusProtoValueType> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  protoValue: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  stringArray: Schema.optional(EnterpriseCrmEventbusProtoStringArray),
  intArray: Schema.optional(EnterpriseCrmEventbusProtoIntArray),
  doubleArray: Schema.optional(EnterpriseCrmEventbusProtoDoubleArray),
  booleanValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoValueType" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoValueType>;

export interface EnterpriseCrmEventbusProtoCondition {
  /** Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown. */
  eventPropertyKey?: string;
  /** Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair. */
  operator?: "UNSET" | "EQUALS" | "CONTAINS" | "LESS_THAN" | "GREATER_THAN" | "EXISTS" | "DOES_NOT_EXIST" | "IS_EMPTY" | "IS_NOT_EMPTY" | (string & {});
  /** Value that's checked for the key. */
  value?: EnterpriseCrmEventbusProtoValueType;
}

export const EnterpriseCrmEventbusProtoCondition: Schema.Schema<EnterpriseCrmEventbusProtoCondition> = Schema.suspend(() => Schema.Struct({
  eventPropertyKey: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
  value: Schema.optional(EnterpriseCrmEventbusProtoValueType),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCondition" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCondition>;

export interface EnterpriseCrmEventbusProtoCombinedCondition {
  /** A set of individual constituent conditions. */
  conditions?: Array<EnterpriseCrmEventbusProtoCondition>;
}

export const EnterpriseCrmEventbusProtoCombinedCondition: Schema.Schema<EnterpriseCrmEventbusProtoCombinedCondition> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoCondition)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCombinedCondition" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCombinedCondition>;

export interface EnterpriseCrmEventbusProtoNextTask {
  /** ID of the next task. */
  taskConfigId?: string;
  /** Task number of the next task. */
  taskNumber?: string;
  /** Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition` */
  combinedConditions?: Array<EnterpriseCrmEventbusProtoCombinedCondition>;
  /** Standard filter expression for this task to become an eligible next task. */
  condition?: string;
  /** User-provided label that is attached to this edge in the UI. */
  label?: string;
  /** User-provided description intended to give more business context about the next task edge or condition. */
  description?: string;
}

export const EnterpriseCrmEventbusProtoNextTask: Schema.Schema<EnterpriseCrmEventbusProtoNextTask> = Schema.suspend(() => Schema.Struct({
  taskConfigId: Schema.optional(Schema.String),
  taskNumber: Schema.optional(Schema.String),
  combinedConditions: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoCombinedCondition)),
  condition: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoNextTask" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoNextTask>;

export interface EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue {
  absolute?: string;
  percentage?: number;
}

export const EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue: Schema.Schema<EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue> = Schema.suspend(() => Schema.Struct({
  absolute: Schema.optional(Schema.String),
  percentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue>;

export interface EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList {
  enumStrings?: Array<string>;
  filterType?: "DEFAULT_INCLUSIVE" | "EXCLUSIVE" | (string & {});
}

export const EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList: Schema.Schema<EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList> = Schema.suspend(() => Schema.Struct({
  enumStrings: Schema.optional(Schema.Array(Schema.String)),
  filterType: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList>;

export interface EnterpriseCrmEventbusProtoTaskAlertConfig {
  /** A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique in within the scope of the containing workflow. */
  alertName?: string;
  metricType?: "METRIC_TYPE_UNSPECIFIED" | "TASK_ERROR_RATE" | "TASK_WARNING_RATE" | "TASK_RATE" | "TASK_AVERAGE_DURATION" | "TASK_PERCENTILE_DURATION" | (string & {});
  /** The threshold type for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired. */
  thresholdType?: "UNSPECIFIED_THRESHOLD_TYPE" | "EXPECTED_MIN" | "EXPECTED_MAX" | (string & {});
  /** The metric value, above or below which the alert should be triggered. */
  thresholdValue?: EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue;
  /** Should be specified only for TASK_AVERAGE_DURATION and TASK_PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger. */
  durationThresholdMs?: string;
  errorEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
  warningEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
  /** The period over which the metric value should be aggregated and evaluated. Format is , where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). */
  aggregationPeriod?: string;
  /** For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired. */
  numAggregationPeriods?: number;
  /** Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert. */
  alertDisabled?: boolean;
  /** Only count final task attempts, not retries. */
  onlyFinalAttempt?: boolean;
  /** Link to a playbook for resolving the issue that triggered this alert. */
  playbookUrl?: string;
  /** Client associated with this alert configuration. Must be a client enabled in one of the containing workflow's triggers. */
  clientId?: string;
}

export const EnterpriseCrmEventbusProtoTaskAlertConfig: Schema.Schema<EnterpriseCrmEventbusProtoTaskAlertConfig> = Schema.suspend(() => Schema.Struct({
  alertName: Schema.optional(Schema.String),
  metricType: Schema.optional(Schema.String),
  thresholdType: Schema.optional(Schema.String),
  thresholdValue: Schema.optional(EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue),
  durationThresholdMs: Schema.optional(Schema.String),
  errorEnumList: Schema.optional(EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList),
  warningEnumList: Schema.optional(EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList),
  aggregationPeriod: Schema.optional(Schema.String),
  numAggregationPeriods: Schema.optional(Schema.Number),
  alertDisabled: Schema.optional(Schema.Boolean),
  onlyFinalAttempt: Schema.optional(Schema.Boolean),
  playbookUrl: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskAlertConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskAlertConfig>;

export interface EnterpriseCrmFrontendsEventbusProtoEventParameters {
  /** Parameters are a part of Event and can be used to communicate between different tasks that are part of the same workflow execution. */
  parameters?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
}

export const EnterpriseCrmFrontendsEventbusProtoEventParameters: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventParameters> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoEventParameters" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventParameters>;

export interface EnterpriseCrmFrontendsEventbusProtoRollbackStrategy {
  /** Required. This is the name of the task that needs to be executed upon rollback of this task. */
  rollbackTaskImplementationClassName?: string;
  /** Optional. The customized parameters the user can pass to this task. */
  parameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** Required. These are the tasks numbers of the tasks whose `rollback_strategy.rollback_task_implementation_class_name` needs to be executed upon failure of this task. */
  taskNumbersToRollback?: Array<string>;
}

export const EnterpriseCrmFrontendsEventbusProtoRollbackStrategy: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoRollbackStrategy> = Schema.suspend(() => Schema.Struct({
  rollbackTaskImplementationClassName: Schema.optional(Schema.String),
  parameters: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  taskNumbersToRollback: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoRollbackStrategy" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoRollbackStrategy>;

export interface EnterpriseCrmEventbusProtoCoordinate {
  x?: number;
  y?: number;
}

export const EnterpriseCrmEventbusProtoCoordinate: Schema.Schema<EnterpriseCrmEventbusProtoCoordinate> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCoordinate" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCoordinate>;

export interface EnterpriseCrmEventbusProtoSuccessPolicy {
  /** State to which the execution snapshot status will be set if the task succeeds. */
  finalState?: "UNSPECIFIED" | "SUCCEEDED" | "SUSPENDED" | (string & {});
}

export const EnterpriseCrmEventbusProtoSuccessPolicy: Schema.Schema<EnterpriseCrmEventbusProtoSuccessPolicy> = Schema.suspend(() => Schema.Struct({
  finalState: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuccessPolicy" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuccessPolicy>;

export interface EnterpriseCrmEventbusProtoTaskMetadataAdmin {
  userEmail?: string;
  googleGroupEmail?: string;
}

export const EnterpriseCrmEventbusProtoTaskMetadataAdmin: Schema.Schema<EnterpriseCrmEventbusProtoTaskMetadataAdmin> = Schema.suspend(() => Schema.Struct({
  userEmail: Schema.optional(Schema.String),
  googleGroupEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskMetadataAdmin" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskMetadataAdmin>;

export interface EnterpriseCrmEventbusProtoTaskMetadata {
  admins?: Array<EnterpriseCrmEventbusProtoTaskMetadataAdmin>;
  /** The actual class name or the annotated name of the task. Task Author should initialize this field with value from the getName() method of the Task class. */
  name?: string;
  /** The string name to show on the task list on the Workflow editor screen. This should be a very short, one to two words name for the task. (e.g. "Send Mail") */
  descriptiveName?: string;
  /** In a few sentences, describe the purpose and usage of the task. */
  description?: string;
  /** Contains the initial configuration of the task with default values set. For now, The string should be compatible to an ASCII-proto format. */
  defaultSpec?: string;
  /** URL to the associated G3 Doc for the task if available */
  g3DocLink?: string;
  /** URL to gstatic image icon for this task. This icon shows up on the task list panel along with the task name in the Workflow Editor screen. Use the 24p, 2x, gray color icon image format. */
  iconLink?: string;
  /** Allows author to indicate if the task is ready to use or not. If not set, then it will default to INACTIVE. */
  status?: "UNSPECIFIED_STATUS" | "DEFAULT_INACTIVE" | "ACTIVE" | (string & {});
  /** The Code Search link to the Task Java file. */
  codeSearchLink?: string;
  /** The deprecation status of the current task. Default value is false; */
  isDeprecated?: boolean;
  /** The new task name to replace the current task if it is deprecated. Otherwise, it is the same as the current task name. */
  activeTaskName?: string;
  /** Snippet of markdown documentation to embed in the RHP for this task. */
  docMarkdown?: string;
  category?: "UNSPECIFIED_CATEGORY" | "CUSTOM" | "FLOW_CONTROL" | "DATA_MANIPULATION" | "SCRIPTING" | "CONNECTOR" | "HIDDEN" | "CLOUD_SYSTEMS" | "CUSTOM_TASK_TEMPLATE" | "TASK_RECOMMENDATIONS" | (string & {});
  system?: "UNSPECIFIED_SYSTEM" | "GENERIC" | "BUGANIZER" | "SALESFORCE" | "CLOUD_SQL" | "PLX" | "SHEETS" | "GOOGLE_GROUPS" | "EMAIL" | "SPANNER" | "DATA_BRIDGE" | (string & {});
  /** Controls whether JSON workflow parameters are validated against provided schemas before and/or after this task's execution. */
  defaultJsonValidationOption?: "UNSPECIFIED_JSON_VALIDATION_OPTION" | "SKIP" | "PRE_EXECUTION" | "POST_EXECUTION" | "PRE_POST_EXECUTION" | (string & {});
  /** A set of tags that pertain to a particular task. This can be used to improve the searchability of tasks with several names ("REST Caller" vs. "Call REST Endpoint") or to help users find tasks based on related words. */
  tags?: Array<string>;
  externalCategory?: "UNSPECIFIED_EXTERNAL_CATEGORY" | "CORE" | "CONNECTORS" | "EXTERNAL_HTTP" | "EXTERNAL_INTEGRATION_SERVICES" | "EXTERNAL_CUSTOMER_ACTIONS" | "EXTERNAL_FLOW_CONTROL" | "EXTERNAL_WORKSPACE" | "EXTERNAL_SECURITY" | "EXTERNAL_DATABASES" | "EXTERNAL_ANALYTICS" | "EXTERNAL_BYOC" | "EXTERNAL_BYOT" | "EXTERNAL_ARTIFICIAL_INTELIGENCE" | "EXTERNAL_DATA_MANIPULATION" | (string & {});
  /** Sequence with which the task in specific category to be displayed in task discovery panel for external users. */
  externalCategorySequence?: number;
  /** DEPRECATED: Use external_doc_html. */
  externalDocMarkdown?: string;
  /** External-facing documention embedded in the RHP for this task. */
  externalDocHtml?: string;
  /** External-facing documention for standalone IP in pantheon embedded in the RHP for this task. Non null only if different from external_doc_html */
  standaloneExternalDocHtml?: string;
  /** Doc link for external-facing documentation (separate from g3doc). */
  externalDocLink?: string;
}

export const EnterpriseCrmEventbusProtoTaskMetadata: Schema.Schema<EnterpriseCrmEventbusProtoTaskMetadata> = Schema.suspend(() => Schema.Struct({
  admins: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTaskMetadataAdmin)),
  name: Schema.optional(Schema.String),
  descriptiveName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  defaultSpec: Schema.optional(Schema.String),
  g3DocLink: Schema.optional(Schema.String),
  iconLink: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  codeSearchLink: Schema.optional(Schema.String),
  isDeprecated: Schema.optional(Schema.Boolean),
  activeTaskName: Schema.optional(Schema.String),
  docMarkdown: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  system: Schema.optional(Schema.String),
  defaultJsonValidationOption: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  externalCategory: Schema.optional(Schema.String),
  externalCategorySequence: Schema.optional(Schema.Number),
  externalDocMarkdown: Schema.optional(Schema.String),
  externalDocHtml: Schema.optional(Schema.String),
  standaloneExternalDocHtml: Schema.optional(Schema.String),
  externalDocLink: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskMetadata" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskMetadata>;

export interface EnterpriseCrmEventbusStatsDimensions {
  /** Stats have been or will be aggregated on set fields for any semantically-meaningful combination. */
  triggerId?: string;
  clientId?: string;
  workflowName?: string;
  workflowId?: string;
  taskName?: string;
  taskNumber?: string;
  errorEnumString?: string;
  warningEnumString?: string;
  retryAttempt?: "UNSPECIFIED" | "FINAL" | "RETRYABLE" | "CANCELED" | (string & {});
  /** Whether to include or exclude the enums matching the regex. */
  enumFilterType?: "DEFAULT_INCLUSIVE" | "EXCLUSIVE" | (string & {});
}

export const EnterpriseCrmEventbusStatsDimensions: Schema.Schema<EnterpriseCrmEventbusStatsDimensions> = Schema.suspend(() => Schema.Struct({
  triggerId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  workflowName: Schema.optional(Schema.String),
  workflowId: Schema.optional(Schema.String),
  taskName: Schema.optional(Schema.String),
  taskNumber: Schema.optional(Schema.String),
  errorEnumString: Schema.optional(Schema.String),
  warningEnumString: Schema.optional(Schema.String),
  retryAttempt: Schema.optional(Schema.String),
  enumFilterType: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusStatsDimensions" }) as any as Schema.Schema<EnterpriseCrmEventbusStatsDimensions>;

export interface EnterpriseCrmEventbusStats {
  /** Dimensions that these stats have been aggregated on. */
  dimensions?: EnterpriseCrmEventbusStatsDimensions;
  /** Queries per second. */
  qps?: number;
  /** Average duration in seconds. */
  durationInSeconds?: number;
  /** Average error rate. */
  errorRate?: number;
  /** Average warning rate. */
  warningRate?: number;
}

export const EnterpriseCrmEventbusStats: Schema.Schema<EnterpriseCrmEventbusStats> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(EnterpriseCrmEventbusStatsDimensions),
  qps: Schema.optional(Schema.Number),
  durationInSeconds: Schema.optional(Schema.Number),
  errorRate: Schema.optional(Schema.Number),
  warningRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseCrmEventbusStats" }) as any as Schema.Schema<EnterpriseCrmEventbusStats>;

export interface EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition {
  /** Path to the proto file that contains the message type's definition. */
  path?: string;
  /** The fully-qualified proto name. This message, for example, would be "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition". */
  fullName?: string;
}

export const EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition: Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition>;

export interface EnterpriseCrmEventbusProtoParamSpecEntryConfig {
  /** A short phrase to describe what this parameter contains. */
  descriptivePhrase?: string;
  /** A user-friendly label for the parameter. */
  label?: string;
  /** Detailed help text for this parameter containing information not provided elsewhere. For example, instructions on how to migrate from a deprecated parameter. */
  helpText?: string;
  /** Placeholder text which will appear in the UI input form for this parameter. */
  uiPlaceholderText?: string;
  inputDisplayOption?: "DEFAULT" | "STRING_MULTI_LINE" | "NUMBER_SLIDER" | "BOOLEAN_TOGGLE" | (string & {});
  /** A user-friendly label for subSection under which the parameter will be displayed. */
  subSectionLabel?: string;
  parameterNameOption?: "DEFAULT_NOT_PARAMETER_NAME" | "IS_PARAMETER_NAME" | "KEY_IS_PARAMETER_NAME" | "VALUE_IS_PARAMETER_NAME" | (string & {});
  /** Whether this field is hidden in the UI. */
  isHidden?: boolean;
  /** Whether the default value is hidden in the UI. */
  hideDefaultValue?: boolean;
}

export const EnterpriseCrmEventbusProtoParamSpecEntryConfig: Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryConfig> = Schema.suspend(() => Schema.Struct({
  descriptivePhrase: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  helpText: Schema.optional(Schema.String),
  uiPlaceholderText: Schema.optional(Schema.String),
  inputDisplayOption: Schema.optional(Schema.String),
  subSectionLabel: Schema.optional(Schema.String),
  parameterNameOption: Schema.optional(Schema.String),
  isHidden: Schema.optional(Schema.Boolean),
  hideDefaultValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParamSpecEntryConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryConfig>;

export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange {
  /** The inclusive minimum of the acceptable range. */
  min?: string;
  /** The inclusive maximum of the acceptable range. */
  max?: string;
}

export const EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange: Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.String),
  max: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange>;

export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange {
  /** The inclusive minimum of the acceptable range. */
  min?: number;
  /** The inclusive maximum of the acceptable range. */
  max?: number;
}

export const EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange: Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange>;

export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex {
  /** The regex applied to the input value(s). */
  regex?: string;
  /** Whether the regex matcher is applied exclusively (if true, matching values will be rejected). */
  exclusive?: boolean;
}

export const EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex: Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex> = Schema.suspend(() => Schema.Struct({
  regex: Schema.optional(Schema.String),
  exclusive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex>;

export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRule {
  intRange?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange;
  doubleRange?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange;
  stringRegex?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex;
}

export const EnterpriseCrmEventbusProtoParamSpecEntryValidationRule: Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRule> = Schema.suspend(() => Schema.Struct({
  intRange: Schema.optional(EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange),
  doubleRange: Schema.optional(EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange),
  stringRegex: Schema.optional(EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParamSpecEntryValidationRule" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParamSpecEntryValidationRule>;

export interface EnterpriseCrmFrontendsEventbusProtoParamSpecEntry {
  /** Key is used to retrieve the corresponding parameter value. This should be unique for a given task. These parameters must be predefined in the workflow definition. */
  key?: string;
  /** The data type of the parameter. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
  /** Populated if this represents a proto or proto array. */
  protoDef?: EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition;
  /** The FQCN of the Java object this represents. A string, for example, would be "java.lang.String". If this is "java.lang.Object", the parameter can be of any type. */
  className?: string;
  /** If it is a collection of objects, this would be the FCQN of every individual element in the collection. If this is "java.lang.Object", the parameter is a collection of any type. */
  collectionElementClassName?: string;
  /** If the data_type is JSON_VALUE, then this will define its schema. */
  jsonSchema?: string;
  /** Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. */
  defaultValue?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
  isOutput?: boolean;
  /** Optional fields, such as help text and other useful info. */
  config?: EnterpriseCrmEventbusProtoParamSpecEntryConfig;
  /** If set, the user must provide an input value for this parameter. */
  required?: boolean;
  /** If set, this entry is deprecated, so further use of this parameter should be prohibited. */
  isDeprecated?: boolean;
  /** Rule used to validate inputs (individual values and collection elements) for this parameter. */
  validationRule?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRule;
}

export const EnterpriseCrmFrontendsEventbusProtoParamSpecEntry: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParamSpecEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  protoDef: Schema.optional(EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition),
  className: Schema.optional(Schema.String),
  collectionElementClassName: Schema.optional(Schema.String),
  jsonSchema: Schema.optional(Schema.String),
  defaultValue: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParameterValueType),
  isOutput: Schema.optional(Schema.Boolean),
  config: Schema.optional(EnterpriseCrmEventbusProtoParamSpecEntryConfig),
  required: Schema.optional(Schema.Boolean),
  isDeprecated: Schema.optional(Schema.Boolean),
  validationRule: Schema.optional(EnterpriseCrmEventbusProtoParamSpecEntryValidationRule),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParamSpecEntry" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParamSpecEntry>;

export interface EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage {
  parameters?: Array<EnterpriseCrmFrontendsEventbusProtoParamSpecEntry>;
}

export const EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParamSpecEntry)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage>;

export interface EnterpriseCrmEventbusProtoTaskUiModuleConfig {
  /** ID of the config module. */
  moduleId?: "UNSPECIFIED_TASK_MODULE" | "LABEL" | "ERROR_HANDLING" | "TASK_PARAM_TABLE" | "TASK_PARAM_FORM" | "PRECONDITION" | "SCRIPT_EDITOR" | "RPC" | "TASK_SUMMARY" | "SUSPENSION" | "RPC_TYPED" | "SUB_WORKFLOW" | "APPS_SCRIPT_NAVIGATOR" | "SUB_WORKFLOW_FOR_EACH_LOOP" | "FIELD_MAPPING" | "README" | "REST_CALLER" | "SUB_WORKFLOW_SCATTER_GATHER" | "CLOUD_SQL" | "GENERIC_CONNECTOR_TASK" | (string & {});
}

export const EnterpriseCrmEventbusProtoTaskUiModuleConfig: Schema.Schema<EnterpriseCrmEventbusProtoTaskUiModuleConfig> = Schema.suspend(() => Schema.Struct({
  moduleId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskUiModuleConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskUiModuleConfig>;

export interface EnterpriseCrmEventbusProtoTaskUiConfig {
  /** Configurations of included config modules. */
  taskUiModuleConfigs?: Array<EnterpriseCrmEventbusProtoTaskUiModuleConfig>;
}

export const EnterpriseCrmEventbusProtoTaskUiConfig: Schema.Schema<EnterpriseCrmEventbusProtoTaskUiConfig> = Schema.suspend(() => Schema.Struct({
  taskUiModuleConfigs: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTaskUiModuleConfig)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskUiConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskUiConfig>;

export interface EnterpriseCrmFrontendsEventbusProtoTaskEntity {
  /** Metadata inclueds the task name, author and so on. */
  metadata?: EnterpriseCrmEventbusProtoTaskMetadata;
  /** Deprecated - statistics from the Monarch query. */
  stats?: EnterpriseCrmEventbusStats;
  /** Declarations for inputs/outputs for a TypedTask. This is also associated with the METADATA mask. */
  paramSpecs?: EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage;
  /** UI configuration for this task Also associated with the METADATA mask. */
  uiConfig?: EnterpriseCrmEventbusProtoTaskUiConfig;
  /** Defines the type of the task */
  taskType?: "TASK" | "ASIS_TEMPLATE" | "IO_TEMPLATE" | (string & {});
  /** True if the task has conflict with vpcsc */
  disabledForVpcSc?: boolean;
}

export const EnterpriseCrmFrontendsEventbusProtoTaskEntity: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTaskEntity> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(EnterpriseCrmEventbusProtoTaskMetadata),
  stats: Schema.optional(EnterpriseCrmEventbusStats),
  paramSpecs: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage),
  uiConfig: Schema.optional(EnterpriseCrmEventbusProtoTaskUiConfig),
  taskType: Schema.optional(Schema.String),
  disabledForVpcSc: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoTaskEntity" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTaskEntity>;

export interface EnterpriseCrmFrontendsEventbusProtoTaskConfig {
  /** The name for the task. */
  taskName?: string;
  /** REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`). */
  taskNumber?: string;
  /** The customized parameters the user can pass to this task. */
  parameters?: Record<string, EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  /** A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field. */
  taskSpec?: string;
  /** The creator's email address. Auto-generated from the user's email. */
  creatorEmail?: string;
  /** Auto-generated. */
  createTime?: string;
  /** Auto-generated. */
  lastModifiedTime?: string;
  /** Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.). */
  failurePolicy?: EnterpriseCrmEventbusProtoFailurePolicy;
  /** Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post). */
  synchronousCallFailurePolicy?: EnterpriseCrmEventbusProtoFailurePolicy;
  /** Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post). */
  conditionalFailurePolicies?: EnterpriseCrmEventbusProtoConditionalFailurePolicies;
  /** The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true. */
  nextTasks?: Array<EnterpriseCrmEventbusProtoNextTask>;
  /** The policy dictating the execution of the next set of tasks for the current task. */
  nextTasksExecutionPolicy?: "UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH" | (string & {});
  /** Alert configurations on error rate, warning rate, number of runs, durations, etc. */
  alertConfigs?: Array<EnterpriseCrmEventbusProtoTaskAlertConfig>;
  /** Optional. Contains information about what needs to be done upon failure (either a permanent error or after it has been retried too many times). */
  rollbackStrategy?: EnterpriseCrmFrontendsEventbusProtoRollbackStrategy;
  /** Optional. Informs the front-end application where to draw this task config on the UI. */
  position?: EnterpriseCrmEventbusProtoCoordinate;
  /** The policy dictating the execution strategy of this task. */
  taskExecutionStrategy?: "WHEN_ALL_SUCCEED" | "WHEN_ANY_SUCCEED" | "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED" | (string & {});
  /** User-provided label that is attached to this TaskConfig in the UI. */
  label?: string;
  /** The number of edges leading into this TaskConfig. */
  incomingEdgeCount?: number;
  /** Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task. */
  precondition?: string;
  /** Optional. User-provided label that is attached to precondition in the UI. */
  preconditionLabel?: string;
  /** If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter. */
  disableStrictTypeValidation?: boolean;
  /** Determines what action to take upon successful task completion. */
  successPolicy?: EnterpriseCrmEventbusProtoSuccessPolicy;
  /** Copy of the task entity that this task config is an instance of. */
  taskEntity?: EnterpriseCrmFrontendsEventbusProtoTaskEntity;
  /** If set, overrides the option configured in the Task implementation class. */
  jsonValidationOption?: "UNSPECIFIED_JSON_VALIDATION_OPTION" | "SKIP" | "PRE_EXECUTION" | "POST_EXECUTION" | "PRE_POST_EXECUTION" | (string & {});
  /** Defines the type of the task */
  taskType?: "TASK" | "ASIS_TEMPLATE" | "IO_TEMPLATE" | (string & {});
  /** User-provided description intended to give more business context about the task. */
  description?: string;
  /** Used to define task-template name if task is of type task-template */
  taskTemplateName?: string;
  /** Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task */
  errorCatcherId?: string;
  externalTaskType?: "EXTERNAL_TASK_TYPE_UNSPECIFIED" | "NORMAL_TASK" | "ERROR_TASK" | (string & {});
}

export const EnterpriseCrmFrontendsEventbusProtoTaskConfig: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTaskConfig> = Schema.suspend(() => Schema.Struct({
  taskName: Schema.optional(Schema.String),
  taskNumber: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  taskSpec: Schema.optional(Schema.String),
  creatorEmail: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  failurePolicy: Schema.optional(EnterpriseCrmEventbusProtoFailurePolicy),
  synchronousCallFailurePolicy: Schema.optional(EnterpriseCrmEventbusProtoFailurePolicy),
  conditionalFailurePolicies: Schema.optional(EnterpriseCrmEventbusProtoConditionalFailurePolicies),
  nextTasks: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoNextTask)),
  nextTasksExecutionPolicy: Schema.optional(Schema.String),
  alertConfigs: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTaskAlertConfig)),
  rollbackStrategy: Schema.optional(EnterpriseCrmFrontendsEventbusProtoRollbackStrategy),
  position: Schema.optional(EnterpriseCrmEventbusProtoCoordinate),
  taskExecutionStrategy: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  incomingEdgeCount: Schema.optional(Schema.Number),
  precondition: Schema.optional(Schema.String),
  preconditionLabel: Schema.optional(Schema.String),
  disableStrictTypeValidation: Schema.optional(Schema.Boolean),
  successPolicy: Schema.optional(EnterpriseCrmEventbusProtoSuccessPolicy),
  taskEntity: Schema.optional(EnterpriseCrmFrontendsEventbusProtoTaskEntity),
  jsonValidationOption: Schema.optional(Schema.String),
  taskType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  taskTemplateName: Schema.optional(Schema.String),
  errorCatcherId: Schema.optional(Schema.String),
  externalTaskType: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoTaskConfig" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTaskConfig>;

export interface GoogleCloudIntegrationsV1alphaEventParameter {
  /** Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. */
  key?: string;
  /** Values for the defined keys. Each value can either be string, int, double or any proto message. */
  value?: GoogleCloudIntegrationsV1alphaValueType;
  /** True if this parameter should be masked in the logs */
  masked?: boolean;
}

export const GoogleCloudIntegrationsV1alphaEventParameter: Schema.Schema<GoogleCloudIntegrationsV1alphaEventParameter> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(GoogleCloudIntegrationsV1alphaValueType),
  masked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaEventParameter" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaEventParameter>;

export interface GoogleCloudIntegrationsV1alphaFailurePolicy {
  /** Defines what happens to the task upon failure. */
  retryStrategy?: "RETRY_STRATEGY_UNSPECIFIED" | "IGNORE" | "NONE" | "FATAL" | "FIXED_INTERVAL" | "LINEAR_BACKOFF" | "EXPONENTIAL_BACKOFF" | "RESTART_INTEGRATION_WITH_BACKOFF" | (string & {});
  /** Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed. */
  maxRetries?: number;
  /** Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff. */
  intervalTime?: string;
  /** Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy. */
  condition?: string;
}

export const GoogleCloudIntegrationsV1alphaFailurePolicy: Schema.Schema<GoogleCloudIntegrationsV1alphaFailurePolicy> = Schema.suspend(() => Schema.Struct({
  retryStrategy: Schema.optional(Schema.String),
  maxRetries: Schema.optional(Schema.Number),
  intervalTime: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaFailurePolicy" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaFailurePolicy>;

export interface GoogleCloudIntegrationsV1alphaConditionalFailurePolicies {
  /** The list of failure policies that will be applied to the task in order. */
  failurePolicies?: Array<GoogleCloudIntegrationsV1alphaFailurePolicy>;
  /** The default failure policy to be applied if no conditional failure policy matches. */
  defaultFailurePolicy?: GoogleCloudIntegrationsV1alphaFailurePolicy;
}

export const GoogleCloudIntegrationsV1alphaConditionalFailurePolicies: Schema.Schema<GoogleCloudIntegrationsV1alphaConditionalFailurePolicies> = Schema.suspend(() => Schema.Struct({
  failurePolicies: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaFailurePolicy)),
  defaultFailurePolicy: Schema.optional(GoogleCloudIntegrationsV1alphaFailurePolicy),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaConditionalFailurePolicies" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaConditionalFailurePolicies>;

export interface GoogleCloudIntegrationsV1alphaNextTask {
  /** ID of the next task. */
  taskConfigId?: string;
  /** Task number of the next task. */
  taskId?: string;
  /** Standard filter expression for this task to become an eligible next task. */
  condition?: string;
  /** User-provided label that is attached to this edge in the UI. */
  displayName?: string;
  /** User-provided description intended to give additional business context about the task. */
  description?: string;
}

export const GoogleCloudIntegrationsV1alphaNextTask: Schema.Schema<GoogleCloudIntegrationsV1alphaNextTask> = Schema.suspend(() => Schema.Struct({
  taskConfigId: Schema.optional(Schema.String),
  taskId: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaNextTask" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaNextTask>;

export interface GoogleCloudIntegrationsV1alphaSuccessPolicy {
  /** State to which the execution snapshot status will be set if the task succeeds. */
  finalState?: "FINAL_STATE_UNSPECIFIED" | "SUCCEEDED" | "SUSPENDED" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaSuccessPolicy: Schema.Schema<GoogleCloudIntegrationsV1alphaSuccessPolicy> = Schema.suspend(() => Schema.Struct({
  finalState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSuccessPolicy" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSuccessPolicy>;

export interface GoogleCloudIntegrationsV1alphaCoordinate {
  /** Required. X axis of the coordinate */
  x?: number;
  /** Required. Y axis of the coordinate */
  y?: number;
}

export const GoogleCloudIntegrationsV1alphaCoordinate: Schema.Schema<GoogleCloudIntegrationsV1alphaCoordinate> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCoordinate" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCoordinate>;

export interface GoogleCloudIntegrationsV1alphaTaskConfig {
  /** Optional. The name for the task. */
  task?: string;
  /** Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`). */
  taskId?: string;
  /** Optional. The customized parameters the user can pass to this task. */
  parameters?: Record<string, GoogleCloudIntegrationsV1alphaEventParameter>;
  /** Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.). */
  failurePolicy?: GoogleCloudIntegrationsV1alphaFailurePolicy;
  /** Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post). */
  synchronousCallFailurePolicy?: GoogleCloudIntegrationsV1alphaFailurePolicy;
  /** Optional. The list of conditional failure policies that will be applied to the task in order. */
  conditionalFailurePolicies?: GoogleCloudIntegrationsV1alphaConditionalFailurePolicies;
  /** Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true. */
  nextTasks?: Array<GoogleCloudIntegrationsV1alphaNextTask>;
  /** Optional. The policy dictating the execution of the next set of tasks for the current task. */
  nextTasksExecutionPolicy?: "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH" | (string & {});
  /** Optional. The policy dictating the execution strategy of this task. */
  taskExecutionStrategy?: "TASK_EXECUTION_STRATEGY_UNSPECIFIED" | "WHEN_ALL_SUCCEED" | "WHEN_ANY_SUCCEED" | "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED" | (string & {});
  /** Optional. User-provided label that is attached to this TaskConfig in the UI. */
  displayName?: string;
  /** Optional. Determines what action to take upon successful task completion. */
  successPolicy?: GoogleCloudIntegrationsV1alphaSuccessPolicy;
  /** Optional. If set, overrides the option configured in the Task implementation class. */
  jsonValidationOption?: "JSON_VALIDATION_OPTION_UNSPECIFIED" | "SKIP" | "PRE_EXECUTION" | "POST_EXECUTION" | "PRE_POST_EXECUTION" | (string & {});
  /** Optional. User-provided description intended to give additional business context about the task. */
  description?: string;
  /** Optional. Used to define task-template name if task is of type task-template */
  taskTemplate?: string;
  /** Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task */
  errorCatcherId?: string;
  /** Optional. External task type of the task */
  externalTaskType?: "EXTERNAL_TASK_TYPE_UNSPECIFIED" | "NORMAL_TASK" | "ERROR_TASK" | (string & {});
  /** Optional. Informs the front-end application where to draw this error catcher config on the UI. */
  position?: GoogleCloudIntegrationsV1alphaCoordinate;
}

export const GoogleCloudIntegrationsV1alphaTaskConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaTaskConfig> = Schema.suspend(() => Schema.Struct({
  task: Schema.optional(Schema.String),
  taskId: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaEventParameter)),
  failurePolicy: Schema.optional(GoogleCloudIntegrationsV1alphaFailurePolicy),
  synchronousCallFailurePolicy: Schema.optional(GoogleCloudIntegrationsV1alphaFailurePolicy),
  conditionalFailurePolicies: Schema.optional(GoogleCloudIntegrationsV1alphaConditionalFailurePolicies),
  nextTasks: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaNextTask)),
  nextTasksExecutionPolicy: Schema.optional(Schema.String),
  taskExecutionStrategy: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  successPolicy: Schema.optional(GoogleCloudIntegrationsV1alphaSuccessPolicy),
  jsonValidationOption: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  taskTemplate: Schema.optional(Schema.String),
  errorCatcherId: Schema.optional(Schema.String),
  externalTaskType: Schema.optional(Schema.String),
  position: Schema.optional(GoogleCloudIntegrationsV1alphaCoordinate),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTaskConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTaskConfig>;

export interface EnterpriseCrmEventbusProtoWorkflowAlertConfig {
  /** A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the workflow. */
  alertName?: string;
  metricType?: "METRIC_TYPE_UNSPECIFIED" | "EVENT_ERROR_RATE" | "EVENT_WARNING_RATE" | "TASK_ERROR_RATE" | "TASK_WARNING_RATE" | "TASK_RATE" | "EVENT_RATE" | "EVENT_AVERAGE_DURATION" | "EVENT_PERCENTILE_DURATION" | "TASK_AVERAGE_DURATION" | "TASK_PERCENTILE_DURATION" | (string & {});
  /** The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired. */
  thresholdType?: "UNSPECIFIED_THRESHOLD_TYPE" | "EXPECTED_MIN" | "EXPECTED_MAX" | (string & {});
  /** The metric value, above or below which the alert should be triggered. */
  thresholdValue?: EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue;
  /** Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger. */
  durationThresholdMs?: string;
  errorEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
  warningEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
  /** For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours. */
  aggregationPeriod?: string;
  /** For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired. */
  numAggregationPeriods?: number;
  /** Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert. */
  alertDisabled?: boolean;
  /** Client associated with this alert configuration. */
  clientId?: string;
  /** For either events or tasks, depending on the type of alert, count only final attempts, not retries. */
  onlyFinalAttempt?: boolean;
  /** Link to a playbook for resolving the issue that triggered this alert. */
  playbookUrl?: string;
}

export const EnterpriseCrmEventbusProtoWorkflowAlertConfig: Schema.Schema<EnterpriseCrmEventbusProtoWorkflowAlertConfig> = Schema.suspend(() => Schema.Struct({
  alertName: Schema.optional(Schema.String),
  metricType: Schema.optional(Schema.String),
  thresholdType: Schema.optional(Schema.String),
  thresholdValue: Schema.optional(EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue),
  durationThresholdMs: Schema.optional(Schema.String),
  errorEnumList: Schema.optional(EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList),
  warningEnumList: Schema.optional(EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList),
  aggregationPeriod: Schema.optional(Schema.String),
  numAggregationPeriods: Schema.optional(Schema.Number),
  alertDisabled: Schema.optional(Schema.Boolean),
  clientId: Schema.optional(Schema.String),
  onlyFinalAttempt: Schema.optional(Schema.Boolean),
  playbookUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoWorkflowAlertConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoWorkflowAlertConfig>;

export interface EnterpriseCrmEventbusProtoSerializedObjectParameter {
  objectValue?: string;
}

export const EnterpriseCrmEventbusProtoSerializedObjectParameter: Schema.Schema<EnterpriseCrmEventbusProtoSerializedObjectParameter> = Schema.suspend(() => Schema.Struct({
  objectValue: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSerializedObjectParameter" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSerializedObjectParameter>;

export interface EnterpriseCrmEventbusProtoStringParameterArray {
  stringValues?: Array<string>;
}

export const EnterpriseCrmEventbusProtoStringParameterArray: Schema.Schema<EnterpriseCrmEventbusProtoStringParameterArray> = Schema.suspend(() => Schema.Struct({
  stringValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoStringParameterArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoStringParameterArray>;

export interface EnterpriseCrmEventbusProtoIntParameterArray {
  intValues?: Array<string>;
}

export const EnterpriseCrmEventbusProtoIntParameterArray: Schema.Schema<EnterpriseCrmEventbusProtoIntParameterArray> = Schema.suspend(() => Schema.Struct({
  intValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoIntParameterArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoIntParameterArray>;

export interface EnterpriseCrmEventbusProtoDoubleParameterArray {
  doubleValues?: Array<number>;
}

export const EnterpriseCrmEventbusProtoDoubleParameterArray: Schema.Schema<EnterpriseCrmEventbusProtoDoubleParameterArray> = Schema.suspend(() => Schema.Struct({
  doubleValues: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoDoubleParameterArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoDoubleParameterArray>;

export interface EnterpriseCrmEventbusProtoProtoParameterArray {
  protoValues?: Array<Record<string, unknown>>;
}

export const EnterpriseCrmEventbusProtoProtoParameterArray: Schema.Schema<EnterpriseCrmEventbusProtoProtoParameterArray> = Schema.suspend(() => Schema.Struct({
  protoValues: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoProtoParameterArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoProtoParameterArray>;

export interface EnterpriseCrmEventbusProtoBooleanParameterArray {
  booleanValues?: Array<boolean>;
}

export const EnterpriseCrmEventbusProtoBooleanParameterArray: Schema.Schema<EnterpriseCrmEventbusProtoBooleanParameterArray> = Schema.suspend(() => Schema.Struct({
  booleanValues: Schema.optional(Schema.Array(Schema.Boolean)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBooleanParameterArray" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBooleanParameterArray>;

export interface EnterpriseCrmEventbusProtoParameterValueType {
  stringValue?: string;
  intValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  protoValue?: Record<string, unknown>;
  serializedObjectValue?: EnterpriseCrmEventbusProtoSerializedObjectParameter;
  stringArray?: EnterpriseCrmEventbusProtoStringParameterArray;
  intArray?: EnterpriseCrmEventbusProtoIntParameterArray;
  doubleArray?: EnterpriseCrmEventbusProtoDoubleParameterArray;
  protoArray?: EnterpriseCrmEventbusProtoProtoParameterArray;
  booleanArray?: EnterpriseCrmEventbusProtoBooleanParameterArray;
}

export const EnterpriseCrmEventbusProtoParameterValueType: Schema.Schema<EnterpriseCrmEventbusProtoParameterValueType> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  booleanValue: Schema.optional(Schema.Boolean),
  protoValue: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  serializedObjectValue: Schema.optional(EnterpriseCrmEventbusProtoSerializedObjectParameter),
  stringArray: Schema.optional(EnterpriseCrmEventbusProtoStringParameterArray),
  intArray: Schema.optional(EnterpriseCrmEventbusProtoIntParameterArray),
  doubleArray: Schema.optional(EnterpriseCrmEventbusProtoDoubleParameterArray),
  protoArray: Schema.optional(EnterpriseCrmEventbusProtoProtoParameterArray),
  booleanArray: Schema.optional(EnterpriseCrmEventbusProtoBooleanParameterArray),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParameterValueType" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParameterValueType>;

export interface EnterpriseCrmEventbusProtoParameterEntry {
  /** Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. */
  key?: string;
  /** Values for the defined keys. Each value can either be string, int, double or any proto message. */
  value?: EnterpriseCrmEventbusProtoParameterValueType;
  /** True if this parameter should be masked in the logs */
  masked?: boolean;
}

export const EnterpriseCrmEventbusProtoParameterEntry: Schema.Schema<EnterpriseCrmEventbusProtoParameterEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(EnterpriseCrmEventbusProtoParameterValueType),
  masked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParameterEntry" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParameterEntry>;

export interface EnterpriseCrmEventbusProtoEventParameters {
  /** Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. */
  parameters?: Array<EnterpriseCrmEventbusProtoParameterEntry>;
}

export const EnterpriseCrmEventbusProtoEventParameters: Schema.Schema<EnterpriseCrmEventbusProtoEventParameters> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoParameterEntry)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoEventParameters" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoEventParameters>;

export interface EnterpriseCrmEventbusProtoTriggerCriteria {
  /** Optional. Implementation class name. The class should implement the “TypedTask” interface. */
  triggerCriteriaTaskImplementationClassName?: string;
  /** Optional. To be used in TaskConfig for the implementation class. */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  /** Required. Standard filter expression, when true the workflow will be executed. If there's no trigger_criteria_task_implementation_class_name specified, the condition will be validated directly. */
  condition?: string;
}

export const EnterpriseCrmEventbusProtoTriggerCriteria: Schema.Schema<EnterpriseCrmEventbusProtoTriggerCriteria> = Schema.suspend(() => Schema.Struct({
  triggerCriteriaTaskImplementationClassName: Schema.optional(Schema.String),
  parameters: Schema.optional(EnterpriseCrmEventbusProtoEventParameters),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTriggerCriteria" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTriggerCriteria>;

export interface EnterpriseCrmEventbusProtoCloudSchedulerConfig {
  /** Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time */
  serviceAccountEmail?: string;
  /** Required. The cron tab of cloud scheduler trigger. */
  cronTab?: string;
  /** Required. The location where associated cloud scheduler job will be created */
  location?: string;
  /** Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations */
  errorMessage?: string;
}

export const EnterpriseCrmEventbusProtoCloudSchedulerConfig: Schema.Schema<EnterpriseCrmEventbusProtoCloudSchedulerConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  cronTab: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCloudSchedulerConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCloudSchedulerConfig>;

export interface EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables {
  /** Optional. List of variable names. */
  names?: Array<string>;
}

export const EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables>;

export interface EnterpriseCrmFrontendsEventbusProtoTriggerConfig {
  /** The user created label for a particular trigger. */
  label?: string;
  /** Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph). */
  startTasks?: Array<EnterpriseCrmEventbusProtoNextTask>;
  /** Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers. */
  properties?: Record<string, string>;
  triggerType?: "UNKNOWN" | "CLOUD_PUBSUB" | "GOOPS" | "SFDC_SYNC" | "CRON" | "API" | "MANIFOLD_TRIGGER" | "DATALAYER_DATA_CHANGE" | "SFDC_CHANNEL" | "CLOUD_PUBSUB_EXTERNAL" | "SFDC_CDC_CHANNEL" | "SFDC_PLATFORM_EVENTS_CHANNEL" | "CLOUD_SCHEDULER" | "INTEGRATION_CONNECTOR_TRIGGER" | "PRIVATE_TRIGGER" | "EVENTARC_TRIGGER" | (string & {});
  /** Optional. Informs the front-end application where to draw this trigger config on the UI. */
  position?: EnterpriseCrmEventbusProtoCoordinate;
  /** Required. A number to uniquely identify each trigger config within the workflow on UI. */
  triggerNumber?: string;
  /** An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published. */
  alertConfig?: Array<EnterpriseCrmEventbusProtoWorkflowAlertConfig>;
  /** Dictates how next tasks will be executed. */
  nextTasksExecutionPolicy?: "UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH" | (string & {});
  /** Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client. */
  enabledClients?: Array<string>;
  /** Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed. */
  pauseWorkflowExecutions?: boolean;
  /** Optional. When set, Eventbus will run the task specified in the trigger_criteria and validate the result using the trigger_criteria.condition, and only execute the workflow when result is true. */
  triggerCriteria?: EnterpriseCrmEventbusProtoTriggerCriteria;
  /** The backend trigger ID. */
  triggerId?: string;
  /** User-provided description intended to give more business context about the task. */
  description?: string;
  cloudSchedulerConfig?: EnterpriseCrmEventbusProtoCloudSchedulerConfig;
  /** Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task */
  errorCatcherId?: string;
  /** Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring. */
  triggerName?: string;
  /** Optional. List of input variables for the api trigger. */
  inputVariables?: EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables;
  /** Optional. List of output variables for the api trigger. */
  outputVariables?: EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables;
}

export const EnterpriseCrmFrontendsEventbusProtoTriggerConfig: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTriggerConfig> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  startTasks: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoNextTask)),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  triggerType: Schema.optional(Schema.String),
  position: Schema.optional(EnterpriseCrmEventbusProtoCoordinate),
  triggerNumber: Schema.optional(Schema.String),
  alertConfig: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoWorkflowAlertConfig)),
  nextTasksExecutionPolicy: Schema.optional(Schema.String),
  enabledClients: Schema.optional(Schema.Array(Schema.String)),
  pauseWorkflowExecutions: Schema.optional(Schema.Boolean),
  triggerCriteria: Schema.optional(EnterpriseCrmEventbusProtoTriggerCriteria),
  triggerId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  cloudSchedulerConfig: Schema.optional(EnterpriseCrmEventbusProtoCloudSchedulerConfig),
  errorCatcherId: Schema.optional(Schema.String),
  triggerName: Schema.optional(Schema.String),
  inputVariables: Schema.optional(EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables),
  outputVariables: Schema.optional(EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoTriggerConfig" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoTriggerConfig>;

export interface GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue {
  /** Absolute value threshold. */
  absolute?: string;
  /** Percentage threshold. */
  percentage?: number;
}

export const GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue> = Schema.suspend(() => Schema.Struct({
  absolute: Schema.optional(Schema.String),
  percentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue>;

export interface GoogleCloudIntegrationsV1alphaIntegrationAlertConfig {
  /** Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration. */
  displayName?: string;
  /** The type of metric. */
  metricType?: "METRIC_TYPE_UNSPECIFIED" | "EVENT_ERROR_RATE" | "EVENT_WARNING_RATE" | "TASK_ERROR_RATE" | "TASK_WARNING_RATE" | "TASK_RATE" | "EVENT_RATE" | "EVENT_AVERAGE_DURATION" | "EVENT_PERCENTILE_DURATION" | "TASK_AVERAGE_DURATION" | "TASK_PERCENTILE_DURATION" | (string & {});
  /** The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired. */
  thresholdType?: "THRESHOLD_TYPE_UNSPECIFIED" | "EXPECTED_MIN" | "EXPECTED_MAX" | (string & {});
  /** The metric value, above or below which the alert should be triggered. */
  thresholdValue?: GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue;
  /** Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger. */
  durationThreshold?: string;
  /** The period over which the metric value should be aggregated and evaluated. Format is , where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours. */
  aggregationPeriod?: string;
  /** For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired. */
  alertThreshold?: number;
  /** Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert. */
  disableAlert?: boolean;
  /** For either events or tasks, depending on the type of alert, count only final attempts, not retries. */
  onlyFinalAttempt?: boolean;
}

export const GoogleCloudIntegrationsV1alphaIntegrationAlertConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationAlertConfig> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  metricType: Schema.optional(Schema.String),
  thresholdType: Schema.optional(Schema.String),
  thresholdValue: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue),
  durationThreshold: Schema.optional(Schema.String),
  aggregationPeriod: Schema.optional(Schema.String),
  alertThreshold: Schema.optional(Schema.Number),
  disableAlert: Schema.optional(Schema.Boolean),
  onlyFinalAttempt: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegrationAlertConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationAlertConfig>;

export interface GoogleCloudIntegrationsV1alphaCloudSchedulerConfig {
  /** Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time */
  serviceAccountEmail?: string;
  /** Required. The cron tab of cloud scheduler trigger. */
  cronTab?: string;
  /** Required. The location where associated cloud scheduler job will be created */
  location?: string;
  /** Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations */
  errorMessage?: string;
}

export const GoogleCloudIntegrationsV1alphaCloudSchedulerConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaCloudSchedulerConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  cronTab: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCloudSchedulerConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCloudSchedulerConfig>;

export interface GoogleCloudIntegrationsV1alphaTriggerConfigVariables {
  /** Optional. List of variable names. */
  names?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaTriggerConfigVariables: Schema.Schema<GoogleCloudIntegrationsV1alphaTriggerConfigVariables> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTriggerConfigVariables" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTriggerConfigVariables>;

export interface GoogleCloudIntegrationsV1alphaTriggerConfig {
  /** Optional. The user created label for a particular trigger. */
  label?: string;
  /** Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph). */
  startTasks?: Array<GoogleCloudIntegrationsV1alphaNextTask>;
  /** Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers. */
  properties?: Record<string, string>;
  /** Optional. Type of trigger */
  triggerType?: "TRIGGER_TYPE_UNSPECIFIED" | "CRON" | "API" | "SFDC_CHANNEL" | "CLOUD_PUBSUB_EXTERNAL" | "SFDC_CDC_CHANNEL" | "CLOUD_SCHEDULER" | "INTEGRATION_CONNECTOR_TRIGGER" | "PRIVATE_TRIGGER" | "CLOUD_PUBSUB" | "EVENTARC_TRIGGER" | (string & {});
  /** Required. A number to uniquely identify each trigger config within the integration on UI. */
  triggerNumber?: string;
  /** Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published. */
  alertConfig?: Array<GoogleCloudIntegrationsV1alphaIntegrationAlertConfig>;
  /** Optional. Dictates how next tasks will be executed. */
  nextTasksExecutionPolicy?: "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH" | (string & {});
  /** Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME} */
  triggerId?: string;
  /** Optional. User-provided description intended to give additional business context about the task. */
  description?: string;
  /** Optional. Cloud Scheduler Trigger related metadata */
  cloudSchedulerConfig?: GoogleCloudIntegrationsV1alphaCloudSchedulerConfig;
  /** Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task */
  errorCatcherId?: string;
  /** Optional. Informs the front-end application where to draw this error catcher config on the UI. */
  position?: GoogleCloudIntegrationsV1alphaCoordinate;
  /** Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose. */
  trigger?: string;
  /** Optional. List of input variables for the api trigger. */
  inputVariables?: GoogleCloudIntegrationsV1alphaTriggerConfigVariables;
  /** Optional. List of output variables for the api trigger. */
  outputVariables?: GoogleCloudIntegrationsV1alphaTriggerConfigVariables;
}

export const GoogleCloudIntegrationsV1alphaTriggerConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaTriggerConfig> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  startTasks: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaNextTask)),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  triggerType: Schema.optional(Schema.String),
  triggerNumber: Schema.optional(Schema.String),
  alertConfig: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationAlertConfig)),
  nextTasksExecutionPolicy: Schema.optional(Schema.String),
  triggerId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  cloudSchedulerConfig: Schema.optional(GoogleCloudIntegrationsV1alphaCloudSchedulerConfig),
  errorCatcherId: Schema.optional(Schema.String),
  position: Schema.optional(GoogleCloudIntegrationsV1alphaCoordinate),
  trigger: Schema.optional(Schema.String),
  inputVariables: Schema.optional(GoogleCloudIntegrationsV1alphaTriggerConfigVariables),
  outputVariables: Schema.optional(GoogleCloudIntegrationsV1alphaTriggerConfigVariables),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTriggerConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTriggerConfig>;

export interface EnterpriseCrmEventbusProtoLogSettings {
  /** The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key. */
  logFieldName?: string;
  seedScope?: "SEED_SCOPE_UNSPECIFIED" | "EVENT_NAME" | "TIME_PERIOD" | "PARAM_NAME" | (string & {});
  seedPeriod?: "SEED_PERIOD_UNSPECIFIED" | "DAY" | "WEEK" | "MONTH" | (string & {});
}

export const EnterpriseCrmEventbusProtoLogSettings: Schema.Schema<EnterpriseCrmEventbusProtoLogSettings> = Schema.suspend(() => Schema.Struct({
  logFieldName: Schema.optional(Schema.String),
  seedScope: Schema.optional(Schema.String),
  seedPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoLogSettings" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoLogSettings>;

export interface EnterpriseCrmEventbusProtoAttributes {
  /** Things like URL, Email, Currency, Timestamp (rather than string, int64...) */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "EMAIL" | "URL" | "CURRENCY" | "TIMESTAMP" | "DOMAIN_NAME" | (string & {});
  /** Required for event execution. The validation will be done by the event bus when the event is triggered. */
  isRequired?: boolean;
  /** Used to define defaults. */
  defaultValue?: EnterpriseCrmEventbusProtoValueType;
  /** List of tasks that can view this property, if empty then all. */
  taskVisibility?: Array<string>;
  /** See */
  logSettings?: EnterpriseCrmEventbusProtoLogSettings;
  /** Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable. */
  isSearchable?: boolean;
  searchable?: "UNSPECIFIED" | "YES" | "NO" | (string & {});
  /** Used to indicate if the ParameterEntry is a read only field or not. */
  readOnly?: boolean;
  /** True if this workflow parameter should be masked in the logs */
  masked?: boolean;
}

export const EnterpriseCrmEventbusProtoAttributes: Schema.Schema<EnterpriseCrmEventbusProtoAttributes> = Schema.suspend(() => Schema.Struct({
  dataType: Schema.optional(Schema.String),
  isRequired: Schema.optional(Schema.Boolean),
  defaultValue: Schema.optional(EnterpriseCrmEventbusProtoValueType),
  taskVisibility: Schema.optional(Schema.Array(Schema.String)),
  logSettings: Schema.optional(EnterpriseCrmEventbusProtoLogSettings),
  isSearchable: Schema.optional(Schema.Boolean),
  searchable: Schema.optional(Schema.String),
  readOnly: Schema.optional(Schema.Boolean),
  masked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoAttributes" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoAttributes>;

export interface EnterpriseCrmEventbusProtoNodeIdentifier {
  /** Destination node where the edge ends. It can only be a task config. */
  elementType?: "UNKNOWN_TYPE" | "TASK_CONFIG" | "TRIGGER_CONFIG" | (string & {});
  /** Configuration of the edge. */
  elementIdentifier?: string;
}

export const EnterpriseCrmEventbusProtoNodeIdentifier: Schema.Schema<EnterpriseCrmEventbusProtoNodeIdentifier> = Schema.suspend(() => Schema.Struct({
  elementType: Schema.optional(Schema.String),
  elementIdentifier: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoNodeIdentifier" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoNodeIdentifier>;

export interface EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry {
  /** Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition. */
  key?: string;
  /** The data type of the parameter. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
  /** If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry". */
  protoDefPath?: string;
  /** Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. */
  defaultValue?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
  /** Metadata information about the parameters. */
  attributes?: EnterpriseCrmEventbusProtoAttributes;
  /** Child parameters nested within this parameter. This field only applies to protobuf parameters */
  children?: Array<EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry>;
  /** The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName". */
  name?: string;
  /** Specifies the input/output type for the parameter. */
  inOutType?: "IN_OUT_TYPE_UNSPECIFIED" | "IN" | "OUT" | "IN_OUT" | (string & {});
  /** The name of the protobuf type if the parameter has a protobuf data type. */
  protoDefName?: string;
  /** Whether this parameter is a transient parameter. */
  isTransient?: boolean;
  /** The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param. */
  producedBy?: EnterpriseCrmEventbusProtoNodeIdentifier;
  /** This schema will be used to validate runtime JSON-typed values of this parameter. */
  jsonSchema?: string;
  producer?: string;
  /** Optional. The description about the parameter */
  description?: string;
  /** Indicates whether this variable contains large data and need to be uploaded to Cloud Storage. */
  containsLargeData?: boolean;
  required?: boolean;
}

export const EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  protoDefPath: Schema.optional(Schema.String),
  defaultValue: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParameterValueType),
  attributes: Schema.optional(EnterpriseCrmEventbusProtoAttributes),
  children: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry)),
  name: Schema.optional(Schema.String),
  inOutType: Schema.optional(Schema.String),
  protoDefName: Schema.optional(Schema.String),
  isTransient: Schema.optional(Schema.Boolean),
  producedBy: Schema.optional(EnterpriseCrmEventbusProtoNodeIdentifier),
  jsonSchema: Schema.optional(Schema.String),
  producer: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  containsLargeData: Schema.optional(Schema.Boolean),
  required: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry>;

export interface EnterpriseCrmFrontendsEventbusProtoWorkflowParameters {
  /** Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution. */
  parameters?: Array<EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry>;
}

export const EnterpriseCrmFrontendsEventbusProtoWorkflowParameters: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoWorkflowParameters> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoWorkflowParameters" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoWorkflowParameters>;

export interface GoogleCloudIntegrationsV1alphaIntegrationParameter {
  /** Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. */
  key?: string;
  /** Type of the parameter. */
  dataType?: "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "BOOLEAN_ARRAY" | "JSON_VALUE" | "PROTO_VALUE" | "PROTO_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "PROTO_ENUM" | "SERIALIZED_OBJECT_VALUE" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | (string & {});
  /** Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. */
  defaultValue?: GoogleCloudIntegrationsV1alphaValueType;
  /** Searchable in the execution log or not. */
  searchable?: boolean;
  /** The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName". */
  displayName?: string;
  /** Specifies the input/output type for the parameter. */
  inputOutputType?: "IN_OUT_TYPE_UNSPECIFIED" | "IN" | "OUT" | "IN_OUT" | (string & {});
  /** Whether this parameter is a transient parameter. */
  isTransient?: boolean;
  /** The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param. */
  producer?: string;
  /** This schema will be used to validate runtime JSON-typed values of this parameter. */
  jsonSchema?: string;
  /** Indicates whether this variable contains large data and need to be uploaded to Cloud Storage. */
  containsLargeData?: boolean;
  /** True if this parameter should be masked in the logs */
  masked?: boolean;
  /** Optional. Description of the parameter. */
  description?: string;
}

export const GoogleCloudIntegrationsV1alphaIntegrationParameter: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationParameter> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  defaultValue: Schema.optional(GoogleCloudIntegrationsV1alphaValueType),
  searchable: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  inputOutputType: Schema.optional(Schema.String),
  isTransient: Schema.optional(Schema.Boolean),
  producer: Schema.optional(Schema.String),
  jsonSchema: Schema.optional(Schema.String),
  containsLargeData: Schema.optional(Schema.Boolean),
  masked: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegrationParameter" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationParameter>;

export interface EnterpriseCrmEventbusProtoPropertyEntry {
  /** Key is used to retrieve the corresponding property value. This should be unique for a given fired event. The Tasks should be aware of the keys used while firing the events for them to be able to retrieve the values. */
  key?: string;
  /** Values for the defined keys. Each value can either be string, int, double or any proto message. */
  value?: EnterpriseCrmEventbusProtoValueType;
}

export const EnterpriseCrmEventbusProtoPropertyEntry: Schema.Schema<EnterpriseCrmEventbusProtoPropertyEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(EnterpriseCrmEventbusProtoValueType),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoPropertyEntry" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoPropertyEntry>;

export interface EnterpriseCrmEventbusProtoEventBusProperties {
  /** An unordered list of property entries. */
  properties?: Array<EnterpriseCrmEventbusProtoPropertyEntry>;
}

export const EnterpriseCrmEventbusProtoEventBusProperties: Schema.Schema<EnterpriseCrmEventbusProtoEventBusProperties> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoPropertyEntry)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoEventBusProperties" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoEventBusProperties>;

export interface EnterpriseCrmEventbusProtoNextTeardownTask {
  /** Required. Name of the next teardown task. */
  name?: string;
}

export const EnterpriseCrmEventbusProtoNextTeardownTask: Schema.Schema<EnterpriseCrmEventbusProtoNextTeardownTask> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoNextTeardownTask" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoNextTeardownTask>;

export interface EnterpriseCrmEventbusProtoTeardownTaskConfig {
  /** Required. Implementation class name. */
  teardownTaskImplementationClassName?: string;
  /** Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks. */
  name?: string;
  /** The parameters the user can pass to this task. */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  properties?: EnterpriseCrmEventbusProtoEventBusProperties;
  /** The creator's email address. */
  creatorEmail?: string;
  nextTeardownTask?: EnterpriseCrmEventbusProtoNextTeardownTask;
}

export const EnterpriseCrmEventbusProtoTeardownTaskConfig: Schema.Schema<EnterpriseCrmEventbusProtoTeardownTaskConfig> = Schema.suspend(() => Schema.Struct({
  teardownTaskImplementationClassName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parameters: Schema.optional(EnterpriseCrmEventbusProtoEventParameters),
  properties: Schema.optional(EnterpriseCrmEventbusProtoEventBusProperties),
  creatorEmail: Schema.optional(Schema.String),
  nextTeardownTask: Schema.optional(EnterpriseCrmEventbusProtoNextTeardownTask),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTeardownTaskConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTeardownTaskConfig>;

export interface EnterpriseCrmEventbusProtoTeardown {
  /** Required. */
  teardownTaskConfigs?: Array<EnterpriseCrmEventbusProtoTeardownTaskConfig>;
}

export const EnterpriseCrmEventbusProtoTeardown: Schema.Schema<EnterpriseCrmEventbusProtoTeardown> = Schema.suspend(() => Schema.Struct({
  teardownTaskConfigs: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTeardownTaskConfig)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTeardown" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTeardown>;

export interface GoogleCloudIntegrationsV1alphaErrorCatcherConfig {
  /** Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow */
  errorCatcherId?: string;
  /** Optional. The user created label for a particular error catcher. Optional. */
  label?: string;
  /** Required. A number to uniquely identify each error catcher config within the workflow on UI. */
  errorCatcherNumber?: string;
  /** Required. The set of start tasks that are to be executed for the error catch flow */
  startErrorTasks?: Array<GoogleCloudIntegrationsV1alphaNextTask>;
  /** Optional. User-provided description intended to give more business context about the error catcher config. */
  description?: string;
  /** Optional. Informs the front-end application where to draw this error catcher config on the UI. */
  position?: GoogleCloudIntegrationsV1alphaCoordinate;
}

export const GoogleCloudIntegrationsV1alphaErrorCatcherConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaErrorCatcherConfig> = Schema.suspend(() => Schema.Struct({
  errorCatcherId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  errorCatcherNumber: Schema.optional(Schema.String),
  startErrorTasks: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaNextTask)),
  description: Schema.optional(Schema.String),
  position: Schema.optional(GoogleCloudIntegrationsV1alphaCoordinate),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaErrorCatcherConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaErrorCatcherConfig>;

export interface GoogleCloudIntegrationsV1alphaCloudLoggingDetails {
  /** Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed. */
  cloudLoggingSeverity?: "CLOUD_LOGGING_SEVERITY_UNSPECIFIED" | "INFO" | "ERROR" | "WARNING" | (string & {});
  /** Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed. */
  enableCloudLogging?: boolean;
}

export const GoogleCloudIntegrationsV1alphaCloudLoggingDetails: Schema.Schema<GoogleCloudIntegrationsV1alphaCloudLoggingDetails> = Schema.suspend(() => Schema.Struct({
  cloudLoggingSeverity: Schema.optional(Schema.String),
  enableCloudLogging: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCloudLoggingDetails" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCloudLoggingDetails>;

export interface GoogleCloudIntegrationsV1alphaIntegrationConfigParameter {
  /** Optional. Integration Parameter to provide the default value, data type and attributes required for the Integration config variables. */
  parameter?: GoogleCloudIntegrationsV1alphaIntegrationParameter;
  /** Values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. */
  value?: GoogleCloudIntegrationsV1alphaValueType;
}

export const GoogleCloudIntegrationsV1alphaIntegrationConfigParameter: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationConfigParameter> = Schema.suspend(() => Schema.Struct({
  parameter: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationParameter),
  value: Schema.optional(GoogleCloudIntegrationsV1alphaValueType),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegrationConfigParameter" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationConfigParameter>;

export interface GoogleCloudIntegrationsV1alphaIntegrationVersion {
  /** Output only. Auto-generated primary key. */
  name?: string;
  /** Optional. The integration description. */
  description?: string;
  /** Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs. */
  taskConfigsInternal?: Array<EnterpriseCrmFrontendsEventbusProtoTaskConfig>;
  /** Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs. */
  taskConfigs?: Array<GoogleCloudIntegrationsV1alphaTaskConfig>;
  /** Optional. Trigger configurations. */
  triggerConfigsInternal?: Array<EnterpriseCrmFrontendsEventbusProtoTriggerConfig>;
  /** Optional. Trigger configurations. */
  triggerConfigs?: Array<GoogleCloudIntegrationsV1alphaTriggerConfig>;
  /** Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter. */
  integrationParametersInternal?: EnterpriseCrmFrontendsEventbusProtoWorkflowParameters;
  /** Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter. */
  integrationParameters?: Array<GoogleCloudIntegrationsV1alphaIntegrationParameter>;
  /** Optional. Contains a graph of tasks that will be executed before putting the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of success or failure, similar to "finally" in code. */
  teardown?: EnterpriseCrmEventbusProtoTeardown;
  /** Optional. The origin that indicates where this integration is coming from. */
  origin?: "UNSPECIFIED" | "UI" | "PIPER_V2" | "PIPER_V3" | "APPLICATION_IP_PROVISIONING" | "TEST_CASE" | (string & {});
  /** Output only. Generated by eventbus. User should not set it as an input. */
  status?: "UNKNOWN" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT" | (string & {});
  /** Output only. User should not set it as an input. */
  state?: "INTEGRATION_STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT" | (string & {});
  /** Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head. */
  snapshotNumber?: string;
  /** Output only. Auto-generated. */
  updateTime?: string;
  /** Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  lockHolder?: string;
  /** Output only. Auto-generated. */
  createTime?: string;
  /** Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  lastModifierEmail?: string;
  /** Optional. The id of the template which was used to create this integration_version. */
  parentTemplateId?: string;
  /** Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created. */
  userLabel?: string;
  /** Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index. */
  databasePersistencePolicy?: "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED" | "DATABASE_PERSISTENCE_DISABLED" | "DATABASE_PERSISTENCE_ASYNC" | (string & {});
  /** Optional. Error Catch Task configuration for the integration. It's optional. */
  errorCatcherConfigs?: Array<GoogleCloudIntegrationsV1alphaErrorCatcherConfig>;
  /** Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task. */
  runAsServiceAccount?: string;
  /** Optional. Cloud Logging details for the integration version */
  cloudLoggingDetails?: GoogleCloudIntegrationsV1alphaCloudLoggingDetails;
  /** Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter. */
  integrationConfigParameters?: Array<GoogleCloudIntegrationsV1alphaIntegrationConfigParameter>;
  /** Optional. True if variable masking feature should be turned on for this version */
  enableVariableMasking?: boolean;
  /** Optional. Optional. The resource name of the template from which the integration is created. */
  createdFromTemplate?: string;
  /** Optional. Cloud KMS resource name for the CMEK encryption key. */
  cloudKmsKey?: string;
}

export const GoogleCloudIntegrationsV1alphaIntegrationVersion: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  taskConfigsInternal: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoTaskConfig)),
  taskConfigs: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTaskConfig)),
  triggerConfigsInternal: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoTriggerConfig)),
  triggerConfigs: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTriggerConfig)),
  integrationParametersInternal: Schema.optional(EnterpriseCrmFrontendsEventbusProtoWorkflowParameters),
  integrationParameters: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationParameter)),
  teardown: Schema.optional(EnterpriseCrmEventbusProtoTeardown),
  origin: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  snapshotNumber: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lockHolder: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastModifierEmail: Schema.optional(Schema.String),
  parentTemplateId: Schema.optional(Schema.String),
  userLabel: Schema.optional(Schema.String),
  databasePersistencePolicy: Schema.optional(Schema.String),
  errorCatcherConfigs: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaErrorCatcherConfig)),
  runAsServiceAccount: Schema.optional(Schema.String),
  cloudLoggingDetails: Schema.optional(GoogleCloudIntegrationsV1alphaCloudLoggingDetails),
  integrationConfigParameters: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationConfigParameter)),
  enableVariableMasking: Schema.optional(Schema.Boolean),
  createdFromTemplate: Schema.optional(Schema.String),
  cloudKmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegrationVersion" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationVersion>;

export interface GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse {
  /** The integrations which match the request. */
  integrationVersions?: Array<GoogleCloudIntegrationsV1alphaIntegrationVersion>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Whether the user has no permission on the version or not. */
  noPermission?: boolean;
}

export const GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse> = Schema.suspend(() => Schema.Struct({
  integrationVersions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationVersion)),
  nextPageToken: Schema.optional(Schema.String),
  noPermission: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse>;

export interface GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest {
  /** Optional. Config parameters used during integration execution. */
  configParameters?: Record<string, unknown>;
}

export const GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest> = Schema.suspend(() => Schema.Struct({
  configParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest>;

export interface GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse {
}

export const GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse>;

export interface GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest {
  /** The textproto of the IntegrationVersion. */
  content?: string;
  /** File format for upload request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  fileFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest>;

export interface GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse {
  /** The uploaded integration. */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse> = Schema.suspend(() => Schema.Struct({
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse>;

export interface GoogleCloudIntegrationsV1alphaSerializedFile {
  /** String representation of the file content. */
  content?: string;
  /** File information like Integration version, Integration Config variables etc. */
  file?: "INTEGRATION_FILE_UNSPECIFIED" | "INTEGRATION" | "INTEGRATION_CONFIG_VARIABLES" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaSerializedFile: Schema.Schema<GoogleCloudIntegrationsV1alphaSerializedFile> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  file: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSerializedFile" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSerializedFile>;

export interface GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse {
  /** String representation of the requested file. */
  content?: string;
  /** List containing String represendation for multiple file with type. */
  files?: Array<GoogleCloudIntegrationsV1alphaSerializedFile>;
}

export const GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  files: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaSerializedFile)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse>;

export interface GoogleCloudIntegrationsV1alphaFile {
  /** Integration version */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
  /** Integration version config file */
  integrationConfig?: Record<string, unknown>;
  /** File information like Integration version, Integration Config variables etc. */
  type?: "INTEGRATION_FILE_UNSPECIFIED" | "INTEGRATION" | "INTEGRATION_CONFIG_VARIABLES" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaFile: Schema.Schema<GoogleCloudIntegrationsV1alphaFile> = Schema.suspend(() => Schema.Struct({
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
  integrationConfig: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaFile" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaFile>;

export interface GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse {
  /** List containing JSON for multiple file with type information. */
  files?: Array<GoogleCloudIntegrationsV1alphaFile>;
}

export const GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaFile)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse>;

export interface GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest {
}

export const GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest>;

export interface GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse {
  /** Version after the lock is acquired by the new user. */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse> = Schema.suspend(() => Schema.Struct({
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse>;

export interface GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest {
}

export const GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest>;

export interface GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest {
  /** Required. Matched against all {@link TriggerConfig}s across all integrations. i.e. TriggerConfig.trigger_id.equals(trigger_id). The trigger_id is in the format of `api_trigger/TRIGGER_NAME`. */
  triggerId?: string;
  /** Optional. Passed in as parameters to each integration execution. Redacted */
  parameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** Optional. Flag to determine how to should propagate errors. If this flag is set to be true, it will not throw an exception. Instead, it will return a {@link ExecuteIntegrationsResponse} with an execution id and error messages as PostWithTriggerIdExecutionException in {@link EventParameters}. The flag is set to be false by default. */
  doNotPropagateError?: boolean;
  /** Optional. Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. */
  parameterEntries?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  /** Optional. This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. */
  requestId?: string;
  /** Optional. The id of the ON_HOLD execution to be resumed. */
  executionId?: string;
  /** Optional. Input parameters used by integration execution. */
  inputParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
}

export const GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest> = Schema.suspend(() => Schema.Struct({
  triggerId: Schema.optional(Schema.String),
  parameters: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  doNotPropagateError: Schema.optional(Schema.Boolean),
  parameterEntries: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  requestId: Schema.optional(Schema.String),
  executionId: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest>;

export interface GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse {
  /** The id of the execution corresponding to this run of integration. */
  executionId?: string;
  /** Details for the integration that were executed. */
  eventParameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** Is true if any execution in the integration failed. False otherwise. */
  executionFailed?: boolean;
  /** Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. */
  parameterEntries?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  /** OUTPUT parameters in format of Map. Where Key is the name of the parameter. Note: Name of the system generated parameters are wrapped by backtick(`) to distinguish them from the user defined parameters. */
  outputParameters?: Record<string, unknown>;
  /** Optional. OUTPUT parameters from integration execution. */
  parameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
}

export const GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  eventParameters: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  executionFailed: Schema.optional(Schema.Boolean),
  parameterEntries: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse>;

export interface GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest {
  /** Required. Matched against all {@link TriggerConfig}s across all integrations. i.e. TriggerConfig.trigger_id.equals(trigger_id) */
  triggerId?: string;
  /** Passed in as parameters to each integration execution. */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  /** The time that the integration should be executed. If the time is less or equal to the current time, the integration is executed immediately. */
  scheduleTime?: string;
  /** This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. */
  requestId?: string;
  /** Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. */
  parameterEntries?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  /** Optional. Input parameters used by integration execution. */
  inputParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
  /** Optional. This is a unique id provided by the method caller. If provided this will be used as the execution_id when a new execution info is created. This is a string representation of a UUID. Must have no more than 36 characters and contain only alphanumeric characters and hyphens. */
  userGeneratedExecutionId?: string;
}

export const GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest> = Schema.suspend(() => Schema.Struct({
  triggerId: Schema.optional(Schema.String),
  parameters: Schema.optional(EnterpriseCrmEventbusProtoEventParameters),
  scheduleTime: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  parameterEntries: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  inputParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
  userGeneratedExecutionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest>;

export interface GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse {
  /** The execution info id for the executed integrations. */
  executionInfoIds?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse> = Schema.suspend(() => Schema.Struct({
  executionInfoIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse>;

export interface GoogleCloudIntegrationsV1alphaExecuteEventResponse {
  /** The id of the execution corresponding to this run of integration. */
  executionId?: string;
}

export const GoogleCloudIntegrationsV1alphaExecuteEventResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteEventResponse> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteEventResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteEventResponse>;

export interface EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata {
  /** The task number associated with this snapshot. Could be empty. */
  taskNumber?: string;
  /** the task name associated with this snapshot. Could be empty. */
  taskName?: string;
  /** the event attempt number this snapshot belongs to. */
  eventAttemptNum?: number;
  /** the task attempt number this snapshot belongs to. Could be empty. */
  taskAttemptNum?: number;
  /** the task label associated with this snapshot. Could be empty. */
  taskLabel?: string;
  /** Ancestor task number for the task(it will only be non-empty if the task is under 'private workflow') */
  ancestorTaskNumbers?: Array<string>;
  /** Ancestor iteration number for the task(it will only be non-empty if the task is under 'private workflow') */
  ancestorIterationNumbers?: Array<string>;
  /** The direct integration which the event execution snapshots belongs to */
  integrationName?: string;
}

export const EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata: Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata> = Schema.suspend(() => Schema.Struct({
  taskNumber: Schema.optional(Schema.String),
  taskName: Schema.optional(Schema.String),
  eventAttemptNum: Schema.optional(Schema.Number),
  taskAttemptNum: Schema.optional(Schema.Number),
  taskLabel: Schema.optional(Schema.String),
  ancestorTaskNumbers: Schema.optional(Schema.Array(Schema.String)),
  ancestorIterationNumbers: Schema.optional(Schema.Array(Schema.String)),
  integrationName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata>;

export interface EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats {
  /** The start time of the task execution for current attempt. This could be in the future if it's been scheduled. */
  startTime?: string;
  /** The end time of the task execution for current attempt. */
  endTime?: string;
}

export const EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats: Schema.Schema<EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats>;

export interface EnterpriseCrmEventbusProtoTaskExecutionDetails {
  /** Pointer to the task config it used for execution. */
  taskNumber?: string;
  taskExecutionState?: "UNSPECIFIED" | "PENDING_EXECUTION" | "IN_PROCESS" | "SUCCEED" | "FAILED" | "FATAL" | "RETRY_ON_HOLD" | "SKIPPED" | "CANCELED" | "PENDING_ROLLBACK" | "ROLLBACK_IN_PROCESS" | "ROLLEDBACK" | "SUSPENDED" | (string & {});
  taskAttemptStats?: Array<EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats>;
  /** Indicates whether the task was skipped on failure. Only relevant if the task is in SKIPPED state. */
  skippedOnFailure?: boolean;
}

export const EnterpriseCrmEventbusProtoTaskExecutionDetails: Schema.Schema<EnterpriseCrmEventbusProtoTaskExecutionDetails> = Schema.suspend(() => Schema.Struct({
  taskNumber: Schema.optional(Schema.String),
  taskExecutionState: Schema.optional(Schema.String),
  taskAttemptStats: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats)),
  skippedOnFailure: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTaskExecutionDetails" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTaskExecutionDetails>;

export interface EnterpriseCrmEventbusProtoConditionResult {
  /** the current task number. */
  currentTaskNumber?: string;
  /** the next task number. */
  nextTaskNumber?: string;
  /** the result comes out after evaluate the combined condition. True if there's no combined condition specified. */
  result?: boolean;
}

export const EnterpriseCrmEventbusProtoConditionResult: Schema.Schema<EnterpriseCrmEventbusProtoConditionResult> = Schema.suspend(() => Schema.Struct({
  currentTaskNumber: Schema.optional(Schema.String),
  nextTaskNumber: Schema.optional(Schema.String),
  result: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoConditionResult" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoConditionResult>;

export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot {
  /** Auto-generated. Used as primary key for EventExecutionSnapshots table. */
  eventExecutionSnapshotId?: string;
  /** Points to the event execution info this snapshot belongs to. */
  eventExecutionInfoId?: string;
  /** Indicates "right after which checkpoint task's execution" this snapshot is taken. */
  checkpointTaskNumber?: string;
  eventExecutionSnapshotMetadata?: EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata;
  /** The task name associated with this snapshot. Could be empty. */
  taskName?: string;
  /** Indicates when this snapshot is taken. */
  snapshotTime?: string;
  /** The parameters in Event object. */
  eventParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** The parameters in Event object that differs from last snapshot. */
  diffParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** All of the task execution details at the given point of time. */
  taskExecutionDetails?: Array<EnterpriseCrmEventbusProtoTaskExecutionDetails>;
  /** All of the computed conditions that been calculated. */
  conditionResults?: Array<EnterpriseCrmEventbusProtoConditionResult>;
}

export const EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot> = Schema.suspend(() => Schema.Struct({
  eventExecutionSnapshotId: Schema.optional(Schema.String),
  eventExecutionInfoId: Schema.optional(Schema.String),
  checkpointTaskNumber: Schema.optional(Schema.String),
  eventExecutionSnapshotMetadata: Schema.optional(EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata),
  taskName: Schema.optional(Schema.String),
  snapshotTime: Schema.optional(Schema.String),
  eventParams: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  diffParams: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  taskExecutionDetails: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTaskExecutionDetails)),
  conditionResults: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoConditionResult)),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot>;

export interface EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats {
  /** The start time of the event execution for current attempt. This could be in the future if it's been scheduled. */
  startTime?: string;
  /** The end time of the event execution for current attempt. */
  endTime?: string;
}

export const EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats: Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats>;

export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails {
  /** The execution state of this event. */
  eventExecutionState?: "UNSPECIFIED" | "ON_HOLD" | "IN_PROCESS" | "SUCCEEDED" | "FAILED" | "CANCELED" | "RETRY_ON_HOLD" | "SUSPENDED" | (string & {});
  /** After snapshot migration, this field will no longer be populated, but old execution snapshots will still be accessible. */
  eventExecutionSnapshot?: Array<EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot>;
  /** The network address (aka. bns address) that indicates where the event executor is running. */
  networkAddress?: string;
  /** The log file path (aka. cns address) for this event. */
  logFilePath?: string;
  eventAttemptStats?: Array<EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats>;
  /** Used internally and shouldn't be exposed to users. A counter for the cron job to record how many times this event is in in_process state but don't have a lock consecutively/ */
  ryeLockUnheldCount?: number;
  /** Next scheduled execution time in case the execution status was RETRY_ON_HOLD. */
  nextExecutionTime?: string;
  /** Indicates the number of times the execution has restarted from the beginning. */
  eventRetriesFromBeginningCount?: number;
  /** Total size of all event_execution_snapshots for an execution */
  eventExecutionSnapshotsSize?: string;
  /** If the execution is manually canceled, this field will contain the reason for cancellation. */
  cancelReason?: string;
}

export const EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails> = Schema.suspend(() => Schema.Struct({
  eventExecutionState: Schema.optional(Schema.String),
  eventExecutionSnapshot: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot)),
  networkAddress: Schema.optional(Schema.String),
  logFilePath: Schema.optional(Schema.String),
  eventAttemptStats: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats)),
  ryeLockUnheldCount: Schema.optional(Schema.Number),
  nextExecutionTime: Schema.optional(Schema.String),
  eventRetriesFromBeginningCount: Schema.optional(Schema.Number),
  eventExecutionSnapshotsSize: Schema.optional(Schema.String),
  cancelReason: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails>;

export interface CrmlogErrorCode {
  commonErrorCode?: "COMMON_ERROR_CODE_UNSPECIFIED" | "INVALID_CREDENTIALS" | "REQUIRED_FIELDS_MISSING" | "INVALID_FIELDS" | "BACKEND" | "GENERAL" | "INTERNAL" | "IO_ERROR" | "NOT_FOUND" | "EVENT_BUS" | "ALREADY_EXISTS" | "CONCORD" | "CONVERSION" | "FLUME" | "PERMISSION" | "SALES_FORCE" | "SPANNER" | "UNIMPLEMENTED" | "RELTIO" | "WORKFLOW_NOT_FOUND" | "QUOTA_THROTTLED" | "QUOTA_ENQUEUED" | "INVALID_QUOTA_CONFIGURATION" | "TASK_NOT_FOUND" | "EXECUTION_TIMEOUT" | "INVALID_EVENT_EXECUTION_STATE" | "INVALID_ATTRIBUTE" | "MISSING_ATTRIBUTE" | "CLIENT_UNAUTHORIZED_FOR_WORKFLOW" | "INVALID_PARAMETER" | "MISSING_PARAMETER" | "UNAUTHROIZED_WORKFLOW_EDITOR_ACTION" | "FAILED_PRECONDITION" | "INVALID_CLIENT" | "MISSING_CLIENT" | "INVALID_WORKFLOW" | "MISSING_QUOTA_CONFIGURATION" | "UNHANDLED_TASK_ERROR" | "SCRIPT_TASK_RUNTIME_ERROR" | "RPC" | "INVALID_PROTO" | "UNHANDLED_EVENTBUS_ERROR" | "INVALID_TASK_STATE" | "TYPED_TASK_INVALID_INPUT_OPERATION" | "TYPED_TASK_INVALID_OUTPUT_OPERATION" | "VALIDATION_ERROR" | "RESUME_ERROR" | "APPS_SCRIPT_EXECUTION_ERROR" | "INVALID_VECTOR_USER" | "INFORMATICA" | "RETRYABLE_TASK_ERROR" | "INVALID_TENANT" | "WRONG_TENANT" | "INFORMATICA_BACKEND_UNAVAILABLE" | "RPC_PERMISSION_DENIED" | "SYNC_EVENTBUS_EXECUTION_TIMEOUT" | "ASYNC_EVENTBUS_EXECUTION_TIMEOUT" | "NOT_SUPPORTED_DATA_TYPE" | "UNSANITIZED_USER_INPUT" | "TRANSFORM_EXPRESSION_EVALUATION_ERROR" | "HTTP_EXCEPTION" | "EXECUTION_CANCELLED" | (string & {});
}

export const CrmlogErrorCode: Schema.Schema<CrmlogErrorCode> = Schema.suspend(() => Schema.Struct({
  commonErrorCode: Schema.optional(Schema.String),
})).annotate({ identifier: "CrmlogErrorCode" }) as any as Schema.Schema<CrmlogErrorCode>;

export interface EnterpriseCrmEventbusProtoErrorDetail {
  /** The associated error-code, which can be a common or internal code. */
  errorCode?: CrmlogErrorCode;
  /** The full text of the error message, including any parameters that were thrown along with the exception. */
  errorMessage?: string;
  /** The severity of the error: ERROR|WARN|INFO. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARN" | "INFO" | (string & {});
  /** The task try-number, in which, the error occurred. If zero, the error happened at the event level. */
  taskNumber?: number;
}

export const EnterpriseCrmEventbusProtoErrorDetail: Schema.Schema<EnterpriseCrmEventbusProtoErrorDetail> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(CrmlogErrorCode),
  errorMessage: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  taskNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoErrorDetail" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoErrorDetail>;

export interface EnterpriseCrmEventbusProtoExecutionTraceInfo {
  /** Used to aggregate ExecutionTraceInfo. */
  traceId?: string;
  /** Parent event execution info id that triggers the current execution through SubWorkflowExecutorTask. */
  parentEventExecutionInfoId?: string;
}

export const EnterpriseCrmEventbusProtoExecutionTraceInfo: Schema.Schema<EnterpriseCrmEventbusProtoExecutionTraceInfo> = Schema.suspend(() => Schema.Struct({
  traceId: Schema.optional(Schema.String),
  parentEventExecutionInfoId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoExecutionTraceInfo" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoExecutionTraceInfo>;

export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo {
  /** If this execution is a replay of another execution, then this field contains the original execution id. */
  originalExecutionInfoId?: string;
  /** If this execution has been replayed, then this field contains the execution ids of the replayed executions. */
  replayedExecutionInfoIds?: Array<string>;
  /** reason for replay */
  replayReason?: string;
  /** Replay mode for the execution */
  replayMode?: "REPLAY_MODE_UNSPECIFIED" | "REPLAY_MODE_FROM_BEGINNING" | "REPLAY_MODE_POINT_OF_FAILURE" | (string & {});
}

export const EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo> = Schema.suspend(() => Schema.Struct({
  originalExecutionInfoId: Schema.optional(Schema.String),
  replayedExecutionInfoIds: Schema.optional(Schema.Array(Schema.String)),
  replayReason: Schema.optional(Schema.String),
  replayMode: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo>;

export interface EnterpriseCrmEventbusProtoCloudLoggingDetails {
  /** Status of whether Cloud Logging is enabled or not for the integration version getting executed. */
  enableCloudLogging?: boolean;
  /** Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed. */
  cloudLoggingSeverity?: "CLOUD_LOGGING_SEVERITY_UNSPECIFIED" | "INFO" | "ERROR" | "WARNING" | (string & {});
}

export const EnterpriseCrmEventbusProtoCloudLoggingDetails: Schema.Schema<EnterpriseCrmEventbusProtoCloudLoggingDetails> = Schema.suspend(() => Schema.Struct({
  enableCloudLogging: Schema.optional(Schema.Boolean),
  cloudLoggingSeverity: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCloudLoggingDetails" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCloudLoggingDetails>;

export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo {
  /** Auto-generated primary key. */
  eventExecutionInfoId?: string;
  /** Name of the workflow. */
  workflowName?: string;
  /** Required. Pointer to the workflow it is executing. */
  workflowId?: string;
  /** The event data user sends as request. */
  clientId?: string;
  /** The trigger id of the workflow trigger config. If both trigger_id and client_id is present, the workflow is executed from the start tasks provided by the matching trigger config otherwise it is executed from the default start tasks. */
  triggerId?: string;
  /** Event parameters come in as part of the request. */
  requestParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** Event parameters come out as part of the response. */
  responseParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** The ways user posts this event. */
  postMethod?: "UNSPECIFIED" | "POST" | "POST_TO_QUEUE" | "SCHEDULE" | "POST_BY_EVENT_CONFIG_ID" | "POST_WITH_EVENT_DETAILS" | (string & {});
  /** The execution info about this event. */
  eventExecutionDetails?: EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails;
  /** Auto-generated. */
  createTime?: string;
  /** Auto-generated. */
  lastModifiedTime?: string;
  /** Errors, warnings, and informationals associated with the workflow/task. The order in which the errors were added by the workflow/task is maintained. */
  errors?: Array<EnterpriseCrmEventbusProtoErrorDetail>;
  /** Final error-code if event failed. */
  errorCode?: CrmlogErrorCode;
  /** Tenant this event is created. Used to reschedule the event to correct tenant. */
  tenant?: string;
  /** Which Google product the execution_info belongs to. If not set, the execution_info belongs to Integration Platform by default. */
  product?: "UNSPECIFIED_PRODUCT" | "IP" | "APIGEE" | "SECURITY" | (string & {});
  /** Workflow snapshot number. */
  snapshotNumber?: string;
  /** Optional. This is used to de-dup incoming request. */
  requestId?: string;
  /** Execution trace info to aggregate parent-child executions. */
  executionTraceInfo?: EnterpriseCrmEventbusProtoExecutionTraceInfo;
  /** Time interval in seconds to schedule retry of workflow in manifold when workflow is already running */
  workflowRetryBackoffIntervalSeconds?: string;
  /** Replay info for the execution */
  replayInfo?: EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo;
  /** Cloud Logging details for execution info */
  cloudLoggingDetails?: EnterpriseCrmEventbusProtoCloudLoggingDetails;
  /** User-defined label that annotates the executed integration version. */
  integrationVersionUserLabel?: string;
}

export const EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo> = Schema.suspend(() => Schema.Struct({
  eventExecutionInfoId: Schema.optional(Schema.String),
  workflowName: Schema.optional(Schema.String),
  workflowId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  triggerId: Schema.optional(Schema.String),
  requestParams: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  responseParams: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  postMethod: Schema.optional(Schema.String),
  eventExecutionDetails: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails),
  createTime: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoErrorDetail)),
  errorCode: Schema.optional(CrmlogErrorCode),
  tenant: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  snapshotNumber: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  executionTraceInfo: Schema.optional(EnterpriseCrmEventbusProtoExecutionTraceInfo),
  workflowRetryBackoffIntervalSeconds: Schema.optional(Schema.String),
  replayInfo: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo),
  cloudLoggingDetails: Schema.optional(EnterpriseCrmEventbusProtoCloudLoggingDetails),
  integrationVersionUserLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo>;

export interface EnterpriseCrmEventbusProtoEventExecutionSnapshot {
  /** Auto-generated. Used as primary key for EventExecutionSnapshots table. */
  eventExecutionSnapshotId?: string;
  /** Points to the event execution info this snapshot belongs to. */
  eventExecutionInfoId?: string;
  /** Indicates "right after which checkpoint task's execution" this snapshot is taken. */
  checkpointTaskNumber?: string;
  eventExecutionSnapshotMetadata?: EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata;
  /** The task name associated with this snapshot. Could be empty. */
  taskName?: string;
  /** Indicates when this snapshot is taken. */
  snapshotTime?: string;
  /** The parameters in Event object. */
  eventParams?: EnterpriseCrmEventbusProtoEventParameters;
  /** The parameters in Event object that differs from last snapshot. */
  diffParams?: EnterpriseCrmEventbusProtoEventParameters;
  /** All of the task execution details at the given point of time. */
  taskExecutionDetails?: Array<EnterpriseCrmEventbusProtoTaskExecutionDetails>;
  /** All of the computed conditions that been calculated. */
  conditionResults?: Array<EnterpriseCrmEventbusProtoConditionResult>;
  /** indicate whether snapshot exceeded maximum size before clean up */
  exceedMaxSize?: boolean;
  /** Client that the execution snapshot is associated to. */
  clientId?: string;
  /** Name of the workflow this event execution snapshot belongs to. */
  workflowName?: string;
}

export const EnterpriseCrmEventbusProtoEventExecutionSnapshot: Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionSnapshot> = Schema.suspend(() => Schema.Struct({
  eventExecutionSnapshotId: Schema.optional(Schema.String),
  eventExecutionInfoId: Schema.optional(Schema.String),
  checkpointTaskNumber: Schema.optional(Schema.String),
  eventExecutionSnapshotMetadata: Schema.optional(EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata),
  taskName: Schema.optional(Schema.String),
  snapshotTime: Schema.optional(Schema.String),
  eventParams: Schema.optional(EnterpriseCrmEventbusProtoEventParameters),
  diffParams: Schema.optional(EnterpriseCrmEventbusProtoEventParameters),
  taskExecutionDetails: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTaskExecutionDetails)),
  conditionResults: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoConditionResult)),
  exceedMaxSize: Schema.optional(Schema.Boolean),
  clientId: Schema.optional(Schema.String),
  workflowName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoEventExecutionSnapshot" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionSnapshot>;

export interface EnterpriseCrmEventbusProtoEventExecutionDetails {
  eventExecutionState?: "UNSPECIFIED" | "ON_HOLD" | "IN_PROCESS" | "SUCCEEDED" | "FAILED" | "CANCELED" | "RETRY_ON_HOLD" | "SUSPENDED" | (string & {});
  eventExecutionSnapshot?: Array<EnterpriseCrmEventbusProtoEventExecutionSnapshot>;
  /** The network address (aka. bns address) that indicates where the event executor is running. */
  networkAddress?: string;
  /** The log file path (aka. cns address) for this event. */
  logFilePath?: string;
  eventAttemptStats?: Array<EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats>;
  /** Used internally and shouldn't be exposed to users. A counter for the cron job to record how many times this event is in in_process state but don't have a lock consecutively/ */
  ryeLockUnheldCount?: number;
  /** Next scheduled execution time in case the execution status was RETRY_ON_HOLD. */
  nextExecutionTime?: string;
  /** Indicates the number of times the execution has restarted from the beginning. */
  eventRetriesFromBeginningCount?: number;
  /** Total size of all event_execution_snapshots for an execution */
  eventExecutionSnapshotsSize?: string;
  /** If the execution is manually canceled, this field will contain the reason for cancellation. */
  cancelReason?: string;
}

export const EnterpriseCrmEventbusProtoEventExecutionDetails: Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionDetails> = Schema.suspend(() => Schema.Struct({
  eventExecutionState: Schema.optional(Schema.String),
  eventExecutionSnapshot: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoEventExecutionSnapshot)),
  networkAddress: Schema.optional(Schema.String),
  logFilePath: Schema.optional(Schema.String),
  eventAttemptStats: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats)),
  ryeLockUnheldCount: Schema.optional(Schema.Number),
  nextExecutionTime: Schema.optional(Schema.String),
  eventRetriesFromBeginningCount: Schema.optional(Schema.Number),
  eventExecutionSnapshotsSize: Schema.optional(Schema.String),
  cancelReason: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoEventExecutionDetails" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoEventExecutionDetails>;

export interface GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata {
  /** The task number associated with this snapshot. */
  taskNumber?: string;
  /** the task name associated with this snapshot. */
  task?: string;
  /** the execution attempt number this snapshot belongs to. */
  executionAttempt?: number;
  /** the task attempt number this snapshot belongs to. */
  taskAttempt?: number;
  /** the task label associated with this snapshot. Could be empty. */
  taskLabel?: string;
  /** Ancestor task number for the task(it will only be non-empty if the task is under 'private workflow') */
  ancestorTaskNumbers?: Array<string>;
  /** Ancestor iteration number for the task(it will only be non-empty if the task is under 'private workflow') */
  ancestorIterationNumbers?: Array<string>;
  /** The direct integration which the event execution snapshots belongs to */
  integrationName?: string;
}

export const GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata: Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata> = Schema.suspend(() => Schema.Struct({
  taskNumber: Schema.optional(Schema.String),
  task: Schema.optional(Schema.String),
  executionAttempt: Schema.optional(Schema.Number),
  taskAttempt: Schema.optional(Schema.Number),
  taskLabel: Schema.optional(Schema.String),
  ancestorTaskNumbers: Schema.optional(Schema.Array(Schema.String)),
  ancestorIterationNumbers: Schema.optional(Schema.Array(Schema.String)),
  integrationName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata>;

export interface GoogleCloudIntegrationsV1alphaAttemptStats {
  /** The start time of the integration execution for current attempt. This could be in the future if it's been scheduled. */
  startTime?: string;
  /** The end time of the integration execution for current attempt. */
  endTime?: string;
}

export const GoogleCloudIntegrationsV1alphaAttemptStats: Schema.Schema<GoogleCloudIntegrationsV1alphaAttemptStats> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaAttemptStats" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaAttemptStats>;

export interface GoogleCloudIntegrationsV1alphaTaskExecutionDetails {
  /** Pointer to the task config it used for execution. */
  taskNumber?: string;
  /** The execution state of this task. */
  taskExecutionState?: "TASK_EXECUTION_STATE_UNSPECIFIED" | "PENDING_EXECUTION" | "IN_PROCESS" | "SUCCEED" | "FAILED" | "FATAL" | "RETRY_ON_HOLD" | "SKIPPED" | "CANCELLED" | "PENDING_ROLLBACK" | "ROLLBACK_IN_PROCESS" | "ROLLEDBACK" | "SUSPENDED" | (string & {});
  /** Status for the current task execution attempt. */
  taskAttemptStats?: Array<GoogleCloudIntegrationsV1alphaAttemptStats>;
}

export const GoogleCloudIntegrationsV1alphaTaskExecutionDetails: Schema.Schema<GoogleCloudIntegrationsV1alphaTaskExecutionDetails> = Schema.suspend(() => Schema.Struct({
  taskNumber: Schema.optional(Schema.String),
  taskExecutionState: Schema.optional(Schema.String),
  taskAttemptStats: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaAttemptStats)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTaskExecutionDetails" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTaskExecutionDetails>;

export interface GoogleCloudIntegrationsV1alphaExecutionSnapshot {
  /** Indicates "after which checkpoint task's execution" this snapshot is taken. */
  checkpointTaskNumber?: string;
  /** Metadata of the execution snapshot. */
  executionSnapshotMetadata?: GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata;
  /** Parameters used during the execution. */
  params?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
  /** All of the task execution details at the given point of time. */
  taskExecutionDetails?: Array<GoogleCloudIntegrationsV1alphaTaskExecutionDetails>;
}

export const GoogleCloudIntegrationsV1alphaExecutionSnapshot: Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionSnapshot> = Schema.suspend(() => Schema.Struct({
  checkpointTaskNumber: Schema.optional(Schema.String),
  executionSnapshotMetadata: Schema.optional(GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata),
  params: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
  taskExecutionDetails: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTaskExecutionDetails)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecutionSnapshot" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionSnapshot>;

export interface GoogleCloudIntegrationsV1alphaExecutionDetails {
  /** Status of the execution. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "RETRY_ON_HOLD" | "SUSPENDED" | (string & {});
  /** List of snapshots taken during the execution. */
  executionSnapshots?: Array<GoogleCloudIntegrationsV1alphaExecutionSnapshot>;
  /** List of Start and end time of the execution attempts. */
  attemptStats?: Array<GoogleCloudIntegrationsV1alphaAttemptStats>;
  /** Total size of all event_execution_snapshots for an execution */
  eventExecutionSnapshotsSize?: string;
}

export const GoogleCloudIntegrationsV1alphaExecutionDetails: Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionDetails> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  executionSnapshots: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaExecutionSnapshot)),
  attemptStats: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaAttemptStats)),
  eventExecutionSnapshotsSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecutionDetails" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionDetails>;

export interface GoogleCloudIntegrationsV1alphaExecutionReplayInfo {
  /** If this execution is a replay of another execution, then this field contains the original execution id. */
  originalExecutionInfoId?: string;
  /** If this execution has been replayed, then this field contains the execution ids of the replayed executions. */
  replayedExecutionInfoIds?: Array<string>;
  /** reason for replay */
  replayReason?: string;
  /** Replay mode for the execution */
  replayMode?: "REPLAY_MODE_UNSPECIFIED" | "REPLAY_MODE_FROM_BEGINNING" | "REPLAY_MODE_POINT_OF_FAILURE" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaExecutionReplayInfo: Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionReplayInfo> = Schema.suspend(() => Schema.Struct({
  originalExecutionInfoId: Schema.optional(Schema.String),
  replayedExecutionInfoIds: Schema.optional(Schema.Array(Schema.String)),
  replayReason: Schema.optional(Schema.String),
  replayMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecutionReplayInfo" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecutionReplayInfo>;

export interface GoogleCloudIntegrationsV1alphaExecution {
  /** Auto-generated primary key. */
  name?: string;
  /** The trigger id of the integration trigger config. If both trigger_id and client_id is present, the integration is executed from the start tasks provided by the matching trigger config otherwise it is executed from the default start tasks. */
  triggerId?: string;
  /** Event parameters come in as part of the request. */
  requestParams?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  responseParams?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  /** The ways user posts this event. */
  executionMethod?: "EXECUTION_METHOD_UNSPECIFIED" | "POST" | "POST_TO_QUEUE" | "SCHEDULE" | (string & {});
  /** The execution info about this event. */
  eventExecutionDetails?: EnterpriseCrmEventbusProtoEventExecutionDetails;
  /** Output only. Created time of the execution. */
  createTime?: string;
  /** Output only. Last modified time of the execution. */
  updateTime?: string;
  /** Direct sub executions of the following Execution. */
  directSubExecutions?: Array<GoogleCloudIntegrationsV1alphaExecution>;
  /** Detailed info of this execution. */
  executionDetails?: GoogleCloudIntegrationsV1alphaExecutionDetails;
  /** Event parameters come in as part of the request. */
  requestParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
  /** Event parameters returned as part of the response. In the case of error, the `ErrorInfo` field is returned in the following format: { "ErrorInfo": { "message": String, "code": Number } } */
  responseParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
  /** Cloud Logging details for the integration version */
  cloudLoggingDetails?: GoogleCloudIntegrationsV1alphaCloudLoggingDetails;
  /** Output only. State of the integration version */
  integrationVersionState?: "INTEGRATION_STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT" | (string & {});
  /** Output only. An increasing sequence that is set when a new snapshot is created */
  snapshotNumber?: string;
  /** Output only. Replay info for the execution */
  replayInfo?: GoogleCloudIntegrationsV1alphaExecutionReplayInfo;
  /** Optional. Cloud KMS resource name for the CMEK encryption key. */
  cloudKmsKey?: string;
}

export const GoogleCloudIntegrationsV1alphaExecution: Schema.Schema<GoogleCloudIntegrationsV1alphaExecution> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  triggerId: Schema.optional(Schema.String),
  requestParams: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  responseParams: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  executionMethod: Schema.optional(Schema.String),
  eventExecutionDetails: Schema.optional(EnterpriseCrmEventbusProtoEventExecutionDetails),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  directSubExecutions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaExecution)),
  executionDetails: Schema.optional(GoogleCloudIntegrationsV1alphaExecutionDetails),
  requestParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
  responseParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
  cloudLoggingDetails: Schema.optional(GoogleCloudIntegrationsV1alphaCloudLoggingDetails),
  integrationVersionState: Schema.optional(Schema.String),
  snapshotNumber: Schema.optional(Schema.String),
  replayInfo: Schema.optional(GoogleCloudIntegrationsV1alphaExecutionReplayInfo),
  cloudKmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecution" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecution>;

export interface GoogleCloudIntegrationsV1alphaListExecutionsResponse {
  /** Required. The detailed information of requested executions. */
  executionInfos?: Array<EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo>;
  /** The token used to retrieve the next page results. */
  nextPageToken?: string;
  /** The detailed information of requested executions */
  executions?: Array<GoogleCloudIntegrationsV1alphaExecution>;
}

export const GoogleCloudIntegrationsV1alphaListExecutionsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListExecutionsResponse> = Schema.suspend(() => Schema.Struct({
  executionInfos: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo)),
  nextPageToken: Schema.optional(Schema.String),
  executions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaExecution)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListExecutionsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListExecutionsResponse>;

export interface GoogleCloudIntegrationsV1alphaCancelExecutionRequest {
  /** Required. Reason for cancelling the execution. This is provided by the client requesting the cancellation, and is not used by the Platform. */
  cancelReason?: string;
}

export const GoogleCloudIntegrationsV1alphaCancelExecutionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaCancelExecutionRequest> = Schema.suspend(() => Schema.Struct({
  cancelReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCancelExecutionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCancelExecutionRequest>;

export interface GoogleCloudIntegrationsV1alphaCancelExecutionResponse {
  /** True if cancellation performed successfully. */
  isCanceled?: boolean;
}

export const GoogleCloudIntegrationsV1alphaCancelExecutionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaCancelExecutionResponse> = Schema.suspend(() => Schema.Struct({
  isCanceled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaCancelExecutionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaCancelExecutionResponse>;

export interface GoogleCloudIntegrationsV1alphaTestIntegrationsRequest {
  /** Required. integration config to execute the workflow */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
  /** Optional. Passed in as parameters to each integration execution. */
  parameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** Required. The trigger id of the integration trigger config. If both trigger_id and client_id is present, the integration is executed from the start tasks provided by the matching trigger config otherwise it is executed from the default start tasks. */
  triggerId?: string;
  /** Required. This is used to identify the client on whose behalf the event will be executed. */
  clientId?: string;
  /** Optional. Can be specified in the event request, otherwise false (default). If true, enables tasks with condition "test_mode = true". If false, disables tasks with condition "test_mode = true" if global test mode (set by platform) is also false {@link EventBusConfig}. */
  testMode?: boolean;
  /** Optional. custom deadline of the rpc */
  deadlineSecondsTime?: string;
  /** Optional. Input parameters used during integration execution. */
  inputParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
  /** Optional. Config parameters used during integration execution. */
  configParameters?: Record<string, unknown>;
}

export const GoogleCloudIntegrationsV1alphaTestIntegrationsRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaTestIntegrationsRequest> = Schema.suspend(() => Schema.Struct({
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
  parameters: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  triggerId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  testMode: Schema.optional(Schema.Boolean),
  deadlineSecondsTime: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
  configParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTestIntegrationsRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTestIntegrationsRequest>;

export interface GoogleCloudIntegrationsV1alphaTestIntegrationsResponse {
  /** The id of the execution corresponding to this run of integration. */
  executionId?: string;
  /** Details for the integration that were executed. */
  eventParameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /** Is true if any execution in the integration failed. False otherwise. */
  executionFailed?: boolean;
  /** Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. */
  parameterEntries?: Array<EnterpriseCrmFrontendsEventbusProtoParameterEntry>;
  /** Optional. Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. */
  parameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
}

export const GoogleCloudIntegrationsV1alphaTestIntegrationsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaTestIntegrationsResponse> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  eventParameters: Schema.optional(EnterpriseCrmFrontendsEventbusProtoEventParameters),
  executionFailed: Schema.optional(Schema.Boolean),
  parameterEntries: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterEntry)),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTestIntegrationsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTestIntegrationsResponse>;

export interface GoogleCloudIntegrationsV1alphaDownloadExecutionResponse {
  /** The content of downloaded execution. */
  content?: string;
}

export const GoogleCloudIntegrationsV1alphaDownloadExecutionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadExecutionResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDownloadExecutionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadExecutionResponse>;

export interface GoogleCloudIntegrationsV1alphaReplayExecutionRequest {
  /** Required. The user provided reason for replaying the execution. */
  replayReason?: string;
  /** Optional. The list of parameters to be updated. - If the `update_mask` is not specified, all the parameters from original execution will be ignored and only the `modified_parameters` will be used. - It is an error to include a parameter in `update_mask` but not in `modified_parameters`. - Updating nested fields in a JSON parameter is not supported, please provide the complete JSON in the `modified_parameters`. */
  updateMask?: string;
  /** Optional. The modified input parameters for replay. - Provide values for all the fields in the 'update_mask'. Any field not present in the 'update_mask' will be ignored and its value will be taken from the original execution. - If the 'update_mask' is not specified, all the parameters from original execution will be ignored and only the `modified_parameters` will be used. */
  modifiedParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
  /** Optional. The mode of the replay. */
  replayMode?: "REPLAY_MODE_UNSPECIFIED" | "REPLAY_MODE_FROM_BEGINNING" | "REPLAY_MODE_POINT_OF_FAILURE" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaReplayExecutionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaReplayExecutionRequest> = Schema.suspend(() => Schema.Struct({
  replayReason: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  modifiedParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
  replayMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaReplayExecutionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaReplayExecutionRequest>;

export interface GoogleCloudIntegrationsV1alphaReplayExecutionResponse {
  /** Next ID: 4 The id of the execution corresponding to this run of the integration. */
  executionId?: string;
  /** The execution id which is replayed. */
  replayedExecutionId?: string;
  /** OUTPUT parameters in format of Map. Where Key is the name of the parameter. The parameters would only be present in case of synchrounous execution. Note: Name of the system generated parameters are wrapped by backtick(`) to distinguish them from the user defined parameters. */
  outputParameters?: Record<string, unknown>;
}

export const GoogleCloudIntegrationsV1alphaReplayExecutionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaReplayExecutionResponse> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  replayedExecutionId: Schema.optional(Schema.String),
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaReplayExecutionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaReplayExecutionResponse>;

export interface GoogleCloudIntegrationsV1alphaIntegration {
  /** Required. The resource name of the integration. */
  name?: string;
  /** Optional. */
  description?: string;
  /** Output only. Auto-generated. */
  updateTime?: string;
  /** Required. If any integration version is published. */
  active?: boolean;
  /** Output only. The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  creatorEmail?: string;
  /** Required. The last modifier of this integration */
  lastModifierEmail?: string;
  /** Required. Output only. Auto-generated. */
  createTime?: string;
}

export const GoogleCloudIntegrationsV1alphaIntegration: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegration> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  creatorEmail: Schema.optional(Schema.String),
  lastModifierEmail: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegration" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegration>;

export interface GoogleCloudIntegrationsV1alphaListIntegrationsResponse {
  /** The integrations which match the request. */
  integrations?: Array<GoogleCloudIntegrationsV1alphaIntegration>;
  /** The next page token for the response. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListIntegrationsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListIntegrationsResponse> = Schema.suspend(() => Schema.Struct({
  integrations: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegration)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListIntegrationsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListIntegrationsResponse>;

export interface GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult {
  /** The integration document metadata. */
  name?: string;
  /** The integration id. */
  id?: string;
  /** The creator of the integration version. */
  creator?: string;
  /** The description of the integration version. */
  description?: string;
  /** Output only. The status of the integration version. */
  status?: "INTEGRATION_STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT" | (string & {});
  /** The region of the integration version. */
  region?: string;
  /** Output only. The create time of the integration version. */
  createTime?: string;
  /** The version of the integration version. */
  version?: string;
}

export const GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult: Schema.Schema<GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult>;

export interface GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse {
  /** The list of integrations that match the search criteria. */
  integrations?: Array<GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse> = Schema.suspend(() => Schema.Struct({
  integrations: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse>;

export interface GoogleCloudIntegrationsV1alphaSfdcChannel {
  /** Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}. */
  name?: string;
  /** Optional. Client level unique name/alias to easily reference a channel. */
  displayName?: string;
  /** Optional. The description for this channel */
  description?: string;
  /** Required. The Channel topic defined by salesforce once an channel is opened */
  channelTopic?: string;
  /** Output only. Indicated if a channel has any active integrations referencing it. Set to false when the channel is created, and set to true if there is any integration published with the channel configured in it. */
  isActive?: boolean;
  /** Output only. Time when the channel is created */
  createTime?: string;
  /** Output only. Time when the channel was last updated */
  updateTime?: string;
  /** Output only. Time when the channel was deleted. Empty if not deleted. */
  deleteTime?: string;
  /** Output only. Last sfdc messsage replay id for channel */
  lastReplayId?: string;
}

export const GoogleCloudIntegrationsV1alphaSfdcChannel: Schema.Schema<GoogleCloudIntegrationsV1alphaSfdcChannel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  channelTopic: Schema.optional(Schema.String),
  isActive: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  lastReplayId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSfdcChannel" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSfdcChannel>;

export interface GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse {
  /** The list of SfdcChannels retrieved. */
  sfdcChannels?: Array<GoogleCloudIntegrationsV1alphaSfdcChannel>;
  /** The token used to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse> = Schema.suspend(() => Schema.Struct({
  sfdcChannels: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaSfdcChannel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse>;

export interface GoogleCloudIntegrationsV1alphaSfdcInstance {
  /** Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}. */
  name?: string;
  /** Optional. User selected unique name/alias to easily reference an instance. */
  displayName?: string;
  /** Optional. A description of the sfdc instance. */
  description?: string;
  /** The SFDC Org Id. This is defined in salesforce. */
  sfdcOrgId?: string;
  /** A list of AuthConfigs that can be tried to open the channel to SFDC */
  authConfigId?: Array<string>;
  /** Output only. Time when the instance is created */
  createTime?: string;
  /** Output only. Time when the instance was last updated */
  updateTime?: string;
  /** Output only. Time when the instance was deleted. Empty if not deleted. */
  deleteTime?: string;
  /** Optional. URL used for API calls after authentication (the login authority is configured within the referenced AuthConfig). */
  serviceAuthority?: string;
}

export const GoogleCloudIntegrationsV1alphaSfdcInstance: Schema.Schema<GoogleCloudIntegrationsV1alphaSfdcInstance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  sfdcOrgId: Schema.optional(Schema.String),
  authConfigId: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  serviceAuthority: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSfdcInstance" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSfdcInstance>;

export interface GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse {
  /** The list of SfdcInstances retrieved. */
  sfdcInstances?: Array<GoogleCloudIntegrationsV1alphaSfdcInstance>;
  /** The token used to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse> = Schema.suspend(() => Schema.Struct({
  sfdcInstances: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaSfdcInstance)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse>;

export interface GoogleCloudIntegrationsV1alphaSuspensionAudit {
  /** Time at which this suspension was resolved. */
  resolveTime?: string;
  /** Email address of the person who resolved this suspension. */
  resolver?: string;
}

export const GoogleCloudIntegrationsV1alphaSuspensionAudit: Schema.Schema<GoogleCloudIntegrationsV1alphaSuspensionAudit> = Schema.suspend(() => Schema.Struct({
  resolveTime: Schema.optional(Schema.String),
  resolver: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSuspensionAudit" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSuspensionAudit>;

export interface EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity {
  emailAddress?: string;
  gaiaId?: string;
}

export const EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity: Schema.Schema<EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  gaiaId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity>;

export interface EnterpriseCrmEventbusProtoSuspensionAuthPermissions {
  mdbGroup?: string;
  loasRole?: string;
  /** Represents a Gaia identity for a person or service account. */
  gaiaIdentity?: EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity;
  googleGroup?: EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity;
}

export const EnterpriseCrmEventbusProtoSuspensionAuthPermissions: Schema.Schema<EnterpriseCrmEventbusProtoSuspensionAuthPermissions> = Schema.suspend(() => Schema.Struct({
  mdbGroup: Schema.optional(Schema.String),
  loasRole: Schema.optional(Schema.String),
  gaiaIdentity: Schema.optional(EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity),
  googleGroup: Schema.optional(EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuspensionAuthPermissions" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuspensionAuthPermissions>;

export interface EnterpriseCrmEventbusProtoToken {
  name?: string;
  value?: string;
}

export const EnterpriseCrmEventbusProtoToken: Schema.Schema<EnterpriseCrmEventbusProtoToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoToken" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoToken>;

export interface EnterpriseCrmEventbusProtoAddress {
  /** Required. */
  email?: string;
  name?: string;
  tokens?: Array<EnterpriseCrmEventbusProtoToken>;
}

export const EnterpriseCrmEventbusProtoAddress: Schema.Schema<EnterpriseCrmEventbusProtoAddress> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  tokens: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoToken)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoAddress" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoAddress>;

export interface EnterpriseCrmEventbusProtoBuganizerNotification {
  /** ID of the buganizer component within which to create a new issue. Required. */
  componentId?: string;
  /** Title of the issue to be created. Required. */
  title?: string;
  /** Whom to assign the new bug. Optional. */
  assigneeEmailAddress?: string;
  /** ID of the buganizer template to use. Optional. */
  templateId?: string;
}

export const EnterpriseCrmEventbusProtoBuganizerNotification: Schema.Schema<EnterpriseCrmEventbusProtoBuganizerNotification> = Schema.suspend(() => Schema.Struct({
  componentId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  assigneeEmailAddress: Schema.optional(Schema.String),
  templateId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBuganizerNotification" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBuganizerNotification>;

export interface GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest {
  /** Matched against all {@link TriggerConfig}s across all workflows. i.e. TriggerConfig.trigger_id.equals(trigger_id) Required. */
  triggerId?: string;
  /** Optional. If the client id is provided, then the combination of trigger id and client id is matched across all the workflows. If the client id is not provided, then workflows with matching trigger id are executed for each client id in the {@link TriggerConfig}. For Api Trigger, the client id is required and will be validated against the allowed clients. */
  clientId?: string;
  /** Passed in as parameters to each workflow execution. Optional. */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  /** The request priority this request should be processed at. For internal users: */
  priority?: "UNSPCIFIED" | "SHEDDABLE" | "SHEDDABLE_PLUS" | "CRITICAL" | "CRITICAL_PLUS" | (string & {});
  /** Optional. Sets test mode in {@link enterprise/crm/eventbus/event_message.proto}. */
  testMode?: boolean;
  /** Optional. Time in milliseconds since epoch when the given event would be scheduled. */
  scheduledTime?: string;
  /** Optional. Flag to determine whether clients would suppress a warning when no ACTIVE workflows are not found. If this flag is set to be true, an error will not be thrown if the requested trigger_id or client_id is not found in any ACTIVE workflow. Otherwise, the error is always thrown. The flag is set to be false by default. */
  ignoreErrorIfNoActiveWorkflow?: boolean;
  /** Optional. If provided, the workflow_name is used to filter all the matched workflows having same trigger_id+client_id. A combination of trigger_id, client_id and workflow_name identifies a unique workflow. */
  workflowName?: string;
  /** Optional. This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. Must have no more than 36 characters and contain only alphanumeric characters and hyphens. */
  requestId?: string;
  /** This field is only required when using Admin Access. The resource name of target, or the parent resource name. For example: "projects/* /locations/* /integrations/*" */
  resourceName?: string;
  /** This is a unique id provided by the method caller. If provided this will be used as the execution_id when a new execution info is created. This is a string representation of a UUID. Must have no more than 36 characters and contain only alphanumeric characters and hyphens. */
  userGeneratedExecutionId?: string;
  /** Optional. This is a field to see the quota retry count for integration execution */
  quotaRetryCount?: number;
}

export const GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest: Schema.Schema<GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest> = Schema.suspend(() => Schema.Struct({
  triggerId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  parameters: Schema.optional(EnterpriseCrmEventbusProtoEventParameters),
  priority: Schema.optional(Schema.String),
  testMode: Schema.optional(Schema.Boolean),
  scheduledTime: Schema.optional(Schema.String),
  ignoreErrorIfNoActiveWorkflow: Schema.optional(Schema.Boolean),
  workflowName: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  userGeneratedExecutionId: Schema.optional(Schema.String),
  quotaRetryCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest" }) as any as Schema.Schema<GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest>;

export interface EnterpriseCrmEventbusProtoCustomSuspensionRequest {
  /** In the fired event, set the SuspensionInfo message as the value for this key. */
  suspensionInfoEventParameterKey?: string;
  /** Request to fire an event containing the SuspensionInfo message. */
  postToQueueWithTriggerIdRequest?: GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest;
}

export const EnterpriseCrmEventbusProtoCustomSuspensionRequest: Schema.Schema<EnterpriseCrmEventbusProtoCustomSuspensionRequest> = Schema.suspend(() => Schema.Struct({
  suspensionInfoEventParameterKey: Schema.optional(Schema.String),
  postToQueueWithTriggerIdRequest: Schema.optional(GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCustomSuspensionRequest" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCustomSuspensionRequest>;

export interface EnterpriseCrmEventbusProtoNotification {
  emailAddress?: EnterpriseCrmEventbusProtoAddress;
  pubsubTopic?: string;
  buganizerNotification?: EnterpriseCrmEventbusProtoBuganizerNotification;
  escalatorQueue?: string;
  /** If the out-of-the-box email/pubsub notifications are not suitable and custom logic is required, fire a workflow containing all info needed to notify users to resume execution. */
  request?: EnterpriseCrmEventbusProtoCustomSuspensionRequest;
}

export const EnterpriseCrmEventbusProtoNotification: Schema.Schema<EnterpriseCrmEventbusProtoNotification> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(EnterpriseCrmEventbusProtoAddress),
  pubsubTopic: Schema.optional(Schema.String),
  buganizerNotification: Schema.optional(EnterpriseCrmEventbusProtoBuganizerNotification),
  escalatorQueue: Schema.optional(Schema.String),
  request: Schema.optional(EnterpriseCrmEventbusProtoCustomSuspensionRequest),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoNotification" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoNotification>;

export interface EnterpriseCrmEventbusProtoSuspensionExpiration {
  /** Milliseconds after which the previous suspension action reminder, if any, is sent using the selected notification option, for a suspension which is still PENDING_UNSPECIFIED. */
  remindAfterMs?: number;
  /** Milliseconds after which the suspension expires, if no action taken. */
  expireAfterMs?: number;
  /** Whether the suspension will be REJECTED or LIFTED upon expiration. REJECTED is the default behavior. */
  liftWhenExpired?: boolean;
}

export const EnterpriseCrmEventbusProtoSuspensionExpiration: Schema.Schema<EnterpriseCrmEventbusProtoSuspensionExpiration> = Schema.suspend(() => Schema.Struct({
  remindAfterMs: Schema.optional(Schema.Number),
  expireAfterMs: Schema.optional(Schema.Number),
  liftWhenExpired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuspensionExpiration" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuspensionExpiration>;

export interface EnterpriseCrmEventbusProtoSuspensionConfig {
  /** Identities able to resolve this suspension. */
  whoMayResolve?: Array<EnterpriseCrmEventbusProtoSuspensionAuthPermissions>;
  /** Optional information to provide recipients of the suspension in addition to the resolution URL, typically containing relevant parameter values from the originating workflow. */
  customMessage?: string;
  notifications?: Array<EnterpriseCrmEventbusProtoNotification>;
  /** Indicates the next steps when no external actions happen on the suspension. */
  suspensionExpiration?: EnterpriseCrmEventbusProtoSuspensionExpiration;
}

export const EnterpriseCrmEventbusProtoSuspensionConfig: Schema.Schema<EnterpriseCrmEventbusProtoSuspensionConfig> = Schema.suspend(() => Schema.Struct({
  whoMayResolve: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoSuspensionAuthPermissions)),
  customMessage: Schema.optional(Schema.String),
  notifications: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoNotification)),
  suspensionExpiration: Schema.optional(EnterpriseCrmEventbusProtoSuspensionExpiration),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuspensionConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuspensionConfig>;

export interface GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration {
  /** Time after the previous suspension action reminder, if any, is sent using the selected notification option, for a suspension which is still PENDING_UNSPECIFIED. */
  remindTime?: string;
  /** Output only. Time after which the suspension expires, if no action taken. */
  expireTime?: string;
  /** Whether the suspension will be REJECTED or LIFTED upon expiration. REJECTED is the default behavior. */
  liftWhenExpired?: boolean;
}

export const GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration: Schema.Schema<GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration> = Schema.suspend(() => Schema.Struct({
  remindTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  liftWhenExpired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration>;

export interface GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig {
  /** Information to provide for recipients. */
  customMessage?: string;
  /** Email addresses to send approval request to. */
  emailAddresses?: Array<string>;
  /** Indicates the next steps when no external actions happen on the suspension. */
  expiration?: GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration;
}

export const GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig> = Schema.suspend(() => Schema.Struct({
  customMessage: Schema.optional(Schema.String),
  emailAddresses: Schema.optional(Schema.Array(Schema.String)),
  expiration: Schema.optional(GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig>;

export interface GoogleCloudIntegrationsV1alphaSuspension {
  /** Resource name for suspensions suspension/{suspension_id} */
  name?: string;
  /** Required. ID of the associated execution. */
  eventExecutionInfoId?: string;
  /** Required. Task id of the associated SuspensionTask. */
  taskId?: string;
  /** Required. State of this suspension, indicating what action a resolver has taken. */
  state?: "RESOLUTION_STATE_UNSPECIFIED" | "PENDING" | "REJECTED" | "LIFTED" | (string & {});
  /** Metadata pertaining to the resolution of this suspension. */
  audit?: GoogleCloudIntegrationsV1alphaSuspensionAudit;
  /** Output only. Auto-generated. */
  createTime?: string;
  /** Output only. Auto-generated. */
  lastModifyTime?: string;
  /** Controls the notifications and resolver permissions for this suspension. */
  suspensionConfig?: EnterpriseCrmEventbusProtoSuspensionConfig;
  /** Required. The name of the originating integration. */
  integration?: string;
  /** Controls the notifications and approval permissions for this suspension. */
  approvalConfig?: GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig;
}

export const GoogleCloudIntegrationsV1alphaSuspension: Schema.Schema<GoogleCloudIntegrationsV1alphaSuspension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  eventExecutionInfoId: Schema.optional(Schema.String),
  taskId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  audit: Schema.optional(GoogleCloudIntegrationsV1alphaSuspensionAudit),
  createTime: Schema.optional(Schema.String),
  lastModifyTime: Schema.optional(Schema.String),
  suspensionConfig: Schema.optional(EnterpriseCrmEventbusProtoSuspensionConfig),
  integration: Schema.optional(Schema.String),
  approvalConfig: Schema.optional(GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSuspension" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSuspension>;

export interface GoogleCloudIntegrationsV1alphaResolveSuspensionRequest {
  /** Suspension, containing the event_execution_info_id, task_id, and state to set on the corresponding suspension record. */
  suspension?: GoogleCloudIntegrationsV1alphaSuspension;
}

export const GoogleCloudIntegrationsV1alphaResolveSuspensionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaResolveSuspensionRequest> = Schema.suspend(() => Schema.Struct({
  suspension: Schema.optional(GoogleCloudIntegrationsV1alphaSuspension),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaResolveSuspensionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaResolveSuspensionRequest>;

export interface GoogleCloudIntegrationsV1alphaResolveSuspensionResponse {
}

export const GoogleCloudIntegrationsV1alphaResolveSuspensionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaResolveSuspensionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaResolveSuspensionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaResolveSuspensionResponse>;

export interface GoogleCloudIntegrationsV1alphaListSuspensionsResponse {
  /** The suspensions for the relevant execution which the caller has permissions to view and resolve. */
  suspensions?: Array<GoogleCloudIntegrationsV1alphaSuspension>;
  /** Token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListSuspensionsResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListSuspensionsResponse> = Schema.suspend(() => Schema.Struct({
  suspensions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaSuspension)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListSuspensionsResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListSuspensionsResponse>;

export interface GoogleCloudIntegrationsV1alphaLiftSuspensionRequest {
  /** User passed in suspension result and will be used to control workflow execution branching behavior by setting up corresponnding edge condition with suspension result. For example, if you want to lift the suspension, you can pass "Approved", or if you want to reject the suspension and terminate workfloe execution, you can pass "Rejected" and terminate the workflow execution with configuring the edge condition. */
  suspensionResult?: string;
}

export const GoogleCloudIntegrationsV1alphaLiftSuspensionRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaLiftSuspensionRequest> = Schema.suspend(() => Schema.Struct({
  suspensionResult: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaLiftSuspensionRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaLiftSuspensionRequest>;

export interface GoogleCloudIntegrationsV1alphaLiftSuspensionResponse {
  /** Execution Id that will be returned */
  eventExecutionInfoId?: string;
}

export const GoogleCloudIntegrationsV1alphaLiftSuspensionResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaLiftSuspensionResponse> = Schema.suspend(() => Schema.Struct({
  eventExecutionInfoId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaLiftSuspensionResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaLiftSuspensionResponse>;

export interface GoogleCloudIntegrationsV1alphaMockConfig {
  /** Mockstrategy defines how the particular task should be mocked during test execution */
  mockStrategy?: "MOCK_STRATEGY_UNSPECIFIED" | "NO_MOCK_STRATEGY" | "SPECIFIC_MOCK_STRATEGY" | "FAILURE_MOCK_STRATEGY" | "SKIP_MOCK_STRATEGY" | (string & {});
  /** Optional. List of key-value pairs for specific mock strategy */
  parameters?: Array<GoogleCloudIntegrationsV1alphaEventParameter>;
  /** Optional. Number of times the given task should fail for failure mock strategy */
  failedExecutions?: string;
}

export const GoogleCloudIntegrationsV1alphaMockConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaMockConfig> = Schema.suspend(() => Schema.Struct({
  mockStrategy: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaEventParameter)),
  failedExecutions: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaMockConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaMockConfig>;

export interface GoogleCloudIntegrationsV1alphaAssertion {
  /** Optional. The type of assertion to perform. */
  assertionStrategy?: "ASSERTION_STRATEGY_UNSPECIFIED" | "ASSERT_SUCCESSFUL_EXECUTION" | "ASSERT_FAILED_EXECUTION" | "ASSERT_NO_EXECUTION" | "ASSERT_EQUALS" | "ASSERT_NOT_EQUALS" | "ASSERT_CONTAINS" | "ASSERT_CONDITION" | (string & {});
  /** Optional. Key-value pair for ASSERT_EQUALS, ASSERT_NOT_EQUALS, ASSERT_CONTAINS to succeed */
  parameter?: GoogleCloudIntegrationsV1alphaEventParameter;
  /** Optional. Standard filter expression for ASSERT_CONDITION to succeed */
  condition?: string;
  /** Number of times given task should be retried in case of ASSERT_FAILED_EXECUTION */
  retryCount?: number;
}

export const GoogleCloudIntegrationsV1alphaAssertion: Schema.Schema<GoogleCloudIntegrationsV1alphaAssertion> = Schema.suspend(() => Schema.Struct({
  assertionStrategy: Schema.optional(Schema.String),
  parameter: Schema.optional(GoogleCloudIntegrationsV1alphaEventParameter),
  condition: Schema.optional(Schema.String),
  retryCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaAssertion" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaAssertion>;

export interface GoogleCloudIntegrationsV1alphaTestTaskConfig {
  /** Required. This defines in the test case, the task in integration which will be mocked by this test task config */
  taskNumber?: string;
  /** Optional. Defines how to mock the given task during test execution */
  mockConfig?: GoogleCloudIntegrationsV1alphaMockConfig;
  /** Optional. List of conditions or expressions which should be evaluated to true unless there is a bug/problem in the integration. These are evaluated one the task execution is completed as per the mock strategy in test case */
  assertions?: Array<GoogleCloudIntegrationsV1alphaAssertion>;
  /** Required. This defines in the test case, the task name in integration which will be mocked by this test task config */
  task?: string;
  /** Optional. Auto-generated. */
  taskConfig?: GoogleCloudIntegrationsV1alphaTaskConfig;
}

export const GoogleCloudIntegrationsV1alphaTestTaskConfig: Schema.Schema<GoogleCloudIntegrationsV1alphaTestTaskConfig> = Schema.suspend(() => Schema.Struct({
  taskNumber: Schema.optional(Schema.String),
  mockConfig: Schema.optional(GoogleCloudIntegrationsV1alphaMockConfig),
  assertions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaAssertion)),
  task: Schema.optional(Schema.String),
  taskConfig: Schema.optional(GoogleCloudIntegrationsV1alphaTaskConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTestTaskConfig" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTestTaskConfig>;

export interface GoogleCloudIntegrationsV1alphaTestCase {
  /** Output only. Auto-generated primary key. */
  name?: string;
  /** Required. The display name of test case. */
  displayName?: string;
  /** Optional. Description of the test case. */
  description?: string;
  /** Required. This defines the trigger ID in workflow which is considered to be executed as starting point of the test case */
  triggerId?: string;
  /** Optional. Parameters that are expected to be passed to the test case when the test case is triggered. This gives the user the ability to provide default values. This should include all the output variables of the trigger as input variables. */
  testInputParameters?: Array<GoogleCloudIntegrationsV1alphaIntegrationParameter>;
  /** Optional. However, the test case doesn't mock or assert anything without test_task_configs. */
  testTaskConfigs?: Array<GoogleCloudIntegrationsV1alphaTestTaskConfig>;
  /** Optional. Various policies for how to persist the test execution info including execution info, execution export info, execution metadata index and execution param index.. */
  databasePersistencePolicy?: "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED" | "DATABASE_PERSISTENCE_DISABLED" | "DATABASE_PERSISTENCE_ASYNC" | (string & {});
  /** Optional. The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  creatorEmail?: string;
  /** Auto-generated. */
  createTime?: string;
  /** The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  lastModifierEmail?: string;
  /** Auto-generated. */
  updateTime?: string;
  /** Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call. */
  lockHolderEmail?: string;
  /** Optional. Auto-generated. */
  triggerConfig?: GoogleCloudIntegrationsV1alphaTriggerConfig;
}

export const GoogleCloudIntegrationsV1alphaTestCase: Schema.Schema<GoogleCloudIntegrationsV1alphaTestCase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  triggerId: Schema.optional(Schema.String),
  testInputParameters: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationParameter)),
  testTaskConfigs: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTestTaskConfig)),
  databasePersistencePolicy: Schema.optional(Schema.String),
  creatorEmail: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastModifierEmail: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lockHolderEmail: Schema.optional(Schema.String),
  triggerConfig: Schema.optional(GoogleCloudIntegrationsV1alphaTriggerConfig),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTestCase" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTestCase>;

export interface GoogleCloudIntegrationsV1alphaListTestCasesResponse {
  /** The test cases corresponding to the specified filter */
  testCases?: Array<GoogleCloudIntegrationsV1alphaTestCase>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListTestCasesResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTestCase)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListTestCasesResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListTestCasesResponse>;

export interface GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest {
  /** Optional. Input parameters used by test case execution. */
  inputParameters?: Record<string, GoogleCloudIntegrationsV1alphaValueType>;
}

export const GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest> = Schema.suspend(() => Schema.Struct({
  inputParameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaValueType)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest>;

export interface GoogleCloudIntegrationsV1alphaAssertionResult {
  /** Assertion that was run. */
  assertion?: GoogleCloudIntegrationsV1alphaAssertion;
  /** Task number of task where the assertion was run. */
  taskNumber?: string;
  /** Task name of task where the assertion was run. */
  taskName?: string;
  /** Status of assertion to signify if the assertion succeeded or failed */
  status?: "ASSERTION_STATUS_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Details of the assertion failure */
  failureMessage?: string;
}

export const GoogleCloudIntegrationsV1alphaAssertionResult: Schema.Schema<GoogleCloudIntegrationsV1alphaAssertionResult> = Schema.suspend(() => Schema.Struct({
  assertion: Schema.optional(GoogleCloudIntegrationsV1alphaAssertion),
  taskNumber: Schema.optional(Schema.String),
  taskName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaAssertionResult" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaAssertionResult>;

export interface GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse {
  /** The id of the execution corresponding to this run of integration. */
  executionId?: string;
  /** OUTPUT parameters in format of Map. Where Key is the name of the parameter. Note: Name of the system generated parameters are wrapped by backtick(`) to distinguish them from the user defined parameters. */
  outputParameters?: Record<string, unknown>;
  /** Results of each assertions ran during execution of test case. */
  assertionResults?: Array<GoogleCloudIntegrationsV1alphaAssertionResult>;
  /** State of the test case execution */
  testExecutionState?: "STATE_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  assertionResults: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaAssertionResult)),
  testExecutionState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse>;

export interface GoogleCloudIntegrationsV1alphaUploadTestCaseRequest {
  /** The textproto of the test case. */
  content?: string;
  /** File format for upload request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaUploadTestCaseRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTestCaseRequest> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  fileFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUploadTestCaseRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTestCaseRequest>;

export interface GoogleCloudIntegrationsV1alphaUploadTestCaseResponse {
  /** The uploaded TestCase */
  testCase?: GoogleCloudIntegrationsV1alphaTestCase;
}

export const GoogleCloudIntegrationsV1alphaUploadTestCaseResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  testCase: Schema.optional(GoogleCloudIntegrationsV1alphaTestCase),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUploadTestCaseResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTestCaseResponse>;

export interface GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse {
  /** String representation of the test case. */
  content?: string;
}

export const GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse>;

export interface GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest {
}

export const GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest>;

export interface GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest {
}

export const GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest>;

export interface GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse {
  /** Results of each execution of test cases in an integration version. */
  executeTestCaseResponses?: Array<GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse>;
}

export const GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  executeTestCaseResponses: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse>;

export interface GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate {
  /** Required. Unique Key of the IntegrationVersion. */
  key?: string;
  /** Required. Templatized version of integration. */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate: Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate>;

export interface GoogleCloudIntegrationsV1alphaTemplateBundle {
  /** Required. Main integration templates of the template bundle. */
  integrationVersionTemplate?: GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate;
  /** Optional. Sub integration templates which would be added along with main integration. */
  subIntegrationVersionTemplates?: Array<GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate>;
}

export const GoogleCloudIntegrationsV1alphaTemplateBundle: Schema.Schema<GoogleCloudIntegrationsV1alphaTemplateBundle> = Schema.suspend(() => Schema.Struct({
  integrationVersionTemplate: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate),
  subIntegrationVersionTemplates: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTemplateBundle" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTemplateBundle>;

export interface GoogleCloudIntegrationsV1alphaTemplateComponent {
  /** Optional. Type of the component. */
  type?: "TYPE_UNSPECIFIED" | "TRIGGER" | "TASK" | "CONNECTOR" | (string & {});
  /** Optional. Name of the component. */
  name?: string;
}

export const GoogleCloudIntegrationsV1alphaTemplateComponent: Schema.Schema<GoogleCloudIntegrationsV1alphaTemplateComponent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTemplateComponent" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTemplateComponent>;

export interface GoogleCloudIntegrationsV1alphaTemplate {
  /** Identifier. Resource name of the template. */
  name?: string;
  /** Required. The name of the template */
  displayName?: string;
  /** Optional. Description of the template. The length should not be more than 255 characters */
  description?: string;
  /** Optional. Information on how to use the template. This should contain detailed information about usage of the template. */
  usageInfo?: string;
  /** Optional. Link to template documentation. */
  docLink?: string;
  /** Required. Bundle which is part of the templates. The template entities in the bundle would be converted to an actual entity. */
  templateBundle?: GoogleCloudIntegrationsV1alphaTemplateBundle;
  /** Optional. Components being used in the template. This could be used to categorize and filter. */
  components?: Array<GoogleCloudIntegrationsV1alphaTemplateComponent>;
  /** Required. Tags which are used to identify templates. These tags could be for business use case, connectors etc. */
  tags?: Array<string>;
  /** Required. Categories associated with the Template. The categories listed below will be utilized for the Template listing. */
  categories?: Array<"CATEGORY_UNSPECIFIED" | "AI_MACHINE_LEARNING" | "BUSINESS_INTELLIGENCE" | "COLLABORATION" | "CUSTOMER_SERVICE" | "DATABASES" | "DEVOPS_IT" | "CONTENT_AND_FILES" | "FINANCE_AND_ACCOUNTING" | "HUMAN_RESOURCES" | "OPERATIONS" | "PRODUCT_PROJECT_MANAGEMENT" | "PRODUCTIVITY" | "SALES_AND_MARKETING" | "UNIVERSAL_CONNECTORS" | "UTILITY" | "OTHERS" | (string & {})>;
  /** Output only. Auto-generated. */
  createTime?: string;
  /** Output only. Auto-generated */
  updateTime?: string;
  /** Optional. Creator of the template. */
  author?: string;
  /** Optional. Number of template usages. */
  usageCount?: string;
  /** Optional. Time the template was last used. */
  lastUsedTime?: string;
  /** Required. Visibility of the template. */
  visibility?: "VISIBILITY_UNSPECIFIED" | "PRIVATE" | "SHARED" | "PUBLIC" | (string & {});
  /** Required. Resource names with which the template is shared for example ProjectNumber/Ord id */
  sharedWith?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaTemplate: Schema.Schema<GoogleCloudIntegrationsV1alphaTemplate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  usageInfo: Schema.optional(Schema.String),
  docLink: Schema.optional(Schema.String),
  templateBundle: Schema.optional(GoogleCloudIntegrationsV1alphaTemplateBundle),
  components: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTemplateComponent)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  categories: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  author: Schema.optional(Schema.String),
  usageCount: Schema.optional(Schema.String),
  lastUsedTime: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
  sharedWith: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaTemplate" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaTemplate>;

export interface GoogleCloudIntegrationsV1alphaListTemplatesResponse {
  /** List of templates retrieved. */
  templates?: Array<GoogleCloudIntegrationsV1alphaTemplate>;
  /** The token used to retrieve the next page results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaListTemplatesResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaListTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  templates: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaListTemplatesResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaListTemplatesResponse>;

export interface GoogleCloudIntegrationsV1alphaSearchTemplatesResponse {
  /** List of templates retrieved. */
  templates?: Array<GoogleCloudIntegrationsV1alphaTemplate>;
  /** The token used to retrieve the next page results. */
  nextPageToken?: string;
}

export const GoogleCloudIntegrationsV1alphaSearchTemplatesResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaSearchTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  templates: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaSearchTemplatesResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaSearchTemplatesResponse>;

export interface GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails {
  /** Required. Name of the sub integration which would be created via templates. */
  integration?: string;
  /** Optional. Description of the sub integration which would be created via templates. */
  integrationDescription?: string;
}

export const GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails: Schema.Schema<GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails> = Schema.suspend(() => Schema.Struct({
  integration: Schema.optional(Schema.String),
  integrationDescription: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails>;

export interface GoogleCloudIntegrationsV1alphaUseTemplateRequest {
  /** Required. Integration details which would be created via templates. */
  integrationDetails?: GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails;
  /** Optional. Sub Integration which would be created via templates. */
  subIntegrations?: Record<string, GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails>;
  /** Required. The region of the Integration to be created. */
  integrationRegion?: string;
}

export const GoogleCloudIntegrationsV1alphaUseTemplateRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaUseTemplateRequest> = Schema.suspend(() => Schema.Struct({
  integrationDetails: Schema.optional(GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails),
  subIntegrations: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails)),
  integrationRegion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUseTemplateRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUseTemplateRequest>;

export interface GoogleCloudIntegrationsV1alphaUseTemplateResponse {
  /** IntegrationVersion which is created. */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
  /** Sub integration versions which are created. */
  subIntegrationVersions?: Array<GoogleCloudIntegrationsV1alphaIntegrationVersion>;
}

export const GoogleCloudIntegrationsV1alphaUseTemplateResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaUseTemplateResponse> = Schema.suspend(() => Schema.Struct({
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
  subIntegrationVersions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationVersion)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUseTemplateResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUseTemplateResponse>;

export interface GoogleCloudIntegrationsV1alphaImportTemplateRequest {
  /** Required. Resource Name of the integration where template needs to be imported/inserted. */
  integration?: string;
  /** Optional. Sub Integration which would be created via templates. */
  subIntegrations?: Record<string, GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails>;
}

export const GoogleCloudIntegrationsV1alphaImportTemplateRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaImportTemplateRequest> = Schema.suspend(() => Schema.Struct({
  integration: Schema.optional(Schema.String),
  subIntegrations: Schema.optional(Schema.Record(Schema.String, GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaImportTemplateRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaImportTemplateRequest>;

export interface GoogleCloudIntegrationsV1alphaImportTemplateResponse {
  /** IntegrationVersion after the import. */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
  /** Sub integration versions which are imported. */
  subIntegrationVersions?: Array<GoogleCloudIntegrationsV1alphaIntegrationVersion>;
}

export const GoogleCloudIntegrationsV1alphaImportTemplateResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaImportTemplateResponse> = Schema.suspend(() => Schema.Struct({
  integrationVersion: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion),
  subIntegrationVersions: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaIntegrationVersion)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaImportTemplateResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaImportTemplateResponse>;

export interface GoogleCloudIntegrationsV1alphaShareTemplateRequest {
  /** Optional. Project name resources to share the template. The project names is expected in resource format Ex: projects/{project-number} or organization/{org-id} */
  resourceNames?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaShareTemplateRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaShareTemplateRequest> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaShareTemplateRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaShareTemplateRequest>;

export interface GoogleCloudIntegrationsV1alphaUnshareTemplateRequest {
  /** Optional. Project name resources to unshare the template. The project names is expected in resource format Ex: projects/{project-number} */
  resourceNames?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaUnshareTemplateRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaUnshareTemplateRequest> = Schema.suspend(() => Schema.Struct({
  resourceNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUnshareTemplateRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUnshareTemplateRequest>;

export interface GoogleCloudIntegrationsV1alphaUploadTemplateRequest {
  /** Required. The textproto of the template. */
  content?: string;
  /** Required. File format for upload request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaUploadTemplateRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTemplateRequest> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  fileFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUploadTemplateRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTemplateRequest>;

export interface GoogleCloudIntegrationsV1alphaUploadTemplateResponse {
  /** The uploaded Template */
  template?: GoogleCloudIntegrationsV1alphaTemplate;
}

export const GoogleCloudIntegrationsV1alphaUploadTemplateResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTemplateResponse> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(GoogleCloudIntegrationsV1alphaTemplate),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaUploadTemplateResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaUploadTemplateResponse>;

export interface GoogleCloudIntegrationsV1alphaDownloadTemplateResponse {
  /** String representation of the template. */
  content?: string;
}

export const GoogleCloudIntegrationsV1alphaDownloadTemplateResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadTemplateResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaDownloadTemplateResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaDownloadTemplateResponse>;

export interface GoogleCloudIntegrationsV1alphaApiTriggerResource {
  /** Required. Integration where the API is published */
  integrationResource?: string;
  /** Required. Trigger Id of the API trigger(s) in the integration */
  triggerId?: Array<string>;
}

export const GoogleCloudIntegrationsV1alphaApiTriggerResource: Schema.Schema<GoogleCloudIntegrationsV1alphaApiTriggerResource> = Schema.suspend(() => Schema.Struct({
  integrationResource: Schema.optional(Schema.String),
  triggerId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaApiTriggerResource" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaApiTriggerResource>;

export interface GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest {
  /** Required. List of api triggers */
  apiTriggerResources?: Array<GoogleCloudIntegrationsV1alphaApiTriggerResource>;
  /** Required. File format for generated spec. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest: Schema.Schema<GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest> = Schema.suspend(() => Schema.Struct({
  apiTriggerResources: Schema.optional(Schema.Array(GoogleCloudIntegrationsV1alphaApiTriggerResource)),
  fileFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest>;

export interface GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse {
  /** Open API spec as per the required format */
  openApiSpec?: string;
}

export const GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse> = Schema.suspend(() => Schema.Struct({
  openApiSpec: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse>;

export interface GoogleCloudIntegrationsV1alphaGenerateTokenResponse {
  /** The message that notifies the user if the request succeeded or not. */
  message?: string;
}

export const GoogleCloudIntegrationsV1alphaGenerateTokenResponse: Schema.Schema<GoogleCloudIntegrationsV1alphaGenerateTokenResponse> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIntegrationsV1alphaGenerateTokenResponse" }) as any as Schema.Schema<GoogleCloudIntegrationsV1alphaGenerateTokenResponse>;

export interface EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam {
  /** UUID of the AuthConfig. */
  authConfigId?: string;
  /** Defines the credential types to be supported as Task may restrict specific types to use, e.g. Cloud SQL Task will use username/password type only. */
  allowedCredentialTypes?: Array<"CREDENTIAL_TYPE_UNSPECIFIED" | "USERNAME_AND_PASSWORD" | "API_KEY" | "OAUTH2_AUTHORIZATION_CODE" | "OAUTH2_IMPLICIT" | "OAUTH2_CLIENT_CREDENTIALS" | "OAUTH2_RESOURCE_OWNER_CREDENTIALS" | "JWT" | "AUTH_TOKEN" | "SERVICE_ACCOUNT" | "CLIENT_CERTIFICATE_ONLY" | "OIDC_TOKEN" | (string & {})>;
  allowedServiceAccountInContext?: boolean;
  useServiceAccountInContext?: boolean;
  /** A space-delimited list of requested scope permissions. */
  scope?: string;
}

export const EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam: Schema.Schema<EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam> = Schema.suspend(() => Schema.Struct({
  authConfigId: Schema.optional(Schema.String),
  allowedCredentialTypes: Schema.optional(Schema.Array(Schema.String)),
  allowedServiceAccountInContext: Schema.optional(Schema.Boolean),
  useServiceAccountInContext: Schema.optional(Schema.Boolean),
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam" }) as any as Schema.Schema<EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam>;

export interface EnterpriseCrmEventbusProtoBaseFunction {
  functionName?: "UNSPECIFIED" | "NOW_IN_MILLIS" | "INT_LIST" | "ENVIRONMENT" | "GET_EXECUTION_ID" | "GET_INTEGRATION_NAME" | "GET_REGION" | "GET_UUID" | "GET_PROJECT_ID" | (string & {});
}

export const EnterpriseCrmEventbusProtoBaseFunction: Schema.Schema<EnterpriseCrmEventbusProtoBaseFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBaseFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBaseFunction>;

export interface EnterpriseCrmEventbusProtoStringFunction {
  functionName?: "UNSPECIFIED" | "CONCAT" | "TO_UPPERCASE" | "TO_LOWERCASE" | "CONTAINS" | "SPLIT" | "LENGTH" | "EQUALS" | "TO_INT" | "TO_DOUBLE" | "TO_BOOLEAN" | "TO_BASE_64" | "TO_JSON" | "EQUALS_IGNORE_CASE" | "REPLACE_ALL" | "SUBSTRING" | "RESOLVE_TEMPLATE" | "DECODE_BASE64_STRING" | (string & {});
}

export const EnterpriseCrmEventbusProtoStringFunction: Schema.Schema<EnterpriseCrmEventbusProtoStringFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoStringFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoStringFunction>;

export interface EnterpriseCrmEventbusProtoIntFunction {
  functionName?: "UNSPECIFIED" | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE" | "EXPONENT" | "GREATER_THAN_EQUAL_TO" | "GREATER_THAN" | "LESS_THAN_EQUAL_TO" | "LESS_THAN" | "TO_DOUBLE" | "TO_STRING" | "EQUALS" | "TO_JSON" | "MOD" | "EPOCH_TO_HUMAN_READABLE_TIME" | (string & {});
}

export const EnterpriseCrmEventbusProtoIntFunction: Schema.Schema<EnterpriseCrmEventbusProtoIntFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoIntFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoIntFunction>;

export interface EnterpriseCrmEventbusProtoDoubleFunction {
  functionName?: "UNSPECIFIED" | "TO_JSON" | "TO_STRING" | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE" | "EXPONENT" | "ROUND" | "FLOOR" | "CEIL" | "GREATER_THAN" | "LESS_THAN" | "EQUALS" | "GREATER_THAN_EQUALS" | "LESS_THAN_EQUALS" | "MOD" | (string & {});
}

export const EnterpriseCrmEventbusProtoDoubleFunction: Schema.Schema<EnterpriseCrmEventbusProtoDoubleFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoDoubleFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoDoubleFunction>;

export interface EnterpriseCrmEventbusProtoBooleanFunction {
  functionName?: "UNSPECIFIED" | "TO_JSON" | "NOT" | "AND" | "NAND" | "OR" | "XOR" | "NOR" | "XNOR" | "TO_STRING" | "EQUALS" | (string & {});
}

export const EnterpriseCrmEventbusProtoBooleanFunction: Schema.Schema<EnterpriseCrmEventbusProtoBooleanFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBooleanFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBooleanFunction>;

export interface EnterpriseCrmEventbusProtoProtoFunction {
  functionName?: "UNSPECIFIED" | "GET_STRING_SUBFIELD" | "GET_INT_SUBFIELD" | "GET_DOUBLE_SUBFIELD" | "GET_BOOLEAN_SUBFIELD" | "GET_STRING_ARRAY_SUBFIELD" | "GET_INT_ARRAY_SUBFIELD" | "GET_DOUBLE_ARRAY_SUBFIELD" | "GET_BOOLEAN_ARRAY_SUBFIELD" | "GET_PROTO_ARRAY_SUBFIELD" | "GET_PROTO_SUBFIELD" | "TO_JSON" | "GET_BYTES_SUBFIELD_AS_UTF_8_STRING" | "GET_BYTES_SUBFIELD_AS_PROTO" | "EQUALS" | (string & {});
}

export const EnterpriseCrmEventbusProtoProtoFunction: Schema.Schema<EnterpriseCrmEventbusProtoProtoFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoProtoFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoProtoFunction>;

export interface EnterpriseCrmEventbusProtoStringArrayFunction {
  functionName?: "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER" | (string & {});
}

export const EnterpriseCrmEventbusProtoStringArrayFunction: Schema.Schema<EnterpriseCrmEventbusProtoStringArrayFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoStringArrayFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoStringArrayFunction>;

export interface EnterpriseCrmEventbusProtoIntArrayFunction {
  functionName?: "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "SUM" | "AVG" | "MAX" | "MIN" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER" | (string & {});
}

export const EnterpriseCrmEventbusProtoIntArrayFunction: Schema.Schema<EnterpriseCrmEventbusProtoIntArrayFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoIntArrayFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoIntArrayFunction>;

export interface EnterpriseCrmEventbusProtoDoubleArrayFunction {
  functionName?: "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "SUM" | "AVG" | "MAX" | "MIN" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER" | (string & {});
}

export const EnterpriseCrmEventbusProtoDoubleArrayFunction: Schema.Schema<EnterpriseCrmEventbusProtoDoubleArrayFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoDoubleArrayFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoDoubleArrayFunction>;

export interface EnterpriseCrmEventbusProtoBooleanArrayFunction {
  functionName?: "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER" | (string & {});
}

export const EnterpriseCrmEventbusProtoBooleanArrayFunction: Schema.Schema<EnterpriseCrmEventbusProtoBooleanArrayFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBooleanArrayFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBooleanArrayFunction>;

export interface EnterpriseCrmEventbusProtoProtoArrayFunction {
  functionName?: "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER" | (string & {});
}

export const EnterpriseCrmEventbusProtoProtoArrayFunction: Schema.Schema<EnterpriseCrmEventbusProtoProtoArrayFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoProtoArrayFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoProtoArrayFunction>;

export interface EnterpriseCrmEventbusProtoJsonFunction {
  functionName?: "UNSPECIFIED" | "GET_PROPERTY" | "GET_ELEMENT" | "APPEND_ELEMENT" | "SIZE" | "SET_PROPERTY" | "FLATTEN" | "FLATTEN_ONCE" | "MERGE" | "TO_STRING" | "TO_INT" | "TO_DOUBLE" | "TO_BOOLEAN" | "TO_PROTO" | "TO_STRING_ARRAY" | "TO_INT_ARRAY" | "TO_DOUBLE_ARRAY" | "TO_PROTO_ARRAY" | "TO_BOOLEAN_ARRAY" | "REMOVE_PROPERTY" | "RESOLVE_TEMPLATE" | "EQUALS" | "FOR_EACH" | "FILTER_ELEMENTS" | (string & {});
}

export const EnterpriseCrmEventbusProtoJsonFunction: Schema.Schema<EnterpriseCrmEventbusProtoJsonFunction> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoJsonFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoJsonFunction>;

export interface EnterpriseCrmEventbusProtoFunctionType {
  /** LINT.IfChange */
  baseFunction?: EnterpriseCrmEventbusProtoBaseFunction;
  stringFunction?: EnterpriseCrmEventbusProtoStringFunction;
  intFunction?: EnterpriseCrmEventbusProtoIntFunction;
  doubleFunction?: EnterpriseCrmEventbusProtoDoubleFunction;
  booleanFunction?: EnterpriseCrmEventbusProtoBooleanFunction;
  protoFunction?: EnterpriseCrmEventbusProtoProtoFunction;
  stringArrayFunction?: EnterpriseCrmEventbusProtoStringArrayFunction;
  intArrayFunction?: EnterpriseCrmEventbusProtoIntArrayFunction;
  doubleArrayFunction?: EnterpriseCrmEventbusProtoDoubleArrayFunction;
  booleanArrayFunction?: EnterpriseCrmEventbusProtoBooleanArrayFunction;
  protoArrayFunction?: EnterpriseCrmEventbusProtoProtoArrayFunction;
  jsonFunction?: EnterpriseCrmEventbusProtoJsonFunction;
}

export const EnterpriseCrmEventbusProtoFunctionType: Schema.Schema<EnterpriseCrmEventbusProtoFunctionType> = Schema.suspend(() => Schema.Struct({
  baseFunction: Schema.optional(EnterpriseCrmEventbusProtoBaseFunction),
  stringFunction: Schema.optional(EnterpriseCrmEventbusProtoStringFunction),
  intFunction: Schema.optional(EnterpriseCrmEventbusProtoIntFunction),
  doubleFunction: Schema.optional(EnterpriseCrmEventbusProtoDoubleFunction),
  booleanFunction: Schema.optional(EnterpriseCrmEventbusProtoBooleanFunction),
  protoFunction: Schema.optional(EnterpriseCrmEventbusProtoProtoFunction),
  stringArrayFunction: Schema.optional(EnterpriseCrmEventbusProtoStringArrayFunction),
  intArrayFunction: Schema.optional(EnterpriseCrmEventbusProtoIntArrayFunction),
  doubleArrayFunction: Schema.optional(EnterpriseCrmEventbusProtoDoubleArrayFunction),
  booleanArrayFunction: Schema.optional(EnterpriseCrmEventbusProtoBooleanArrayFunction),
  protoArrayFunction: Schema.optional(EnterpriseCrmEventbusProtoProtoArrayFunction),
  jsonFunction: Schema.optional(EnterpriseCrmEventbusProtoJsonFunction),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoFunctionType" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoFunctionType>;

export interface EnterpriseCrmEventbusProtoFunction {
  /** The name of the function to perform. */
  functionType?: EnterpriseCrmEventbusProtoFunctionType;
  /** List of parameters required for the transformation. */
  parameters?: Array<EnterpriseCrmEventbusProtoTransformExpression>;
}

export const EnterpriseCrmEventbusProtoFunction: Schema.Schema<EnterpriseCrmEventbusProtoFunction> = Schema.suspend(() => Schema.Struct({
  functionType: Schema.optional(EnterpriseCrmEventbusProtoFunctionType),
  parameters: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoTransformExpression)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoFunction" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoFunction>;

export interface EnterpriseCrmEventbusProtoBaseValue {
  /** Start with a literal value. */
  literalValue?: EnterpriseCrmEventbusProtoParameterValueType;
  /** Start with a reference value to dereference. */
  referenceValue?: string;
  /** Start with a function that does not build on existing values. Eg. CurrentTime, Min, Max, Exists, etc. */
  baseFunction?: EnterpriseCrmEventbusProtoFunction;
}

export const EnterpriseCrmEventbusProtoBaseValue: Schema.Schema<EnterpriseCrmEventbusProtoBaseValue> = Schema.suspend(() => Schema.Struct({
  literalValue: Schema.optional(EnterpriseCrmEventbusProtoParameterValueType),
  referenceValue: Schema.optional(Schema.String),
  baseFunction: Schema.optional(EnterpriseCrmEventbusProtoFunction),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoBaseValue" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoBaseValue>;

export interface EnterpriseCrmEventbusProtoTransformExpression {
  /** Initial value upon which to perform transformations. */
  initialValue?: EnterpriseCrmEventbusProtoBaseValue;
  /** Transformations to be applied sequentially. */
  transformationFunctions?: Array<EnterpriseCrmEventbusProtoFunction>;
}

export const EnterpriseCrmEventbusProtoTransformExpression: Schema.Schema<EnterpriseCrmEventbusProtoTransformExpression> = Schema.suspend(() => Schema.Struct({
  initialValue: Schema.optional(EnterpriseCrmEventbusProtoBaseValue),
  transformationFunctions: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoFunction)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoTransformExpression" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoTransformExpression>;

export interface EnterpriseCrmEventbusProtoField {
  /** This holds the reference key of the workflow or task parameter. 1. Any workflow parameter, for e.g. $workflowParam1$. 2. Any task input or output parameter, for e.g. $task1_param1$. 3. Any workflow or task parameters with subfield references, for e.g., $task1_param1.employee.id$ */
  referenceKey?: string;
  /** This is the transform expression to fetch the input field value. for e.g. $param1$.CONCAT('test'). Keep points - 1. Only input field can have a transform expression. 2. If a transform expression is provided, reference_key will be ignored. 3. If no value is returned after evaluation of transform expression, default_value can be mapped if provided. 4. The field_type should be the type of the final object returned after the transform expression is evaluated. Scrubs the transform expression before logging as value provided by user so may or may not contain PII or SPII data. */
  transformExpression?: EnterpriseCrmEventbusProtoTransformExpression;
  /** This holds the default values for the fields. This value is supplied by user so may or may not contain PII or SPII data. */
  defaultValue?: EnterpriseCrmEventbusProtoParameterValueType;
  /** Specifies the data type of the field. */
  fieldType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
  /** Optional. The fully qualified proto name (e.g. enterprise.crm.storage.Account). Required for output field of type PROTO_VALUE or PROTO_ARRAY. For e.g., if input field_type is BYTES and output field_type is PROTO_VALUE, then fully qualified proto type url should be provided to parse the input bytes. If field_type is *_ARRAY, then all the converted protos are of the same type. */
  protoDefPath?: string;
  /** By default, if the cardinality is unspecified the field is considered required while mapping. */
  cardinality?: "UNSPECIFIED" | "OPTIONAL" | (string & {});
}

export const EnterpriseCrmEventbusProtoField: Schema.Schema<EnterpriseCrmEventbusProtoField> = Schema.suspend(() => Schema.Struct({
  referenceKey: Schema.optional(Schema.String),
  transformExpression: Schema.optional(EnterpriseCrmEventbusProtoTransformExpression),
  defaultValue: Schema.optional(EnterpriseCrmEventbusProtoParameterValueType),
  fieldType: Schema.optional(Schema.String),
  protoDefPath: Schema.optional(Schema.String),
  cardinality: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoField" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoField>;

export interface EnterpriseCrmEventbusProtoMappedField {
  /** The input field being mapped from. */
  inputField?: EnterpriseCrmEventbusProtoField;
  /** The output field being mapped to. */
  outputField?: EnterpriseCrmEventbusProtoField;
}

export const EnterpriseCrmEventbusProtoMappedField: Schema.Schema<EnterpriseCrmEventbusProtoMappedField> = Schema.suspend(() => Schema.Struct({
  inputField: Schema.optional(EnterpriseCrmEventbusProtoField),
  outputField: Schema.optional(EnterpriseCrmEventbusProtoField),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoMappedField" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoMappedField>;

export interface EnterpriseCrmEventbusProtoFieldMappingConfig {
  mappedFields?: Array<EnterpriseCrmEventbusProtoMappedField>;
}

export const EnterpriseCrmEventbusProtoFieldMappingConfig: Schema.Schema<EnterpriseCrmEventbusProtoFieldMappingConfig> = Schema.suspend(() => Schema.Struct({
  mappedFields: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoMappedField)),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoFieldMappingConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoFieldMappingConfig>;

export interface EnterpriseCrmEventbusProtoLoopMetadata {
  /** Starting from 1, not 0. */
  currentIterationCount?: string;
  /** Needs to be set by the loop impl class before each iteration. The abstract loop class will append the request and response to it. Eg. The foreach Loop will clean up and set it as the current iteration element at the start of each loop. The post request and response will be appended to the value once they are available. */
  currentIterationDetail?: string;
  /** Add the error message when loops fail. */
  errorMsg?: string;
  /** Indicates where in the loop logic did it error out. */
  failureLocation?: "UNKNOWN" | "SUBWORKFLOW" | "PARAM_OVERRIDING" | "PARAM_AGGREGATING" | "SETTING_ITERATION_ELEMENT" | "GETTING_LIST_TO_ITERATE" | "CONDITION_EVALUATION" | "BUILDING_REQUEST" | (string & {});
}

export const EnterpriseCrmEventbusProtoLoopMetadata: Schema.Schema<EnterpriseCrmEventbusProtoLoopMetadata> = Schema.suspend(() => Schema.Struct({
  currentIterationCount: Schema.optional(Schema.String),
  currentIterationDetail: Schema.optional(Schema.String),
  errorMsg: Schema.optional(Schema.String),
  failureLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoLoopMetadata" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoLoopMetadata>;

export interface EnterpriseCrmEventbusProtoParameterMapField {
  /** Referencing one of the WF variables. */
  referenceKey?: string;
  /** Passing a literal value. */
  literalValue?: EnterpriseCrmEventbusProtoParameterValueType;
}

export const EnterpriseCrmEventbusProtoParameterMapField: Schema.Schema<EnterpriseCrmEventbusProtoParameterMapField> = Schema.suspend(() => Schema.Struct({
  referenceKey: Schema.optional(Schema.String),
  literalValue: Schema.optional(EnterpriseCrmEventbusProtoParameterValueType),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParameterMapField" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParameterMapField>;

export interface EnterpriseCrmEventbusProtoParameterMapEntry {
  key?: EnterpriseCrmEventbusProtoParameterMapField;
  value?: EnterpriseCrmEventbusProtoParameterMapField;
}

export const EnterpriseCrmEventbusProtoParameterMapEntry: Schema.Schema<EnterpriseCrmEventbusProtoParameterMapEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(EnterpriseCrmEventbusProtoParameterMapField),
  value: Schema.optional(EnterpriseCrmEventbusProtoParameterMapField),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParameterMapEntry" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParameterMapEntry>;

export interface EnterpriseCrmEventbusProtoParameterMap {
  entries?: Array<EnterpriseCrmEventbusProtoParameterMapEntry>;
  /** Option to specify key value type for all entries of the map. If provided then field types for all entries must conform to this. */
  keyType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
  valueType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
}

export const EnterpriseCrmEventbusProtoParameterMap: Schema.Schema<EnterpriseCrmEventbusProtoParameterMap> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoParameterMapEntry)),
  keyType: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoParameterMap" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoParameterMap>;

export interface EnterpriseCrmEventbusProtoScatterResponse {
  /** The element that was scattered for this execution. */
  scatterElement?: EnterpriseCrmEventbusProtoParameterValueType;
  /** The execution ids of each Subworkflow fired by this scatter. */
  executionIds?: Array<string>;
  /** If execution is sync, this is true if the execution passed and false if it failed. If the execution is async, this is true if the WF was fired off successfully, and false if it failed to execute. The success or failure of the subworkflows executed are not captured. */
  isSuccessful?: boolean;
  /** A list of all the response parameters in the aggregtorMap stored with the remapped key. */
  responseParams?: Array<EnterpriseCrmEventbusProtoParameterEntry>;
  /** The error message of the failure if applicable. */
  errorMsg?: string;
}

export const EnterpriseCrmEventbusProtoScatterResponse: Schema.Schema<EnterpriseCrmEventbusProtoScatterResponse> = Schema.suspend(() => Schema.Struct({
  scatterElement: Schema.optional(EnterpriseCrmEventbusProtoParameterValueType),
  executionIds: Schema.optional(Schema.Array(Schema.String)),
  isSuccessful: Schema.optional(Schema.Boolean),
  responseParams: Schema.optional(Schema.Array(EnterpriseCrmEventbusProtoParameterEntry)),
  errorMsg: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoScatterResponse" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoScatterResponse>;

export interface EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit {
  timestamp?: string;
  resolvedBy?: string;
  resolvedByCpi?: string;
}

export const EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit: Schema.Schema<EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit> = Schema.suspend(() => Schema.Struct({
  timestamp: Schema.optional(Schema.String),
  resolvedBy: Schema.optional(Schema.String),
  resolvedByCpi: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit>;

export interface EnterpriseCrmEventbusProtoExternalTraffic {
  source?: "SOURCE_UNSPECIFIED" | "APIGEE" | "SECURITY" | (string & {});
  /** User’s GCP project id the traffic is referring to. */
  gcpProjectId?: string;
  /** User’s GCP project number the traffic is referring to. */
  gcpProjectNumber?: string;
  /** Location for the user's request. */
  location?: string;
  /** Enqueue the execution request due to quota issue */
  retryRequestForQuota?: boolean;
  /** Indicates the client enables internal IP feature, this is applicable for internal clients only. */
  enableInternalIp?: boolean;
}

export const EnterpriseCrmEventbusProtoExternalTraffic: Schema.Schema<EnterpriseCrmEventbusProtoExternalTraffic> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpProjectNumber: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  retryRequestForQuota: Schema.optional(Schema.Boolean),
  enableInternalIp: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoExternalTraffic" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoExternalTraffic>;

export interface EnterpriseCrmEventbusProtoCloudKmsConfig {
  /** Location name of the key ring, e.g. "us-west1". */
  locationName?: string;
  /** A key ring organizes keys in a specific Google Cloud location and allows you to manage access control on groups of keys. A key ring's name does not need to be unique across a Google Cloud project, but must be unique within a given location. */
  keyRingName?: string;
  /** A Cloud KMS key is a named object containing one or more key versions, along with metadata for the key. A key exists on exactly one key ring tied to a specific location. */
  keyName?: string;
  /** Optional. Each version of a key contains key material used for encryption or signing. A key's version is represented by an integer, starting at 1. To decrypt data or verify a signature, you must use the same key version that was used to encrypt or sign the data. */
  keyVersionName?: string;
  /** Optional. The id of GCP project where the KMS key is stored. If not provided, assume the key is stored in the same GCP project defined in Client (tag 14). */
  gcpProjectId?: string;
  /** Optional. The service account used for authentication of this KMS key. If this is not provided, the service account in Client.clientSource will be used. */
  serviceAccount?: string;
}

export const EnterpriseCrmEventbusProtoCloudKmsConfig: Schema.Schema<EnterpriseCrmEventbusProtoCloudKmsConfig> = Schema.suspend(() => Schema.Struct({
  locationName: Schema.optional(Schema.String),
  keyRingName: Schema.optional(Schema.String),
  keyName: Schema.optional(Schema.String),
  keyVersionName: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoCloudKmsConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoCloudKmsConfig>;

export interface EnterpriseCrmEventbusProtoSuspensionResolutionInfo {
  /** Primary key for the SuspensionResolutionInfoTable. */
  suspensionId?: string;
  /** Required. ID of the associated execution. */
  eventExecutionInfoId?: string;
  /** Required. Task number of the associated SuspensionTask. */
  taskNumber?: string;
  status?: "PENDING_UNSPECIFIED" | "REJECTED" | "LIFTED" | "CANCELED" | (string & {});
  audit?: EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit;
  /** Auto-generated. */
  createdTimestamp?: string;
  /** Auto-generated. */
  lastModifiedTimestamp?: string;
  suspensionConfig?: EnterpriseCrmEventbusProtoSuspensionConfig;
  /** Required. The name of the originating workflow. */
  workflowName?: string;
  /** The origin of the suspension for periodic notifications. */
  externalTraffic?: EnterpriseCrmEventbusProtoExternalTraffic;
  /** Which Google product the suspension belongs to. If not set, the suspension belongs to Integration Platform by default. */
  product?: "UNSPECIFIED_PRODUCT" | "IP" | "APIGEE" | "SECURITY" | (string & {});
  /** KMS info, used by cmek/gmek integration */
  cloudKmsConfig?: EnterpriseCrmEventbusProtoCloudKmsConfig;
  /** Encrypted SuspensionResolutionInfo */
  encryptedSuspensionResolutionInfo?: string;
  /** Wrapped dek */
  wrappedDek?: string;
  /** The event data user sends as request. */
  clientId?: string;
}

export const EnterpriseCrmEventbusProtoSuspensionResolutionInfo: Schema.Schema<EnterpriseCrmEventbusProtoSuspensionResolutionInfo> = Schema.suspend(() => Schema.Struct({
  suspensionId: Schema.optional(Schema.String),
  eventExecutionInfoId: Schema.optional(Schema.String),
  taskNumber: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  audit: Schema.optional(EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit),
  createdTimestamp: Schema.optional(Schema.String),
  lastModifiedTimestamp: Schema.optional(Schema.String),
  suspensionConfig: Schema.optional(EnterpriseCrmEventbusProtoSuspensionConfig),
  workflowName: Schema.optional(Schema.String),
  externalTraffic: Schema.optional(EnterpriseCrmEventbusProtoExternalTraffic),
  product: Schema.optional(Schema.String),
  cloudKmsConfig: Schema.optional(EnterpriseCrmEventbusProtoCloudKmsConfig),
  encryptedSuspensionResolutionInfo: Schema.optional(Schema.String),
  wrappedDek: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoSuspensionResolutionInfo" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoSuspensionResolutionInfo>;

export interface EnterpriseCrmFrontendsEventbusProtoParameterMapField {
  /** Referencing one of the WF variables. */
  referenceKey?: string;
  /** Passing a literal value. */
  literalValue?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
}

export const EnterpriseCrmFrontendsEventbusProtoParameterMapField: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterMapField> = Schema.suspend(() => Schema.Struct({
  referenceKey: Schema.optional(Schema.String),
  literalValue: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParameterValueType),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParameterMapField" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterMapField>;

export interface EnterpriseCrmFrontendsEventbusProtoParameterMapEntry {
  key?: EnterpriseCrmFrontendsEventbusProtoParameterMapField;
  value?: EnterpriseCrmFrontendsEventbusProtoParameterMapField;
}

export const EnterpriseCrmFrontendsEventbusProtoParameterMapEntry: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterMapEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParameterMapField),
  value: Schema.optional(EnterpriseCrmFrontendsEventbusProtoParameterMapField),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParameterMapEntry" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterMapEntry>;

export interface EnterpriseCrmFrontendsEventbusProtoParameterMap {
  entries?: Array<EnterpriseCrmFrontendsEventbusProtoParameterMapEntry>;
  /** Option to specify key value type for all entries of the map. If provided then field types for all entries must conform to this. */
  keyType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
  valueType?: "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE" | (string & {});
}

export const EnterpriseCrmFrontendsEventbusProtoParameterMap: Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterMap> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(EnterpriseCrmFrontendsEventbusProtoParameterMapEntry)),
  keyType: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmFrontendsEventbusProtoParameterMap" }) as any as Schema.Schema<EnterpriseCrmFrontendsEventbusProtoParameterMap>;

export interface EnterpriseCrmEventbusProtoConnectorsConnection {
  /** Connection name Format: projects/{project}/locations/{location}/connections/{connection} */
  connectionName?: string;
  /** Service name Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service} */
  serviceName?: string;
  /** Connector version Format: projects/{project}/locations/{location}/providers/{provider}/connectors/{connector}/versions/{version} */
  connectorVersion?: string;
  /** The name of the Hostname of the Service Directory service with TLS if used. */
  host?: string;
}

export const EnterpriseCrmEventbusProtoConnectorsConnection: Schema.Schema<EnterpriseCrmEventbusProtoConnectorsConnection> = Schema.suspend(() => Schema.Struct({
  connectionName: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  connectorVersion: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoConnectorsConnection" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoConnectorsConnection>;

export interface EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig {
  /** User-selected connection. */
  connection?: EnterpriseCrmEventbusProtoConnectorsConnection;
  /** Operation to perform using the configured connection. */
  operation?: "OPERATION_UNSPECIFIED" | "EXECUTE_ACTION" | "LIST_ENTITIES" | "GET_ENTITY" | "CREATE_ENTITY" | "UPDATE_ENTITY" | "DELETE_ENTITY" | "EXECUTE_QUERY" | (string & {});
}

export const EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig: Schema.Schema<EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig> = Schema.suspend(() => Schema.Struct({
  connection: Schema.optional(EnterpriseCrmEventbusProtoConnectorsConnection),
  operation: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig" }) as any as Schema.Schema<EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetClientmetadataProjectsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
}

export const GetClientmetadataProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/clientmetadata" }),
  svc,
) as unknown as Schema.Schema<GetClientmetadataProjectsRequest>;

export type GetClientmetadataProjectsResponse = GoogleCloudIntegrationsV1alphaGetClientMetadataResponse;
export const GetClientmetadataProjectsResponse = GoogleCloudIntegrationsV1alphaGetClientMetadataResponse;

export type GetClientmetadataProjectsError = CommonErrors;

/** Gets the metadata info for the requested client */
export const getClientmetadataProjects: API.OperationMethod<GetClientmetadataProjectsRequest, GetClientmetadataProjectsResponse, GetClientmetadataProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetClientmetadataProjectsRequest,
  output: GetClientmetadataProjectsResponse,
  errors: [],
}));

export interface GetClientsProjectsLocationsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
}

export const GetClientsProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/clients" }),
  svc,
) as unknown as Schema.Schema<GetClientsProjectsLocationsRequest>;

export type GetClientsProjectsLocationsResponse = GoogleCloudIntegrationsV1alphaGetClientResponse;
export const GetClientsProjectsLocationsResponse = GoogleCloudIntegrationsV1alphaGetClientResponse;

export type GetClientsProjectsLocationsError = CommonErrors;

/** Gets the client configuration for the given project and location resource name */
export const getClientsProjectsLocations: API.OperationMethod<GetClientsProjectsLocationsRequest, GetClientsProjectsLocationsResponse, GetClientsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetClientsProjectsLocationsRequest,
  output: GetClientsProjectsLocationsResponse,
  errors: [],
}));

export interface GenerateOpenApiSpecProjectsLocationsRequest {
  /** Required. Project and location from which the integrations should be fetched. Format: projects/{project}/location/{location} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest;
}

export const GenerateOpenApiSpecProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:generateOpenApiSpec", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateOpenApiSpecProjectsLocationsRequest>;

export type GenerateOpenApiSpecProjectsLocationsResponse = GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse;
export const GenerateOpenApiSpecProjectsLocationsResponse = GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse;

export type GenerateOpenApiSpecProjectsLocationsError = CommonErrors;

/** Generate OpenAPI spec for the requested integrations and api triggers */
export const generateOpenApiSpecProjectsLocations: API.OperationMethod<GenerateOpenApiSpecProjectsLocationsRequest, GenerateOpenApiSpecProjectsLocationsResponse, GenerateOpenApiSpecProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateOpenApiSpecProjectsLocationsRequest,
  output: GenerateOpenApiSpecProjectsLocationsResponse,
  errors: [],
}));

export interface LinkProjectsLocationsAppsScriptProjectsRequest {
  /** Required. The project that the executed integration belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest;
}

export const LinkProjectsLocationsAppsScriptProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appsScriptProjects:link", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LinkProjectsLocationsAppsScriptProjectsRequest>;

export type LinkProjectsLocationsAppsScriptProjectsResponse = GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse;
export const LinkProjectsLocationsAppsScriptProjectsResponse = GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse;

export type LinkProjectsLocationsAppsScriptProjectsError = CommonErrors;

/** Links a existing Apps Script project. */
export const linkProjectsLocationsAppsScriptProjects: API.OperationMethod<LinkProjectsLocationsAppsScriptProjectsRequest, LinkProjectsLocationsAppsScriptProjectsResponse, LinkProjectsLocationsAppsScriptProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LinkProjectsLocationsAppsScriptProjectsRequest,
  output: LinkProjectsLocationsAppsScriptProjectsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsScriptProjectsRequest {
  /** Required. The project that the executed integration belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest;
}

export const CreateProjectsLocationsAppsScriptProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/appsScriptProjects", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsScriptProjectsRequest>;

export type CreateProjectsLocationsAppsScriptProjectsResponse = GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse;
export const CreateProjectsLocationsAppsScriptProjectsResponse = GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse;

export type CreateProjectsLocationsAppsScriptProjectsError = CommonErrors;

/** Creates an Apps Script project. */
export const createProjectsLocationsAppsScriptProjects: API.OperationMethod<CreateProjectsLocationsAppsScriptProjectsRequest, CreateProjectsLocationsAppsScriptProjectsResponse, CreateProjectsLocationsAppsScriptProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAppsScriptProjectsRequest,
  output: CreateProjectsLocationsAppsScriptProjectsResponse,
  errors: [],
}));

export interface ProvisionProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaProvisionClientRequest;
}

export const ProvisionProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaProvisionClientRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:provision", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionProjectsLocationsClientsRequest>;

export type ProvisionProjectsLocationsClientsResponse = GoogleProtobufEmpty;
export const ProvisionProjectsLocationsClientsResponse = GoogleProtobufEmpty;

export type ProvisionProjectsLocationsClientsError = CommonErrors;

/** Perform the provisioning steps to enable a user GCP project to use IP. If GCP project already registered on IP end via Apigee Integration, provisioning will fail. */
export const provisionProjectsLocationsClients: API.OperationMethod<ProvisionProjectsLocationsClientsRequest, ProvisionProjectsLocationsClientsResponse, ProvisionProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionProjectsLocationsClientsRequest,
  output: ProvisionProjectsLocationsClientsResponse,
  errors: [],
}));

export interface ProvisionClientPostProcessorProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest;
}

export const ProvisionClientPostProcessorProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:provisionClientPostProcessor", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionClientPostProcessorProjectsLocationsClientsRequest>;

export type ProvisionClientPostProcessorProjectsLocationsClientsResponse = GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse;
export const ProvisionClientPostProcessorProjectsLocationsClientsResponse = GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse;

export type ProvisionClientPostProcessorProjectsLocationsClientsError = CommonErrors;

/** Perform post provisioning steps after client is provisioned. */
export const provisionClientPostProcessorProjectsLocationsClients: API.OperationMethod<ProvisionClientPostProcessorProjectsLocationsClientsRequest, ProvisionClientPostProcessorProjectsLocationsClientsResponse, ProvisionClientPostProcessorProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionClientPostProcessorProjectsLocationsClientsRequest,
  output: ProvisionClientPostProcessorProjectsLocationsClientsResponse,
  errors: [],
}));

export interface DeprovisionProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be deprovisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaDeprovisionClientRequest;
}

export const DeprovisionProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaDeprovisionClientRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:deprovision", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeprovisionProjectsLocationsClientsRequest>;

export type DeprovisionProjectsLocationsClientsResponse = GoogleProtobufEmpty;
export const DeprovisionProjectsLocationsClientsResponse = GoogleProtobufEmpty;

export type DeprovisionProjectsLocationsClientsError = CommonErrors;

/** Perform the deprovisioning steps to disable a user GCP project to use IP and purge all related data in a wipeout-compliant way. */
export const deprovisionProjectsLocationsClients: API.OperationMethod<DeprovisionProjectsLocationsClientsRequest, DeprovisionProjectsLocationsClientsResponse, DeprovisionProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeprovisionProjectsLocationsClientsRequest,
  output: DeprovisionProjectsLocationsClientsResponse,
  errors: [],
}));

export interface ChangeConfigProjectsLocationsClientsRequest {
  /** Required. Required: Format - projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest;
}

export const ChangeConfigProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:changeConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangeConfigProjectsLocationsClientsRequest>;

export type ChangeConfigProjectsLocationsClientsResponse = GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse;
export const ChangeConfigProjectsLocationsClientsResponse = GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse;

export type ChangeConfigProjectsLocationsClientsError = CommonErrors;

/** Updates the client customer configuration for the given project and location resource name */
export const changeConfigProjectsLocationsClients: API.OperationMethod<ChangeConfigProjectsLocationsClientsRequest, ChangeConfigProjectsLocationsClientsResponse, ChangeConfigProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangeConfigProjectsLocationsClientsRequest,
  output: ChangeConfigProjectsLocationsClientsResponse,
  errors: [],
}));

export interface SwitchProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest;
}

export const SwitchProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:switch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SwitchProjectsLocationsClientsRequest>;

export type SwitchProjectsLocationsClientsResponse = GoogleProtobufEmpty;
export const SwitchProjectsLocationsClientsResponse = GoogleProtobufEmpty;

export type SwitchProjectsLocationsClientsError = CommonErrors;

/** Update client from GMEK to CMEK */
export const switchProjectsLocationsClients: API.OperationMethod<SwitchProjectsLocationsClientsRequest, SwitchProjectsLocationsClientsResponse, SwitchProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SwitchProjectsLocationsClientsRequest,
  output: SwitchProjectsLocationsClientsResponse,
  errors: [],
}));

export interface ReplaceProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest;
}

export const ReplaceProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:replace", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceProjectsLocationsClientsRequest>;

export type ReplaceProjectsLocationsClientsResponse = GoogleProtobufEmpty;
export const ReplaceProjectsLocationsClientsResponse = GoogleProtobufEmpty;

export type ReplaceProjectsLocationsClientsError = CommonErrors;

/** Update run-as service account for provisioned client */
export const replaceProjectsLocationsClients: API.OperationMethod<ReplaceProjectsLocationsClientsRequest, ReplaceProjectsLocationsClientsResponse, ReplaceProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceProjectsLocationsClientsRequest,
  output: ReplaceProjectsLocationsClientsResponse,
  errors: [],
}));

export interface SwitchVariableMaskingProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest;
}

export const SwitchVariableMaskingProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:switchVariableMasking", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SwitchVariableMaskingProjectsLocationsClientsRequest>;

export type SwitchVariableMaskingProjectsLocationsClientsResponse = GoogleProtobufEmpty;
export const SwitchVariableMaskingProjectsLocationsClientsResponse = GoogleProtobufEmpty;

export type SwitchVariableMaskingProjectsLocationsClientsError = CommonErrors;

/** Update variable masking for provisioned client */
export const switchVariableMaskingProjectsLocationsClients: API.OperationMethod<SwitchVariableMaskingProjectsLocationsClientsRequest, SwitchVariableMaskingProjectsLocationsClientsResponse, SwitchVariableMaskingProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SwitchVariableMaskingProjectsLocationsClientsRequest,
  output: SwitchVariableMaskingProjectsLocationsClientsResponse,
  errors: [],
}));

export interface ToggleHttpProjectsLocationsClientsRequest {
  /** Required. Required: The ID of the GCP Project to be provisioned. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaToggleHttpRequest;
}

export const ToggleHttpProjectsLocationsClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaToggleHttpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/clients:toggleHttp", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ToggleHttpProjectsLocationsClientsRequest>;

export type ToggleHttpProjectsLocationsClientsResponse = GoogleProtobufEmpty;
export const ToggleHttpProjectsLocationsClientsResponse = GoogleProtobufEmpty;

export type ToggleHttpProjectsLocationsClientsError = CommonErrors;

/** Enable/Disable http call for provisioned client */
export const toggleHttpProjectsLocationsClients: API.OperationMethod<ToggleHttpProjectsLocationsClientsRequest, ToggleHttpProjectsLocationsClientsResponse, ToggleHttpProjectsLocationsClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ToggleHttpProjectsLocationsClientsRequest,
  output: ToggleHttpProjectsLocationsClientsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProductsCloudFunctionsRequest {
  /** Required. The project that the executed integration belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest;
}

export const CreateProjectsLocationsProductsCloudFunctionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/cloudFunctions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsCloudFunctionsRequest>;

export type CreateProjectsLocationsProductsCloudFunctionsResponse = GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse;
export const CreateProjectsLocationsProductsCloudFunctionsResponse = GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse;

export type CreateProjectsLocationsProductsCloudFunctionsError = CommonErrors;

/** Creates a cloud function project. */
export const createProjectsLocationsProductsCloudFunctions: API.OperationMethod<CreateProjectsLocationsProductsCloudFunctionsRequest, CreateProjectsLocationsProductsCloudFunctionsResponse, CreateProjectsLocationsProductsCloudFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsCloudFunctionsRequest,
  output: CreateProjectsLocationsProductsCloudFunctionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsCertificatesRequest {
  /** Required. The client, which owns this collection of Certificates. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the Certificate's response. */
  readMask?: string;
}

export const ListProjectsLocationsProductsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/certificates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsCertificatesRequest>;

export type ListProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaListCertificatesResponse;
export const ListProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaListCertificatesResponse;

export type ListProjectsLocationsProductsCertificatesError = CommonErrors;

/** List all the certificates that match the filter. Restrict to certificate of current client only. */
export const listProjectsLocationsProductsCertificates: API.PaginatedOperationMethod<ListProjectsLocationsProductsCertificatesRequest, ListProjectsLocationsProductsCertificatesResponse, ListProjectsLocationsProductsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsCertificatesRequest,
  output: ListProjectsLocationsProductsCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsProductsCertificatesRequest {
  /** Required. The certificate to retrieve. Format: projects/{project}/locations/{location}/certificates/{certificate} */
  name: string;
}

export const GetProjectsLocationsProductsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsCertificatesRequest>;

export type GetProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;
export const GetProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;

export type GetProjectsLocationsProductsCertificatesError = CommonErrors;

/** Get a certificates in the specified project. */
export const getProjectsLocationsProductsCertificates: API.OperationMethod<GetProjectsLocationsProductsCertificatesRequest, GetProjectsLocationsProductsCertificatesResponse, GetProjectsLocationsProductsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsCertificatesRequest,
  output: GetProjectsLocationsProductsCertificatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProductsCertificatesRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCertificate;
}

export const CreateProjectsLocationsProductsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/certificates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsCertificatesRequest>;

export type CreateProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;
export const CreateProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;

export type CreateProjectsLocationsProductsCertificatesError = CommonErrors;

/** Creates a new certificate. The certificate will be registered to the trawler service and will be encrypted using cloud KMS and stored in Spanner Returns the certificate. */
export const createProjectsLocationsProductsCertificates: API.OperationMethod<CreateProjectsLocationsProductsCertificatesRequest, CreateProjectsLocationsProductsCertificatesResponse, CreateProjectsLocationsProductsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsCertificatesRequest,
  output: CreateProjectsLocationsProductsCertificatesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProductsCertificatesRequest {
  /** Output only. Auto generated primary key */
  name: string;
  /** Field mask specifying the fields in the above Certificate that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCertificate;
}

export const PatchProjectsLocationsProductsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/certificates/{certificatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductsCertificatesRequest>;

export type PatchProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;
export const PatchProjectsLocationsProductsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;

export type PatchProjectsLocationsProductsCertificatesError = CommonErrors;

/** Updates the certificate by id. If new certificate file is updated, it will register with the trawler service, re-encrypt with cloud KMS and update the Spanner record. Other fields will directly update the Spanner record. Returns the Certificate. */
export const patchProjectsLocationsProductsCertificates: API.OperationMethod<PatchProjectsLocationsProductsCertificatesRequest, PatchProjectsLocationsProductsCertificatesResponse, PatchProjectsLocationsProductsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductsCertificatesRequest,
  output: PatchProjectsLocationsProductsCertificatesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsProductsCertificatesRequest {
  /** Required. The name that is associated with the Certificate. */
  name: string;
}

export const DeleteProjectsLocationsProductsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsCertificatesRequest>;

export type DeleteProjectsLocationsProductsCertificatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsProductsCertificatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsProductsCertificatesError = CommonErrors;

/** Delete a certificate */
export const deleteProjectsLocationsProductsCertificates: API.OperationMethod<DeleteProjectsLocationsProductsCertificatesRequest, DeleteProjectsLocationsProductsCertificatesResponse, DeleteProjectsLocationsProductsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsCertificatesRequest,
  output: DeleteProjectsLocationsProductsCertificatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProductsAuthConfigsRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.sslCertificate"?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.encryptedPrivateKey"?: string;
  /** 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. */
  "clientCertificate.passphrase"?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaAuthConfig;
}

export const CreateProjectsLocationsProductsAuthConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "clientCertificate.sslCertificate": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.sslCertificate")),
  "clientCertificate.encryptedPrivateKey": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.encryptedPrivateKey")),
  "clientCertificate.passphrase": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.passphrase")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaAuthConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/authConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsAuthConfigsRequest>;

export type CreateProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;
export const CreateProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;

export type CreateProjectsLocationsProductsAuthConfigsError = CommonErrors;

/** Creates an auth config record. Fetch corresponding credentials for specific auth types, e.g. access token for OAuth 2.0, JWT token for JWT. Encrypt the auth config with Cloud KMS and store the encrypted credentials in Spanner. Returns the encrypted auth config. */
export const createProjectsLocationsProductsAuthConfigs: API.OperationMethod<CreateProjectsLocationsProductsAuthConfigsRequest, CreateProjectsLocationsProductsAuthConfigsResponse, CreateProjectsLocationsProductsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsAuthConfigsRequest,
  output: CreateProjectsLocationsProductsAuthConfigsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProductsAuthConfigsRequest {
  /** Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}. */
  name: string;
  /** Field mask specifying the fields in the above AuthConfig that have been modified and need to be updated. */
  updateMask?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.sslCertificate"?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.encryptedPrivateKey"?: string;
  /** 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. */
  "clientCertificate.passphrase"?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaAuthConfig;
}

export const PatchProjectsLocationsProductsAuthConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  "clientCertificate.sslCertificate": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.sslCertificate")),
  "clientCertificate.encryptedPrivateKey": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.encryptedPrivateKey")),
  "clientCertificate.passphrase": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.passphrase")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaAuthConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/authConfigs/{authConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductsAuthConfigsRequest>;

export type PatchProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;
export const PatchProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;

export type PatchProjectsLocationsProductsAuthConfigsError = CommonErrors;

/** Updates an auth config. If credential is updated, fetch the encrypted auth config from Spanner, decrypt with Cloud KMS key, update the credential fields, re-encrypt with Cloud KMS key and update the Spanner record. For other fields, directly update the Spanner record. Returns the encrypted auth config. */
export const patchProjectsLocationsProductsAuthConfigs: API.OperationMethod<PatchProjectsLocationsProductsAuthConfigsRequest, PatchProjectsLocationsProductsAuthConfigsResponse, PatchProjectsLocationsProductsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductsAuthConfigsRequest,
  output: PatchProjectsLocationsProductsAuthConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsProductsAuthConfigsRequest {
  /** Required. The name that is associated with the AuthConfig. */
  name: string;
}

export const DeleteProjectsLocationsProductsAuthConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/authConfigs/{authConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsAuthConfigsRequest>;

export type DeleteProjectsLocationsProductsAuthConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsProductsAuthConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsProductsAuthConfigsError = CommonErrors;

/** Deletes an auth config. */
export const deleteProjectsLocationsProductsAuthConfigs: API.OperationMethod<DeleteProjectsLocationsProductsAuthConfigsRequest, DeleteProjectsLocationsProductsAuthConfigsResponse, DeleteProjectsLocationsProductsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsAuthConfigsRequest,
  output: DeleteProjectsLocationsProductsAuthConfigsResponse,
  errors: [],
}));

export interface GetProjectsLocationsProductsAuthConfigsRequest {
  /** Required. The name that is associated with the AuthConfig. */
  name: string;
}

export const GetProjectsLocationsProductsAuthConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/authConfigs/{authConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsAuthConfigsRequest>;

export type GetProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;
export const GetProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;

export type GetProjectsLocationsProductsAuthConfigsError = CommonErrors;

/** Gets a complete auth config. If the auth config doesn't exist, Code.NOT_FOUND exception will be thrown. Returns the decrypted auth config. */
export const getProjectsLocationsProductsAuthConfigs: API.OperationMethod<GetProjectsLocationsProductsAuthConfigsRequest, GetProjectsLocationsProductsAuthConfigsResponse, GetProjectsLocationsProductsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsAuthConfigsRequest,
  output: GetProjectsLocationsProductsAuthConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsAuthConfigsRequest {
  /** Required. The client, which owns this collection of AuthConfigs. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the AuthConfig's response. */
  readMask?: string;
}

export const ListProjectsLocationsProductsAuthConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/authConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsAuthConfigsRequest>;

export type ListProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaListAuthConfigsResponse;
export const ListProjectsLocationsProductsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaListAuthConfigsResponse;

export type ListProjectsLocationsProductsAuthConfigsError = CommonErrors;

/** Lists all auth configs that match the filter. Restrict to auth configs belong to the current client only. */
export const listProjectsLocationsProductsAuthConfigs: API.PaginatedOperationMethod<ListProjectsLocationsProductsAuthConfigsRequest, ListProjectsLocationsProductsAuthConfigsResponse, ListProjectsLocationsProductsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsAuthConfigsRequest,
  output: ListProjectsLocationsProductsAuthConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExecuteProjectsLocationsProductsIntegrationsRequest {
  /** Required. The integration resource name. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest;
}

export const ExecuteProjectsLocationsProductsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}:execute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteProjectsLocationsProductsIntegrationsRequest>;

export type ExecuteProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse;
export const ExecuteProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse;

export type ExecuteProjectsLocationsProductsIntegrationsError = CommonErrors;

/** Executes integrations synchronously by passing the trigger id in the request body. The request is not returned until the requested executions are either fulfilled or experienced an error. If the integration name is not specified (passing `-`), all of the associated integration under the given trigger_id will be executed. Otherwise only the specified integration for the given `trigger_id` is executed. This is helpful for execution the integration from UI. */
export const executeProjectsLocationsProductsIntegrations: API.OperationMethod<ExecuteProjectsLocationsProductsIntegrationsRequest, ExecuteProjectsLocationsProductsIntegrationsResponse, ExecuteProjectsLocationsProductsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteProjectsLocationsProductsIntegrationsRequest,
  output: ExecuteProjectsLocationsProductsIntegrationsResponse,
  errors: [],
}));

export interface ScheduleProjectsLocationsProductsIntegrationsRequest {
  /** The integration resource name. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest;
}

export const ScheduleProjectsLocationsProductsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}:schedule", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ScheduleProjectsLocationsProductsIntegrationsRequest>;

export type ScheduleProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse;
export const ScheduleProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse;

export type ScheduleProjectsLocationsProductsIntegrationsError = CommonErrors;

/** Schedules an integration for execution by passing the trigger id and the scheduled time in the request body. */
export const scheduleProjectsLocationsProductsIntegrations: API.OperationMethod<ScheduleProjectsLocationsProductsIntegrationsRequest, ScheduleProjectsLocationsProductsIntegrationsResponse, ScheduleProjectsLocationsProductsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ScheduleProjectsLocationsProductsIntegrationsRequest,
  output: ScheduleProjectsLocationsProductsIntegrationsResponse,
  errors: [],
}));

export interface TestProjectsLocationsProductsIntegrationsRequest {
  /** Output only. Auto-generated primary key. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTestIntegrationsRequest;
}

export const TestProjectsLocationsProductsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTestIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}:test", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestProjectsLocationsProductsIntegrationsRequest>;

export type TestProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaTestIntegrationsResponse;
export const TestProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaTestIntegrationsResponse;

export type TestProjectsLocationsProductsIntegrationsError = CommonErrors;

/** Execute the integration in draft state */
export const testProjectsLocationsProductsIntegrations: API.OperationMethod<TestProjectsLocationsProductsIntegrationsRequest, TestProjectsLocationsProductsIntegrationsResponse, TestProjectsLocationsProductsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestProjectsLocationsProductsIntegrationsRequest,
  output: TestProjectsLocationsProductsIntegrationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsIntegrationsRequest {
  /** Required. Project and location from which the integrations should be listed. Format: projects/{project} */
  parent: string;
  /** The page size for the resquest. */
  pageSize?: number;
  /** The page token for the resquest. */
  pageToken?: string;
  /** The results would be returned in order you specified here. Supported sort keys are: Descending sort order by "last_modified_time", "created_time", "snapshot_number". Ascending sort order by the integration name. */
  orderBy?: string;
  /** Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. */
  filter?: string;
}

export const ListProjectsLocationsProductsIntegrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsIntegrationsRequest>;

export type ListProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaListIntegrationsResponse;
export const ListProjectsLocationsProductsIntegrationsResponse = GoogleCloudIntegrationsV1alphaListIntegrationsResponse;

export type ListProjectsLocationsProductsIntegrationsError = CommonErrors;

/** Returns the list of all integrations in the specified project. */
export const listProjectsLocationsProductsIntegrations: API.PaginatedOperationMethod<ListProjectsLocationsProductsIntegrationsRequest, ListProjectsLocationsProductsIntegrationsResponse, ListProjectsLocationsProductsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsIntegrationsRequest,
  output: ListProjectsLocationsProductsIntegrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} Specifically, when parent equals: 1. projects//locations//integrations/, Meaning: "List versions (with filter) for a particular integration". 2. projects//locations//integrations/- Meaning: "List versions (with filter) for a client within a particular region". */
  parent: string;
  /** The maximum number of versions to return. The service may return fewer than this value. If unspecified, at most 50 versions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListIntegrationVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIntegrationVersions` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. */
  filter?: string;
  /** The results would be returned in order you specified here. Currently supported sort keys are: Descending sort order for "last\_modified\_time", "created\_time", and "snapshot\_number". Ascending sort order for `name`. */
  orderBy?: string;
  /** The field mask which specifies the particular data to be returned. */
  fieldMask?: string;
}

export const ListProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsIntegrationsVersionsRequest>;

export type ListProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse;
export const ListProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse;

export type ListProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Returns the list of all integration versions in the specified project. */
export const listProjectsLocationsProductsIntegrationsVersions: API.PaginatedOperationMethod<ListProjectsLocationsProductsIntegrationsVersionsRequest, ListProjectsLocationsProductsIntegrationsVersionsResponse, ListProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsIntegrationsVersionsRequest,
  output: ListProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} */
  parent: string;
  /** Set this flag to true, if draft version is to be created for a brand new integration. False, if the request is for an existing integration. For backward compatibility reasons, even if this flag is set to `false` and no existing integration is found, a new draft integration will still be created. */
  newIntegration?: boolean;
  /** Optional. Optional. Indicates if sample workflow should be created. */
  createSampleIntegrations?: boolean;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const CreateProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  newIntegration: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("newIntegration")),
  createSampleIntegrations: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("createSampleIntegrations")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsIntegrationsVersionsRequest>;

export type CreateProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;
export const CreateProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;

export type CreateProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Create a integration with a draft version in the specified project. */
export const createProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<CreateProjectsLocationsProductsIntegrationsVersionsRequest, CreateProjectsLocationsProductsIntegrationsVersionsResponse, CreateProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsIntegrationsVersionsRequest,
  output: CreateProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Output only. Auto-generated primary key. */
  name: string;
  /** Field mask specifying the fields in the above integration that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const PatchProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductsIntegrationsVersionsRequest>;

export type PatchProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;
export const PatchProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;

export type PatchProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Update a integration with a draft version in the specified project. */
export const patchProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<PatchProjectsLocationsProductsIntegrationsVersionsRequest, PatchProjectsLocationsProductsIntegrationsVersionsResponse, PatchProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductsIntegrationsVersionsRequest,
  output: PatchProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
}

export const GetProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsIntegrationsVersionsRequest>;

export type GetProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;
export const GetProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;

export type GetProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Get a integration in the specified project. */
export const getProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<GetProjectsLocationsProductsIntegrationsVersionsRequest, GetProjectsLocationsProductsIntegrationsVersionsResponse, GetProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsIntegrationsVersionsRequest,
  output: GetProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface PublishProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to publish. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest;
}

export const PublishProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}:publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishProjectsLocationsProductsIntegrationsVersionsRequest>;

export type PublishProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse;
export const PublishProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse;

export type PublishProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** This RPC throws an exception if the integration is in ARCHIVED or ACTIVE state. This RPC throws an exception if the version being published is DRAFT, and if the `locked_by` user is not the same as the user performing the Publish. Audit fields updated include last_published_timestamp, last_published_by, last_modified_timestamp, last_modified_by. Any existing lock is on this integration is released. */
export const publishProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<PublishProjectsLocationsProductsIntegrationsVersionsRequest, PublishProjectsLocationsProductsIntegrationsVersionsResponse, PublishProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishProjectsLocationsProductsIntegrationsVersionsRequest,
  output: PublishProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to delete. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
}

export const DeleteProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsIntegrationsVersionsRequest>;

export type DeleteProjectsLocationsProductsIntegrationsVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsProductsIntegrationsVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Soft-deletes the integration. Changes the status of the integration to ARCHIVED. If the integration being ARCHIVED is tagged as "HEAD", the tag is removed from this snapshot and set to the previous non-ARCHIVED snapshot. The PUBLISH_REQUESTED, DUE_FOR_DELETION tags are removed too. This RPC throws an exception if the version being deleted is DRAFT, and if the `locked_by` user is not the same as the user performing the Delete. Audit fields updated include last_modified_timestamp, last_modified_by. Any existing lock is released when Deleting a integration. Currently, there is no undelete mechanism. */
export const deleteProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<DeleteProjectsLocationsProductsIntegrationsVersionsRequest, DeleteProjectsLocationsProductsIntegrationsVersionsResponse, DeleteProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsIntegrationsVersionsRequest,
  output: DeleteProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface UploadProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to upload. Format: projects/{project}/locations/{location}/integrations/{integration} */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest;
}

export const UploadProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsProductsIntegrationsVersionsRequest>;

export type UploadProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse;
export const UploadProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse;

export type UploadProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Uploads an integration. The content can be a previously downloaded integration. Performs the same function as CreateDraftIntegrationVersion, but accepts input in a string format, which holds the complete representation of the IntegrationVersion content. */
export const uploadProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<UploadProjectsLocationsProductsIntegrationsVersionsRequest, UploadProjectsLocationsProductsIntegrationsVersionsResponse, UploadProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsProductsIntegrationsVersionsRequest,
  output: UploadProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** File format for download request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
  /** Optional. Integration related file to download like Integration Json, Config variable, testcase etc. */
  files?: "INTEGRATION_FILE_UNSPECIFIED" | "INTEGRATION" | "INTEGRATION_CONFIG_VARIABLES" | (string & {})[];
}

export const DownloadProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  fileFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("fileFormat")),
  files: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("files")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsProductsIntegrationsVersionsRequest>;

export type DownloadProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse;
export const DownloadProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse;

export type DownloadProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Downloads an integration. Retrieves the `IntegrationVersion` for a given `integration_id` and returns the response as a string. */
export const downloadProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<DownloadProjectsLocationsProductsIntegrationsVersionsRequest, DownloadProjectsLocationsProductsIntegrationsVersionsResponse, DownloadProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsProductsIntegrationsVersionsRequest,
  output: DownloadProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to take over edit lock. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  integrationVersion: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest;
}

export const TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  integrationVersion: Schema.String.pipe(T.HttpPath("integrationVersion")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}:takeoverEditLock", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsRequest>;

export type TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse;
export const TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse;

export type TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Clears the `locked_by` and `locked_at_timestamp`in the DRAFT version of this integration. It then performs the same action as the CreateDraftIntegrationVersion (i.e., copies the DRAFT version of the integration as a SNAPSHOT and then creates a new DRAFT version with the `locked_by` set to the `user_taking_over` and the `locked_at_timestamp` set to the current timestamp). Both the `locked_by` and `user_taking_over` are notified via email about the takeover. This RPC throws an exception if the integration is not in DRAFT status or if the `locked_by` and `locked_at_timestamp` fields are not set.The TakeoverEdit lock is treated the same as an edit of the integration, and hence shares ACLs with edit. Audit fields updated include last_modified_timestamp, last_modified_by. */
export const takeoverEditLockProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsRequest, TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsResponse, TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsRequest,
  output: TakeoverEditLockProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface UnpublishProjectsLocationsProductsIntegrationsVersionsRequest {
  /** Required. The version to deactivate. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest;
}

export const UnpublishProjectsLocationsProductsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/versions/{versionsId}:unpublish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnpublishProjectsLocationsProductsIntegrationsVersionsRequest>;

export type UnpublishProjectsLocationsProductsIntegrationsVersionsResponse = GoogleProtobufEmpty;
export const UnpublishProjectsLocationsProductsIntegrationsVersionsResponse = GoogleProtobufEmpty;

export type UnpublishProjectsLocationsProductsIntegrationsVersionsError = CommonErrors;

/** Sets the status of the ACTIVE integration to SNAPSHOT with a new tag "PREVIOUSLY_PUBLISHED" after validating it. The "HEAD" and "PUBLISH_REQUESTED" tags do not change. This RPC throws an exception if the version being snapshot is not ACTIVE. Audit fields added include action, action_by, action_timestamp. */
export const unpublishProjectsLocationsProductsIntegrationsVersions: API.OperationMethod<UnpublishProjectsLocationsProductsIntegrationsVersionsRequest, UnpublishProjectsLocationsProductsIntegrationsVersionsResponse, UnpublishProjectsLocationsProductsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnpublishProjectsLocationsProductsIntegrationsVersionsRequest,
  output: UnpublishProjectsLocationsProductsIntegrationsVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsIntegrationsExecutionsRequest {
  /** Required. The parent resource name of the integration execution. */
  parent: string;
  /** Optional. Standard filter field, we support filtering on following fields: workflow_name: the name of the integration. CreateTimestamp: the execution created time. event_execution_state: the state of the executions. execution_id: the id of the execution. trigger_id: the id of the trigger. parameter_type: the type of the parameters involved in the execution. All fields support for EQUALS, in additional: CreateTimestamp support for LESS_THAN, GREATER_THAN ParameterType support for HAS For example: "parameter_type" HAS \"string\" Also supports operators like AND, OR, NOT For example, trigger_id=\"id1\" AND workflow_name=\"testWorkflow\" */
  filter?: string;
  /** Optional. The size of entries in the response. */
  pageSize?: number;
  /** Optional. The token returned in the previous response. */
  pageToken?: string;
  /** Optional. The results would be returned in order you specified here. Currently supporting "create_time". */
  orderBy?: string;
  /** Optional. View mask for the response data. If set, only the field specified will be returned as part of the result. If not set, all fields in Execution will be filled and returned. Supported fields: trigger_id execution_method create_time update_time execution_details execution_details.state execution_details.execution_snapshots execution_details.attempt_stats execution_details.event_execution_snapshots_size request_parameters cloud_logging_details snapshot_number replay_info */
  readMask?: string;
  /** Workflow name. */
  "filterParams.workflowName"?: string;
  /** Start timestamp. */
  "filterParams.startTime"?: string;
  /** End timestamp. */
  "filterParams.endTime"?: string;
  /** List of possible event statuses. */
  "filterParams.eventStatuses"?: string[];
  /** List of possible task statuses. */
  "filterParams.taskStatuses"?: string[];
  /** Optional user-provided custom filter. */
  "filterParams.customFilter"?: string;
  /** Execution id. */
  "filterParams.executionId"?: string;
  /** Param value. DEPRECATED. User parameter_pair_value instead. */
  "filterParams.parameterValue"?: string;
  /** Param type. */
  "filterParams.parameterType"?: string;
  /** Param key. DEPRECATED. User parameter_pair_key instead. */
  "filterParams.parameterKey"?: string;
  /** Param key in the key value pair filter. */
  "filterParams.parameterPairKey"?: string;
  /** Param value in the key value pair filter. */
  "filterParams.parameterPairValue"?: string;
  /** Optional. If true, the service will use the most recent acl information to list event execution infos and renew the acl cache. Note that fetching the most recent acl is synchronous, so it will increase RPC call latency. */
  refreshAcl?: boolean;
  /** Optional. If true, the service will truncate the params to only keep the first 1000 characters of string params and empty the executions in order to make response smaller. Only works for UI and when the params fields are not filtered out. */
  truncateParams?: boolean;
  /** Optional. If true, the service will provide execution info with snapshot metadata only i.e. without event parameters. */
  snapshotMetadataWithoutParams?: boolean;
}

export const ListProjectsLocationsProductsIntegrationsExecutionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  "filterParams.workflowName": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.workflowName")),
  "filterParams.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.startTime")),
  "filterParams.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.endTime")),
  "filterParams.eventStatuses": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("filterParams.eventStatuses")),
  "filterParams.taskStatuses": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("filterParams.taskStatuses")),
  "filterParams.customFilter": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.customFilter")),
  "filterParams.executionId": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.executionId")),
  "filterParams.parameterValue": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterValue")),
  "filterParams.parameterType": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterType")),
  "filterParams.parameterKey": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterKey")),
  "filterParams.parameterPairKey": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterPairKey")),
  "filterParams.parameterPairValue": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterPairValue")),
  refreshAcl: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("refreshAcl")),
  truncateParams: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("truncateParams")),
  snapshotMetadataWithoutParams: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("snapshotMetadataWithoutParams")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/executions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsIntegrationsExecutionsRequest>;

export type ListProjectsLocationsProductsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaListExecutionsResponse;
export const ListProjectsLocationsProductsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaListExecutionsResponse;

export type ListProjectsLocationsProductsIntegrationsExecutionsError = CommonErrors;

/** Lists the results of all the integration executions. The response includes the same information as the [execution log](https://cloud.google.com/application-integration/docs/viewing-logs) in the Integration UI. */
export const listProjectsLocationsProductsIntegrationsExecutions: API.PaginatedOperationMethod<ListProjectsLocationsProductsIntegrationsExecutionsRequest, ListProjectsLocationsProductsIntegrationsExecutionsResponse, ListProjectsLocationsProductsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsIntegrationsExecutionsRequest,
  output: ListProjectsLocationsProductsIntegrationsExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsProductsIntegrationsExecutionsRequest {
  /** Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} */
  name: string;
}

export const GetProjectsLocationsProductsIntegrationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/executions/{executionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsIntegrationsExecutionsRequest>;

export type GetProjectsLocationsProductsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaExecution;
export const GetProjectsLocationsProductsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaExecution;

export type GetProjectsLocationsProductsIntegrationsExecutionsError = CommonErrors;

/** Get an execution in the specified project. */
export const getProjectsLocationsProductsIntegrationsExecutions: API.OperationMethod<GetProjectsLocationsProductsIntegrationsExecutionsRequest, GetProjectsLocationsProductsIntegrationsExecutionsResponse, GetProjectsLocationsProductsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsIntegrationsExecutionsRequest,
  output: GetProjectsLocationsProductsIntegrationsExecutionsResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsProductsIntegrationsExecutionsRequest {
  /** Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} */
  name: string;
}

export const DownloadProjectsLocationsProductsIntegrationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/executions/{executionsId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsProductsIntegrationsExecutionsRequest>;

export type DownloadProjectsLocationsProductsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaDownloadExecutionResponse;
export const DownloadProjectsLocationsProductsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaDownloadExecutionResponse;

export type DownloadProjectsLocationsProductsIntegrationsExecutionsError = CommonErrors;

/** Download the execution. */
export const downloadProjectsLocationsProductsIntegrationsExecutions: API.OperationMethod<DownloadProjectsLocationsProductsIntegrationsExecutionsRequest, DownloadProjectsLocationsProductsIntegrationsExecutionsResponse, DownloadProjectsLocationsProductsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsProductsIntegrationsExecutionsRequest,
  output: DownloadProjectsLocationsProductsIntegrationsExecutionsResponse,
  errors: [],
}));

export interface ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest {
  /** Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}/suspensions/{suspension_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaResolveSuspensionRequest;
}

export const ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaResolveSuspensionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/executions/{executionsId}/suspensions/{suspensionsId}:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest>;

export type ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaResolveSuspensionResponse;
export const ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaResolveSuspensionResponse;

export type ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsError = CommonErrors;

/** * Resolves (lifts/rejects) any number of suspensions. If the integration is already running, only the status of the suspension is updated. Otherwise, the suspended integration will begin execution again. */
export const resolveProjectsLocationsProductsIntegrationsExecutionsSuspensions: API.OperationMethod<ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest, ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse, ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest,
  output: ResolveProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest {
  /** Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name} */
  parent: string;
  /** Maximum number of entries in the response. */
  pageSize?: number;
  /** Token to retrieve a specific page. */
  pageToken?: string;
  /** Standard filter field. */
  filter?: string;
  /** Field name to order by. */
  orderBy?: string;
}

export const ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/executions/{executionsId}/suspensions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest>;

export type ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaListSuspensionsResponse;
export const ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaListSuspensionsResponse;

export type ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsError = CommonErrors;

/** * Lists suspensions associated with a specific execution. Only those with permissions to resolve the relevant suspensions will be able to view them. */
export const listProjectsLocationsProductsIntegrationsExecutionsSuspensions: API.PaginatedOperationMethod<ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest, ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse, ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest,
  output: ListProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest {
  /** Required. The resource that the suspension belongs to. "projects/{project}/locations/{location}/products/{product}/integrations/{integration}/executions/{execution}/suspensions/{suspenion}" format. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaLiftSuspensionRequest;
}

export const LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaLiftSuspensionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/integrations/{integrationsId}/executions/{executionsId}/suspensions/{suspensionsId}:lift", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest>;

export type LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaLiftSuspensionResponse;
export const LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaLiftSuspensionResponse;

export type LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsError = CommonErrors;

/** * Lifts suspension for the Suspension task. Fetch corresponding suspension with provided suspension Id, resolve suspension, and set up suspension result for the Suspension Task. */
export const liftProjectsLocationsProductsIntegrationsExecutionsSuspensions: API.OperationMethod<LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest, LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse, LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsRequest,
  output: LiftProjectsLocationsProductsIntegrationsExecutionsSuspensionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProductsSfdcInstancesRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcInstance;
}

export const CreateProjectsLocationsProductsSfdcInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcInstance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsSfdcInstancesRequest>;

export type CreateProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;
export const CreateProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;

export type CreateProjectsLocationsProductsSfdcInstancesError = CommonErrors;

/** Creates an sfdc instance record. Store the sfdc instance in Spanner. Returns the sfdc instance. */
export const createProjectsLocationsProductsSfdcInstances: API.OperationMethod<CreateProjectsLocationsProductsSfdcInstancesRequest, CreateProjectsLocationsProductsSfdcInstancesResponse, CreateProjectsLocationsProductsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsSfdcInstancesRequest,
  output: CreateProjectsLocationsProductsSfdcInstancesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProductsSfdcInstancesRequest {
  /** Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}. */
  name: string;
  /** Field mask specifying the fields in the above SfdcInstance that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcInstance;
}

export const PatchProjectsLocationsProductsSfdcInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcInstance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductsSfdcInstancesRequest>;

export type PatchProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;
export const PatchProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;

export type PatchProjectsLocationsProductsSfdcInstancesError = CommonErrors;

/** Updates an sfdc instance. Updates the sfdc instance in spanner. Returns the sfdc instance. */
export const patchProjectsLocationsProductsSfdcInstances: API.OperationMethod<PatchProjectsLocationsProductsSfdcInstancesRequest, PatchProjectsLocationsProductsSfdcInstancesResponse, PatchProjectsLocationsProductsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductsSfdcInstancesRequest,
  output: PatchProjectsLocationsProductsSfdcInstancesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsProductsSfdcInstancesRequest {
  /** Required. The name that is associated with the SfdcInstance. */
  name: string;
}

export const DeleteProjectsLocationsProductsSfdcInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsSfdcInstancesRequest>;

export type DeleteProjectsLocationsProductsSfdcInstancesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsProductsSfdcInstancesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsProductsSfdcInstancesError = CommonErrors;

/** Deletes an sfdc instance. */
export const deleteProjectsLocationsProductsSfdcInstances: API.OperationMethod<DeleteProjectsLocationsProductsSfdcInstancesRequest, DeleteProjectsLocationsProductsSfdcInstancesResponse, DeleteProjectsLocationsProductsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsSfdcInstancesRequest,
  output: DeleteProjectsLocationsProductsSfdcInstancesResponse,
  errors: [],
}));

export interface GetProjectsLocationsProductsSfdcInstancesRequest {
  /** Required. The name that is associated with the SfdcInstance. */
  name: string;
}

export const GetProjectsLocationsProductsSfdcInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsSfdcInstancesRequest>;

export type GetProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;
export const GetProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;

export type GetProjectsLocationsProductsSfdcInstancesError = CommonErrors;

/** Gets an sfdc instance. If the instance doesn't exist, Code.NOT_FOUND exception will be thrown. */
export const getProjectsLocationsProductsSfdcInstances: API.OperationMethod<GetProjectsLocationsProductsSfdcInstancesRequest, GetProjectsLocationsProductsSfdcInstancesResponse, GetProjectsLocationsProductsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsSfdcInstancesRequest,
  output: GetProjectsLocationsProductsSfdcInstancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsSfdcInstancesRequest {
  /** Required. The client, which owns this collection of SfdcInstances. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the SfdcInstance's response. */
  readMask?: string;
}

export const ListProjectsLocationsProductsSfdcInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsSfdcInstancesRequest>;

export type ListProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse;
export const ListProjectsLocationsProductsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse;

export type ListProjectsLocationsProductsSfdcInstancesError = CommonErrors;

/** Lists all sfdc instances that match the filter. Restrict to sfdc instances belonging to the current client only. */
export const listProjectsLocationsProductsSfdcInstances: API.PaginatedOperationMethod<ListProjectsLocationsProductsSfdcInstancesRequest, ListProjectsLocationsProductsSfdcInstancesResponse, ListProjectsLocationsProductsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsSfdcInstancesRequest,
  output: ListProjectsLocationsProductsSfdcInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcChannel;
}

export const CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest>;

export type CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;
export const CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;

export type CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Creates an sfdc channel record. Store the sfdc channel in Spanner. Returns the sfdc channel. */
export const createProjectsLocationsProductsSfdcInstancesSfdcChannels: API.OperationMethod<CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest, CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse, CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest,
  output: CreateProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest {
  /** Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}. */
  name: string;
  /** Field mask specifying the fields in the above SfdcChannel that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcChannel;
}

export const PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels/{sfdcChannelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest>;

export type PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;
export const PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;

export type PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Updates an sfdc channel. Updates the sfdc channel in spanner. Returns the sfdc channel. */
export const patchProjectsLocationsProductsSfdcInstancesSfdcChannels: API.OperationMethod<PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest, PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse, PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest,
  output: PatchProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest {
  /** Required. The name that is associated with the SfdcChannel. */
  name: string;
}

export const DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels/{sfdcChannelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest>;

export type DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Deletes an sfdc channel. */
export const deleteProjectsLocationsProductsSfdcInstancesSfdcChannels: API.OperationMethod<DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest, DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse, DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest,
  output: DeleteProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface GetProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest {
  /** Required. The name that is associated with the SfdcChannel. */
  name: string;
}

export const GetProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels/{sfdcChannelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest>;

export type GetProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;
export const GetProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;

export type GetProjectsLocationsProductsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Gets an sfdc channel. If the channel doesn't exist, Code.NOT_FOUND exception will be thrown. */
export const getProjectsLocationsProductsSfdcInstancesSfdcChannels: API.OperationMethod<GetProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest, GetProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse, GetProjectsLocationsProductsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest,
  output: GetProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest {
  /** Required. The client, which owns this collection of SfdcChannels. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the SfdcChannel's response. */
  readMask?: string;
}

export const ListProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/products/{productsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest>;

export type ListProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse;
export const ListProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse;

export type ListProjectsLocationsProductsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Lists all sfdc channels that match the filter. Restrict to sfdc channels belonging to the current client only. */
export const listProjectsLocationsProductsSfdcInstancesSfdcChannels: API.PaginatedOperationMethod<ListProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest, ListProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse, ListProjectsLocationsProductsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsProductsSfdcInstancesSfdcChannelsRequest,
  output: ListProjectsLocationsProductsSfdcInstancesSfdcChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsCloudFunctionsRequest {
  /** Required. The project that the executed integration belongs to. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest;
}

export const CreateProjectsLocationsCloudFunctionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/cloudFunctions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCloudFunctionsRequest>;

export type CreateProjectsLocationsCloudFunctionsResponse = GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse;
export const CreateProjectsLocationsCloudFunctionsResponse = GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse;

export type CreateProjectsLocationsCloudFunctionsError = CommonErrors;

/** Creates a cloud function project. */
export const createProjectsLocationsCloudFunctions: API.OperationMethod<CreateProjectsLocationsCloudFunctionsRequest, CreateProjectsLocationsCloudFunctionsResponse, CreateProjectsLocationsCloudFunctionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCloudFunctionsRequest,
  output: CreateProjectsLocationsCloudFunctionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsCertificatesRequest {
  /** Required. The client, which owns this collection of Certificates. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the Certificate's response. */
  readMask?: string;
}

export const ListProjectsLocationsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCertificatesRequest>;

export type ListProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaListCertificatesResponse;
export const ListProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaListCertificatesResponse;

export type ListProjectsLocationsCertificatesError = CommonErrors;

/** List all the certificates that match the filter. Restrict to certificate of current client only. */
export const listProjectsLocationsCertificates: API.PaginatedOperationMethod<ListProjectsLocationsCertificatesRequest, ListProjectsLocationsCertificatesResponse, ListProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsCertificatesRequest,
  output: ListProjectsLocationsCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsCertificatesRequest {
  /** Required. The certificate to retrieve. Format: projects/{project}/locations/{location}/certificates/{certificate} */
  name: string;
}

export const GetProjectsLocationsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCertificatesRequest>;

export type GetProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;
export const GetProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;

export type GetProjectsLocationsCertificatesError = CommonErrors;

/** Get a certificates in the specified project. */
export const getProjectsLocationsCertificates: API.OperationMethod<GetProjectsLocationsCertificatesRequest, GetProjectsLocationsCertificatesResponse, GetProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCertificatesRequest,
  output: GetProjectsLocationsCertificatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsCertificatesRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCertificate;
}

export const CreateProjectsLocationsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCertificatesRequest>;

export type CreateProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;
export const CreateProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;

export type CreateProjectsLocationsCertificatesError = CommonErrors;

/** Creates a new certificate. The certificate will be registered to the trawler service and will be encrypted using cloud KMS and stored in Spanner Returns the certificate. */
export const createProjectsLocationsCertificates: API.OperationMethod<CreateProjectsLocationsCertificatesRequest, CreateProjectsLocationsCertificatesResponse, CreateProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCertificatesRequest,
  output: CreateProjectsLocationsCertificatesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsCertificatesRequest {
  /** Output only. Auto generated primary key */
  name: string;
  /** Field mask specifying the fields in the above Certificate that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCertificate;
}

export const PatchProjectsLocationsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates/{certificatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCertificatesRequest>;

export type PatchProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;
export const PatchProjectsLocationsCertificatesResponse = GoogleCloudIntegrationsV1alphaCertificate;

export type PatchProjectsLocationsCertificatesError = CommonErrors;

/** Updates the certificate by id. If new certificate file is updated, it will register with the trawler service, re-encrypt with cloud KMS and update the Spanner record. Other fields will directly update the Spanner record. Returns the Certificate. */
export const patchProjectsLocationsCertificates: API.OperationMethod<PatchProjectsLocationsCertificatesRequest, PatchProjectsLocationsCertificatesResponse, PatchProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCertificatesRequest,
  output: PatchProjectsLocationsCertificatesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsCertificatesRequest {
  /** Required. The name that is associated with the Certificate. */
  name: string;
}

export const DeleteProjectsLocationsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCertificatesRequest>;

export type DeleteProjectsLocationsCertificatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCertificatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCertificatesError = CommonErrors;

/** Delete a certificate */
export const deleteProjectsLocationsCertificates: API.OperationMethod<DeleteProjectsLocationsCertificatesRequest, DeleteProjectsLocationsCertificatesResponse, DeleteProjectsLocationsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCertificatesRequest,
  output: DeleteProjectsLocationsCertificatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAuthConfigsRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.sslCertificate"?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.encryptedPrivateKey"?: string;
  /** 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. */
  "clientCertificate.passphrase"?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaAuthConfig;
}

export const CreateProjectsLocationsAuthConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "clientCertificate.sslCertificate": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.sslCertificate")),
  "clientCertificate.encryptedPrivateKey": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.encryptedPrivateKey")),
  "clientCertificate.passphrase": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.passphrase")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaAuthConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/authConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAuthConfigsRequest>;

export type CreateProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;
export const CreateProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;

export type CreateProjectsLocationsAuthConfigsError = CommonErrors;

/** Creates an auth config record. Fetch corresponding credentials for specific auth types, e.g. access token for OAuth 2.0, JWT token for JWT. Encrypt the auth config with Cloud KMS and store the encrypted credentials in Spanner. Returns the encrypted auth config. */
export const createProjectsLocationsAuthConfigs: API.OperationMethod<CreateProjectsLocationsAuthConfigsRequest, CreateProjectsLocationsAuthConfigsResponse, CreateProjectsLocationsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAuthConfigsRequest,
  output: CreateProjectsLocationsAuthConfigsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAuthConfigsRequest {
  /** Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}. */
  name: string;
  /** Field mask specifying the fields in the above AuthConfig that have been modified and need to be updated. */
  updateMask?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.sslCertificate"?: string;
  /** The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- */
  "clientCertificate.encryptedPrivateKey"?: string;
  /** 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. */
  "clientCertificate.passphrase"?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaAuthConfig;
}

export const PatchProjectsLocationsAuthConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  "clientCertificate.sslCertificate": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.sslCertificate")),
  "clientCertificate.encryptedPrivateKey": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.encryptedPrivateKey")),
  "clientCertificate.passphrase": Schema.optional(Schema.String).pipe(T.HttpQuery("clientCertificate.passphrase")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaAuthConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/authConfigs/{authConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAuthConfigsRequest>;

export type PatchProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;
export const PatchProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;

export type PatchProjectsLocationsAuthConfigsError = CommonErrors;

/** Updates an auth config. If credential is updated, fetch the encrypted auth config from Spanner, decrypt with Cloud KMS key, update the credential fields, re-encrypt with Cloud KMS key and update the Spanner record. For other fields, directly update the Spanner record. Returns the encrypted auth config. */
export const patchProjectsLocationsAuthConfigs: API.OperationMethod<PatchProjectsLocationsAuthConfigsRequest, PatchProjectsLocationsAuthConfigsResponse, PatchProjectsLocationsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAuthConfigsRequest,
  output: PatchProjectsLocationsAuthConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAuthConfigsRequest {
  /** Required. The name that is associated with the AuthConfig. */
  name: string;
}

export const DeleteProjectsLocationsAuthConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/authConfigs/{authConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAuthConfigsRequest>;

export type DeleteProjectsLocationsAuthConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAuthConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAuthConfigsError = CommonErrors;

/** Deletes an auth config. */
export const deleteProjectsLocationsAuthConfigs: API.OperationMethod<DeleteProjectsLocationsAuthConfigsRequest, DeleteProjectsLocationsAuthConfigsResponse, DeleteProjectsLocationsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAuthConfigsRequest,
  output: DeleteProjectsLocationsAuthConfigsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAuthConfigsRequest {
  /** Required. The name that is associated with the AuthConfig. */
  name: string;
}

export const GetProjectsLocationsAuthConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authConfigs/{authConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAuthConfigsRequest>;

export type GetProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;
export const GetProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaAuthConfig;

export type GetProjectsLocationsAuthConfigsError = CommonErrors;

/** Gets a complete auth config. If the auth config doesn't exist, Code.NOT_FOUND exception will be thrown. Returns the decrypted auth config. */
export const getProjectsLocationsAuthConfigs: API.OperationMethod<GetProjectsLocationsAuthConfigsRequest, GetProjectsLocationsAuthConfigsResponse, GetProjectsLocationsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAuthConfigsRequest,
  output: GetProjectsLocationsAuthConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAuthConfigsRequest {
  /** Required. The client, which owns this collection of AuthConfigs. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the AuthConfig's response. */
  readMask?: string;
}

export const ListProjectsLocationsAuthConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAuthConfigsRequest>;

export type ListProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaListAuthConfigsResponse;
export const ListProjectsLocationsAuthConfigsResponse = GoogleCloudIntegrationsV1alphaListAuthConfigsResponse;

export type ListProjectsLocationsAuthConfigsError = CommonErrors;

/** Lists all auth configs that match the filter. Restrict to auth configs belong to the current client only. */
export const listProjectsLocationsAuthConfigs: API.PaginatedOperationMethod<ListProjectsLocationsAuthConfigsRequest, ListProjectsLocationsAuthConfigsResponse, ListProjectsLocationsAuthConfigsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAuthConfigsRequest,
  output: ListProjectsLocationsAuthConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsConnectionsRequest {
  /** Required. Parent resource of the Connection, of the form: `projects/* /locations/*` */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** Filter. */
  filter?: string;
  /** Order by parameters. */
  orderBy?: string;
}

export const ListProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsRequest>;

export type ListProjectsLocationsConnectionsResponse = GoogleCloudIntegrationsV1alphaListConnectionsResponse;
export const ListProjectsLocationsConnectionsResponse = GoogleCloudIntegrationsV1alphaListConnectionsResponse;

export type ListProjectsLocationsConnectionsError = CommonErrors;

/** Lists Connections in a given project and location. */
export const listProjectsLocationsConnections: API.PaginatedOperationMethod<ListProjectsLocationsConnectionsRequest, ListProjectsLocationsConnectionsResponse, ListProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsRequest,
  output: ListProjectsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetConnectionSchemaMetadataProjectsLocationsConnectionsRequest {
  /** Required. ConnectionSchemaMetadata name. Format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata */
  name: string;
}

export const GetConnectionSchemaMetadataProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/connectionSchemaMetadata" }),
  svc,
) as unknown as Schema.Schema<GetConnectionSchemaMetadataProjectsLocationsConnectionsRequest>;

export type GetConnectionSchemaMetadataProjectsLocationsConnectionsResponse = GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata;
export const GetConnectionSchemaMetadataProjectsLocationsConnectionsResponse = GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata;

export type GetConnectionSchemaMetadataProjectsLocationsConnectionsError = CommonErrors;

/** Lists the available entities and actions associated with a Connection. */
export const getConnectionSchemaMetadataProjectsLocationsConnections: API.OperationMethod<GetConnectionSchemaMetadataProjectsLocationsConnectionsRequest, GetConnectionSchemaMetadataProjectsLocationsConnectionsResponse, GetConnectionSchemaMetadataProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConnectionSchemaMetadataProjectsLocationsConnectionsRequest,
  output: GetConnectionSchemaMetadataProjectsLocationsConnectionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConnectionsRuntimeEntitySchemasRequest {
  /** Required. Parent resource of RuntimeEntitySchema. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** Filter. Only the entity field with literal equality operator is supported. */
  filter?: string;
}

export const ListProjectsLocationsConnectionsRuntimeEntitySchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/runtimeEntitySchemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsRuntimeEntitySchemasRequest>;

export type ListProjectsLocationsConnectionsRuntimeEntitySchemasResponse = GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse;
export const ListProjectsLocationsConnectionsRuntimeEntitySchemasResponse = GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse;

export type ListProjectsLocationsConnectionsRuntimeEntitySchemasError = CommonErrors;

/** Lists the JSON schemas for the properties of runtime entities, filtered by entity name. */
export const listProjectsLocationsConnectionsRuntimeEntitySchemas: API.PaginatedOperationMethod<ListProjectsLocationsConnectionsRuntimeEntitySchemasRequest, ListProjectsLocationsConnectionsRuntimeEntitySchemasResponse, ListProjectsLocationsConnectionsRuntimeEntitySchemasError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsRuntimeEntitySchemasRequest,
  output: ListProjectsLocationsConnectionsRuntimeEntitySchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsConnectionsRuntimeActionSchemasRequest {
  /** Required. Parent resource of RuntimeActionSchema. Format: projects/{project}/locations/{location}/connections/{connection} */
  parent: string;
  /** Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** Filter. Only the action field with literal equality operator is supported. */
  filter?: string;
}

export const ListProjectsLocationsConnectionsRuntimeActionSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}/runtimeActionSchemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsRuntimeActionSchemasRequest>;

export type ListProjectsLocationsConnectionsRuntimeActionSchemasResponse = GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse;
export const ListProjectsLocationsConnectionsRuntimeActionSchemasResponse = GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse;

export type ListProjectsLocationsConnectionsRuntimeActionSchemasError = CommonErrors;

/** Lists the JSON schemas for the inputs and outputs of actions, filtered by action name. */
export const listProjectsLocationsConnectionsRuntimeActionSchemas: API.PaginatedOperationMethod<ListProjectsLocationsConnectionsRuntimeActionSchemasRequest, ListProjectsLocationsConnectionsRuntimeActionSchemasResponse, ListProjectsLocationsConnectionsRuntimeActionSchemasError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsRuntimeActionSchemasRequest,
  output: ListProjectsLocationsConnectionsRuntimeActionSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExecuteProjectsLocationsIntegrationsRequest {
  /** Required. The integration resource name. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest;
}

export const ExecuteProjectsLocationsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}:execute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteProjectsLocationsIntegrationsRequest>;

export type ExecuteProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse;
export const ExecuteProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse;

export type ExecuteProjectsLocationsIntegrationsError = CommonErrors;

/** Executes integrations synchronously by passing the trigger id in the request body. The request is not returned until the requested executions are either fulfilled or experienced an error. If the integration name is not specified (passing `-`), all of the associated integration under the given trigger_id will be executed. Otherwise only the specified integration for the given `trigger_id` is executed. This is helpful for execution the integration from UI. */
export const executeProjectsLocationsIntegrations: API.OperationMethod<ExecuteProjectsLocationsIntegrationsRequest, ExecuteProjectsLocationsIntegrationsResponse, ExecuteProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteProjectsLocationsIntegrationsRequest,
  output: ExecuteProjectsLocationsIntegrationsResponse,
  errors: [],
}));

export interface ScheduleProjectsLocationsIntegrationsRequest {
  /** The integration resource name. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest;
}

export const ScheduleProjectsLocationsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}:schedule", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ScheduleProjectsLocationsIntegrationsRequest>;

export type ScheduleProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse;
export const ScheduleProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse;

export type ScheduleProjectsLocationsIntegrationsError = CommonErrors;

/** Schedules an integration for execution by passing the trigger id and the scheduled time in the request body. */
export const scheduleProjectsLocationsIntegrations: API.OperationMethod<ScheduleProjectsLocationsIntegrationsRequest, ScheduleProjectsLocationsIntegrationsResponse, ScheduleProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ScheduleProjectsLocationsIntegrationsRequest,
  output: ScheduleProjectsLocationsIntegrationsResponse,
  errors: [],
}));

export interface ExecuteEventProjectsLocationsIntegrationsRequest {
  /** Required. The integration resource name. Format: projects/{gcp_project_id}/locations/{location}/integrations/{integration_id} */
  name: string;
  /** Required. Id of the integration trigger config. The trigger_id is in the format: `integration_connector_trigger/projects/{gcp_project_id}/location/{location}/connections/{connection_name}/subscriptions/{subscription_name}`. */
  triggerId?: string;
}

export const ExecuteEventProjectsLocationsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  triggerId: Schema.optional(Schema.String).pipe(T.HttpQuery("triggerId")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}:executeEvent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteEventProjectsLocationsIntegrationsRequest>;

export type ExecuteEventProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaExecuteEventResponse;
export const ExecuteEventProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaExecuteEventResponse;

export type ExecuteEventProjectsLocationsIntegrationsError = CommonErrors;

/** Executes an integration on receiving events from Integration Connector triggers, Eventarc or CPS Trigger. Input data to integration is received in body in json format */
export const executeEventProjectsLocationsIntegrations: API.OperationMethod<ExecuteEventProjectsLocationsIntegrationsRequest, ExecuteEventProjectsLocationsIntegrationsResponse, ExecuteEventProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteEventProjectsLocationsIntegrationsRequest,
  output: ExecuteEventProjectsLocationsIntegrationsResponse,
  errors: [],
}));

export interface TestProjectsLocationsIntegrationsRequest {
  /** Output only. Auto-generated primary key. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTestIntegrationsRequest;
}

export const TestProjectsLocationsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTestIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}:test", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestProjectsLocationsIntegrationsRequest>;

export type TestProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaTestIntegrationsResponse;
export const TestProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaTestIntegrationsResponse;

export type TestProjectsLocationsIntegrationsError = CommonErrors;

/** Execute the integration in draft state */
export const testProjectsLocationsIntegrations: API.OperationMethod<TestProjectsLocationsIntegrationsRequest, TestProjectsLocationsIntegrationsResponse, TestProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestProjectsLocationsIntegrationsRequest,
  output: TestProjectsLocationsIntegrationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsIntegrationsRequest {
  /** Required. Project and location from which the integrations should be listed. Format: projects/{project} */
  parent: string;
  /** The page size for the resquest. */
  pageSize?: number;
  /** The page token for the resquest. */
  pageToken?: string;
  /** The results would be returned in order you specified here. Supported sort keys are: Descending sort order by "last_modified_time", "created_time", "snapshot_number". Ascending sort order by the integration name. */
  orderBy?: string;
  /** Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. */
  filter?: string;
}

export const ListProjectsLocationsIntegrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsIntegrationsRequest>;

export type ListProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaListIntegrationsResponse;
export const ListProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaListIntegrationsResponse;

export type ListProjectsLocationsIntegrationsError = CommonErrors;

/** Returns the list of all integrations in the specified project. */
export const listProjectsLocationsIntegrations: API.PaginatedOperationMethod<ListProjectsLocationsIntegrationsRequest, ListProjectsLocationsIntegrationsResponse, ListProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsIntegrationsRequest,
  output: ListProjectsLocationsIntegrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SearchProjectsLocationsIntegrationsRequest {
  /** Required. Project and location from which the integrations should be listed. Format: projects/* /locations/* /resources/integrations */
  parent: string;
  /** Required. The user query */
  query?: string;
  /** Optional. The pre-filter to be applied to the search. This should follow the expressions defined in https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata. For example, "status:ANY("ACTIVE")" will return all the resources whose status contains the "ACTIVE". */
  filter?: string;
  /** Optional. The maximum number of results to return. The service may return fewer than this value. If unspecified, at most 10 results will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `SearchIntegrations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchIntegrations` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Whether to enable natural language query understanding. */
  enableNaturalLanguageQueryUnderstanding?: boolean;
}

export const SearchProjectsLocationsIntegrationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  enableNaturalLanguageQueryUnderstanding: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enableNaturalLanguageQueryUnderstanding")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsIntegrationsRequest>;

export type SearchProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse;
export const SearchProjectsLocationsIntegrationsResponse = GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse;

export type SearchProjectsLocationsIntegrationsError = CommonErrors;

/** Searches and returns the list of integrations in the specified project. */
export const searchProjectsLocationsIntegrations: API.PaginatedOperationMethod<SearchProjectsLocationsIntegrationsRequest, SearchProjectsLocationsIntegrationsResponse, SearchProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchProjectsLocationsIntegrationsRequest,
  output: SearchProjectsLocationsIntegrationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsIntegrationsRequest {
  /** Required. The location resource of the request. */
  name: string;
}

export const DeleteProjectsLocationsIntegrationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsIntegrationsRequest>;

export type DeleteProjectsLocationsIntegrationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsIntegrationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsIntegrationsError = CommonErrors;

/** Delete the selected integration and all versions inside */
export const deleteProjectsLocationsIntegrations: API.OperationMethod<DeleteProjectsLocationsIntegrationsRequest, DeleteProjectsLocationsIntegrationsResponse, DeleteProjectsLocationsIntegrationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsIntegrationsRequest,
  output: DeleteProjectsLocationsIntegrationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} Specifically, when parent equals: 1. projects//locations//integrations/, Meaning: "List versions (with filter) for a particular integration". 2. projects//locations//integrations/- Meaning: "List versions (with filter) for a client within a particular region". */
  parent: string;
  /** The maximum number of versions to return. The service may return fewer than this value. If unspecified, at most 50 versions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListIntegrationVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIntegrationVersions` must match the call that provided the page token. */
  pageToken?: string;
  /** Filter on fields of IntegrationVersion. Fields can be compared with literal values by use of ":" (containment), "=" (equality), ">" (greater), "<" (less than), >=" (greater than or equal to), "<=" (less than or equal to), and "!=" (inequality) operators. Negation, conjunction, and disjunction are written using NOT, AND, and OR keywords. For example, organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering cannot be performed on repeated fields like `task_config`. */
  filter?: string;
  /** The results would be returned in order you specified here. Currently supported sort keys are: Descending sort order for "last\_modified\_time", "created\_time", and "snapshot\_number". Ascending sort order for `name`. */
  orderBy?: string;
  /** The field mask which specifies the particular data to be returned. */
  fieldMask?: string;
}

export const ListProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  fieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsIntegrationsVersionsRequest>;

export type ListProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse;
export const ListProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse;

export type ListProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Returns the list of all integration versions in the specified project. */
export const listProjectsLocationsIntegrationsVersions: API.PaginatedOperationMethod<ListProjectsLocationsIntegrationsVersionsRequest, ListProjectsLocationsIntegrationsVersionsResponse, ListProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsIntegrationsVersionsRequest,
  output: ListProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} */
  parent: string;
  /** Set this flag to true, if draft version is to be created for a brand new integration. False, if the request is for an existing integration. For backward compatibility reasons, even if this flag is set to `false` and no existing integration is found, a new draft integration will still be created. */
  newIntegration?: boolean;
  /** Optional. Optional. Indicates if sample workflow should be created. */
  createSampleIntegrations?: boolean;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const CreateProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  newIntegration: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("newIntegration")),
  createSampleIntegrations: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("createSampleIntegrations")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsIntegrationsVersionsRequest>;

export type CreateProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;
export const CreateProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;

export type CreateProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Create a integration with a draft version in the specified project. */
export const createProjectsLocationsIntegrationsVersions: API.OperationMethod<CreateProjectsLocationsIntegrationsVersionsRequest, CreateProjectsLocationsIntegrationsVersionsResponse, CreateProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsIntegrationsVersionsRequest,
  output: CreateProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsIntegrationsVersionsRequest {
  /** Output only. Auto-generated primary key. */
  name: string;
  /** Field mask specifying the fields in the above integration that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

export const PatchProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaIntegrationVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsIntegrationsVersionsRequest>;

export type PatchProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;
export const PatchProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;

export type PatchProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Update a integration with a draft version in the specified project. */
export const patchProjectsLocationsIntegrationsVersions: API.OperationMethod<PatchProjectsLocationsIntegrationsVersionsRequest, PatchProjectsLocationsIntegrationsVersionsResponse, PatchProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsIntegrationsVersionsRequest,
  output: PatchProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The version to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
}

export const GetProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsIntegrationsVersionsRequest>;

export type GetProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;
export const GetProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaIntegrationVersion;

export type GetProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Get a integration in the specified project. */
export const getProjectsLocationsIntegrationsVersions: API.OperationMethod<GetProjectsLocationsIntegrationsVersionsRequest, GetProjectsLocationsIntegrationsVersionsResponse, GetProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsIntegrationsVersionsRequest,
  output: GetProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface PublishProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The version to publish. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest;
}

export const PublishProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}:publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishProjectsLocationsIntegrationsVersionsRequest>;

export type PublishProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse;
export const PublishProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse;

export type PublishProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** This RPC throws an exception if the integration is in ARCHIVED or ACTIVE state. This RPC throws an exception if the version being published is DRAFT, and if the `locked_by` user is not the same as the user performing the Publish. Audit fields updated include last_published_timestamp, last_published_by, last_modified_timestamp, last_modified_by. Any existing lock is on this integration is released. */
export const publishProjectsLocationsIntegrationsVersions: API.OperationMethod<PublishProjectsLocationsIntegrationsVersionsRequest, PublishProjectsLocationsIntegrationsVersionsResponse, PublishProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishProjectsLocationsIntegrationsVersionsRequest,
  output: PublishProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The version to delete. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
}

export const DeleteProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsIntegrationsVersionsRequest>;

export type DeleteProjectsLocationsIntegrationsVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsIntegrationsVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Soft-deletes the integration. Changes the status of the integration to ARCHIVED. If the integration being ARCHIVED is tagged as "HEAD", the tag is removed from this snapshot and set to the previous non-ARCHIVED snapshot. The PUBLISH_REQUESTED, DUE_FOR_DELETION tags are removed too. This RPC throws an exception if the version being deleted is DRAFT, and if the `locked_by` user is not the same as the user performing the Delete. Audit fields updated include last_modified_timestamp, last_modified_by. Any existing lock is released when Deleting a integration. Currently, there is no undelete mechanism. */
export const deleteProjectsLocationsIntegrationsVersions: API.OperationMethod<DeleteProjectsLocationsIntegrationsVersionsRequest, DeleteProjectsLocationsIntegrationsVersionsResponse, DeleteProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsIntegrationsVersionsRequest,
  output: DeleteProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface UploadProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The version to upload. Format: projects/{project}/locations/{location}/integrations/{integration} */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest;
}

export const UploadProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsIntegrationsVersionsRequest>;

export type UploadProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse;
export const UploadProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse;

export type UploadProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Uploads an integration. The content can be a previously downloaded integration. Performs the same function as CreateDraftIntegrationVersion, but accepts input in a string format, which holds the complete representation of the IntegrationVersion content. */
export const uploadProjectsLocationsIntegrationsVersions: API.OperationMethod<UploadProjectsLocationsIntegrationsVersionsRequest, UploadProjectsLocationsIntegrationsVersionsResponse, UploadProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsIntegrationsVersionsRequest,
  output: UploadProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The version to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** File format for download request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
  /** Optional. Integration related file to download like Integration Json, Config variable, testcase etc. */
  files?: "INTEGRATION_FILE_UNSPECIFIED" | "INTEGRATION" | "INTEGRATION_CONFIG_VARIABLES" | (string & {})[];
}

export const DownloadProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  fileFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("fileFormat")),
  files: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("files")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsIntegrationsVersionsRequest>;

export type DownloadProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse;
export const DownloadProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse;

export type DownloadProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Downloads an integration. Retrieves the `IntegrationVersion` for a given `integration_id` and returns the response as a string. */
export const downloadProjectsLocationsIntegrationsVersions: API.OperationMethod<DownloadProjectsLocationsIntegrationsVersionsRequest, DownloadProjectsLocationsIntegrationsVersionsResponse, DownloadProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsIntegrationsVersionsRequest,
  output: DownloadProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface DownloadJsonPackageProjectsLocationsIntegrationsVersionsRequest {
  /** Required. Integration version name Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** Optional. Integration related file to download like Integration Version, Config variable, testcase etc. */
  files?: "INTEGRATION_FILE_UNSPECIFIED" | "INTEGRATION" | "INTEGRATION_CONFIG_VARIABLES" | (string & {})[];
}

export const DownloadJsonPackageProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  files: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("files")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}:downloadJsonPackage" }),
  svc,
) as unknown as Schema.Schema<DownloadJsonPackageProjectsLocationsIntegrationsVersionsRequest>;

export type DownloadJsonPackageProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse;
export const DownloadJsonPackageProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse;

export type DownloadJsonPackageProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Downloads an Integration version package like IntegrationVersion,Integration Config etc. Retrieves the IntegrationVersion package for a given `integration_id` and returns the response as a JSON. */
export const downloadJsonPackageProjectsLocationsIntegrationsVersions: API.OperationMethod<DownloadJsonPackageProjectsLocationsIntegrationsVersionsRequest, DownloadJsonPackageProjectsLocationsIntegrationsVersionsResponse, DownloadJsonPackageProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadJsonPackageProjectsLocationsIntegrationsVersionsRequest,
  output: DownloadJsonPackageProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface UnpublishProjectsLocationsIntegrationsVersionsRequest {
  /** Required. The version to deactivate. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest;
}

export const UnpublishProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}:unpublish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnpublishProjectsLocationsIntegrationsVersionsRequest>;

export type UnpublishProjectsLocationsIntegrationsVersionsResponse = GoogleProtobufEmpty;
export const UnpublishProjectsLocationsIntegrationsVersionsResponse = GoogleProtobufEmpty;

export type UnpublishProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Sets the status of the ACTIVE integration to SNAPSHOT with a new tag "PREVIOUSLY_PUBLISHED" after validating it. The "HEAD" and "PUBLISH_REQUESTED" tags do not change. This RPC throws an exception if the version being snapshot is not ACTIVE. Audit fields added include action, action_by, action_timestamp. */
export const unpublishProjectsLocationsIntegrationsVersions: API.OperationMethod<UnpublishProjectsLocationsIntegrationsVersionsRequest, UnpublishProjectsLocationsIntegrationsVersionsResponse, UnpublishProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnpublishProjectsLocationsIntegrationsVersionsRequest,
  output: UnpublishProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface TestProjectsLocationsIntegrationsVersionsRequest {
  /** Output only. Auto-generated primary key. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTestIntegrationsRequest;
}

export const TestProjectsLocationsIntegrationsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTestIntegrationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}:test", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestProjectsLocationsIntegrationsVersionsRequest>;

export type TestProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaTestIntegrationsResponse;
export const TestProjectsLocationsIntegrationsVersionsResponse = GoogleCloudIntegrationsV1alphaTestIntegrationsResponse;

export type TestProjectsLocationsIntegrationsVersionsError = CommonErrors;

/** Execute the integration in draft state */
export const testProjectsLocationsIntegrationsVersions: API.OperationMethod<TestProjectsLocationsIntegrationsVersionsRequest, TestProjectsLocationsIntegrationsVersionsResponse, TestProjectsLocationsIntegrationsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestProjectsLocationsIntegrationsVersionsRequest,
  output: TestProjectsLocationsIntegrationsVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The parent resource where this test case will be created. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version} */
  parent: string;
  /** Required. Required */
  testCaseId?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTestCase;
}

export const CreateProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  testCaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("testCaseId")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTestCase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type CreateProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;
export const CreateProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;

export type CreateProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Creates a new test case */
export const createProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<CreateProjectsLocationsIntegrationsVersionsTestCasesRequest, CreateProjectsLocationsIntegrationsVersionsTestCasesResponse, CreateProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: CreateProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface GetProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The ID of the test case to retrieve */
  name: string;
}

export const GetProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases/{testCasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type GetProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;
export const GetProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;

export type GetProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Get a test case */
export const getProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<GetProjectsLocationsIntegrationsVersionsTestCasesRequest, GetProjectsLocationsIntegrationsVersionsTestCasesResponse, GetProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: GetProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Output only. Auto-generated primary key. */
  name: string;
  /** Optional. Field mask specifying the fields in the above integration that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTestCase;
}

export const PatchProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTestCase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases/{testCasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type PatchProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;
export const PatchProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;

export type PatchProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Updates a test case */
export const patchProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<PatchProjectsLocationsIntegrationsVersionsTestCasesRequest, PatchProjectsLocationsIntegrationsVersionsTestCasesResponse, PatchProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: PatchProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. ID for the test case to be deleted */
  name: string;
}

export const DeleteProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases/{testCasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type DeleteProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Deletes a test case */
export const deleteProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<DeleteProjectsLocationsIntegrationsVersionsTestCasesRequest, DeleteProjectsLocationsIntegrationsVersionsTestCasesResponse, DeleteProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: DeleteProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The parent resource where this TestCase was created. */
  parent: string;
  /** Optional. Standard filter field. Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** Optional. The maximum number of test cases to return. The service may return fewer than this value. If unspecified, at most 100 test cases will be returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListTestCases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTestCases` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The results would be returned in order specified here. Currently supported sort keys are: Descending sort order for "last_modified_time", "created_time". Ascending sort order for "name". */
  orderBy?: string;
  /** Optional. The mask which specifies fields that need to be returned in the TestCases's response. */
  readMask?: string;
}

export const ListProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type ListProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaListTestCasesResponse;
export const ListProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaListTestCasesResponse;

export type ListProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Lists all the test cases that satisfy the filters. */
export const listProjectsLocationsIntegrationsVersionsTestCases: API.PaginatedOperationMethod<ListProjectsLocationsIntegrationsVersionsTestCasesRequest, ListProjectsLocationsIntegrationsVersionsTestCasesResponse, ListProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: ListProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. Test case resource name */
  testCaseName: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest;
}

export const ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  testCaseName: Schema.String.pipe(T.HttpPath("testCaseName")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases/{testCasesId}:executeTest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse;
export const ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse;

export type ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Executes functional test */
export const executeTestProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesRequest, ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesResponse, ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: ExecuteTestProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface UploadProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The test case to upload. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version} */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUploadTestCaseRequest;
}

export const UploadProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUploadTestCaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type UploadProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaUploadTestCaseResponse;
export const UploadProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaUploadTestCaseResponse;

export type UploadProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Uploads a test case. The content can be a previously downloaded test case. Performs the same function as CreateTestCase, but accepts input in a string format, which holds the complete representation of the TestCase content. */
export const uploadProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<UploadProjectsLocationsIntegrationsVersionsTestCasesRequest, UploadProjectsLocationsIntegrationsVersionsTestCasesResponse, UploadProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: UploadProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The test case to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version}/testCases/{test_case_id} */
  name: string;
  /** File format for download request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const DownloadProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  fileFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("fileFormat")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases/{testCasesId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type DownloadProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse;
export const DownloadProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse;

export type DownloadProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Downloads a test case. Retrieves the `TestCase` for a given `test_case_id` and returns the response as a string. */
export const downloadProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<DownloadProjectsLocationsIntegrationsVersionsTestCasesRequest, DownloadProjectsLocationsIntegrationsVersionsTestCasesResponse, DownloadProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: DownloadProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The ID of test case to takeover edit lock. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version}/testCases/{test_case_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest;
}

export const TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases/{testCasesId}:takeoverEditLock", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;
export const TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaTestCase;

export type TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Clear the lock fields and assign them to current user */
export const takeoverEditLockProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesRequest, TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesResponse, TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: TakeoverEditLockProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface ExecuteProjectsLocationsIntegrationsVersionsTestCasesRequest {
  /** Required. The parent resource whose test cases are executed. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{integration_version} */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest;
}

export const ExecuteProjectsLocationsIntegrationsVersionsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/versions/{versionsId}/testCases:execute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteProjectsLocationsIntegrationsVersionsTestCasesRequest>;

export type ExecuteProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse;
export const ExecuteProjectsLocationsIntegrationsVersionsTestCasesResponse = GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse;

export type ExecuteProjectsLocationsIntegrationsVersionsTestCasesError = CommonErrors;

/** Executes all test cases in an integration version. */
export const executeProjectsLocationsIntegrationsVersionsTestCases: API.OperationMethod<ExecuteProjectsLocationsIntegrationsVersionsTestCasesRequest, ExecuteProjectsLocationsIntegrationsVersionsTestCasesResponse, ExecuteProjectsLocationsIntegrationsVersionsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteProjectsLocationsIntegrationsVersionsTestCasesRequest,
  output: ExecuteProjectsLocationsIntegrationsVersionsTestCasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsIntegrationsExecutionsRequest {
  /** Required. The parent resource name of the integration execution. */
  parent: string;
  /** Optional. Standard filter field, we support filtering on following fields: workflow_name: the name of the integration. CreateTimestamp: the execution created time. event_execution_state: the state of the executions. execution_id: the id of the execution. trigger_id: the id of the trigger. parameter_type: the type of the parameters involved in the execution. All fields support for EQUALS, in additional: CreateTimestamp support for LESS_THAN, GREATER_THAN ParameterType support for HAS For example: "parameter_type" HAS \"string\" Also supports operators like AND, OR, NOT For example, trigger_id=\"id1\" AND workflow_name=\"testWorkflow\" */
  filter?: string;
  /** Optional. The size of entries in the response. */
  pageSize?: number;
  /** Optional. The token returned in the previous response. */
  pageToken?: string;
  /** Optional. The results would be returned in order you specified here. Currently supporting "create_time". */
  orderBy?: string;
  /** Optional. View mask for the response data. If set, only the field specified will be returned as part of the result. If not set, all fields in Execution will be filled and returned. Supported fields: trigger_id execution_method create_time update_time execution_details execution_details.state execution_details.execution_snapshots execution_details.attempt_stats execution_details.event_execution_snapshots_size request_parameters cloud_logging_details snapshot_number replay_info */
  readMask?: string;
  /** Workflow name. */
  "filterParams.workflowName"?: string;
  /** Start timestamp. */
  "filterParams.startTime"?: string;
  /** End timestamp. */
  "filterParams.endTime"?: string;
  /** List of possible event statuses. */
  "filterParams.eventStatuses"?: string[];
  /** List of possible task statuses. */
  "filterParams.taskStatuses"?: string[];
  /** Optional user-provided custom filter. */
  "filterParams.customFilter"?: string;
  /** Execution id. */
  "filterParams.executionId"?: string;
  /** Param value. DEPRECATED. User parameter_pair_value instead. */
  "filterParams.parameterValue"?: string;
  /** Param type. */
  "filterParams.parameterType"?: string;
  /** Param key. DEPRECATED. User parameter_pair_key instead. */
  "filterParams.parameterKey"?: string;
  /** Param key in the key value pair filter. */
  "filterParams.parameterPairKey"?: string;
  /** Param value in the key value pair filter. */
  "filterParams.parameterPairValue"?: string;
  /** Optional. If true, the service will use the most recent acl information to list event execution infos and renew the acl cache. Note that fetching the most recent acl is synchronous, so it will increase RPC call latency. */
  refreshAcl?: boolean;
  /** Optional. If true, the service will truncate the params to only keep the first 1000 characters of string params and empty the executions in order to make response smaller. Only works for UI and when the params fields are not filtered out. */
  truncateParams?: boolean;
  /** Optional. If true, the service will provide execution info with snapshot metadata only i.e. without event parameters. */
  snapshotMetadataWithoutParams?: boolean;
}

export const ListProjectsLocationsIntegrationsExecutionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  "filterParams.workflowName": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.workflowName")),
  "filterParams.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.startTime")),
  "filterParams.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.endTime")),
  "filterParams.eventStatuses": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("filterParams.eventStatuses")),
  "filterParams.taskStatuses": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("filterParams.taskStatuses")),
  "filterParams.customFilter": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.customFilter")),
  "filterParams.executionId": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.executionId")),
  "filterParams.parameterValue": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterValue")),
  "filterParams.parameterType": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterType")),
  "filterParams.parameterKey": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterKey")),
  "filterParams.parameterPairKey": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterPairKey")),
  "filterParams.parameterPairValue": Schema.optional(Schema.String).pipe(T.HttpQuery("filterParams.parameterPairValue")),
  refreshAcl: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("refreshAcl")),
  truncateParams: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("truncateParams")),
  snapshotMetadataWithoutParams: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("snapshotMetadataWithoutParams")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsIntegrationsExecutionsRequest>;

export type ListProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaListExecutionsResponse;
export const ListProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaListExecutionsResponse;

export type ListProjectsLocationsIntegrationsExecutionsError = CommonErrors;

/** Lists the results of all the integration executions. The response includes the same information as the [execution log](https://cloud.google.com/application-integration/docs/viewing-logs) in the Integration UI. */
export const listProjectsLocationsIntegrationsExecutions: API.PaginatedOperationMethod<ListProjectsLocationsIntegrationsExecutionsRequest, ListProjectsLocationsIntegrationsExecutionsResponse, ListProjectsLocationsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsIntegrationsExecutionsRequest,
  output: ListProjectsLocationsIntegrationsExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsIntegrationsExecutionsRequest {
  /** Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} */
  name: string;
}

export const GetProjectsLocationsIntegrationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsIntegrationsExecutionsRequest>;

export type GetProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaExecution;
export const GetProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaExecution;

export type GetProjectsLocationsIntegrationsExecutionsError = CommonErrors;

/** Get an execution in the specified project. */
export const getProjectsLocationsIntegrationsExecutions: API.OperationMethod<GetProjectsLocationsIntegrationsExecutionsRequest, GetProjectsLocationsIntegrationsExecutionsResponse, GetProjectsLocationsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsIntegrationsExecutionsRequest,
  output: GetProjectsLocationsIntegrationsExecutionsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsIntegrationsExecutionsRequest {
  /** Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaCancelExecutionRequest;
}

export const CancelProjectsLocationsIntegrationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaCancelExecutionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsIntegrationsExecutionsRequest>;

export type CancelProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaCancelExecutionResponse;
export const CancelProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaCancelExecutionResponse;

export type CancelProjectsLocationsIntegrationsExecutionsError = CommonErrors;

/** Cancellation of an execution and associated sub-executions. This will not cancel an IN_PROCESS or completed(SUCCESSFUL, FAILED or CANCELLED) executions. */
export const cancelProjectsLocationsIntegrationsExecutions: API.OperationMethod<CancelProjectsLocationsIntegrationsExecutionsRequest, CancelProjectsLocationsIntegrationsExecutionsResponse, CancelProjectsLocationsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsIntegrationsExecutionsRequest,
  output: CancelProjectsLocationsIntegrationsExecutionsResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsIntegrationsExecutionsRequest {
  /** Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id} */
  name: string;
}

export const DownloadProjectsLocationsIntegrationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsIntegrationsExecutionsRequest>;

export type DownloadProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaDownloadExecutionResponse;
export const DownloadProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaDownloadExecutionResponse;

export type DownloadProjectsLocationsIntegrationsExecutionsError = CommonErrors;

/** Download the execution. */
export const downloadProjectsLocationsIntegrationsExecutions: API.OperationMethod<DownloadProjectsLocationsIntegrationsExecutionsRequest, DownloadProjectsLocationsIntegrationsExecutionsResponse, DownloadProjectsLocationsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsIntegrationsExecutionsRequest,
  output: DownloadProjectsLocationsIntegrationsExecutionsResponse,
  errors: [],
}));

export interface ReplayProjectsLocationsIntegrationsExecutionsRequest {
  /** Required. Next ID: 6 The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/integrations/{integration}/executions/{execution_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaReplayExecutionRequest;
}

export const ReplayProjectsLocationsIntegrationsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaReplayExecutionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}:replay", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplayProjectsLocationsIntegrationsExecutionsRequest>;

export type ReplayProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaReplayExecutionResponse;
export const ReplayProjectsLocationsIntegrationsExecutionsResponse = GoogleCloudIntegrationsV1alphaReplayExecutionResponse;

export type ReplayProjectsLocationsIntegrationsExecutionsError = CommonErrors;

/** Re-execute an existing execution, with same request parameters and execution strategy. */
export const replayProjectsLocationsIntegrationsExecutions: API.OperationMethod<ReplayProjectsLocationsIntegrationsExecutionsRequest, ReplayProjectsLocationsIntegrationsExecutionsResponse, ReplayProjectsLocationsIntegrationsExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplayProjectsLocationsIntegrationsExecutionsRequest,
  output: ReplayProjectsLocationsIntegrationsExecutionsResponse,
  errors: [],
}));

export interface ResolveProjectsLocationsIntegrationsExecutionsSuspensionsRequest {
  /** Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}/suspensions/{suspension_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaResolveSuspensionRequest;
}

export const ResolveProjectsLocationsIntegrationsExecutionsSuspensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaResolveSuspensionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}/suspensions/{suspensionsId}:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveProjectsLocationsIntegrationsExecutionsSuspensionsRequest>;

export type ResolveProjectsLocationsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaResolveSuspensionResponse;
export const ResolveProjectsLocationsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaResolveSuspensionResponse;

export type ResolveProjectsLocationsIntegrationsExecutionsSuspensionsError = CommonErrors;

/** * Resolves (lifts/rejects) any number of suspensions. If the integration is already running, only the status of the suspension is updated. Otherwise, the suspended integration will begin execution again. */
export const resolveProjectsLocationsIntegrationsExecutionsSuspensions: API.OperationMethod<ResolveProjectsLocationsIntegrationsExecutionsSuspensionsRequest, ResolveProjectsLocationsIntegrationsExecutionsSuspensionsResponse, ResolveProjectsLocationsIntegrationsExecutionsSuspensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveProjectsLocationsIntegrationsExecutionsSuspensionsRequest,
  output: ResolveProjectsLocationsIntegrationsExecutionsSuspensionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsIntegrationsExecutionsSuspensionsRequest {
  /** Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name} */
  parent: string;
  /** Maximum number of entries in the response. */
  pageSize?: number;
  /** Token to retrieve a specific page. */
  pageToken?: string;
  /** Standard filter field. */
  filter?: string;
  /** Field name to order by. */
  orderBy?: string;
}

export const ListProjectsLocationsIntegrationsExecutionsSuspensionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}/suspensions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsIntegrationsExecutionsSuspensionsRequest>;

export type ListProjectsLocationsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaListSuspensionsResponse;
export const ListProjectsLocationsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaListSuspensionsResponse;

export type ListProjectsLocationsIntegrationsExecutionsSuspensionsError = CommonErrors;

/** * Lists suspensions associated with a specific execution. Only those with permissions to resolve the relevant suspensions will be able to view them. */
export const listProjectsLocationsIntegrationsExecutionsSuspensions: API.PaginatedOperationMethod<ListProjectsLocationsIntegrationsExecutionsSuspensionsRequest, ListProjectsLocationsIntegrationsExecutionsSuspensionsResponse, ListProjectsLocationsIntegrationsExecutionsSuspensionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsIntegrationsExecutionsSuspensionsRequest,
  output: ListProjectsLocationsIntegrationsExecutionsSuspensionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LiftProjectsLocationsIntegrationsExecutionsSuspensionsRequest {
  /** Required. The resource that the suspension belongs to. "projects/{project}/locations/{location}/products/{product}/integrations/{integration}/executions/{execution}/suspensions/{suspenion}" format. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaLiftSuspensionRequest;
}

export const LiftProjectsLocationsIntegrationsExecutionsSuspensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaLiftSuspensionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/integrations/{integrationsId}/executions/{executionsId}/suspensions/{suspensionsId}:lift", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LiftProjectsLocationsIntegrationsExecutionsSuspensionsRequest>;

export type LiftProjectsLocationsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaLiftSuspensionResponse;
export const LiftProjectsLocationsIntegrationsExecutionsSuspensionsResponse = GoogleCloudIntegrationsV1alphaLiftSuspensionResponse;

export type LiftProjectsLocationsIntegrationsExecutionsSuspensionsError = CommonErrors;

/** * Lifts suspension for the Suspension task. Fetch corresponding suspension with provided suspension Id, resolve suspension, and set up suspension result for the Suspension Task. */
export const liftProjectsLocationsIntegrationsExecutionsSuspensions: API.OperationMethod<LiftProjectsLocationsIntegrationsExecutionsSuspensionsRequest, LiftProjectsLocationsIntegrationsExecutionsSuspensionsResponse, LiftProjectsLocationsIntegrationsExecutionsSuspensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LiftProjectsLocationsIntegrationsExecutionsSuspensionsRequest,
  output: LiftProjectsLocationsIntegrationsExecutionsSuspensionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSfdcInstancesRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcInstance;
}

export const CreateProjectsLocationsSfdcInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcInstance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSfdcInstancesRequest>;

export type CreateProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;
export const CreateProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;

export type CreateProjectsLocationsSfdcInstancesError = CommonErrors;

/** Creates an sfdc instance record. Store the sfdc instance in Spanner. Returns the sfdc instance. */
export const createProjectsLocationsSfdcInstances: API.OperationMethod<CreateProjectsLocationsSfdcInstancesRequest, CreateProjectsLocationsSfdcInstancesResponse, CreateProjectsLocationsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSfdcInstancesRequest,
  output: CreateProjectsLocationsSfdcInstancesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSfdcInstancesRequest {
  /** Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}. */
  name: string;
  /** Field mask specifying the fields in the above SfdcInstance that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcInstance;
}

export const PatchProjectsLocationsSfdcInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcInstance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSfdcInstancesRequest>;

export type PatchProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;
export const PatchProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;

export type PatchProjectsLocationsSfdcInstancesError = CommonErrors;

/** Updates an sfdc instance. Updates the sfdc instance in spanner. Returns the sfdc instance. */
export const patchProjectsLocationsSfdcInstances: API.OperationMethod<PatchProjectsLocationsSfdcInstancesRequest, PatchProjectsLocationsSfdcInstancesResponse, PatchProjectsLocationsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSfdcInstancesRequest,
  output: PatchProjectsLocationsSfdcInstancesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSfdcInstancesRequest {
  /** Required. The name that is associated with the SfdcInstance. */
  name: string;
}

export const DeleteProjectsLocationsSfdcInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSfdcInstancesRequest>;

export type DeleteProjectsLocationsSfdcInstancesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsSfdcInstancesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsSfdcInstancesError = CommonErrors;

/** Deletes an sfdc instance. */
export const deleteProjectsLocationsSfdcInstances: API.OperationMethod<DeleteProjectsLocationsSfdcInstancesRequest, DeleteProjectsLocationsSfdcInstancesResponse, DeleteProjectsLocationsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSfdcInstancesRequest,
  output: DeleteProjectsLocationsSfdcInstancesResponse,
  errors: [],
}));

export interface GetProjectsLocationsSfdcInstancesRequest {
  /** Required. The name that is associated with the SfdcInstance. */
  name: string;
}

export const GetProjectsLocationsSfdcInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSfdcInstancesRequest>;

export type GetProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;
export const GetProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaSfdcInstance;

export type GetProjectsLocationsSfdcInstancesError = CommonErrors;

/** Gets an sfdc instance. If the instance doesn't exist, Code.NOT_FOUND exception will be thrown. */
export const getProjectsLocationsSfdcInstances: API.OperationMethod<GetProjectsLocationsSfdcInstancesRequest, GetProjectsLocationsSfdcInstancesResponse, GetProjectsLocationsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSfdcInstancesRequest,
  output: GetProjectsLocationsSfdcInstancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsSfdcInstancesRequest {
  /** Required. The client, which owns this collection of SfdcInstances. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the SfdcInstance's response. */
  readMask?: string;
}

export const ListProjectsLocationsSfdcInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSfdcInstancesRequest>;

export type ListProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse;
export const ListProjectsLocationsSfdcInstancesResponse = GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse;

export type ListProjectsLocationsSfdcInstancesError = CommonErrors;

/** Lists all sfdc instances that match the filter. Restrict to sfdc instances belonging to the current client only. */
export const listProjectsLocationsSfdcInstances: API.PaginatedOperationMethod<ListProjectsLocationsSfdcInstancesRequest, ListProjectsLocationsSfdcInstancesResponse, ListProjectsLocationsSfdcInstancesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSfdcInstancesRequest,
  output: ListProjectsLocationsSfdcInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsSfdcInstancesSfdcChannelsRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcChannel;
}

export const CreateProjectsLocationsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSfdcInstancesSfdcChannelsRequest>;

export type CreateProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;
export const CreateProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;

export type CreateProjectsLocationsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Creates an sfdc channel record. Store the sfdc channel in Spanner. Returns the sfdc channel. */
export const createProjectsLocationsSfdcInstancesSfdcChannels: API.OperationMethod<CreateProjectsLocationsSfdcInstancesSfdcChannelsRequest, CreateProjectsLocationsSfdcInstancesSfdcChannelsResponse, CreateProjectsLocationsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSfdcInstancesSfdcChannelsRequest,
  output: CreateProjectsLocationsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSfdcInstancesSfdcChannelsRequest {
  /** Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}. */
  name: string;
  /** Field mask specifying the fields in the above SfdcChannel that have been modified and need to be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaSfdcChannel;
}

export const PatchProjectsLocationsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaSfdcChannel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels/{sfdcChannelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSfdcInstancesSfdcChannelsRequest>;

export type PatchProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;
export const PatchProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;

export type PatchProjectsLocationsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Updates an sfdc channel. Updates the sfdc channel in spanner. Returns the sfdc channel. */
export const patchProjectsLocationsSfdcInstancesSfdcChannels: API.OperationMethod<PatchProjectsLocationsSfdcInstancesSfdcChannelsRequest, PatchProjectsLocationsSfdcInstancesSfdcChannelsResponse, PatchProjectsLocationsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSfdcInstancesSfdcChannelsRequest,
  output: PatchProjectsLocationsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSfdcInstancesSfdcChannelsRequest {
  /** Required. The name that is associated with the SfdcChannel. */
  name: string;
}

export const DeleteProjectsLocationsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels/{sfdcChannelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSfdcInstancesSfdcChannelsRequest>;

export type DeleteProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Deletes an sfdc channel. */
export const deleteProjectsLocationsSfdcInstancesSfdcChannels: API.OperationMethod<DeleteProjectsLocationsSfdcInstancesSfdcChannelsRequest, DeleteProjectsLocationsSfdcInstancesSfdcChannelsResponse, DeleteProjectsLocationsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSfdcInstancesSfdcChannelsRequest,
  output: DeleteProjectsLocationsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSfdcInstancesSfdcChannelsRequest {
  /** Required. The name that is associated with the SfdcChannel. */
  name: string;
}

export const GetProjectsLocationsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels/{sfdcChannelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSfdcInstancesSfdcChannelsRequest>;

export type GetProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;
export const GetProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaSfdcChannel;

export type GetProjectsLocationsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Gets an sfdc channel. If the channel doesn't exist, Code.NOT_FOUND exception will be thrown. */
export const getProjectsLocationsSfdcInstancesSfdcChannels: API.OperationMethod<GetProjectsLocationsSfdcInstancesSfdcChannelsRequest, GetProjectsLocationsSfdcInstancesSfdcChannelsResponse, GetProjectsLocationsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSfdcInstancesSfdcChannelsRequest,
  output: GetProjectsLocationsSfdcInstancesSfdcChannelsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSfdcInstancesSfdcChannelsRequest {
  /** Required. The client, which owns this collection of SfdcChannels. */
  parent: string;
  /** The size of entries in the response. If unspecified, defaults to 100. */
  pageSize?: number;
  /** The token returned in the previous response. */
  pageToken?: string;
  /** Filtering as supported in https://developers.google.com/authorized-buyers/apis/guides/list-filters. */
  filter?: string;
  /** The mask which specifies fields that need to be returned in the SfdcChannel's response. */
  readMask?: string;
}

export const ListProjectsLocationsSfdcInstancesSfdcChannelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/sfdcInstances/{sfdcInstancesId}/sfdcChannels" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSfdcInstancesSfdcChannelsRequest>;

export type ListProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse;
export const ListProjectsLocationsSfdcInstancesSfdcChannelsResponse = GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse;

export type ListProjectsLocationsSfdcInstancesSfdcChannelsError = CommonErrors;

/** Lists all sfdc channels that match the filter. Restrict to sfdc channels belonging to the current client only. */
export const listProjectsLocationsSfdcInstancesSfdcChannels: API.PaginatedOperationMethod<ListProjectsLocationsSfdcInstancesSfdcChannelsRequest, ListProjectsLocationsSfdcInstancesSfdcChannelsResponse, ListProjectsLocationsSfdcInstancesSfdcChannelsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSfdcInstancesSfdcChannelsRequest,
  output: ListProjectsLocationsSfdcInstancesSfdcChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsTemplatesRequest {
  /** Required. The client, which owns this collection of Templates. */
  parent: string;
  /** Optional. The size of the response entries. If unspecified, defaults to 100. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The token returned in the previous response. */
  pageToken?: string;
  /** Optional. Standard filter field to filter templates. client_id filter won't be supported and will restrict to templates belonging to the current client only. Return all templates of the current client if the filter is empty. Also supports operators like AND, OR, NOT For example, "status=\"ACTIVE\" */
  filter?: string;
  /** Optional. The results would be returned in the order you specified here. */
  orderBy?: string;
  /** Optional. The mask which specifies fields that need to be returned in the template's response. */
  readMask?: string;
}

export const ListProjectsLocationsTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/templates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsTemplatesRequest>;

export type ListProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaListTemplatesResponse;
export const ListProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaListTemplatesResponse;

export type ListProjectsLocationsTemplatesError = CommonErrors;

/** Lists all templates matching the filter. */
export const listProjectsLocationsTemplates: API.PaginatedOperationMethod<ListProjectsLocationsTemplatesRequest, ListProjectsLocationsTemplatesResponse, ListProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsTemplatesRequest,
  output: ListProjectsLocationsTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsTemplatesRequest {
  /** Required. The template to retrieve. Format: projects/{project}/locations/{location}/templates/{template} */
  name: string;
}

export const GetProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsTemplatesRequest>;

export type GetProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaTemplate;
export const GetProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaTemplate;

export type GetProjectsLocationsTemplatesError = CommonErrors;

/** Get a template in the specified project. */
export const getProjectsLocationsTemplates: API.OperationMethod<GetProjectsLocationsTemplatesRequest, GetProjectsLocationsTemplatesResponse, GetProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsTemplatesRequest,
  output: GetProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsTemplatesRequest {
  /** Required. "projects/{project}/locations/{location}" format. */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTemplate;
}

export const CreateProjectsLocationsTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/templates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsTemplatesRequest>;

export type CreateProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaTemplate;
export const CreateProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaTemplate;

export type CreateProjectsLocationsTemplatesError = CommonErrors;

/** Creates a new template */
export const createProjectsLocationsTemplates: API.OperationMethod<CreateProjectsLocationsTemplatesRequest, CreateProjectsLocationsTemplatesResponse, CreateProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsTemplatesRequest,
  output: CreateProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsTemplatesRequest {
  /** Identifier. Resource name of the template. */
  name: string;
  /** Required. Field mask specifying the fields in the above template that have been modified and must be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaTemplate;
}

export const PatchProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsTemplatesRequest>;

export type PatchProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaTemplate;
export const PatchProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaTemplate;

export type PatchProjectsLocationsTemplatesError = CommonErrors;

/** Updates the template by given id. */
export const patchProjectsLocationsTemplates: API.OperationMethod<PatchProjectsLocationsTemplatesRequest, PatchProjectsLocationsTemplatesResponse, PatchProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsTemplatesRequest,
  output: PatchProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsTemplatesRequest {
  /** Required. The name that is associated with the Template. */
  name: string;
}

export const DeleteProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsTemplatesRequest>;

export type DeleteProjectsLocationsTemplatesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsTemplatesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsTemplatesError = CommonErrors;

/** Deletes a template */
export const deleteProjectsLocationsTemplates: API.OperationMethod<DeleteProjectsLocationsTemplatesRequest, DeleteProjectsLocationsTemplatesResponse, DeleteProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsTemplatesRequest,
  output: DeleteProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface SearchProjectsLocationsTemplatesRequest {
  /** Required. The client, which owns this collection of Templates. */
  parent: string;
  /** Optional. The size of the response entries. If unspecified, defaults to 100. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The token returned in the previous response. */
  pageToken?: string;
  /** Optional. Standard filter field to filter templates. client_id filter won't be supported and will restrict to templates belonging to the current client only. Return all templates of the current client if the filter is empty. Also supports operators like AND, OR, NOT For example, "status=\"ACTIVE\" */
  filter?: string;
  /** Optional. The results would be returned in the order you specified here. */
  orderBy?: string;
  /** Optional. The mask which specifies fields that need to be returned in the template's response. */
  readMask?: string;
  /** Optional. The search query that will be passed to Vertex search service. */
  query?: string;
  /** Optional. Whether to enable natural language query understanding. */
  enableNaturalLanguageQueryUnderstanding?: boolean;
}

export const SearchProjectsLocationsTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  enableNaturalLanguageQueryUnderstanding: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enableNaturalLanguageQueryUnderstanding")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/templates:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsTemplatesRequest>;

export type SearchProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaSearchTemplatesResponse;
export const SearchProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaSearchTemplatesResponse;

export type SearchProjectsLocationsTemplatesError = CommonErrors;

/** Search templates based on user query and filters. This api would query the templates and return a list of templates based on the user filter. */
export const searchProjectsLocationsTemplates: API.PaginatedOperationMethod<SearchProjectsLocationsTemplatesRequest, SearchProjectsLocationsTemplatesResponse, SearchProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchProjectsLocationsTemplatesRequest,
  output: SearchProjectsLocationsTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UseProjectsLocationsTemplatesRequest {
  /** Required. The name that is associated with the Template. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUseTemplateRequest;
}

export const UseProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUseTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}:use", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UseProjectsLocationsTemplatesRequest>;

export type UseProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaUseTemplateResponse;
export const UseProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaUseTemplateResponse;

export type UseProjectsLocationsTemplatesError = CommonErrors;

/** Use the template to create integration. This api would keep track of usage_count and last_used_time. PERMISSION_DENIED would be thrown if template is not accessible by client. */
export const useProjectsLocationsTemplates: API.OperationMethod<UseProjectsLocationsTemplatesRequest, UseProjectsLocationsTemplatesResponse, UseProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UseProjectsLocationsTemplatesRequest,
  output: UseProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsTemplatesRequest {
  /** Required. The name that is associated with the Template. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaImportTemplateRequest;
}

export const ImportProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaImportTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsTemplatesRequest>;

export type ImportProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaImportTemplateResponse;
export const ImportProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaImportTemplateResponse;

export type ImportProjectsLocationsTemplatesError = CommonErrors;

/** Import the template to an existing integration. This api would keep track of usage_count and last_used_time. PERMISSION_DENIED would be thrown if template is not accessible by client. */
export const importProjectsLocationsTemplates: API.OperationMethod<ImportProjectsLocationsTemplatesRequest, ImportProjectsLocationsTemplatesResponse, ImportProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsTemplatesRequest,
  output: ImportProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface ShareProjectsLocationsTemplatesRequest {
  /** Required. The name that is associated with the Template. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaShareTemplateRequest;
}

export const ShareProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaShareTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}:share", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ShareProjectsLocationsTemplatesRequest>;

export type ShareProjectsLocationsTemplatesResponse = GoogleProtobufEmpty;
export const ShareProjectsLocationsTemplatesResponse = GoogleProtobufEmpty;

export type ShareProjectsLocationsTemplatesError = CommonErrors;

/** Share a template with other clients. Only the template owner can share the templates with other projects. PERMISSION_DENIED would be thrown if the request is not from the owner. */
export const shareProjectsLocationsTemplates: API.OperationMethod<ShareProjectsLocationsTemplatesRequest, ShareProjectsLocationsTemplatesResponse, ShareProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ShareProjectsLocationsTemplatesRequest,
  output: ShareProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface UnshareProjectsLocationsTemplatesRequest {
  /** Required. The name that is associated with the Template. */
  name: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUnshareTemplateRequest;
}

export const UnshareProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUnshareTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}:unshare", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnshareProjectsLocationsTemplatesRequest>;

export type UnshareProjectsLocationsTemplatesResponse = GoogleProtobufEmpty;
export const UnshareProjectsLocationsTemplatesResponse = GoogleProtobufEmpty;

export type UnshareProjectsLocationsTemplatesError = CommonErrors;

/** Unshare a template from given clients. Owner of the template can unshare template with clients. Shared client can only unshare the template from itself. PERMISSION_DENIED would be thrown if request is not from owner or for unsharing itself. */
export const unshareProjectsLocationsTemplates: API.OperationMethod<UnshareProjectsLocationsTemplatesRequest, UnshareProjectsLocationsTemplatesResponse, UnshareProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnshareProjectsLocationsTemplatesRequest,
  output: UnshareProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface UploadProjectsLocationsTemplatesRequest {
  /** Required. The template to upload. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Request body */
  body?: GoogleCloudIntegrationsV1alphaUploadTemplateRequest;
}

export const UploadProjectsLocationsTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIntegrationsV1alphaUploadTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/templates:upload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadProjectsLocationsTemplatesRequest>;

export type UploadProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaUploadTemplateResponse;
export const UploadProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaUploadTemplateResponse;

export type UploadProjectsLocationsTemplatesError = CommonErrors;

/** Uploads a template. The content can be a previously downloaded template. Performs the same function as CreateTemplate, but accepts input in a string format, which holds the complete representation of the Template content. */
export const uploadProjectsLocationsTemplates: API.OperationMethod<UploadProjectsLocationsTemplatesRequest, UploadProjectsLocationsTemplatesResponse, UploadProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadProjectsLocationsTemplatesRequest,
  output: UploadProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface DownloadProjectsLocationsTemplatesRequest {
  /** Required. The template to download. Format: projects/{project}/locations/{location}/template/{template_id} */
  name: string;
  /** Required. File format for download request. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
}

export const DownloadProjectsLocationsTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  fileFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("fileFormat")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/templates/{templatesId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadProjectsLocationsTemplatesRequest>;

export type DownloadProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaDownloadTemplateResponse;
export const DownloadProjectsLocationsTemplatesResponse = GoogleCloudIntegrationsV1alphaDownloadTemplateResponse;

export type DownloadProjectsLocationsTemplatesError = CommonErrors;

/** Downloads a template. Retrieves the `Template` and returns the response as a string. */
export const downloadProjectsLocationsTemplates: API.OperationMethod<DownloadProjectsLocationsTemplatesRequest, DownloadProjectsLocationsTemplatesResponse, DownloadProjectsLocationsTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadProjectsLocationsTemplatesRequest,
  output: DownloadProjectsLocationsTemplatesResponse,
  errors: [],
}));

export interface EnumerateConnectorPlatformRegionsRequest {
}

export const EnumerateConnectorPlatformRegionsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/connectorPlatformRegions:enumerate" }),
  svc,
) as unknown as Schema.Schema<EnumerateConnectorPlatformRegionsRequest>;

export type EnumerateConnectorPlatformRegionsResponse = GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse;
export const EnumerateConnectorPlatformRegionsResponse = GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse;

export type EnumerateConnectorPlatformRegionsError = CommonErrors;

/** Enumerates the regions for which Connector Platform is provisioned. */
export const enumerateConnectorPlatformRegions: API.OperationMethod<EnumerateConnectorPlatformRegionsRequest, EnumerateConnectorPlatformRegionsResponse, EnumerateConnectorPlatformRegionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnumerateConnectorPlatformRegionsRequest,
  output: EnumerateConnectorPlatformRegionsResponse,
  errors: [],
}));

export interface GenerateTokenCallbackRequest {
  /** The auth config id for the given request */
  state?: string;
  /** The auth code for the given request */
  code?: string;
  /** The gcp project id of the request */
  gcpProjectId?: string;
  /** Redirect uri of the auth code request */
  redirectUri?: string;
  /** Which product sends the request */
  product?: "UNSPECIFIED_PRODUCT" | "IP" | "APIGEE" | "SECURITY" | (string & {});
}

export const GenerateTokenCallbackRequest = Schema.Struct({
  state: Schema.optional(Schema.String).pipe(T.HttpQuery("state")),
  code: Schema.optional(Schema.String).pipe(T.HttpQuery("code")),
  gcpProjectId: Schema.optional(Schema.String).pipe(T.HttpQuery("gcpProjectId")),
  redirectUri: Schema.optional(Schema.String).pipe(T.HttpQuery("redirectUri")),
  product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
}).pipe(
  T.Http({ method: "GET", path: "v1/callback:generateToken" }),
  svc,
) as unknown as Schema.Schema<GenerateTokenCallbackRequest>;

export type GenerateTokenCallbackResponse = GoogleCloudIntegrationsV1alphaGenerateTokenResponse;
export const GenerateTokenCallbackResponse = GoogleCloudIntegrationsV1alphaGenerateTokenResponse;

export type GenerateTokenCallbackError = CommonErrors;

/** Receives the auth code and auth config id to combine that with the client id and secret to retrieve access tokens from the token endpoint. Returns either a success or error message when it's done. */
export const generateTokenCallback: API.OperationMethod<GenerateTokenCallbackRequest, GenerateTokenCallbackResponse, GenerateTokenCallbackError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateTokenCallbackRequest,
  output: GenerateTokenCallbackResponse,
  errors: [],
}));

