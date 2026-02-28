// ==========================================================================
// BigQuery Connection API (bigqueryconnection v1)
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
  name: "bigqueryconnection",
  version: "v1",
  rootUrl: "https://bigqueryconnection.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ConnectorConfigurationAsset {
  /** Full Google Cloud resource name - https://cloud.google.com/apis/design/resource_names#full_resource_name. Example: `//library.googleapis.com/shelves/shelf1/books/book2` */
  googleCloudResource?: string;
  /** Name of the database. */
  database?: string;
}

export const ConnectorConfigurationAsset: Schema.Schema<ConnectorConfigurationAsset> = Schema.suspend(() => Schema.Struct({
  googleCloudResource: Schema.optional(Schema.String),
  database: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectorConfigurationAsset" }) as any as Schema.Schema<ConnectorConfigurationAsset>;

export interface ConnectorConfigurationSecret {
  /** Output only. Indicates type of secret. Can be used to check type of stored secret value even if it's `INPUT_ONLY`. */
  secretType?: "SECRET_TYPE_UNSPECIFIED" | "PLAINTEXT" | (string & {});
  /** Input only. Secret as plaintext. */
  plaintext?: string;
}

export const ConnectorConfigurationSecret: Schema.Schema<ConnectorConfigurationSecret> = Schema.suspend(() => Schema.Struct({
  secretType: Schema.optional(Schema.String),
  plaintext: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectorConfigurationSecret" }) as any as Schema.Schema<ConnectorConfigurationSecret>;

export interface ConnectorConfigurationUsernamePassword {
  /** Required. Password. */
  password?: ConnectorConfigurationSecret;
  /** Required. Username. */
  username?: string;
}

export const ConnectorConfigurationUsernamePassword: Schema.Schema<ConnectorConfigurationUsernamePassword> = Schema.suspend(() => Schema.Struct({
  password: Schema.optional(ConnectorConfigurationSecret),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectorConfigurationUsernamePassword" }) as any as Schema.Schema<ConnectorConfigurationUsernamePassword>;

export interface ConnectorConfigurationAuthentication {
  /** Output only. Google-managed service account associated with this connection, e.g., `service-{project_number}@gcp-sa-bigqueryconnection.iam.gserviceaccount.com`. BigQuery jobs using this connection will act as `service_account` identity while connecting to the datasource. */
  serviceAccount?: string;
  /** Username/password authentication. */
  usernamePassword?: ConnectorConfigurationUsernamePassword;
}

export const ConnectorConfigurationAuthentication: Schema.Schema<ConnectorConfigurationAuthentication> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
  usernamePassword: Schema.optional(ConnectorConfigurationUsernamePassword),
})).annotate({ identifier: "ConnectorConfigurationAuthentication" }) as any as Schema.Schema<ConnectorConfigurationAuthentication>;

export interface ConnectorConfigurationEndpoint {
  /** Host and port in a format of `hostname:port` as defined in https://www.ietf.org/rfc/rfc3986.html#section-3.2.2 and https://www.ietf.org/rfc/rfc3986.html#section-3.2.3. */
  hostPort?: string;
}

export const ConnectorConfigurationEndpoint: Schema.Schema<ConnectorConfigurationEndpoint> = Schema.suspend(() => Schema.Struct({
  hostPort: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectorConfigurationEndpoint" }) as any as Schema.Schema<ConnectorConfigurationEndpoint>;

export interface ConnectorConfigurationPrivateServiceConnect {
  /** Required. Network Attachment name in the format of `projects/{project}/regions/{region}/networkAttachments/{networkattachment}`. */
  networkAttachment?: string;
}

export const ConnectorConfigurationPrivateServiceConnect: Schema.Schema<ConnectorConfigurationPrivateServiceConnect> = Schema.suspend(() => Schema.Struct({
  networkAttachment: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectorConfigurationPrivateServiceConnect" }) as any as Schema.Schema<ConnectorConfigurationPrivateServiceConnect>;

export interface ConnectorConfigurationNetwork {
  /** Private Service Connect networking configuration. */
  privateServiceConnect?: ConnectorConfigurationPrivateServiceConnect;
}

export const ConnectorConfigurationNetwork: Schema.Schema<ConnectorConfigurationNetwork> = Schema.suspend(() => Schema.Struct({
  privateServiceConnect: Schema.optional(ConnectorConfigurationPrivateServiceConnect),
})).annotate({ identifier: "ConnectorConfigurationNetwork" }) as any as Schema.Schema<ConnectorConfigurationNetwork>;

export interface ConnectorConfiguration {
  /** Data asset. */
  asset?: ConnectorConfigurationAsset;
  /** Client authentication. */
  authentication?: ConnectorConfigurationAuthentication;
  /** Specifies how to reach the remote system this connection is pointing to. */
  endpoint?: ConnectorConfigurationEndpoint;
  /** Required. Immutable. The ID of the Connector these parameters are configured for. */
  connectorId?: string;
  /** Networking configuration. */
  network?: ConnectorConfigurationNetwork;
}

export const ConnectorConfiguration: Schema.Schema<ConnectorConfiguration> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(ConnectorConfigurationAsset),
  authentication: Schema.optional(ConnectorConfigurationAuthentication),
  endpoint: Schema.optional(ConnectorConfigurationEndpoint),
  connectorId: Schema.optional(Schema.String),
  network: Schema.optional(ConnectorConfigurationNetwork),
})).annotate({ identifier: "ConnectorConfiguration" }) as any as Schema.Schema<ConnectorConfiguration>;

export interface CloudSpannerProperties {
  /** Allows setting max parallelism per query when executing on Spanner independent compute resources. If unspecified, default values of parallelism are chosen that are dependent on the Cloud Spanner instance configuration. REQUIRES: `use_parallelism` must be set. REQUIRES: `use_data_boost` must be set. */
  maxParallelism?: number;
  /** Deprecated: prefer use_data_boost instead. If the serverless analytics service should be used to read data from Cloud Spanner. Note: `use_parallelism` must be set when using serverless analytics. */
  useServerlessAnalytics?: boolean;
  /** If set, the request will be executed via Spanner independent compute resources. REQUIRES: `use_parallelism` must be set. */
  useDataBoost?: boolean;
  /** Cloud Spanner database in the form `project/instance/database' */
  database?: string;
  /** If parallelism should be used when reading from Cloud Spanner */
  useParallelism?: boolean;
  /** Optional. Cloud Spanner database role for fine-grained access control. The Cloud Spanner admin should have provisioned the database role with appropriate permissions, such as `SELECT` and `INSERT`. Other users should only use roles provided by their Cloud Spanner admins. For more details, see [About fine-grained access control] (https://cloud.google.com/spanner/docs/fgac-about). REQUIRES: The database role name must start with a letter, and can only contain letters, numbers, and underscores. */
  databaseRole?: string;
}

export const CloudSpannerProperties: Schema.Schema<CloudSpannerProperties> = Schema.suspend(() => Schema.Struct({
  maxParallelism: Schema.optional(Schema.Number),
  useServerlessAnalytics: Schema.optional(Schema.Boolean),
  useDataBoost: Schema.optional(Schema.Boolean),
  database: Schema.optional(Schema.String),
  useParallelism: Schema.optional(Schema.Boolean),
  databaseRole: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSpannerProperties" }) as any as Schema.Schema<CloudSpannerProperties>;

export interface CloudResourceProperties {
  /** Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of an operation in BigQuery, the service account will be used to connect to the desired resources in GCP. The account ID is in the form of: @gcp-sa-bigquery-cloudresource.iam.gserviceaccount.com */
  serviceAccountId?: string;
}

export const CloudResourceProperties: Schema.Schema<CloudResourceProperties> = Schema.suspend(() => Schema.Struct({
  serviceAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudResourceProperties" }) as any as Schema.Schema<CloudResourceProperties>;

export interface SalesforceDataCloudProperties {
  /** Output only. A unique Google-owned and Google-generated service account identity for the connection. */
  identity?: string;
  /** The URL to the user's Salesforce DataCloud instance. */
  instanceUri?: string;
  /** The ID of the user's Salesforce tenant. */
  tenantId?: string;
}

export const SalesforceDataCloudProperties: Schema.Schema<SalesforceDataCloudProperties> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(Schema.String),
  instanceUri: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "SalesforceDataCloudProperties" }) as any as Schema.Schema<SalesforceDataCloudProperties>;

export interface SparkHistoryServerConfig {
  /** Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the connection. Example: * `projects/[project_id]/regions/[region]/clusters/[cluster_name]` */
  dataprocCluster?: string;
}

export const SparkHistoryServerConfig: Schema.Schema<SparkHistoryServerConfig> = Schema.suspend(() => Schema.Struct({
  dataprocCluster: Schema.optional(Schema.String),
})).annotate({ identifier: "SparkHistoryServerConfig" }) as any as Schema.Schema<SparkHistoryServerConfig>;

export interface MetastoreServiceConfig {
  /** Optional. Resource name of an existing Dataproc Metastore service. Example: * `projects/[project_id]/locations/[region]/services/[service_id]` */
  metastoreService?: string;
}

export const MetastoreServiceConfig: Schema.Schema<MetastoreServiceConfig> = Schema.suspend(() => Schema.Struct({
  metastoreService: Schema.optional(Schema.String),
})).annotate({ identifier: "MetastoreServiceConfig" }) as any as Schema.Schema<MetastoreServiceConfig>;

export interface SparkProperties {
  /** Optional. Dataproc Metastore Service configuration for the connection. */
  metastoreServiceConfig?: MetastoreServiceConfig;
  /** Optional. Spark History Server configuration for the connection. */
  sparkHistoryServerConfig?: SparkHistoryServerConfig;
  /** Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of a stored procedure for Apache Spark in BigQuery, the service account is used to connect to the desired resources in Google Cloud. The account ID is in the form of: bqcx--@gcp-sa-bigquery-consp.iam.gserviceaccount.com */
  serviceAccountId?: string;
}

export const SparkProperties: Schema.Schema<SparkProperties> = Schema.suspend(() => Schema.Struct({
  metastoreServiceConfig: Schema.optional(MetastoreServiceConfig),
  sparkHistoryServerConfig: Schema.optional(SparkHistoryServerConfig),
  serviceAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "SparkProperties" }) as any as Schema.Schema<SparkProperties>;

export interface AzureProperties {
  /** The URL user will be redirected to after granting consent during connection setup. */
  redirectUri?: string;
  /** Output only. The client id of the Azure Active Directory Application. */
  clientId?: string;
  /** The id of customer's directory that host the data. */
  customerTenantId?: string;
  /** Output only. The object id of the Azure Active Directory Application. */
  objectId?: string;
  /** Output only. A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's Azure Active Directory Application. */
  identity?: string;
  /** Output only. The name of the Azure Active Directory Application. */
  application?: string;
  /** The client ID of the user's Azure Active Directory Application used for a federated connection. */
  federatedApplicationClientId?: string;
}

export const AzureProperties: Schema.Schema<AzureProperties> = Schema.suspend(() => Schema.Struct({
  redirectUri: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  customerTenantId: Schema.optional(Schema.String),
  objectId: Schema.optional(Schema.String),
  identity: Schema.optional(Schema.String),
  application: Schema.optional(Schema.String),
  federatedApplicationClientId: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureProperties" }) as any as Schema.Schema<AzureProperties>;

export interface CloudSqlCredential {
  /** The username for the credential. */
  username?: string;
  /** The password for the credential. */
  password?: string;
}

export const CloudSqlCredential: Schema.Schema<CloudSqlCredential> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlCredential" }) as any as Schema.Schema<CloudSqlCredential>;

export interface CloudSqlProperties {
  /** Database name. */
  database?: string;
  /** Cloud SQL instance ID in the form `project:location:instance`. */
  instanceId?: string;
  /** Input only. Cloud SQL credential. */
  credential?: CloudSqlCredential;
  /** Type of the Cloud SQL database. */
  type?: "DATABASE_TYPE_UNSPECIFIED" | "POSTGRES" | "MYSQL" | (string & {});
  /** Output only. The account ID of the service used for the purpose of this connection. When the connection is used in the context of an operation in BigQuery, this service account will serve as the identity being used for connecting to the CloudSQL instance specified in this connection. */
  serviceAccountId?: string;
}

export const CloudSqlProperties: Schema.Schema<CloudSqlProperties> = Schema.suspend(() => Schema.Struct({
  database: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  credential: Schema.optional(CloudSqlCredential),
  type: Schema.optional(Schema.String),
  serviceAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlProperties" }) as any as Schema.Schema<CloudSqlProperties>;

export interface AwsAccessRole {
  /** A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's AWS IAM Role. */
  identity?: string;
  /** The user’s AWS IAM Role that trusts the Google-owned AWS IAM user Connection. */
  iamRoleId?: string;
}

export const AwsAccessRole: Schema.Schema<AwsAccessRole> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(Schema.String),
  iamRoleId: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsAccessRole" }) as any as Schema.Schema<AwsAccessRole>;

export interface AwsProperties {
  /** Authentication using Google owned service account to assume into customer's AWS IAM Role. */
  accessRole?: AwsAccessRole;
}

export const AwsProperties: Schema.Schema<AwsProperties> = Schema.suspend(() => Schema.Struct({
  accessRole: Schema.optional(AwsAccessRole),
})).annotate({ identifier: "AwsProperties" }) as any as Schema.Schema<AwsProperties>;

export interface Connection {
  /** Cloud Resource properties. */
  cloudResource?: CloudResourceProperties;
  /** Output only. The last update timestamp of the connection. */
  lastModifiedTime?: string;
  /** Optional. Connector configuration. */
  configuration?: ConnectorConfiguration;
  /** Optional. The Cloud KMS key that is used for credentials encryption. If omitted, internal Google owned encryption keys are used. Example: `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]` */
  kmsKeyName?: string;
  /** Output only. The resource name of the connection in the form of: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` */
  name?: string;
  /** Azure properties. */
  azure?: AzureProperties;
  /** Output only. The creation timestamp of the connection. */
  creationTime?: string;
  /** Output only. True, if credential is configured for this connection. */
  hasCredential?: boolean;
  /** Cloud SQL properties. */
  cloudSql?: CloudSqlProperties;
  /** User provided description. */
  description?: string;
  /** Optional. Salesforce DataCloud properties. This field is intended for use only by Salesforce partner projects. This field contains properties for your Salesforce DataCloud connection. */
  salesforceDataCloud?: SalesforceDataCloudProperties;
  /** User provided display name for the connection. */
  friendlyName?: string;
  /** Cloud Spanner properties. */
  cloudSpanner?: CloudSpannerProperties;
  /** Spark properties. */
  spark?: SparkProperties;
  /** Amazon Web Services (AWS) properties. */
  aws?: AwsProperties;
}

export const Connection: Schema.Schema<Connection> = Schema.suspend(() => Schema.Struct({
  cloudResource: Schema.optional(CloudResourceProperties),
  lastModifiedTime: Schema.optional(Schema.String),
  configuration: Schema.optional(ConnectorConfiguration),
  kmsKeyName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  azure: Schema.optional(AzureProperties),
  creationTime: Schema.optional(Schema.String),
  hasCredential: Schema.optional(Schema.Boolean),
  cloudSql: Schema.optional(CloudSqlProperties),
  description: Schema.optional(Schema.String),
  salesforceDataCloud: Schema.optional(SalesforceDataCloudProperties),
  friendlyName: Schema.optional(Schema.String),
  cloudSpanner: Schema.optional(CloudSpannerProperties),
  spark: Schema.optional(SparkProperties),
  aws: Schema.optional(AwsProperties),
})).annotate({ identifier: "Connection" }) as any as Schema.Schema<Connection>;

export interface ListConnectionsResponse {
  /** List of connections. */
  connections?: Array<Connection>;
  /** Next page token. */
  nextPageToken?: string;
}

export const ListConnectionsResponse: Schema.Schema<ListConnectionsResponse> = Schema.suspend(() => Schema.Struct({
  connections: Schema.optional(Schema.Array(Connection)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConnectionsResponse" }) as any as Schema.Schema<ListConnectionsResponse>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns a list of connections in the given project. */
export interface ListProjectsLocationsConnectionsRequest {
  /** Required. Parent resource name. Must be in the form: `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Required. Page size. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
}

export const ListProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConnectionsRequest>;

export type ListProjectsLocationsConnectionsResponse = ListConnectionsResponse;
export const ListProjectsLocationsConnectionsResponse = ListConnectionsResponse;

export type ListProjectsLocationsConnectionsError = CommonErrors;

export const listProjectsLocationsConnections = API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionsRequest,
  output: ListProjectsLocationsConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes connection and associated credential. */
export interface DeleteProjectsLocationsConnectionsRequest {
  /** Required. Name of the deleted connection, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` */
  name: string;
}

export const DeleteProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionsRequest>;

export type DeleteProjectsLocationsConnectionsResponse = Empty;
export const DeleteProjectsLocationsConnectionsResponse = Empty;

export type DeleteProjectsLocationsConnectionsError = CommonErrors;

export const deleteProjectsLocationsConnections: API.OperationMethod<DeleteProjectsLocationsConnectionsRequest, DeleteProjectsLocationsConnectionsResponse, DeleteProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConnectionsRequest,
  output: DeleteProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Updates the specified connection. For security reasons, also resets credential if connection properties are in the update field mask. */
export interface PatchProjectsLocationsConnectionsRequest {
  /** Required. Update mask for the connection fields to be updated. */
  updateMask?: string;
  /** Required. Name of the connection to update, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` */
  name: string;
  /** Request body */
  body?: Connection;
}

export const PatchProjectsLocationsConnectionsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Connection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConnectionsRequest>;

export type PatchProjectsLocationsConnectionsResponse = Connection;
export const PatchProjectsLocationsConnectionsResponse = Connection;

export type PatchProjectsLocationsConnectionsError = CommonErrors;

export const patchProjectsLocationsConnections: API.OperationMethod<PatchProjectsLocationsConnectionsRequest, PatchProjectsLocationsConnectionsResponse, PatchProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConnectionsRequest,
  output: PatchProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Returns specified connection. */
export interface GetProjectsLocationsConnectionsRequest {
  /** Required. Name of the requested connection, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` */
  name: string;
}

export const GetProjectsLocationsConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConnectionsRequest>;

export type GetProjectsLocationsConnectionsResponse = Connection;
export const GetProjectsLocationsConnectionsResponse = Connection;

export type GetProjectsLocationsConnectionsError = CommonErrors;

export const getProjectsLocationsConnections: API.OperationMethod<GetProjectsLocationsConnectionsRequest, GetProjectsLocationsConnectionsResponse, GetProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConnectionsRequest,
  output: GetProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsConnectionsRequest>;

export type GetIamPolicyProjectsLocationsConnectionsResponse = Policy;
export const GetIamPolicyProjectsLocationsConnectionsResponse = Policy;

export type GetIamPolicyProjectsLocationsConnectionsError = CommonErrors;

export const getIamPolicyProjectsLocationsConnections: API.OperationMethod<GetIamPolicyProjectsLocationsConnectionsRequest, GetIamPolicyProjectsLocationsConnectionsResponse, GetIamPolicyProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsConnectionsRequest,
  output: GetIamPolicyProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsConnectionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsConnectionsRequest>;

export type TestIamPermissionsProjectsLocationsConnectionsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsConnectionsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsConnectionsError = CommonErrors;

export const testIamPermissionsProjectsLocationsConnections: API.OperationMethod<TestIamPermissionsProjectsLocationsConnectionsRequest, TestIamPermissionsProjectsLocationsConnectionsResponse, TestIamPermissionsProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsConnectionsRequest,
  output: TestIamPermissionsProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Creates a new connection. */
export interface CreateProjectsLocationsConnectionsRequest {
  /** Required. Parent resource name. Must be in the format `projects/{project_id}/locations/{location_id}` */
  parent: string;
  /** Optional. Connection id that should be assigned to the created connection. */
  connectionId?: string;
  /** Request body */
  body?: Connection;
}

export const CreateProjectsLocationsConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  connectionId: Schema.optional(Schema.String).pipe(T.HttpQuery("connectionId")),
  body: Schema.optional(Connection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConnectionsRequest>;

export type CreateProjectsLocationsConnectionsResponse = Connection;
export const CreateProjectsLocationsConnectionsResponse = Connection;

export type CreateProjectsLocationsConnectionsError = CommonErrors;

export const createProjectsLocationsConnections: API.OperationMethod<CreateProjectsLocationsConnectionsRequest, CreateProjectsLocationsConnectionsResponse, CreateProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConnectionsRequest,
  output: CreateProjectsLocationsConnectionsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsConnectionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsConnectionsRequest>;

export type SetIamPolicyProjectsLocationsConnectionsResponse = Policy;
export const SetIamPolicyProjectsLocationsConnectionsResponse = Policy;

export type SetIamPolicyProjectsLocationsConnectionsError = CommonErrors;

export const setIamPolicyProjectsLocationsConnections: API.OperationMethod<SetIamPolicyProjectsLocationsConnectionsRequest, SetIamPolicyProjectsLocationsConnectionsResponse, SetIamPolicyProjectsLocationsConnectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsConnectionsRequest,
  output: SetIamPolicyProjectsLocationsConnectionsResponse,
  errors: [],
}));

