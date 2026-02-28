// ==========================================================================
// GKE Hub API (gkehub v2)
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
  name: "gkehub",
  version: "v2",
  rootUrl: "https://gkehub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface WorkloadCertificateSpec {
  /** CertificateManagement specifies workload certificate management. */
  certificateManagement?: "CERTIFICATE_MANAGEMENT_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
}

export const WorkloadCertificateSpec: Schema.Schema<WorkloadCertificateSpec> = Schema.suspend(() => Schema.Struct({
  certificateManagement: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadCertificateSpec" }) as any as Schema.Schema<WorkloadCertificateSpec>;

export interface CloudBuildSpec {
  /** Version of the cloud build software on the cluster. */
  version?: string;
  /** Whether it is allowed to run the privileged builds on the cluster or not. */
  securityPolicy?: "SECURITY_POLICY_UNSPECIFIED" | "NON_PRIVILEGED" | "PRIVILEGED" | (string & {});
}

export const CloudBuildSpec: Schema.Schema<CloudBuildSpec> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  securityPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudBuildSpec" }) as any as Schema.Schema<CloudBuildSpec>;

export interface PolicyControllerMonitoringConfig {
  /** Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export. */
  backends?: Array<"MONITORING_BACKEND_UNSPECIFIED" | "PROMETHEUS" | "CLOUD_MONITORING" | (string & {})>;
}

export const PolicyControllerMonitoringConfig: Schema.Schema<PolicyControllerMonitoringConfig> = Schema.suspend(() => Schema.Struct({
  backends: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PolicyControllerMonitoringConfig" }) as any as Schema.Schema<PolicyControllerMonitoringConfig>;

export interface PolicyControllerBundleInstallSpec {
  /** the set of namespaces to be exempted from the bundle */
  exemptedNamespaces?: Array<string>;
}

export const PolicyControllerBundleInstallSpec: Schema.Schema<PolicyControllerBundleInstallSpec> = Schema.suspend(() => Schema.Struct({
  exemptedNamespaces: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PolicyControllerBundleInstallSpec" }) as any as Schema.Schema<PolicyControllerBundleInstallSpec>;

export interface PolicyControllerTemplateLibraryConfig {
  /** Configures the manner in which the template library is installed on the cluster. */
  installation?: "INSTALLATION_UNSPECIFIED" | "NOT_INSTALLED" | "ALL" | (string & {});
}

export const PolicyControllerTemplateLibraryConfig: Schema.Schema<PolicyControllerTemplateLibraryConfig> = Schema.suspend(() => Schema.Struct({
  installation: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyControllerTemplateLibraryConfig" }) as any as Schema.Schema<PolicyControllerTemplateLibraryConfig>;

export interface PolicyControllerPolicyContentSpec {
  /** map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint. */
  bundles?: Record<string, PolicyControllerBundleInstallSpec>;
  /** Configures the installation of the Template Library. */
  templateLibrary?: PolicyControllerTemplateLibraryConfig;
}

export const PolicyControllerPolicyContentSpec: Schema.Schema<PolicyControllerPolicyContentSpec> = Schema.suspend(() => Schema.Struct({
  bundles: Schema.optional(Schema.Record(Schema.String, PolicyControllerBundleInstallSpec)),
  templateLibrary: Schema.optional(PolicyControllerTemplateLibraryConfig),
})).annotate({ identifier: "PolicyControllerPolicyContentSpec" }) as any as Schema.Schema<PolicyControllerPolicyContentSpec>;

export interface PolicyControllerResourceList {
  /** Memory requirement expressed in Kubernetes resource units. */
  memory?: string;
  /** CPU requirement expressed in Kubernetes resource units. */
  cpu?: string;
}

export const PolicyControllerResourceList: Schema.Schema<PolicyControllerResourceList> = Schema.suspend(() => Schema.Struct({
  memory: Schema.optional(Schema.String),
  cpu: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyControllerResourceList" }) as any as Schema.Schema<PolicyControllerResourceList>;

export interface PolicyControllerResourceRequirements {
  /** Limits describes the maximum amount of compute resources allowed for use by the running container. */
  limits?: PolicyControllerResourceList;
  /** Requests describes the amount of compute resources reserved for the container by the kube-scheduler. */
  requests?: PolicyControllerResourceList;
}

export const PolicyControllerResourceRequirements: Schema.Schema<PolicyControllerResourceRequirements> = Schema.suspend(() => Schema.Struct({
  limits: Schema.optional(PolicyControllerResourceList),
  requests: Schema.optional(PolicyControllerResourceList),
})).annotate({ identifier: "PolicyControllerResourceRequirements" }) as any as Schema.Schema<PolicyControllerResourceRequirements>;

export interface PolicyControllerToleration {
  /** Matches a taint key (not necessarily unique). */
  key?: string;
  /** Matches a taint operator. */
  operator?: string;
  /** Matches a taint value. */
  value?: string;
  /** Matches a taint effect. */
  effect?: string;
}

export const PolicyControllerToleration: Schema.Schema<PolicyControllerToleration> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  effect: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyControllerToleration" }) as any as Schema.Schema<PolicyControllerToleration>;

export interface PolicyControllerPolicyControllerDeploymentConfig {
  /** Pod replica count. */
  replicaCount?: string;
  /** Container resource requirements. */
  containerResources?: PolicyControllerResourceRequirements;
  /** Pod anti-affinity enablement. Deprecated: use `pod_affinity` instead. */
  podAntiAffinity?: boolean;
  /** Pod tolerations of node taints. */
  podTolerations?: Array<PolicyControllerToleration>;
  /** Pod affinity configuration. */
  podAffinity?: "AFFINITY_UNSPECIFIED" | "NO_AFFINITY" | "ANTI_AFFINITY" | (string & {});
}

export const PolicyControllerPolicyControllerDeploymentConfig: Schema.Schema<PolicyControllerPolicyControllerDeploymentConfig> = Schema.suspend(() => Schema.Struct({
  replicaCount: Schema.optional(Schema.String),
  containerResources: Schema.optional(PolicyControllerResourceRequirements),
  podAntiAffinity: Schema.optional(Schema.Boolean),
  podTolerations: Schema.optional(Schema.Array(PolicyControllerToleration)),
  podAffinity: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyControllerPolicyControllerDeploymentConfig" }) as any as Schema.Schema<PolicyControllerPolicyControllerDeploymentConfig>;

export interface PolicyControllerHubConfig {
  /** The install_spec represents the intended state specified by the latest request that mutated install_spec in the feature spec, not the lifecycle state of the feature observed by the Hub feature controller that is reported in the feature state. */
  installSpec?: "INSTALL_SPEC_UNSPECIFIED" | "INSTALL_SPEC_NOT_INSTALLED" | "INSTALL_SPEC_ENABLED" | "INSTALL_SPEC_SUSPENDED" | "INSTALL_SPEC_DETACHED" | (string & {});
  /** Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether. */
  auditIntervalSeconds?: string;
  /** The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster. */
  exemptableNamespaces?: Array<string>;
  /** Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated. */
  referentialRulesEnabled?: boolean;
  /** Logs all denies and dry run failures. */
  logDeniesEnabled?: boolean;
  /** Enables the ability to mutate resources using Policy Controller. */
  mutationEnabled?: boolean;
  /** Monitoring specifies the configuration of monitoring. */
  monitoring?: PolicyControllerMonitoringConfig;
  /** Specifies the desired policy content on the cluster */
  policyContent?: PolicyControllerPolicyContentSpec;
  /** The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used. */
  constraintViolationLimit?: string;
  /** Map of deployment configs to deployments (“admission”, “audit”, “mutation”). */
  deploymentConfigs?: Record<string, PolicyControllerPolicyControllerDeploymentConfig>;
}

export const PolicyControllerHubConfig: Schema.Schema<PolicyControllerHubConfig> = Schema.suspend(() => Schema.Struct({
  installSpec: Schema.optional(Schema.String),
  auditIntervalSeconds: Schema.optional(Schema.String),
  exemptableNamespaces: Schema.optional(Schema.Array(Schema.String)),
  referentialRulesEnabled: Schema.optional(Schema.Boolean),
  logDeniesEnabled: Schema.optional(Schema.Boolean),
  mutationEnabled: Schema.optional(Schema.Boolean),
  monitoring: Schema.optional(PolicyControllerMonitoringConfig),
  policyContent: Schema.optional(PolicyControllerPolicyContentSpec),
  constraintViolationLimit: Schema.optional(Schema.String),
  deploymentConfigs: Schema.optional(Schema.Record(Schema.String, PolicyControllerPolicyControllerDeploymentConfig)),
})).annotate({ identifier: "PolicyControllerHubConfig" }) as any as Schema.Schema<PolicyControllerHubConfig>;

export interface PolicyControllerSpec {
  /** Policy Controller configuration for the cluster. */
  policyControllerHubConfig?: PolicyControllerHubConfig;
  /** Version of Policy Controller installed. */
  version?: string;
}

export const PolicyControllerSpec: Schema.Schema<PolicyControllerSpec> = Schema.suspend(() => Schema.Struct({
  policyControllerHubConfig: Schema.optional(PolicyControllerHubConfig),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyControllerSpec" }) as any as Schema.Schema<PolicyControllerSpec>;

export interface RBACRoleBindingActuationSpec {
}

export const RBACRoleBindingActuationSpec: Schema.Schema<RBACRoleBindingActuationSpec> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RBACRoleBindingActuationSpec" }) as any as Schema.Schema<RBACRoleBindingActuationSpec>;

export interface IdentityServiceOidcConfig {
  /** ID for OIDC client application. */
  clientId?: string;
  /** PEM-encoded CA for OIDC provider. */
  certificateAuthorityData?: string;
  /** URI for the OIDC provider. This should point to the level below .well-known/openid-configuration. */
  issuerUri?: string;
  /** Registered redirect uri to redirect users going through OAuth flow using kubectl plugin. */
  kubectlRedirectUri?: string;
  /** Comma-separated list of identifiers. */
  scopes?: string;
  /** Comma-separated list of key-value pairs. */
  extraParams?: string;
  /** Claim in OIDC ID token that holds username. */
  userClaim?: string;
  /** Prefix to prepend to user name. */
  userPrefix?: string;
  /** Claim in OIDC ID token that holds group information. */
  groupsClaim?: string;
  /** Prefix to prepend to group name. */
  groupPrefix?: string;
  /** Flag to denote if reverse proxy is used to connect to auth provider. This flag should be set to true when provider is not reachable by Google Cloud Console. */
  deployCloudConsoleProxy?: boolean;
  /** Input only. Unencrypted OIDC client secret will be passed to the GKE Hub CLH. */
  clientSecret?: string;
  /** Output only. Encrypted OIDC Client secret */
  encryptedClientSecret?: string;
  /** Enable access token. */
  enableAccessToken?: boolean;
}

export const IdentityServiceOidcConfig: Schema.Schema<IdentityServiceOidcConfig> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  certificateAuthorityData: Schema.optional(Schema.String),
  issuerUri: Schema.optional(Schema.String),
  kubectlRedirectUri: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.String),
  extraParams: Schema.optional(Schema.String),
  userClaim: Schema.optional(Schema.String),
  userPrefix: Schema.optional(Schema.String),
  groupsClaim: Schema.optional(Schema.String),
  groupPrefix: Schema.optional(Schema.String),
  deployCloudConsoleProxy: Schema.optional(Schema.Boolean),
  clientSecret: Schema.optional(Schema.String),
  encryptedClientSecret: Schema.optional(Schema.String),
  enableAccessToken: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IdentityServiceOidcConfig" }) as any as Schema.Schema<IdentityServiceOidcConfig>;

export interface IdentityServiceAzureADConfig {
  /** ID for the registered client application that makes authentication requests to the Azure AD identity provider. */
  clientId?: string;
  /** Kind of Azure AD account to be authenticated. Supported values are or for accounts belonging to a specific tenant. */
  tenant?: string;
  /** The redirect URL that kubectl uses for authorization. */
  kubectlRedirectUri?: string;
  /** Input only. Unencrypted AzureAD client secret will be passed to the GKE Hub CLH. */
  clientSecret?: string;
  /** Output only. Encrypted AzureAD client secret. */
  encryptedClientSecret?: string;
  /** Optional. Claim in the AzureAD ID Token that holds the user details. */
  userClaim?: string;
  /** Optional. Format of the AzureAD groups that the client wants for auth. */
  groupFormat?: string;
}

export const IdentityServiceAzureADConfig: Schema.Schema<IdentityServiceAzureADConfig> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  tenant: Schema.optional(Schema.String),
  kubectlRedirectUri: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  encryptedClientSecret: Schema.optional(Schema.String),
  userClaim: Schema.optional(Schema.String),
  groupFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceAzureADConfig" }) as any as Schema.Schema<IdentityServiceAzureADConfig>;

export interface IdentityServiceGoogleConfig {
  /** Disable automatic configuration of Google Plugin on supported platforms. */
  disable?: boolean;
}

export const IdentityServiceGoogleConfig: Schema.Schema<IdentityServiceGoogleConfig> = Schema.suspend(() => Schema.Struct({
  disable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IdentityServiceGoogleConfig" }) as any as Schema.Schema<IdentityServiceGoogleConfig>;

export interface IdentityServiceSamlConfig {
  /** Required. The entity ID of the SAML IdP. */
  identityProviderId?: string;
  /** Required. The URI where the SAML IdP exposes the SSO service. */
  identityProviderSsoUri?: string;
  /** Required. The list of IdP certificates to validate the SAML response against. */
  identityProviderCertificates?: Array<string>;
  /** Optional. The SAML attribute to read username from. If unspecified, the username will be read from the NameID element of the assertion in SAML response. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `user_prefix`). */
  userAttribute?: string;
  /** Optional. The SAML attribute to read groups from. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `group_prefix`). */
  groupsAttribute?: string;
  /** Optional. Prefix to prepend to user name. */
  userPrefix?: string;
  /** Optional. Prefix to prepend to group name. */
  groupPrefix?: string;
  /** Optional. The mapping of additional user attributes like nickname, birthday and address etc.. `key` is the name of this additional attribute. `value` is a string presenting as CEL(common expression language, go/cel) used for getting the value from the resources. Take nickname as an example, in this case, `key` is "attribute.nickname" and `value` is "assertion.nickname". */
  attributeMapping?: Record<string, string>;
}

export const IdentityServiceSamlConfig: Schema.Schema<IdentityServiceSamlConfig> = Schema.suspend(() => Schema.Struct({
  identityProviderId: Schema.optional(Schema.String),
  identityProviderSsoUri: Schema.optional(Schema.String),
  identityProviderCertificates: Schema.optional(Schema.Array(Schema.String)),
  userAttribute: Schema.optional(Schema.String),
  groupsAttribute: Schema.optional(Schema.String),
  userPrefix: Schema.optional(Schema.String),
  groupPrefix: Schema.optional(Schema.String),
  attributeMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "IdentityServiceSamlConfig" }) as any as Schema.Schema<IdentityServiceSamlConfig>;

export interface IdentityServiceServerConfig {
  /** Required. Defines the hostname or IP of the LDAP server. Port is optional and will default to 389, if unspecified. For example, "ldap.server.example" or "10.10.10.10:389". */
  host?: string;
  /** Optional. Defines the connection type to communicate with the LDAP server. If `starttls` or `ldaps` is specified, the certificate_authority_data should not be empty. */
  connectionType?: string;
  /** Optional. Contains a Base64 encoded, PEM formatted certificate authority certificate for the LDAP server. This must be provided for the "ldaps" and "startTLS" connections. */
  certificateAuthorityData?: string;
}

export const IdentityServiceServerConfig: Schema.Schema<IdentityServiceServerConfig> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  connectionType: Schema.optional(Schema.String),
  certificateAuthorityData: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceServerConfig" }) as any as Schema.Schema<IdentityServiceServerConfig>;

export interface IdentityServiceUserConfig {
  /** Required. The location of the subtree in the LDAP directory to search for user entries. */
  baseDn?: string;
  /** Optional. The name of the attribute which matches against the input username. This is used to find the user in the LDAP database e.g. "(=)" and is combined with the optional filter field. This defaults to "userPrincipalName". */
  loginAttribute?: string;
  /** Optional. Determines which attribute to use as the user's identity after they are authenticated. This is distinct from the loginAttribute field to allow users to login with a username, but then have their actual identifier be an email address or full Distinguished Name (DN). For example, setting loginAttribute to "sAMAccountName" and identifierAttribute to "userPrincipalName" would allow a user to login as "bsmith", but actual RBAC policies for the user would be written as "bsmith@example.com". Using "userPrincipalName" is recommended since this will be unique for each user. This defaults to "userPrincipalName". */
  idAttribute?: string;
  /** Optional. Filter to apply when searching for the user. This can be used to further restrict the user accounts which are allowed to login. This defaults to "(objectClass=User)". */
  filter?: string;
}

export const IdentityServiceUserConfig: Schema.Schema<IdentityServiceUserConfig> = Schema.suspend(() => Schema.Struct({
  baseDn: Schema.optional(Schema.String),
  loginAttribute: Schema.optional(Schema.String),
  idAttribute: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceUserConfig" }) as any as Schema.Schema<IdentityServiceUserConfig>;

export interface IdentityServiceGroupConfig {
  /** Required. The location of the subtree in the LDAP directory to search for group entries. */
  baseDn?: string;
  /** Optional. The identifying name of each group a user belongs to. For example, if this is set to "distinguishedName" then RBACs and other group expectations should be written as full DNs. This defaults to "distinguishedName". */
  idAttribute?: string;
  /** Optional. Optional filter to be used when searching for groups a user belongs to. This can be used to explicitly match only certain groups in order to reduce the amount of groups returned for each user. This defaults to "(objectClass=Group)". */
  filter?: string;
}

export const IdentityServiceGroupConfig: Schema.Schema<IdentityServiceGroupConfig> = Schema.suspend(() => Schema.Struct({
  baseDn: Schema.optional(Schema.String),
  idAttribute: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceGroupConfig" }) as any as Schema.Schema<IdentityServiceGroupConfig>;

export interface IdentityServiceSimpleBindCredentials {
  /** Required. The distinguished name(DN) of the service account object/user. */
  dn?: string;
  /** Required. Input only. The password of the service account object/user. */
  password?: string;
  /** Output only. The encrypted password of the service account object/user. */
  encryptedPassword?: string;
}

export const IdentityServiceSimpleBindCredentials: Schema.Schema<IdentityServiceSimpleBindCredentials> = Schema.suspend(() => Schema.Struct({
  dn: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  encryptedPassword: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceSimpleBindCredentials" }) as any as Schema.Schema<IdentityServiceSimpleBindCredentials>;

export interface IdentityServiceServiceAccountConfig {
  /** Credentials for basic auth. */
  simpleBindCredentials?: IdentityServiceSimpleBindCredentials;
}

export const IdentityServiceServiceAccountConfig: Schema.Schema<IdentityServiceServiceAccountConfig> = Schema.suspend(() => Schema.Struct({
  simpleBindCredentials: Schema.optional(IdentityServiceSimpleBindCredentials),
})).annotate({ identifier: "IdentityServiceServiceAccountConfig" }) as any as Schema.Schema<IdentityServiceServiceAccountConfig>;

export interface IdentityServiceLdapConfig {
  /** Required. Server settings for the external LDAP server. */
  server?: IdentityServiceServerConfig;
  /** Required. Defines where users exist in the LDAP directory. */
  user?: IdentityServiceUserConfig;
  /** Optional. Contains the properties for locating and authenticating groups in the directory. */
  group?: IdentityServiceGroupConfig;
  /** Required. Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate. */
  serviceAccount?: IdentityServiceServiceAccountConfig;
}

export const IdentityServiceLdapConfig: Schema.Schema<IdentityServiceLdapConfig> = Schema.suspend(() => Schema.Struct({
  server: Schema.optional(IdentityServiceServerConfig),
  user: Schema.optional(IdentityServiceUserConfig),
  group: Schema.optional(IdentityServiceGroupConfig),
  serviceAccount: Schema.optional(IdentityServiceServiceAccountConfig),
})).annotate({ identifier: "IdentityServiceLdapConfig" }) as any as Schema.Schema<IdentityServiceLdapConfig>;

export interface IdentityServiceAuthMethod {
  /** OIDC specific configuration. */
  oidcConfig?: IdentityServiceOidcConfig;
  /** AzureAD specific Configuration. */
  azureadConfig?: IdentityServiceAzureADConfig;
  /** GoogleConfig specific configuration */
  googleConfig?: IdentityServiceGoogleConfig;
  /** SAML specific configuration. */
  samlConfig?: IdentityServiceSamlConfig;
  /** LDAP specific configuration. */
  ldapConfig?: IdentityServiceLdapConfig;
  /** Identifier for auth config. */
  name?: string;
  /** Proxy server address to use for auth method. */
  proxy?: string;
}

export const IdentityServiceAuthMethod: Schema.Schema<IdentityServiceAuthMethod> = Schema.suspend(() => Schema.Struct({
  oidcConfig: Schema.optional(IdentityServiceOidcConfig),
  azureadConfig: Schema.optional(IdentityServiceAzureADConfig),
  googleConfig: Schema.optional(IdentityServiceGoogleConfig),
  samlConfig: Schema.optional(IdentityServiceSamlConfig),
  ldapConfig: Schema.optional(IdentityServiceLdapConfig),
  name: Schema.optional(Schema.String),
  proxy: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceAuthMethod" }) as any as Schema.Schema<IdentityServiceAuthMethod>;

export interface IdentityServiceDiagnosticInterface {
  /** Determines whether to enable the diagnostic interface. */
  enabled?: boolean;
  /** Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected. */
  expirationTime?: string;
}

export const IdentityServiceDiagnosticInterface: Schema.Schema<IdentityServiceDiagnosticInterface> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  expirationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityServiceDiagnosticInterface" }) as any as Schema.Schema<IdentityServiceDiagnosticInterface>;

export interface IdentityServiceIdentityServiceOptions {
  /** Determines the lifespan of STS tokens issued by Anthos Identity Service. */
  sessionDuration?: string;
  /** Configuration options for the AIS diagnostic interface. */
  diagnosticInterface?: IdentityServiceDiagnosticInterface;
}

export const IdentityServiceIdentityServiceOptions: Schema.Schema<IdentityServiceIdentityServiceOptions> = Schema.suspend(() => Schema.Struct({
  sessionDuration: Schema.optional(Schema.String),
  diagnosticInterface: Schema.optional(IdentityServiceDiagnosticInterface),
})).annotate({ identifier: "IdentityServiceIdentityServiceOptions" }) as any as Schema.Schema<IdentityServiceIdentityServiceOptions>;

export interface IdentityServiceSpec {
  /** A member may support multiple auth methods. */
  authMethods?: Array<IdentityServiceAuthMethod>;
  /** Optional. non-protocol-related configuration options. */
  identityServiceOptions?: IdentityServiceIdentityServiceOptions;
}

export const IdentityServiceSpec: Schema.Schema<IdentityServiceSpec> = Schema.suspend(() => Schema.Struct({
  authMethods: Schema.optional(Schema.Array(IdentityServiceAuthMethod)),
  identityServiceOptions: Schema.optional(IdentityServiceIdentityServiceOptions),
})).annotate({ identifier: "IdentityServiceSpec" }) as any as Schema.Schema<IdentityServiceSpec>;

export interface ServiceMeshSpec {
  /** Deprecated: use `management` instead Enables automatic control plane management. */
  controlPlane?: "CONTROL_PLANE_MANAGEMENT_UNSPECIFIED" | "AUTOMATIC" | "MANUAL" | (string & {});
  /** Determines which release channel to use for default injection and service mesh APIs. */
  defaultChannel?: "CHANNEL_UNSPECIFIED" | "RAPID" | "REGULAR" | "STABLE" | (string & {});
  /** Optional. Enables automatic Service Mesh management. */
  management?: "MANAGEMENT_UNSPECIFIED" | "MANAGEMENT_AUTOMATIC" | "MANAGEMENT_MANUAL" | "MANAGEMENT_NOT_INSTALLED" | (string & {});
  /** Optional. Specifies the API that will be used for configuring the mesh workloads. */
  configApi?: "CONFIG_API_UNSPECIFIED" | "CONFIG_API_ISTIO" | "CONFIG_API_GATEWAY" | (string & {});
}

export const ServiceMeshSpec: Schema.Schema<ServiceMeshSpec> = Schema.suspend(() => Schema.Struct({
  controlPlane: Schema.optional(Schema.String),
  defaultChannel: Schema.optional(Schema.String),
  management: Schema.optional(Schema.String),
  configApi: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceMeshSpec" }) as any as Schema.Schema<ServiceMeshSpec>;

export interface ConfigManagementGitConfig {
  /** Required. The URL of the Git repository to use as the source of truth. */
  syncRepo?: string;
  /** Optional. The branch of the repository to sync from. Default: master. */
  syncBranch?: string;
  /** Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository. */
  policyDir?: string;
  /** Optional. Period in seconds between consecutive syncs. Default: 15. */
  syncWaitSecs?: string;
  /** Optional. Git revision (tag or hash) to check out. Default HEAD. */
  syncRev?: string;
  /** Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive. */
  secretType?: string;
  /** Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Only specify when secret_type is `cookiefile`, `token`, or `none`. */
  httpsProxy?: string;
  /** Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`. */
  gcpServiceAccountEmail?: string;
}

export const ConfigManagementGitConfig: Schema.Schema<ConfigManagementGitConfig> = Schema.suspend(() => Schema.Struct({
  syncRepo: Schema.optional(Schema.String),
  syncBranch: Schema.optional(Schema.String),
  policyDir: Schema.optional(Schema.String),
  syncWaitSecs: Schema.optional(Schema.String),
  syncRev: Schema.optional(Schema.String),
  secretType: Schema.optional(Schema.String),
  httpsProxy: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementGitConfig" }) as any as Schema.Schema<ConfigManagementGitConfig>;

export interface ConfigManagementOciConfig {
  /** Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`. */
  syncRepo?: string;
  /** Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image. */
  policyDir?: string;
  /** Optional. Period in seconds between consecutive syncs. Default: 15. */
  syncWaitSecs?: string;
  /** Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive. */
  secretType?: string;
  /** Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`. */
  gcpServiceAccountEmail?: string;
}

export const ConfigManagementOciConfig: Schema.Schema<ConfigManagementOciConfig> = Schema.suspend(() => Schema.Struct({
  syncRepo: Schema.optional(Schema.String),
  policyDir: Schema.optional(Schema.String),
  syncWaitSecs: Schema.optional(Schema.String),
  secretType: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementOciConfig" }) as any as Schema.Schema<ConfigManagementOciConfig>;

export interface ConfigManagementContainerOverride {
  /** Required. The name of the container. */
  containerName?: string;
  /** Optional. The cpu request of the container. Use the following CPU resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu. */
  cpuRequest?: string;
  /** Optional. The cpu limit of the container. Use the following CPU resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu. */
  cpuLimit?: string;
  /** Optional. The memory request of the container. Use the following memory resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory. */
  memoryRequest?: string;
  /** Optional. The memory limit of the container. Use the following memory resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory. */
  memoryLimit?: string;
}

export const ConfigManagementContainerOverride: Schema.Schema<ConfigManagementContainerOverride> = Schema.suspend(() => Schema.Struct({
  containerName: Schema.optional(Schema.String),
  cpuRequest: Schema.optional(Schema.String),
  cpuLimit: Schema.optional(Schema.String),
  memoryRequest: Schema.optional(Schema.String),
  memoryLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementContainerOverride" }) as any as Schema.Schema<ConfigManagementContainerOverride>;

export interface ConfigManagementDeploymentOverride {
  /** Required. The name of the deployment resource to be overridden. */
  deploymentName?: string;
  /** Required. The namespace of the deployment resource to be overridden. */
  deploymentNamespace?: string;
  /** Optional. The containers of the deployment resource to be overridden. */
  containers?: Array<ConfigManagementContainerOverride>;
}

export const ConfigManagementDeploymentOverride: Schema.Schema<ConfigManagementDeploymentOverride> = Schema.suspend(() => Schema.Struct({
  deploymentName: Schema.optional(Schema.String),
  deploymentNamespace: Schema.optional(Schema.String),
  containers: Schema.optional(Schema.Array(ConfigManagementContainerOverride)),
})).annotate({ identifier: "ConfigManagementDeploymentOverride" }) as any as Schema.Schema<ConfigManagementDeploymentOverride>;

export interface ConfigManagementConfigSync {
  /** Optional. Git repo configuration for the cluster. */
  git?: ConfigManagementGitConfig;
  /** Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation. */
  sourceFormat?: string;
  /** Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present. */
  enabled?: boolean;
  /** Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details. */
  preventDrift?: boolean;
  /** Optional. OCI repo configuration for the cluster. */
  oci?: ConfigManagementOciConfig;
  /** Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring. */
  metricsGcpServiceAccountEmail?: string;
  /** Optional. Set to true to stop syncing configs for a single cluster. Default to false. */
  stopSyncing?: boolean;
  /** Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead. */
  deploymentOverrides?: Array<ConfigManagementDeploymentOverride>;
}

export const ConfigManagementConfigSync: Schema.Schema<ConfigManagementConfigSync> = Schema.suspend(() => Schema.Struct({
  git: Schema.optional(ConfigManagementGitConfig),
  sourceFormat: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  preventDrift: Schema.optional(Schema.Boolean),
  oci: Schema.optional(ConfigManagementOciConfig),
  metricsGcpServiceAccountEmail: Schema.optional(Schema.String),
  stopSyncing: Schema.optional(Schema.Boolean),
  deploymentOverrides: Schema.optional(Schema.Array(ConfigManagementDeploymentOverride)),
})).annotate({ identifier: "ConfigManagementConfigSync" }) as any as Schema.Schema<ConfigManagementConfigSync>;

export interface ConfigManagementPolicyControllerMonitoring {
  /** Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export. */
  backends?: Array<"MONITORING_BACKEND_UNSPECIFIED" | "PROMETHEUS" | "CLOUD_MONITORING" | (string & {})>;
}

export const ConfigManagementPolicyControllerMonitoring: Schema.Schema<ConfigManagementPolicyControllerMonitoring> = Schema.suspend(() => Schema.Struct({
  backends: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ConfigManagementPolicyControllerMonitoring" }) as any as Schema.Schema<ConfigManagementPolicyControllerMonitoring>;

export interface ConfigManagementPolicyController {
  /** Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect. */
  enabled?: boolean;
  /** Installs the default template library along with Policy Controller. */
  templateLibraryInstalled?: boolean;
  /** Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether. */
  auditIntervalSeconds?: string;
  /** The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster. */
  exemptableNamespaces?: Array<string>;
  /** Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated. */
  referentialRulesEnabled?: boolean;
  /** Logs all denies and dry run failures. */
  logDeniesEnabled?: boolean;
  /** Enable or disable mutation in policy controller. If true, mutation CRDs, webhook and controller deployment will be deployed to the cluster. */
  mutationEnabled?: boolean;
  /** Monitoring specifies the configuration of monitoring. */
  monitoring?: ConfigManagementPolicyControllerMonitoring;
  /** Output only. Last time this membership spec was updated. */
  updateTime?: string;
}

export const ConfigManagementPolicyController: Schema.Schema<ConfigManagementPolicyController> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  templateLibraryInstalled: Schema.optional(Schema.Boolean),
  auditIntervalSeconds: Schema.optional(Schema.String),
  exemptableNamespaces: Schema.optional(Schema.Array(Schema.String)),
  referentialRulesEnabled: Schema.optional(Schema.Boolean),
  logDeniesEnabled: Schema.optional(Schema.Boolean),
  mutationEnabled: Schema.optional(Schema.Boolean),
  monitoring: Schema.optional(ConfigManagementPolicyControllerMonitoring),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementPolicyController" }) as any as Schema.Schema<ConfigManagementPolicyController>;

export interface ConfigManagementBinauthzConfig {
  /** Whether binauthz is enabled in this cluster. */
  enabled?: boolean;
}

export const ConfigManagementBinauthzConfig: Schema.Schema<ConfigManagementBinauthzConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConfigManagementBinauthzConfig" }) as any as Schema.Schema<ConfigManagementBinauthzConfig>;

export interface ConfigManagementHierarchyControllerConfig {
  /** Whether Hierarchy Controller is enabled in this cluster. */
  enabled?: boolean;
  /** Whether pod tree labels are enabled in this cluster. */
  enablePodTreeLabels?: boolean;
  /** Whether hierarchical resource quota is enabled in this cluster. */
  enableHierarchicalResourceQuota?: boolean;
}

export const ConfigManagementHierarchyControllerConfig: Schema.Schema<ConfigManagementHierarchyControllerConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  enablePodTreeLabels: Schema.optional(Schema.Boolean),
  enableHierarchicalResourceQuota: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConfigManagementHierarchyControllerConfig" }) as any as Schema.Schema<ConfigManagementHierarchyControllerConfig>;

export interface ConfigManagementSpec {
  /** Optional. Config Sync configuration for the cluster. */
  configSync?: ConfigManagementConfigSync;
  /** Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead. */
  policyController?: ConfigManagementPolicyController;
  /** Optional. Deprecated: Binauthz configuration will be ignored and should not be set. */
  binauthz?: ConfigManagementBinauthzConfig;
  /** Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead. */
  hierarchyController?: ConfigManagementHierarchyControllerConfig;
  /** Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy. */
  version?: string;
  /** Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector. */
  cluster?: string;
  /** Optional. Deprecated: From version 1.21.0, automatic Feature management is unavailable, and Config Sync only supports manual upgrades. */
  management?: "MANAGEMENT_UNSPECIFIED" | "MANAGEMENT_AUTOMATIC" | "MANAGEMENT_MANUAL" | (string & {});
}

export const ConfigManagementSpec: Schema.Schema<ConfigManagementSpec> = Schema.suspend(() => Schema.Struct({
  configSync: Schema.optional(ConfigManagementConfigSync),
  policyController: Schema.optional(ConfigManagementPolicyController),
  binauthz: Schema.optional(ConfigManagementBinauthzConfig),
  hierarchyController: Schema.optional(ConfigManagementHierarchyControllerConfig),
  version: Schema.optional(Schema.String),
  cluster: Schema.optional(Schema.String),
  management: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementSpec" }) as any as Schema.Schema<ConfigManagementSpec>;

export interface Origin {
  /** Type specifies which type of origin is set. */
  type?: "TYPE_UNSPECIFIED" | "FLEET" | "FLEET_OUT_OF_SYNC" | "USER" | (string & {});
}

export const Origin: Schema.Schema<Origin> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Origin" }) as any as Schema.Schema<Origin>;

export interface FeatureSpec {
  /** Workloadcertificate-specific FeatureSpec. */
  workloadcertificate?: WorkloadCertificateSpec;
  /** Cloudbuild-specific FeatureSpec. */
  cloudbuild?: CloudBuildSpec;
  /** Policycontroller-specific FeatureSpec. */
  policycontroller?: PolicyControllerSpec;
  /** Rbacrolebindingactuation-specific FeatureSpec. */
  rbacrolebindingactuation?: RBACRoleBindingActuationSpec;
  /** IdentityService FeatureSpec. */
  identityservice?: IdentityServiceSpec;
  /** ServiceMesh Feature Spec. */
  servicemesh?: ServiceMeshSpec;
  /** Config Management FeatureSpec. */
  configmanagement?: ConfigManagementSpec;
  /** Whether this per-Feature spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Feature config (updated to USER implicitly) or setting to FLEET explicitly. */
  origin?: Origin;
}

export const FeatureSpec: Schema.Schema<FeatureSpec> = Schema.suspend(() => Schema.Struct({
  workloadcertificate: Schema.optional(WorkloadCertificateSpec),
  cloudbuild: Schema.optional(CloudBuildSpec),
  policycontroller: Schema.optional(PolicyControllerSpec),
  rbacrolebindingactuation: Schema.optional(RBACRoleBindingActuationSpec),
  identityservice: Schema.optional(IdentityServiceSpec),
  servicemesh: Schema.optional(ServiceMeshSpec),
  configmanagement: Schema.optional(ConfigManagementSpec),
  origin: Schema.optional(Origin),
})).annotate({ identifier: "FeatureSpec" }) as any as Schema.Schema<FeatureSpec>;

export interface ClusterUpgradeIgnoredMembership {
  /** Reason why the membership is ignored. */
  reason?: string;
  /** Time when the membership was first set to ignored. */
  ignoredTime?: string;
}

export const ClusterUpgradeIgnoredMembership: Schema.Schema<ClusterUpgradeIgnoredMembership> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  ignoredTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterUpgradeIgnoredMembership" }) as any as Schema.Schema<ClusterUpgradeIgnoredMembership>;

export interface ClusterUpgradeGKEUpgrade {
  /** Name of the upgrade, e.g., "k8s_control_plane". */
  name?: string;
  /** Version of the upgrade, e.g., "1.22.1-gke.100". */
  version?: string;
}

export const ClusterUpgradeGKEUpgrade: Schema.Schema<ClusterUpgradeGKEUpgrade> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterUpgradeGKEUpgrade" }) as any as Schema.Schema<ClusterUpgradeGKEUpgrade>;

export interface ClusterUpgradeUpgradeStatus {
  /** Status code of the upgrade. */
  code?: "CODE_UNSPECIFIED" | "INELIGIBLE" | "PENDING" | "IN_PROGRESS" | "SOAKING" | "FORCED_SOAKING" | "COMPLETE" | (string & {});
  /** Reason for this status. */
  reason?: string;
  /** Last timestamp the status was updated. */
  updateTime?: string;
}

export const ClusterUpgradeUpgradeStatus: Schema.Schema<ClusterUpgradeUpgradeStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterUpgradeUpgradeStatus" }) as any as Schema.Schema<ClusterUpgradeUpgradeStatus>;

export interface ClusterUpgradeMembershipGKEUpgradeState {
  /** Which upgrade to track the state. */
  upgrade?: ClusterUpgradeGKEUpgrade;
  /** Status of the upgrade. */
  status?: ClusterUpgradeUpgradeStatus;
}

export const ClusterUpgradeMembershipGKEUpgradeState: Schema.Schema<ClusterUpgradeMembershipGKEUpgradeState> = Schema.suspend(() => Schema.Struct({
  upgrade: Schema.optional(ClusterUpgradeGKEUpgrade),
  status: Schema.optional(ClusterUpgradeUpgradeStatus),
})).annotate({ identifier: "ClusterUpgradeMembershipGKEUpgradeState" }) as any as Schema.Schema<ClusterUpgradeMembershipGKEUpgradeState>;

export interface ClusterUpgradeState {
  /** Whether this membership is ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. */
  ignored?: ClusterUpgradeIgnoredMembership;
  /** Actual upgrade state against desired. */
  upgrades?: Array<ClusterUpgradeMembershipGKEUpgradeState>;
}

export const ClusterUpgradeState: Schema.Schema<ClusterUpgradeState> = Schema.suspend(() => Schema.Struct({
  ignored: Schema.optional(ClusterUpgradeIgnoredMembership),
  upgrades: Schema.optional(Schema.Array(ClusterUpgradeMembershipGKEUpgradeState)),
})).annotate({ identifier: "ClusterUpgradeState" }) as any as Schema.Schema<ClusterUpgradeState>;

export interface IdentityServiceState {
  /** Installed AIS version. This is the AIS version installed on this member. The values makes sense iff state is OK. */
  installedVersion?: string;
  /** Deployment state on this member */
  state?: "DEPLOYMENT_STATE_UNSPECIFIED" | "OK" | "ERROR" | (string & {});
  /** The reason of the failure. */
  failureReason?: string;
  /** Last reconciled membership configuration */
  memberConfig?: IdentityServiceSpec;
}

export const IdentityServiceState: Schema.Schema<IdentityServiceState> = Schema.suspend(() => Schema.Struct({
  installedVersion: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  memberConfig: Schema.optional(IdentityServiceSpec),
})).annotate({ identifier: "IdentityServiceState" }) as any as Schema.Schema<IdentityServiceState>;

export interface ServiceMeshType {
  /** A human-readable name for the message type. e.g. "InternalError", "PodMissingProxy". This should be the same for all messages of the same type. (This corresponds to the `name` field in open-source Istio.) */
  displayName?: string;
  /** A 7 character code matching `^IST[0-9]{4}$` or `^ASM[0-9]{4}$`, intended to uniquely identify the message type. (e.g. "IST0001" is mapped to the "InternalError" message type.) */
  code?: string;
}

export const ServiceMeshType: Schema.Schema<ServiceMeshType> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceMeshType" }) as any as Schema.Schema<ServiceMeshType>;

export interface ServiceMeshAnalysisMessageBase {
  /** Represents the specific type of a message. */
  type?: ServiceMeshType;
  /** Represents how severe a message is. */
  level?: "LEVEL_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** A url pointing to the Service Mesh or Istio documentation for this specific error type. */
  documentationUrl?: string;
}

export const ServiceMeshAnalysisMessageBase: Schema.Schema<ServiceMeshAnalysisMessageBase> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(ServiceMeshType),
  level: Schema.optional(Schema.String),
  documentationUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceMeshAnalysisMessageBase" }) as any as Schema.Schema<ServiceMeshAnalysisMessageBase>;

export interface ServiceMeshAnalysisMessage {
  /** Details common to all types of Istio and ServiceMesh analysis messages. */
  messageBase?: ServiceMeshAnalysisMessageBase;
  /** A human readable description of what the error means. It is suitable for non-internationalize display purposes. */
  description?: string;
  /** A list of strings specifying the resource identifiers that were the cause of message generation. A "path" here may be: * MEMBERSHIP_ID if the cause is a specific member cluster * MEMBERSHIP_ID/(NAMESPACE\/)?RESOURCETYPE/NAME if the cause is a resource in a cluster */
  resourcePaths?: Array<string>;
  /** A UI can combine these args with a template (based on message_base.type) to produce an internationalized message. */
  args?: Record<string, unknown>;
}

export const ServiceMeshAnalysisMessage: Schema.Schema<ServiceMeshAnalysisMessage> = Schema.suspend(() => Schema.Struct({
  messageBase: Schema.optional(ServiceMeshAnalysisMessageBase),
  description: Schema.optional(Schema.String),
  resourcePaths: Schema.optional(Schema.Array(Schema.String)),
  args: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ServiceMeshAnalysisMessage" }) as any as Schema.Schema<ServiceMeshAnalysisMessage>;

export interface ServiceMeshStatusDetails {
  /** A machine-readable code that further describes a broad status. */
  code?: string;
  /** Human-readable explanation of code. */
  details?: string;
}

export const ServiceMeshStatusDetails: Schema.Schema<ServiceMeshStatusDetails> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceMeshStatusDetails" }) as any as Schema.Schema<ServiceMeshStatusDetails>;

export interface ServiceMeshControlPlaneManagement {
  /** Explanation of state. */
  details?: Array<ServiceMeshStatusDetails>;
  /** LifecycleState of control plane management. */
  state?: "LIFECYCLE_STATE_UNSPECIFIED" | "DISABLED" | "FAILED_PRECONDITION" | "PROVISIONING" | "ACTIVE" | "STALLED" | "NEEDS_ATTENTION" | "DEGRADED" | "DEPROVISIONING" | (string & {});
  /** Output only. Implementation of managed control plane. */
  implementation?: "IMPLEMENTATION_UNSPECIFIED" | "ISTIOD" | "TRAFFIC_DIRECTOR" | "UPDATING" | (string & {});
}

export const ServiceMeshControlPlaneManagement: Schema.Schema<ServiceMeshControlPlaneManagement> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(ServiceMeshStatusDetails)),
  state: Schema.optional(Schema.String),
  implementation: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceMeshControlPlaneManagement" }) as any as Schema.Schema<ServiceMeshControlPlaneManagement>;

export interface ServiceMeshDataPlaneManagement {
  /** Lifecycle status of data plane management. */
  state?: "LIFECYCLE_STATE_UNSPECIFIED" | "DISABLED" | "FAILED_PRECONDITION" | "PROVISIONING" | "ACTIVE" | "STALLED" | "NEEDS_ATTENTION" | "DEGRADED" | "DEPROVISIONING" | (string & {});
  /** Explanation of the status. */
  details?: Array<ServiceMeshStatusDetails>;
}

export const ServiceMeshDataPlaneManagement: Schema.Schema<ServiceMeshDataPlaneManagement> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(ServiceMeshStatusDetails)),
})).annotate({ identifier: "ServiceMeshDataPlaneManagement" }) as any as Schema.Schema<ServiceMeshDataPlaneManagement>;

export interface ServiceMeshCondition {
  /** Unique identifier of the condition which describes the condition recognizable to the user. */
  code?: "CODE_UNSPECIFIED" | "MESH_IAM_PERMISSION_DENIED" | "MESH_IAM_CROSS_PROJECT_PERMISSION_DENIED" | "CNI_CONFIG_UNSUPPORTED" | "GKE_SANDBOX_UNSUPPORTED" | "NODEPOOL_WORKLOAD_IDENTITY_FEDERATION_REQUIRED" | "CNI_INSTALLATION_FAILED" | "CNI_POD_UNSCHEDULABLE" | "CLUSTER_HAS_ZERO_NODES" | "CANONICAL_SERVICE_ERROR" | "UNSUPPORTED_MULTIPLE_CONTROL_PLANES" | "VPCSC_GA_SUPPORTED" | "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT" | "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT_SAFE" | "CONFIG_APPLY_INTERNAL_ERROR" | "CONFIG_VALIDATION_ERROR" | "CONFIG_VALIDATION_WARNING" | "QUOTA_EXCEEDED_BACKEND_SERVICES" | "QUOTA_EXCEEDED_HEALTH_CHECKS" | "QUOTA_EXCEEDED_HTTP_ROUTES" | "QUOTA_EXCEEDED_TCP_ROUTES" | "QUOTA_EXCEEDED_TLS_ROUTES" | "QUOTA_EXCEEDED_TRAFFIC_POLICIES" | "QUOTA_EXCEEDED_ENDPOINT_POLICIES" | "QUOTA_EXCEEDED_GATEWAYS" | "QUOTA_EXCEEDED_MESHES" | "QUOTA_EXCEEDED_SERVER_TLS_POLICIES" | "QUOTA_EXCEEDED_CLIENT_TLS_POLICIES" | "QUOTA_EXCEEDED_SERVICE_LB_POLICIES" | "QUOTA_EXCEEDED_HTTP_FILTERS" | "QUOTA_EXCEEDED_TCP_FILTERS" | "QUOTA_EXCEEDED_NETWORK_ENDPOINT_GROUPS" | "LEGACY_MC_SECRETS" | "WORKLOAD_IDENTITY_REQUIRED" | "NON_STANDARD_BINARY_USAGE" | "UNSUPPORTED_GATEWAY_CLASS" | "MANAGED_CNI_NOT_ENABLED" | "MODERNIZATION_SCHEDULED" | "MODERNIZATION_IN_PROGRESS" | "MODERNIZATION_COMPLETED" | "MODERNIZATION_ABORTED" | "MODERNIZATION_PREPARING" | "MODERNIZATION_STALLED" | "MODERNIZATION_PREPARED" | "MODERNIZATION_MIGRATING_WORKLOADS" | "MODERNIZATION_ROLLING_BACK_CLUSTER" | "MODERNIZATION_WILL_BE_SCHEDULED" | "MODERNIZATION_MANUAL" | "MODERNIZATION_ELIGIBLE" | "MODERNIZATION_MODERNIZING" | "MODERNIZATION_MODERNIZED_SOAKING" | "MODERNIZATION_FINALIZED" | "MODERNIZATION_ROLLING_BACK_FLEET" | (string & {});
  /** Links contains actionable information. */
  documentationLink?: string;
  /** A short summary about the issue. */
  details?: string;
  /** Severity level of the condition. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
}

export const ServiceMeshCondition: Schema.Schema<ServiceMeshCondition> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  documentationLink: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceMeshCondition" }) as any as Schema.Schema<ServiceMeshCondition>;

export interface ServiceMeshState {
  /** Output only. Results of running Service Mesh analyzers. */
  analysisMessages?: Array<ServiceMeshAnalysisMessage>;
  /** Output only. Status of control plane management */
  controlPlaneManagement?: ServiceMeshControlPlaneManagement;
  /** Output only. Status of data plane management. */
  dataPlaneManagement?: ServiceMeshDataPlaneManagement;
  /** The API version (i.e. Istio CRD version) for configuring service mesh in this cluster. This version is influenced by the `default_channel` field. */
  configApiVersion?: string;
  /** Output only. List of conditions reported for this membership. */
  conditions?: Array<ServiceMeshCondition>;
}

export const ServiceMeshState: Schema.Schema<ServiceMeshState> = Schema.suspend(() => Schema.Struct({
  analysisMessages: Schema.optional(Schema.Array(ServiceMeshAnalysisMessage)),
  controlPlaneManagement: Schema.optional(ServiceMeshControlPlaneManagement),
  dataPlaneManagement: Schema.optional(ServiceMeshDataPlaneManagement),
  configApiVersion: Schema.optional(Schema.String),
  conditions: Schema.optional(Schema.Array(ServiceMeshCondition)),
})).annotate({ identifier: "ServiceMeshState" }) as any as Schema.Schema<ServiceMeshState>;

export interface MeteringState {
  /** The time stamp of the most recent measurement of the number of vCPUs in the cluster. */
  lastMeasurementTime?: string;
  /** The vCPUs capacity in the cluster according to the most recent measurement (1/1000 precision). */
  preciseLastMeasuredClusterVcpuCapacity?: number;
}

export const MeteringState: Schema.Schema<MeteringState> = Schema.suspend(() => Schema.Struct({
  lastMeasurementTime: Schema.optional(Schema.String),
  preciseLastMeasuredClusterVcpuCapacity: Schema.optional(Schema.Number),
})).annotate({ identifier: "MeteringState" }) as any as Schema.Schema<MeteringState>;

export interface ConfigManagementInstallError {
  /** A string representing the user facing error message. */
  errorMessage?: string;
}

export const ConfigManagementInstallError: Schema.Schema<ConfigManagementInstallError> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementInstallError" }) as any as Schema.Schema<ConfigManagementInstallError>;

export interface ConfigManagementOperatorState {
  /** The semenatic version number of the operator. */
  version?: string;
  /** The state of the Operator's deployment. */
  deploymentState?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Install errors. */
  errors?: Array<ConfigManagementInstallError>;
}

export const ConfigManagementOperatorState: Schema.Schema<ConfigManagementOperatorState> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  deploymentState: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(ConfigManagementInstallError)),
})).annotate({ identifier: "ConfigManagementOperatorState" }) as any as Schema.Schema<ConfigManagementOperatorState>;

export interface ConfigManagementConfigSyncVersion {
  /** Version of the deployed importer pod. */
  importer?: string;
  /** Version of the deployed syncer pod. */
  syncer?: string;
  /** Version of the deployed git-sync pod. */
  gitSync?: string;
  /** Version of the deployed monitor pod. */
  monitor?: string;
  /** Version of the deployed reconciler-manager pod. */
  reconcilerManager?: string;
  /** Version of the deployed reconciler container in root-reconciler pod. */
  rootReconciler?: string;
  /** Version of the deployed admission-webhook pod. */
  admissionWebhook?: string;
  /** Version of the deployed resource-group-controller-manager pod */
  resourceGroupControllerManager?: string;
  /** Version of the deployed otel-collector pod */
  otelCollector?: string;
}

export const ConfigManagementConfigSyncVersion: Schema.Schema<ConfigManagementConfigSyncVersion> = Schema.suspend(() => Schema.Struct({
  importer: Schema.optional(Schema.String),
  syncer: Schema.optional(Schema.String),
  gitSync: Schema.optional(Schema.String),
  monitor: Schema.optional(Schema.String),
  reconcilerManager: Schema.optional(Schema.String),
  rootReconciler: Schema.optional(Schema.String),
  admissionWebhook: Schema.optional(Schema.String),
  resourceGroupControllerManager: Schema.optional(Schema.String),
  otelCollector: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementConfigSyncVersion" }) as any as Schema.Schema<ConfigManagementConfigSyncVersion>;

export interface ConfigManagementConfigSyncDeploymentState {
  /** Deployment state of the importer pod. */
  importer?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of the syncer pod. */
  syncer?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of the git-sync pod. */
  gitSync?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of the monitor pod. */
  monitor?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of reconciler-manager pod. */
  reconcilerManager?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of root-reconciler. */
  rootReconciler?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of admission-webhook. */
  admissionWebhook?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of resource-group-controller-manager */
  resourceGroupControllerManager?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Deployment state of otel-collector */
  otelCollector?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
}

export const ConfigManagementConfigSyncDeploymentState: Schema.Schema<ConfigManagementConfigSyncDeploymentState> = Schema.suspend(() => Schema.Struct({
  importer: Schema.optional(Schema.String),
  syncer: Schema.optional(Schema.String),
  gitSync: Schema.optional(Schema.String),
  monitor: Schema.optional(Schema.String),
  reconcilerManager: Schema.optional(Schema.String),
  rootReconciler: Schema.optional(Schema.String),
  admissionWebhook: Schema.optional(Schema.String),
  resourceGroupControllerManager: Schema.optional(Schema.String),
  otelCollector: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementConfigSyncDeploymentState" }) as any as Schema.Schema<ConfigManagementConfigSyncDeploymentState>;

export interface ConfigManagementGroupVersionKind {
  /** Kubernetes Group */
  group?: string;
  /** Kubernetes Version */
  version?: string;
  /** Kubernetes Kind */
  kind?: string;
}

export const ConfigManagementGroupVersionKind: Schema.Schema<ConfigManagementGroupVersionKind> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementGroupVersionKind" }) as any as Schema.Schema<ConfigManagementGroupVersionKind>;

export interface ConfigManagementErrorResource {
  /** Path in the git repo of the erroneous config */
  sourcePath?: string;
  /** Metadata name of the resource that is causing an error */
  resourceName?: string;
  /** Namespace of the resource that is causing an error */
  resourceNamespace?: string;
  /** Group/version/kind of the resource that is causing an error */
  resourceGvk?: ConfigManagementGroupVersionKind;
}

export const ConfigManagementErrorResource: Schema.Schema<ConfigManagementErrorResource> = Schema.suspend(() => Schema.Struct({
  sourcePath: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  resourceNamespace: Schema.optional(Schema.String),
  resourceGvk: Schema.optional(ConfigManagementGroupVersionKind),
})).annotate({ identifier: "ConfigManagementErrorResource" }) as any as Schema.Schema<ConfigManagementErrorResource>;

export interface ConfigManagementSyncError {
  /** An ACM defined error code */
  code?: string;
  /** A description of the error */
  errorMessage?: string;
  /** A list of config(s) associated with the error, if any */
  errorResources?: Array<ConfigManagementErrorResource>;
}

export const ConfigManagementSyncError: Schema.Schema<ConfigManagementSyncError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  errorResources: Schema.optional(Schema.Array(ConfigManagementErrorResource)),
})).annotate({ identifier: "ConfigManagementSyncError" }) as any as Schema.Schema<ConfigManagementSyncError>;

export interface ConfigManagementSyncState {
  /** Token indicating the state of the repo. */
  sourceToken?: string;
  /** Token indicating the state of the importer. */
  importToken?: string;
  /** Token indicating the state of the syncer. */
  syncToken?: string;
  /** Deprecated: use last_sync_time instead. Timestamp of when ACM last successfully synced the repo. The time format is specified in https://golang.org/pkg/time/#Time.String */
  lastSync?: string;
  /** Timestamp type of when ACM last successfully synced the repo. */
  lastSyncTime?: string;
  /** Sync status code. */
  code?: "SYNC_CODE_UNSPECIFIED" | "SYNCED" | "PENDING" | "ERROR" | "NOT_CONFIGURED" | "NOT_INSTALLED" | "UNAUTHORIZED" | "UNREACHABLE" | (string & {});
  /** A list of errors resulting from problematic configs. This list will be truncated after 100 errors, although it is unlikely for that many errors to simultaneously exist. */
  errors?: Array<ConfigManagementSyncError>;
}

export const ConfigManagementSyncState: Schema.Schema<ConfigManagementSyncState> = Schema.suspend(() => Schema.Struct({
  sourceToken: Schema.optional(Schema.String),
  importToken: Schema.optional(Schema.String),
  syncToken: Schema.optional(Schema.String),
  lastSync: Schema.optional(Schema.String),
  lastSyncTime: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(ConfigManagementSyncError)),
})).annotate({ identifier: "ConfigManagementSyncState" }) as any as Schema.Schema<ConfigManagementSyncState>;

export interface ConfigManagementConfigSyncError {
  /** A string representing the user facing error message */
  errorMessage?: string;
}

export const ConfigManagementConfigSyncError: Schema.Schema<ConfigManagementConfigSyncError> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementConfigSyncError" }) as any as Schema.Schema<ConfigManagementConfigSyncError>;

export interface ConfigManagementConfigSyncState {
  /** Output only. The version of ConfigSync deployed. */
  version?: ConfigManagementConfigSyncVersion;
  /** Output only. Information about the deployment of ConfigSync, including the version. of the various Pods deployed */
  deploymentState?: ConfigManagementConfigSyncDeploymentState;
  /** Output only. The state of ConfigSync's process to sync configs to a cluster. */
  syncState?: ConfigManagementSyncState;
  /** Output only. Errors pertaining to the installation of Config Sync. */
  errors?: Array<ConfigManagementConfigSyncError>;
  /** Output only. The state of the RootSync CRD */
  rootsyncCrd?: "CRD_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "TERMINATING" | "INSTALLING" | (string & {});
  /** Output only. The state of the Reposync CRD */
  reposyncCrd?: "CRD_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "TERMINATING" | "INSTALLING" | (string & {});
  /** Output only. The state of CS This field summarizes the other fields in this message. */
  state?: "STATE_UNSPECIFIED" | "CONFIG_SYNC_NOT_INSTALLED" | "CONFIG_SYNC_INSTALLED" | "CONFIG_SYNC_ERROR" | "CONFIG_SYNC_PENDING" | (string & {});
  /** Output only. Whether syncing resources to the cluster is stopped at the cluster level. */
  clusterLevelStopSyncingState?: "STOP_SYNCING_STATE_UNSPECIFIED" | "NOT_STOPPED" | "PENDING" | "STOPPED" | (string & {});
  /** Output only. The number of RootSync and RepoSync CRs in the cluster. */
  crCount?: number;
}

export const ConfigManagementConfigSyncState: Schema.Schema<ConfigManagementConfigSyncState> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(ConfigManagementConfigSyncVersion),
  deploymentState: Schema.optional(ConfigManagementConfigSyncDeploymentState),
  syncState: Schema.optional(ConfigManagementSyncState),
  errors: Schema.optional(Schema.Array(ConfigManagementConfigSyncError)),
  rootsyncCrd: Schema.optional(Schema.String),
  reposyncCrd: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  clusterLevelStopSyncingState: Schema.optional(Schema.String),
  crCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "ConfigManagementConfigSyncState" }) as any as Schema.Schema<ConfigManagementConfigSyncState>;

export interface ConfigManagementPolicyControllerVersion {
  /** The gatekeeper image tag that is composed of ACM version, git tag, build number. */
  version?: string;
}

export const ConfigManagementPolicyControllerVersion: Schema.Schema<ConfigManagementPolicyControllerVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementPolicyControllerVersion" }) as any as Schema.Schema<ConfigManagementPolicyControllerVersion>;

export interface ConfigManagementGatekeeperDeploymentState {
  /** Status of gatekeeper-controller-manager pod. */
  gatekeeperControllerManagerState?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Status of gatekeeper-audit deployment. */
  gatekeeperAudit?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** Status of the pod serving the mutation webhook. */
  gatekeeperMutation?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
}

export const ConfigManagementGatekeeperDeploymentState: Schema.Schema<ConfigManagementGatekeeperDeploymentState> = Schema.suspend(() => Schema.Struct({
  gatekeeperControllerManagerState: Schema.optional(Schema.String),
  gatekeeperAudit: Schema.optional(Schema.String),
  gatekeeperMutation: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementGatekeeperDeploymentState" }) as any as Schema.Schema<ConfigManagementGatekeeperDeploymentState>;

export interface ConfigManagementPolicyControllerMigration {
  /** Stage of the migration. */
  stage?: "STAGE_UNSPECIFIED" | "ACM_MANAGED" | "POCO_MANAGED" | (string & {});
  /** Last time this membership spec was copied to PoCo feature. */
  copyTime?: string;
}

export const ConfigManagementPolicyControllerMigration: Schema.Schema<ConfigManagementPolicyControllerMigration> = Schema.suspend(() => Schema.Struct({
  stage: Schema.optional(Schema.String),
  copyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementPolicyControllerMigration" }) as any as Schema.Schema<ConfigManagementPolicyControllerMigration>;

export interface ConfigManagementPolicyControllerState {
  /** The version of Gatekeeper Policy Controller deployed. */
  version?: ConfigManagementPolicyControllerVersion;
  /** The state about the policy controller installation. */
  deploymentState?: ConfigManagementGatekeeperDeploymentState;
  /** Record state of ACM -> PoCo Hub migration for this feature. */
  migration?: ConfigManagementPolicyControllerMigration;
}

export const ConfigManagementPolicyControllerState: Schema.Schema<ConfigManagementPolicyControllerState> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(ConfigManagementPolicyControllerVersion),
  deploymentState: Schema.optional(ConfigManagementGatekeeperDeploymentState),
  migration: Schema.optional(ConfigManagementPolicyControllerMigration),
})).annotate({ identifier: "ConfigManagementPolicyControllerState" }) as any as Schema.Schema<ConfigManagementPolicyControllerState>;

export interface ConfigManagementBinauthzVersion {
  /** The version of the binauthz webhook. */
  webhookVersion?: string;
}

export const ConfigManagementBinauthzVersion: Schema.Schema<ConfigManagementBinauthzVersion> = Schema.suspend(() => Schema.Struct({
  webhookVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementBinauthzVersion" }) as any as Schema.Schema<ConfigManagementBinauthzVersion>;

export interface ConfigManagementBinauthzState {
  /** The state of the binauthz webhook. */
  webhook?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** The version of binauthz that is installed. */
  version?: ConfigManagementBinauthzVersion;
}

export const ConfigManagementBinauthzState: Schema.Schema<ConfigManagementBinauthzState> = Schema.suspend(() => Schema.Struct({
  webhook: Schema.optional(Schema.String),
  version: Schema.optional(ConfigManagementBinauthzVersion),
})).annotate({ identifier: "ConfigManagementBinauthzState" }) as any as Schema.Schema<ConfigManagementBinauthzState>;

export interface ConfigManagementHierarchyControllerVersion {
  /** Version for open source HNC. */
  hnc?: string;
  /** Version for Hierarchy Controller extension. */
  extension?: string;
}

export const ConfigManagementHierarchyControllerVersion: Schema.Schema<ConfigManagementHierarchyControllerVersion> = Schema.suspend(() => Schema.Struct({
  hnc: Schema.optional(Schema.String),
  extension: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementHierarchyControllerVersion" }) as any as Schema.Schema<ConfigManagementHierarchyControllerVersion>;

export interface ConfigManagementHierarchyControllerDeploymentState {
  /** The deployment state for open source HNC (e.g. v0.7.0-hc.0). */
  hnc?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
  /** The deployment state for Hierarchy Controller extension (e.g. v0.7.0-hc.1). */
  extension?: "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR" | "PENDING" | (string & {});
}

export const ConfigManagementHierarchyControllerDeploymentState: Schema.Schema<ConfigManagementHierarchyControllerDeploymentState> = Schema.suspend(() => Schema.Struct({
  hnc: Schema.optional(Schema.String),
  extension: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementHierarchyControllerDeploymentState" }) as any as Schema.Schema<ConfigManagementHierarchyControllerDeploymentState>;

export interface ConfigManagementHierarchyControllerState {
  /** The version for Hierarchy Controller. */
  version?: ConfigManagementHierarchyControllerVersion;
  /** The deployment state for Hierarchy Controller. */
  state?: ConfigManagementHierarchyControllerDeploymentState;
}

export const ConfigManagementHierarchyControllerState: Schema.Schema<ConfigManagementHierarchyControllerState> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(ConfigManagementHierarchyControllerVersion),
  state: Schema.optional(ConfigManagementHierarchyControllerDeploymentState),
})).annotate({ identifier: "ConfigManagementHierarchyControllerState" }) as any as Schema.Schema<ConfigManagementHierarchyControllerState>;

export interface ConfigManagementState {
  /** Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name. */
  clusterName?: string;
  /** Output only. Membership configuration in the cluster. This represents the actual state in the cluster, while the MembershipSpec in the FeatureSpec represents the intended state. */
  membershipSpec?: ConfigManagementSpec;
  /** Output only. Current install status of ACM's Operator. */
  operatorState?: ConfigManagementOperatorState;
  /** Output only. Current sync status. */
  configSyncState?: ConfigManagementConfigSyncState;
  /** Output only. PolicyController status. */
  policyControllerState?: ConfigManagementPolicyControllerState;
  /** Output only. Binauthz status. */
  binauthzState?: ConfigManagementBinauthzState;
  /** Output only. Hierarchy Controller status. */
  hierarchyControllerState?: ConfigManagementHierarchyControllerState;
  /** Output only. The Kubernetes API server version of the cluster. */
  kubernetesApiServerVersion?: string;
}

export const ConfigManagementState: Schema.Schema<ConfigManagementState> = Schema.suspend(() => Schema.Struct({
  clusterName: Schema.optional(Schema.String),
  membershipSpec: Schema.optional(ConfigManagementSpec),
  operatorState: Schema.optional(ConfigManagementOperatorState),
  configSyncState: Schema.optional(ConfigManagementConfigSyncState),
  policyControllerState: Schema.optional(ConfigManagementPolicyControllerState),
  binauthzState: Schema.optional(ConfigManagementBinauthzState),
  hierarchyControllerState: Schema.optional(ConfigManagementHierarchyControllerState),
  kubernetesApiServerVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigManagementState" }) as any as Schema.Schema<ConfigManagementState>;

export interface PolicyControllerOnClusterState {
  /** The lifecycle state of this component. */
  state?: "LIFECYCLE_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLING" | "ACTIVE" | "UPDATING" | "DECOMMISSIONING" | "CLUSTER_ERROR" | "HUB_ERROR" | "SUSPENDED" | "DETACHED" | (string & {});
  /** Surface potential errors or information logs. */
  details?: string;
}

export const PolicyControllerOnClusterState: Schema.Schema<PolicyControllerOnClusterState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyControllerOnClusterState" }) as any as Schema.Schema<PolicyControllerOnClusterState>;

export interface PolicyControllerPolicyContentState {
  /** The state of the template library */
  templateLibraryState?: PolicyControllerOnClusterState;
  /** The state of the any bundles included in the chosen version of the manifest */
  bundleStates?: Record<string, PolicyControllerOnClusterState>;
  /** The state of the referential data sync configuration. This could represent the state of either the syncSet object(s) or the config object, depending on the version of PoCo configured by the user. */
  referentialSyncConfigState?: PolicyControllerOnClusterState;
}

export const PolicyControllerPolicyContentState: Schema.Schema<PolicyControllerPolicyContentState> = Schema.suspend(() => Schema.Struct({
  templateLibraryState: Schema.optional(PolicyControllerOnClusterState),
  bundleStates: Schema.optional(Schema.Record(Schema.String, PolicyControllerOnClusterState)),
  referentialSyncConfigState: Schema.optional(PolicyControllerOnClusterState),
})).annotate({ identifier: "PolicyControllerPolicyContentState" }) as any as Schema.Schema<PolicyControllerPolicyContentState>;

export interface PolicyControllerState {
  /** Currently these include (also serving as map keys): 1. "admission" 2. "audit" 3. "mutation" */
  componentStates?: Record<string, PolicyControllerOnClusterState>;
  /** The overall Policy Controller lifecycle state observed by the Hub Feature controller. */
  state?: "LIFECYCLE_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLING" | "ACTIVE" | "UPDATING" | "DECOMMISSIONING" | "CLUSTER_ERROR" | "HUB_ERROR" | "SUSPENDED" | "DETACHED" | (string & {});
  /** The overall content state observed by the Hub Feature controller. */
  policyContentState?: PolicyControllerPolicyContentState;
}

export const PolicyControllerState: Schema.Schema<PolicyControllerState> = Schema.suspend(() => Schema.Struct({
  componentStates: Schema.optional(Schema.Record(Schema.String, PolicyControllerOnClusterState)),
  state: Schema.optional(Schema.String),
  policyContentState: Schema.optional(PolicyControllerPolicyContentState),
})).annotate({ identifier: "PolicyControllerState" }) as any as Schema.Schema<PolicyControllerState>;

export interface RBACRoleBindingActuationRBACRoleBindingState {
  /** Output only. The state of the RBACRoleBinding. */
  state?: "ROLE_BINDING_STATE_UNSPECIFIED" | "OK" | "CUSTOM_ROLE_MISSING_FROM_CLUSTER" | (string & {});
  /** The reason for the failure. */
  description?: string;
  /** The time the RBACRoleBinding status was last updated. */
  updateTime?: string;
}

export const RBACRoleBindingActuationRBACRoleBindingState: Schema.Schema<RBACRoleBindingActuationRBACRoleBindingState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RBACRoleBindingActuationRBACRoleBindingState" }) as any as Schema.Schema<RBACRoleBindingActuationRBACRoleBindingState>;

export interface RBACRoleBindingActuationState {
  /** Output only. The state of RBACRoleBindings using custom roles that exist on the cluster, keyed by RBACRoleBinding resource name with format: projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}. */
  rbacrolebindingStates?: Record<string, RBACRoleBindingActuationRBACRoleBindingState>;
}

export const RBACRoleBindingActuationState: Schema.Schema<RBACRoleBindingActuationState> = Schema.suspend(() => Schema.Struct({
  rbacrolebindingStates: Schema.optional(Schema.Record(Schema.String, RBACRoleBindingActuationRBACRoleBindingState)),
})).annotate({ identifier: "RBACRoleBindingActuationState" }) as any as Schema.Schema<RBACRoleBindingActuationState>;

export interface AppDevExperienceStatus {
  /** Code specifies AppDevExperienceFeature's subcomponent ready state. */
  code?: "CODE_UNSPECIFIED" | "OK" | "FAILED" | "UNKNOWN" | (string & {});
  /** Description is populated if Code is Failed, explaining why it has failed. */
  description?: string;
}

export const AppDevExperienceStatus: Schema.Schema<AppDevExperienceStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "AppDevExperienceStatus" }) as any as Schema.Schema<AppDevExperienceStatus>;

export interface AppDevExperienceState {
  /** Status of subcomponent that detects configured Service Mesh resources. */
  networkingInstallSucceeded?: AppDevExperienceStatus;
}

export const AppDevExperienceState: Schema.Schema<AppDevExperienceState> = Schema.suspend(() => Schema.Struct({
  networkingInstallSucceeded: Schema.optional(AppDevExperienceStatus),
})).annotate({ identifier: "AppDevExperienceState" }) as any as Schema.Schema<AppDevExperienceState>;

export interface WorkloadIdentityIdentityProviderStateDetail {
  /** The state of the Identity Provider. */
  code?: "IDENTITY_PROVIDER_STATE_UNSPECIFIED" | "IDENTITY_PROVIDER_STATE_OK" | "IDENTITY_PROVIDER_STATE_ERROR" | (string & {});
  /** A human-readable description of the current state or returned error. */
  description?: string;
}

export const WorkloadIdentityIdentityProviderStateDetail: Schema.Schema<WorkloadIdentityIdentityProviderStateDetail> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadIdentityIdentityProviderStateDetail" }) as any as Schema.Schema<WorkloadIdentityIdentityProviderStateDetail>;

export interface WorkloadIdentityState {
  /** Deprecated, this field will be erased after code is changed to use the new field. */
  description?: string;
  /** The state of the Identity Providers corresponding to the membership. */
  identityProviderStateDetails?: Record<string, WorkloadIdentityIdentityProviderStateDetail>;
}

export const WorkloadIdentityState: Schema.Schema<WorkloadIdentityState> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  identityProviderStateDetails: Schema.optional(Schema.Record(Schema.String, WorkloadIdentityIdentityProviderStateDetail)),
})).annotate({ identifier: "WorkloadIdentityState" }) as any as Schema.Schema<WorkloadIdentityState>;

export interface State {
  /** The high-level, machine-readable status of this MembershipFeature. */
  code?: "CODE_UNSPECIFIED" | "OK" | "WARNING" | "ERROR" | (string & {});
  /** A human-readable description of the current status. */
  description?: string;
  /** The time this status and any related Feature-specific details were updated. */
  updateTime?: string;
}

export const State: Schema.Schema<State> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "State" }) as any as Schema.Schema<State>;

export interface FeatureState {
  /** Cluster upgrade state. */
  clusterupgrade?: ClusterUpgradeState;
  /** Identity service state */
  identityservice?: IdentityServiceState;
  /** Service mesh state */
  servicemesh?: ServiceMeshState;
  /** Metering state */
  metering?: MeteringState;
  /** Config Management state */
  configmanagement?: ConfigManagementState;
  /** Policy Controller state */
  policycontroller?: PolicyControllerState;
  /** RBAC Role Binding Actuation state */
  rbacrolebindingactuation?: RBACRoleBindingActuationState;
  /** Appdevexperience specific state. */
  appdevexperience?: AppDevExperienceState;
  /** Workload Identity state */
  workloadidentity?: WorkloadIdentityState;
  /** The high-level state of this MembershipFeature. */
  state?: State;
}

export const FeatureState: Schema.Schema<FeatureState> = Schema.suspend(() => Schema.Struct({
  clusterupgrade: Schema.optional(ClusterUpgradeState),
  identityservice: Schema.optional(IdentityServiceState),
  servicemesh: Schema.optional(ServiceMeshState),
  metering: Schema.optional(MeteringState),
  configmanagement: Schema.optional(ConfigManagementState),
  policycontroller: Schema.optional(PolicyControllerState),
  rbacrolebindingactuation: Schema.optional(RBACRoleBindingActuationState),
  appdevexperience: Schema.optional(AppDevExperienceState),
  workloadidentity: Schema.optional(WorkloadIdentityState),
  state: Schema.optional(State),
})).annotate({ identifier: "FeatureState" }) as any as Schema.Schema<FeatureState>;

export interface LifecycleState {
  /** Output only. The current state of the Feature resource in the Hub API. */
  state?: "STATE_UNSPECIFIED" | "ENABLING" | "ACTIVE" | "DISABLING" | "UPDATING" | "SERVICE_UPDATING" | (string & {});
}

export const LifecycleState: Schema.Schema<LifecycleState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "LifecycleState" }) as any as Schema.Schema<LifecycleState>;

export interface MembershipFeature {
  /** Output only. The resource name of the membershipFeature, in the format: `projects/{project}/locations/{location}/memberships/{membership}/features/{feature}`. Note that `membershipFeatures` is shortened to `features` in the resource name. (see http://go/aip/122#collection-identifiers) */
  name?: string;
  /** GCP labels for this MembershipFeature. */
  labels?: Record<string, string>;
  /** Optional. Spec of this membershipFeature. */
  spec?: FeatureSpec;
  /** Output only. State of the this membershipFeature. */
  state?: FeatureState;
  /** Output only. Lifecycle information of the resource itself. */
  lifecycleState?: LifecycleState;
  /** Output only. When the MembershipFeature resource was created. */
  createTime?: string;
  /** Output only. When the MembershipFeature resource was last updated. */
  updateTime?: string;
  /** Output only. When the MembershipFeature resource was deleted. */
  deleteTime?: string;
}

export const MembershipFeature: Schema.Schema<MembershipFeature> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  spec: Schema.optional(FeatureSpec),
  state: Schema.optional(FeatureState),
  lifecycleState: Schema.optional(LifecycleState),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
})).annotate({ identifier: "MembershipFeature" }) as any as Schema.Schema<MembershipFeature>;

export interface ListMembershipFeaturesResponse {
  /** The list of matching MembershipFeatures. */
  membershipFeatures?: Array<MembershipFeature>;
  /** A token to request the next page of resources from the `ListMembershipFeatures` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** List of locations that could not be reached while fetching this list. */
  unreachable?: Array<string>;
}

export const ListMembershipFeaturesResponse: Schema.Schema<ListMembershipFeaturesResponse> = Schema.suspend(() => Schema.Struct({
  membershipFeatures: Schema.optional(Schema.Array(MembershipFeature)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListMembershipFeaturesResponse" }) as any as Schema.Schema<ListMembershipFeaturesResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** ========= MembershipFeature Services ========= Gets details of a membershipFeature. */
export interface GetProjectsLocationsMembershipsFeaturesRequest {
  /** Required. The MembershipFeature resource name in the format `projects/* /locations/* /memberships/* /features/*`. */
  name: string;
}

export const GetProjectsLocationsMembershipsFeaturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/features/{featuresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMembershipsFeaturesRequest>;

export type GetProjectsLocationsMembershipsFeaturesResponse = MembershipFeature;
export const GetProjectsLocationsMembershipsFeaturesResponse = MembershipFeature;

export type GetProjectsLocationsMembershipsFeaturesError = CommonErrors;

export const getProjectsLocationsMembershipsFeatures: API.OperationMethod<GetProjectsLocationsMembershipsFeaturesRequest, GetProjectsLocationsMembershipsFeaturesResponse, GetProjectsLocationsMembershipsFeaturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMembershipsFeaturesRequest,
  output: GetProjectsLocationsMembershipsFeaturesResponse,
  errors: [],
}));

/** Lists MembershipFeatures in a given project and location. */
export interface ListProjectsLocationsMembershipsFeaturesRequest {
  /** Required. The parent where the MembershipFeature will be listed. In the format: `projects/* /locations/* /memberships/*`. */
  parent: string;
  /** When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Token returned by previous call to `ListFeatures` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Lists MembershipFeatures that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Feature with the name "helloworld" in project "foo-proj" and membership "member-bar": name = "projects/foo-proj/locations/global/memberships/member-bar/features/helloworld" - Features that have a label called `foo`: labels.foo:* - Features that have a label called `foo` whose value is `bar`: labels.foo = bar */
  filter?: string;
  /** One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. */
  orderBy?: string;
}

export const ListProjectsLocationsMembershipsFeaturesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/features" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMembershipsFeaturesRequest>;

export type ListProjectsLocationsMembershipsFeaturesResponse = ListMembershipFeaturesResponse;
export const ListProjectsLocationsMembershipsFeaturesResponse = ListMembershipFeaturesResponse;

export type ListProjectsLocationsMembershipsFeaturesError = CommonErrors;

export const listProjectsLocationsMembershipsFeatures = API.makePaginated(() => ({
  input: ListProjectsLocationsMembershipsFeaturesRequest,
  output: ListProjectsLocationsMembershipsFeaturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates membershipFeature under a given parent. */
export interface CreateProjectsLocationsMembershipsFeaturesRequest {
  /** Required. The name of parent where the MembershipFeature will be created. Specified in the format `projects/* /locations/* /memberships/*`. */
  parent: string;
  /** Idempotent request UUID. */
  requestId?: string;
  /** Required. The ID of the membership_feature to create. */
  featureId?: string;
  /** Request body */
  body?: MembershipFeature;
}

export const CreateProjectsLocationsMembershipsFeaturesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  featureId: Schema.optional(Schema.String).pipe(T.HttpQuery("featureId")),
  body: Schema.optional(MembershipFeature).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/features", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMembershipsFeaturesRequest>;

export type CreateProjectsLocationsMembershipsFeaturesResponse = Operation;
export const CreateProjectsLocationsMembershipsFeaturesResponse = Operation;

export type CreateProjectsLocationsMembershipsFeaturesError = CommonErrors;

export const createProjectsLocationsMembershipsFeatures: API.OperationMethod<CreateProjectsLocationsMembershipsFeaturesRequest, CreateProjectsLocationsMembershipsFeaturesResponse, CreateProjectsLocationsMembershipsFeaturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMembershipsFeaturesRequest,
  output: CreateProjectsLocationsMembershipsFeaturesResponse,
  errors: [],
}));

/** Removes a membershipFeature. */
export interface DeleteProjectsLocationsMembershipsFeaturesRequest {
  /** Required. The name of the membershipFeature to be deleted. Specified in the format `projects/* /locations/* /memberships/* /features/*`. */
  name: string;
  /** Idempotent request UUID. */
  requestId?: string;
}

export const DeleteProjectsLocationsMembershipsFeaturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/features/{featuresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMembershipsFeaturesRequest>;

export type DeleteProjectsLocationsMembershipsFeaturesResponse = Operation;
export const DeleteProjectsLocationsMembershipsFeaturesResponse = Operation;

export type DeleteProjectsLocationsMembershipsFeaturesError = CommonErrors;

export const deleteProjectsLocationsMembershipsFeatures: API.OperationMethod<DeleteProjectsLocationsMembershipsFeaturesRequest, DeleteProjectsLocationsMembershipsFeaturesResponse, DeleteProjectsLocationsMembershipsFeaturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMembershipsFeaturesRequest,
  output: DeleteProjectsLocationsMembershipsFeaturesResponse,
  errors: [],
}));

/** Updates an existing MembershipFeature. */
export interface PatchProjectsLocationsMembershipsFeaturesRequest {
  /** Output only. The resource name of the membershipFeature, in the format: `projects/{project}/locations/{location}/memberships/{membership}/features/{feature}`. Note that `membershipFeatures` is shortened to `features` in the resource name. (see http://go/aip/122#collection-identifiers) */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Idempotent request UUID. */
  requestId?: string;
  /** Optional. If set to true, and the MembershipFeature is not found, a new MembershipFeature will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: MembershipFeature;
}

export const PatchProjectsLocationsMembershipsFeaturesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(MembershipFeature).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/features/{featuresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMembershipsFeaturesRequest>;

export type PatchProjectsLocationsMembershipsFeaturesResponse = Operation;
export const PatchProjectsLocationsMembershipsFeaturesResponse = Operation;

export type PatchProjectsLocationsMembershipsFeaturesError = CommonErrors;

export const patchProjectsLocationsMembershipsFeatures: API.OperationMethod<PatchProjectsLocationsMembershipsFeaturesRequest, PatchProjectsLocationsMembershipsFeaturesResponse, PatchProjectsLocationsMembershipsFeaturesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMembershipsFeaturesRequest,
  output: PatchProjectsLocationsMembershipsFeaturesResponse,
  errors: [],
}));

